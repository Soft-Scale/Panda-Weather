export function useCurrentIp() {

  async function getCurrentIp() {
    try {
      const response = await fetch('https://freeipapi.com/api/json');
      const data = await response.json();
      return data.cityName;
    } catch (error) {
      console.error('Error fetching current IP:', error);
      return null;
    }
  }

  return { getCurrentIp };
}

export default useCurrentIp
