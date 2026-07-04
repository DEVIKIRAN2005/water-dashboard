# 💧 Water Leakage Monitoring System (IoT + ThingSpeak + Web Dashboard)

A real-time IoT-based water leakage monitoring system that uses an **ESP8266/ESP32 microcontroller** to collect sensor data and send it to the **ThingSpeak cloud platform**, where it is visualized and accessed by a **React-based web dashboard**.

---

## 📌 Project Overview

This project is a complete **IoT + Cloud + Web integration system** designed to monitor water usage and detect potential leakage conditions.

It demonstrates:
- Embedded systems data acquisition
- IoT communication using WiFi
- Cloud data logging using ThingSpeak
- Real-time web visualization using React

---

## 🌐 System Architecture
Sensors → ESP8266 / ESP32 → ThingSpeak Cloud → React Dashboard


### Workflow:
1. Water flow sensor collects real-time usage data  
2. ESP8266/ESP32 processes sensor readings  
3. Data is sent to ThingSpeak using HTTP API  
4. ThingSpeak stores and visualizes cloud data  
5. React dashboard fetches and displays insights  

---

## 🔌 IoT Hardware Layer

### Components Used:
- ESP8266 / ESP32 Microcontroller  
- Water Flow Sensor  
- Power supply unit  
- Connecting wires and prototype setup  

### Functionality:
- Measures real-time water flow
- Detects abnormal usage patterns (leakage conditions)
- Sends data to cloud platform via WiFi

---

## ☁️ Cloud Integration (ThingSpeak)

ThingSpeak is used as the IoT cloud platform for data storage and visualization.

### Features:
- Real-time sensor data streaming
- Cloud-based data logging
- Graphical visualization of water usage
- REST API support for external applications

### Data Flow:
ESP → HTTP Request → ThingSpeak Channel → Stored Data → API Access

---

## 💻 Web Dashboard (React + Vite)

### Frontend Stack:
- React.js
- Vite
- JavaScript (ES6+)
- CSS3

### Features:
- Live water usage monitoring dashboard
- Visualization of leakage patterns
- Clean and responsive UI
- Fetches data from ThingSpeak API

---

## 📁 Project Structure
water-dashboard/
│
├── public/
│ ├── favicon.svg
│ ├── icons.svg
│
├── src/
│ ├── assets/
│ │ ├── hero.png
│ │ ├── react.svg
│ │ └── vite.svg
│ │
│ ├── App.jsx
│ ├── App.css
│ ├── main.jsx
│ └── index.css
│
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md

---

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/DEVIKIRAN2005/water-dashboard.git
cd water-dashboard

###2. Install Dependencies
```bash
npm install
3. Run Development Server
```bash
npm run dev


📊 Key Features
-Real-time IoT sensor data acquisition
-Cloud storage using ThingSpeak
-Live dashboard visualization
-Leakage detection based on flow patterns
-Web-based monitoring system


🧠 Learning Outcomes
This project helped in understanding:
-IoT system design and architecture
-ESP8266/ESP32 programming concepts
-Cloud communication using HTTP APIs
-ThingSpeak IoT platform integration
-React-based dashboard development
-End-to-end embedded + web system integration


🚀 Future Improvements
-Firebase or MQTT-based real-time streaming
-AI-based water usage prediction
-SMS/Email alert system for leakage detection
-Mobile application integration
-Deployment on Vercel/Netlify


👨‍💻 Author
K Devikiran A Hegde

📌 Project Summary

This project is a working IoT-based water monitoring system where sensor data is collected using ESP8266/ESP32, sent to ThingSpeak cloud, and visualized through a React dashboard.



