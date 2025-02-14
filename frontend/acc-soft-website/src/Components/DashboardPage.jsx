
import { useState,useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Progress } from "antd";

import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import '../Dashboardpage.css'; // Import the CSS file

export default function DashboardPage(){
    const {name}  = useParams();
    const [PItargetA,setPItargetA] = useState(0)
    const [PItargetB,setPItargetB] = useState(0)
    
    const [currentPI, setCurrentPI] = useState(0)
    const [currentCI, setCurrentCI] = useState(0)

    const [currency,setCurrency] = useState("")

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // State to store current year
    
    const [progressData, setProgressData] = useState([
        {
          title: 'Total PI this year',
          current: 0,
          targetA: 0,
          targetB: 0,
        },
        {
          title: 'Total CI this year',
          current: 0,
          target:0,
        },
      ]);

    useEffect(() => {
        
        showTargets();
        getPIValues();
        getCIValues();

        // const interval = setInterval(() => {
        //     getValues();
        // }, 5000); // 10 seconds
    
        // // Clear interval on component unmount
        // return () => clearInterval(interval);
        }, []);
    
    useEffect(() => {
        setProgressData([
            {
            title: 'Total PI this year',
            current: currentPI,
            targetA: PItargetA,
            targetB: PItargetB,
            },
            {
            title: 'Total CI this year',
            current: currentCI,
            target: currentPI,
            },
        ]);
        }, [currentPI,currentCI,PItargetA, PItargetB]);

    async function getPIValues(){
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch("http://127.0.0.1:8000/pi/values?brand="+name+"&year="+currentYear , config);
            const data = await response.json();
            
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }
            console.log(data.total_values)
            setCurrentPI(data.total_values[0].USD)
            return data;
        } catch (e){
            console.log(e);
        }
    }

    async function getCIValues(){
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch("http://127.0.0.1:8000/ci/values?brand="+name+"&year="+currentYear , config);
            const data = await response.json();
            
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }
            console.log(data.total_values)
            setCurrentCI(data.total_CI[0].total_usd)
            return data;
        } catch (e){
            console.log(e);
        }
    }

    async function showTargets() {
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try{
            const response = await fetch("http://127.0.0.1:8000/target?brand=" + name , config);
            const data = await response.json();
            
            setPItargetA(data.targets[0].PItargetA)
            setPItargetB(data.targets[0].PItargetB)
            setCurrency(data.targets[0].defaultCurrency)

            console.log(data.targets[0])
            
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            } 
            
            return data;
           
        } catch (e){
            console.log(e);
        }

    }

    return (
        <main className="py-1">
            <div style={{display: 'flex'}}> 
                <NavBar />
                
                <div  style={{ flex: 1, padding: '20px', overflowY: 'auto', marginLeft: '250px' }}>
                <Container>
                <h3 key="title" className="text-center mb-5">Dashboard for {name}</h3>
                
                    
                        <Row
                            key={0}
                            className="my-4 p-3 border rounded shadow-sm"
                            style={{ backgroundColor: '#f8f9fa' }}
                        >
                            <Col xs={12}>
                                <h6>Total PI this year</h6>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                    {currency}$ {currentPI}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                        Target A: ${PItargetA} &nbsp; Target B: ${PItargetB}
                                    </div>
                                </div>
                                
                                {currentPI < PItargetA ? 
                                    <Progress
                                    percent={((currentPI/PItargetA)*100).toFixed(2) }
                                    format={() => ` Target A: ${((currentPI  / PItargetB)*100).toFixed(2)}% (${(currentPI - PItargetA)})`}
                                    percentPosition={{
                                        align: 'center',
                                        type: 'outer',
                                    }}
                                    size={[400, 15]}
                                  />
                                    :
                                    <Progress
                                    percent={((currentPI  / PItargetB)*100).toFixed(2)}
                                    success={{
                                      percent: (PItargetA / PItargetB)*100,
                                    }}
                                    format={() => ` Target A: 100 % -- Target B: ${(((currentPI-PItargetA)  / (PItargetB-PItargetA))*100).toFixed(2)}% (${(currentPI - PItargetB)})`}
                                    percentPosition={{
                                        align: 'center',
                                        type: 'outer',
                                    }}
                                    size={[400, 15]}
                                  />
                                    }
                            </Col>
                        </Row>

                        <Row
                            key={0}
                            className="my-4 p-3 border rounded shadow-sm"
                            style={{ backgroundColor: '#f8f9fa' }}
                        >
                            <Col xs={12}>
                                <h6>Total CI this year</h6>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        {currency}$ {currentCI}
                                    </div>
                                    
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                        Current PI : $ {currentPI}
                                    </div>
                                </div>
                                <Progress
                                    percent={((currentCI / currentPI)*100).toFixed(2)}
                                    format={() => ` ${((currentCI / currentPI)*100).toFixed(2)}% (${(currentCI - currentPI)})`}
                                    percentPosition={{
                                        align: 'center',
                                        type: 'outer',
                                    }}
                                    size={[400, 15]}
                                    />
                                    {/* <span style={{ fontSize: 14, fontWeight: "bold" }}>{1}% Completed</span> */}
                            </Col>
                        </Row>
                </Container>

                </div>
            </div>
        </main>

        
    );
}