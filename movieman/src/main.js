import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import mock from './mock-data'

Vue.config.productionTip = false


let myData = {
  movies: [],
  reviewedMovies: [],
  searched: false,
  movieQuery: "",
  searchedTerm: "",
}



new Vue({
  router,
  data: myData,
  watch: {

  },
  methods: {
    newSearch() {
      this.movieQuery = this.searchedTerm;
    },
  },
  render: h => h(App)
}).$mount('#app')
