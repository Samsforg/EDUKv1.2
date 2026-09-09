import { getCurrentUser } from "../../src/lib/session";
import { redirect } from "next/navigation";
import { AdminShell } from "../../src/components/admin/AdminShell";
import GrowthDashboard from "./GrowthDashboard";

export default async function GrowthAdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/connexion-administrateur-edukora");

  return (
    <AdminShell active="overview">
      <GrowthDashboard />
    </AdminShell>
  );
}
