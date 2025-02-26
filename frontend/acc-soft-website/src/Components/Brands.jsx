import React, { useState } from 'react';
import { Container } from 'react-bootstrap'

import { Card } from 'antd';

import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col';

// import NavBar from './NavBar';
import { useNavigate } from "react-router-dom";

import AJAX from '../assets/ajax.jpg';
import AKUVOX from '../assets/akuvox.jpg';
import DAHUA from '../assets/dahua.jpg';
import KONEC from '../assets/konec.jpg';
import NightSabre from '../assets/nightsabre.jpg';
import UNIARCH from '../assets/uniarch.jpg';
import UNV from '../assets/unv.jpg';
import VIVOTECK from '../assets/vivotek.jpg';
import WITEK from '../assets/wi-tek.jpg';
import ZKTECO from '../assets/zkteco.jpg';


export default function Brands(){
    
    const { Meta } = Card;

    function ImageAdapter(props){
        // const image = props.name;
        switch (props.image.name){
            case 'AJAX': return <img src={AJAX} alt="AJAX"/>
            case 'AKUVOX': return <img src={AKUVOX} alt="AKUVOX"/>
            case 'DAHUA':  return <img src={DAHUA} alt="DAHUA"/>
            case 'Konec':  return <img src={KONEC} alt="KONEC"/>
            case 'NightSabre':  return <img src={NightSabre} alt="NightSabre"/>
            case 'UNIARCH':  return <img src={UNIARCH} alt="UNIARCH"/>
            case 'UNV':  return <img src={UNV} alt="UNV"/>
            case 'VIVOTEK':  return <img src={VIVOTECK} alt="VIVOTECK"/>
            case 'WI-TEK':  return <img src={WITEK} alt="WITEK"/>
            case 'ZKTeco':  return <img src={ZKTECO} alt="ZKTECO"/>
            default: <></>
        }

    }

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
            const response = await fetch("https://alert-celebration-production.up.railway.app/brands/", config);
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
           
            <h1 key="title" className="text-center mb-5">Welcome, {localStorage.getItem("user")}.</h1>
            <h3 key="title" className="text-center mb-5">Our Brands</h3>
            <Container>
                <Row key="row" >
                    {console.log(brands)}
                {brands.map((brand) => (
                    <Col key={`${brand.name}-${brand.id}`} xs={10} md={3} className="mb-3">
                        <Card
                            hoverable
                            style={{
                            width: 240,
                            }}
                            onClick = {()=> handleClick(brand.name)}
                            cover={<ImageAdapter image={brand}></ImageAdapter>}
                        >
                            <Meta title={brand.name}  />
                        </Card>
                    </Col>
                ))}
                </Row>
            </Container>
        </main>
        
    );
}