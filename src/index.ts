import { Prisma, PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

const prisma = new PrismaClient({ log: ['query', 'info', 'warn'] });

async function main() {
    const testProduct = await prisma.product.create({
        data: {
            name: 'Test product',
            price1: 8.7,
            price2: new Decimal('8.7'),
            price3: new Prisma.Decimal('8.7'),
            price4: '8.7',
        },
    });
    console.log(testProduct);

    let expectedDecimal = new Prisma.Decimal(8.7);

    // Does not work
    if (!testProduct.price1.eq(expectedDecimal)) console.error(`Price 1 (${testProduct.price1}) is not 8.7`);
    if (!testProduct.price2.eq(expectedDecimal)) console.error(`Price 2 (${testProduct.price2}) is not 8.7`);
    if (!testProduct.price3.eq(expectedDecimal)) console.error(`Price 3 (${testProduct.price3}) is not 8.7`);

    // Works!
    if (!testProduct.price4.eq(expectedDecimal)) console.error(`Price 4 (${testProduct.price4}) is not 8.7`);
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
