<template>
  <div id="app">
    <b-container>
      <b-jumbotron>
        <h1 class="display-5">Configuring a Custom Domain with Amazon Cognito</h1>
        <h4>Hands-on Lab</h4>
      </b-jumbotron>
      <router-view />
    </b-container>
  </div>
</template>

<style>
</style>

<script>
import { AmplifyEventBus, components } from "aws-amplify-vue";
import { Auth } from "aws-amplify";
import * as AmplifyVue from "aws-amplify-vue";

export default {
  name: "app",
  components: {
    components
  },
  data() {
    return {
      signedIn: false,
      username: null
    };
  },
  methods: {
    signIn: () => {
      Auth.federatedSignIn(); // Cognito is the default provider
    },
    signOut: () => {
      Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  },
  async beforeCreate() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      this.signedIn = true;
    } catch (err) {
      this.signedIn = false;
    }
    AmplifyEventBus.$on("authState", info => {
      console.log("authState = " + info);
      if (info === "signedIn") {
        this.signedIn = true;
      } else {
        this.signedIn = false;
      }
    });
  },
  data() {
    return {
      signedIn: false
    };
  }
};
</script>