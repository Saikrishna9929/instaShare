import './index.css'

const NotFound = props => {
  const onRedirectToHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="not-found-container">
      <img
        className="not-found-img"
        src="https://res.cloudinary.com/dcljk0dvw/image/upload/v1707820070/erroring_1_vngrll.png"
        alt="page not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-text">
        we are sorry, the page you requested could not be found.Please go back
        to the homepage.
      </p>
      <button className="home-btn" type="button" onClick={onRedirectToHome}>
        Home Page
      </button>
    </div>
  )
}

export default NotFound
