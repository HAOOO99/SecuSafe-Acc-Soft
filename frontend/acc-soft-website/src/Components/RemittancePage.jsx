import { useState,useEffect } from 'react'
import { Table ,Container, Button, Offcanvas, Form ,Row, Col, Modal} from 'react-bootstrap';
import FilterBar from './FilterBar';

import NavBar from './NavBar';
import { useParams } from 'react-router-dom';


export default function RemittancePage(){  
    const {name}  = useParams();
    const [show, setShow] = useState(false); // State to control offcanvas visibility
    const [flag, setFlag] = useState(false); // state to control flag showing in filter bar
    const [showModal, setShowModal] = useState(false); // State to control offcanvas visibility


    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [years, setYears] = useState([]); // State to store all years
    const [chooseYear, setChooseYear] = useState(new Date().getFullYear()); // State to store selected year
    const [Remittances,setRemittances] = useState([])

    const [selectedRow, setSelectedRow] = useState({});
    
    const filteredREs = Remittances.filter((Re) =>
        Re.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Re.date.toLowerCase().includes(searchQuery.toLowerCase())  ||
        Re.currency.toLowerCase().includes(searchQuery.toLowerCase()) 
    );

    const tempUSD = filteredREs.reduce((sum,Re)=> sum + (Re.currency.trim() === "USD" ? parseFloat(Re.amount): 0),0);
    const tempAUD = filteredREs.reduce((sum, Re) => sum + (Re.currency.trim() === "AUD" ? parseFloat(Re.amount):0),0);

    useEffect(() => {
        fetchRe();
        fetchYears();
    }, [chooseYear]);

    async function fetchRe(){
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch("http://127.0.0.1:8000/remittance?brand="+name+"&year="+chooseYear, config);
            const data = await response.json();
            
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }
            // console.log(11111111,data.CIs);
            setRemittances(data.REs);
            
            return data;
        } catch (e){
            console.log(e);
        }

    }

    async function fetchYears(){
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch("http://127.0.0.1:8000/remittance/years?brand="+name , config);
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

    async function update(e){

    }

    const handleShow = () => (setShow(true));
    const handleClose = () => (setShow(false));

    const handleRowClick = (row) => {
        setSelectedRow(row);
        setShowModal(true);
    };

    return (
        <main className="py-1">
        <div style={{display: 'flex'}}> 
            <NavBar />
            <div  style={{ flex: 1, padding: '20px', overflowY: 'auto', marginLeft: '250px' }}>
                <Container>
                <h3 key="title" className="text-center mb-5">Remittance for {name}</h3>
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
                        <th>Date</th>
                        <th>Bank Account</th>
                        <th>Amount </th>
                        <th>Currency </th>
                        <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                    {filteredREs.map((Re) => (
                        
                        <tr onClick={()=>handleRowClick(Re)}>
                        <td style={{ whiteSpace: "nowrap" }}>{Re.date}</td>
                        <td>{Re.bank}</td>
                        <td>{Re.amount }</td>
                        <td>{Re.currency}</td>
                        <td>{Re.status}</td>
                        </tr>

                    ))}
                    </tbody>
                    
                    </Table>
                    
                    <div className="text-center mt-3">
                    <h5>Total USD Value: ${Number(tempUSD.toFixed(2)).toLocaleString()}</h5>
                    <h5>Total AUD Value: ${Number(tempAUD.toFixed(2)).toLocaleString()}</h5>

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Item Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedRow ? (
                                    <>
                                        <p><strong>Description:</strong> {selectedRow.status}</p>
                                        <div>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                    <th>PO Number</th>
                                                    <th>Value_USD</th>
                                                    <th>Value_AUD </th>
                                                    </tr>
                                                </thead>
                                                
                                                <tbody>
                                                {/* {filteredREs.map((Re) => (
                                                    
                                                    <tr onClick={()=>handleRowClick(Re)}>
                                                    <td style={{ whiteSpace: "nowrap" }}>{Re.date}</td>
                                                    <td>{Re.bank}</td>
                                                    <td>{Re.amount }</td>
                                                    <td>{Re.currency}</td>
                                                    <td>{Re.status}</td>
                                                    </tr>

                                                ))} */}
                                                </tbody>
                                                
                                                </Table>
                                        
                                        </div>
                                    </>
                                ) : (
                                    <p>No item selected.</p>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={(e) => update(e)}>Add</Button>
                            </Modal.Footer>
                        </Modal>
                    
                    </div>
                    
                <div className="text-center mb-5">
                    <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Add New Remittance </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {/* <Form>
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
                            <Row>
                                <Form.Label column md={2}>AUD</Form.Label>
                                <Col xs={4}>
                                <Form.Control 
                                type="number"
                                name="AUD"  
                                placeholder='0' 
                                value={formData.AUD}
                                onChange={handleChange}/></Col>
                                
                            </Row>
                            <br />
                            <Row>
                                <Form.Label column md={4}>AUD from local </Form.Label>
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
                            </Form> */}
                        </Offcanvas.Body>
                    </Offcanvas>
                    <Button onClick={handleShow} >Add new Payment</Button>
                </div>
                </Container>
            </div>
        </div>
    </main>

    );
}

