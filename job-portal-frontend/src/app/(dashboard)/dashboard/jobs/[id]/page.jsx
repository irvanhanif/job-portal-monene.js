import ApplicantsTable from "@/components/jobs/ApplicantsTable";
import React from "react";

const JobId = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/application/job/${id}`,
    { cache: "no-cache" }
  );
  const { job, success, message } = await res.json();
  //   console.log(job.Application);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="font-semibold text-xl my-5 text-white">
        Applicants from job with ID {id}
      </h1>
      <ApplicantsTable
        applicants={job?.Application}
        jobId={job?.id}
      />
    </div>
  );
};

export default JobId;
