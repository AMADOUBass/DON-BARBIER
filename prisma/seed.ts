/**
 * Le Don Barbier — MASTER SEED (Rebranding Version)
 * 100% Premium Branding — Afro-centric Excellence.
 */

import { PrismaClient, Service } from "@prisma/client";
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

  // 4. Services (Catalogue Complet Barbier & Afro)
  const sList = [
    // --- CLASSIQUES ---
    { name: "Fade Classique", slug: "fade-classique", durationMins: 45, basePrice: 40, category: "classic", imageUrl: "/images/services/classic-cut.png", description: "Dégradé progressif aux finitions précises. Le standard de l'élégance." },
    { name: "Buzz Cut", slug: "buzz-cut", durationMins: 20, basePrice: 25, category: "classic", imageUrl: "/images/services/classic-cut.png", description: "Coupe courte uniforme à la tondeuse. Simple, propre, efficace." },
    { name: "Caesar Cut", slug: "caesar-cut", durationMins: 30, basePrice: 35, category: "classic", imageUrl: "/images/services/classic-cut.png", description: "Coupe courte avec frange horizontale courte. Un classique indémodable." },
    { name: "Side Part", slug: "side-part", durationMins: 35, basePrice: 35, category: "classic", imageUrl: "/images/services/classic-cut.png", description: "Coupe avec raie sur le côté pour un look structuré et professionnel." },

    // --- TENDANCES ---
    { name: "Pompadour Moderne", slug: "pompadour", durationMins: 50, basePrice: 45, category: "trending", imageUrl: "/images/services/trending-style.png", description: "Volume sur le dessus et côtés courts. Pour un style audacieux et sophistiqué." },
    { name: "Undercut", slug: "undercut", durationMins: 45, basePrice: 40, category: "trending", imageUrl: "/images/services/trending-style.png", description: "Contraste marqué entre les côtés très courts et la longueur sur le dessus." },
    { name: "French Crop", slug: "french-crop", durationMins: 40, basePrice: 40, category: "trending", imageUrl: "/images/services/trending-style.png", description: "Coupe texturée avec frange courte vers l'avant. Très facile à coiffer." },
    { name: "Mullet Moderne", slug: "mullet-moderne", durationMins: 60, basePrice: 50, category: "trending", imageUrl: "/images/services/trending-style.png", description: "Le retour du classique avec une touche dégradée moderne et travaillée." },

    // --- DÉGRADÉS SPÉCIALISÉS ---
    { name: "Drop Fade", slug: "drop-fade", durationMins: 60, basePrice: 50, category: "fade", imageUrl: "/images/services/specialized-fade.png", description: "Dégradé qui descend derrière l'oreille pour épouser la forme du crâne." },
    { name: "Burst Fade", slug: "burst-fade", durationMins: 60, basePrice: 55, category: "fade", imageUrl: "/images/services/specialized-fade.png", description: "Dégradé en arrondi autour de l'oreille, idéal pour les styles mohawk ou afro." },
    { name: "Bald Fade (À blanc)", slug: "bald-fade", durationMins: 60, basePrice: 50, category: "fade", imageUrl: "/images/services/specialized-fade.png", description: "Dégradé commençant à la peau pour un contraste maximal et une netteté totale." },

    // --- DESIGN & FINITIONS ---
    { name: "Line-Up Précision", slug: "line-up", durationMins: 15, basePrice: 15, category: "design", imageUrl: "/images/services/design-art.png", description: "Redessiner les contours du front et des tempes au rasoir. Netteté chirurgicale." },
    { name: "Hair Tattoo / Design", slug: "hair-tattoo", durationMins: 30, basePrice: 30, category: "design", imageUrl: "/images/services/design-art.png", description: "Motifs artistiques gravés dans la chevelure. Selon complexité." },
    { name: "Hard Part (Raie tracée)", slug: "hard-part", durationMins: 10, basePrice: 10, category: "design", imageUrl: "/images/services/design-art.png", description: "Tracé de la raie au rasoir pour accentuer la structure de la coupe." },

    // --- SERVICES BARBE ---
    { name: "Taille de Barbe Sculptée", slug: "taille-barbe", durationMins: 30, basePrice: 30, category: "barbe", imageUrl: "/images/services/beard-grooming.png", description: "Mise en forme, égalisation et hydratation de la barbe aux huiles premium." },
    { name: "Rasage à Chaud Traditionnel", slug: "rasage-chaud", durationMins: 45, basePrice: 45, category: "barbe", imageUrl: "/images/services/beard-grooming.png", description: "Expérience relaxante avec serviette chaude, mousse onctueuse et rasage au coupe-chou." },
    { name: "Combo Coupe + Barbe Luxe", slug: "combo-luxe", durationMins: 75, basePrice: 65, category: "barbe", imageUrl: "/images/services/beard-grooming.png", description: "Le service complet : Coupe Signature et Soin de barbe complet." },

    // --- LOCS (Expertise Afro) ---
    { name: "Retwist & Soin Profond", slug: "locs-retwist", durationMins: 120, basePrice: 100, category: "locks", imageUrl: "/images/services/retwist.png", description: "Entretien de vos locs avec nettoyage et resserrage des racines." },
    { name: "Starter Locs", slug: "starter-locs", durationMins: 240, basePrice: 200, category: "locks", imageUrl: "/images/services/starter-locs.png", description: "Installation professionnelle de vos premières locs. Consultation incluse." },

    // --- TRESSES ---
    { name: "Cornrows (Tresses collées)", slug: "cornrows", durationMins: 120, basePrice: 80, category: "braids", imageUrl: "/images/services/braids.png", description: "Tresses protectrices nettes avec designs géométriques variés." },
    { name: "Box Braids / Nattes", slug: "box-braids", durationMins: 240, basePrice: 150, category: "braids", imageUrl: "/images/services/braids.png", description: "Nattes individuelles protectrices pour une tenue longue durée." },

    // --- EXTRAS ---
    { name: "Shampoing & Massage", slug: "shampoing-extras", durationMins: 15, basePrice: 15, category: "extra", imageUrl: "/images/services/extras-grooming.png", description: "Nettoyage en profondeur et massage relaxant du cuir chevelu." },
    { name: "Coloration Homme", slug: "coloration-extra", durationMins: 60, basePrice: 45, category: "extra", imageUrl: "/images/services/extras-grooming.png", description: "Couverture des cheveux gris ou changement de style. Prix selon longueur." },
  ];

  const dbServices: Service[] = [];
  for (const s of sList) {
    const created = await prisma.service.create({ data: s });
    dbServices.push(created);
  }

  // Helper function to find a service by slug
  const getS = (slug: string) => dbServices.find(s => s.slug === slug)!;

  // 5. Liaisons Stylistes - Services
  // Don (Expertise Master)
  for (const slug of ["fade-classique", "combo-luxe", "shampoing-extras"]) {
    await prisma.stylistService.create({ data: { stylistId: sDon.id, serviceId: getS(slug).id } });
  }

  // Grace (Expertise Tresses & Locs)
  for (const slug of ["cornrows", "box-braids", "locs-retwist"]) {
    await prisma.stylistService.create({ data: { stylistId: sGrace.id, serviceId: getS(slug).id } });
  }

  // Wed (Expertise Dégradés & Contours)
  for (const slug of ["bald-fade", "burst-fade", "line-up"]) {
    await prisma.stylistService.create({ data: { stylistId: sWed.id, serviceId: getS(slug).id } });
  }

  // Henock (Expertise Barbe)
  for (const slug of ["taille-barbe", "rasage-chaud"]) {
    await prisma.stylistService.create({ data: { stylistId: sHenock.id, serviceId: getS(slug).id } });
  }

  // Beri (Expertise Freestyle & Designs)
  for (const slug of ["pompadour", "mullet-moderne", "hair-tattoo"]) {
    await prisma.stylistService.create({ data: { stylistId: sBeri.id, serviceId: getS(slug).id } });
  }

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
    await prisma.appointment.create({ data: { clientId: cli.id, stylistId: sDon.id, serviceId: getS("combo-luxe").id, scheduledAt: dA(i + 1), durationMins: 75, totalPrice: 45, depositAmount: 15, depositPct: 30, status: "COMPLETED" } });
  }

  console.log("\n🔥  REBRANDING RÉUSSI : Équipe Don Barbier installée et prête !");
}

main()
  .catch((e) => { console.error("❌  Seed échoué :", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
