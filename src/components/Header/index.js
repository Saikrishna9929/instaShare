import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {IoCloseCircle, IoMenu} from 'react-icons/io5'
import {FaSearch} from 'react-icons/fa'
import SearchContext from '../../context/SearchContext'
import './index.css'

const Header = props => {
  const {activeTab} = props
  const searchTabClassName = activeTab === 'SEARCH' ? 'active-tab' : ''
  const homeTabClassName = activeTab === 'HOME' ? 'active-tab' : ''
  const profileTabClassName = activeTab === 'PROFILE' ? 'active-tab' : ''

  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <SearchContext.Consumer>
      {value => {
        const {searchInput, getSearchResults, onChangeSearchInput} = value
        const onChangeSearchInputText = event => {
          onChangeSearchInput(event.target.value)
        }

        return (
          <nav className="header-nav-container">
            <Link to="/" className="nav-logo-link">
              <div className="nav-logo-container">
                <img
                  className="nav-logo-img"
                  src="https://res.cloudinary.com/dcljk0dvw/image/upload/v1695974207/InstaSharePics/logo_gqdm5p.png"
                  alt="website logo"
                />
                <p className="nav-logo-title">Insta Share</p>
              </div>
            </Link>
            <ul className="nav-list-items-container">
              <li className="nav-search-item-container">
                <input
                  className="nav-input-search"
                  value={searchInput}
                  type="search"
                  placeholder="Search Caption"
                  onChange={onChangeSearchInputText}
                />
                <Link to="/search-results">
                  <button
                    className="nav-search-button"
                    type="button"
                    onClick={getSearchResults}
                    data-testid="searchIcon"
                  >
                    <FaSearch size="15" color="#989898" />
                  </button>
                </Link>
              </li>
              <Link className="nav-link-item" to="/">
                <li className={`nav-item ${homeTabClassName}`}>Home</li>
              </Link>
              <Link className="nav-link-item" to="/my-profile">
                <li className={`nav-item ${profileTabClassName}`}>Profile</li>
              </Link>
              <li className="nav-item">
                <button
                  className="logout-button"
                  onClick={onLogout}
                  type="button"
                >
                  Logout
                </button>
              </li>
            </ul>
            <Popup
              trigger={
                <button
                  className="menu-button"
                  type="button"
                  data-testid="menuIcon"
                >
                  <IoMenu size="24" color="#262626" />
                </button>
              }
              modal
              className="popup-content"
              lockScroll="true"
            >
              {close => (
                <div className="nav-modal-container">
                  <ul className="nav-modal-list-items-container">
                    <Link className="nav-link-item" to="/">
                      <li className={`nav-item ${homeTabClassName}`}>Home</li>
                    </Link>
                    <Link className="nav-link-item" to="/search-results">
                      <li className={`nav-item ${searchTabClassName}`}>
                        Search
                      </li>
                    </Link>

                    <Link className="nav-link-item" to="/my-profile">
                      <li className={`nav-item ${profileTabClassName}`}>
                        Profile
                      </li>
                    </Link>
                    <li className="nav-item">
                      <button
                        className="logout-button"
                        onClick={onLogout}
                        type="button"
                      >
                        Logout
                      </button>
                    </li>
                    <li>
                      <button
                        className="menu-close-button"
                        type="button"
                        onClick={close}
                        data-testid="closeCircleIcon"
                      >
                        <IoCloseCircle size="24" color="#262626" />
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </Popup>
          </nav>
        )
      }}
    </SearchContext.Consumer>
  )
}

export default withRouter(Header)
