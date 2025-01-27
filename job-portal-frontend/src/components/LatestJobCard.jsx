import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCard = ({ job }) => {
  return (
    <div className="p-4 rounded-ee-2xl rounded-ss-2xl text-green-400 shadow-xl flex flex-col gap-4 bg-black/40 hover:outline-gray-400/80 hover:outline cursor-pointer text-center">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <img
            className="w-32 brightness-125"
            src={job?.company?.logo}
            alt={job?.company?.name}
          />
        </div>
        <div>
          <h1 className="font-bold text-2xl">{job?.title}</h1>
          <p className="text-sm text-white">{job?.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Badge
          className="bg-gray-200 font-bold"
          variant={"secondary"}>
          {job?.position} positions
        </Badge>
        <Badge
          className="bg-gray-200 font-bold"
          variant={"secondary"}>
          {job?.jobType}
        </Badge>
        <Badge
          className="bg-gray-200 font-bold"
          variant={"secondary"}>
          Rp. {job?.salary}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
