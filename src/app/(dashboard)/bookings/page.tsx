import prisma from "@/lib/prisma";
import { createBooking } from "@/actions/booking";
import { CalendarDays, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const bookableAssets = await prisma.asset.findMany({
    where: { isBookable: true },
    include: {
      bookings: {
        where: { status: { in: ["UPCOMING", "ONGOING"] } },
        orderBy: { startTime: "asc" }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resource Bookings</h1>
        <p className="text-muted-foreground mt-1">Book shared resources like conference rooms and vehicles.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {bookableAssets.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground shadow-sm">
              No bookable resources found. Register an asset and mark it as "Bookable".
            </div>
          ) : (
            bookableAssets.map(asset => (
              <div key={asset.id} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30">
                  <h2 className="font-semibold text-lg">{asset.name} <span className="text-sm font-normal text-muted-foreground">({asset.assetTag})</span></h2>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Upcoming Bookings</h3>
                  {asset.bookings.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No upcoming bookings. Resource is free!</p>
                  ) : (
                    <div className="space-y-3">
                      {asset.bookings.map(booking => (
                        <div key={booking.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background">
                          <div className="bg-primary/10 text-primary p-2 rounded-md">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {booking.startTime.toLocaleString()} to {booking.endTime.toLocaleTimeString()}
                            </p>
                            <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${booking.status === 'ONGOING' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <div className="bg-card border border-border rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              New Booking
            </h2>
            <form action={createBooking} className="space-y-4">
              <div>
                <label htmlFor="assetId" className="block text-sm font-medium text-foreground mb-1">Resource</label>
                <select
                  id="assetId"
                  name="assetId"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                >
                  <option value="">Select resource...</option>
                  {bookableAssets.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-foreground mb-1">Start Time</label>
                <input
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-foreground mb-1">End Time</label>
                <input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg font-medium transition-colors mt-2"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
