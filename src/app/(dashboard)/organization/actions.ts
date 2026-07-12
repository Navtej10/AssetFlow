"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createDepartment(formData: FormData) {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const headEmployeeId = formData.get("headEmployeeId") as string | null;

  if (!name) throw new Error("Name is required");

  await prisma.department.create({
    data: {
      name,
      headEmployeeId: headEmployeeId || null,
    },
  });

  revalidatePath("/organization");
}

export async function createCategory(formData: FormData) {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const customFieldsStr = formData.get("customFields") as string;

  if (!name) throw new Error("Name is required");

  // Validate JSON schema
  if (customFieldsStr) {
    try {
      JSON.parse(customFieldsStr);
    } catch (e) {
      throw new Error("Invalid JSON for custom fields");
    }
  }

  await prisma.assetCategory.create({
    data: {
      name,
      customFields: customFieldsStr || null,
    },
  });

  revalidatePath("/organization");
}

export async function promoteEmployee(userId: string, newRole: string) {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const validRoles = ["EMPLOYEE", "DEPT_HEAD", "ASSET_MANAGER", "ADMIN"];
  if (!validRoles.includes(newRole)) throw new Error("Invalid role");

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  revalidatePath("/organization");
}
