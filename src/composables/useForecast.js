export function useForecast() {
  const apiKey = "531fd3fdf9484783a4590543232610"
  const getForecast = async (cityName) => {
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&aqi=nor&days=5&lang=en`
    const response = await fetch(apiUrl)

    return  await response.json()
  }
  return { getForecast };
}

export default useForecast
