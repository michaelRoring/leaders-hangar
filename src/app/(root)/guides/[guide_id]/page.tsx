"use client";

import { useState, useEffect } from "react";
import { Content } from "@/types/content";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TypographyH3 } from "@/components/ui/molecules/TypographyH3";
import { format, set } from "date-fns";
import { TypographyH4 } from "@/components/ui/molecules/TypographyH4";
import { Badge } from "@/components/ui/shadcn/badge";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { CiSaveDown2 } from "react-icons/ci";
import CreatorInformation from "@/components/ui/molecules/CreatorInformation";
import { ResponsiveMarkdown } from "@/components/ui/molecules/ResponsiveMarkdown";

export default function GuideDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<Content | null>(null);
  const params = useParams();
  const supabase = createClient();

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("contents")
        .select("*, creators(*), categories(*)")
        .eq("content_id", params.guide_id)
        .single();
      if (error) {
        console.log(error);
      } else {
        setContent(data);
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [params.guide_id, supabase]);

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
          {content && (
            <CreatorInformation
              profile_picture={content.creators.profile_picture}
              first_name={content.creators.first_name}
              last_name={content.creators.last_name}
              job_title={content.creators.job_title}
              company_name={content.creators.company_name}
            />
          )}

          <div className="md:flex md:justify-start md:gap-6 ">
            {/* previews */}
            <div className="mt-6 ">
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
              {/* content descriptions */}

              <ResponsiveMarkdown content={content?.long_description} />
            </div>
            {/* content informations */}
            <div className="md:min-w-fit md:sticky md:top-0"></div>
          </div>
        </div>
      </div>
    </>
  );
}
