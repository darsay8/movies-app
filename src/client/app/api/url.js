const ROOT_URL = 'https://api.themoviedb.org/3'
const IMAGE_URL = 'https://image.tmdb.org/t/p/'
const API_KEY = process.env.TMDB_API_KEY

const defaultQuery = {
  api_key: API_KEY,
  language: 'en-US',
}

const queryString = (obj) => {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join('&')
}

export const getPopularMoviesUrl = (page) =>
  `${ROOT_URL}/movie/popular?${queryString({ ...defaultQuery, ...page })}`

export const getTopRatedMoviesUrl = (page) =>
  `${ROOT_URL}/discover/movie?${queryString({
    ...defaultQuery,
    ...{ sort_by: 'vote_count.desc' },
    ...page,
  })}`

export const getMustWatchMoviesUrl = (page) =>
  `${ROOT_URL}/discover/movie?${queryString({
    ...defaultQuery,
    ...{ sort_by: 'revenue.desc' },
    ...page,
  })}`

export const getUpcomingMoviesUrl = (page) =>
  `${ROOT_URL}/movie/upcoming?${queryString({ ...defaultQuery, ...page })}`

export const getMovieDetailUrl = (id) =>
  `${ROOT_URL}/movie/${id}?${queryString(defaultQuery)}`

export const getMovieCreditUrl = (id) =>
  `${ROOT_URL}/movie/${id}/credits?${queryString(defaultQuery)}`

export const getMovieImageUrl = (id) =>
  `${ROOT_URL}/movie/${id}/images?${queryString({ api_key: API_KEY })}`

export const getMovieVideoUrl = (id) =>
  `${ROOT_URL}/movie/${id}/videos?${queryString({ api_key: API_KEY })}`

export const getMovieRecommendationsUrl = (id) =>
  `${ROOT_URL}/movie/${id}/recommendations?${queryString(defaultQuery)}`

export const getSearchMovieUrl = (keyword) =>
  `${ROOT_URL}/search/movie?${queryString({
    ...defaultQuery,
    ...{ query: keyword },
  })}`

export const getImageUrl = (path, width = 'w500') => {
  return `${IMAGE_URL}${width}${path}`
}

// export const getImageUrl = (path, key = "uri", width = "w500") => {
//   return { [key]: `${IMAGE_URL}${width}${path}` };
// };
