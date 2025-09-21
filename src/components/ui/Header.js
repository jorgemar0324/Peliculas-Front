import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Peliculas</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/directores">Directores</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/generos">Géneros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productoras">Productoras</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tipos">Tipos Media</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Películas</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export { Header };