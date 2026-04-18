/**
 * Le Don Barbier — MASTER SEED (Rebranding Version)
 * 100% Premium Branding — Afro-centric Excellence.
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config({ path: ".env.local" }); 
config();                        

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

function dA(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(10, 0, 0, 0);
  return d;
}

async function main() {
  console.log("🌱  Lancement du Rebranding de la Base de Données (Don Barbier Master Seed)...\n");

  // 1. Reset
  await prisma.$transaction([
    prisma.review.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.order.deleteMany(),
    prisma.appointment.deleteMany(),
    prisma.portfolioPhoto.deleteMany(),
    prisma.galleryPhoto.deleteMany(),
    prisma.stylistService.deleteMany(),
    prisma.availability.deleteMany(),
    prisma.stylist.deleteMany(),
    prisma.cartItem.deleteMany(),
    prisma.product.deleteMany(),
    prisma.productCategory.deleteMany(),
    prisma.service.deleteMany(),
    prisma.session.deleteMany(),
    prisma.account.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const hA = await bcrypt.hash("DonBarbier2026!", 12);
  const hU = await bcrypt.hash("BarberTest2026!", 12);

  // 2. Utilisateurs
  const don = await prisma.user.create({ data: { email: "contact@donbarbier.beauty", name: "Elvis 'Don' Berwa", passwordHash: hA, role: "ADMIN", isMember: true, image: "/images/team/don.png", emailVerified: new Date() } });
  const grace = await prisma.user.create({ data: { email: "grace@donbarbier.beauty", name: "QueenG (Grace)", passwordHash: hU, role: "STYLIST", isMember: true, image: "/images/team/grace.png", emailVerified: new Date() } });
  const wed = await prisma.user.create({ data: { email: "wed@donbarbier.beauty", name: "Wed Barber", passwordHash: hU, role: "STYLIST", isMember: true, image: "/images/team/wed.png", emailVerified: new Date() } });
  const henock = await prisma.user.create({ data: { email: "henock@donbarbier.beauty", name: "Henock", passwordHash: hU, role: "STYLIST", isMember: false, image: "/images/team/henock.png", emailVerified: new Date() } });
  const beri = await prisma.user.create({ data: { email: "beri@donbarbier.beauty", name: "BeriCutzz", passwordHash: hU, role: "STYLIST", isMember: false, image: "/images/team/beri.png", emailVerified: new Date() } });
  const cli = await prisma.user.create({ data: { email: "client@test.com", name: "Marc Dupont", passwordHash: hU, role: "CLIENT", isMember: true, image: "/images/users/client.png", emailVerified: new Date() } });

  // 3. Stylistes
  const sDon = await prisma.stylist.create({ data: { userId: don.id, yearsExp: 15, avatarUrl: don.image, specialties: ["SIGNATURE_FADE", "BARBE", "LUXE"] as any, bio: "Le Don lui-même. 15 ans d'expertise dans la maîtrise des textures afro et des coupes de haute précision. Créateur du mouvement #BÉNITSOITLAMAIN." } });
  const sGrace = await prisma.stylist.create({ data: { userId: grace.id, yearsExp: 8, avatarUrl: grace.image, specialties: ["TRESSES", "SOINS_AFRO"] as any, bio: "Experte en styling et tresses protectrices. Grace sublime chaque texture avec une précision artistique et un soin profond." } });
  const sWed = await prisma.stylist.create({ data: { userId: wed.id, yearsExp: 10, avatarUrl: wed.image, specialties: ["FADE", "CONTOURS"] as any, bio: "Maître des contours et des dégradés millimétrés. Wed transforme chaque coupe en une œuvre d'art géométrique." } });
  const sHenock = await prisma.stylist.create({ data: { userId: henock.id, yearsExp: 6, avatarUrl: henock.image, specialties: ["BARBE", "GROOMING"] as any, bio: "L'expert grooming du salon. Henock redéfinit l'élégance masculine avec des techniques classiques et modernes." } });
  const sBeri = await prisma.stylist.create({ data: { userId: beri.id, yearsExp: 5, avatarUrl: beri.image, specialties: ["FREESTYLE", "FADE"] as any, bio: "Le style moderne par excellence. Beri mixe créativité freestyle et fades impeccables pour un look unique." } });

  for (const s of [sDon, sGrace, sWed, sHenock, sBeri]) { for (let d=1; d<=6; d++) await prisma.availability.create({ data: { stylistId: s.id, dayOfWeek: d, startTime: "09:00", endTime: "19:00" } }); }

  // 4. Services (Réalistes Afro & Mixte)
  const ser1 = await prisma.service.create({ data: { name: "Coupe Signature Don Luxe", slug: "signature-don-luxe", durationMins: 90, basePrice: 65, imageUrl: "/images/services/fade-luxury.png", category: "Grooming", description: "L'expérience premium complète : Coupe de précision, soin de barbe, serviette chaude et massage du cuir chevelu." } });
  const ser2 = await prisma.service.create({ data: { name: "Skin Fade (Dégradé à blanc)", slug: "skin-fade", durationMins: 60, basePrice: 45, imageUrl: "/images/services/fade-white.png", category: "Grooming", description: "Travail de dégradé millimétré à la tondeuse et au rasoir. Finitions impeccables." } });
  const ser3 = await prisma.service.create({ data: { name: "Starter Locs (Installation)", slug: "starter-locs", durationMins: 240, basePrice: 200, imageUrl: "/images/services/starter-locs.png", category: "Locs", description: "Installation professionnelle de vos locs. Consultation incluse pour choisir la méthode adaptée." } });
  const ser4 = await prisma.service.create({ data: { name: "Retwist & Soin Hydratant", slug: "retwist-soin", durationMins: 120, basePrice: 120, imageUrl: "/images/services/retwist.png", category: "Locs", description: "Entretien de vos locs avec soin profond et styling optionnel pour une tenue parfaite." } });
  const ser5 = await prisma.service.create({ data: { name: "Tresses & Cornrows (Tête complète)", slug: "tresses-rows", durationMins: 180, basePrice: 100, imageUrl: "/images/services/braids.png", category: "Tresses", description: "Design géométrique et tresses protectrices nettes pour un style durable." } });
  const ser6 = await prisma.service.create({ data: { name: "Wash & Go / Définition de boucles", slug: "wash-go", durationMins: 45, basePrice: 45, imageUrl: "/images/services/natural.png", category: "Mixte", description: "Soin lavant et définition des boucles naturelles pour toutes les textures." } });
  const ser7 = await prisma.service.create({ data: { name: "Traitement Vapeur Hydratation", slug: "steam-treatment", durationMins: 60, basePrice: 50, imageUrl: "/images/services/treatment.png", category: "Soin", description: "Soin à la vapeur pour ouvrir les pores et faire pénétrer les nutriments en profondeur." } });

  for (const s of [ser1, ser2, ser6]) await prisma.stylistService.create({ data: { stylistId: sDon.id, serviceId: s.id } });
  await prisma.stylistService.create({ data: { stylistId: sGrace.id, serviceId: ser5.id } });
  await prisma.stylistService.create({ data: { stylistId: sWed.id, serviceId: ser2.id } });

  // 5. Boutique (Produits Premium Don Barbier)
  const catS = await prisma.productCategory.create({ data: { name: "Soins & Barbe", slug: "soins-barbe" } });
  const catH = await prisma.productCategory.create({ data: { name: "Shampooing & Soins", slug: "shampooing-soins" } });
  const catA = await prisma.productCategory.create({ data: { name: "Accessoires Prestige", slug: "accessoires-prestige" } });
  const catK = await prisma.productCategory.create({ data: { name: "Kits & Coffrets", slug: "kits-coffrets" } });

  await prisma.product.create({ 
    data: { 
      name: "Huile à Barbe Premium (Baobab & Santal)", 
      slug: "huile-barbe-premium", 
      price: 42, 
      stock: 30, 
      images: ["/images/products/beard-oil.png"], 
      categoryId: catS.id, 
      isFeatured: true, 
      description: "L'essence du Don. Un mélange précieux d'huile de baobab et de bois de santal pour une barbe souple, hydratée et divinement parfumée. Élimine les démangeaisons et favorise une croissance saine." 
    } 
  });
  
  await prisma.product.create({ 
    data: { 
      name: "Beurre de Karité Capillaire Pur", 
      slug: "beurre-karite-pur", 
      price: 35, 
      stock: 25, 
      images: ["/images/products/shea-butter.png"], 
      categoryId: catH.id, 
      isFeatured: true, 
      description: "Soin profond pour cheveux texturés. Ce beurre de karité bio ultra-nourrissant scelle l'hydratation et définit vos boucles sans laisser de résidus gras." 
    } 
  });

  await prisma.product.create({ 
    data: { 
      name: "Brosse à Waves (Bois de Rose)", 
      slug: "brosse-waves-rosewood", 
      price: 55, 
      stock: 15, 
      images: ["/images/products/waves-brush.png"], 
      categoryId: catA.id, 
      isFeatured: true, 
      description: "L'outil ultime pour des waves parfaites. Conçue en bois de rose noble avec des poils de sanglier naturels pour une compression optimale du cheveu." 
    } 
  });

  await prisma.product.create({ 
    data: { 
      name: "Peigne Afro Artisanal en Bois", 
      slug: "peigne-afro-bois", 
      price: 28, 
      stock: 40, 
      images: ["/images/products/afro-comb.png"], 
      categoryId: catA.id, 
      description: "Démêlage tout en douceur. Ce peigne antistatique en bois poli respecte la fibre capillaire et évite la casse, tout en offrant une prise en main iconique." 
    } 
  });

  await prisma.product.create({ 
    data: { 
      name: "Durag en Soie Premium 'Don Gold'", 
      slug: "durag-soie-gold", 
      price: 30, 
      stock: 50, 
      images: ["/images/products/silk-durag.png"], 
      categoryId: catA.id, 
      isFeatured: true, 
      description: "Élégance et protection. Tissage en soie de haute qualité pour maintenir vos styles et vos waves durant la nuit avec une brillance incomparable." 
    } 
  });

  await prisma.product.create({ 
    data: { 
      name: "Gel de Traçage Précision", 
      slug: "gel-tracing-precision", 
      price: 24, 
      stock: 45, 
      images: ["/images/products/tracing-gel.png"], 
      categoryId: catS.id, 
      description: "Pour des contours d'une netteté chirurgicale. Gel transparent permettant une visibilité totale lors de l'utilisation du rasoir." 
    } 
  });

  await prisma.product.create({ 
    data: { 
      name: "Coffret Cadeau 'Le Don'", 
      slug: "coffret-cadeau-don", 
      price: 120, 
      comparePrice: 150,
      stock: 10, 
      images: ["/images/products/product-kit.png"], 
      categoryId: catK.id, 
      isFeatured: true, 
      description: "Le cadeau idéal. Comprend l'huile signature, la brosse premium et le peigne artisanal dans un coffret de luxe." 
    } 
  });

  // 6. Galerie (Nos Créations restaurées)
  const gP = [
    { url: "/images/gallery/creation-1.png", caption: "Signature Fade & Barbe Masterpiece", tags: ["Fade", "Barbe"], isFeatured: true },
    { url: "/images/gallery/creation-2.png", caption: "Expertise Locs & Styling", tags: ["Locs"], isFeatured: true },
    { url: "/images/gallery/creation-3.png", caption: "Freestyle Design Precision", tags: ["Fade", "Freestyle"], isFeatured: true },
    { url: "/images/gallery/creation-4.png", caption: "Art des Tresses Géométriques", tags: ["Tresses"], isFeatured: true },
    { url: "/images/gallery/creation-5.png", caption: "Classic Grooming Elegance", tags: ["Classic"], isFeatured: true },
    { url: "/images/gallery/creation-6.png", caption: "Modern Burst Fade & Curls", tags: ["Modern", "Fade"], isFeatured: true },
  ];
  for (const ph of gP) await prisma.galleryPhoto.create({ data: { ...ph, uploadedBy: don.id } });

  // 7. Données Business (RDV récents)
  for (let i = 0; i < 5; i++) {
    await prisma.appointment.create({ data: { clientId: cli.id, stylistId: sDon.id, serviceId: ser1.id, scheduledAt: dA(i + 1), durationMins: 75, totalPrice: 45, depositAmount: 15, depositPct: 30, status: "COMPLETED" } });
  }

  console.log("\n🔥  REBRANDING RÉUSSI : Équipe Don Barbier installée et prête !");
}

main()
  .catch((e) => { console.error("❌  Seed échoué :", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
