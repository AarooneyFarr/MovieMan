<template>
  <div class="container">
    <div class="row row-cols-4 my-3 g-4">
      <div v-for="movie in movies" :key="movie.imdbID">
        <div class="col text-center d-flex justify-content-center">
          <div class="card movieCard w-75">
            <img class="card-img-top" :src="movie.img" />
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">
                {{ movie.plotText }}
              </p>
              <a
                class="btn btn-dark"
                :href="'https://www.imdb.com/title/' + movie.imdbID"
                >MORE INFO</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieList",
  props: {
    movies: Array,
  },
  methods: {},
};
</script>

<style scoped>
</style>