"use client";
import { register } from "@/action/user";
import FormInput from "@/components/FormInput";
import SelectForm from "@/components/SelectForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { inputBodyRegister as inputBody } from "@/lib/data";
import uploadFile from "@/lib/uploadFile";
import { useLocalStorage } from "@mantine/hooks";
import { Loader2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();
  const [progressRequest, setProgressRequest] = useState("Sign Up");
  const [profile, setProfile] = useState({
    profileBio: "",
    profilePhoto: "",
    profileFile: null,
  });
  const [resume, setResume] = useState({
    profileResume: "",
    profileResumeOriginalName: "",
    profileResumeFile: null,
  });

  const [user] = useLocalStorage({
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

    const blobPhoto = profile.profilePhoto;
    if (profile?.profileFile) {
      let uploadPhoto = await uploadFile(profile.profileFile);
      profile.profilePhoto = uploadPhoto?.url;
    }
    const blobResume = resume.profileResume;
    if (resume?.profileResumeFile) {
      let uploadResume = await uploadFile(resume.profileResumeFile);
      resume.profileResume = uploadResume?.url;
    }
    profile.profileFile = null;
    resume.profileResumeFile = null;

    const response = await register(formData, profile, resume);
    resume.profileResume = blobResume;
    profile.profilePhoto = blobPhoto;

    if (response?.error) toast.error(response.error);
    else router?.push("/login");
  };

  const handleFile = async (event, type) => {
    const file = event.target.files?.[0];
    const name = file?.name?.split(".")?.[0];
    const fileUrl = URL.createObjectURL(file);

    if (type == "profile") {
      setProfile({
        profileBio: name,
        profilePhoto: fileUrl,
        profileFile: file,
      });
    } else if (type == "resume") {
      setResume({
        profileResume: fileUrl,
        profileResumeOriginalName: name,
        profileResumeFile: file,
      });
    }
  };

  return (
    <div className=" flex items-center justify-center max-w-7xl mx-auto">
      <form
        className="w-1/2 border-gray-200 rounded p-4 bg-gray-100 my-6"
        onSubmit={handleSubmit}>
        <h1 className="font-bold text-2xl mb-4 text-green-400 text-center">
          Sign Up
        </h1>
        {inputBody.map((inp) => {
          switch (inp.label) {
            case "Select role":
              return (
                <SelectForm
                  label={inp.label}
                  key={inp.label}
                  name={inp.name}
                  placeholder={inp.placeholder}
                  list={inp.list}
                />
              );
            case "Upload Photo":
              inp.onchange = (event) => handleFile(event, "profile");
              if (profile?.profilePhoto)
                return (
                  <div key={inp.label}>
                    <Label>Profile Photo</Label>
                    <div className="h-20 w-20 relative mt-1">
                      <Avatar className="w-full h-full">
                        <AvatarImage
                          className="object-cover"
                          src={profile?.profilePhoto}
                          alt="image profile"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <X
                        size={14}
                        className="absolute -top-1 -right-1 z-10 cursor-pointer"
                        onClick={() =>
                          setProfile({
                            profileBio: "",
                            profilePhoto: "",
                            profileFile: null,
                          })
                        }
                      />
                    </div>
                  </div>
                );
              else break;
            case "Upload Resume":
              inp.onchange = (event) => handleFile(event, "resume");
              if (resume?.profileResume)
                return (
                  <div key={inp.label}>
                    <Label>Resume</Label>
                    <div className="h-20 relative mt-1">
                      <object
                        data={resume?.profileResume}
                        type="application/pdf"
                        width={"100%"}
                        height={"100%"}>
                        <p>
                          Alternative text - include a link{" "}
                          <a href={resume?.profileResume}> to the pdf</a>
                        </p>
                      </object>
                      <X
                        size={14}
                        className="absolute -top-1 -right-1 z-10 cursor-pointer"
                        onClick={() =>
                          setResume({
                            profileResume: "",
                            profileResumeOriginalName: "",
                            profileResumeFile: null,
                          })
                        }
                      />
                    </div>
                  </div>
                );
              else break;
          }

          return (
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
              Processing register..
            </>
          ) : (
            progressRequest
          )}
        </Button>
        <span>
          Already have an account?<Link href={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
