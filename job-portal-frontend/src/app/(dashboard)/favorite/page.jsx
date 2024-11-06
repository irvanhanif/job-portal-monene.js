"use client";
import LatestJobCard from "@/components/LatestJobCard";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Favorite = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  const getFavoriteJobs = async () => {
    const favJobs = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/job/favorites`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    const { favoriteJobs, success } = await favJobs.json();
    if (success) setFavoriteList(favoriteJobs);
  };

  useEffect(() => {
    if (user?.token) getFavoriteJobs();
  }, [user?.token]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl mb-20">
      <h1 className="text-xl font-bold p-5">Applied Jobs</h1>
      <div className="grid grid-cols-3 gap-4 p-5">
        {favoriteList?.length > 0 &&
          favoriteList?.map((app) => (
            <Link
              key={app?.id}
              href={`/findjobs/${app?.job?.id}`}>
              <LatestJobCard job={app?.job} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Favorite;
