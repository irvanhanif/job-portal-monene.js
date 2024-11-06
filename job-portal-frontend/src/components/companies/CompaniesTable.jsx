"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import CreateUpdateCompany from "./CreateUpdateCompany";
import { AdminCompanies } from "@/action/company";
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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Trash2 } from "lucide-react";
import DeleteCompany from "./DeleteCompany";

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  const getCompanies = async () => {
    const result = await AdminCompanies(user?.token);
    if (result?.result?.length) setCompanies(result?.result);
    else setCompanies(result.message);
  };

  useEffect(() => {
    if (user?.token) getCompanies();
  }, [user?.token]);

  useEffect(() => console.log(companies), [companies]);
  return (
    <>
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-fit bg-white"
          placeholder="Filter by name"
        />
        <CreateUpdateCompany
          getCompanies={getCompanies}
          user={user}>
          Create Company
        </CreateUpdateCompany>
      </div>
      <Table className="bg-white">
        <TableCaption>A list of your recent Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length > 0 ? (
            companies.map((company) => (
              <TableRow key={company?.id}>
                <TableCell className="font-medium">
                  <Avatar>
                    <AvatarImage src={company?.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="flex gap-2 justify-end cursor-pointer">
                  <CreateUpdateCompany
                    getCompanies={getCompanies}
                    company={company}
                    user={user}>
                    Edit Company
                  </CreateUpdateCompany>
                  <DeleteCompany
                    getCompanies={getCompanies}
                    id={company?.id}>
                    <Trash2 />
                  </DeleteCompany>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              {/* <TableCell>{console.log(companies)}</TableCell> */}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default CompaniesTable;
