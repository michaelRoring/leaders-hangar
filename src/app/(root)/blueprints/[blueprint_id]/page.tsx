"use client";

import { useState, useEffect } from "react";
import { Content } from "@/types/content";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { DynamicBreadcrumb } from "@/components/Breadcrumb";
import { TypographyH2 } from "@/components/TypographyH2";
import { TypographyH3 } from "@/components/TypographyH3";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default function BlueprintDetailPage() {
  const [content, setContent] = useState<Content | null>(null);
  const params = useParams();
  const supabase = createClient();

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("contents")
        .select("*, creators(*), categories(*)")
        .eq("content_id", params.blueprint_id)
        .single();
      if (error) {
        console.log(error);
      } else {
        setContent(data);
      }
      console.log("data: ", data);
    };
    fetchContent();
  }, [params.blueprint_id, supabase]);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Date not available";

    try {
      const date = new Date(dateString);
      return format(date, "dd MMMM yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  return (
    <>
      <div className="md:px-12 md:py-12">
        <DynamicBreadcrumb />
        {content?.thumbnail_image && (
          <img src={content.thumbnail_image} alt="Thumbnail" />
        )}
        <div className="md:flex md:justify-between w-auto mt-8 ">
          <div className="flex gap-4">
            {content?.creators?.profile_picture && (
              <img
                src={content.creators.profile_picture}
                height={50}
                width={60}
                className="rounded-2xl"
                alt="Creator Profile"
              />
            )}
            <div className="">
              <TypographyH3>
                {content?.creators?.first_name} {content?.creators?.last_name}
              </TypographyH3>
              <h1>
                {content?.creators?.job_title} at{" "}
                {content?.creators?.company_name}
              </h1>
            </div>
          </div>

          <div className="flex my-4 gap-4">
            <img
              src="https://i.ibb.co.com/JXvBK4s/like-svgrepo-com-1.png"
              alt="Like"
            />
            <img
              src="https://i.ibb.co.com/KxzpTtkF/calendar-add-svgrepo-com-1.png"
              alt="Calendar"
            />
            <img
              src="https://i.ibb.co.com/W4BpVw6m/save-wishlist-like-favorite-svgrepo-com-2.png"
              alt="Save"
            />
            <img
              src="https://i.ibb.co.com/YF7r3rSM/share-svgrepo-com-1-1.png"
              alt="Share"
            />
          </div>
        </div>
        <div className="md:flex md:justify-stretch md:gap-12 md:mt-12">
          <div>
            <TypographyH3>Template Preview:</TypographyH3>
            <div className="mt-8 flex overflow-x-auto gap-4 h-24 md:h-fit">
              {content?.previews &&
                content.previews.map((preview, index) => (
                  <img key={index} src={preview} alt={`Preview ${index + 1}`} />
                ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex mt-8 gap-5">
              {content?.categories?.category_name && (
                <span className="bg-blue-900 rounded-lg px-4 ">
                  <h1 className="text-white">
                    {content.categories.category_name}
                  </h1>
                </span>
              )}
              <h1>{content?.minutes_read} min read</h1>
            </div>
            <h1 className="text-3xl font-bold">{content?.content_title}</h1>
            <h1 className="mt-4 text-sm">
              Published on: {formatDate(content?.created_at)}
            </h1>
            <h1 className="mt-4">How this guide will help you: </h1>
            {content?.features.map((feature) => {
              return <h1>✅ {feature}</h1>;
            })}
            <h1 className="mt-6 text-sm">Download the blueprint now:</h1>
            <Button>Download now </Button>
          </div>
        </div>
        <div className="mt-8">
          <h1>{content?.long_description}</h1>
        </div>
      </div>
    </>
  );
}
