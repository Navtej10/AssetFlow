import { Settings, Shield, Key, Bell, Database, Save } from "lucide-react";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user as any;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Organization Settings</h1>
        <p className="text-sm text-slate-600 mt-1">Manage global ERP preferences, automated alert policies, and security access keys.</p>
      </div>

      <div className="bg-white border border-[#E2E6ED] rounded-[16px] p-6 shadow-xs space-y-6 divide-y divide-slate-100">
        <div className="pb-4">
          <h2 className="text-base font-bold text-[#111418] flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#1D4ED8]" />
            Admin Profile & Access Role
          </h2>
          <p className="text-xs text-slate-500 mt-1">Primary administrative account managing global ERP workflows.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <input type="text" defaultValue={user?.name || ""} className="w-full px-3.5 py-2 rounded-xl border border-[#E2E6ED] bg-slate-50 text-sm font-semibold text-[#111418]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primary Email</label>
              <input type="email" defaultValue={user?.email || ""} className="w-full px-3.5 py-2 rounded-xl border border-[#E2E6ED] bg-slate-50 text-sm font-medium text-slate-700" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Assigned Role</label>
              <input type="text" defaultValue={user?.role || "ADMIN"} readOnly className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-100/60 text-sm font-bold text-[#1D4ED8]" />
            </div>
          </div>
        </div>

        <div className="pt-6 pb-4">
          <h2 className="text-base font-bold text-[#111418] flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#2563EB]" />
            General Preferences
          </h2>
          <p className="text-xs text-slate-500 mt-1">Basic identification and asset tag naming convention rules.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Organization Name</label>
              <input type="text" defaultValue="AssetFlow Enterprise HQ" className="w-full px-3.5 py-2 rounded-xl border border-[#E2E6ED] bg-slate-50 text-sm font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Asset Tag Prefix</label>
              <input type="text" defaultValue="AF-" className="w-full px-3.5 py-2 rounded-xl border border-[#E2E6ED] bg-slate-50 text-sm font-medium" />
            </div>
          </div>
        </div>

        <div className="pt-6 pb-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-600" />
            Automated Alert Policies
          </h2>
          <p className="text-xs text-slate-500 mt-1">Configure when managers receive notifications for overdue returns and maintenance.</p>

          <div className="space-y-3 mt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB]" />
              <span className="text-sm font-medium text-slate-800">Email daily digest of overdue returns at 8:00 AM</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB]" />
              <span className="text-sm font-medium text-slate-800">Require secondary manager approval for asset transfers above $1,500</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB]" />
              <span className="text-sm font-medium text-slate-800">Auto-flag items with missing QR codes during audit verification</span>
            </label>
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-sm transition-all">
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
