"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signup = async (formData: FormData) => {
  const supabase = createClient();
  const Data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signUp(Data);

  if (error) {
    console.log({ error });
  } else {
    revalidatePath("/", "layout");
    redirect("/");
  }
};

export const login = async (formData: FormData) => {
  const supabase = createClient();

  const Data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(Data);

  if (error) {
    console.log({ error });
  } else {
    revalidatePath("/", "layout");
    redirect("/");
  }
};

export const signInWithGoogle = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });
  if (error) {
    console.log({ error });
  } else {
    console.log({ data });
    revalidatePath("/", "layout");
    redirect(`${data.url}`);
  }
};
