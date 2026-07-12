"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createBooking(formData: FormData) {
  const assetId = formData.get("assetId") as string;
  const startTimeStr = formData.get("startTime") as string;
  const endTimeStr = formData.get("endTime") as string;

  const startTime = new Date(startTimeStr);
  const endTime = new Date(endTimeStr);

  if (startTime >= endTime) {
    throw new Error("End time must be after start time");
  }

  // 1. Verify asset is bookable
  const asset = await prisma.asset.findUnique({ where: { id: assetId } });
  if (!asset || !asset.isBookable) {
    throw new Error("Asset is not bookable");
  }

  // 2. Overlap validation
  // A booking overlaps if (NewStart < ExistingEnd) AND (NewEnd > ExistingStart)
  const overlappingBookings = await prisma.booking.findMany({
    where: {
      assetId,
      status: { in: ["UPCOMING", "ONGOING"] },
      AND: [
        { startTime: { lt: endTime } },
        { endTime: { gt: startTime } }
      ]
    }
  });

  if (overlappingBookings.length > 0) {
    throw new Error("This time slot conflicts with an existing booking.");
  }

  // 3. Create the booking
  const session = await auth();
  const user = session?.user as any;
  if (!user || !user.id) throw new Error("Unauthorized");

  await prisma.booking.create({
    data: {
      assetId,
      bookedById: user.id,
      startTime,
      endTime,
      status: "UPCOMING"
    }
  });

  revalidatePath("/bookings");
}
