/**
 * @jest-environment jsdom
 */

// test utils: https://github.com/joao-vitor-felix/prime/blob/5e9e61bf8485047ad075e94ee2d09cd9122f90be/.vitest/setup.ts#L1
import { useLoginForm } from "@/features/login/hooks/useLoginForm";
// import { renderHook, act } from "@testing-library/react-hooks";
import { renderHook, act } from "@testing-library/react"; // React v18 이후
import { signIn } from "next-auth/react";
// vi.mock("next-auth/react");

describe("useLoginForm", () => {
  const mockGetEmailState = vi.fn();
  const mockToggleEmailStorage = vi.fn();
  const mockSignIn = vi.fn();

  beforeEach(() => {
    mockGetEmailState.mockClear();
    mockToggleEmailStorage.mockClear();
    mockSignIn.mockClear();
  });

  it("should initialize with correct email State", () => {
    mockGetEmailState.mockReturnValue({ email: "blackberry1114@naver.com", shouldRemember: true });
    const { result } = renderHook(() =>
      useLoginForm({
        getEmailState: mockGetEmailState,
        toggleEmailStorage: mockToggleEmailStorage,
        signIn: mockSignIn,
      }),
    );
    expect(result.current.rememberEmail).toEqual(true);
    expect(result.current.getValues("email")).toEqual("blackberry1114@naver.com");
  });

  it('should not set email when if rememberEmail State is "false"', () => {
    mockGetEmailState.mockReturnValue({ shouldRemeber: false, email: "" });
    const { result } = renderHook(() =>
      useLoginForm({
        getEmailState: mockGetEmailState,
        toggleEmailStorage: mockToggleEmailStorage,
        signIn: mockSignIn,
      }),
    );

    expect(result.current.rememberEmail).toEqual(false);
    expect(result.current.getValues("email")).toEqual("");
  });

  it("should submit form with correct data", () => {
    const { result } = renderHook(() =>
      useLoginForm({
        getEmailState: mockGetEmailState,
        toggleEmailStorage: mockToggleEmailStorage,
        signIn: mockSignIn,
      }),
    );
    const email = "blackberry1114@naver.com";
    const password = "aaaa2222@";
    act(() => {
      result.current.submitHandler({ email: email, password });
    });

    expect(mockToggleEmailStorage).toHaveBeenCalledWith({ shouldRemember: false, email: email });
    expect(mockSignIn).toHaveBeenCalledWith("credentials", {
      email,
      password,
      redirect: false,
      // callbackUrl: "/",
    });
  });

  it("should toggle rememberEmail State", () => {
    const { result } = renderHook(() =>
      useLoginForm({
        getEmailState: mockGetEmailState,
        toggleEmailStorage: mockToggleEmailStorage,
        signIn: mockSignIn,
      }),
    );

    // 초깃값은 false
    expect(result.current.rememberEmail).toEqual(false);

    // 토글!
    act(() => {
      result.current.toggleRememberEmail();
    });

    // 토글한 경우 상태를 뒤집음
    expect(result.current.rememberEmail).toEqual(true);

    act(() => {
      result.current.toggleRememberEmail();
    });

    expect(result.current.rememberEmail).toEqual(false);
  });

  it("should handle form errors when submit unregistered email", async () => {
    const { result } = renderHook(() =>
      useLoginForm({
        getEmailState: mockGetEmailState,
        toggleEmailStorage: mockToggleEmailStorage,
        signIn,
      }),
    );

    await act(async () => {
      await result.current.submitHandler({ email: "", password: "aaaa2222!" });
    });

    expect(result.current.loginError).toEqual("로그인에 실패했습니다!");
  });

  it("should set email value when getEmailState returns email and shouldRemember is true", () => {
    mockGetEmailState.mockReturnValue({ shouldRemember: true, email: "remembered@example.com" });

    const { result } = renderHook(() =>
      useLoginForm({
        getEmailState: mockGetEmailState,
        toggleEmailStorage: mockToggleEmailStorage,
        signIn: mockSignIn,
      }),
    );

    expect(result.current.rememberEmail).toBe(true);
    expect(result.current.getValues("email")).toEqual("remembered@example.com");
  });
});
