"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function markAllNotificationsRead() {
  const session = await auth();
  const user = session?.user as any;
  if (!user || !user.id) throw new Error("Unauthorized");

  await prisma.notification.updateMany({
    where: { recipientId: user.id, isRead: false },
    data: { isRead: true }
  });

  revalidatePath("/notifications");
}
