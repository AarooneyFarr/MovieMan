<template>
  <div id="app">
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">MOVIEMAN</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/reviewed-movies"
                >Reviews</router-link
              >
            </li>
          </ul>
          <form class="d-flex">
            <input
              class="form-control me-2"
              :placeholder="this.$root.$data.searchedTerm"
              aria-label="Search"
              v-model="vueRoot.$data.searchedTerm"
              @click.prevent
            />
            <button
              class="btn btn-outline-success"
              type="submit"
              @click.prevent="searchMovies(vueRoot.$data.searchedTerm)"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
let getMoviePlot = async (movieId) => {
  let url = "http://www.omdbapi.com/?apikey=e5b65372&i=" + movieId;

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
  name: "app",
  data() {
    return {
      searchedTerm: "",
    };
  },
  methods: {
    searchMovies(searchURL) {
      this.$root.$data.searched = true;
      this.$router.push("/");

      const url = "http://www.omdbapi.com/?apikey=e5b65372" + "&s=" + searchURL;
      this.$root.$data.movies = [];

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

  computed: {
    vueRoot() {
      return this.$root;
    },
  },
};
</script>

<style>
#nav-link a {
  color: rgba(0, 0, 0, 0.55);
}

#nav-link a.router-link-exact-active {
  color: rgba(0, 0, 0, 0.9);
}
</style>
