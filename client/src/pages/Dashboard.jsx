import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [timer, setTimer] = useState({
    days: 5,
    hours: 12,
    minutes: 30,
    seconds: 0,
  });
  const [text, setText] = useState("Limited Time Offer!");
  const [link, setLink] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimer((prev) => ({
      ...prev,
      [name]: parseInt(value, 10),
    }));
  };

  const handleUpdateTimer = async () => {
    try {
      if (!token) {
        throw new Error("No authentication token found.");
      }
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/banner/timer`,
        timer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Timer updated successfully!");
    } catch (error) {
      console.error("Error updating timer:", error);
      alert("Failed to update timer.");
    }
  };

  const handleUpdateText = async (e) => {
    try {
      if (!token) {
        throw new Error("No authentication token found.");
      }

      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/banner/text`,
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Text updated successfully!");
    } catch (error) {
      console.error("Error updating text:", error);
      alert("Failed to update text.");
    }
  };

  const handleUpdateLink = async (e) => {
    try {
      if (!token) {
        throw new Error("No authentication token found.");
      }

      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/banner/link`,
        {
          link,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Link updated successfully!");
    } catch (error) {
      console.error("Error updating link:", error);
      alert("Failed to update link.");
    }
  };

  const handleToggleVisibility = async (e) => {
    try {
      if (!token) {
        throw new Error("No authentication token found.");
      }

      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/banner/vis`,
        {
          isVisible: !isVisible,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update state and alert user
      setIsVisible((prevVisibility) => !prevVisibility);
      alert(`Banner ${!isVisible ? "shown" : "hidden"} successfully!`);
    } catch (error) {
      console.error("Error toggling visibility:", error);
      alert("Failed to toggle visibility.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-teal-600">Dashboard</h1>

        {/* Timer Settings */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">Update Timer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            Days{" "}
            <input
              type="number"
              name="days"
              value={timer.days}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Days"
            />
            Hours{" "}
            <input
              type="number"
              name="hours"
              value={timer.hours}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Hours"
            />
            Minutes{" "}
            <input
              type="number"
              name="minutes"
              value={timer.minutes}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Minutes"
            />
            Seconds{" "}
            <input
              type="number"
              name="seconds"
              value={timer.seconds}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Seconds"
            />
          </div>
          <button
            type="button"
            onClick={handleUpdateTimer}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors duration-300 mt-4"
          >
            Update Timer
          </button>
        </div>

        {/* Text Settings */}
        <div className="mt-10 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">Update Text</h2>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Banner Text"
          />
          <button
            type="button"
            onClick={handleUpdateText}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors duration-300"
          >
            Update Text
          </button>
        </div>

        {/* Link Settings */}
        <div className="mt-10 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">Update Link</h2>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Link"
          />
          <button
            type="button"
            onClick={handleUpdateLink}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors duration-300"
          >
            Update Link
          </button>
        </div>

        {/* Visibility Settings */}
        <div className="mt-10 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Toggle Banner Visibility
          </h2>
          <button
            type="button"
            onClick={handleToggleVisibility}
            className={`w-full ${
              isVisible ? "bg-red-500" : "bg-green-500"
            } text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors duration-300`}
          >
            {isVisible ? "Hide Banner" : "Show Banner"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
