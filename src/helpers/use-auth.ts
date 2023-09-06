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
export type TAuthError = { name: string; message: string };
export async function handleLogin(credentials: Credentials) {
  let errors: TAuthError | null = null;
  let isSuccess = false;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) {
      errors = {
        name: error.name,
        message: error.message,
      };
    }
    // No error throw, but no user detected so send magic link
    if (!error && !data) {
      alert("Check your email for the login link!");
    }

    if (data !== null) {
      userSession.value = data;
      isSuccess = true;
    }
  } catch (error) {
    console.error("Error thrown:", (error as any).message);
    // alert((error as any).error_description || error);
    errors = {
      name: (error as any).error,
      message: (error as any).error_description,
    };
  }
  return { errors, isSuccess };
}

/*
 * Handles signup provided a valid credentials object.
 */
export async function handleSignup(credentials: Credentials) {
  let errors: TAuthError | null = null;
  let isSuccess = false;
  try {
    const { email, password } = credentials;
    const { error, data } = await supabase.auth.signUp({ email, password });
    if (error) {
      errors = {
        name: error.name,
        message: error.message,
      };
    }
    if (data !== null) userSession.value = data;
    isSuccess = true;
  } catch (error) {
    errors = {
      name: (error as any).error,
      message: (error as any).error_description,
    };
  }
  return { errors, isSuccess };
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

    userSession.value = {
      user: null,
      session: null,
    };
    window.location.assign("/login");
  } catch (err) {
    alert("Unknown error signing out");
    console.error("Error", err);
  }
}

