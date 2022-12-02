import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
//import { GoogleLogin } from 'react-google-login'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login, register } from '../actions/userActions'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const [googleName, setGoogleName] = useState('')
  const [googleEmail, setGoogleEmail] = useState('')
  const [googleId, setGoogleId] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { error, userInfo } = userLogin
  const { search } = useLocation()
  const navigate = useNavigate()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
    if (error === 'invalid email or password' && googleName !== '') {
      dispatch(register(googleName, googleEmail, googleId))
      setLoginSuccess(true)
      navigate('/')
    }
  }, [
    navigate,
    userInfo,
    redirect,
    error,
    dispatch,
    googleName,
    googleEmail,
    googleId,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const googleLogin = (response) => {
    const {
      profileObj: { name, email },
      googleId,
    } = response

    setGoogleEmail(email)
    setGoogleName(name)
    setGoogleId(googleId)

    if (email) {
      dispatch(login(email, googleId))
    } else {
      setMessage('Error. Please try again')
      setTimeout(() => {
        setMessage(null)
      }, 2500)
    }
  }

  return (
    <>
      <Helmet>
        <title>ShopIt | Login</title>
      </Helmet>
      <FormContainer>
        <h1>Login</h1>
        {message && (
          <Message variant='danger' classN='alert-wide'>
            {message}
          </Message>
        )}
        {!loginSuccess && error && (
          <Message variant='danger' classN='alert-wide'>
            {error}
          </Message>
        )}
        {/* {loading && <Loader />}
        <GoogleLogin
          clientId='816282195701-kdd4l2l5bnun3kbpsq8kqcusfb1cjkcr.apps.googleusercontent.com'
          onSuccess={googleLogin}
          onFailure={googleLogin}
          buttonText='log in by Google'
          className='google-login'
        /> */}
        <h2>or login with password</h2>
        <h2>Login</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className='btn-brand' type='submit'>
            Login
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Sign Up
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}
export default LoginScreen
