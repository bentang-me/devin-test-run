from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv
import random

load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

@app.get("/weather")
async def get_weather(lat: float, lon: float):
    params = {
        "lat": lat,
        "lon": lon,
        "appid": OPENWEATHER_API_KEY,
        "units": "metric"  # Use metric units for temperature
    }

    # Debug print statement to log the API key being used
    print(f"Using API key: {OPENWEATHER_API_KEY}")
    print(f"Full request URL: {OPENWEATHER_BASE_URL}?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric")

    async with httpx.AsyncClient() as client:
        response = await client.get(OPENWEATHER_BASE_URL, params=params)

    if response.status_code != 200:
        print(f"Error response: {response.text}")
        raise HTTPException(status_code=response.status_code, detail=f"Failed to fetch weather data: {response.text}")

    weather_data = response.json()

    return {
        "temperature": round(weather_data["main"]["temp"]),
        "condition": weather_data["weather"][0]["main"],
        "location": weather_data["name"]
    }

@app.get("/")
async def root():
    return {"message": "Welcome to the Weather API"}
