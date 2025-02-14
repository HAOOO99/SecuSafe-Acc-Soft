import React, { useState, useEffect } from 'react';
import { Container, Button, Card } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import NavBar from './NavBar';
import { useNavigate } from "react-router-dom";


export default function Brands(){
    const [brands,setBrands] = useState([])

    const navigate = useNavigate();
   
    React.useEffect(() => {
        showBrand()
    }, []);

    async function showBrand() {

        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                
            },
        }

        try{
            const response = await fetch("http://127.0.0.1:8000/brands/", config);
            const data = await response.json();
            console.log(data.company)
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            } 
            
            setBrands(data.company);
            return data;
           
        } catch (e){
            console.log(e);
        }

    }
    
    const handleClick = (brandName) => {
        console.log(brandName);
        navigate('/dashboard/'+ brandName);
    }

    return (
        <main className="py-1">
            {/* <div style={{display: 'flex'}}> */}
            {/* <NavBar /> */}
            {/* <div  style={{ flex: 1, padding: '20px', overflowY: 'auto' }}> */}
            <h1 key="title" className="text-center mb-5">Welcome, {localStorage.getItem("user")}.</h1>
            <h3 key="title" className="text-center mb-5">Our Brands</h3>
            <Container>
                <Row key="row" >
                {brands.map((brand) => (
                    <Col key={`${brand.name}-${brand.id}`} xs={12} md={4} className="mb-4">
                    <Card >
                        <Card.Body>
                        <Card.Title className="text-center">{brand.name}</Card.Title>
                        {/* {brand.image && (
                            <Card.Img 
                            variant="top" 
                            src={brand.image} 
                            alt={brand.name}
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                        )} */}
                        <div style={{display:'flex',justifyContent: 'center'}}>
                        <Button variant="primary" className="mt-3"
                        onClick = {()=> handleClick(brand.name)}>Jump to {brand.name} Page</Button>
                        </div>
                        
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
                </Row>
            </Container>
        </main>
        
    );
}