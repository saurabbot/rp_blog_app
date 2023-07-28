import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  const firstUser = await prisma.user.create({
    data: {
      id: 1,
      first_name: 'Saurabh',
      last_name: 'Nambiar',
      email: 'saurabhnamb@gmail.com',
      password: 'nestaway1',
    },
  });
  console.log(`User has been created --------->>`, firstUser);
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
