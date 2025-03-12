import { BlueprintCard } from "@/components/BlueprintCard";
import { createClient } from "@/lib/supabase/server";
import TitleCard from "@/components/TitleCard";
import { TypographyH3 } from "@/components/TypographyH3";
import { redirect } from "next/navigation";
import { DynamicBreadcrumb } from "@/components/Breadcrumb";
import { Content } from "@/types/content";

export default async function Blueprints() {
  const supabase = await createClient();

  const [
    { data: contents, error: contentsError },
    { data: user, error: authError },
  ] = await Promise.all([
    supabase
      .from("contents")
      .select("*, categories(*), creators(*)")
      .eq("is_blueprint", true),
    supabase.auth.getUser(),
  ]);

  if (authError) {
    redirect("/login");
  }

  const typedContents = contents as Content[];

  return (
    <>
      {/* <DynamicBreadcrumb /> */}

      <TitleCard
        firstName={user?.user?.user_metadata?.first_name || "John Doe"}
      />
      <div className="mt-12 ">
        <TypographyH3>All Blueprints</TypographyH3>
        <div className="w-fit mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {typedContents?.map((content) => (
            <BlueprintCard content={content} key={content.content_id} />
          ))}
        </div>
      </div>
    </>
  );
}
