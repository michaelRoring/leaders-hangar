import { TypographyH3 } from "./TypographyH3";
import { Button } from "./ui/shadcn/button";

interface TitleCardProps {
  firstName: string;
  lastSession?: string;
}

export default function TitleCard({ firstName, lastSession }: TitleCardProps) {
  return (
    <>
      <div className="w-auto">
        <div className="mt-4 p-4 border border-black rounded-xl  w-auto">
          <TypographyH3>
            Welcome back <a className="text-blue-700">{firstName}</a>, continue
            where you left off?
          </TypographyH3>
          <div className="flex mt-4">
            {/* <h1 className="my-2 mx-5">{lastSession ?? "No session found"}</h1> */}
            <Button>Continue course </Button>
          </div>
        </div>
      </div>
    </>
  );
}
