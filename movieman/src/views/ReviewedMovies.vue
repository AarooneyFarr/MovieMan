<template>
  <MovieList :movies="myMovies" :displayType="1" />
</template>

<script>
import MovieList from "@/components/MovieList.vue";
import axios from "axios";

export default {
  name: "ReviewedMovies",
  data() {
    return {
      movies: [],
    };
  },
  components: {
    MovieList,
  },
  created() {
    this.getMovies();
  },
  computed: {
    myMovies() {
      // return this.$root.$data.reviewedMovies;
      return this.movies;
    },
  },
  methods: {
    async getMovies() {
      try {
        let response = await axios.get("/api/movies");
        this.movies = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>