"use client";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();

  const [user, setUser] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`, {
      method: "delete",
      cache: "no-cache",
    });
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="text-white">
      <div className="flex items-center justify-between px-5 mx-auto max-w-7xl h-16">
        <div>
          <Link href={"/"}>
            <h1 className="text-2xl font-bold">
              Code
              <span className="text-green-400">Irhan</span>
            </h1>
          </Link>
        </div>
        <ul className="flex font-medium items-center gap-5">
          <li className="hover:text-green-600 duration-300 cursor-pointer">
            <Link href={"/"}>Home</Link>
          </li>
          {user && (
            <>
              {user?.role == "student" && (
                <>
                  <li className="hover:text-green-600 duration-300 cursor-pointer">
                    <Link href={"/findjobs"}>Find Jobs</Link>
                  </li>
                  <li className="hover:text-green-600 duration-300 cursor-pointer">
                    <Link href={"/favorite"}>Favorites</Link>
                  </li>
                </>
              )}
              {user?.role == "recruiter" && (
                <>
                  <li className="hover:text-green-600 duration-300 cursor-pointer">
                    <Link href={"/dashboard/companies"}>Companies</Link>
                  </li>
                  <li className="hover:text-green-600 duration-300 cursor-pointer">
                    <Link href={"/dashboard/jobs"}>Jobs</Link>
                  </li>
                </>
              )}

              <li className="hover:text-green-600 duration-300 cursor-pointer">
                <Link href={"/profile"}>Profile</Link>
              </li>
            </>
          )}
          {!user ? (
            <>
              <li className="hover:text-green-600 duration-300 cursor-pointer">
                <Link href={"/login"}>Login</Link>
              </li>
              <li className="hover:text-green-600 duration-300 cursor-pointer">
                <Link href={"/register"}>SignUp</Link>
              </li>
            </>
          ) : (
            <li
              className="hover:text-green-600 duration-300 cursor-pointer"
              onClick={() => logout()}>
              Logout
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
