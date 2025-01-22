import * as React from "react";

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

export function BlueprintCard({ contents }: { contents: any }) {
  return (
    <Card className="w-[350px]">
      <div className="flex p-6 gap-2">
        <Badge>Go to market</Badge>
        <Badge>Management</Badge>
      </div>
      <CardContent>
        <img
          src={contents.image_url}
          alt="blueprint"
          className="rounded-2xl h-52"
        />
        <CardHeader>
          <CardTitle>{contents.content_title}</CardTitle>
          <CardDescription>{contents?.short_description}</CardDescription>
        </CardHeader>
      </CardContent>
      <CardFooter className="flex justify-between">
        <img
          src="https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvZmY2MmIwYmQtZTRkMS00MzZmLWExOWMtMWVlYzEzNmEzMDgzLzk0ZjZkMzQ1LTAzNGMtNDVmMi04MmJlLTZkMTI1ZGI2ZTI1My5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjU3NiwiaGVpZ2h0Ijo1NiwiZml0IjoiaW5zaWRlIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0="
          alt="github"
          height={124}
          width={100}
        />
        <Button variant="secondary">Save</Button>
        <Button>Learn new skill</Button>
      </CardFooter>
    </Card>
  );
}
