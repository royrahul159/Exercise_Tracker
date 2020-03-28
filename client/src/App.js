import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import ExercisesList from './components/exercises/ExercisesList';
import EditExercise from "./components/exercises/EditExercise";
import CreateExercise from "./components/exercises/CreateExercise";
import { ProtectedRoute } from './protected.routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Route exact path="/" component={Landing} />
          <ProtectedRoute exact path="/exercises" component={ExercisesList} />
          <ProtectedRoute exact path="/exercises/edit/:id" component={EditExercise} />
          <ProtectedRoute exact path="/exercises/create" component={CreateExercise} />
        </div>
      </div> 
    </Router>
  );
}

export default App;
