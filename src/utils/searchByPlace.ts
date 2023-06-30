import { WeatherService } from '../services/WeatherService';
import { locationClient } from './locationClient';
import { Location } from '../types/Location';
import { Coords } from '../types/Coords';

export const searchByPlace = async (value: string | Coords) => {
  const [{ name, lat, lon, country }] = await locationClient.get<Location[]>(value);
  const weather = await WeatherService.getCurrentWeather(lat, lon)

  return {
    ...weather,
    location: {
      place:`${name}, ${country}`,
      lat,
      lon,
    }
  }
}
