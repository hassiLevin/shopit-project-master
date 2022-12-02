import { Helmet } from 'react-helmet'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>{`not found`}</title>
      </Helmet>
      <div style={{ height: '200px' }}></div>
      <div className='text-center'>
        <h1 className='x-large text-brand'>
          <i
            className='fas fa-exclamation-triangle'
            style={{ color: '#53dbb2' }}
          ></i>{' '}
          Page Not Found
        </h1>
        <p className='large'>Sorry, This page not found</p>
      </div>
    </>
  )
}

export default NotFound
