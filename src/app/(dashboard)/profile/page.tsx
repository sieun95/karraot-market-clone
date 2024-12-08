import { getProfileAction } from "@/lib/actions/dashboard/profile";

export default async function Profile() {
  const user = await getProfileAction();
  console.log("user : ", user);
  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-black">
        <h1 className="text-2xl font-bold mb-6">프로필</h1>
        <div className="space-y-4">
          <div>
            <span className="font-medium">이름:</span> {user.username}
          </div>
          <div>
            <span className="font-medium">이메일:</span> {user.email}
          </div>
          <div>
            <span className="font-medium">가입일:</span> {user.createdAt.toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
