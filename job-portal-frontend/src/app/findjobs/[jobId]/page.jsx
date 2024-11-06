import JobDetails from "@/components/jobs/JobDetails";
import React from "react";

const JobId = async ({ params }) => {
  const { jobId } = await params;
  const job = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/${jobId}`, {
    cache: "no-cache",
  });
  const res = await job.json();
  //   console.log(res, "res");

  return (
    <div className="px-[10%] mx-auto my-10">
      <JobDetails
        singleJobById={res?.job}
        jobId={jobId}
      />
    </div>
  );
};

export default JobId;
