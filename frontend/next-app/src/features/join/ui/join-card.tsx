"use client";
import { JoinSchema, type JoinSchemaType } from "@/features/join/index.ts";
import { Form, Input, ValidateInput } from "@blog/components";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { join } from "@/features/join/api/join.api";
import Link from "next/link";
import CheckDuplicateButton from "@/features/join/ui/CheckDuplicateButton";
import ErrorConfirm from "@/shared/ui/errorConfirmation/index";
import { checkDuplicate } from "@/features/join/api/check-duplicate.api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setJoinSuccessExpirationInSessionStorage } from "@/features/join/lib/index";

// TODO: Hook으로 관심사를 분리하고 로직을 따로 떼는게 좋지 않을까?
export function JoinCard() {
  const router = useRouter();
  const [duplicateState, setDuplicateState] = useState({
    email: {
      status: "none", // fail | success | idle
      message: "",
    },
    nickname: {
      status: "none",
      message: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    // setError,
  } = useForm<JoinSchemaType>({
    resolver: zodResolver(JoinSchema),
  });

  const submitHandler: SubmitHandler<JoinSchemaType> = async (data) => {
    const joinResult = await join(data);
    if (joinResult.success) {
      setJoinSuccessExpirationInSessionStorage(true);
      router.replace("/join/success");
    }
  };

  const checkDuplicateHandler = (field: keyof JoinSchemaType) => async () => {
    if (duplicateState[field as "email" | "nickname"].status === "idle") {
      return;
    }
    try {
      // IDLE 상태로 변경
      setDuplicateState((prev) => ({
        ...prev,
        [field]: { status: "idle", message: "" },
      }));

      // 값의 유효성 검사를 먼저 실행
      const isValid = await trigger(field);

      if (!isValid) {
        setDuplicateState((prev) => ({
          ...prev,
          [field]: { status: "fail", message: "중복 검사 요청 실패 (형식을 지켜주세요)" },
        }));
        return;
      }

      // 중복 검사
      const value = getValues(field);

      const response = await checkDuplicate(field, value);
      if (response.success) {
        setDuplicateState((prev) => ({
          ...prev,
          [field]: { status: "success" },
        }));
      } else {
        setDuplicateState((prev) => ({
          ...prev,
          [field]: { status: "fail", message: "중복된 값입니다." },
        }));
      }
    } catch (error) {
      setDuplicateState((prev) => ({
        ...prev,
        [field]: { status: "fail", message: "요청에 문제가 발생했습니다." },
      }));
    }
  };

  const canSubmit = Object.values(duplicateState).every((state) => state.status === "success");
  const isIdle = Object.values(duplicateState).some((state) => state.status === "idle");

  return (
    <section>
      <h1 className="font-notoSansKr text-xl font-bold mb-[24px]">회원정보 입력</h1>
      <Form className="flex flex-col gap-y-4" onSubmit={handleSubmit(submitHandler)}>
        <Input
          label="이름"
          type="text"
          id="username"
          className="border-2 rounded-md w-[400px] py-[4px] px-[8px] text-[14px] "
          placeholder="성함을 입력해주세요"
          {...register("username")}
        />

        <ValidateInput
          label="닉네임"
          type="text"
          className="border-2 rounded-md w-[400px] py-[4px] px-[8px] text-[14px] "
          id="nickname"
          placeholder="닉네임을 입력해주세요"
          validateButton={
            <CheckDuplicateButton
              onCheckDuplicate={checkDuplicateHandler("nickname")}
              disabled={isIdle}
              className={`text-[14px] ml-2 ${isIdle ? "text-gray-300" : "text-black"}`}
            />
          }
          {...register("nickname")}
        />
        <div className="h-[15px] text-[12px]">
          {duplicateState.nickname.status === "none" && "중복 요청을 해주세요."}
          {duplicateState.nickname.status === "success" && "사용 가능한 닉네임입니다."}
          {duplicateState.nickname.status === "fail" && duplicateState.nickname.message}
        </div>

        <ValidateInput
          label="이메일"
          type="email"
          className="border-2 rounded-md w-[400px] py-[4px] px-[8px] text-[14px] "
          id="email"
          placeholder="이메일을 입력해주세요"
          validateButton={
            <CheckDuplicateButton
              onCheckDuplicate={checkDuplicateHandler("email")}
              disabled={isIdle}
              className={`text-[14px] ml-2`}
            />
          }
          {...register("email")}
        />
        <div className="h-[15px] text-[12px]">
          {duplicateState.email.status === "none" && "중복 요청을 해주세요."}
          {duplicateState.email.status === "success" && "사용 가능한 이메일입니다."}
          {duplicateState.email.status === "fail" && duplicateState.email.message}
        </div>
        <Input
          label="비밀번호"
          type="password"
          className="border-2 rounded-md w-[400px] py-[4px] px-[8px] text-[14px] "
          id="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("password")}
        />
        <Input
          label="비밀번호 확인"
          type="password"
          id="passwordConfirmation"
          className="border-2 rounded-md w-[400px] py-[4px] px-[8px] text-[14px] "
          placeholder="비밀번호를 입력해주세요"
          {...register("passwordConfirmation")}
        />
        <ErrorConfirm errors={errors} />
        <div className="flex justify-center gap-x-8 mt-4">
          <button
            className="text-[15px] border-2 rounded-md w-[130px] py-[2px]"
            type="submit"
            disabled={!canSubmit}
          >
            가입하기
          </button>
          <Link
            className="text-[15px] border-2 rounded-md w-[130px] py-[2px] text-center"
            href="/login"
          >
            로그인 페이지로
          </Link>
        </div>
      </Form>
    </section>
  );
}
// yarn workspace next-app add react-hook-form zod @hookform/resolvers
