import FilterJobs from "@/components/jobs/FilterJobs";
import Job from "@/components/jobs/Job";
import React from "react";

const FindJobs = async ({ searchParams }) => {
  const querySearch = await searchParams;

  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/job?keyword=${
      querySearch?.search ?? ""
    }&location=${querySearch?.location ?? ""}&jobtype=${
      querySearch?.jobtype ?? ""
    }&salary=${querySearch?.salary ?? ""}`,
    { cache: "no-cache" }
  );
  const res = await jobs.json();
  //   console.log(res);

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <div className="flex gap-5">
        <div className="w-1/5 text-white">
          <FilterJobs />
        </div>
        {res?.jobs?.length ? (
          <div className="flex-1 h-[88vh] overflow-y-auto no-scrollbar pb-5">
            <div className="grid grid-cols-3 gap-4">
              {res?.jobs?.map((job) => (
                <Job
                  key={job?.id}
                  job={job}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center text-white flex-col items-center w-full">
            {res?.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJobs;
