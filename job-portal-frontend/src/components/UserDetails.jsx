"use client";
import { useLocalStorage } from "@mantine/hooks";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Mail, Pen, PhoneCall } from "lucide-react";
import { Badge } from "./ui/badge";
import UpdateProfileDialog from "./UpdateProfileDialog";

const UserDetails = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });
  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="">
            <h1 className="font-medium text-xl">{user?.fullname}</h1>
            <p>{user?.profileBio || "Add your profile here"}</p>
          </div>
          <Avatar>
            <AvatarImage
              src={user?.profilePhoto}
              alt={user?.fullname}
            />
          </Avatar>
        </div>

        <UpdateProfileDialog
          setOpen={setOpen}
          open={open}
          user={user}
          setUser={setUser}>
          <Button
            className="text-right"
            variant="outline">
            <Pen />
          </Button>
        </UpdateProfileDialog>
      </div>
      <div className="my-5">
        <div className="flex items-center my-2 gap-3">
          <Mail className="h-4 w-4" />
          <span>{user?.email}</span>
        </div>
        <div className="flex items-center my-2 gap-3">
          <PhoneCall className="h-4 w-4" />
          <span>{user?.phoneNumber}</span>
        </div>
      </div>
      <div>
        <h1 className="my-2 font-bold">Skills</h1>
        <div className="space-x-2">
          {user?.profileSkills?.length > 0 ? (
            user?.profileSkills?.map((skill) => (
              <Badge
                key={skill}
                className="bg-green-400 hover:bg-green-400">
                {skill}
              </Badge>
            ))
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
