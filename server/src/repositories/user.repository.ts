import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const userRepository = {
  findByUsername: (username: string) => {
    return prisma.user.findUnique({
      where: { username }
    });
  },

  createUser: (username: string) => {
    return prisma.user.create({
      data: { username },
      select: {
        id: true,
        username: true
      }
    });
  }
};