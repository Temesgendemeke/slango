"use server";
import { auth } from "./auth/auth";
import { APIError } from "better-auth/api";

export const signup = async (formdata) => {
  const rowData = {
    email: formdata.email as string,
    password: formdata.password as string,
    name: formdata.name as string,
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
          return { success: false, errorMessage: "user already exists." };
        case "BAD_REQUEST":
          return { success: false, errorMessage: "Invalid Email." };
        default:
          return { success: false, errorMessage: "something went wrong." };
      }
    } else {
      return { success: false, errorMessage: "An unknown error occurred." };
    }
  }

  return { success: true, errorMessage: "" };
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
          return { success: false, errorMessage: "user already exists." };
        case "BAD_REQUEST":
          return { success: false, errorMessage: "Invalid Email." };
        case "UNAUTHORIZED":
          return {
            success: false,
            errorMessage: "Incorrect email or password.",
          };
        default:
          return { success: false, errorMessage: "" };
      }
    }
  }

  return { success: true, errorMessage: "" };
};
