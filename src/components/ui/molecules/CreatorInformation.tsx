"use client";
import Like from "@/assets/public/like.svg";
import Calendar from "@/assets/public/calendar.svg";
import Share from "@/assets/public/share.svg";
import Wishlist from "@/assets/public/wishlist.svg";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface CreatorInformationProps {
  profile_picture: string;
  first_name: string;
  last_name: string;
  job_title: string;
  company_name: string;
}

export default function CreatorInformation({
  profile_picture,
  first_name,
  last_name,
  job_title,
  company_name,
}: CreatorInformationProps) {
  const pathname = usePathname();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}${pathname}`);
  };

  return (
    <>
      <div className="md:flex md:justify-between mt-6">
        <div className="flex">
          <img
            src={profile_picture}
            height={50}
            width={60}
            className="rounded-xl shadow-xl"
          />
          <div className="ml-3">
            <h1 className="text-2xl font-bold">
              {first_name} {last_name}
            </h1>
            <p>
              {job_title} at{" "}
              <a className="text-blue-500 font-semibold">{company_name}</a>
            </p>
          </div>
        </div>

        {/* social buttons */}
        <div className="flex mt-6 gap-3 ">
          <div className="rounded-xl transition-all duration-300 hover:bg-gray-100 hover:scale-110 cursor-pointer">
            <Calendar />
          </div>
          <div className="rounded-xl transition-all duration-300 hover:bg-gray-100 hover:scale-110 cursor-pointer">
            <Share
              onClick={handleCopyLink}
              // className="cursor-pointer hover:bg-slate-200 hover:rounded-lg hover:shadow-md"
            />
          </div>
          <div className="rounded-xl transition-all duration-300 hover:bg-gray-100 hover:scale-110 cursor-pointer">
            <Wishlist />
          </div>
          <div className="rounded-xl transition-all duration-300 hover:bg-gray-100 hover:scale-110 cursor-pointer">
            <Like />
          </div>
        </div>
      </div>
    </>
  );
}
