import { createApp, provide, h } from "vue";
import { createPinia } from "pinia";
import { Quasar, Notify, Dialog, Dark, Cookies, Loading } from "quasar";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import App from "./App.vue";
import router from "./router";

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: "http://localhost:8000/graphql/",
  credentials: "include",
  headers: {
    "X-CSRFToken": Cookies.get("csrftoken"),
  },
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(Quasar, {
  plugins: {
    Notify,
    Dialog,
    Dark,
    Cookies,
    Loading,
  },
  config: {
    dark: "auto",
  },
});

app.use(VueQueryPlugin);

app.use(apolloProvider);

app.mount("#app");
