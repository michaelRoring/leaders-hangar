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
      <>
        <div className="mt-6">
          <Card className="">
            <div className="ml-6 my-3  ">
              <Badge>{content?.categories?.category_name}</Badge>
            </div>

            <CardContent>
              <img src={content.image_url} alt="blueprint" className="h-52 " />
            </CardContent>
            <CardHeader>
              <CardTitle className="line-clamp-2 h-14">
                {content.content_title}
              </CardTitle>
              <CardDescription className="line-clamp-3 h-16">
                {content.short_description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between ">
              <img
                src={content.creators.company_logo}
                alt={content.creators.company_name}
                className="w-20 object-cover"
              />
              <div className="flex gap-3 items-center">
                <LuCalendarArrowUp className="h-8 w-8 " />
                <Button
                  onClick={() =>
                    handleClickContent(content.content_id, content.is_blueprint)
                  }
                  className="whitespace-nowrap"
                >
                  Learn
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </>
    </>
  );
}
