<template>
  <div class="container">
    <div
      class="
        row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4
        my-1
        g-4
        my-lg-3
        g-lg-4
      "
    >
      <div v-for="movie in movies" :key="movie.imdbID">
        <div class="col text-center d-flex justify-content-center">
          <div v-if="displayType == 1" class="card movieCard w-100">
            <img class="card-img-top" :src="movie.img" />
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text d-none d-md-block">
                {{ movie.reviewText }}
              </p>

              <star-rating
                class="m-2"
                :rating="movie.avgRating"
                :show-rating="false"
                :read-only="true"
                :increment="0.5"
                :star-size="starSize"
              ></star-rating>

              <!-- <a
                class="btn btn-dark m-2"
                :href="'https://www.imdb.com/title/' + movie.imdbID"
                >MORE INFO</a
              > -->

              <router-link
                class="stretched-link"
                :to="{
                  name: 'Movie',
                  params: { id: movie.imdbID, newMovie: false },
                }"
              ></router-link>
            </div>
          </div>
          <div v-else class="card movieCard w-100">
            <img class="card-img-top" :src="movie.img" />
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <!-- <p class="card-text d-none d-md-block">
                {{ movie.plotText }}
              </p> -->

              <a
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-dark m-2 d-inline-block"
                :href="'https://www.imdb.com/title/' + movie.imdbID"
                >More info</a
              >

              <router-link
                class="btn btn-dark m-2 d-inline-block"
                :to="{
                  name: 'Movie',
                  params: { id: movie.imdbID, newMovie: true },
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
  data() {
    return {
      starSize: 40,
    };
  },
  async created() {
    let cards = document.getElementsByClassName("card");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (cards[0].offsetWidth) {
      let width = cards[0].offsetWidth;
      this.starSize = (width - 60) / 5;
    }
  },
  components: {
    StarRating,
  },
  computed: {},
  props: {
    movies: Array,
    displayType: Number,
  },
  methods: {},
};
</script>

<style scoped>
</style>