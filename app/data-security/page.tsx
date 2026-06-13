import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import DataSecurity from "@/components/DataSecurity";

export const metadata: Metadata = {
  title: "Data & Security — HireNove",
  description: "How HireNove handles your data. Everything runs inside your own environment — no candidate or client data ever touches our systems.",
};

export default function DataSecurityPage() {
  return (
    <SiteLayout>
      <div className="pt-32">
        <DataSecurity />
      </div>
    </SiteLayout>
  );
}
