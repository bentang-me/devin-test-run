from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import os

app = FastAPI()

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.get("/forecast")
async def get_forecast(lat: float, lon: float):
    api_key = os.getenv("OPENWEATHERMAP_API_KEY")
    url = f"http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key}&units=imperial"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        forecast_data = [
            {
                "day": item["dt_txt"],
                "temp": item["main"]["temp"],
                "condition": item["weather"][0]["main"]
            }
            for item in data["list"]
        ]
        return {"forecast": forecast_data}
    else:
        return {"error": "Failed to fetch forecast data"}
