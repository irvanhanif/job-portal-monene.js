import LatestJobs from "@/components/home/LatestJobs";
import MainSection from "@/components/home/MainSection";
import ShowCategories from "@/components/home/ShowCategories";
import React from "react";

export default async function Home() {
  const jobs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job?keyword=`, {
    cache: "no-cache",
    credentials: "include",
  });
  const res = await jobs.json();

  return (
    <div>
      <MainSection />
      <ShowCategories />
      <LatestJobs jobs={res?.jobs} />
    </div>
  );
}
