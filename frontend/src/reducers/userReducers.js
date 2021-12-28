

export const userLoginReducer = (state = {userwishlist:[]}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { loading: true }
    case 'USER_LOGIN_SUCCESS':
      return { loading: false, userInfo: action.payload.data,userwishlist:action.payload.wishlist }
    case 'USER_WISHLIST':
        return { userwishlist:action.payload.data, }
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload }
    case 'USER_LOGOUT':
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_REGISTER_REQUEST':
      return { loading: true }
    case 'USER_REGISTER_SUCCESS':
      return { loading: false, userInfo: action.payload }
    case 'USER_REGISTER_FAIL':
      return { loading: false, error: action.payload }
    case 'USER_LOGOUT':
      return {}
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case 'USER_DETAILS_REQUEST':
      return { ...state, loading: true }
    case 'USER_DETAILS_SUCCESS':
      return { loading: false, user: action.payload }
    case 'USER_DETAILS_FAIL':
      return { loading: false, error: action.payload }
    case 'USER_DETAILS_RESET':
      return { user: {} }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_UPDATE_PROFILE_REQUEST':
      return { loading: true }
    case 'USER_UPDATE_PROFILE_SUCCESS':
      return { loading: false, success: true, userInfo: action.payload }
    case 'USER_UPDATE_PROFILE_FAIL':
      return { loading: false, error: action.payload }
    case 'USER_UPDATE_PROFILE_RESET':
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case 'USER_LIST_REQUEST':
      return { loading: true }
    case 'USER_LIST_SUCCESS':
      return { loading: false, users: action.payload }
    case 'USER_LIST_FAIL':
      return { loading: false, error: action.payload }
    case 'USER_LIST_RESET':
      return { users: [] }
    default:
      return state
  }
}
export const addToWishListReducer = (state = { wishlist:[]}, action) => {

  switch (action.type) {
    case 'WISHLIST_CREATE_REQUEST':
      return { loading: true }
    case 'WISHLIST_CREATE_SUCCESS':
      return { 
        loading: false,
        success: true,
        wishlist: state.wishlist.filter((x) => x._id !== action.payload),
     }
    case 'WISHLIST_CREATE_FAIL':
      return { loading: false, error: action.payload }
    case 'WISHLIST_CREATE_RESET':
      return { product: {} }
    default:
      return state
  }
}
export const getUserWishListReducer = (state = { wishlist: [] }, action) => {
  switch (action.type) {
    case 'WISHLIST_GET_REQUEST':
      return { loading: true }
    case 'WISHLIST_GET_SUCCESS':
      return { loading: false, success: true, wishlist: action.payload }
    case 'WISHLIST_GET_FAIL':
      return { loading: false, error: action.payload }
    case 'WISHLIST_GET_RESET':
      return { wishlist: [] }
    default:
      return state
  }
}
export const removeToWishListReducer = (state = {userwishlist :[]}, action) => {
  
  console.log("state.userwishlist : ",state)
  switch (action.type) {
    case 'WISHLIST_REMOVE_REQUEST':
      return { loading: true }
    case 'WISHLIST_REMOVE_SUCCESS':
      return { loading: false, success: true,userwishlist:action.payload }
      
    case 'WISHLIST_REMOVE_FAIL':
      return { loading: false, error: action.payload }
    case 'WISHLIST_REMOVE_RESET':
      return { userwishlist: {} }
    default:
      return state
  }
}
// export const userDeleteReducer = (state = {}, action) => {
//   switch (action.type) {
//     case USER_DELETE_REQUEST:
//       return { loading: true }
//     case USER_DELETE_SUCCESS:
//       return { loading: false, success: true }
//     case USER_DELETE_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }

// export const userUpdateReducer = (state = { user: {} }, action) => {
//   switch (action.type) {
//     case USER_UPDATE_REQUEST:
//       return { loading: true }
//     case USER_UPDATE_SUCCESS:
//       return { loading: false, success: true }
//     case USER_UPDATE_FAIL:
//       return { loading: false, error: action.payload }
//     case USER_UPDATE_RESET:
//       return {
//         user: {},
//       }
//     default:
//       return state
//   }
// }
