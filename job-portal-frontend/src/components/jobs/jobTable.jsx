"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import CreateUpdateJob from "./CreateUpdateJob";
import { AdminJobs } from "@/action/job";
import { useLocalStorage } from "@mantine/hooks";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import DeleteJob from "./DeleteJob";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const JobsTable = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  const getJobs = async () => {
    const result = await AdminJobs(user?.token);
    if (result?.result?.length) setJobs(result?.result);
    else setJobs(result.message);
  };

  useEffect(() => {
    if (user?.token) getJobs();
  }, [user?.token]);

  useEffect(() => console.log(jobs), [jobs]);
  return (
    <>
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-fit bg-white"
          placeholder="Filter by name"
        />
        <CreateUpdateJob
          getJobs={getJobs}
          user={user}>
          Create Job
        </CreateUpdateJob>
      </div>
      <Table className="bg-white">
        <TableCaption>A list of your recent Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Company</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Experience</TableHead>
            <TableHead className="text-center">Position</TableHead>
            <TableHead className="text-center">Salary</TableHead>
            <TableHead className="text-center">Date Created</TableHead>
            <TableHead className="text-center">Applicant</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs?.length > 0
            ? jobs.map((job) => (
                <TableRow key={job?.id}>
                  <TableCell className="text-center">
                    {job?.company?.name}
                  </TableCell>
                  <TableCell className="text-center">{job?.title}</TableCell>
                  <TableCell className="text-center">
                    {job?.experienceLevel}
                  </TableCell>
                  <TableCell className="text-center">{job?.position}</TableCell>
                  <TableCell className="text-center">{job?.salary}</TableCell>
                  <TableCell className="text-center">
                    {job?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-center">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div
                          className="flex w-fit items-center gap-2 cursor-pointer mt2"
                          onClick={() =>
                            router.push(`/dashboard/jobs/${job?.id}`)
                          }>
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell className="text-center cursor-pointer">
                    <DeleteJob
                      getJobs={getJobs}
                      id={job?.id}>
                      <Trash2 />
                    </DeleteJob>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </>
  );
};

export default JobsTable;
