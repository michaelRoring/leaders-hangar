"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Content } from "@/types/content";

export function BlueprintCard({ content }: { content: Content }) {
  const router = useRouter();

  const handleClickContent = (content_id: string) => {
    router.push(`/blueprints/${content_id}`);
  };

  return (
    <Card className="w-full min-w-[240px]">
      <div className="flex p-6 gap-2">
        <Badge variant={"secondary"}>
          {content?.categories?.category_name}
        </Badge>
      </div>
      <CardContent>
        <img
          src={content?.image_url}
          alt="blueprint"
          className="rounded-2xl h-52 object-center object-contain ml-5"
        />
        <CardHeader>
          <CardTitle className="min-h-12">{content?.content_title}</CardTitle>
          <CardDescription className="min-h-12">
            {content?.short_description}
          </CardDescription>
        </CardHeader>
      </CardContent>
      <CardFooter className="flex justify-between gap-3  w-full p-3 ">
        <img
          src={
            content?.creators?.company_logo ||
            "https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvZmY2MmIwYmQtZTRkMS00MzZmLWExOWMtMWVlYzEzNmEzMDgzLzk0ZjZkMzQ1LTAzNGMtNDVmMi04MmJlLTZkMTI1ZGI2ZTI1My5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjU3NiwiaGVpZ2h0Ijo1NiwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0="
          }
          alt={content?.creators?.company_logo}
          height={40}
          width={40}
        />
        <div className="flex gap-2 justify-between ml-auto">
          <Button
            variant="secondary"
            className="flex-shrink-0 text-sm"
            size="sm"
          >
            Save
          </Button>
          <Button
            onClick={() => handleClickContent(content.content_id)}
            className="flex-shrink-0 text-sm"
            size="sm"
          >
            Learn new skill
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
