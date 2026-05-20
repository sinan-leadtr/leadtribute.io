import { redirect } from "next/navigation";
import { getUserPlanState } from "@/lib/plans/get-user-plan";
import { SettingsContent } from "./SettingsContent";

export default async function SettingsPage() {
  const planState = await getUserPlanState();
  if (!planState) {
    redirect("/login");
  }

  return <SettingsContent planState={planState} />;
}
