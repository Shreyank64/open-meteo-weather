# Open Meteo Weather App 🌦️ (Work in Progress)

A **React + Vite** weather application that displays real-time weather data using **Open-Meteo** and **Geoapify** APIs.  
Built with **MUI** and **Tailwind CSS** for a clean, responsive UI.

> ⚠️ **Status:** This project is actively under development.  
> Features, structure, and UI are subject to change.

---

## ✨ Current Features

### 🌍 Location & Search
- Use **GPS (browser geolocation)** to fetch current location weather
- **City search with autocomplete** using Geoapify
- Reverse geocoding to display human-readable location names

### 🌤️ Weather Data (Open-Meteo)
- Current temperature
- Weather condition codes with icon + label mapping
- Wind speed
- Daily max/min temperatures
- Hourly data (temperature, precipitation probability, weather codes)

### 🌫️ Air Quality (In Progress)
- AQI data fetched from Open-Meteo Air Quality API
- Indian AQI calculation logic implemented:
  - PM2.5 → IAQI
  - PM10 → IAQI
  - Final AQI = max(PM2.5, PM10)
- UI integration **not completed yet**

### 🎨 UI / UX
- Responsive mobile-first layout
- MUI components + Tailwind styling
- Dynamic weather icons and gradients
- Loading and error states handled

### 🧪 Testing
- Unit tests written using **Vitest**
- API functions tested with mocked `fetch`

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite
- **UI:** MUI (Material UI), Tailwind CSS
- **APIs:**
  - Open-Meteo (Weather & Air Quality)
  - Geoapify (Geocoding & Autocomplete)
- **Testing:** Vitest
- **Language:** JavaScript (ES6+)

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

