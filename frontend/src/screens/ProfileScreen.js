import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Loader from '../components/Layout/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders, deleteOrder } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { useNavigate } from 'react-router-dom'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderMyList = useSelector((state) => state.orderMyList)
  const {
    orders,
    loading,
    error: myListErrors,
    message: deleteOrderMessage,
  } = orderMyList

  const orderDelete = useSelector((state) => state.orderDelete)
  const { error: deleteOrderError } = orderDelete

  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
        if (user.address) {
          setAddress(user.address.address)
          setCity(user.address.city)
          setPostalCode(user.address.postalCode)
          setPhoneNumber(user.address.phoneNumber)
        }
      }
    }
  }, [dispatch, navigate, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('The passwords do not match')
      setTimeout(() => {
        setMessage(null)
      }, 2500)
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          address: { address, city, postalCode, phoneNumber },
          password,
        })
      )
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 1500)
    }
  }

  return (
    <>
      <Helmet>
        <title>ShopIt | Private Area</title>
      </Helmet>
      <h1>
        <strong>Private Area</strong>
      </h1>
      <Row>
        <Col md={3}>
          <h2>Personal Details</h2>
          {message && (
            <Message variant='danger' classN='alert-extra-wide'>
              {message}
            </Message>
          )}
          {success && (
            <Message variant='success' classN='alert-extra-wide'>
              Details Updated
            </Message>
          )}
          {error && (
            <Message variant='danger' classN='alert-extra-wide'>
              {error}
            </Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='first name and last name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' as={Col}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' as={Col}>
              <Form.Label>Confirm</Form.Label>
              <Form.Control
                type='password'
                placeholder='confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='street, house and apartment number'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city' as={Col}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode' as={Col}>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type='tel'
                placeholder='7 numbers'
                pattern='[0-9]{7}'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='phoneNumber'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='tel'
                value={phoneNumber}
                placeholder='numbers only'
                pattern='[0-9]{10}'
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className='btn-brand btn-block mt-4_5' type='submit'>
              Update{' '}
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          {deleteOrderMessage && (
            <div className='my-auto'>
              <Message
                variant='success'
                dismissible={true}
                classN='alert-delete-order alert-delete-order-sm'
              >
                {deleteOrderMessage}
              </Message>
            </div>
          )}
          <h2>My Orders</h2>
          {loading ? (
            <Loader />
          ) : myListErrors ? (
            <Message variant='danger' dismissible={false}>
              {myListErrors}
            </Message>
          ) : deleteOrderError ? (
            <Message variant='danger' dismissible={true}>
              {deleteOrderError}
            </Message>
          ) : orders.length === 0 ? (
            <h3>No orders have been placed yet</h3>
          ) : (
            <>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>order number</th>
                    <th>date of order</th>
                    <th>total price of the order</th>
                    <th className='sm-hide'>payment status </th>
                    <th className='sm-hide'>date of payment</th>
                    <th className='sm-hide'>shipping status </th>
                    <th className='sm-hide'>date the order was sent</th>
                    <th>continue</th>
                    <th>cancel order</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <Link to={`/order/${order._id}`}>
                          {order._id.slice(17, 24)}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/order/${order._id}`}>
                          {new Date(
                            order.createdAt.substring(0, 10)
                          ).toLocaleDateString('he-IL')}
                        </Link>
                      </td>
                      <td
                        style={{
                          fontSize:
                            order.totalPrice < 999
                              ? '1rem'
                              : order.totalPrice > 9999
                              ? '0.75rem'
                              : '0.85rem',
                        }}
                      >
                        <Link to={`/order/${order._id}`}>
                          <NumberFormat
                            value={order.totalPrice}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                          $
                        </Link>
                      </td>
                      <td className='sm-hide'>
                        {order.isPaid ? (
                          <Link to={`/order/${order._id}`}>
                            <i
                              className='fas fa-check'
                              style={{ color: 'green' }}
                            />
                          </Link>
                        ) : (
                          <Link to={`/order/${order._id}`}>
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}
                            />
                          </Link>
                        )}
                      </td>
                      <td className='sm-hide'>
                        <Link to={`/order/${order._id}`}>
                          {order.isPaid &&
                            new Date(
                              order.paidAt.substring(0, 10)
                            ).toLocaleDateString('he-IL')}
                        </Link>
                      </td>
                      <td className='sm-hide'>
                        {order.isDelivered ? (
                          <Link to={`/order/${order._id}`}>
                            <i
                              className='fas fa-check'
                              style={{ color: 'green' }}
                            />
                          </Link>
                        ) : (
                          <Link to={`/order/${order._id}`}>
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}
                            />
                          </Link>
                        )}
                      </td>
                      <td className='sm-hide'>
                        <Link to={`/order/${order._id}`}>
                          {order.isDelivered &&
                            new Date(
                              order.deliveredAt.substring(0, 10)
                            ).toLocaleDateString('he-IL')}
                        </Link>
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className='btn-sm'>details</Button>
                        </LinkContainer>
                      </td>
                      <td>
                        {!order.isPaid && (
                          <i
                            className='fas fa-trash-alt'
                            style={{ color: '#AAAAAA' }}
                            onClick={() =>
                              dispatch(deleteOrder(order._id, order.user))
                            }
                          ></i>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProfileScreen
