import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'
import { Helmet } from 'react-helmet'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Loader from '../components/Layout/Loader'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductsListScreen = () => {
  const id = useParams
  const pageNumber = id.pageNumber || 1

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, message, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const { loading: loadingDelete, error: deleteError } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    product: createdProduct,
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate

  const navigate = useNavigate()

  const productUpdate = useSelector((state) => state.productUpdate)
  const { error: errorUpdate, success } = productUpdate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || (userInfo && !userInfo.isAdmin)) {
      navigate('/')
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, navigate, userInfo, successCreate, createdProduct, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete the product?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Helmet>
        <title>ShopIt | Products List</title>
      </Helmet>
      <Row className='align-items-center'>
        <Col>
          <h1 style={{ color: '#AAAAAA' }}>Products List</h1>
        </Col>
        <Col className='text-left'>
          <Button className='my-3 btn btn-brand' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Add Product
          </Button>
        </Col>
      </Row>
      {loading || loadingCreate ? (
        <Loader />
      ) : (
        <>
          {message && (
            <Message
              variant='success'
              dismissible={false}
              classN='alert-product-screen'
            >
              {message}
            </Message>
          )}

          {success && (
            <Message
              variant='success'
              dismissible={false}
              classN='alert-product-screen'
            >
              The product has been updated
            </Message>
          )}

          {deleteError && (
            <Message
              variant='danger'
              dismissible={true}
              classN='alert-product-screen'
            >
              {deleteError}
            </Message>
          )}

          {errorUpdate && (
            <Message
              variant='danger'
              dismissible={true}
              classN='alert-product-screen'
            >
              {errorUpdate}
            </Message>
          )}

          {errorCreate && (
            <Message
              variant='danger'
              dismissible={true}
              classN='alert-product-screen'
            >
              {errorCreate}
            </Message>
          )}

          {error ? (
            <Message variant='danger' dismissible={false}>
              {error}
            </Message>
          ) : loadingDelete ? (
            <Loader />
          ) : (
            <>
              <Table
                striped
                bordered
                hover
                responsive
                className='table-sm'
                style={{ color: '#AAAAAA' }}
              >
                <thead>
                  <tr style={{ textAlign: 'center' }}>
                    <th>catalog number</th>
                    <th>name</th>
                    <th>price</th>
                    <th style={{ width: '6rem' }}>count in stock</th>
                    <th className='hide-sm hide-md'>category</th>
                    <th className='hide-sm hide-md'>brand</th>
                    <th>published</th>
                    <th className='hide-sm'>delete</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    products &&
                    products.map((product) => (
                      <tr key={product._id}>
                        <td
                          onClick={() =>
                            navigate(`/admin/product/${product._id}/edit`)
                          }
                          className='product-link'
                        >
                          {product._id.slice(17, 24)}
                        </td>
                        <td
                          onClick={() =>
                            navigate(`/admin/product/${product._id}/edit`)
                          }
                          className='product-link text-left'
                        >
                          {product.name}
                        </td>
                        <td
                          onClick={() =>
                            navigate(`/admin/product/${product._id}/edit`)
                          }
                          className='product-link'
                        >
                          <NumberFormat
                            value={product.price}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                        </td>
                        <td
                          onClick={() =>
                            navigate(`/admin/product/${product._id}/edit`)
                          }
                          className='product-link'
                        >
                          {product.countInStock}
                        </td>
                        <td
                          onClick={() =>
                            navigate(`/admin/product/${product._id}/edit`)
                          }
                          className='product-link hide-sm hide-md'
                        >
                          {product.category}
                        </td>
                        <td
                          onClick={() =>
                            navigate(`/admin/product/${product._id}/edit`)
                          }
                          className='product-link hide-sm hide-md'
                        >
                          {product.brand}
                        </td>
                        <td>
                          {product.published ? (
                            <i
                              className='fas fa-check'
                              style={{ color: '#3fa63f' }}
                            ></i>
                          ) : (
                            <i
                              className='fas fa-times'
                              style={{
                                color: '#e9352f',
                              }}
                            ></i>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }} className='hide-sm'>
                          <i
                            className='fas fa-trash-alt'
                            style={{
                              color: '#e9352f',
                              cursor: 'pointer',
                            }}
                            onClick={() => deleteHandler(product._id)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Paginate pages={pages} page={page} isAdmin={true} />
            </>
          )}
        </>
      )}
    </>
  )
}

export default ProductsListScreen
