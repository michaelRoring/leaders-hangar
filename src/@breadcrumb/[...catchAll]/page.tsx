import { Breadcrumbs } from "@/components/Breadcrumb";
type Props = {
  params: {
    catchAll: string[];
  };
};
export default function BreadcrumbSlot({ params: { catchAll } }: Props) {
  return <Breadcrumbs routes={catchAll} />;
}
