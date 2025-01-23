"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Content } from "@/types/content";
import { createClient } from "@/lib/supabase/client";
import { TypographyH1 } from "@/components/TypographyH1";

export default function BlueprintsDetail() {
  const params = useParams();
  const content_id = params.blueprints_id as string;

  const supabase = createClient();

  const [content, setContent] = useState<Content | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("contents")
        .select("*, categories(*), creators(*)")
        .eq("content_id", content_id);

      if (error) {
        console.log(error);
      } else {
        setContent(data[0]);
      }
    };

    fetchContent();
  }, [content_id]);

  return (
    <>
      <img src={content?.thumbnail_image} alt="blueprint" />
      <img src={content?.creators?.profile_picture} alt="creator" />
      <h1>
        {content?.creators?.first_name} {content?.creators?.last_name}
      </h1>
      <h1>
        {content?.creators?.job_title} at {content?.creators?.company_name}
      </h1>
      <TypographyH1>{content?.content_title}</TypographyH1>
      <h1>{content?.long_description}</h1>
    </>
  );
}
