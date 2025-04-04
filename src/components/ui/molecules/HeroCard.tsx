import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HeroCardProps {
  name: string;
  industry: string;
  stage: string;
  description: string;
}

export default function HeroCard({
  name,
  industry,
  stage,
  description,
}: HeroCardProps) {
  return (
    <>
      <Card className="mx-auto w-fit md:col-span-8">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            {industry} ~ {stage}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
      </Card>
    </>
  );
}
