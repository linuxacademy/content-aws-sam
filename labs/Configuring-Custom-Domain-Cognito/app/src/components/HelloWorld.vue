<template>
  <div>
    <b-container>
      <b-row align-h="center">
        <div v-if="!signedIn">
          <b-button variant="success" @click="signIn">Sign in with Cognito</b-button>
        </div>
        <div v-if="signedIn">
          <h4>Welcome, {{ username }}!</h4>
          <b-button variant="danger" @click="signOut">Sign out</b-button>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Auth, Hub } from "aws-amplify";
export default {
  name: "HelloWorld",
  props: {},
  data() {
    return {
      signedIn: false,
      username: String
    };
  },
  methods: {
    signIn: () => {
      console.log("HelloWorld signIn()");
      Auth.federatedSignIn(); // Cognito is the default provider
    },
    signOut: () => {
      console.log("HelloWorld signOut()");
      Auth.signOut()
        .then(data => {
          console.log(data);
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    console.log("HelloWorld mounted()");

    Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log(`Auth event: ${event}`);
      switch (event) {
        case "signIn":
          console.log("signIn data: " + JSON.stringify(data));
          this.signedIn = true;
          this.username = data.username;
          break;
        case "signOut":
          this.signedIn = false;
          this.username = null;
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => {
        const { attributes } = user;
        console.log(attributes);
        console.log(attributes.email);
        console.log("Username: " + user.username);
        console.log("Refreshing access and id tokens");
        Auth.currentSession()
          .then(data => console.log(data))
          .catch(err => console.log("Error refreshing tokens: " + err));
        this.signedIn = true;
        this.username = user.username;
      })
      .catch(err => console.log("Auth.currentAuthenticatedUser(): " + err));
  }
};
</script>

<style scoped>
</style>
