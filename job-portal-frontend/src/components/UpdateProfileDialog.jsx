import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { inputBodyUpdateUser as inputBody } from "@/lib/data";
import SelectForm from "./SelectForm";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Loader2, X } from "lucide-react";
import FormInput from "./FormInput";
import { updateUser } from "@/action/user";
import uploadFile from "@/lib/uploadFile";
import { toast } from "sonner";

const UpdateProfileDialog = ({ children, open, setOpen, user, setUser }) => {
  const [profile, setProfile] = useState();
  const [resume, setResume] = useState();
  const [progressRequest, setProgressRequest] = useState("Save changes");

  useEffect(() => {
    setProfile({
      profileBio: user?.profileBio,
      profilePhoto: user?.profilePhoto,
      profileFile: null,
    });
    setResume({
      profileResume: user?.profileResume,
      profileResumeOriginalName: user?.profileResumeOriginalName,
      profileResumeFile: null,
    });
  }, [user?.token]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProgressRequest("loading");
    const dataUser = new FormData(event.target);

    if (profile?.profileFile) {
      let uploadPhoto = await uploadFile(profile.profileFile);
      profile.profilePhoto = uploadPhoto?.url;
    }
    if (resume?.profileResumeFile) {
      let uploadResume = await uploadFile(resume.profileResumeFile);
      resume.profileResume = uploadResume?.url;
    }

    const userUpdated = await updateUser(
      dataUser,
      profile,
      resume,
      user?.token
    );

    if (userUpdated?.error) toast.error(userUpdated.error);
    else {
      toast.success(userUpdated?.message);
      setUser({ ...userUpdated?.result, token: user?.token });
    }
    setProgressRequest("Save changes");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
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
                return (
                  <div key={inp.label}>
                    {profile?.profilePhoto && (
                      <div>
                        <Label>Profile Photo</Label>
                        <div className="h-20 w-20 relative mt-1">
                          <Avatar className="w-full h-full">
                            <AvatarImage
                              className="object-cover"
                              src={profile?.profilePhoto}
                              alt="image profile"
                            />
                            <AvatarFallback className="capitalize">
                              {user?.fullname?.charAt(0)}
                            </AvatarFallback>
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
                    )}
                    <FormInput
                      label={inp.label}
                      type={inp.type}
                      name={inp.name}
                      placeholder={inp.placeholder}
                      defaultValue={user?.[inp.name]}
                      onChange={(event) => handleFile(event, "profile")}
                    />
                  </div>
                );
              case "Upload Resume":
                return (
                  <div key={inp.label}>
                    {resume?.profileResume && (
                      <div>
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
                    )}
                    <FormInput
                      label={inp.label}
                      type={inp.type}
                      name={inp.name}
                      placeholder={inp.placeholder}
                      defaultValue={user?.[inp.name]}
                      onChange={(event) => handleFile(event, "resume")}
                    />
                  </div>
                );
            }

            return (
              <FormInput
                key={inp.label}
                label={inp.label}
                type={inp.type}
                name={inp.name}
                placeholder={inp.placeholder}
                onChange={inp.onchange}
                defaultValue={
                  user?.name == "profileSkills"
                    ? user?.[inp.name]?.join()
                    : user?.[inp.name]
                }
              />
            );
          })}
          <Button
            type="submit"
            className="ml-auto mt-2 justify-end flex"
            disabled={progressRequest == "loading"}>
            {progressRequest == "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating data..
              </>
            ) : (
              progressRequest
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
