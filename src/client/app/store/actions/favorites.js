import { axiosWithToken } from '../../api/api'
import { prepareFavs } from '../../utils/prepareFavs'
import { types } from '../types/types'
import Swal from 'sweetalert2'

export const addFavorite = favorite => async (dispatch, getState) => {
  dispatch(favoriteAddNew())
  const { uid, name } = getState().auth

  try {
    const res = await axiosWithToken('favorites/new', favorite, 'POST')
    const body = await res.data

    if (body.ok) {
      favorite.id = body.favorite.id
      favorite.user = {
        _id: uid,
        name: name,
      }
      dispatch(favoriteAddNewSuccess(favorite))
      Swal.fire({
        title: false,
        text: 'Item added to favorites',
        icon: 'success',
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      })
    }
  } catch (err) {
    dispatch(favoriteAddNewFailed(err.response.data))
    Swal.fire({
      title: false,
      text: getErrors(err.response.data),
      icon: 'warning',
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    })
  }
}

export const getFavoriteList = () => async dispatch => {
  dispatch(getFavorites())
  try {
    const res = await axiosWithToken('favorites')
    const body = await res.data
    const favorites = prepareFavs(body.favorites)
    dispatch(getFavoriteSuccess(favorites))
  } catch (err) {
    console.log(err)
    getFavoriteFail(err)
  }
}

export const deleteFavorite = id => async (dispatch, getState) => {
  const confirm = await Swal.fire({
    title: 'Delete Item',
    text: 'Do you want to delete this favorite?',
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Yes, Delete It',
    reverseButtons: true,
  }).then(({ isConfirmed }) => isConfirmed)

  if (confirm) {
    dispatch(favoriteDelete())
    try {
      const res = await axiosWithToken(`favorites/${id}`, {}, 'DELETE')
      const body = await res.data
      if (body.ok) {
        dispatch(favoriteDeleteSuccess(id))
      }
    } catch (err) {
      dispatch(favoriteDeleteFailed(err.response.data))
    }
  }
}

const favoriteAddNew = () => ({
  type: types.favoriteAddNew,
})

const favoriteAddNewSuccess = e => ({
  type: types.favoriteAddNewSuccess,
  payload: e,
})

const favoriteAddNewFailed = err => ({
  type: types.favoriteAddNewFailed,
  payload: { err },
})

const getFavorites = () => ({
  type: types.favoriteRequestLoading,
})

const getFavoriteSuccess = favorites => ({
  type: types.favoriteRequestSuccess,
  payload: favorites,
})

const getFavoriteFail = err => ({
  type: types.favoriteRequestFailed,
  payload: { err },
})

const favoriteDelete = () => ({
  type: types.favoriteDelete,
})
const favoriteDeleteSuccess = id => ({
  type: types.favoriteDeleteSuccess,
  payload: id,
})
const favoriteDeleteFailed = err => ({
  type: types.favoriteDeleteFailed,
  payload: { err },
})

const getErrors = body => {
  return body.errors ? Object.values(body.errors)[0].msg : body.msg
}
