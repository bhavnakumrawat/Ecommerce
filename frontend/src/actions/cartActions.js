import axios from 'axios'


export const addToCart = (id, qty,cart_id) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  const { data } = await axios.get(`/api/products/add-to-cart/${id}?qty=${qty}&cart_id=${cart_id}`,config)

  const cart_data = data.cart?data.cart:null
  
  dispatch({
    type: 'CART_ADD_ITEM',
    payload: cart_data
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const getCart = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  const { data } = await axios.get(`/api/products/get-cart`,config)
  const cart_data = data.cart?data.cart:null
  

  dispatch({
    type: 'CART_ADD_ITEM',
    payload: cart_data
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  
  const {
    userLogin: { userInfo },
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  const { data } = await axios.delete(`/api/products/remove-cart/${id}`,config)
  dispatch({
    type: 'CART_REMOVE_ITEM',
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  
  dispatch({
    type: 'CART_SAVE_SHIPPING_ADDRESS',
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: 'CART_SAVE_PAYMENT_METHOD',
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
