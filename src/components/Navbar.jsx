import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { searchVideo } from '../features/common/commonSlice';

function Navbar(props) {

  //for search 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = (e) =>{
    const {value} = e.target;
    dispatch(searchVideo(value));
    if(value.length > 3){
      navigate('/search');
    }
  }

    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Netflix</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/browse/movie">Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/browse/tv">Tv</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/browsebygenre/movie/28">Browse By Genre</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 Profile
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="#">Log In</Link></li>
                  <li><Link className="dropdown-item" to="#">Log out</Link></li>
                </ul>
              </li>
             
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;