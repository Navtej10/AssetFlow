import prisma from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Organization & Departments
  let devDept = await prisma.department.findFirst({ where: { name: 'Engineering' } });
  if (!devDept) {
    devDept = await prisma.department.create({ data: { name: 'Engineering', status: 'ACTIVE' } });
  }

  let opsDept = await prisma.department.findFirst({ where: { name: 'Operations' } });
  if (!opsDept) {
    opsDept = await prisma.department.create({ data: { name: 'Operations', status: 'ACTIVE' } });
  }

  // 2. Create Users
  let admin = await prisma.user.findFirst({ where: { email: 'admin@assetflow.com' } });
  if (!admin) {
    admin = await prisma.user.create({
      data: { email: 'admin@assetflow.com', passwordHash, name: 'Admin User', role: 'ADMIN', departmentId: devDept.id }
    });
  }

  let manager = await prisma.user.findFirst({ where: { email: 'manager@assetflow.com' } });
  if (!manager) {
    manager = await prisma.user.create({
      data: { email: 'manager@assetflow.com', passwordHash, name: 'Asset Manager', role: 'ASSET_MANAGER', departmentId: opsDept.id }
    });
  }

  let employee = await prisma.user.findFirst({ where: { email: 'employee@assetflow.com' } });
  if (!employee) {
    employee = await prisma.user.create({
      data: { email: 'employee@assetflow.com', passwordHash, name: 'Test Employee', role: 'EMPLOYEE', departmentId: devDept.id }
    });
  }

  // 3. Create Asset Categories
  let laptops = await prisma.assetCategory.findFirst({ where: { name: 'Laptops' } });
  if (!laptops) {
    laptops = await prisma.assetCategory.create({
      data: { name: 'Laptops', customFields: JSON.stringify({ processor: 'string', ram: 'string' }) }
    });
  }

  let projectors = await prisma.assetCategory.findFirst({ where: { name: 'Projectors' } });
  if (!projectors) {
    projectors = await prisma.assetCategory.create({
      data: { name: 'Projectors', customFields: JSON.stringify({ lumens: 'string' }) }
    });
  }

  // 4. Create Seed Assets
  let asset1 = await prisma.asset.findFirst({ where: { assetTag: 'AF-0001' } });
  if (!asset1) {
    asset1 = await prisma.asset.create({
      data: { assetTag: 'AF-0001', name: 'MacBook Pro 16"', categoryId: laptops.id, serialNumber: 'C02XD08HMTQ6', condition: 'NEW', isBookable: false, status: 'AVAILABLE', location: 'HQ-Floor1' }
    });
  }

  let asset2 = await prisma.asset.findFirst({ where: { assetTag: 'AF-0002' } });
  if (!asset2) {
    asset2 = await prisma.asset.create({
      data: { assetTag: 'AF-0002', name: 'Epson 4K Projector', categoryId: projectors.id, serialNumber: 'EP4K-99234', condition: 'GOOD', isBookable: true, status: 'AVAILABLE', location: 'Conference Room A' }
    });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
