import { registerUserAction } from "./register-user.action";
import { signInAction } from "./sign-in.action";

export const auth = {
    signIn: signInAction,
    register: registerUserAction,
    forgot: () => { }
}