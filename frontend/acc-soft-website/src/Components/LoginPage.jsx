import { useState } from 'react'
import { Container, Form, Card } from 'react-bootstrap'
import {  Modal, Button, Input, Typography} from 'antd';

// import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signOut
// } from "firebase/auth";

export default function LoginPage() {
  const { Title } = Typography;
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [email,setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [error, setError] = useState(false); // Track error state
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChange = (text) => {
    console.log('onChange:', text);
    setOTP(text)
    setError(false); // Reset error when the user types
    
  };
  // const onInput = (value) => {
  //   console.log('onInput:', value);
  // };
  const sharedProps = {
    onChange,
    // onInput,
  };

  const handleOk = async (e) => {
    
    console.log(otp);
    try{
      const response = await fetch('https://secusafe-backend-production.up.railway.app/login/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({"email":email,"otp":otp}), // Send form data
      });

      const data = await response.json();
      console.log(data)

      if (data.status === 'failed'){
        alert("verification code is wrong, please try again");
        setOTP("")
        setError(true); // Set error to true
      }

      else if (data.status === "success") {
        setError(false); // Reset error if successful
        handleCancel();
        console.log('Navigating to / ...');
        // ✅ Set token with expiration timestamp (30 seconds)
        const now = new Date();
        const expiryDate = new Date(now.getTime() + 24*60*60 * 1000); // 30 seconds from now

        localStorage.setItem("access_token", data.token);
        localStorage.setItem("user", data.user.username);
        localStorage.setItem("token_expiry", expiryDate.toISOString());

        navigate('/');
        // window.history.replaceState(null, '', '/'); // Replace the current entry in the history stack
        console.log(localStorage);
        alert(`Login successful! Welcome, ${data.user.username }`);
        
        
      }
    }
    catch(error){
      console.log(error.message);
      alert(error.message);
    }
    
    
  };
  const handleCancel = () => {
    setOTP("");
    onChange("");
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const {name, value} = e.target
    console.log(name,value)
    setFormData((prev) => ({...prev,[name]: value}));

  }

//   const sendVerificationEmail = async (email) => {
//     const response = await fetch("https://your-backend.com/send-email/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//     });

//     const data = await response.json();
//     alert(data.message);
// };

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
    console.log(formData)
    const response = await fetch('https://secusafe-backend-production.up.railway.app/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(formData), // Send form data
    });

    const data = await response.json();
    console.log(data)

    if (data.status === "success") {
      alert("Email Verification code send successfully!")
      setEmail(data.email);
      setIsModalOpen(true);
      
    } else {
      alert( 'Login failed');
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

          <Form >
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
            <Button variant="primary"   onClick={handleSubmit} >
              Login
            </Button>
          </div>

          <Modal title="Email Verification" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Title level={5}>Please find your verification code in your email Inbox</Title>
            <Input.OTP length={6} {...sharedProps} status={error ? "error" : ""}/>
            
          </Modal>
              
            
          </Form>
        </Card.Body>
      </Card>
    </Container>
  {/* // </div> */}
  </main>
  )
}
