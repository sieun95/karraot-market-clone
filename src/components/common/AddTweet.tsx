"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addTweetAction } from "@/lib/actions/dashboard/tweet";

export default function AddTweet() {
  const [state, formAction] = useFormState(addTweetAction, {
    errors: { content: [] },
    success: undefined,
  });

  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-8">트윗 작성</h1>
      <form action={formAction} className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            트윗 내용
          </label>
          <textarea id="content" name="content" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black" />
          {state.errors?.content && <p className="mt-1 text-sm text-red-600">{state.errors.content[0]}</p>}
        </div>
        <button type="submit" className={`w-full py-2 px-4 rounded-md text-white ${pending ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`} disabled={pending}>
          {pending ? "업로드 중..." : "트윗 업로드"}
        </button>
      </form>
      {state.success && <p className="mt-4 text-green-600">트윗이 성공적으로 업로드되었습니다!</p>}
    </div>
  );
}
