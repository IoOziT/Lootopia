import { PrismaClient, role_enum, mode_enum, monde_enum } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Role
  let communRole = await prisma.role.findFirst({ where: { nom: role_enum.COMMUN } });
  if (!communRole) {
    communRole = await prisma.role.create({ data: { nom: role_enum.COMMUN } });
  }

  let partenaireRole = await prisma.role.findFirst({ where: { nom: role_enum.PARTENAIRE } });
  if (!partenaireRole) {
    partenaireRole = await prisma.role.create({ data: { nom: role_enum.PARTENAIRE } });
  }

  // User
  const user = await prisma.utilisateur.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'John Doe',
      role_id: communRole.id,
    },
  });

  // Chasses
  const chassesData = [
    {
      titre: 'Chasse au trésor de la Forêt',
      mode: mode_enum.PUBLIC,
      monde: monde_enum.REEL,
      localisation: 'Zone A',
      frais: 50,
      date_de_fin: new Date('2025-12-31'),
      createur_id: user.id,
    },
    {
      titre: 'Exploration des ruines',
      mode: mode_enum.PRIVE,
      monde: monde_enum.CARTOGRAPHIQUE,
      localisation: 'Zone B',
      frais: 75,
      date_de_fin: new Date('2025-10-15'),
      createur_id: user.id,
    },
    {
      titre: 'Chasse mystique',
      mode: mode_enum.PUBLIC,
      monde: monde_enum.REEL,
      localisation: 'Zone C',
      frais: 30,
      date_de_fin: new Date('2025-11-05'),
      createur_id: user.id,
    },
  ];

  for (const chasse of chassesData) {
    await prisma.chasse.create({ data: chasse });
  }

  console.log('✅ Chasses créées avec succès');
}

main()
  .catch((e) => {
    console.error('❌ Erreur dans le seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
