<template>
  <div class="container-fluid">
    <div class="row d-flex align-items-center justify-content-center">
      <div class="col-6 text-center">
        <img class="moviePic m-5" :src="movie.img" alt="" />
      </div>
      <div class="col d-flex justify-content-center flex-column">
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.plotText }}</p>
        <textarea
          v-model="reviewText"
          name="reviewTextBox"
          id=""
          cols="70"
          rows="5"
        ></textarea>
        <div class="d-flex flex-row justify-content-between">
          <star-rating
            @rating-selected="setRating"
            :show-rating="false"
          ></star-rating>
          <a class="btn btn-dark m-3" @click.prevent="submitRating"
            >SUBMIT RATING</a
          >
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import StarRating from "vue-star-rating";

export default {
  data() {
    return {
      movie: {},
      reviewText: "",
      rating: 0,
    };
  },
  components: {
    StarRating,
  },
  created() {
    this.movie = this.$root.$data.movies.find(
      (pickedMovie) => pickedMovie.imdbID == this.$route.params.id
    );
  },
  methods: {
    submitRating() {
      let reviewed = {
        imdbID: this.movie.imdbID,
        img: this.movie.img,
        plotText: this.movie.plotText,
        rating: this.movie.rating,
        reviewText: this.movie.reviewText,
        title: this.movie.title,
        url: this.movie.url,
      };

      reviewed.rating = this.rating;
      reviewed.reviewText = this.reviewText;

      this.$root.$data.reviewedMovies.push(reviewed);
    },
    setRating(theRating) {
      this.rating = theRating;
    },
  },
};
</script>

<style scoped>
.moviePic {
  height: 70vh;
}
</style>