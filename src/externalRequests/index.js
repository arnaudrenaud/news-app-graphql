import fetch from 'node-fetch';

// eslint-disable-next-line import/prefer-default-export
export const getWeather = async ip => {
  const res = await fetch(`https://ipapi.co/${ip}/json`);
  const location = await res.json();
  const { city } = location;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`;
  const data = await (await fetch(url)).json();
  const temperature = data.main.temp;
  return { temperature: Math.round(temperature), city };
};
