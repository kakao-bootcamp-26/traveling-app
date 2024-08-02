import { z } from "zod";

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object({
  email: z.string().min(1, "1글자 이상 입력해주세요").email("이메일 형식을 입력해주세요."),
  password: z
    .string()
    .min(8, "8글자 이상 입력해주세요.")
    .max(15, "15글자 이하로 입력해주세요.")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
      "영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.",
    ),
});
