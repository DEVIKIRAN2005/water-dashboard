import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function App() {

  const [feeds, setFeeds] = useState([]);

  const [latestData, setLatestData] = useState({
    turbidity: "--",
    tds: "--",
    inlet: "--",
    outlet: "--",
  });

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await fetch(
          "https://api.thingspeak.com/channels/3377004/feeds.json?results=20"
        );

        const data = await response.json();

        if (data.feeds) {

          setFeeds(data.feeds);

          const latest =
            data.feeds[data.feeds.length - 1];

          if (latest) {

            setLatestData({

              turbidity: latest.field1
                ? Number(latest.field1).toFixed(3)
                : "--",

              tds: latest.field2
                ? Number(latest.field2).toFixed(3)
                : "--",

              inlet: latest.field3
                ? Number(latest.field3).toFixed(3)
                : "--",

              outlet: latest.field4
                ? Number(latest.field4).toFixed(3)
                : "--",
            });
          }
        }

      } catch (error) {

        console.log(error);
      }
    };

    fetchData();

    const interval =
      setInterval(fetchData, 15000);

    return () => clearInterval(interval);

  }, []);

  // FLOW VALUES

  const inlet =
    Number(latestData.inlet || 0);

  const outlet =
    Number(latestData.outlet || 0);

  const waterLoss =
    (inlet - outlet).toFixed(3);

  // ESP32 CONNECTION STATUS

  const latestFeed =
    feeds.length > 0
      ? feeds[feeds.length - 1]
      : null;

  let esp32Connected = false;

  if (latestFeed) {

    const lastUpdate =
      new Date(latestFeed.created_at);

    const currentTime =
      new Date();

    const difference =
      (currentTime - lastUpdate) / 1000;

    esp32Connected =
      difference < 60;
  }

  // LEAKAGE DETECTION ONLY IF ONLINE

  const leakage =
    esp32Connected &&
    waterLoss > 2;

  // FLOW GRAPH DATA

  const flowChartData = feeds.map((feed) => ({

    time: new Date(feed.created_at)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

    inlet: Number(feed.field3 || 0),

    outlet: Number(feed.field4 || 0),

  }));

  // TURBIDITY GRAPH DATA

  const turbidityData = feeds.map((feed) => ({

    time: new Date(feed.created_at)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

    turbidity: Number(feed.field1 || 0),

  }));

  // TDS GRAPH DATA

  const tdsData = feeds.map((feed) => ({

    time: new Date(feed.created_at)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

    tds: Number(feed.field2 || 0),

  }));

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="text-5xl font-bold text-slate-800">
              Smart Water Monitoring System
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Real-time cloud monitoring using ESP32 and ThingSpeak
            </p>

          </div>

          <div className="mt-4 md:mt-0">

            <div
              className={`px-6 py-3 rounded-2xl font-bold shadow-lg ${
                esp32Connected
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {esp32Connected
                ? "ESP32 Connected"
                : "ESP32 Disconnected"}
            </div>

          </div>

        </div>

        {/* LEAKAGE ALERT */}

        {leakage && (

          <div className="bg-red-100 border border-red-300 text-red-700 rounded-3xl p-6 mb-6 shadow-lg animate-pulse">

            <h2 className="text-3xl font-bold">
              ⚠ Water Leakage Detected!
            </h2>

            <p className="mt-2 text-lg">
              High difference detected between inlet and outlet flow.
            </p>

          </div>
        )}

        {/* SENSOR CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-semibold text-slate-500">
              Turbidity
            </h2>

            <p className="text-5xl font-bold text-green-600 mt-4">
              {latestData.turbidity}
            </p>

            <p className="text-slate-400 mt-3">
              NTU
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-semibold text-slate-500">
              TDS
            </h2>

            <p className="text-5xl font-bold text-blue-600 mt-4">
              {latestData.tds}
            </p>

            <p className="text-slate-400 mt-3">
              ppm
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-semibold text-slate-500">
              Inlet Flow
            </h2>

            <p className="text-5xl font-bold text-cyan-600 mt-4">
              {latestData.inlet}
            </p>

            <p className="text-slate-400 mt-3">
              L/min
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-semibold text-slate-500">
              Outlet Flow
            </h2>

            <p className="text-5xl font-bold text-indigo-600 mt-4">
              {latestData.outlet}
            </p>

            <p className="text-slate-400 mt-3">
              L/min
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-semibold text-slate-500">
              Water Loss
            </h2>

            <p className="text-5xl font-bold text-red-600 mt-4">
              {waterLoss}
            </p>

            <p className="text-slate-400 mt-3">
              L/min
            </p>

          </div>

        </div>

        {/* SECOND SECTION */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* SOLENOID STATUS */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-3xl font-bold text-slate-700 mb-4">
              Solenoid Valve Status
            </h2>

            <div className="flex items-center justify-between">

              <span className="text-xl text-slate-600">
                Automatic Protection
              </span>

              <span
                className={`text-3xl font-bold ${
                  leakage
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {leakage ? "CLOSED" : "OPEN"}
              </span>

            </div>

          </div>

          {/* SYSTEM INFORMATION */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-3xl font-bold text-slate-700 mb-4">
              System Information
            </h2>

            <div className="space-y-4 text-slate-600">

              <div className="flex justify-between border-b pb-2">
                <span>Controller</span>
                <span>ESP32 Dev Module</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Cloud Platform</span>
                <span>ThingSpeak</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Leakage Detection</span>

                <span
                  className={
                    esp32Connected
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {esp32Connected
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Cloud Status</span>

                <span
                  className={
                    esp32Connected
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {esp32Connected
                    ? "Online"
                    : "Offline"}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* FLOW HISTORY */}

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">

          <h2 className="text-3xl font-bold text-slate-700 mb-6">
            Flow Rate History
          </h2>

          <div style={{ width: "100%", height: 400 }}>

            <ResponsiveContainer>

              <LineChart data={flowChartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="time" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="inlet"
                  stroke="#2563eb"
                  strokeWidth={4}
                />

                <Line
                  type="monotone"
                  dataKey="outlet"
                  stroke="#16a34a"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* WATER QUALITY HISTORY */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* TURBIDITY HISTORY */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-3xl font-bold text-slate-700 mb-6">
              Turbidity History
            </h2>

            <div style={{ width: "100%", height: 300 }}>

              <ResponsiveContainer>

                <LineChart data={turbidityData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="time" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="turbidity"
                    stroke="#16a34a"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* TDS HISTORY */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-3xl font-bold text-slate-700 mb-6">
              TDS History
            </h2>

            <div style={{ width: "100%", height: 300 }}>

              <ResponsiveContainer>

                <LineChart data={tdsData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="time" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="tds"
                    stroke="#2563eb"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}