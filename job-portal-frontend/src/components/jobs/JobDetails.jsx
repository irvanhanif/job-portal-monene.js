"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLocalStorage } from "@mantine/hooks";
import { applyJobHandler, createFavorite } from "@/action/job";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const JobDetails = ({ singleJobById, jobId }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [applyProgress, setApplyProgress] = useState("");

  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  useEffect(() => {
    setIsApplied(
      singleJobById?.Application?.some((application) => {
        return application?.applicantId == user?.id;
      })
    );
  }, [user, singleJobById]);

  const applyJob = async () => {
    setApplyProgress("loading");
    const { error, message } = await applyJobHandler(jobId, user.token);

    if (error) toast.error(error);
    else {
      toast.success(message);
    }
    setApplyProgress("");
  };

  const addToFavorite = async () => {
    const { error, message } = await createFavorite(jobId, user.token);

    if (error) toast.error(error);
    else {
      toast.success(message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between p-3 rounded-lg bg-white">
        <div>
          <h1 className="font-bold text-green-400 text-xl">
            {singleJobById?.title}
          </h1>

          <div className="flex items-center gap-2 my-2">
            <Badge
              className="bg-purple-500 font-bold"
              variant={"ghost"}>
              {singleJobById?.position} positions
            </Badge>
            <Badge
              className="bg-purple-500 font-bold"
              variant={"ghost"}>
              {singleJobById?.jobType}
            </Badge>
            <Badge
              className="bg-purple-500 font-bold"
              variant={"ghost"}>
              Rp. {singleJobById?.salary}
            </Badge>
          </div>
        </div>
        <Button
          onClick={() => applyJob()}
          disabled={isApplied || applyProgress == "loading"}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-400 hover:bg-green-500 cursor-pointer"
          }`}>
          {applyProgress == "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Applying to job..
            </>
          ) : isApplied ? (
            "Already Applied"
          ) : (
            "Apply Now"
          )}
        </Button>
      </div>
      <h1 className="my-4 border-b-2 pb-1 text-green-400 border-b-gray-300 font-semibold pl-2">
        Job Description
      </h1>
      <div className="mb-20 bg-white text-black flex items-center p-3 rounded-lg justify-between m-auto hover:bg-white/95 duration-500">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold my-1 grid grid-cols-2 gap-20">
            Role: <span>{singleJobById?.title}</span>
          </h1>
          <h1 className="font-bold my-1 grid grid-cols-2 gap-20">
            Location: <span>{singleJobById?.location}</span>
          </h1>
          <h1 className="font-bold my-1 grid grid-cols-2 gap-20">
            Description: <span>{singleJobById?.description}</span>
          </h1>
          <h1 className="font-bold my-1 grid grid-cols-2 gap-20">
            Experience: <span>{singleJobById?.experienceLevel} level</span>
          </h1>
          <h1 className="font-bold my-1 grid grid-cols-2 gap-20">
            Salary: <span>Rp. {singleJobById?.salary}</span>
          </h1>
          <h1 className="font-bold my-1 grid grid-cols-2 gap-20">
            Total Applicants: <span>{singleJobById?.Application?.length}</span>
          </h1>
          <h1 className="font-bold my-1 grid grid-cols-2 gap-20">
            Posted Date:{" "}
            <span>{singleJobById?.createdAt?.split("T")?.[0]}</span>
          </h1>
        </div>
        <Button
          className="bg-green-500 hover:bg-green-400/95 rounded-lg mb-auto flex"
          onClick={addToFavorite}>
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default JobDetails;
