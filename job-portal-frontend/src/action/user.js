"use server";

import { revalidatePath } from "next/cache";

export const register = async (formData, profile, resume) => {
  const fullname = formData?.get("fullname");
  const email = formData?.get("email");
  const password = formData?.get("password");
  const phoneNumber = formData?.get("phoneNumber");
  const profileBio = profile?.profileBio;
  const profilePhoto = profile?.profilePhoto;
  const profileSkills = formData?.get("profileSkills")?.split(",");
  const profileResume = resume?.profileResume;
  const profileResumeOriginalName = resume?.profileResumeOriginalName;
  const role = formData.get("role");

  if (
    !fullname ||
    !email ||
    !password ||
    !phoneNumber ||
    !profileBio ||
    !profilePhoto ||
    !profileSkills?.length ||
    !profileResume ||
    !profileResumeOriginalName ||
    !role
  )
    return { error: "Please fill all the fields" };

  const bodyRequest = JSON.stringify({
    fullname,
    email,
    password,
    phoneNumber,
    profileBio,
    profilePhoto,
    profileSkills,
    profileResume,
    profileResumeOriginalName,
    role,
  });

  try {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyRequest,
        cache: "no-cache",
      }
    );

    const res = await user.json();
    if (res?.success) {
      return { result: res?.user };
    } else {
      throw res?.message;
    }
  } catch (error) {
    return {
      error: error?.response?.data?.message || error?.cause?.code || error,
    };
  }
};

export const login = async (formData) => {
  const email = formData?.get("email");
  const password = formData?.get("password");
  const role = formData.get("role");

  if (!email || !password || !role)
    return { error: "Please fill all the fields" };

  const bodyRequest = JSON.stringify({ email, password, role });

  try {
    const userLogin = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyRequest,
      }
    );
    const res = await userLogin.json();
    const { user, token, success, message } = res;

    if (success) {
      return { result: user, token: token };
    } else {
      throw message;
    }
  } catch (error) {
    console.log(error);
    return {
      error: error?.response?.data?.message || error?.cause?.code || error,
    };
  }
};

export const updateUser = async (formData, profile, resume, token) => {
  const fullname = formData?.get("fullname");
  const email = formData?.get("email");
  const phoneNumber = formData?.get("phoneNumber");
  const profileBio = profile?.profileBio;
  const profilePhoto = profile?.profilePhoto;
  const profileSkills = formData?.get("profileSkills")?.split(",");
  const profileResume = resume?.profileResume;
  const profileResumeOriginalName = resume?.profileResumeOriginalName;

  if (
    !fullname ||
    !email ||
    !phoneNumber ||
    !profileBio ||
    !profilePhoto ||
    !profileSkills?.length ||
    !profileResume ||
    !profileResumeOriginalName
  )
    return { error: "Please fill all the fields" };

  const bodyRequest = JSON.stringify({
    fullname,
    email,
    phoneNumber,
    profileBio,
    profilePhoto,
    profileSkills,
    profileResume,
    profileResumeOriginalName,
  });

  try {
    const userUpdate = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: bodyRequest,
      cache: "no-cache",
    });

    const { success, message, user } = await userUpdate.json();
    if (success) {
      return { result: user, message };
    } else {
      throw message;
    }
  } catch (error) {
    return {
      error: error?.response?.data?.message || error?.cause?.code || error,
    };
  }
};
