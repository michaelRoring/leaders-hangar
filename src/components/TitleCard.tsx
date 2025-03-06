import { TypographyH1 } from "./TypographyH1";
import { Button } from "./ui/button";

interface TitleCardProps {
  firstName: string;
  lastSession?: string;
}

export default function TitleCard({ firstName, lastSession }: TitleCardProps) {
  return (
    <>
      <div className="w-full">
        <div className="mt-4 p-4 border border-black rounded-xl  bg-blue-50 w-auto">
          <TypographyH1>
            Welcome back {firstName}, continue where you left off?
          </TypographyH1>
          <div className="flex mt-4">
            {/* <h1 className="my-2 mx-5">{lastSession ?? "No session found"}</h1> */}
            <Button>Continue course </Button>
          </div>
        </div>
      </div>
    </>
  );
}
