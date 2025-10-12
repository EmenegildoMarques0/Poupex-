import { registerUserAction } from "./register-user.action";
import { signInAction } from "./sign-in.action";
import { signOutAction } from "./sign-out.action";

export const auth = {
    signIn: signInAction,
    signOut: signOutAction,
    register: registerUserAction,
    forgot: () => { }
}