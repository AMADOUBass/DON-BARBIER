import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";

config({ path: ".env.local" });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const images = [
    "https://images.unsplash.com/photo-1621605815841-2dddbaaaf0b2?q=80&w=2070",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974",
    "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=2070",
    "https://images.unsplash.com/photo-1593702295094-1a069046637e?q=80&w=2070",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069",
    "/images/team/don.png",
    "/images/team/grace.png",
    "/images/team/wed.png",
    "/images/team/henock.png",
    "/images/team/beri.png",
  ];

  const photos = await prisma.galleryPhoto.findMany({ orderBy: { createdAt: "asc" } });

  let i = 0;
  for (const photo of photos) {
    const imgUrl = images[i % images.length];
    await prisma.galleryPhoto.update({
      where: { id: photo.id },
      data: { url: imgUrl }
    });
    console.log(`Updated photo ${photo.id} with ${imgUrl}`);
    i++;
  }

  console.log("Don Barbier Gallery Updated successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
