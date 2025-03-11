"use client";

import { useState, useEffect } from "react";
import { Content } from "@/types/content";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TypographyH3 } from "@/components/TypographyH3";
import { format, set } from "date-fns";
import { TypographyH4 } from "@/components/TypographyH4";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlueprintDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      }
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

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="md:px-12">
        <div className="">
          {/* cover image */}
          <div>
            <img
              src={content?.image_url}
              className="md:min-w-fit md:min-h-fit"
            />
          </div>
          {/* creators information */}
          <div className=" flex mt-6 ">
            <div>
              <img
                src={content?.creators?.profile_picture}
                height={50}
                width={50}
                className="rounded-xl"
              />
            </div>
            <div className="ml-4">
              <TypographyH4>{content?.creators?.first_name}</TypographyH4>
              <p>
                {content?.creators?.job_title} at{" "}
                <a className="text-blue-700">
                  {content?.creators?.company_name}
                </a>
              </p>
            </div>
          </div>
          {/* engagement icons */}
          <div>{/* <img src={} /> */}</div>
          <div className="md:flex md:justify-stretch ">
            {/* previews */}
            <div className="mt-6">
              <TypographyH3>Template previews:</TypographyH3>
              <div className="flex overflow-auto mt-6 gap-6">
                {content?.previews?.map((preview) => (
                  <img
                    src={preview}
                    className="w-full h-full md:w-56 md:h-56"
                  />
                ))}
              </div>
            </div>
            {/* content informations */}
            <div className="">
              <div className="flex mt-6 gap-6">
                <Badge>{content?.categories?.category_name}</Badge>
                <p>{content?.minutes_read} minutes read</p>
              </div>
              <div className="mt-3">
                <TypographyH3>{content?.content_title}</TypographyH3>
              </div>
              <p className="mt-1">
                Published on {formatDate(content?.created_at)}
              </p>
              <p className="mt-6 font-bold">How this guide helps you:</p>
              {content?.features?.map((feature) => (
                <div className="flex gap-1">
                  <CircleCheck className="mt-3" />
                  <p className="mt-3">{feature}</p>
                </div>
              ))}
              <p className="mt-6">Download the blueprint now:</p>
              {/* <div className="w-full"> */}
              <Button className="w-full rounded-xl">Download</Button>
              {/* </div> */}
            </div>
          </div>
        </div>
        {/* content descriptions */}
        <div className="mt-12">{content?.long_description}</div>
      </div>
    </>
  );
}
