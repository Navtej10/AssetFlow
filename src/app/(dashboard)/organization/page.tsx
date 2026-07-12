import prisma from "@/lib/prisma";
import { Building2, Users, Plus, ShieldCheck, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OrganizationPage() {
  const departments = await prisma.department.findMany({
    include: { _count: { select: { users: true } } }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Organization Setup</h1>
          <p className="text-sm text-slate-600 mt-1">Configure departments, hierarchy, and physical asset storage locations.</p>
        </div>
        <button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-sm transition-all">
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Engineering Dept Card */}
        <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900">Engineering</h2>
                <p className="text-xs text-slate-400">HQ 4th Floor • Active</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Primary</span>
          </div>
          <div className="pt-4 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Department Head:</span>
              <span className="font-semibold text-slate-900">Raj Kumar</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Assigned Employees:</span>
              <span className="font-semibold text-slate-900">42 Members</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Allocated Assets:</span>
              <span className="font-bold text-[#2563EB]">420 Assets</span>
            </div>
          </div>
        </div>

        {/* Design Dept Card */}
        <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900">Design Studio</h2>
                <p className="text-xs text-slate-400">HQ 3rd Floor • Active</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB]">Creative</span>
          </div>
          <div className="pt-4 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Department Head:</span>
              <span className="font-semibold text-slate-900">Priya Sharma</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Assigned Employees:</span>
              <span className="font-semibold text-slate-900">18 Members</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Allocated Assets:</span>
              <span className="font-bold text-[#2563EB]">184 Assets</span>
            </div>
          </div>
        </div>

        {/* Finance Dept Card */}
        <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900">Finance & Admin</h2>
                <p className="text-xs text-slate-400">HQ 2nd Floor • Active</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Corporate</span>
          </div>
          <div className="pt-4 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Department Head:</span>
              <span className="font-semibold text-slate-900">Ananya Iyer</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Assigned Employees:</span>
              <span className="font-semibold text-slate-900">24 Members</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Allocated Assets:</span>
              <span className="font-bold text-[#2563EB]">210 Assets</span>
            </div>
          </div>
        </div>

        {/* Sales Dept Card */}
        <div className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900">Sales & Marketing</h2>
                <p className="text-xs text-slate-400">HQ 1st Floor • Active</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700">Field</span>
          </div>
          <div className="pt-4 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Department Head:</span>
              <span className="font-semibold text-slate-900">Karan Mehta</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Assigned Employees:</span>
              <span className="font-semibold text-slate-900">35 Members</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Allocated Assets:</span>
              <span className="font-bold text-[#2563EB]">180 Assets</span>
            </div>
          </div>
        </div>

        {/* Dynamic Departments from DB if exist */}
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-slate-900">{dept.name}</h2>
                  <p className="text-xs text-slate-400">Database Entry • Active</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB]">DB</span>
            </div>
            <div className="pt-4 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Assigned Users:</span>
                <span className="font-semibold text-slate-900">{dept._count.users} Users</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
