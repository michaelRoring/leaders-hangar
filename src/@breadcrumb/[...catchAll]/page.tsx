import { Breadcrumbs } from "@/components/ui/atoms/Breadcrumb";
type Props = {
  params: {
    catchAll: string[];
  };
};
export default function BreadcrumbSlot({ params: { catchAll } }: Props) {
  return <Breadcrumbs routes={catchAll} />;
}
