"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Badge } from "../shadcn/badge";
import { Content } from "@/types/content";
import { LuCalendarArrowUp } from "react-icons/lu";

export function BlueprintCard({ content }: { content: Content }) {
  const router = useRouter();

  const handleClickContent = (content_id: string, is_blueprint: boolean) => {
    is_blueprint
      ? router.push(`/blueprints/${content_id}`)
      : router.push(`/guides/${content_id}`);
  };

  return (
    <>
      <Card className="w-[350px]">
        <Badge className="mx-6 my-4">
          {content?.categories?.category_name}
        </Badge>
        <CardContent>
          <img src={content?.image_url} alt="blueprint" className="h-52 " />
        </CardContent>
        <CardHeader>
          <CardTitle className="h-12">{content?.content_title}</CardTitle>
          <CardDescription className="h-10">
            {content?.short_description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between ">
          <img
            src={content?.creators?.company_logo}
            alt={content?.creators?.company_name}
            className="w-20"
          />
          <div className="flex gap-3 justify-between ml-auto  w-40">
            <LuCalendarArrowUp className="h-8 w-8 " />
            <Button
              onClick={() =>
                handleClickContent(content.content_id, content.is_blueprint)
              }
            >
              Learn new skill
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
