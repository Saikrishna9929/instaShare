import {Switch, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import SearchResults from './components/SearchResults'
import SearchContext from './context/SearchContext'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  notFound: 'NOT_FOUND',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class App extends Component {
  state = {
    searchInput: '',
    searchResultsApiStatus: apiStatus.initial,
    searchPostsList: [],
  }

  onChangeSearchInput = text => {
    this.setState({searchInput: text})
  }

  getSearchResults = async () => {
    this.setState({searchResultsApiStatus: apiStatus.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const searchPostsApiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(searchPostsApiUrl, options)
    if (response.ok) {
      const data = await response.json()

      if (data.posts.length > 0) {
        const updatedSearchedPostsList = data.posts.map(eachPost => ({
          postId: eachPost.post_id,
          userId: eachPost.user_id,
          userName: eachPost.user_name,
          profilePic: eachPost.profile_pic,
          postDetails: {
            imageUrl: eachPost.post_details.image_url,
            caption: eachPost.post_details.caption,
          },
          likesCount: eachPost.likes_count,
          comments: eachPost.comments.map(eachComment => ({
            commentUserName: eachComment.user_name,
            commentUserId: eachComment.user_id,
            comment: eachComment.comment,
          })),

          createdAt: eachPost.created_at,
        }))

        this.setState({
          searchPostsList: updatedSearchedPostsList,
          searchResultsApiStatus: apiStatus.success,
        })
      } else {
        this.setState({searchResultsApiStatus: apiStatus.notFound})
      }
    } else {
      this.setState({searchResultsApiStatus: apiStatus.failure})
    }
  }

  render() {
    const {searchInput, searchResultsApiStatus, searchPostsList} = this.state
    return (
      <SearchContext.Provider
        value={{
          searchInput,
          searchResultsApiStatus,
          searchPostsList,
          onChangeSearchInput: this.onChangeSearchInput,
          getSearchResults: this.getSearchResults,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <ProtectedRoute
            exact
            path="/search-results"
            component={SearchResults}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
