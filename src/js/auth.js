import { nhost } from "./nhost.js";

const signInUrl = "/admin/index.html";
const signOutUrl = "/admin/login.html";
const signIn = async ({ email, password }) => {
  const session = await nhost.auth.signIn({ email, password });

  return session;
};

const isSignedIn = async () => {
  return await nhost.auth.isAuthenticatedAsync();
};

const signOut = async () => {
  await nhost.auth.signOut();
};

export { signIn, signInUrl, isSignedIn, signOut, signOutUrl };
