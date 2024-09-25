import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  CSSReset,
  Box,
  Flex,
  Text,
  Heading,
  VStack
} from "@chakra-ui/react";
import { customTheme } from "./theme";

// Mock weather data (replace with API call later)
const mockWeather = {
  temperature: 72,
  condition: "Sunny",
  location: "Pixelville"
};

// Snarky comments based on weather conditions
const snarkyComments = {
  Sunny: "Perfect weather for pretending you're a vampire!",
  Rainy: "Time to practice your couch potato skills!",
  Cloudy: "Gray skies are just clouds practicing their shadow puppetry.",
  Snowy: "Snowmen are just frozen water introverts.",
  default: "Weather: It's happening!"
};

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const backendUrl = "https://weather-backend-byraxiut.fly.dev";
        const weatherUrl = `${backendUrl}/weather?lat=${latitude}&lon=${longitude}`;
        const forecastUrl = `${backendUrl}/forecast?lat=${latitude}&lon=${longitude}`;
        console.log("Fetching weather data from:", weatherUrl);
        console.log("Fetching forecast data from:", forecastUrl);

        const [weatherResponse, forecastResponse] = await Promise.all([
          fetch(weatherUrl),
          fetch(forecastUrl)
        ]);

        if (!weatherResponse.ok || !forecastResponse.ok) {
          throw new Error('Failed to fetch weather or forecast data');
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        console.log("Received weather data:", weatherData);
        console.log("Received forecast data:", forecastData);

        setWeather({
          temperature: weatherData.temperature,
          condition: weatherData.condition,
          location: weatherData.location
        });

        setForecast(forecastData.forecast.slice(0, 3).map(item => ({
          day: new Date(item.day).toLocaleDateString('en-US', { weekday: 'long' }),
          temp: item.temp,
          condition: item.condition
        })));
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please try again.");
        throw error;
      }
    };

    const fetchLocationByIP = async () => {
      try {
        console.log("Fetching location by IP");
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        const data = await response.json();
        console.log("Received location data:", data);
        return { latitude: data.latitude, longitude: data.longitude };
      } catch (error) {
        console.error("Error fetching location by IP:", error);
        throw error;
      }
    };

    const getLocationAndFetchWeather = async () => {
      try {
        if ("geolocation" in navigator) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 10000,
              maximumAge: 0,
              enableHighAccuracy: true
            });
          });
          const { latitude, longitude } = position.coords;
          console.log("Got geolocation:", latitude, longitude);
          await fetchWeatherData(latitude, longitude);
        } else {
          throw new Error("Geolocation not supported");
        }
      } catch (geoError) {
        console.error("Geolocation failed:", geoError);
        try {
          const { latitude, longitude } = await fetchLocationByIP();
          await fetchWeatherData(latitude, longitude);
        } catch (ipError) {
          console.error("IP geolocation failed:", ipError);
          console.log("Using default location: New York City");
          await fetchWeatherData(40.7128, -74.0060);
          setError("Unable to determine your location. Showing weather for New York City.");
          setWeather(prevState => ({...prevState, location: "New York City (Default)"}));
          console.log("Default location (New York City) is being used due to geolocation and IP-based location failures.");
        }
      } finally {
        setLoading(false);
      }
    };

    getLocationAndFetchWeather();
  }, []);

  const getSnarkyComment = (condition) => {
    return snarkyComments[condition] || snarkyComments.default;
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      Sunny: "☀️",
      Rainy: "🌧️",
      Cloudy: "☁️",
      Snowy: "❄️",
      default: "🌈"
    };
    return icons[condition] || icons.default;
  };

  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <Box
        maxWidth={400}
        p={4}
        borderRadius={4}
        borderWidth={4}
        borderStyle="solid"
        borderColor="gray.700"
        m="auto"
        my={4}
        bg="gray.800"
        color="green.400"
        fontFamily="'Press Start 2P', cursive"
        boxShadow="0 0 10px #00ff00"
      >
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" textShadow="2px 2px #000">
            8-Bit Weather
          </Heading>
          {loading ? (
            <Text textAlign="center">Loading weather data...</Text>
          ) : (
            <>
              <Flex justify="space-between" align="center">
                <Text>Location:</Text>
                <Text>{weather.location}</Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text>Temperature:</Text>
                <Text>{weather.temperature}°F</Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text>Condition:</Text>
                <Flex align="center">
                  <Text mr={2}>{weather.condition}</Text>
                  <Text fontSize="2xl">{getWeatherIcon(weather.condition)}</Text>
                </Flex>
              </Flex>
              <Box
                mt={4}
                p={2}
                borderWidth={2}
                borderStyle="dashed"
                borderColor="yellow.400"
                bg="rgba(0,0,0,0.3)"
              >
                <Text fontSize="sm" color="yellow.400" textShadow="1px 1px #000">
                  {getSnarkyComment(weather.condition)}
                </Text>
              </Box>
            </>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
