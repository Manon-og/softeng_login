import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import validation from './LoginValidation';
import './Login.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext } from 'react';
import { useEffect } from 'react';


function Login() {
 
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    

    const { userId, setUserId } = useContext(UserContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    useEffect(() => {

        axios.get('http://localhost:8801/userId') 
          .then(res => {
            setUserId(res.data.userId);
          })
          .catch(err => {
            console.error(err);
          });
      }, []); 

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validation(values);
        if (!Object.keys(errors).length) {
            console.log('success');
            axios.post('http://localhost:8801/login', values)
                .then( res => { 
                    setUserId(res.data.userId);  
                    navigate('/main')})
                .catch( err => { console.log(err) })
        } else {
            setErrors(errors);
            console.log('errors');
            alert("Invalid Email or Password")
        }
    }
    
    const handleInput = (e) => {
        const {name, value} = e.target;
        setValues({...values,[name]: value});
    }
  return (
    <div className="LOGIN">
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Jost:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
         <div>
                <h1>Login</h1>
             <form onSubmit={handleSubmit} class="form">
                 <div>
                    <label  class="email" >Email Address</label>
                    <input type="email" name='email'
                         placeholder="Enter email"  
                         onChange={handleInput}
                         ></input>
                        <div class="err">{errors.email}</div>
                         {/* i can do "required" but its cleaner if i got some error popping out than using "required" tho */}
                 </div>
                 <div>
                    <label class="password" >Password</label>
                    <input type="password"  name='password'
                    placeholder="Enter password" 
                    onChange={handleInput}
                    ></input>
                   <div class="err">{errors.password}</div>
                    {/* i can do "required" but its cleaner if i got some error popping out than using "required" tho */}
                 </div>
                    <div>
                        <button type="submit">Login</button>
                        <p>You agree to our terms and policies.</p>
                        <span>Don't have an account? <a href="/register">Register</a></span>
                    </div>
             </form>
        </div>
    </div>
  )
}

export default Login
