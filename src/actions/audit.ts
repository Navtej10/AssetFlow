"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAuditCycle(formData: FormData) {
  const name = formData.get("name") as string;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;

  // TODO: Auth
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) throw new Error("No admin found");

  const auditCycle = await prisma.auditCycle.create({
    data: {
      name,
      startDate: new Date(startDateStr),
      endDate: new Date(endDateStr),
      status: "ACTIVE",
      createdById: admin.id
    }
  });

  // Automatically assign all current assets to this audit cycle
  const assets = await prisma.asset.findMany({ where: { status: { notIn: ["DISPOSED", "RETIRED", "LOST"] } } });
  
  const auditItemsData = assets.map(asset => ({
    auditCycleId: auditCycle.id,
    assetId: asset.id,
    auditorId: admin.id, // Assign to admin by default for demo
  }));

  await prisma.auditItem.createMany({
    data: auditItemsData
  });

  revalidatePath("/audit");
}

export async function verifyAuditItem(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const result = formData.get("result") as string; // VERIFIED, MISSING, DAMAGED
  const notes = formData.get("notes") as string;

  await prisma.auditItem.update({
    where: { id: itemId },
    data: {
      result,
      notes,
      verifiedAt: new Date()
    }
  });

  revalidatePath("/audit");
}

export async function closeAuditCycle(formData: FormData) {
  const cycleId = formData.get("cycleId") as string;

  const cycle = await prisma.auditCycle.findUnique({
    where: { id: cycleId },
    include: { auditItems: true }
  });

  if (!cycle) throw new Error("Cycle not found");

  // For any missing items, update asset status to LOST
  const missingItems = cycle.auditItems.filter(i => i.result === "MISSING");
  
  await prisma.$transaction([
    prisma.auditCycle.update({
      where: { id: cycleId },
      data: { status: "CLOSED" }
    }),
    ...missingItems.map(item => 
      prisma.asset.update({
        where: { id: item.assetId },
        data: { status: "LOST" }
      })
    )
  ]);

  revalidatePath("/audit");
}
