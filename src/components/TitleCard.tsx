import { TypographyH1 } from "./TypographyH1";
import { Button } from "./ui/button";

interface TitleCardProps {
  firstName: string;
  lastSession?: string;
}

export default function TitleCard({ firstName, lastSession }: TitleCardProps) {
  return (
    <>
      <div className="p-12 border border-black rounded-2xl">
        <TypographyH1>
          Welcome back {firstName}, continue where you left off?
        </TypographyH1>
        <div className="flex">
          <Button>Continue course </Button>
          <h1>{lastSession ?? "No session found"}</h1>
        </div>
      </div>
    </>
  );
}
