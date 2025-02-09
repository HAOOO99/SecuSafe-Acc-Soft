
import { useState,useEffect } from 'react'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import '../Dashboardpage.css'; // Import the CSS file

export default function DashboardPage(){
    const {name}  = useParams();
    const [PItargetA,setPItargetA] = useState(0)
    const [PItargetB,setPItargetB] = useState(0)
    const [CItargetA,setCItargetA] = useState(0)
    const [CItargetB,setCItargetB] = useState(0)
    const [currentPI, setCurrentPI] = useState(0)
    const [currentCI, setCurrentCI] = useState(0)

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
          targetA: 0,
          targetB: 0,
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
            targetA: CItargetA,
            targetB: CItargetB,
            },
        ]);
        }, [currentPI,currentCI,PItargetA, PItargetB, CItargetA, CItargetB]);

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
            setCItargetA(data.targets[0].CItargetA)
            setCItargetB(data.targets[0].CItargetB)

            console.log(data.targets[0]["PItargetA"])
            
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
                
                    {progressData.map((item, index) => (
                        <Row
                            key={index}
                            className="my-4 p-3 border rounded shadow-sm"
                            style={{ backgroundColor: '#f8f9fa' }}
                        >
                            <Col xs={12}>
                                <h6>{item.title}</h6>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        ${item.current}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                        Target A: ${item.targetA} &nbsp; Target B: ${item.targetB}
                                    </div>
                                </div>
                                
                                {item.current< item.targetA ? 
                                    <ProgressBar className="my-2">
                                       <ProgressBar
                                       now={(item.current / item.targetA) * 100}
                                       variant="primary"
                                    //    label={`Target A: ${((item.current / item.targetA) * 100).toFixed(1)}%`}
                                       key={1}
                                       className="custom-progress-bar"
                                     /> 
                                     </ProgressBar> :  
                                     <ProgressBar className="my-2">
                                     <ProgressBar
                                        now={(item.targetA/ item.targetB) * 100}
                                        variant="primary"
                                        label={`Target A 100% `}s
                                        key={2}
                                        className="custom-progress-bar"
                                    />
                                    <ProgressBar
                                        now={((item.current - item.targetA) / item.targetB) * 100}
                                        variant="info"
                                        // label={`Target B: ${((item.current / item.targetB) * 100).toFixed(1)}%`}
                                        key={3}
                                        className="custom-progress-bar"
                                    />
                                    </ProgressBar>
                                    
                                }
                            </Col>
                        </Row>
                    ))}
                </Container>

                </div>
            </div>
        </main>

        
    );
}