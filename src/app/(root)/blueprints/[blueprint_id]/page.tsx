"use client";

import { useState, useEffect } from "react";
import { Content } from "@/types/content";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { DynamicBreadcrumb } from "@/components/Breadcrumb";
import { TypographyH2 } from "@/components/TypographyH2";
import { TypographyH3 } from "@/components/TypographyH3";

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
    };
    fetchContent();
    setContent(content);
  }, []);

  return (
    <>
      <DynamicBreadcrumb />
      <img src={content?.thumbnail_image} />
      <div className="flex mt-8 gap-4">
        <img
          src={content?.creators?.profile_picture}
          height={70}
          width={70}
          className="rounded-2xl"
        />
        <div className="">
          <TypographyH3>
            {content?.creators?.first_name} {content?.creators?.last_name}
          </TypographyH3>
          <h1>
            {content?.creators?.job_title} at {content?.creators?.company_name}
          </h1>
        </div>
      </div>
      <div className="mt-8">
        <h1>{content?.long_description}</h1>
      </div>
    </>
  );
}
