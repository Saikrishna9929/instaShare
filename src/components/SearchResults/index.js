import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import {Component} from 'react'
import Header from '../Header'
import PostItem from '../PostItem'
import SearchContext from '../../context/SearchContext'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  notFound: 'NOT_FOUND',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchResults extends Component {
  renderSearchResultsView = () => (
    <SearchContext.Consumer>
      {value => {
        const {searchPostsList} = value
        return (
          <div className="search-results-view-container">
            <h1 className="search-results-title">Search Results</h1>
            <div className="searched-posts-container">
              <ul className="searched-posts-list-container">
                {searchPostsList.map(eachPostItem => (
                  <PostItem
                    key={eachPostItem.postId}
                    postItemDetails={eachPostItem}
                  />
                ))}
              </ul>
            </div>
          </div>
        )
      }}
    </SearchContext.Consumer>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSearchResultsNotFoundView = () => (
    <div className="search-not-found-container">
      <img
        className="search-not-found-img"
        src="https://res.cloudinary.com/dcljk0dvw/image/upload/v1707835929/Group_l3f29o.png"
        alt="search not found"
      />
      <h1 className="search-not-found-heading">Search Not Found</h1>
      <p className="search-not-found-text">
        Try different keyword or search again
      </p>
    </div>
  )

  renderSearchResultsFailureView = () => (
    <SearchContext.Consumer>
      {value => {
        const {getSearchResults} = value

        return (
          <div className="user-profile-failure-container">
            <img
              className="user-profile-failure-img"
              src="https://res.cloudinary.com/dcljk0dvw/image/upload/v1707800767/Group_7522_dqxbrj.png"
              alt="failure view"
            />
            <p className="user-profile-failure-text">
              Something went wrong. Please try again
            </p>
            <button
              className="try-again-button"
              type="button"
              onClick={getSearchResults}
            >
              Try Again
            </button>
          </div>
        )
      }}
    </SearchContext.Consumer>
  )

  switchingSearchResultsContent = searchResultsStatus => {
    switch (searchResultsStatus) {
      case apiStatus.success:
        return this.renderSearchResultsView()
      case apiStatus.notFound:
        return this.renderSearchResultsNotFoundView()
      case apiStatus.failure:
        return this.renderSearchResultsFailureView()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const {
            searchInput,
            searchResultsApiStatus,
            onChangeSearchInput,
            getSearchResults,
          } = value

          const searchResultsStatus = searchResultsApiStatus

          const onChangeSearchInputText = event => {
            onChangeSearchInput(event.target.value)
          }

          const activeTab = 'SEARCH'

          return (
            <div className="search-results-bg-container">
              <Header activeTab={activeTab} />
              <div className="search-results-container">
                <div className="search-item-container">
                  <input
                    className="input-search"
                    value={searchInput}
                    type="search"
                    placeholder="Search Caption"
                    onChange={onChangeSearchInputText}
                  />
                  <button
                    className="search-button"
                    type="button"
                    onClick={getSearchResults}
                    data-testid="searchIcon"
                  >
                    <FaSearch size="15" color="#989898" />
                  </button>
                </div>
                {searchResultsApiStatus === 'INITIAL' && (
                  <div className="search-results-initial-container">
                    <img
                      className="search-initial-img"
                      src="https://res.cloudinary.com/dcljk0dvw/image/upload/v1707845415/Frame_1473_t6g499.png"
                      alt="search_img"
                    />
                    <p className="search-results-initial-text">
                      Search Results will be appear here
                    </p>
                  </div>
                )}
                <div className="search-results-content-container">
                  {this.switchingSearchResultsContent(searchResultsStatus)}
                </div>
              </div>
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default SearchResults
