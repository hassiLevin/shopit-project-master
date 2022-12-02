import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <div style={{ textAlign: 'center' }}>
        <a
          href='http://www.facebook.com'
          className='fa fa-facebook py-3 mx-3'
          aria-hidden='true'
        ></a>
        <a
          href='http://www.twiter.com'
          className='fa fa-twitter py-3 mx-3'
          aria-hidden='true'
        ></a>
        <a
          href='http://www.instagram.com'
          className='fa fa-instagram py-3 mx-3'
          aria-hidden='true'
        ></a>
      </div>

      <Container>
        <Row>
          <Col className='text-center py-3'>
            by Hassi Levin - Schwartz 2022 &copy;
            <h6 style={{ fontFamily: 'Indie Flower , cursive' }}>shopIt</h6>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row></Row>
      </Container>
    </footer>
  )
}

export default Footer
