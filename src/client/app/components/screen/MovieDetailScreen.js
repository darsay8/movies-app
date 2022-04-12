import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import moment from 'moment'

import { requestMovieDetailScreen } from '../../api/api'
import { getImageUrl } from '../../api/url'
import { Children } from 'react/cjs/react.production.min'
import lib from 'react-slick/lib'
import {
  getTime,
  movieCompanies,
  movieDirector,
  movieLogo,
  movieTrailer,
  movieWriters,
} from '../../utils/movieUtils'

const MovieDetailScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [state, setState] = useState({
    movieData: {},
    credit: {},
    images: {},
    videos: {},
    recommendations: {},
    isLoaded: false,
  })

  useEffect(() => {
    requestMovieDetailScreen(id, callbackRequest)
  }, [])

  const callbackRequest = (response) => {
    const [movieData, credit, images, videos, recommendations] = response
    setState({
      movieData,
      credit,
      images,
      videos,
      recommendations,
      isLoaded: true,
    })
  }

  const { movieData, credit, isLoaded, images, videos, recommendations } = state

  const backdropImage = getImageUrl(movieData.backdrop_path, 'original')
  const posterImage = getImageUrl(movieData.poster_path, 'w300')
  const movieCompaniesInfo = movieCompanies(movieData)
  const director = movieDirector(credit)
  const writers = movieWriters(credit)

  if (!movieData) {
    return <Navigate to="/" />
  }

  const bgImage = {
    backgroundImage: `url(${backdropImage})`,
  }

  const animationConfiguration = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <motion.div
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.5 }}
    >
      <div style={{ height: '100vh' }}>
        {!isLoaded ? (
          <div>Loading...</div>
        ) : (
          <div className="movie__detail">
            <h1>{movieData.title}</h1>
            <h3>{movieData.tagline}</h3>
            <div
              className="movie__detail__image"
              style={{ width: '300px', height: '400px' }}
            >
              <img
                src={posterImage}
                alt={movieData.original_title}
                style={{ width: '100%', height: '100%' }}
              />

              <div className="movie__detail__video">
                <iframe
                  width="853"
                  height="480"
                  src={movieTrailer(videos)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
              <div>
                <p>DIRECTED BY: {director}</p>
              </div>
              <div>
                <p>Writers: {writers}</p>
              </div>
              <div>
                <img src={movieLogo(images)} alt="" width={200} />
              </div>
              <div>
                <a href={movieData.homepage}>Homepage: {movieData.homepage}</a>
              </div>

              <div>
                <p>Description: {movieData.overview}</p>
              </div>
              <div>
                <p>
                  Released:{' '}
                  {movieData.release_date
                    ? moment(movieData.release_date).format('LL')
                    : 'N/A'}
                </p>
              </div>
              <div>
                <p>Vote Average:{movieData.vote_average}</p>
              </div>

              <div>
                <p>Duration: {getTime(movieData.runtime)}</p>
              </div>

              <div>
                <p>Cast:</p>
                {credit.cast.slice(0, 3).map((e) => (
                  <li key={e.id}>
                    {e.name} <br />
                    <small>{e.character}</small>
                  </li>
                ))}
              </div>

              <div>
                <p>Genres:</p>
                {movieData.genres.slice(0, 4).map((e) => (
                  <li key={e.id}>
                    {e.name} <br />
                  </li>
                ))}
              </div>

              <div>
                <p>Companies:</p>
                {movieCompaniesInfo.map((e) => (
                  <li key={e.id}>
                    <img src={getImageUrl(e.logo_path, 'w300')} alt={e.name} />
                  </li>
                ))}
              </div>

              {/* <img src={backdropImage} alt={movieData.original_title} /> */}
            </div>
            <div className="movie__detail__bg" style={bgImage}></div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default MovieDetailScreen
