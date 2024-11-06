"use server";

import { revalidatePath } from "next/cache";

export const applyJobHandler = async (jobId, token) => {
  try {
    const applyJob = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/application/${jobId}`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const res = await applyJob.json();
    const { application, success, message } = res;
    revalidatePath(`/findjobs/${jobId}`);
    if (success) return { result: application, message };
    else throw message;
  } catch (error) {
    return {
      error: error?.response?.data?.message || error?.cause?.code || error,
    };
  }
};

export const createFavorite = async (jobId, token) => {
  try {
    const applyJob = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/job/favorite/${jobId}`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const res = await applyJob.json();
    const { jobFavorite, success, message } = res;
    revalidatePath(`/findjobs/${jobId}`);
    if (success)
      return {
        result: jobFavorite,
        success,
        message: "Add to favorite successfully",
      };
    else throw message;
  } catch (error) {
    return {
      error: error?.response?.data?.message || error?.cause?.code || error,
    };
  }
};

export const AdminJobs = async (token) => {
  try {
    let company = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/admin`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const res = await company.json();
    const { jobs, success, message } = res;
    revalidatePath(`/dashboard/jobs`);
    if (success) return { result: jobs, message };
    else throw message;
  } catch (error) {
    return {
      error: error?.response?.data?.message || error?.cause?.code || error,
    };
  }
};

export const createUpdateJob = async (formData, token) => {
  const title = formData?.get("title");
  const description = formData?.get("description");
  const requirements = formData?.get("requirements");
  const salary = formData?.get("salary");
  const location = formData?.get("location");
  const jobType = formData?.get("jobType");
  const experienceLevel = formData?.get("experienceLevel");
  const position = formData?.get("position");
  const companyId = formData?.get("companyId");

  if (
    !title ||
    !description ||
    !requirements ||
    !salary ||
    !location ||
    !jobType ||
    !experienceLevel ||
    !position ||
    !companyId
  )
    return { error: "Please fill all the fields" };

  const bodyRequest = JSON.stringify({
    title,
    description,
    requirements: requirements?.split(","),
    salary: Number(salary),
    location,
    jobType,
    experienceLevel,
    position: Number(position),
    companyId,
  });

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: bodyRequest,
      cache: "no-cache",
    });

    const { success, job, message } = await res.json();

    // revalidatePath("/dashboard/companies");
    if (success) {
      return { result: job, message };
    } else {
      throw message;
    }
  } catch (error) {
    return {
      error: error?.response?.data?.message || error?.cause?.code || error,
    };
  }
};

export const deleteJob = async (jobId) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/${jobId}`, {
      method: "delete",
      cache: "no-cache",
    });
    const { success, message } = await res.json();

    if (success) {
      return { message, success };
    } else {
      throw message;
    }
  } catch (error) {
    return {
      error: error?.response?.data?.message || error?.cause?.code || error,
    };
  }
};
