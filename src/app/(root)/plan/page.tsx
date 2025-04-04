import { TypographyH1 } from "@/components/ui/molecules/TypographyH1";
import HeroCard from "@/components/ui/molecules/HeroCard";
import CashflowProfitCard from "@/components/ui/molecules/CashflowProfitCard";
import VisionMissionCard from "@/components/ui/molecules/VisionMissionCard";
import RevenueExpenseCard from "@/components/ui/molecules/RevenueExpenseCard";

export default function Plan() {
  const companyInformation = {
    name: "Devhaus pte. ltd.",
    industry: "Technology",
    stage: "Early stage",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cashflow: 1000,
    vision:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    mission:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    revenue: 1000,
    expense: 1000,
    profit: 1000,
    monthlyRevenueRate: 10,
    monthlyExpenseRate: 10,
  };

  return (
    <>
      <div className="w-full">
        <span className="my-24">
          <TypographyH1>Plan</TypographyH1>
        </span>
        <div className="mt-12 flex flex-col gap-6 md:grid md:grid-cols-12">
          <HeroCard
            name={companyInformation.name}
            industry={companyInformation.industry}
            stage={companyInformation.stage}
            description={companyInformation.description}
          />
          <CashflowProfitCard
            type={"cashflow"}
            number={companyInformation.cashflow}
          />
          <VisionMissionCard
            type={"vision"}
            description={companyInformation.vision}
          />
          <VisionMissionCard
            type={"mission"}
            description={companyInformation.mission}
          />
          <RevenueExpenseCard
            type={"revenue"}
            number={companyInformation.revenue}
            monthlyRate={companyInformation.monthlyRevenueRate}
          />
          <RevenueExpenseCard
            type={"expense"}
            number={companyInformation.expense}
            monthlyRate={companyInformation.monthlyExpenseRate}
          />
          <CashflowProfitCard
            type={"profit"}
            number={companyInformation.profit}
          />
        </div>
      </div>
    </>
  );
}
