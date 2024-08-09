import { useGoogleLogin } from "@react-oauth/google";

// https://velog.io/@049494/%EA%B5%AC%EA%B8%80-%EB%A1%9C%EA%B7%B8%EC%9D%B8
export const useLoginHandler = () => {
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    },
    scope: "email profile",
    // redirect_uri: import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI
    redirect_uri: "postmessage",
  });

  const loginHandler = () => {
    login();
  };

  return {
    loginHandler,
  };
};
