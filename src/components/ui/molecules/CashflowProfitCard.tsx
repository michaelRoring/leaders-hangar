import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CashflowProfitCardProps {
  type: "cashflow" | "profit";
  number: number;
}

export default function CashflowCard({
  type,
  number,
}: CashflowProfitCardProps) {
  return (
    <>
      <Card className="min-h-40 bg-slate-100 w-full md:col-span-4 flex flex-col">
        <CardHeader>
          <CardTitle>Current {type}</CardTitle>
          <CardDescription>Current {type} right now</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="relative h-full">
            <p className="absolute right-0 bottom-0 text-2xl font-bold">
              $ {number}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
