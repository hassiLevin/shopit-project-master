import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import logo from '../images/logo.png'
import CartToast from './CartToast'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems, toast } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='primary' className='navbar-dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='mr-n4'>
              <Navbar.Brand
                style={{ fontFamily: 'Indie Flower , cursive' }}
                className='w-25 p-3'
              >
                ShopIt
                <img src={logo} alt='logo' className='logo-img' />
              </Navbar.Brand>
            </Navbar.Brand>
          </LinkContainer>
          <LinkContainer to='/about'>
            <Navbar.Brand>
              <h4 style={{ fontSize: '50%' }}>About Us</h4>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <SearchBox />
          <Nav className='ml-auto'>
            {userInfo && userInfo.isAdmin && (
              <NavDropdown
                title={`Admin Menu `}
                id='adminmenu'
                style={{ fontSize: '70%' }}
              >
                <LinkContainer to='/admin/orders'>
                  <NavDropdown.Item>Orders List</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/products'>
                  <NavDropdown.Item>Products list</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/users'>
                  <NavDropdown.Item>Users List</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Private Area</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {userInfo && !userInfo.isAdmin ? (
              <NavDropdown title={`${userInfo.name}  `} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Private Area</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              !userInfo && (
                <LinkContainer to='/login' style={{ fontSize: '70%' }}>
                  <Nav.Link>
                    <i className='fas fa-user mx-1'></i>Login
                  </Nav.Link>
                </LinkContainer>
              )
            )}
            <LinkContainer to='/cart' style={{ fontSize: '70%' }}>
              <Nav.Link>
                <i className='fas fa-shopping-cart mx-1  '></i>Shopping Cart{' '}
                {cartItems.length > 0 &&
                  `(${cartItems.reduce(
                    (acc, item) => acc + Number(item.qty),
                    0
                  )})`}
              </Nav.Link>
            </LinkContainer>
          </Nav>
          {toast && <CartToast />}
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
