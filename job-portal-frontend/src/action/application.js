"use server";

import { revalidatePath } from "next/cache";

export const updateStatus = async (applicationId, statusSend, token, jobId) => {
  try {
    console.log(JSON.stringify({ status: statusSend }));
    console.log(applicationId, token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/application/update-status/${applicationId}`,
      {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: statusSend.toLowerCase() }),
        cache: "no-cache",
      }
    );
    const { success, message, status } = await res.json();
    revalidatePath(`/dashboard/jobs/${jobId}`);

    if (success) return { status, message };
    else throw message;
  } catch (error) {
    return {
      error: error?.response?.data?.message || error?.cause?.code || error,
    };
  }
};

export const userAppliedJobs = async (token) => {
  try {
    let jobs = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/application/my`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );

    const res = await jobs.json();
    const { appliedJobs, success, message } = res;
    if (success) return { result: appliedJobs, message };
    else throw message;
  } catch (error) {
    return {
      error: error?.response?.data?.message || error?.cause?.code || error,
    };
  }
};
