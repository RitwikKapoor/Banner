import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io(import.meta.env.VITE_APP_BASE_URL);

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [bannerText, setBannerText] = useState("Loading...");
  const [bannerLink, setBannerLink] = useState("#");
  const [isVisible, setIsVisible] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/api/banner/all`
        );
        const {
          text,
          url,
          isVisible,
          timerDays,
          timerHours,
          timerMinutes,
          timerSeconds,
        } = response.data;

        setBannerText(text);
        setBannerLink(url);
        setIsVisible(isVisible);
        setTimeLeft({
          days: timerDays,
          hours: timerHours,
          minutes: timerMinutes,
          seconds: timerSeconds,
        });
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBannerData();

    // Start the timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        const { days, hours, minutes, seconds } = prevTime;
        const totalSeconds =
          days * 86400 + hours * 3600 + minutes * 60 + seconds;

        if (totalSeconds === 0) {
          clearInterval(timerRef.current);
          return prevTime;
        }

        const newTotalSeconds = totalSeconds - 1;
        return {
          days: Math.floor(newTotalSeconds / 86400),
          hours: Math.floor((newTotalSeconds % 86400) / 3600),
          minutes: Math.floor((newTotalSeconds % 3600) / 60),
          seconds: newTotalSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    socket.on("bannerTextUpdated", (newText) => {
      setBannerText(newText);
    });

    socket.on("bannerLinkUpdated", (newLink) => {
      setBannerLink(newLink);
    });

    socket.on("bannerVisibilityUpdated", (newVisibility) => {
      setIsVisible(newVisibility);
    });

    socket.on("bannerTimerUpdated", (newTimer) => {
      setTimeLeft({
        days: newTimer.days,
        hours: newTimer.hours,
        minutes: newTimer.minutes,
        seconds: newTimer.seconds,
      });
    });

    return () => {
      socket.off("bannerTextUpdated");
      socket.off("bannerLinkUpdated");
      socket.off("bannerVisibilityUpdated");
      socket.off("bannerTimerUpdated");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center flex-col">
      {/* Heading above the timer */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold text-teal-700">
          This is above Banner Heading
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          This is above banner subheading
        </p>
      </div>

      {/* Timer Banner */}
      <div
        className={`bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full text-center transform hover:scale-105 transition-transform duration-300 ${
          isVisible ? "" : "hidden"
        }`}
      >
        <h1 className="text-4xl font-bold mb-4 text-teal-600">{bannerText}</h1>
        <p className="text-xl mb-6 text-gray-700">The timer</p>
        <div className="flex justify-center space-x-4 mb-8">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="bg-teal-100 rounded-lg p-3">
                <div className="text-5xl font-bold text-teal-500 mb-2">
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm uppercase text-teal-400">{key}</div>
              </div>
            </div>
          ))}
        </div>
        <Link
          to={bannerLink}
          target="_blank"
          className="mt-8 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
        >
          Click here!
        </Link>
      </div>
    </div>
  );
};

export default Home;
