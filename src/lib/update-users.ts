import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";

config({ path: ".env.local" });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const users = [
    { name: "Elvis", img: "/images/team/don.png" },
    { name: "Grace", img: "/images/team/grace.png" },
    { name: "Wed", img: "/images/team/wed.png" },
    { name: "Henock", img: "/images/team/henock.png" },
    { name: "Beri", img: "/images/team/beri.png" },
  ];

  for (const u of users) {
    // Update User
    const resUser = await prisma.user.updateMany({
      where: { name: { contains: u.name, mode: "insensitive" } },
      data: { image: u.img },
    });
    console.log(`Updated User ${u.name}: ${resUser.count} records`);

    // Update Stylist
    const resStylist = await prisma.stylist.updateMany({
      where: { user: { name: { contains: u.name, mode: "insensitive" } } },
      data: { avatarUrl: u.img },
    });
    console.log(`Updated Stylist ${u.name}: ${resStylist.count} records`);
  }

  console.log("Don Barbier Team Images Updated successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
