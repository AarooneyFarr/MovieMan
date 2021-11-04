<template>
  <div class="container">
    <div class="row row-cols-4 my-3 g-4">
      <div v-for="movie in movies" :key="movie.imdbID">
        <div class="col text-center d-flex justify-content-center">
          <div v-if="displayType == 1" class="card movieCard w-100">
            <img class="card-img-top" :src="movie.img" />
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">
                {{ movie.reviewText }}
              </p>

              <star-rating
                class="m-2"
                :rating="movie.rating"
                :show-rating="false"
                :read-only="true"
                :increment="0.5"
                :star-size="42"
              ></star-rating>

              <a
                class="btn btn-dark m-2"
                :href="'https://www.imdb.com/title/' + movie.imdbID"
                >MORE INFO</a
              >

              <router-link
                class="btn btn-dark m-2"
                :to="{
                  name: 'Movie',
                  params: { id: movie.imdbID },
                }"
                >Rate Movie</router-link
              >
            </div>
          </div>
          <div v-else class="card movieCard w-75">
            <img class="card-img-top" :src="movie.img" />
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">
                {{ movie.plotText }}
              </p>
              <a
                class="btn btn-dark m-2"
                :href="'https://www.imdb.com/title/' + movie.imdbID"
                >MORE INFO</a
              >

              <router-link
                class="btn btn-dark m-2"
                :to="{
                  name: 'Movie',
                  params: { id: movie.imdbID },
                }"
                >Rate Movie</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  name: "MovieList",
  components: {
    StarRating,
  },
  props: {
    movies: Array,
    displayType: Number,
  },
  methods: {},
};
</script>

<style scoped>
</style>