import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Rating from './Rating'
import AddToCartBtn from './AddToCartBtn'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded card-main card-main-sm card-main-md bg-dark bg-gradient '>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' alt={product.name} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='mt-1-sm'>
            <strong>
              {product.name.length > 37
                ? `${product.name.slice(0, 37)}...`
                : `${product.name}`}
            </strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h5' className='mb-3'>
          {product.price.toLocaleString('en-us')} ${' '}
          <small>{product.countInStock === 0 && ` (Out Of Stock)`}</small>
        </Card.Text>

        <AddToCartBtn disabled={product.countInStock === 0} id={product._id} />
      </Card.Body>
    </Card>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  history: PropTypes.object,
}

export default Product
