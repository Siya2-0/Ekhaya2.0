import AuthButton from "@/components/header-auth";
import Welcome from "@/components/welcome";

export default function ProtectedPage() {
  return (
    <main className="relative flex min-h-screen flex-col pt-0">
      {/* <p className="text-[#303030] font-bold text-[32px] ml-8">Home</p> */}
        <div className="absolute top-0 right-0 p-4 w-full text-gray-400 color-gray-400">
          <AuthButton />
        </div>
        <Welcome/>
    </main>
  );
}