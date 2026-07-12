"use client";

import { useState } from "react";
import { Building2, Users, FolderTree, Plus, ShieldCheck } from "lucide-react";
import { createDepartment, createCategory, promoteEmployee } from "./actions";

export default function OrganizationClient({ 
  departments, 
  categories, 
  employees, 
  isAdmin 
}: { 
  departments: any[], 
  categories: any[], 
  employees: any[], 
  isAdmin: boolean 
}) {
  const [activeTab, setActiveTab] = useState<"departments" | "categories" | "employees">("departments");
  
  // Modals state
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateDepartment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await createDepartment(new FormData(e.currentTarget));
      setShowDeptModal(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await createCategory(new FormData(e.currentTarget));
      setShowCatModal(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePromote = async (userId: string, role: string) => {
    if (!confirm(`Are you sure you want to change this user's role to ${role}?`)) return;
    try {
      await promoteEmployee(userId, role);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Organization Setup</h1>
          <p className="text-sm text-slate-600 mt-1">Configure departments, hierarchy, and roles.</p>
        </div>
        
        {isAdmin && (
          <div className="flex gap-2">
            {activeTab === "departments" && (
              <button onClick={() => setShowDeptModal(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-sm transition-all">
                <Plus className="w-4 h-4" />
                <span>Add Department</span>
              </button>
            )}
            {activeTab === "categories" && (
              <button onClick={() => setShowCatModal(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-sm transition-all">
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border overflow-x-auto">
        <button 
          onClick={() => setActiveTab("departments")}
          className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "departments" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          <Building2 className="w-4 h-4" />
          Departments
        </button>
        <button 
          onClick={() => setActiveTab("categories")}
          className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "categories" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          <FolderTree className="w-4 h-4" />
          Asset Categories
        </button>
        <button 
          onClick={() => setActiveTab("employees")}
          className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "employees" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          <Users className="w-4 h-4" />
          Employee Directory
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "departments" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div key={dept.id} className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-base">{dept.name}</h2>
                      <p className="text-xs text-muted-foreground">{dept.status}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Department Head:</span>
                    <span className="font-semibold text-foreground">{dept.headEmployee?.name || "Unassigned"}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Assigned Users:</span>
                    <span className="font-semibold text-foreground">{dept._count.users} Users</span>
                  </div>
                </div>
              </div>
            ))}
            {departments.length === 0 && <p className="text-muted-foreground col-span-full">No departments found.</p>}
          </div>
        )}

        {activeTab === "categories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <div className="w-10 h-10 rounded-xl bg-secondary/50 text-secondary-foreground flex items-center justify-center font-bold">
                    <FolderTree className="w-5 h-5" />
                  </div>
                  <h2 className="font-bold text-base">{cat.name}</h2>
                </div>
                <div className="pt-4 text-sm">
                  <span className="text-muted-foreground">Custom Fields Schema:</span>
                  <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-x-auto max-h-32">
                    {cat.customFields || "None"}
                  </pre>
                </div>
              </div>
            ))}
            {categories.length === 0 && <p className="text-muted-foreground col-span-full">No categories found.</p>}
          </div>
        )}

        {activeTab === "employees" && (
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">Department</th>
                    {isAdmin && <th className="px-6 py-4 font-medium text-right">Actions (Promote)</th>}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium">{emp.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{emp.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          emp.role === 'ADMIN' ? 'bg-red-100 text-red-700' :
                          emp.role === 'ASSET_MANAGER' ? 'bg-purple-100 text-purple-700' :
                          emp.role === 'DEPT_HEAD' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {emp.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">{emp.department?.name || "-"}</td>
                      {isAdmin && (
                        <td className="px-6 py-4 text-right">
                          <select 
                            className="text-xs border rounded p-1"
                            value={emp.role}
                            onChange={(e) => handlePromote(emp.id, e.target.value)}
                          >
                            <option value="EMPLOYEE">EMPLOYEE</option>
                            <option value="DEPT_HEAD">DEPT_HEAD</option>
                            <option value="ASSET_MANAGER">ASSET_MANAGER</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </td>
                      )}
                    </tr>
                  ))}
                  {employees.length === 0 && (
                    <tr>
                      <td colSpan={isAdmin ? 5 : 4} className="px-6 py-8 text-center text-muted-foreground">
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Department Modal */}
      {showDeptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card w-full max-w-md rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Department</h2>
            {error && <p className="text-destructive text-sm mb-4">{error}</p>}
            <form onSubmit={handleCreateDepartment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input required name="name" className="w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Department Head (Optional)</label>
                <select name="headEmployeeId" className="w-full border rounded-lg p-2">
                  <option value="">-- Select --</option>
                  {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.email})</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setShowDeptModal(false)} className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card w-full max-w-md rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Asset Category</h2>
            {error && <p className="text-destructive text-sm mb-4">{error}</p>}
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input required name="name" className="w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Custom Fields (JSON Schema)</label>
                <textarea name="customFields" placeholder='{"warranty_months": "number"}' className="w-full border rounded-lg p-2 font-mono text-sm h-24" />
                <p className="text-xs text-muted-foreground mt-1">Optional. Provide a valid JSON object.</p>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setShowCatModal(false)} className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
