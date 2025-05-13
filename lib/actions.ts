"use server";

import { redirect } from "next/navigation";
import { auth } from "./auth/auth";
import { APIError } from "better-auth/api";


interface State{
  errorMessage?: string | null,
}

export const signup = async (prevState:State, formdata: FormData) => {
  const rowData = {
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
    name: formdata.get("name") as string,
  };


  try {
    await auth.api.signUpEmail({
      body: {
        ...rowData,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return ({errorMessage: "user already exists."})
        case "BAD_REQUEST":
          return ({errorMessage:"Invalid Email."})
        default:
          return ({errorMessage: "something went wrong."});
      }
    } else {
      throw new Error("An unknown error occurred.");
    }
  }

  redirect("/");
};

export const login = async (formData: FormData) => {
  const rowData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    remberMe: formData.get("remeberme") as string,
  };

  await auth.api.signInEmail({
    body: {
      ...rowData,
    },
  });

  redirect("/");
};
