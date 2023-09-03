import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { supabase } from "./lib/supabase-client";
import { userSession } from "./helpers/use-auth";

createApp(App).mount("#app");

supabase.auth.onAuthStateChange((_, session) => {
  userSession.value.session = session;
});

