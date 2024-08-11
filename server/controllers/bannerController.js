import { prisma } from "../config/prismaConfig.js";
import { io } from "../index.js";


export const bannerAll = async (req, res) => {
  try {
    const banner = await prisma.banner.findUnique({
      where: { id: 1 },
    });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ error: "Error fetching banner data" });
  }
};


export const bannerTextUpdate = async (req, res) => {
  try {
    const { text } = req.body;
    const updatedBanner = await prisma.banner.update({
      where: { id: 1 },
      data: { text },
    });

    if (updatedBanner) {
      io.emit("bannerTextUpdated", updatedBanner.text);
    }

    res.json(updatedBanner);
  } catch (error) {
    res.status(500).json({ error: "Error updating text" });
  }
};

export const bannerLinkUpdate = async (req, res) => {
  try {
    const { link } = req.body;
    const updatedBanner = await prisma.banner.update({
      where: { id: 1 },
      data: { url: link },
    });

    if (updatedBanner) {
      io.emit("bannerLinkUpdated", updatedBanner.url);
    }

    res.json(updatedBanner);
  } catch (error) {
    res.status(500).json({ error: "Error updating link" });
  }
};

export const bannerVisibilityUpdate = async (req, res) => {
  try {
    const { isVisible } = req.body;
    const updatedBanner = await prisma.banner.update({
      where: { id: 1 },
      data: { isVisible },
    });

    if (updatedBanner) {
      io.emit("bannerVisibilityUpdated", updatedBanner.isVisible);
    }

    res.json(updatedBanner);
  } catch (error) {
    res.status(500).json({ error: "Error updating visibility" });
  }
};

export const bannerTimerUpdate = async (req, res) => {
  try {
    const { days, hours, minutes, seconds } = req.body;
    const updatedBanner = await prisma.banner.update({
      where: { id: 1 },
      data: {
        timerDays: days,
        timerHours: hours,
        timerMinutes: minutes,
        timerSeconds: seconds,
      },
    });

    if (updatedBanner) {
      io.emit("bannerTimerUpdated", {
        days: updatedBanner.timerDays,
        hours: updatedBanner.timerHours,
        minutes: updatedBanner.timerMinutes,
        seconds: updatedBanner.timerSeconds,
      });
    }

    res.json(updatedBanner);
  } catch (error) {
    res.status(500).json({ error: "Error updating timer" });
  }
};
