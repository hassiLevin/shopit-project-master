import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Message from '../components/Message'
import Loader from '../components/Layout/Loader'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userList = useSelector((state) => state.userList)
  const { loading, error, users, success } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const { error: deleteError } = userDelete

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success: successUpdate } = userUpdate

  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo || (userInfo && !userInfo.isAdmin)) {
      navigate('/')
      return
    }

    dispatch(listUsers())
  }, [dispatch, userInfo, navigate])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <Helmet>
        <title>shopIt | Users List</title>
      </Helmet>
      <h1 style={{ color: '#AAAAAA' }}> Users List</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {success && (
            <Message
              variant='success'
              dismissible={false}
              classN='alert-user-list'
            >
              user has been removed{' '}
            </Message>
          )}

          {successUpdate && (
            <Message
              variant='success'
              dismissible={false}
              classN='alert-user-list'
            >
              user has been updated{' '}
            </Message>
          )}

          {error ? (
            <Message variant='danger' dismissible={false}>
              {error}
            </Message>
          ) : deleteError ? (
            <Message variant='danger' dismissible={true}>
              {deleteError}
            </Message>
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
                  <th className='hide-sm'>User ID</th>
                  <th>Name</th>
                  <th className='hide-sm'>Email</th>
                  <th>admin</th>
                  <th>orders are exist</th>
                  <th>paid orders exist</th>
                  <th>edit/delete user</th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  users &&
                  users.map((user) => (
                    <tr key={user._id}>
                      <td className='hide-sm '>{user._id.slice(17, 24)}</td>
                      <td>{user.name}</td>
                      <td className='hide-sm'>
                        <a
                          href={`mailto:${user.email}`}
                          style={{ color: '#AAAAAA' }}
                        >
                          {user.email}
                        </a>
                      </td>
                      <td>
                        {user.isAdmin ? (
                          <i
                            className='fas fa-user-shield '
                            style={{ color: '#3fa63f' }}
                          />
                        ) : (
                          <i
                            className='fas fa-user-times'
                            style={{ color: '#e9352f' }}
                          />
                        )}
                      </td>
                      <td>
                        {user.hasOrders && (
                          <i
                            className='far fa-check-circle'
                            style={{ color: '#3fa63f' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {user.hasPaidOrders && (
                          <i
                            className='far fa-check-circle'
                            style={{ color: '#3fa63f' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer
                          to={`/admin/user/${user._id}/edit`}
                          style={{ cursor: 'pointer' }}
                        >
                          <i className='fas fa-edit mx-4'></i>
                        </LinkContainer>
                        {!user.hasPaidOrders ? (
                          <i
                            className='fas fa-trash-alt'
                            style={{
                              color: '#e9352f',
                              marginRight: '1.5rem',
                              verticalAlign: 'middle',
                              cursor: 'pointer',
                            }}
                            onClick={() => deleteHandler(user._id)}
                          ></i>
                        ) : (
                          <span title='A customer with a paid order cannot be deleted'>
                            <i
                              className='fas fa-trash-alt'
                              style={{
                                color: '#AAAAAA',
                                marginRight: '1.5rem',
                                verticalAlign: 'middle',
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

export default UserListScreen
