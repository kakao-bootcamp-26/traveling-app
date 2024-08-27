// https://velog.io/@049494/%EA%B5%AC%EA%B8%80-%EB%A1%9C%EA%B7%B8%EC%9D%B8
export const useLoginHandler = () => {
  // const loginHandler = useGoogleLogin({
  //   flow: "auth-code",
  //   onSuccess: async (credentialResponse) => {
  //     console.log(credentialResponse);
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //   },
  //   scope: "email profile",
  //   // redirect_uri: import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI
  //   redirect_uri: "postmessage",
  // });

  const loginHandler = async () => {
    try {
      // await fetchLoginPage();
      window.location.href = "http://localhost:3000/auth/google";
    } catch (error) {
      console.error("로그인 에러 발생...", error);
    }
  };

  return {
    loginHandler,
  };
};
