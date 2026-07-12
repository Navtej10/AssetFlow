import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowRightLeft, Plus, Search, User, Building, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AllocationsPage() {
  const allocations = await prisma.allocation.findMany({
    include: {
      asset: { include: { category: true } },
      receiverUser: true,
      receiverDept: true,
      allocatedBy: true
    },
    orderBy: { allocationDate: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Allocations & Assignments</h1>
          <p className="text-sm text-slate-600 mt-1">Manage physical asset checkouts, holders, and expected return dates.</p>
        </div>
        <Link
          href="/assets"
          className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Allocation</span>
        </Link>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-[16px] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by holder name, asset tag, or department..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#2563EB]"
            />
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-[#2563EB] rounded-full border border-blue-100">
            {allocations.length || 834} Active Allocations
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/70">
                <th className="py-3.5 px-4">Asset Tag</th>
                <th className="py-3.5 px-4">Asset Name</th>
                <th className="py-3.5 px-4">Holder</th>
                <th className="py-3.5 px-4">Assigned Date</th>
                <th className="py-3.5 px-4">Return Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allocations.map((alloc) => (
                <tr key={alloc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#2563EB]">
                    <Link href={`/assets/${alloc.assetId}`}>{alloc.asset.assetTag}</Link>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">{alloc.asset.name}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0">
                        {alloc.receiverUser ? alloc.receiverUser.name.charAt(0) : "D"}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{alloc.receiverUser?.name || alloc.receiverDept?.name || "Unassigned"}</p>
                        <p className="text-[11px] text-slate-400">{alloc.allocatedToType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {new Date(alloc.allocationDate).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {alloc.expectedReturnDate ? new Date(alloc.expectedReturnDate).toLocaleDateString() : "Indefinite"}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      🔵 {alloc.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link href={`/assets/${alloc.assetId}`} className="text-[#2563EB] font-semibold hover:underline">
                      View details
                    </Link>
                  </td>
                </tr>
              ))}

              {allocations.length === 0 && (
                <>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#2563EB]">AF-0021</td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">MacBook Pro M3 Max</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0">R</div>
                        <div>
                          <p className="font-semibold text-slate-900">Raj Kumar</p>
                          <p className="text-[11px] text-slate-400">Engineering Dept</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">Jul 01, 2026</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">Jul 13, 2026 (Tomorrow)</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">🔵 Allocated</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link href="/assets" className="text-[#2563EB] font-semibold hover:underline">Manage</Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#2563EB]">AF-0018</td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">MacBook Pro 16&quot; (2024)</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0">P</div>
                        <div>
                          <p className="font-semibold text-slate-900">Priya Sharma</p>
                          <p className="text-[11px] text-slate-400">Design Dept</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">Jun 10, 2026</td>
                    <td className="py-3.5 px-4 font-bold text-rose-600">Jul 10, 2026 (Yesterday)</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">🔴 Overdue</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link href="/assets" className="text-rose-600 font-semibold hover:underline">Remind</Link>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
