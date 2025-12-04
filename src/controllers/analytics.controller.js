import prisma from '../utils/prisma.js';

export const getAnalytics = async (req, res) => {
  try {
    const data = await prisma.analytics.findMany({
      where: { userId: req.userId },
      orderBy: { date: "desc" },
      take: 30
    });

    res.json(data);

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};
