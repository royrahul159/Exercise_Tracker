import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../loader';

const Exercise = props => (
    <tr>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
        <Link to={"/exercises/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

const ExercisesList = () => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);
    const username = localStorage.getItem('userToken').toLowerCase();
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:5000/exercises/'+ username)
        .then(response => {
            setExercises(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })    
    },[]);

    const deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(response => { console.log(response.data)
        }).catch((error) => {
            console.log(error);
        })  
        setExercises(exercises.filter(el => el._id !== id));
    } 
  
  return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
            <thead className="thead-light">
                <tr>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {(loading) ? <Loader /> : 
                (!!exercises && exercises.length > 0 ?
                exercises.map(currentexercise => {
                    return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>;
                })
                : <th colspan="4">No results found</th>)}
            </tbody>
            </table>
        </div>
    )
}
export default ExercisesList;