export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your assets and resources.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Assets", value: "1,234", trend: "+12%" },
          { title: "Allocated", value: "892", trend: "+5%" },
          { title: "In Maintenance", value: "45", trend: "-2%" },
          { title: "Pending Audits", value: "12", trend: "0%" },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md">
            <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-success' : stat.trend.startsWith('-') ? 'text-warning' : 'text-muted-foreground'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 rounded-xl border border-border bg-card shadow-sm h-96 flex items-center justify-center">
          <p className="text-muted-foreground">Asset Utilization Chart Placeholder</p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card shadow-sm h-96 flex items-center justify-center">
          <p className="text-muted-foreground">Recent Activity Placeholder</p>
        </div>
      </div>
    </div>
  );
}
