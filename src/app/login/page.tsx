import { redirect } from "next/navigation";
import { login, signInWithGoogle, signup } from "./actions";
import { createClient } from "@/utils/supabase/server";

export default async function LoginPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log({ error });
  }
  console.log({ data });
  if (data.user) redirect("/");
  return (
    <div className="grid place-items-center h-screen ">
      <form className="max-w-md space-y-5">
        <div className="flex flex-col gap-3 ">
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <button formAction={login} className="border p-3 w-full">
              Log in
            </button>
            <button formAction={signup} className="border p-3 w-full">
              Sign up
            </button>
          </div>
        </div>
      </form>
      <form>
        <button formAction={signInWithGoogle} className="border p-3 w-full">
          Google sign in
        </button>
      </form>
    </div>
  );
}
