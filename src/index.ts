import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info", "warn"] });

async function main() {
  const decimal1 = new Prisma.Decimal("100000000000000000000000");
  const decimal2 = new Prisma.Decimal("1234522345323454234552345");

  const items: Prisma.PriceCreateInput[] = [
    {
      id: 1,
      price: decimal1
    },
    {
      id: 2,
      price: decimal2
    }
  ];

  await prisma.price.deleteMany();
  await prisma.price.createMany({
    data: items
  });

  await prisma.$executeRaw('INSERT INTO "public"."Price" ("id", "price") VALUES (3, 100000000000000000000000), (4, 1234522345323454234552345)');

  const price1 = await prisma.price.findUnique({ where: { id: 1 }});
  const price2 = await prisma.price.findUnique({ where: { id: 2 }});
  const price3 = await prisma.price.findUnique({ where: { id: 3 }});
  const price4 = await prisma.price.findUnique({ where: { id: 4 }});

  console.log('price1 in db', price1?.price); // 9999999999999999  
  console.log('price2 in db', price2?.price); // 1234522345323454

  console.log('price1 as expected', price1?.price.eq(decimal1)); // false
  console.log('price2 as expected', price2?.price.eq(decimal2)); // false
  console.log('price3 as expected', price3?.price.eq(decimal1)); // true
  console.log('price4 as expected', price4?.price.eq(decimal2)); // true
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
