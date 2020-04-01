const invokeUrl = 'https://9fz7s6nsi8.execute-api.us-east-1.amazonaws.com';

// Do not edit below this line

var app = new Vue({
  el: '#app',
  data() {
    return {
      loading: true,
      errored: false,
      friends: null
    }
  },
  mounted() {
    axios
      .get(invokeUrl)
      .then(response => {
        console.log(response)
        this.friends = response.data.friends
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
})
