"use client";
import Like from "@/assets/public/Like.svg";
import Calendar from "@/assets/public/Calendar.svg";
import Share from "@/assets/public/Share.svg";
import Wishlist from "@/assets/public/Wishlist.svg";
import { usePathname, useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { bookmark, like } from "@/lib/data/courseDetail";
import { useAuth } from "@/app/(root)/providers";
import { useEffect, useState } from "react";

interface CreatorInformationProps {
  profile_picture: string;
  first_name: string;
  last_name: string;
  job_title: string;
  company_name: string;
  content_type?: string;
}

export default function CreatorInformation({
  profile_picture,
  first_name,
  last_name,
  job_title,
  company_name,
}: CreatorInformationProps) {
  const pathname = usePathname();
  const params = useParams();
  const { user } = useAuth();

  const [contentData, setContentData] = useState({
    contentType: "",
    contentId: "",
  });

  useEffect(() => {
    const fetchData = () => {
      const courseId = params.course_id;
      const contentId = params.guide_id || params.blueprint_id;

      if (courseId) {
        setContentData({
          contentType: "course",
          contentId: courseId.toString(),
        });
      }

      if (contentId) {
        setContentData({
          contentType: "content",
          contentId: contentId.toString(),
        });
      }
    };

    fetchData();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}${pathname}`);
    toast.success("Link is copied 📋");
  };

  const handleLike = async () => {
    try {
      if (!user) {
        throw new Error("Invalid user or content id");
      }

      const result = await like(
        user?.uid,
        contentData.contentId,
        contentData.contentType
      );

      toast.success("Awesome pick! Content liked 🧡");
    } catch (error) {
      console.error("Error liking:", error);
      toast.error("Error in like");
    }
  };

  const handleBookmark = async () => {
    try {
      if (!user) {
        throw new Error("Invalid user or content id");
      }

      const result = await bookmark(
        user?.uid,
        contentData.contentId,
        contentData.contentType
      );
      toast.success("Content bookmarked 📌");
    } catch (error) {
      console.error("Error bookmarking:", error);
      toast.error("Error in bookmark");
    }
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
          <div
            className="rounded-xl transition-all duration-300 hover:bg-gray-100 hover:scale-110 cursor-pointer"
            onClick={handleCopyLink}
          >
            <Share

            // className="cursor-pointer hover:bg-slate-200 hover:rounded-lg hover:shadow-md"
            />
          </div>
          <div
            className="rounded-xl transition-all duration-300 hover:bg-gray-100 hover:scale-110 cursor-pointer"
            onClick={handleBookmark}
          >
            <Wishlist />
          </div>
          <div
            className="rounded-xl transition-all duration-300 hover:bg-gray-100 hover:scale-110 cursor-pointer"
            onClick={handleLike}
          >
            <Like />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
