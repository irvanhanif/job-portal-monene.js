"use client";
import { userAppliedJobs } from "@/action/application";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LatestJobCard from "./LatestJobCard";

const AppliedJob = () => {
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });
  const [jobs, setJobs] = useState([]);

  const getAppliedJobs = async () => {
    const appliedJobs = await userAppliedJobs(user?.token);
    setJobs(appliedJobs.result);
  };

  useEffect(() => {
    if (user?.token) getAppliedJobs();
  }, [user?.token]);

  return user?.role == "student" ? (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl mb-20">
      <h1 className="text-xl font-bold p-5">Applied Jobs</h1>
      <div className="grid grid-cols-3 gap-4 p-5">
        {jobs?.length > 0 &&
          jobs?.map((app) => (
            <Link
              key={app?.id}
              href={`/findjobs/${app?.job?.id}`}>
              <LatestJobCard job={app?.job} />
            </Link>
          ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AppliedJob;
