"use client";
import React from "react";
import { Button } from "../ui/button";
import { BookMarked } from "lucide-react";
import { createFavorite } from "@/action/job";
import { useLocalStorage } from "@mantine/hooks";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

const Job = ({ job }) => {
  const router = useRouter();
  const daysAgo = (time) => {
    const createdAt = new Date(time);
    const currentDate = new Date();
    const timeDiff = currentDate - createdAt;
    return Math.floor(timeDiff / (24 * 60 * 60 * 1000));
  };

  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  const addToFavorite = async () => {
    const { error, message } = await createFavorite(job?.id, user?.token);

    if (error) toast.error(error);
    else toast.success(message);
  };

  return (
    <div className="p-5 rounded-md shadow-xl text-purple-800 divide-fuchsia-500 border bg-white hover:bg-white/95 border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm">
          {daysAgo(job?.createdAt) == 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => addToFavorite()}
          className="rounded-full bg-green-400 hover:bg-green-400">
          <BookMarked className="text-white" />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <div className="">
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm">{job?.company?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg my-2">{job?.title}</h1>
        <p className="text-sm">{job?.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <Badge
          className="font-bold"
          variant={"ghost"}>
          {job?.position} positions
        </Badge>
        <Badge
          className="font-bold"
          variant={"ghost"}>
          {job?.jobType}
        </Badge>
        <Badge
          className="font-bold"
          variant={"ghost"}>
          Rp. {job?.salary}
        </Badge>
      </div>
      <div className="space-x-4 mt-4">
        <Button
          variant="outline"
          onClick={() => router.push(`/findjobs/${job?.id}`)}
          className="rounded-lg">
          Details
        </Button>
        <Button
          onClick={() => addToFavorite()}
          className="rounded-lg text-white bg-green-400 hover:bg-green-400">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
