export interface WeatherLocation {
  lat: number,
  lon: number,
  place: string,
}

export interface WeatherDataTemplate {
  id: number | string,
  date: {
    fulldate: string,
    day: string,
    weekday: string,
    month: string,
    time?: string,
  },
  weather: {
    icon: string,
    type: string,
    temp: number,
    max: number,
    min: number,
    precipitation: number,
    pressure: number,
    humidity: number,
    wind: number,
  }
}

export interface PreparedWeatherData {
  location: WeatherLocation,
  current: WeatherDataTemplate,
  daily: WeatherDataTemplate[],
  hourly: WeatherDataTemplate[],
  [key: string]: any,
}

