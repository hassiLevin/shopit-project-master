import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
//import { GoogleLogin } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  // const [googleEmail, setGoogleEmail] = useState('')
  // const [googleId, setGoogleId] = useState('')
  const loginSuccess = useState(false)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { error } = userRegister

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const navigate = useNavigate()
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }

    // if (error === 'user exist' && googleEmail !== '') {
    //   setLoginSuccess(true)
    //   dispatch(login(googleEmail, googleId))
    //   navigate('/')
    // }
  }, [
    navigate,
    userInfo,
    redirect,
    error,
    email,
    dispatch,
    // googleEmail,
    // googleId,
  ])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('passwords do not mutch')
      setTimeout(() => {
        setMessage(null)
      }, 2500)
    } else {
      dispatch(register(name, email, password))
    }
  }

  // const googleLogin = (response) => {
  //   const {
  //     profileObj: { email, name },
  //     googleId,
  //   } = response

  //   setGoogleEmail(email)
  //   setGoogleId(googleId)

  //   if (email) {
  //     setLoginSuccess(true)
  //     dispatch(register(name, email, googleId))
  //   } else {
  //     setMessage('Error. try again')
  //     setTimeout(() => {
  //       setMessage(null)
  //     }, 2500)
  //   }
  // }

  return (
    <>
      <Helmet>
        <title>ShopIt | Signup</title>
      </Helmet>
      <FormContainer>
        {message && (
          <Message variant='danger' classN='alert-register'>
            {message}
          </Message>
        )}
        {!loginSuccess && error && (
          <Message variant='danger' classN='alert-register'>
            {error}
          </Message>
        )}
        {/* {loading && <Loader />}
        <GoogleLogin
          clientId='816282195701-kdd4l2l5bnun3kbpsq8kqcusfb1cjkcr.apps.googleusercontent.com'
          onSuccess={googleLogin}
          onFailure={googleLogin}
          buttonText='signup by Google'
          className='google-login mt-4'
        /> */}
        <h1>Or Signup To Web</h1>
        <h1>Signup</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='first name and last name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Button className='btn-brand mt-3' type='submit'>
            Signup
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            New Customer?
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default RegisterScreen
