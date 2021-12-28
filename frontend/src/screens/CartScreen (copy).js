import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../component/Message'
import { addToCart, removeFromCart, getCart} from '../actions/cartActions'
import ApplyDiscountModal from '../component/ApplyDiscountModal'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const [modalShow, setModalShow] = useState(false);
  const [code, setCode] = useState('')

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
   setCode(localStorage.getItem(('code')))
   console.log("cartItems data: ",cartItems[0].product_id.image)
   console.log("cartItems data: ",cartItems.length)

  },[])
  useEffect(() => {
    // if (productId) {
      dispatch(getCart(productId, qty))
    // }
  }, [])
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => {item.product_id && (
              <ListGroup.Item key={item.product_id._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.product_id.image} alt={item.product_id.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product_id._id}`}>{item.product_id.name}</Link>
                  </Col>
                  <Col md={2}>${item.product_id.price}</Col>{}
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product_id._id, Number(e.target.value),item._id)
                        )
                      }
                    >{item.product_id.product}-1
                      {[...Array(item.product_id.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant='custom'
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            )})}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
        {cartItems && (
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              <Row>
                  <Col>Total Amount:</Col>
                  <Col>$
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.product_id.price, 0)
                      .toFixed(2)}
                  </Col>
               </Row>
               <Row>
                  <Col>
                      <Link variant="primary" onClick={() => setModalShow(true)}>
                          Apply Promo Code :
                      </Link>
                  </Col>
                  <Col>
                  
                  {cartItems.length === 0 ? '': code}
                  </Col>
               </Row>
              
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant='custom'
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
         )} </Card>
      </Col>
      <ApplyDiscountModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          set
        />
    </Row>
          
  )
}

export default CartScreen
