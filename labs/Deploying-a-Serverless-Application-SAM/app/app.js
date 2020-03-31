const invokeUrl = 'https://e5bleetjji.execute-api.us-east-1.amazonaws.com';

const endpoint = invokeUrl + "/HttpApi";

// Do not edit below this line

var app = new Vue({
  el: '#app',
  data () {
    return {
      loading: true,
      errored: false,
      friends: null
    }
  },
  mounted () {
    axios
      .get(endpoint)
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
