"use client";
import { login } from "@/action/user";
import FormInput from "@/components/FormInput";
import SelectForm from "@/components/SelectForm";
import { Button } from "@/components/ui/button";
import { inputBodyLogin as inputBody } from "@/lib/data";
import { useLocalStorage } from "@mantine/hooks";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();
  const [progressRequest, setProgressRequest] = useState("Login");

  const [user, setUser] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  useEffect(() => {
    if (user?.role == "recruiter") router?.push("/admin/companies");
    else if (user?.role == "student") router?.push("/");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProgressRequest("loading");
    const formData = new FormData(event.target);

    const response = await login(formData);

    if (response?.error) {
      setProgressRequest("Login");
      toast?.error(response.error);
    } else {
      const { result, token } = response;
      setUser({ ...result, token });
      router?.push("/");
    }
  };

  return (
    <div className=" flex items-center h-[calc(100vh_-_80px)] justify-center max-w-7xl mx-auto">
      <form
        className="w-1/2 border-gray-200 rounded p-4 bg-gray-100 my-6"
        onSubmit={handleSubmit}>
        <h1 className="font-bold text-2xl mb-4 text-green-400 text-center">
          Login
        </h1>
        {inputBody.map((inp) => {
          return inp.label == "Select role" ? (
            <SelectForm
              label={inp.label}
              key={inp.label}
              name={inp.name}
              placeholder={inp.placeholder}
              list={inp.list}
            />
          ) : (
            <FormInput
              key={inp.label}
              label={inp.label}
              type={inp.type}
              name={inp.name}
              placeholder={inp.placeholder}
              onChange={inp.onchange}
            />
          );
        })}
        <Button
          disabled={progressRequest == "loading"}
          className="w-full my-4 bg-green-500/90 hover:bg-green-500/95"
          type="submit">
          {progressRequest == "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing login..
            </>
          ) : (
            progressRequest
          )}
        </Button>
        <span>
          You dont have an account?<Link href={"/register"}>Sign Up</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
