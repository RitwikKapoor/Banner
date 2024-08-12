import { prisma } from "../config/prismaConfig.js"
import bcrypt from "bcryptjs";

async function main() {
  // Create a user
  const hashedPassword = await bcrypt.hash("password123", 10);
  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
    },
  });
  console.log({ user });

  // Create a banner
  const banner = await prisma.banner.upsert({
    where: { id: 1 },
    update: {},
    create: {
      text: "Welcome to our site!",
      url: "https://example.com",
      isVisible: true,
    },
  });
  console.log({ banner });

  // Create or update a timer
  const timer = await prisma.timer.upsert({
    where: { id: 1 },
    update: {},
    create: {
      timerDays: 3,
      timerHours: 12,
      timerMinutes: 30,
      timerSeconds: 45,
      createdAt: new Date(),
    },
  });
  console.log({ timer });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
