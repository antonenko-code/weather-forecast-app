import { weatherClient } from '../utils/weatherClient';
import { PreparedWeatherData } from '../types/PreparedWeatherData';
import { FetchWeatherData } from '../types/FetchWeatherData';
import { v1 as uuidv1 } from 'uuid';
import { getDate } from '../utils/getDate';




export class WeatherService {
  static getCurrentWeather(lat: number, lon: number): Promise<PreparedWeatherData> {
    return weatherClient.get<FetchWeatherData>(lat, lon)
      .then(data => {
        return {
          location: {
            lat: data.lat,
            lon: data.lon,
            place: data.timezone,
          },
          current: {
            id: uuidv1(),
            date: {
              fulldate: new Date(data.current.dt * 1000).toDateString(),
              day: getDate(data.current.dt, {day: 'numeric'}),
              weekday: getDate(data.current.dt, {weekday: 'long'}),
              month: getDate(data.current.dt, {month: 'long'}),
            },
            weather: {
              icon: `i${data.current.weather[0].icon}`,
              type: data.current.weather[0].main,
              temp: Math.round(data.current.temp),
              max: Math.round(data.daily[0].temp.max),
              min: Math.round(data.daily[0].temp.min),
              precipitation: Number((data.daily[0].pop * 100).toFixed()),
              pressure: data.current.pressure,
              humidity: data.current.humidity,
              wind: data.current.wind_speed,
            }
          },
          daily: data.daily.map((day, index) => ({
            id: uuidv1(),
            date: {
              fulldate: new Date(day.dt * 1000).toDateString(),
              day: getDate(day.dt, {day: 'numeric'}),
              weekday: getDate(day.dt, {weekday: 'long'}),
              month: getDate(day.dt, {month: 'long'}),
            },
            weather: {
              icon: index > 0 ? `i${day.weather[0].icon}` : `i${data.current.weather[0].icon}`,
              type: index > 0 ? day.weather[0].main : data.current.weather[0].main,
              temp: index > 0 ? Math.round(day.temp.day) : Math.round(data.current.temp),
              max: Math.round(day.temp.max),
              min: Math.round(day.temp.min),
              precipitation: Number((day.pop * 100).toFixed()),
              pressure: day.pressure,
              humidity: day.humidity,
              wind: day.wind_speed,
            }
          })),
          hourly: data.hourly.slice(0, 24).map((hour) => ({
            id: uuidv1(),
            date: {
              fulldate: new Date(hour.dt * 1000).toDateString(),
              day: getDate(hour.dt, {day: 'numeric'}),
              weekday: getDate(hour.dt, {weekday: 'long'}),
              month: getDate(hour.dt, {month: 'long'}),
              time: getDate(hour.dt, {hour: '2-digit'})
            },
            weather: {
              icon: `i${hour.weather[0].icon}`,
              type: hour.weather[0].main,
              temp: Math.round(hour.temp),
              max: Math.round(data.daily[0].temp.max),
              min: Math.round(data.daily[0].temp.min),
              precipitation: Number((hour.pop * 100).toFixed()),
              pressure: hour.pressure,
              humidity: hour.humidity,
              wind: hour.wind_speed,
            }
          })),
        }
      })
  }
}
