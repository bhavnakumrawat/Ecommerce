import React, { useEffect } from 'react'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import { getMyWishlist } from '../actions/userActions'
import Loader from '../component/Loader'
import Message from '../component/Message'
import Rating from '../component/Rating'

const WishListScreen = () => {

    const dispatch = useDispatch()
    const userWishlist = useSelector((state) => state.userWishlist)
    const {loading, error,wishlist} = userWishlist
    const history = useHistory()

    useEffect(()=>{
      
        dispatch(getMyWishlist())
        console.log('userWishlist : ',wishlist)
        // console.log(wishlist.length)

    },[dispatch])
    const addToCartHandler = (product_id,qty) => {
        // alert(product_id,'===',qty)
        dispatch(addToCart(product_id,qty))
        history.push(`/cart`)

      }
    return (
      <>
            <Row><h1>WishList</h1></Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                    wishlist.map((item)=>{
                         return(
                            <Row>
                            <Col md={4}>
                            <Image src={item.image} fluid />
                            </Col>
                            <Col md={6}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{item.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating
                                            value={item.rating}
                                            text={`${item.numReviews} reviews`}
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                       <Row>
                                            <Col>Description:</Col>
                                            <Col>
                                                <strong>${item.description}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${item.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
            
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {item.countInStock> 0 ? 'In Stock' : 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {/* <ListGroup.Item>
                                        <Row>
                                            <Col>Item added:</Col>
                                            <Col>
                                                {'3 March 2021'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item> */}
                                    <ListGroup.Item>
                                        <Button
                                        variant='custom'
                                        onClick={()=>addToCartHandler(item._id,'1')}
                                        className='btn-block'
                                        type='button'
                                        disabled={item.countInStock === 0}
                                        >
                                        Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                         )
                        })
                
             )}
      </>
    )
}

export default WishListScreen
