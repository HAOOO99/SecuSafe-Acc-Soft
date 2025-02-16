import { useState } from 'react'
import { Container, Form, Button, Card } from 'react-bootstrap'
// import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

export default function LoginPage() {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const {name, value} = e.target
    console.log(name,value)
    setFormData((prev) => ({...prev,[name]: value}));

  }

//   onAuthStateChanged(auth, (currentUser) => {
//     if (currentUser !== null){
//         setUser(currentUser);
//         console.log(currentUser.email)
//         // setCookie('email', currentUser.email, { path: '/' });
//         // setCookie("shoppingCart","",{path:'/'});
//     } 
// });

  const handleSubmit = async (e) => {
    try{
      e.preventDefault()
      // Here you would typically handle the login logic

    //   const user = await signInWithEmailAndPassword(
    //     auth,
    //     formData.get('email'),
    //     formData.get('password')
    // );
    const form = new FormData();
    form.append('username',formData.username);
    form.append('password',formData.password)
    const response = await fetch('http://127.0.0.1:8000/login/', {
      method: 'POST',
      body: form, // Send form data
    });

    const data = await response.json();
    console.log(data)
    if (data.status === "success") {
      console.log('Navigating to / ...');
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user",data.user.username);
      navigate('/');
      // window.history.replaceState(null, '', '/'); // Replace the current entry in the history stack
      console.log(localStorage);
      alert(`Login successful! Welcome, ${data.user.username }`);
      
    } else {
      alert(data.msg || 'Login failed');
    }
    }
    catch(error){
      console.log(error.message);
      alert(error.message);
    }
    
  }

  return (
    <main className="py-5">
    <Container className="d-flex justify-content-center align-items-center">
    {/* <div className="d-flex justify-content-center align-items-center"> */}
      <Card style={{ width: '30rem' }}>
        <Card.Body>
        <Card.Title style={{textAlign: 'center'}}>Welcome to Account Software</Card.Title>

          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail"  >
            <Form.Label>Username: </Form.Label>
            <Form.Control 
              // type="email" 
              // placeholder="Enter Email"
              required
              name="username"
              value={formData.email}
              onChange={handleChange}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              required
              name="password"
              value={formData.password} 
              onChange={handleChange}
              />
          </Form.Group>

          <div style={{display:'flex',justifyContent: 'center'}}>
            <Button  variant="primary"  type="submit" >
              Login
            </Button>
          </div>
          
            
          </Form>
        </Card.Body>
      </Card>
    </Container>
  {/* // </div> */}
  </main>
  )
}
