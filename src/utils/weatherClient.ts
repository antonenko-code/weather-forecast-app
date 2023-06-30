const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = `https://api.openweathermap.org/data/2.5/onecall?exclude=minutely&units=metric&appid=${API_KEY}`;

function weatherRequest<T>(
  lat: number,
  lon: number,
): Promise<T> {
  return fetch(`${API_URL}&lat=${lat}&lon=${lon}`)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const weatherClient = {
  get: <T>(lat: number, lon: number) => weatherRequest<T>(lat, lon),
};
