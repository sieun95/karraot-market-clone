"use server";

import { SignInState } from "@/types/auth";

export async function getTweetsAction(prevState: SignInState, formData: FormData) {
  console.log(prevState);
  console.log(formData);
    return "true"
}
