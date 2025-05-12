import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import MovieDetails from './components/MovieDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/add" element={<MovieForm isEditing={false} />} />
            <Route path="/edit/:id" element={<MovieForm isEditing={true} />} />
            <Route path="/details/:id" element={<MovieDetails />} />
          </Routes>
        </main>
        <footer className="bg-light py-3 text-center text-muted">
          <div className="container">
            <small>Movie Tracker &copy; {new Date().getFullYear()}</small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
