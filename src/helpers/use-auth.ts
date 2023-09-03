import { Session, User } from "@supabase/supabase-js";
import { ref } from "vue";
import { supabase } from "../lib/supabase-client";

export const userSession = ref<{
  user: User | null;
  session: Session | null;
}>({
  session: null,
  user: null,
});

export async function handleLogin(credentials: Credentials) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) {
      alert("Error logging in: " + error.message);
    }
    // No error throw, but no user detected so send magic link
    if (!error && !data) {
      alert("Check your email for the login link!");
    }

    if (data !== null) userSession.value = data;
  } catch (error) {
    console.error("Error thrown:", (error as any).message);
    alert((error as any).error_description || error);
  }
}

/*
 * Handles signup provided a valid credentials object.
 */
export async function handleSignup(credentials: Credentials) {
  try {
    const { email, password } = credentials;
    // prompt user if they have not filled populated their credentials
    if (!email || !password) {
      alert("Please provide both your email and password.");
      return;
    }
    const { error, data } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
      console.error(error, error.message);
      return;
    }
    if (data !== null) userSession.value = data;
    alert("Signup successful, confirmation mail should be sent soon!");
  } catch (err) {
    alert("Fatal error signing up");
    console.error("signup error", err);
  }
}

export async function handleLogout() {
  console.log("logging out");
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Error signing out");
      console.error("Error", error);
      return;
    }

    alert("You have signed out!");
    userSession.value = {
      user: null,
      session: null,
    };
  } catch (err) {
    alert("Unknown error signing out");
    console.error("Error", err);
  }
}

