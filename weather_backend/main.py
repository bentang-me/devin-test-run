from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to the Weather Backend API"}

@app.get("/weather/{city}")
async def get_weather(city: str):
    return {"city": city, "temperature": "22°C", "condition": "Sunny"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
