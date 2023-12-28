export function useUnsplash() {
  const unsplashKey = "mmGVXbWPeCO45y17EER07X3S3_xGaY8p-cDMwi0b47U"
  const perPage = 1
  const getImage = async (query) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&orientation=landscape&h=400&fit=max`,
        {
          headers: {
            Authorization: `Client-ID ${unsplashKey}`
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error("Помилка при запиті до Unsplash API:", error)
      throw error
    }
  }

  return { getImage }
}


export default useUnsplash


