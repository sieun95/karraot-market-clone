"use server";

export async function handleForm(formData: FormData) {
  const password = formData.get("password")?.toString();

  if (password === "12345") {
    return {
      message: "로그인 성공!",
      success: true,
    };
  }

  return {
    message: "비밀번호가 올바르지 않습니다.",
    success: false,
  };
}
