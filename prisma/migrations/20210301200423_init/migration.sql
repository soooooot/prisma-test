-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price1" DECIMAL(65,30) NOT NULL,
    "price2" DECIMAL(65,30) NOT NULL,
    "price3" DECIMAL(65,30) NOT NULL,
    "price4" DECIMAL(65,30) NOT NULL,

    PRIMARY KEY ("id")
);
