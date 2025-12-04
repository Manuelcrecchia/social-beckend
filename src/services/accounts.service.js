// FILE: src/services/accounts.service.js
import prisma from '../utils/prisma.js';

export const getUserAccounts = async (userId) => {
  return prisma.account.findMany({ where: { userId } });
};

export const upsertTikTokAccount = async (userId, data) => {
  const existing = await prisma.account.findFirst({
    where: { userId, platform: "TikTok" }
  });

  if (existing) {
    return prisma.account.update({
      where: { id: existing.id },
      data: {
        username: data.username,
        token: data.accessToken,
        refreshToken: data.refreshToken,
        status: "connected"
      }
    });
  }

  return prisma.account.create({
    data: {
      userId,
      platform: "TikTok",
      username: data.username,
      token: data.accessToken,
      refreshToken: data.refreshToken,
      status: "connected"
    }
  });
};

export const deleteAccountById = async (userId, id) => {
  return prisma.account.deleteMany({
    where: { id: parseInt(id), userId }
  });
};
