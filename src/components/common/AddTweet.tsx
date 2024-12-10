"use client";

import { useFormState } from "react-dom";
import { addTweetAction } from "@/lib/actions/dashboard/addTweet";
import FormInput from "@/components/ui/form-input";
import FormButton from "@/components/ui/form-btn";

export default function AddTweet() {
  const [state, formAction] = useFormState(addTweetAction, {
    errors: { content: [] },
    success: undefined,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-8">트윗 작성</h1>

      <form action={formAction} className="w-full max-w-sm space-y-4">
        <FormInput name="content" type="text" placeholder="트윗 내용" required={true} errors={state.errors?.content || []} />
        <FormButton text="투윗 추가" />
      </form>
      {state.success && <p className="mt-4 text-green-600">트윗이 성공적으로 업로드되었습니다!</p>}
    </div>
  );
}
