"use server";

import { redirect } from "next/navigation";
import { auth } from "./auth/auth";
import { APIError } from "better-auth/api";

interface State {
  errorMessage?: string | null;
}

export const signup = async (prevState: State, formdata) => {
  const rowData = {
    email: formdata.email as string,
    password: formdata.password as string,
    name: formdata.username as string,
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
          return { errorMessage: "user already exists." };
        case "BAD_REQUEST":
          return { errorMessage: "Invalid Email." };
        default:
          return { errorMessage: "something went wrong." };
      }
    } else {
      throw new Error("An unknown error occurred.");
    }
  }

  redirect("/");
};

export const login = async (formData) => {
  const rowData = {
    email: formData.email as string,
    password: formData.password as string,
    remberMe: formData.remeberme as string,
  };

  try {
    await auth.api.signInEmail({
      body: {
        ...rowData,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return { errorMessage: "user already exists." };
        case "BAD_REQUEST":
          return { errorMessage: "Invalid Email." };
        default:
          return { errorMessage: "something went wrong." };
      }
    } else {
      throw new Error("An unknown error occurred.");
    }
  }

  redirect("/");
};
