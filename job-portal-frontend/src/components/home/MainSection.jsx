"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const MainSection = () => {
  const router = useRouter();

  const handleSearch = async (formData) => {
    const name = formData.get("name");
    router.push(`findjobs?search=${name}`);
  };

  return (
    <div className="text-center text-white">
      <div className="flex flex-col gap-5 my-10">
        <div className="text-center mx-auto">
          <div className="text-green-400 px-4 py-2 rounded-full bg-black/50 font-semibold">
            No. 1 Job Searching Site
          </div>
        </div>
        <h1 className="text-5xl font-bold">
          <span className="text-green-400">Discover</span>, Apply
          <span className="text-green-400"> &</span>
          <br />
          Land your Perfect Job
        </h1>
        <p className="max-w-screen-md mx-auto">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. At voluptas
          delectus, nihil quos rem repudiandae iste ad explicabo nemo cumque
          veniam unde consectetur natus deserunt laboriosam consequuntur nobis
          laudantium. Consequatur.
        </p>
        <form action={handleSearch}>
          <div className="flex w-2/5 shadow-lg border pl-3 bg-white rounded-full items-center gap-4 mx-auto text-slate-600">
            <input
              type="text"
              name="name"
              placeholder="Find your dream job"
              className="outline-none border-none bg-white w-full"
            />
            <Button
              type="submit"
              className="rounded-r-full bg-white hover:bg-transparent">
              <Search className="h-5 w-5 bg-transparent mr-2 text-slate-600" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainSection;
