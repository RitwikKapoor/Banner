import { prisma } from "../config/prismaConfig.js";
import { io } from "../index.js";

export const bannerAll = async (req, res) => {
  try {
    const banner = await prisma.banner.findUnique({
      where: { id: 1 },
    });

    const timer = await prisma.timer.findUnique({
      where: { id: 1 },
    });

    res.status(200).json({
      text: banner.text,
      url: banner.url,
      isVisible: banner.isVisible,
      timerDays: timer.timerDays,
      timerHours: timer.timerHours,
      timerMinutes: timer.timerMinutes,
      timerSeconds: timer.timerSeconds,
      createdAt: timer.createdAt
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error fetching banner and timer data" });
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

    res.status(200).json(updatedBanner);
  } catch (error) {
    console.log(error);
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

    res.status(200).json(updatedBanner);
  } catch (error) {
    console.log(error);
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

    res.status(200).json(updatedBanner);
  } catch (error) {
    res.status(500).json({ error: "Error updating visibility" });
  }
};

export const bannerTimerUpdate = async (req, res) => {
  try {
    const { days, hours, minutes, seconds } = req.body;
    const updatedTimer = await prisma.timer.update({
      where: { id: 1 },
      data: {
        timerDays: days,
        timerHours: hours,
        timerMinutes: minutes,
        timerSeconds: seconds,
        createdAt: new Date(),
      },
    });

    if (updatedTimer) {
      io.emit("bannerTimerUpdated", {
        days: updatedTimer.timerDays,
        hours: updatedTimer.timerHours,
        minutes: updatedTimer.timerMinutes,
        seconds: updatedTimer.timerSeconds,
      });
    }

    res.status(200).json(updatedTimer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating timer" });
  }
};
