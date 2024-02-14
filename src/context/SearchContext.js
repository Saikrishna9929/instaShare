import React from 'react'

const SearchContext = React.createContext({
  searchResultsApiStatus: '',
  searchInput: '',
  searchPostsList: [],
  getSearchResults: () => {},
  onChangeSearchInput: () => {},
})

export default SearchContext
