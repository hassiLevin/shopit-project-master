import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Image, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Message from '../components/Message'
import Loader from '../components/Layout/Loader'
import FormContainer from '../components/FormContainer'
import {
  listProductDetails,
  updateProduct,
  deleteProduct,
} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = () => {
  const { id } = useParams()

  const productId = id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [published, setPublished] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productDelete = useSelector((state) => state.productDelete)
  const { error: deleteError } = productDelete

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo || (userInfo && !userInfo.isAdmin)) {
      navigate('/')
      return
    }

    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setDescription(product.description)
        setCountInStock(product.countInStock)
        setCategory(product.category)
        setBrand(product.brand)
        setPublished(product.published)
      }
    }
  }, [userInfo, dispatch, navigate, productId, product, success])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        description,
        countInStock,
        category,
        brand,
        published,
      })
    )
  }

  const deleteHandler = () => {
    if (window.confirm('Are you sure you want to delete the product?')) {
      dispatch(deleteProduct(productId))
      navigate('/admin/productlist')
    }
  }
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)

      setTimeout(() => {
        setUploaded(true)
        setUploading(false)
      }, 2000)
    } catch (err) {
      console.error(err)
      setUploading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>
          ShopIt | Edit Product {!product ? '' : `"${product.name}"`}
        </title>
      </Helmet>
      <Button onClick={() => navigate('/admin/products')} className='mx-1'>
        Go Back
      </Button>

      {errorUpdate && (
        <Message
          variant='danger'
          className='alert-product-screen'
          dismissible={true}
        >
          {errorUpdate}
        </Message>
      )}

      {deleteError && (
        <Message
          variant='danger'
          classNane='alert-product-screen'
          dismissible={true}
        >
          {deleteError}
        </Message>
      )}

      {loadingUpdate ? (
        <Loader />
      ) : loading ? (
        <Loader />
      ) : error ? (
        <Message
          variant='danger'
          className='alert-product-screen'
          dismissible={false}
        >
          {error}
        </Message>
      ) : (
        <>
          <FormContainer md={8}>
            <ListGroup>
              <ListGroup.Item>
                <h1 className='text-center'>Edit Product</h1>
              </ListGroup.Item>
              <ListGroup.Item className='text-center'>
                <Image
                  src={image}
                  alt={name}
                  rounded
                  style={{ width: '100%' }}
                />
              </ListGroup.Item>

              <ListGroup.Item>
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='product name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='image'>
                    <Form.Label>URL</Form.Label>
                    <Form.Control
                      dir='ltr'
                      type='text'
                      placeholder='URL'
                      value={!uploaded ? image : ''}
                      onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    {uploading ? (
                      <>
                        <h5 className='mt-4 text-center'>Uploading...</h5>
                        <Loader />
                      </>
                    ) : (
                      <Form.Group controlId='formFile' className='mb-3'>
                        <Form.Label className='mt-3'>
                          Or Upload Image
                        </Form.Label>
                        <Form.Control
                          type='file'
                          className='mb-1'
                          name='image-file'
                          label={uploaded ? image : ''}
                          accept='image/jpg, image/jpeg, image/png'
                          onChange={uploadFileHandler}
                        ></Form.Control>
                      </Form.Group>
                    )}
                  </Form.Group>

                  <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      placeholder='description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='brand'
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='category'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='count in stock'
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='published'>
                    <Form.Check
                      type='checkbox'
                      label='Publish'
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                    ></Form.Check>
                  </Form.Group>

                  <Button className='btn-brand btn-block mt-4_5' type='submit'>
                    Update
                  </Button>
                </Form>
                <Button
                  className='btn btn-danger btn-block mt-4_5'
                  onClick={deleteHandler}
                >
                  Delete Product
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </FormContainer>
        </>
      )}
    </>
  )
}

export default ProductEditScreen
