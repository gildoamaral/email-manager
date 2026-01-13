import { StoreSettingsCard, SmtpSettingsCard } from "@/components/features/settings";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Configurações</h1>
      </div>

      <div className="grid gap-6">
        <StoreSettingsCard />
        <SmtpSettingsCard />
      </div>
    </div>
  );
}