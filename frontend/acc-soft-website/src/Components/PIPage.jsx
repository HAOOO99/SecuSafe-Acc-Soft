import { useState,useEffect } from 'react'
import { Table ,Container, Button, Offcanvas, Form ,Row, Col,  } from 'react-bootstrap';
import FilterBar from './FilterBar';

import NavBar from './NavBar';
import { useParams } from 'react-router-dom';

import { w3cwebsocket as W3CWebSocket } from 'websocket';
const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/comments/');

export default function PIPage(){
    
    const {name}  = useParams();
    const [show, setShow] = useState(false); // State to control offcanvas visibility
    const [flag, setFlag] = useState(false); // state to control flag showing in filter bar

    const [PIs, setPIs] = useState([]);
    
    const [totalUSD, setTotalUSD] = useState(0);
    const [totalAUD, setTotalAUD] = useState(0);

    // const [tempUSD,setTempUSD] = useState(0);
    
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [years, setYears] = useState([]); // State to store years
    const [chooseYear, setChooseYear] = useState(new Date().getFullYear()); // State to store selected year
    const [comments, setComments] = useState({});
    const [dataChanged, setDataChanged] = useState(false); // State to track data changes refresh page after data changes
    const [suppliers, setSuppliers] = useState([])
    
    const [formData, setFormData] = useState({
        company_name: name,
        supplier_name: name,
        PI_number: '',
        date: new Date().toISOString().split('T')[0],
        USD: 0,
        // AUD: 0,
        AUD_local: 0,
        AUD_counted: false,
        discount: 0,
        comment: '',
        link: '',
    })

    useEffect(() => {

        showPI();
        getValues();
        showYears();
        
        // Set up polling to fetch data every 10 seconds
        // const interval = setInterval(() => {
        //     showPI();
        //     getValues();
        // }, 5000); // 10 seconds

        // // Clear interval on component unmount
        // return () => clearInterval(interval);
        }, [chooseYear,dataChanged]);
    
    const handleUpdate = (piNumber, comment) => {
        updateComment(piNumber, comment);
    }

    useEffect(() => {
        client.onopen = () => {
          console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
          const dataFromServer = JSON.parse(message.data);
          setComments((prevComments) => ({
            ...prevComments,
            [dataFromServer.PI_number]: dataFromServer.comment,
          }));
        };
      }, []);
    
    async function updateComment(piNumber, comment) {
        const config = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({"PI_number": piNumber, "comment":comment}),
        };
    
        try {
            const response = await fetch("http://127.0.0.1:8000/pi/update?brand="+name , config);
            const data = await response.json();
        
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }
            console.log(123123123,data)
            setDataChanged(!dataChanged);
            console.log(dataChanged)
            // setYears(data["total_years"])
            return data;
        } catch (e){
            console.log(e);
        }

    }

    const handleCommentChange = (e, piNumber) => {
        setComments({
          ...comments,
          [piNumber]: e.target.value,
        });
      };

    async function showYears(){
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch("http://127.0.0.1:8000/pi/years?brand="+name , config);
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

    async function getValues(){
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
                setTotalUSD(0);
                setTotalAUD(0);
            }
            else{
                setTotalUSD(data.total_values[0].USD)
                setTotalAUD(data.total_values[0].AUD)
            }
            
            return data;
        } catch (e){
            console.log(e);
        }
    }

    async function showPI() {
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            console.log(name, chooseYear)
            const response = await fetch("http://127.0.0.1:8000/pi?brand="+name+"&year="+chooseYear, config);
            const data = await response.json();
            console.log(data)
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }
            setPIs(data.PIs)
            const initialComments = data.PIs.reduce((acc, pi) => {
                acc[pi.PI_number] = pi.comment || '';
                return acc;
              }, {});
              console.log(initialComments)
              setComments(initialComments);
            
            return data;
        } catch (e){
            console.log(e);
        }
    }
    
    const handleChange = (e) => {          
        const { name, value, type, checked } = e.target;
        console.log(name, value, type, checked)
        setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
        });
        
    }

    // Function to handle adding a new PI
    const addNewPI = async (e) => {
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
        const response = await fetch("http://127.0.0.1:8000/pi/add?brand="+name, config);
        const data = await response.json();
        console.log(1111111,data)
        if (data.status === 'success') {
            alert("New Pi added successfully!")
            showPI(); // Re-fetch PI data
            getValues(); // Re-fetch total values
            handleClose();
        } else {
            alert(data.msg);
        }
        } catch (e) {
        console.log(e);
        }
    }

    const handleClose = () => (setShow(false),setFormData({
        company_name: name,
        supplier_name: name,
        PI_number: '',
        date: new Date().toISOString().split('T')[0],
        USD: 0,
        // AUD: 0,
        AUD_local: 0,
        AUD_counted: false,
        discount: 0,
        comment: '',
        link: '',
    }));
    const handleShow = () => (setShow(true),showSuppliers());

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

    // Filter PIs based on search query
    const filteredPIs = PIs.filter((PI) =>
        PI.supplier_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        PI.PI_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        PI.date.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const tempUSDAmount = filteredPIs.reduce((sum, PI) => sum + parseFloat(PI.USD)-parseFloat(PI.discount), 0);
    const tempAUDAmount = filteredPIs.reduce((sum, PI) => sum +  (PI.AUD_counted ? parseFloat(PI.AUD_local): 0) , 0);

    console.log(tempAUDAmount);

    return (
        <main className="py-1">
            <div style={{display: 'flex'}}> 
                <NavBar />
                <div  style={{ flex: 1, padding: '20px', overflowY: 'auto', marginLeft: '250px' }}>
                    <Container>
                    <h3 key="title" className="text-center mb-5">PI Information for {name}</h3>
                    <FilterBar 
                    years = {years} 
                    chooseYear={chooseYear} 
                    setChooseYear={setChooseYear}
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery}
                    flag={flag}/>
                    <hr />

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Supplier Name</th>
                            <th>PI Number</th>
                            <th>PI Date</th>
                            <th>USD </th>
                            {/* <th>AUD </th> */}
                            <th>AUD</th>
                            <th>Discount</th>
                            <th>Comment</th>
                            <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredPIs.map((PI) => (
                            
                            <tr>
                            <td>{PI.supplier_name}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{PI.PI_number}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{PI.date}</td>
                            <td>{PI.discount > 0 ? `${PI.USD} - ${PI.discount}` : PI.USD}</td>
                            {/* <td>{PI.AUD}</td> */}
                            {PI.AUD_counted || PI.AUD_local == 0 ? <td >{PI.AUD_local}</td> :<td style={{ color: 'blue' }}>{PI.AUD_local}</td>}
                            <td>{PI.discount}</td>
                            <td > <div className="d-flex align-items-center mb-1">
                                    <Form.Control as="textarea" value={comments[PI.PI_number]} className="me-2"
                                    onChange={(e) => handleCommentChange(e, PI.PI_number)} 
                                    />
                                    
                                </div>
                                <Button variant="outline-secondary" size="sm" onClick={() => handleUpdate(PI.PI_number,comments[PI.PI_number])}>Update</Button>
                            </td>
                            <td>
                                <a href={PI.link.startsWith('http') ? PI.link : `https://${PI.link}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"> {PI.link}</a></td>
                            </tr>

                        ))}
                        </tbody>
                        
                        </Table>
                        <div className="text-center mt-3">
                        <h5>Total USD Value: ${Number(tempUSDAmount.toFixed(2)).toLocaleString()}</h5>
                        {/* <h5>Test: ${tempUSDAmount}</h5>s */}
                        <h5>Total AUD Value: ${Number(tempAUDAmount.toFixed(2)).toLocaleString()}</h5>
                        </div>
                    <div className="text-center mb-5">
                        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                            <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Add New PI </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Form>
                                    <Row >
                                        <Col >
                                        <Form.Label column >Supplier</Form.Label>
                                        </Col>
                                        <Col xs={9}>
                                        <Form.Select defaultValue={formData.supplier_name} name='supplier_name'
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
                                    <Form.Label column >PI Number</Form.Label>
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Control 
                                        type="text" 
                                        name='PI_number' 
                                        placeholder="Enter PI number" 
                                        value={formData.PI_number}
                                        onChange={handleChange}/>
                                    </Col>
                                    
                                </Row>
                                <br />
                                <Row>
                                    <Form.Label column md={2}>Date </Form.Label>
                                    <Col xs={5}><Form.Control type="date" 
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}/></Col>
                                </Row>
                                <br />
                                <Row>
                                    <Form.Label column md={1}>USD</Form.Label>
                                    <Col xs={4}>
                                    <Form.Control 
                                    type="number" 
                                    name="USD"  
                                    placeholder="0"
                                    value={formData.USD}
                                    onChange={handleChange}/></Col>
                                    <Form.Label column md={2}>Discount</Form.Label>
                                    <Col xs={4}>
                                    <Form.Control
                                    type="number"
                                    name="discount"
                                    placeholder='0' 
                                    value={formData.discount}
                                    onChange={handleChange}>

                                    </Form.Control></Col>
                                </Row>
                                <br />
                                {/* <Row>
                                    <Form.Label column md={2}>AUD</Form.Label>
                                    <Col xs={4}>
                                    <Form.Control 
                                    type="number"
                                    name="AUD"  
                                    placeholder='0' 
                                    value={formData.AUD}
                                    onChange={handleChange}/></Col>
                                    
                                </Row>
                                <br /> */}
                                <Row>
                                    <Form.Label column md={2}>AUD </Form.Label>
                                    <Col xs={4}>
                                    <Form.Control 
                                    type="number" 
                                    name="AUD_local" 
                                    placeholder='0'  
                                    value={formData.AUD_local}
                                    onChange={handleChange}/>
                                    </Col>
                                    <Col xs={4}>
                                    <Form.Check 
                                    type="checkbox" 
                                    label="Counted to Target"
                                    name="AUD_counted" 
                                    value={formData.AUD_counted}
                                    onChange={handleChange}/></Col>
                                </Row>
                                <br />

                                <Row>
                                <Col>
                                    <Form.Label column>Comment :</Form.Label>
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Control
                                        as="textarea"
                                        name="comment"
                                        placeholder="Enter Comment"
                                        value={formData.comment}
                                        onChange={handleChange}
                                        />
                                    </Col>
                                    </Row>
                            <br />
                            <Row >
                                    <Col >
                                    <Form.Label column >PI Link :</Form.Label>
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Control type="text" name="link"
                                                    placeholder="Enter Link"
                                                    value={formData.link}
                                        onChange={handleChange}/>
                                    </Col>
                                    
                                </Row>
                                <br />
                                <Button variant="primary" type="submit" onClick={addNewPI}>
                                    ADD
                                </Button>
                                </Form>
                            </Offcanvas.Body>
                        </Offcanvas>
                        <Button onClick={handleShow} >Add new PI</Button>
                    </div>
                    </Container>
                </div>
            </div>
        </main>
    );
}