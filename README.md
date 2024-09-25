# Weather App Project

## Overview
This project is a web-based weather application that provides real-time weather information based on the user's location. The application features a modern, visually stunning user interface with an old video game 8-bit feel and includes snarky comments about the weather.

## Recent Changes and Improvements

### Iteration 1
- Set up the project directory and initialized a React application with Chakra UI.
- Developed the initial user interface with 8-bit styling and placeholders for snarky comments.
- Created a FastAPI backend to handle weather data requests.
- Deployed the backend and frontend to their respective platforms.

### Iteration 2
- Implemented real-time weather data fetching using the OpenWeatherMap API.
- Added the OpenWeatherMap API key to the environment variables for secure access.
- Updated the frontend to fetch and display real-time weather data from the backend.
- Implemented error handling for geolocation and API failures.
- Added state management for loading, weather data, forecast data, and error handling.
- Implemented a fallback location method using IP-API for obtaining the user's location by IP.
- Successfully integrated real-time weather data fetching from the backend.

## Next Steps
- Define a complete user flow for the application, covering from initial page load to displaying weather information.
- Add a forecast feature to the application, including displaying forecast data on the frontend.
- Enhance the user interface with 8-bit graphics and animations for a cohesive and visually appealing aesthetic.

## How to Run
1. Start the backend server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```
2. Start the frontend development server:
   ```bash
   npm start
   ```
3. Access the application in your browser at `http://localhost:3000`.

## Deployment
- The backend is deployed at: `https://weather-backend-byraxiut.fly.dev/`
- The frontend is deployed at: `https://endearing-parfait-2fbd36.netlify.app`

## Notes
- Ensure the OpenWeatherMap API key is set in the environment variables for the backend to function correctly.
- The application currently uses mock data for testing purposes. Real-time data fetching will be fully functional once the API key is correctly set.
