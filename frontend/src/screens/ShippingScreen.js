import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { Helmet } from 'react-helmet'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [address, setAddress] = useState('')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [phoneNumber, setPhoneNumber] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo) {
      navigate('/cart')
    }

    if (cartItems.length === 0) {
      navigate('/')
    }

    if (shippingAddress !== null) {
      setAddress(shippingAddress.address)
      setCity(shippingAddress.city)
      setPostalCode(shippingAddress.postalCode)
      setPhoneNumber(shippingAddress.phoneNumber)
    } else if (userInfo) {
      setAddress(userInfo.address.address)
      setCity(userInfo.address.city)
      setPostalCode(userInfo.address.postalCode)
      setPhoneNumber(userInfo.address.phoneNumber)
    }
  }, [navigate, userInfo, shippingAddress, cartItems])

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, phoneNumber }))
    navigate('/placeorder')
  }

  return (
    <>
      <Helmet>
        <title>ShopIt | Address For Shipping</title>
      </Helmet>
      <CheckoutSteps
        step1
        step2
        step4={shippingAddress !== null && shippingAddress.address}
      />
      <FormContainer>
        <h1 className='mb-n3' style={{ color: '#AAAAAA' }}>
          Address For Shipping{' '}
        </h1>
        <small>* required fields</small>
        <Form onSubmit={submitHandler} className='mt-3'>
          <Form.Group controlId='address'>
            <Form.Label>* street and number of apartment</Form.Label>
            <Form.Control
              type='text'
              placeholder='street and number of apartment'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='city'>
            <Form.Label>* city</Form.Label>
            <Form.Control
              type='text'
              placeholder='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='postalCode'>
            <Form.Label>postalCode</Form.Label>
            <Form.Control
              type='tel'
              placeholder='postal code (7 numbers)'
              pattern='[0-9]{7}'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='phoneNumber'>
            <Form.Label>cell phone number</Form.Label>
            <Form.Control
              type='tel'
              value={phoneNumber}
              placeholder='cell phone number(numbers only)'
              pattern='[0-9]{10}'
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' className='btn-brand btn-block mt-5'>
            continue{' '}
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ShippingScreen
