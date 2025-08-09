// repositories/movie.repository.ts
import { PrismaClient, Movie } from "@prisma/client";

const prisma = new PrismaClient();

export const movieRepository = {
  findAll: async (skip: number, take: number): Promise<Movie[]> => {
    return prisma.movie.findMany({
      where: {
        OR: [
          { action: null },
          { action: { not: 'deleted' } }
        ]
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take
    });
  },

  countAll: async (): Promise<number> => {
    return prisma.movie.count({
      where: {
        OR: [
          { action: null },
          { action: { not: 'deleted' } }
        ]
      }
    });
  },

  findFirstByTitle: async (title: string): Promise<Movie | null> => {
    return prisma.movie.findFirst({
      where: {
        title: {
          equals: title,
          mode: 'insensitive'
        }
      }
    });
  },

  searchByTitle: async (query: string): Promise<Movie[]> => {
    return prisma.movie.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                title: {
                  equals: query,
                  mode: 'insensitive'
                }
              },
              {
                title: {
                  startsWith: query,
                  mode: 'insensitive'
                }
              },
              {
                title: {
                  contains: query,
                  mode: 'insensitive'
                }
              }
            ]
          },
          {
            OR: [
              { action: null },
              { action: { not: 'deleted' } }
            ]
          }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
  },
  findManyBySearchQuery: async (query: string): Promise<Movie[]> => {
    const cleanQuery = query.trim().toLowerCase();

    return prisma.movie.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { equals: cleanQuery, mode: 'insensitive' } },
              { title: { startsWith: cleanQuery, mode: 'insensitive' } },
              { title: { contains: cleanQuery, mode: 'insensitive' } },
            ],
          },
          {
            OR: [
              { action: null },
              { action: { not: 'deleted' } },
            ],
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  },
  
  findByTitle: async (title: string): Promise<Movie | null> => {
    return prisma.movie.findFirst({
        where: { title: title },
    });
  },

  findById: async (id: number): Promise<Movie | null> => {
    return prisma.movie.findUnique({ where: { id } });
  },

  create: async (data: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie> => {
    return prisma.movie.create({ data });
  },

  update: async (id: number, data: Partial<Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Movie> => {
    return prisma.movie.update({ where: { id }, data });
  },

  softDelete: async (id: number): Promise<boolean> => {
    const movie = await prisma.movie.findUnique({ where: { id } });
    if (!movie) return false;
    if (movie.action === 'deleted') return true;
    await prisma.movie.update({ where: { id }, data: { action: 'deleted' } });
    return true;
  },

  hardDelete: async (id: number): Promise<boolean> => {
    try {
      await prisma.movie.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error('Error in hardDelete:', error);
      return false;
    }
  },

  findFavoritesByUsername: async (username: string): Promise<Movie[]> => {
    return prisma.movie.findMany({
      where: {
        username: username,
        action: 'favorite'
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  findFavoriteByTitleAndUsername: async (title: string, username: string): Promise<Movie | null> => {
    return prisma.movie.findFirst({
      where: {
        title: {
          equals: title,
          mode: 'insensitive'
        },
        username: username,
        action: 'favorite'
      }
    });
  }
};