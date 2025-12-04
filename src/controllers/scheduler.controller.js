import prisma from '../utils/prisma.js';

export const getScheduler = async (req, res) => {
  try {
    const posts = await prisma.scheduler.findMany({
      where: { userId: req.userId },
      orderBy: { date: "asc" }
    });

    res.json(posts);

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};


export const createScheduler = async (req, res) => {
  try {
    const { platform, caption, date } = req.body;

    if (!platform || !date)
      return res.status(400).json({ message: "Missing fields" });

    const post = await prisma.scheduler.create({
      data: {
        platform,
        caption: caption || "",
        date: new Date(date),
        userId: req.userId
      }
    });

    res.json(post);

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteScheduler = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.scheduler.delete({ where: { id } });

    res.json({ message: "Scheduled post deleted" });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};
