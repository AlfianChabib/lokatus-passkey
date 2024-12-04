import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passkey = await prisma.passkey.create({
    data: { key: "lokatus1234" },
  });
  console.log(passkey);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
