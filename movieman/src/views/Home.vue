<template>
  <div class="home">
    <div
      v-if="!this.$root.$data.searched"
      id="movieHero"
      class="fluid-container hero-container"
    >
      <div class="row hero-row m-0">
        <div
          id="HeroShrink"
          class="
            col
            hero-col
            d-flex
            flex-column
            justify-content-center
            align-items-center
            text-center
          "
        >
          <h1 id="HeroTitle">Movieman</h1>

          <form>
            <div class="form-group">
              <input
                class="form-control"
                id="movieField"
                placeholder="Search for a movie"
                type="text"
                v-model="movieQuery"
              />
              <input
                class="btn btn-dark my-2"
                id="movieButton"
                type="submit"
                value="Submit"
                @click.prevent="searchMovie"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-else>
      <MovieList :movies="myMovies" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import MovieList from "@/components/MovieList.vue";

let getMoviePlot = async (movieId) => {
  let url = "https://www.omdbapi.com/?apikey=e5b65372&i=" + movieId;

  let response = await fetch(url);

  let json = await response.json();

  return json.Plot;
};

let getMoviePosterURL = async (movieId) => {
  let url = "https://imdb-api.com/en/API/Posters/k_f11gqrsc/" + movieId;

  let response = await fetch(url);

  let json = await response.json();

  return json.posters[0].link;
};

export default {
  name: "Home",
  data() {
    return {
      movieQuery: "",
    };
  },
  components: {
    MovieList,
  },
  computed: {
    myMovies() {
      return this.$root.$data.movies;
    },
  },
  methods: {
    searchMovie() {
      this.$root.$data.searched = true;
      this.$root.$data.searchedTerm = this.movieQuery;

      const url =
        "https://www.omdbapi.com/?apikey=e5b65372" + "&s=" + this.movieQuery;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          for (
            let i = 0;
            i < (json.Search.length > 8 ? 8 : json.Search.length);
            i++
          ) {
            let id = json.Search[i].imdbID;

            let movie = {
              url: "",
              imdbID: id,
              title: json.Search[i].Title,
              img: "",
              plotText: "",
            };

            getMoviePosterURL(json.Search[i].imdbID)
              .then((imgURL) => {
                movie.img = imgURL;

                getMoviePlot(json.Search[i].imdbID)
                  .then((text) => {
                    movie.plotText = text;
                  })
                  .catch(() => {
                    movie.plotText = "API CALL LIMIT Exceeded";
                  });
              })
              .catch((e) => {
                getMoviePlot(json.Search[i].imdbID)
                  .then((text) => {
                    movie.plotText = text;
                  })
                  .catch(() => {
                    movie.plotText = "API CALL LIMIT Exceeded";
                  });

                console.log(
                  "There has been a problem with your fetch operation: " +
                    e.message
                );
                movie.img =
                  "https://i.picsum.photos/id/353/200/300.jpg?hmac=dp_gN1fPfq1NcUZmNjRXfOwD3UH0D4B8A-jwvjByOyc";
              });

            this.$root.$data.movies.push(movie);
          }
        });
    },
  },
};
</script>

<style scoped>
.hero-col {
  height: 100vh;

  letter-spacing: 10px;
  /* color: white; */
}

.hero-container {
  height: 100vh;

  background-size: cover;
  background-repeat: no-repeat;
  /* background-image: url(/images/weather.jpg); */
}

#HeroTitle {
  font-size: 6vw;
  padding-bottom: 4vh;
  /* color: white; */
  letter-spacing: 2vw;
  font-family: raleway, sans-serif;
  text-transform: uppercase;
}

#HeroTitle,
#HeroShrink {
  transition: height 2s, padding-bottom 2s, font-size 2s, letter-spacing 2s;
}
</style>