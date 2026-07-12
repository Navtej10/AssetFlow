import prisma from "@/lib/prisma";
import OrganizationClient from "./OrganizationClient";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function OrganizationPage() {
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  const departments = await prisma.department.findMany({
    include: { 
      _count: { select: { users: true } },
      headEmployee: true
    },
    orderBy: { name: 'asc' }
  });

  const categories = await prisma.assetCategory.findMany({
    orderBy: { name: 'asc' }
  });

  const employees = await prisma.user.findMany({
    include: { department: true },
    orderBy: { name: 'asc' }
  });

  return (
    <OrganizationClient 
      departments={departments}
      categories={categories}
      employees={employees}
      isAdmin={isAdmin}
    />
  );
}
