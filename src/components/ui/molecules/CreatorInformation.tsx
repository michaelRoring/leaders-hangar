import { CiSaveDown2 } from "react-icons/ci";

interface CreatorInformationProps {
  profile_picture: string;
  first_name: string;
  last_name: string;
  job_title: string;
  company_name: string;
}

export default function CreatorInformation({
  profile_picture,
  first_name,
  last_name,
  job_title,
  company_name,
}: CreatorInformationProps) {
  return (
    <>
      <div className="md:flex md:justify-between mt-6">
        <div className="flex">
          <img
            src={profile_picture}
            height={50}
            width={60}
            className="rounded-xl shadow-xl"
          />
          <div className="ml-3">
            <h1 className="text-2xl font-bold">
              {first_name} {last_name}
            </h1>
            <p>
              {job_title} at{" "}
              <a className="text-blue-500 font-semibold">{company_name}</a>
            </p>
          </div>
        </div>

        {/* social buttons */}
        <div className="flex mt-3">
          <CiSaveDown2 className="h-8 w-8" />
          <CiSaveDown2 className="h-8 w-8" />
          <CiSaveDown2 className="h-8 w-8" />
          <CiSaveDown2 className="h-8 w-8" />
        </div>
      </div>
    </>
  );
}
