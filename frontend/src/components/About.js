import React from 'react'
import { Row } from 'react-bootstrap'
import ecommerce from '../images/ecommerce.jpg'
import { Nav } from 'react-bootstrap'

const About = () => {
  return (
    <>
      <div className='about' id='about' style={{ textAlign: 'justify' }}>
        <Row md={10}>
          <h2>Hi dear customer!</h2>
        </Row>
        <Row>
          <h5>
            ShopIt was founded by Harri Weise in 1984. to enough Gi Electronics
            about 38 years of experience in marketing electronic parts. Our main
            specialty is in the marketing of electronic parts for various
            purposes - private and industrial. enough. Gee Electronics markets a
            wide variety of products and parts from the best leading companies
            around the world. Among our many customers: high-tech companies,
            schools, technicians, and private customers including schoolchildren
            and students.
          </h5>
        </Row>
        <br></br>

        <img style={{ width: '100%' }} src={ecommerce} alt='ecommerce' />

        <Row>
          <h5>
            The items listed on the website are in the store's stock, which
            allows you to purchase them on the website / store immediately and
            send them within one working day of receiving the order.
          </h5>
        </Row>
        <br></br>
      </div>
      <br></br>
      <div style={{ fontFamily: 'Indie Flower , cursive' }}>
        We will be realy happy to be at your service at any time!!
      </div>
      <br />
    </>
  )
}

export default About
