import { Coords } from '../types/Coords';

const API_KEY = process.env.REACT_APP_LOCATION_API_KEY;
const API_URL = `https://api.openweathermap.org/geo/1.0`;

function locationRequest<T>(
  location: string | Coords,
): Promise<T> {
  const END_POINT = typeof location === 'string'
    ? `/direct?q=${location}`
    : `/reverse?lat=${location.lat}&lon=${location.lon}`;

  return fetch(`${API_URL}${END_POINT}&appid=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const locationClient = {
  get: <T>(location: string | Coords) => locationRequest<T>(location),
};
