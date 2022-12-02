import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Layout/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
  const id = useParams()
  const keyword = id.keyword
  const pageNumber = id.pageNumber || 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { toast } = cart
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))

    if (toast) {
      window.scrollTo(0, 0)
    }
  }, [dispatch, keyword, pageNumber, toast])
  return (
    <>
      <Helmet>
        <title> SopIt - Find the best products for the cheapest prices</title>
        <meta
          name='description'
          content='Computers, cell phones, a variety of electrical products, gadgets and a variety of other products'
        />
      </Helmet>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1> Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products &&
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
