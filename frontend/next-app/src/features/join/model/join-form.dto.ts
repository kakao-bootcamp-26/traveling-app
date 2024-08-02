import { z } from "zod";

export type JoinSchemaType = z.infer<typeof JoinSchema>;

export const JoinSchema = z
  .object({
    email: z.string().min(1, "1글자 이상 입력해주세요").email("이메일 형식을 입력해주세요."),
    password: z
      .string()
      .min(8, "8글자 이상 입력해주세요.")
      .max(15, "15글자 이하로 입력해주세요.")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
        "영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.",
      ),
    passwordConfirmation: z
      .string()
      .min(8, "8글자 이상 입력해주세요.")
      .max(15, "15글자 이하로 입력해주세요."),
    username: z.string().min(2, "2글자 이상 입력해주세요").max(10, "10글자 이하로 입력해주세요."),
    nickname: z.string().min(2, "2글자 이상 입력해주세요").max(10, "10글자 이하로 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });
