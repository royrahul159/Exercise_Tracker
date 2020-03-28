import React, {useState} from 'react'
import {useHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';  


const CreateExercise = () => {
    const history = useHistory();
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());

    
    const onChangeDescription  =(e) =>{
        setDescription(e.target.value);
      }
    
    const onChangeDuration =(e) =>{
        setDuration(e.target.value);
      }
    
    const onChangeDate =(date) =>{
          setDate(date);
      }

    const onSubmit =(e) =>{
        e.preventDefault();
        const userName= localStorage.getItem('userToken').toLowerCase();
        const exercise = {
          username: userName,
          description: description,
          duration: duration,
          date: date
        };
        axios.post('http://localhost:5000/exercises/add', exercise)
            .then((res) => {
                history.push(`/exercises`);
            })
            .catch(err => {
                console.log(err)
            }
        );
      }
    return (
      
        <div>
        <h3>Create New Exercise Log</h3>
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
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
           
        </div>
    )
}

export default CreateExercise;





