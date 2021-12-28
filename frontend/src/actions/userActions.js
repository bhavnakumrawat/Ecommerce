import axios from 'axios'


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_LOGIN_REQUEST',
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )
    console.log("data.wishlist : ",data.wishlist)
    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: {data:data,wishlist:data.wishlist},
    })
    
    // dispatch({
    //   type: 'USER_WISHLIST',
    //   payload: data.wishlist,
    // })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: 'USER_LOGOUT' })
  dispatch({ type: 'USER_DETAILS_RESET' })
  dispatch({ type: 'ORDER_LIST_MY_RESET' })
  dispatch({ type: 'USER_LIST_RESET' })
  document.location.href = '/login'
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_REGISTER_REQUEST',
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/signup',
      { name, email, password },
      config
    )

    dispatch({
      type: 'USER_REGISTER_SUCCESS',
      payload: data,
    })

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: 'USER_REGISTER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'USER_DETAILS_REQUEST',
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/users/profile`, config)
  
      dispatch({
        type: 'USER_DETAILS_SUCCESS',
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: 'USER_DETAILS_FAIL',
        payload: message,
      })
    }
  }
  export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'USER_UPDATE_PROFILE_REQUEST',
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(`/api/users/profile`, user, config)
  
      dispatch({
        type: 'USER_UPDATE_PROFILE_SUCCESS',
        payload: data,
      })
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: data,
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: 'USER_UPDATE_PROFILE_FAIL',
        payload: message,
      })
    }
  }
  export const listUsers = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'USER_LIST_REQUEST',
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/users/users`, config)
  
      dispatch({
        type: 'USER_LIST_SUCCESS',
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: 'USER_LIST_FAIL',
        payload: message,
      })
    }
  }
export const addToWishList = (productId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: 'WISHLIST_CREATE_REQUEST',
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.get(`/api/users/wishlist/${productId}`, config)

    dispatch({
      type: 'WISHLIST_CREATE_SUCCESS',
      payload:productId
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: 'WISHLIST_CREATE_FAIL',
      payload: message,
    })
  }
}

export const getMyWishlist = () => async (
  dispatch,
  getState
) => {

  try {

    dispatch({
      type: 'WISHLIST_GET_REQUEST',
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.get(`/api/users/user-wishlist`, config)
    
    console.log("data : ",data[0])

    dispatch({
      type: 'WISHLIST_GET_SUCCESS',
      payload:data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: 'WISHLIST_GET_FAIL',
      payload: message,
    })
  }
}
export const removeToWishList = (productId) => async (
  dispatch,
  getState
) => {

  try {

    dispatch({
      type: 'WISHLIST_REMOVE_REQUEST',
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.delete(`/api/users/wishlist/${productId}`, config)
    
    console.log("data : ",productId)

    dispatch({
      type: 'WISHLIST_REMOVE_SUCCESS',
      payload: productId
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: 'WISHLIST_REMOVE_FAIL',
      payload: message,
    })
  }
}