import { useState,useEffect } from 'react'
import { Table ,Container, Button, Offcanvas, Form ,Row, Col,  } from 'react-bootstrap';
import FilterBar from './FilterBar';

import NavBar from './NavBar';
import { useParams } from 'react-router-dom';

import { w3cwebsocket as W3CWebSocket } from 'websocket';
const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/comments/');

export default function CIPage(){
    const {name} = useParams();
    const [flag, setFlag] = useState(true);//state to control flag showing in filter bar
    const [show, setShow] = useState(false); // State to control offcanvas visibility

    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [years, setYears] = useState([]); // State to store all years
    const [ciFilters, setciFilters] = useState([]) // State to store POs
    const [chooseYear, setChooseYear] = useState(new Date().getFullYear()); // State to store selected year
    const [chooseCi,setChooseCi] = useState("");
    const [CIs, setCIs] = useState([]); // State to store CIs
    
    const [piUSD, setPIUSD] = useState(0);
    const [piAUD, setPIAUD] = useState(0);
    const [ciUSD, setCIUSD] = useState(0);
    const [ciAUD, setCIAUD] = useState(0);

    const [suppliers, setSuppliers] = useState([])
    
    const [formData, setFormData] = useState({
        company_name:name,
        supplier:name,
        PO_number:"",
        CI_number:"",
        date:new Date().toISOString().split('T')[0],
        USD:0,
        AUD:0,
        Freight:0
    }); // State to store form data

    const filteredCIs = CIs.filter((CI) =>
        CI.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        CI.PO_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // CI.date.toLowerCase().includes(searchQuery.toLowerCase())  ||
        CI.CI_no.toLowerCase().includes(searchQuery.toLowerCase()) 
    );

    const tempUSDCI = filteredCIs.reduce((sum,CI)=> sum + parseFloat(CI.value_USD),0);
    const tempAUDCI = filteredCIs.reduce((sum, CI) => sum + parseFloat(CI.value_AUD),0);

    useEffect(() => {
        fetchCIs();
        fetchCIValues();
        getPIValues();
        showYears();
        selectCIs();
    }, [chooseYear,chooseCi]);

    async function showYears(){
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch("http://127.0.0.1:8000/ci/years?brand="+name , config);
            const data = await response.json();
            
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }
            console.log(data)
            setYears(data["total_years"])
            return data;
        } catch (e){
            console.log(e);
        }
    }

    //CIS in filter bar
    async function selectCIs(){
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch("http://127.0.0.1:8000/ci/cis?brand="+name+"&year="+chooseYear , config);
            const data = await response.json();
            
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }
            // console.log(123123123123,data)
            setciFilters(data.category_cis)
            return data;
        } catch (e){
            console.log(e);
        }
    }

    //all CIs
    async function fetchCIs(){
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch("http://127.0.0.1:8000/ci?brand="+name+"&year="+chooseYear+"&CI_no="+chooseCi, config);
            const data = await response.json();
            
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }
            // console.log(11111111,data.CIs);
            setCIs(data.CIs);
            
            return data;
        } catch (e){
            console.log(e);
        }

    };

    async function getPIValues(){
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch("http://127.0.0.1:8000/pi/values?brand="+name+"&year="+chooseYear , config);
            const data = await response.json();
            
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }
            console.log(data.total_values)
            if (data.total_values === undefined || data.total_values.length === 0){
                setPIUSD(0);
                setPIAUD(0);
            }
            else{
                setPIUSD(data.total_values[0].USD)
                setPIAUD(data.total_values[0].AUD)
            }
            
            return data;
        } catch (e){
            console.log(e);
        }
    }

    async function fetchCIValues(){
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try{
            
            const response = await fetch("http://127.0.0.1:8000/ci/values?brand="+name+"&year="+chooseYear , config);
            const data = await response.json();
            
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }
            // console.log(22222222,data.total_CI);

            setCIUSD(data.total_CI[0].total_usd);
            setCIAUD(data.total_CI[1].total_aud);
            
            return data;
        } catch (e){
            console.log(e);
        }
    }

    async function showSuppliers() {
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch (`http://127.0.0.1:8000/supplier?brand=${name}`,config);
            const data = await response.json();
            console.log(data["suppliers"])
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }
            setSuppliers(data["suppliers"])
            return data
        }
        catch (e){
            console.log(e)
        }
    }

    const handleClose = () => (setShow(false),setFormData({
        company_name:name,
        supplier:name,
        PO_number:"",
        CI_number:"",
        date:new Date().toISOString().split('T')[0],
        USD:0,
        AUD:0,
        Freight:0
    }));
    const handleShow = () => (setShow(true),showSuppliers());

    const handleChange = (e) => {          
        const { name, value } = e.target;
        console.log(name, value,)
        setFormData({
        ...formData,
        [name]:  value,
        });
        
    }

    const showForm=() => {
        alert(JSON.stringify(formData))
    }

    const addNewCI = async (e) =>  {

        e.preventDefault();
        // console.log(form)
        const config = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            };
    
            try {
            const response = await fetch("http://127.0.0.1:8000/ci/addCI?brand="+name, config);
            const data = await response.json();
            console.log(data)
            if (data.status === 'success') {
                alert("New CI added successfully!");
                fetchCIs();
                fetchCIValues();
                handleClose();
            } else {
                alert("Failed to add new CI");
            }
            } catch (e) {
            console.log(e);
            }
  };
 
    return (
        <main className="py-1">
            <div style={{display: 'flex'}}> 
                <NavBar />
                <div  style={{ flex: 1, padding: '20px', overflowY: 'auto', marginLeft: '250px' }}>
                    <Container>
                    <h3 key="title" className="text-center mb-5">CI Information for {name}</h3>
                    <FilterBar 
                    years = {years} 
                    chooseYear={chooseYear} 
                    CIs={ciFilters}
                    chooseCI={chooseCi}
                    setChooseYear={setChooseYear}
                    setChooseCi={setChooseCi}
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery}
                    flag={flag}/>
                    <hr />

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>PO Number</th>
                            <th>CI Number</th>
                            <th>Supplier Name</th>
                            <th>Date</th>
                            <th>Value(USD) </th>
                            <th>Value(AUD) </th>
                            <th>Freight</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredCIs.map((CI) => (
                            
                            <tr>
                            <td>{CI.PO_no}</td>
                            <td>{CI.CI_no}</td>
                            <td>{CI.supplier}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{CI.date}</td>
                            <td>{CI.value_USD}</td>
                            <td>{CI.value_AUD}</td>
                            <td>{CI.freight}</td>
                            </tr>

                         ))} 
                        </tbody>
                        
                        </Table>
                        <Row>
                            <Col md={{ span: 2, offset: 2 }}>
                                <h5>Total PI:</h5>
                                <h5>Total CI: </h5>
                                <h5>GAP: </h5>
                            </Col>
                            <Col md={{ span: 3 }}>
                                <h5>${piUSD} USD</h5>
                                <h5>${tempUSDCI.toFixed(2)} USD</h5>
                                <h5>${piUSD-tempUSDCI} USD</h5>
                            </Col>
                            <Col md={{ span: 3, offset: 0 }}>
                                <h5>${piAUD} AUD</h5>
                                <h5>${tempAUDCI.toFixed(2)} AUD</h5>
                                <h5>${piAUD-tempAUDCI} AUD</h5>
                            </Col>
                        </Row>
                    
                    <div className="text-center mb-5">
                        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                            <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Add New CI </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Form>
                                    <Row >
                                        <Col >
                                        <Form.Label column >Supplier</Form.Label>
                                        </Col>
                                        <Col xs={9}>
                                        <Form.Select defaultValue={formData.supplier} name='supplier_name'
                                                    onChange={handleChange} >
                                        {suppliers.map((supplier, index) => (
                                                
                                                <option key={index} value={supplier}>{supplier}</option>
                                            ))}
                                                 </Form.Select>
                                        </Col>
                                        
                                    </Row>
                                    <br />

                                    <Row >
                                    <Col >
                                    <Form.Label column >PO Number</Form.Label>
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Control 
                                        type="text" 
                                        name='PO_number' 
                                        placeholder="Enter PO number" 
                                        value={formData.PO_number}
                                        onChange={handleChange}
                                        />
                                    </Col>
                                    
                                </Row>
                                <br />
                                <Row >
                                    <Col >
                                    <Form.Label column >CI Number</Form.Label>
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Control 
                                        type="text" 
                                        name='CI_number' 
                                        placeholder="Enter CI number" 
                                        value={formData.CI_number}
                                        onChange={handleChange}
                                        />
                                    </Col>
                                    
                                </Row>
                                <br />
                                <Row>
                                    <Form.Label column md={2}>Date </Form.Label>
                                    <Col xs={5}><Form.Control type="date" 
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    /></Col>
                                </Row>
                                <br />
                                <Row>
                                    <Form.Label column md={3}>Value(USD)</Form.Label>
                                    <Col xs={4}>
                                    <Form.Control 
                                    type="number" 
                                    name="USD"  
                                    placeholder="0"
                                    value={formData.USD}
                                    onChange={handleChange}
                                    /></Col>
                                    
                                </Row>
                                <br />
                                <Row>
                                    <Form.Label column md={3}>Value(AUD)</Form.Label>
                                    <Col xs={4}>
                                    <Form.Control 
                                    type="number"
                                    name="AUD"  
                                    placeholder='0' 
                                    value={formData.AUD}
                                    onChange={handleChange}
                                    /></Col>
                                </Row>
                                <br />
                                <Row>
                                    <Form.Label column md={2}>Freight </Form.Label>
                                    <Col xs={4}>
                                    <Form.Control 
                                    type="number" 
                                    name="Freight" 
                                    placeholder='0'  
                                    value={formData.Freight}
                                    onChange={handleChange}
                                    />
                                    </Col>
                                   
                                </Row>
                                <br />
 
                                <Button variant="primary" type="submit" onClick={addNewCI}>
                                    ADD
                                </Button>
                                </Form>
                            </Offcanvas.Body>
                        </Offcanvas>
                        <Button onClick={handleShow} >Add new CI</Button>
                    </div>
                    </Container>
                </div>
            </div>
        </main>

    );

}