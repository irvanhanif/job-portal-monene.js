import Link from "next/link";
import React from "react";
import LatestJobCard from "../LatestJobCard";

const LatestJobs = ({ jobs }) => {
  return (
    <div className="max-w-5xl mx-auto text-center my-20">
      <h1 className="text-4xl font-bold text-white">
        <span className="text-green-400">Latest </span>
        <span>
          and Top <span className="text-green-400">Job</span> Openings
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {jobs?.length > 0 &&
          jobs?.slice(0, 6).map((job) => (
            <Link
              href={`/findjobs/${job?.id}`}
              key={job?.id}>
              <LatestJobCard job={job} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default LatestJobs;
