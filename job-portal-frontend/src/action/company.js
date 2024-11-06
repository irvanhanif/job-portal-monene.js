"use server";

// import { revalidatePath } from "next/cache";

export const AdminCompanies = async (token) => {
  try {
    let company = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const res = await company.json();
    const { companies, success, message } = res;
    // revalidatePath(`/dashboard/jobs`);
    if (success) return { result: companies, message };
    else throw message;
  } catch (error) {
    return {
      error: error?.response?.data?.message || error?.cause?.code || error,
    };
  }
};

export const newCompany = async (formData, logo, token, companyId) => {
  const name = formData?.get("name");
  const description = formData?.get("description");
  const website = formData?.get("website");
  const location = formData?.get("location");

  if (!name || !description || !website || !location)
    return { error: "Please fill all the fields" };

  const bodyRequest = JSON.stringify({
    name,
    description,
    website,
    location,
    logo,
  });

  let res;
  try {
    if (!companyId) {
      res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: bodyRequest,
        cache: "no-cache",
      });
    } else {
      res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/company/${companyId}`,
        {
          method: "put",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: bodyRequest,
          cache: "no-cache",
        }
      );
    }

    const { success, company, message } = await res.json();

    // revalidatePath("/dashboard/companies");
    if (success) {
      return { result: company, message };
    } else {
      throw message;
    }
  } catch (error) {
    return {
      error: error?.response?.data?.message || error?.cause?.code || error,
    };
  }
};

export const deleteCompany = async (companyId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/company/${companyId}`,
      {
        method: "delete",
        cache: "no-cache",
      }
    );
    const { success, message } = await res.json();

    console.log(message);
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
