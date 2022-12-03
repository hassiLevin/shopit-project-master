import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addToCart, hideToast } from '../actions/cartActions'

const AddToCartBtn = ({ disabled, id, qty }) => {
  const dispatch = useDispatch()

  const addToCartHandler = () => {
    const message = qty > 1 ? 'products added' : 'product added'

    dispatch(addToCart(id, qty, message))
    setTimeout(() => {
      dispatch(hideToast())
    }, 3500)
  }

  return (
    <Button
      className='btn-block btn-brand'
      type='button'
      disabled={disabled}
      onClick={addToCartHandler}
      style={{ color: '#7CB342' }}
    >
      Add To Cart{' '}
    </Button>
  )
}

AddToCartBtn.defaultProps = {
  qty: 1,
}

AddToCartBtn.propTypes = {
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string,
}

export default AddToCartBtn
