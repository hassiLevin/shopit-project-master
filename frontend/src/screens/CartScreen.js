import { useEffect } from 'react'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { addToCart, removeFromCart, hideToast } from '../actions/cartActions'

const CartScreen = () => {
  const { id: productId } = useParams()
  const location = useLocation()
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const { cartItems, shippingAddress } = cart
  const navigate = useNavigate()

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id, qty) => {
    const message =
      qty === 1 ? 'product hes been removed' : 'products have been remooved'
    dispatch(removeFromCart(id, message))

    setTimeout(() => {
      dispatch(hideToast())
    }, 3500)
  }
  const checkoutHandler = () => {
    navigate('/register?redirect=shipping')
  }

  return (
    <>
      <Helmet>
        <title>ShopIt | Shoping Cart</title>
      </Helmet>
      {cartItems.length === 0 && (
        <Button onClick={() => navigate('/')}>Go Back</Button>
      )}
      {cartItems.length > 0 && (
        <CheckoutSteps
          step1
          isCartScreen
          step2={
            shippingAddress !== null && shippingAddress.address && userInfo
          }
          step3={
            shippingAddress !== null && shippingAddress.address && userInfo
          }
          step4={
            shippingAddress !== null && shippingAddress.address && userInfo
          }
        />
      )}
      <Row className='mt-4'>
        <Col md={8}>
          <h1 style={{ color: '#AAAAAA' }}>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <>
              <Message variant='brand' dismissible={false}>
                Your Shopping Cart Is Empty...{' '}
                <span className='link' onClick={() => navigate('/')}>
                  Go Back
                </span>{' '}
              </Message>
            </>
          ) : (
            <>
              <ListGroup variant='flush'>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2} className='my-auto'>
                        <Link to={`/product/${item.product}`}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Link>
                      </Col>
                      <Col md={3} className='my-auto mt-4-sm'>
                        <Link to={`/product/${item.product}`}>
                          {item.name.length > 30
                            ? `${item.name.slice(0, 30)}...`
                            : `${item.name}`}
                        </Link>
                      </Col>
                      <Col md={3} className='my-auto mt-4-sm'>
                        {item.price.toLocaleString('en-us')} $
                      </Col>
                      <Col md={2} className='my-auto mt-4-sm'>
                        <Form.Control
                          className='form-control-lg form-control-md form-control-small'
                          as='select'
                          value={item.qty}
                          onChange={(e) => {
                            dispatch(
                              addToCart(
                                item.product,
                                Number(e.target.value),
                                'Cart Updated'
                              )
                            )
                            setTimeout(() => {
                              dispatch(hideToast())
                            }, 3500)
                          }}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2} className='text-center my-auto'>
                        <i
                          className='fas fa-trash mt-4-sm'
                          onClick={() =>
                            removeFromCartHandler(item.product, item.qty)
                          }
                        ></i>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Col>
        <Col md={4}>
          <Card style={{ border: 'none' }}>
            <ListGroup
              variant='flush'
              style={{
                position: 'absolute',
                top: '73px',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {cartItems.length > 0 && (
                <>
                  <ListGroup.Item>
                    <h2 className='my-auto'>
                      Sum{' '}
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.qty),
                        0
                      )}{' '}
                      Products
                    </h2>
                    <h1 style={{ color: '#AAAAAA' }}>
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toLocaleString('he-IL')}{' '}
                      $
                    </h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn-block btn-brand'
                      onClick={checkoutHandler}
                    >
                      Continue{' '}
                    </Button>
                  </ListGroup.Item>
                </>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen
