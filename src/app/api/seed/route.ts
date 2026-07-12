import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
    if (adminCount > 0) {
      return NextResponse.json({ message: "Seed data already exists" });
    }

    const passwordHash = await bcrypt.hash("password", 10);

    // Create Departments
    const dept1 = await prisma.department.create({ data: { name: "Engineering" } });
    const dept2 = await prisma.department.create({ data: { name: "HR" } });

    // Create Users
    const admin = await prisma.user.create({
      data: { name: "Kushal Joshi", email: "kushal@assetflow.com", passwordHash, role: "ADMIN", departmentId: dept1.id }
    });
    const manager = await prisma.user.create({
      data: { name: "Asset Manager", email: "manager@assetflow.com", passwordHash, role: "ASSET_MANAGER", departmentId: dept2.id }
    });
    const employee = await prisma.user.create({
      data: { name: "John Doe", email: "john@assetflow.com", passwordHash, role: "EMPLOYEE", departmentId: dept1.id }
    });

    // Create Categories
    const catLaptop = await prisma.assetCategory.create({ data: { name: "Laptops" } });
    const catVehicle = await prisma.assetCategory.create({ data: { name: "Vehicles" } });

    // Create Assets
    await prisma.asset.create({
      data: { name: "MacBook Pro M3", categoryId: catLaptop.id, assetTag: "AF-0001", serialNumber: "C02XXX", condition: "NEW", status: "AVAILABLE" }
    });
    await prisma.asset.create({
      data: { name: "Dell XPS 15", categoryId: catLaptop.id, assetTag: "AF-0002", serialNumber: "D3LLX", condition: "GOOD", status: "AVAILABLE" }
    });
    await prisma.asset.create({
      data: { name: "Company Car - Honda Civic", categoryId: catVehicle.id, assetTag: "AF-0003", isBookable: true, condition: "GOOD", status: "AVAILABLE" }
    });

    return NextResponse.json({ message: "Seed successful!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
