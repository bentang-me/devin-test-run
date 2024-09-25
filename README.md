# devin-test-run

This project is a web-based weather application that provides real-time weather information based on the user's location. The application features a modern, visually stunning user interface with an old video game 8-bit feel and includes snarky comments about the weather.

## Project Structure
- **weather-app**: Frontend React application using Chakra UI.
- **weather_backend**: Backend FastAPI application handling weather data requests.

## Setup Instructions
1. **Backend**: Navigate to `weather_backend` and run:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```
2. **Frontend**: Navigate to `weather-app` and run:
   ```bash
   npm start
   ```
3. Access the application at `http://localhost:3000`.

## Deployment
- Backend: `https://weather-backend-byraxiut.fly.dev/`
- Frontend: `https://endearing-parfait-2fbd36.netlify.app`
