import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
const LOGIN_URL = API_URL + "/api/auth/login";
const SIGNUP_URL = API_URL + "/api/user-with-role";

export type User = {
  username: string;
  password: string;
  roles?: string[];
  email: string;
  country: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  phone: string;
  street_address: string;
  street_no: string;
  zip: string;
};

interface SignUpResponse {
  username: string;
  password: string;
  roles: Array<string>;
  email: string;
  country: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  phone: string;
  street_address: string;
  street_no: string;
  zip: string;
}

interface SignUpRequest {
  username: string;
  password: string;
  roles: Array<string>;
  email: string;
  country: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  phone: string;
  street_address: string;
  street_no: string;
  zip: string;
}

interface LoginResponse {
  username: string;
  token: string;
  roles: Array<string>;
}

interface LoginRequest {
  username: string;
  password: string;
}

const authProvider = {
  signUp(user: User): Promise<LoginResponse> {
    const options = makeOptions("POST", user);
    return fetch(SIGNUP_URL, options).then(handleHttpErrors);
  },
  isAuthenticated: false,
  signIn(user_: LoginRequest): Promise<LoginResponse> {
    const options = makeOptions("POST", user_);
    return fetch(LOGIN_URL, options).then(handleHttpErrors);
  },
};

export type { SignUpResponse, SignUpRequest, LoginResponse, LoginRequest };
export { authProvider };
