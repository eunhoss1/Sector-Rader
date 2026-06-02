import DashboardClient from "@/components/dashboard/dashboard-client";
import mockDashboard from "@/data/mock-dashboard.json";
import type { DashboardData } from "@/types/dashboard";

export default function Home() {
  return <DashboardClient data={mockDashboard as DashboardData} />;
}
