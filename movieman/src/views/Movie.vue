<template>
  <div class="container-fluid">
    <div class="row d-flex align-items-center justify-content-center">
      <div class="col text-center d-md-block d-none">
        <img class="moviePic w-75 m-5" :src="movie.img" alt="" />
      </div>
      <div class="col d-flex justify-content-center flex-column">
        <div class="row d-flex align-items-center justify-content-center">
          <div class="col-4 d-block d-md-none">
            <img
              class="moviePic w-100 m-2 img-fluid d-inline-block"
              :src="movie.img"
              alt=""
            />
          </div>
          <div class="col">
            <h1>{{ movie.title }}</h1>

            <p>{{ movie.plotText }}</p>
          </div>
        </div>
        <textarea
          class="my-1"
          v-model="reviewText"
          name="reviewTextBox"
          id=""
          cols="70"
          rows="5"
        ></textarea>
        <div class="d-flex flex-row justify-content-between">
          <div class="col-6">
            <star-rating
              @rating-selected="setRating"
              :show-rating="false"
              :star-rating="40"
              v-model="rating"
            ></star-rating>
          </div>
          <div class="col-6 d-flex justify-content-end">
            <a
              id="submitButton"
              class="btn btn-dark m-3"
              @click.prevent="inDatabase ? addRating() : postRating()"
              >SUBMIT RATING</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex align-items-center justify-content-center">
      <div class="col mx-5">
        <div v-for="comment in comments" :key="comment._id">
          <div class="container-fluid">
            <div class="row">
              <hr />
              <div class="col-3">
                <star-rating
                  class="my-1"
                  :show-rating="false"
                  :read-only="true"
                  :rating="comment.rating"
                  :star-size="30"
                ></star-rating>
                <p>{{ comment.reviewText }}</p>
              </div>
              <div class="col-6"></div>
              <div class="col-3">
                <!-- TODO: Fix buttons -->
                <!-- <a class="btn btn-dark mx-1" @click.prevent="editRating"
                  >Edit</a
                >
                <a class="btn btn-dark mx-1" @click.prevent="postRating"
                  >Delete</a
                > -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex align-items-center justify-content-center d-none">
      <div class="col d-flex justify-content-center flex-column">
        <a class="btn btn-dark m-4" @click.prevent="deleteMovie"
          >Delete Movie</a
        >
      </div>
    </div>
  </div>
</template>


<script>
import StarRating from "vue-star-rating";
import axios from "axios";

export default {
  data() {
    return {
      movie: {},
      reviewText: "",
      rating: 0,
      comments: [],
      inDatabase: false,
    };
  },
  components: {
    StarRating,
  },
  created() {
    if (this.$route.params.newMovie) {
      this.movie = this.$root.$data.movies.find(
        (pickedMovie) => pickedMovie.imdbID == this.$route.params.id
      );
    } else {
      this.getMovieInfo();
    }
  },
  methods: {
    // submitRating() {
    //   let reviewed = {
    //     imdbID: this.movie.imdbID,
    //     img: this.movie.img,
    //     plotText: this.movie.plotText,
    //     title: this.movie.title,
    //     url: this.movie.url,
    //   };

    //   reviewed.rating = this.rating;
    //   reviewed.reviewText = this.reviewText;

    //   this.$root.$data.reviewedMovies.push(reviewed);
    // },

    async postRating() {
      document.getElementById("submitButton").innerText = "Submitted!";
      document.getElementById("submitButton").classList.add("btn-success");
      document.getElementById("submitButton").classList.remove("btn-dark");
      setTimeout(function () {
        document.getElementById("submitButton").innerText = "Submit Rating";
        document.getElementById("submitButton").classList.add("btn-dark");
        document.getElementById("submitButton").classList.remove("btn-success");
      }, 2000);

      try {
        let reviewed = {
          imdbID: this.movie.imdbID,
          img: this.movie.img,
          plotText: this.movie.plotText,
          title: this.movie.title,
          url: this.movie.url,
          rating: this.movie.rating,
          reviewText: this.movie.reviewText,
        };

        reviewed.rating = this.rating;
        reviewed.reviewText = this.reviewText;

        console.log(reviewed);

        await axios.post("/api/movies/" + this.$route.params.id, reviewed);
        this.reviewText = "";
        this.rating = 0;
        this.getMovieInfo();
      } catch (error) {
        console.log(error);
      }
    },
    async addRating() {
      document.getElementById("submitButton").innerText = "Submitted!";
      document.getElementById("submitButton").classList.add("btn-success");
      document.getElementById("submitButton").classList.remove("btn-dark");
      setTimeout(function () {
        document.getElementById("submitButton").innerText = "Submit Rating";
        document.getElementById("submitButton").classList.add("btn-dark");
        document.getElementById("submitButton").classList.remove("btn-success");
      }, 2000);

      try {
        let reviewed = {
          imdbID: this.movie.imdbID,
          img: this.movie.img,
          plotText: this.movie.plotText,
          title: this.movie.title,
          url: this.movie.url,
          rating: this.movie.rating,
          reviewText: this.movie.reviewText,
        };

        reviewed.rating = this.rating;
        reviewed.reviewText = this.reviewText;

        console.log(reviewed);

        await axios.put("/api/movies/" + this.$route.params.id, reviewed);
        this.reviewText = "";
        this.rating = 0;
        this.getMovieInfo();
      } catch (error) {
        console.log(error);
      }
    },
    async getMovieInfo() {
      try {
        let response = await axios.get("/api/movie/" + this.$route.params.id);
        this.movie = response.data;
        // this.rating = this.movie.rating;

        this.comments = this.movie.comments;
        this.inDatabase = true;
      } catch (error) {
        console.log(error);
      }
    },
    async editRating() {
      //TODO: Add edit functionality
    },
    async deleteRating() {
      //TODO: Add delete comment PUT request
    },
    async deleteMovie() {
      try {
        await axios.delete("/api/movie/" + this.$route.params.id);
        // this.getMovieInfo();
        this.$router.push("/reviewed-movies");
      } catch (error) {
        console.log(error);
      }
    },
    setRating(theRating) {
      this.rating = theRating;
    },
  },
};
</script>

<style scoped>
/* .moviePic {
  height: 70vh;
  width: 20vw;
} */
</style>