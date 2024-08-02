import type { signIn as defaultSignIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  getEmailState as defaultGetEmailState,
  toggleEmailStorage as defaultToggleEmailStorage,
} from "@/features/login/lib/email-storage";

import type { LoginSchemaType } from "@/features/login/model/index";
import { LoginSchema } from "@/features/login/model/index";
import { useRouter } from "next/navigation";

type LoginFormDependencies = {
  getEmailState: typeof defaultGetEmailState;
  toggleEmailStorage: typeof defaultToggleEmailStorage;
  signIn: typeof defaultSignIn;
};

export const useLoginForm = ({
  getEmailState,
  toggleEmailStorage,
  signIn,
}: LoginFormDependencies) => {
  const [rememberEmail, setRememberEmail] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  /**
   * 로그인 폼 제출 핸들러 함수
   * @param form 로그인 폼 데이터
   */
  const submitHandler = async (form: LoginSchemaType) => {
    try {
      toggleEmailStorage({ shouldRemember: rememberEmail, email: form.email });
      // const response = await
      const response = await signIn("credentials", {
        ...form,
        redirect: false,
      });
      if (response?.error) {
        throw new Error("로그인에 실패했습니다.");
      } else {
        router.replace("/");
      }
      console.log("response", response);
    } catch (error) {
      setLoginError("로그인에 실패했습니다!");
      console.log(error);
    }
  };

  /**
   * 이메일 기억하기 상태 토글 함수
   */
  const toggleRememberEmail = () => {
    setRememberEmail((prev) => !prev);
  };

  // 이메일 기억하기 설정
  useEffect(() => {
    const emailState = getEmailState();
    if (emailState.shouldRemember) {
      emailState.email && setValue("email", emailState.email);
      setRememberEmail(emailState.shouldRemember);
    } else {
      setValue("email", "");
      setRememberEmail(false);
    }
  }, [setValue]);

  return {
    rememberEmail,
    setRememberEmail,
    register,
    handleSubmit,
    errors,
    submitHandler,
    toggleRememberEmail,
    getValues,
    loginError,
  };
};
