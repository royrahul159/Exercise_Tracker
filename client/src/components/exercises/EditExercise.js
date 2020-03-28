import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const EditExercise = (props) => {
  const history = useHistory();
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const user = localStorage.getItem("userToken").toLowerCase();
    useEffect(()=>{
        axios.get('http://localhost:5000/exercises/'+user+'/'+props.match.params.id)
        .then(response => {
            const result = response.data[0];
            setDescription(result.description); 
            setDuration(result.duration);
            setDate(new Date(result.date));
        })
        .catch((error) => {
            console.log(error);
        })    
    },[]);

    const onChangeDescription  =(e) =>{
        setDescription(e.target.value);
      }
    
    const onChangeDuration =(e) =>{
        setDuration(e.target.value);
      }
    
    const onChangeDate =(date) =>{
          setDate(date);
      }

    const onSubmit = (e) => {
        e.preventDefault();
        const exercise = {
            description: description,
            duration: duration,
            date: date
          };
        axios.post('http://localhost:5000/exercises/update/'+props.match.params.id, exercise)
          .then((res) => {
            history.push('/exercises');
          });
      }

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit} className="form-wrapper">
          <div className="form-group"> 
            <label className="col-xs-12 col-sm-4">Description: </label>
            <div className ="col-xs-12 col-sm-8 input-wrapper">
                <input  type="text"
                    required
                    className="form-control"
                    value={description}
                    onChange={onChangeDescription}
                />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-12 col-sm-4">Duration (in minutes): </label>
            <div className ="col-xs-12 col-sm-8 input-wrapper">
                <input 
                    type="text" 
                    className="form-control"
                    value={duration}
                    onChange={onChangeDuration}
                    />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-12 col-sm-4">Date: </label>
            <div className="col-xs-12 col-sm-8 text-sm-left input-wrapper">
              <DatePicker
                selected={date}
                onChange={onChangeDate}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Update Exercise Log" className="btn btn-primary" />
          </div>
        </form>
        </div>
    )
}

export default EditExercise;