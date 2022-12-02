import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { Helmet } from 'react-helmet'
import Message from '../components/Message'
import Loader from '../components/Layout/Loader'
import { getAllOrders, deleteOrder } from '../actions/orderActions'
import { ORDER_DELIVERED_RESET } from '../constants/orderConstants'

const OrderListScreen = () => {
  const [successDelivered, setSuccessDelivered] = useState(false)
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const ordersList = useSelector((state) => state.ordersList)
  const { loading, error, orders, message } = ordersList

  const orderDelivered = useSelector((state) => state.orderDelivered)
  const { loading: loadingDeliver, success: successDeliver } = orderDelivered

  const orderDelete = useSelector((state) => state.orderDelete)
  const { loading: loadingDelete, error: deleteError } = orderDelete

  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo || (userInfo && !userInfo.isAdmin)) {
      navigate('/')
      return
    }

    if (!loading && !loadingDeliver && successDeliver) {
      setSuccessDelivered(true)
      setTimeout(() => {
        setSuccessDelivered(false)
        dispatch({ type: ORDER_DELIVERED_RESET })
      }, 2000)
    }

    dispatch(getAllOrders())

    // eslint-disable-next-line
  }, [dispatch, userInfo, navigate, loadingDeliver, successDeliver])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete the order?')) {
      dispatch(deleteOrder(id, userInfo._id))
    }
  }
  return (
    <>
      <Helmet>
        <title>ShopIt | Orders List</title>
      </Helmet>
      <h1 style={{ color: '#AAAAAA' }}>Orders List</h1>

      {loading ? (
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

          {deleteError && (
            <Message
              variant='danger'
              dismissible={true}
              classN='alert-product-screen'
            >
              {deleteError}
            </Message>
          )}

          {error ? (
            <Message variant='danger' dismissible={false}>
              {error}
            </Message>
          ) : successDelivered ? (
            <Message
              variant='success'
              dismissible={false}
              classN='alert-product-screen'
            >
              The order has been marked as sent{' '}
            </Message>
          ) : loadingDelete ? (
            <Loader />
          ) : (
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
                  <th style={{ width: '7rem' }}>number order</th>
                  <th style={{ width: '8rem' }}>date of order</th>
                  <th style={{ width: '8rem' }}>customer name</th>
                  <th
                    style={{ textAlign: 'right', width: '18rem' }}
                    className='hide-sm'
                  >
                    customer address{' '}
                  </th>
                  <th className='hide-sm hide-md'>products on order</th>
                  <th>Payment Status</th>
                  <th className='hide-sm'>date of paymen</th>
                  <th> Shipping Status</th>
                  <th className='hide-sm'>sent on</th>
                  <th>Order Amount</th>
                  <th className='hide-sm hide-md'>delete</th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  orders &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td
                        onClick={() => navigate(`/order/${order._id}`)}
                        className='order-link'
                      >
                        <span title='continue to order details'>
                          {order._id.slice(17, 24)}
                        </span>
                      </td>

                      <td
                        onClick={() => navigate(`/order/${order._id}`)}
                        className='order-link'
                      >
                        <span title='Continue to order details'>
                          {new Date(
                            order.createdAt.substring(0, 10)
                          ).toLocaleDateString('en-us')}
                        </span>
                      </td>
                      <td
                        onClick={() => navigate(`/order/${order._id}`)}
                        className='order-link'
                      >
                        <span title='Continue to order details'>
                          {order.user.name}
                        </span>
                      </td>
                      <td
                        onClick={() => navigate(`/order/${order._id}`)}
                        className='order-link text-right hide-sm'
                      >
                        <span title='continue to order details'>
                          {order.shippingAddress.address}{' '}
                          {order.shippingAddress.city}
                        </span>
                      </td>
                      <td
                        onClick={() => navigate(`/order/${order._id}`)}
                        className='order-link hide-sm hide-md'
                      >
                        <span title='continue to order details'>
                          {order.orderItems.length}
                        </span>
                      </td>
                      <td
                        onClick={() =>
                          navigate(`/admin/user/${order.user._id}/edit`)
                        }
                        className='order-link'
                      >
                        <span title='continue to order details'>
                          {order.isPaid ? (
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
                        </span>
                      </td>

                      <td
                        onClick={() => navigate(`/order/${order._id}`)}
                        className='hide-sm'
                      >
                        <span title='continue to order details'>
                          {order.isPaid
                            ? new Date(
                                order.paidAt.substring(0, 10)
                              ).toLocaleDateString('en-us')
                            : ''}
                        </span>
                      </td>

                      <td
                        onClick={() =>
                          navigate(`/admin/user/${order.user._id}/edit`)
                        }
                        className='order-link'
                      >
                        <span title='continue to order details'>
                          {order.isDelivered ? (
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
                        </span>
                      </td>
                      <td
                        onClick={() => navigate(`/order/${order._id}`)}
                        className='hide-sm'
                      >
                        <span title='continue to order details'>
                          {order.isDelivered
                            ? new Date(
                                order.deliveredAt.substring(0, 10)
                              ).toLocaleDateString('en-us')
                            : ''}
                        </span>
                      </td>

                      <td
                        onClick={() => navigate(`/order/${order._id}`)}
                        className='order-link'
                      >
                        <span title='continue to order details'>
                          <NumberFormat
                            value={order.totalPrice}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                        </span>
                      </td>
                      <td
                        style={{ textAlign: 'center' }}
                        className='hide-sm hide-md'
                      >
                        {!order.isPaid ? (
                          <i
                            className='fas fa-trash-alt'
                            style={{
                              color: '#e9352f',
                              cursor: 'pointer',
                            }}
                            onClick={() => deleteHandler(order._id)}
                          ></i>
                        ) : (
                          <span title='a paid order cannot be deleted'>
                            <i
                              className='fas fa-trash-alt'
                              style={{
                                color: '#AAAAAA',
                                cursor: 'not-allowed',
                              }}
                            ></i>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  )
}

export default OrderListScreen
