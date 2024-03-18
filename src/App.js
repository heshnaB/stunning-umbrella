import './App.css';
import {useState, useEffect} from 'react';
import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutView from './components/AboutView';
import SearchView from './components/SearchView';
import MovieView from './components/MovieView';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchText) {
      setLoading(true);
      setError(null);
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=c86b51d87a560e3d0df90223466b2427&query=${searchText}&include_adult=false&language=en-US`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch search results');
          }

          return response.json();
        })

        .then(data => {
          console.log(data)
          setSearchResults(data.results)
        });
    }
  }, [searchText])

  return (
    
      <div>
        <Navbar searchText={searchText} setSearchText={setSearchText} />
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/about" component={AboutView} />
            <Route  path="/search">
              <SearchView keyword={searchText} searchResults={searchResults} loading={loading} error={error} />
            </Route>
            <Route path="/movies/:id" component={MovieView} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
