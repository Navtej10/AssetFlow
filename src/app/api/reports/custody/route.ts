import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const allocations = await prisma.allocation.findMany({
    where: { status: "ACTIVE" },
    include: {
      asset: true,
      receiverUser: { include: { department: true } },
      receiverDept: true
    }
  });

  const header = "Asset Tag,Asset Name,Allocated To User,User Department,Allocated To Dept,Allocation Date,Expected Return Date\n";
  const rows = allocations.map(a => 
    `"${a.asset.assetTag}","${a.asset.name}","${a.receiverUser?.name || ""}","${a.receiverUser?.department?.name || ""}","${a.receiverDept?.name || ""}","${a.allocationDate.toISOString()}","${a.expectedReturnDate?.toISOString() || ""}"`
  ).join("\n");

  return new Response(header + rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="department_custody.csv"'
    }
  });
}
