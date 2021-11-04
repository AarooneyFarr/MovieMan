<template>
  <MovieList :movies="myMovies" :displayType="1" />
</template>

<script>
import MovieList from "@/components/MovieList.vue";

export default {
  name: "ReviewedMovies",
  components: {
    MovieList,
  },
  computed: {
    myMovies() {
      return this.$root.$data.reviewedMovies;
    },
  },
};
</script>