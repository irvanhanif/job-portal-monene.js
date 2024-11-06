"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useLocalStorage } from "@mantine/hooks";
import { updateStatus } from "@/action/application";
import { toast } from "sonner";

const ApplicantsTable = ({ applicants, jobId }) => {
  const shortListStatus = ["Accepted", "Rejected"];
  const [user] = useLocalStorage({ key: "userData", defaultValue: {} });

  const statusHandler = async (status, applicationId) => {
    const result = await updateStatus(
      applicationId,
      status,
      user?.token,
      jobId
    );
    if (result?.error) {
      toast.error(result?.message);
    } else {
      toast.success(result?.message);
    }
  };
  return (
    <Table className="bg-white">
      <TableCaption>A list of your recent Jobs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Full Name</TableHead>
          <TableHead className="text-center">Contact</TableHead>
          <TableHead className="text-center">Image</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants?.length > 0
          ? applicants.map((applicant) => (
              <TableRow key={applicant?.id}>
                <TableCell className="text-center">
                  {applicant?.applicant?.fullname}
                </TableCell>
                <TableCell className="text-center">
                  {applicant?.applicant?.email}
                </TableCell>
                <TableCell className="flex justify-center">
                  <Avatar>
                    <AvatarImage src={applicant?.applicant?.profilePhoto} />
                  </Avatar>
                </TableCell>
                <TableCell className="text-center">
                  {applicant?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell>
                  <div className="flex justify-evenly">
                    {applicant?.status}
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortListStatus?.map((item) => (
                          <div
                            key={item}
                            className="flex w-fit items-center gap-2 cursor-pointer mt2"
                            onClick={() => statusHandler(item, applicant?.id)}>
                            <span>{item}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
                {/* <TableCell className="text-center">
                </TableCell> */}

                <TableCell className="text-center cursor-pointer">
                  {/* <DeleteJob
                    getJobs={getJobs}
                    id={job?.id}> */}
                  <Trash2 />
                  {/* </DeleteJob> */}
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
};

export default ApplicantsTable;
