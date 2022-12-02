import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import Rating from '../components/Rating'
import AddToCartBtn from '../components/AddToCartBtn'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Loader from '../components/Layout/Loader'
import Message from '../components/Message'

const ProductScreen = ({ history }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productCreateReview = useSelector((state) => state.productCreateReview)
  const { error: errorReview, success: successReview } = productCreateReview
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (successReview) {
      setTimeout(() => {
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
      }, 2000)
    }
    dispatch(listProductDetails(id))
  }, [dispatch, id, successReview])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    )
  }

  const user =
    userInfo &&
    product &&
    product.reviews.find((review) => review.user === userInfo._id)

  return (
    <>
      <Helmet>
        <title>
          {!product
            ? `ShopIt - Find the best products for the cheapest prices`
            : `ShopIt | ${product.name}`}
        </title>
      </Helmet>
      <Button onClick={() => navigate(-1)} className='mb-3'>
        Go Back
      </Button>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger' dismissible={false}>
          {error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
              {errorReview ? (
                <Message variant='danger' dismissible={true} classN='mt-5'>
                  {errorReview}
                </Message>
              ) : successReview ? (
                <Message variant='success' dismissible={false} classN='mt-5'>
                  The review has been added{' '}
                </Message>
              ) : (
                <ListGroup className='mt-3' variant='flush'>
                  <h2>Product Review</h2>

                  {!userInfo ? (
                    <ListGroup.Item>
                      <Message dismissible={false} variant='brand'>
                        <span
                          className='link'
                          onClick={() => navigate('/login')}
                        >
                          Sign In
                        </span>{' '}
                        to add review
                      </Message>
                    </ListGroup.Item>
                  ) : userInfo && !user ? (
                    <ListGroup.Item>
                      <h5 className='my-3'>add review</h5>
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Grade</option>
                            <option value='1'>1 - bad</option>
                            <option value='2'>2 - likely</option>
                            <option value='3'>3 - good</option>
                            <option value='4'>4 -very good</option>
                            <option value='5'>5 - excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          type='submit'
                          variant='brand'
                          className='btn btn-block mt-4_5'
                        >
                          add
                        </Button>
                      </Form>
                    </ListGroup.Item>
                  ) : (
                    userInfo && user && <></>
                  )}
                  {product.reviews.length === 0 ? (
                    <ListGroup.Item className='mt-2'>
                      <Message dismissible={false} classN='alert-review'>
                        No reviews have been added yet for this product{' '}
                      </Message>
                    </ListGroup.Item>
                  ) : (
                    product.reviews
                      .sort((a, b) => a.createdAt - b.createdAt)
                      .reverse()
                      .map((review) => (
                        <ListGroup.Item key={review._id}>
                          <h5>{review.comment}</h5>
                          <Rating value={review.rating} my='mb-2' />
                          <strong>{review.name}</strong>
                          <p>
                            {new Date(
                              review.createdAt.substring(0, 10)
                            ).toLocaleDateString('he-IL')}
                          </p>
                        </ListGroup.Item>
                      ))
                  )}
                </ListGroup>
              )}
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={` reviews-${product.numReviews} from`}
                    isSmall={false}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>
                    <NumberFormat
                      value={product.price}
                      displayType={'text'}
                      thousandSeparator={true}
                    />{' '}
                    $
                  </strong>
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price</Col>
                      <Col>
                        <strong
                          style={{ fontSize: product.price > 999 && '0.85rem' }}
                        >
                          <NumberFormat
                            value={product.price}
                            displayType={'text'}
                            thousandSeparator={true}
                          />{' '}
                          $
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0
                          ? `Count In Stock`
                          : `Out Of Stock`}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity: </Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <AddToCartBtn
                      disabled={product.countInStock === 0}
                      id={product._id}
                      qty={qty}
                    />
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
