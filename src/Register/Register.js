import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Rvalidation from './RegisterValidation';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();
    const errors = Rvalidation(values);
    if (!Object.keys(errors).length) {
        console.log('Form submitted');
        axios.post('http://localhost:8801/register', values)
            .then( res => { navigate('/')})
            .catch( err => { console.log(err) })
    } else {
        setErrors(errors);
        console.log('Form has errors');
    }
}
    
    const handleInput = (e) => {
        const {name, value} = e.target;
        setValues({...values,[name]: value});
    }
  return (
    <div className="REGISTER">
         <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Jost:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
         <div>
                <h1>Register</h1>
             <form onSubmit={handleSubmit} class="form">
                 <div>
                    <label class="name">Name</label>
                     <input type="name" name='name'
                     placeholder="Enter Name" 
                     onChange={handleInput}
                     ></input>
                      <div class="err">{errors.name}</div>
                 </div>
                 <div>
                 <label  class="email" >Email Address</label>
                    <input type="email"  name='email'
                         placeholder="Enter email"  onChange={handleInput}
                         ></input>
                        <div class="err">{errors.email}</div>
                        {/* i can do "required" but its cleaner if i got some error popping out than using "required" tho */}
                 </div>
                 <div>
                    <label htmlFor="password">Password</label>
                    <input type="password"  name='password'
                    class="password" 
                    placeholder="Enter password" onChange={handleInput}></input>
                   <div class="err">{errors.password}</div>
                    {/* i can do "required" but its cleaner if i got some error popping out than using "required" tho */}
                 </div>
                    <div>
                        <button type="submit" >Register</button>
                        <p>You are agree to our terms and policies</p>
                        <span>Already have an account? <a href="/">Login</a></span>
                    </div>
             </form>
        </div>
    </div>

  )
}

               

export default Register
