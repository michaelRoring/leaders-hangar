import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface VisionMissionCardProps {
  type: "vision" | "mission";
  description: string;
}

export default function VisionMissionCard({
  type,
  description,
}: VisionMissionCardProps) {
  return (
    <>
      <Card className="mx-auto w-fit md:col-span-6">
        <CardHeader>
          <CardTitle>{type === "vision" ? "Vision" : "Mission"}</CardTitle>
          {/* <CardDescription>
            {companyInfo.industry} ~ {companyInfo.stage}
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
      </Card>
    </>
  );
}
