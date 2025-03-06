import { useState,useEffect } from 'react'
import { Container,  Offcanvas, Form ,Row, Col,  } from 'react-bootstrap';
import {Table,Button,Input } from "antd";
import FilterBar from './FilterBar';

import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import "./styles.css"; // ✅ Import the CSS file

// import { w3cwebsocket as W3CWebSocket } from 'websocket';
// const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/comments/');

export default function CIPage(){
    const {Column} = Table;

    const [editingRow, setEditingRow] = useState(null);
    const [editedPO, setEditedPO] = useState({});

    const {name} = useParams();
    const [flag] = useState(true);//state to control flag showing in filter bar
    const [show, setShow] = useState(false); // State to control offcanvas visibility
    const [error, setError] = useState({}); 

    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [years, setYears] = useState([]); // State to store all years
    const [ciFilters, setciFilters] = useState([]) // State to store POs
    const [chooseYear, setChooseYear] = useState(new Date().getFullYear()); // State to store selected year
    const [chooseCi,setChooseCi] = useState("");
    const [CIs, setCIs] = useState([]); // State to store CIs
    
    const [piUSD, setPIUSD] = useState(0);
    const [piAUD, setPIAUD] = useState(0);
    const [, setCIUSD] = useState(0);
    const [, setCIAUD] = useState(0);

    const [suppliers, setSuppliers] = useState([])
    
    const [formData, setFormData] = useState({
        company_name:name,
        supplier:name,
        PO_number:"",
        CI_number:"",
        date:"",
        USD:'',
        AUD:'',
        Freight:''
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            const response = await fetch("https://secusafe-backend-production.up.railway.app/ci/years?brand="+name , config);
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
            const response = await fetch("https://secusafe-backend-production.up.railway.app/ci/cis?brand="+name+"&year="+chooseYear , config);
            const data = await response.json();
            
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }

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
            const response = await fetch("https://secusafe-backend-production.up.railway.app/ci?brand="+name+"&year="+chooseYear+"&CI_no="+chooseCi, config);
            const data = await response.json();
            
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }
            console.log(data)

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
            const response = await fetch("https://secusafe-backend-production.up.railway.app/pi/values?brand="+name+"&year="+chooseYear , config);
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
            
            const response = await fetch("https://secusafe-backend-production.up.railway.app/ci/values?brand="+name+"&year="+chooseYear , config);
            const data = await response.json();
            
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }

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
            const response = await fetch (`https://secusafe-backend-production.up.railway.app/supplier?brand=${name}`,config);
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

    const handleClose = () => {setShow(false);
         setFormData({
            company_name:name,
            supplier:name,
            PO_number:"",
            CI_number:"",
            date:"",
            USD:'',
            AUD:'',
            Freight:'',
        });
        setError({});
    };

    const handleShow = () => {setShow(true);
                                 showSuppliers();};

    const handleChange = (e) => {          
        const { name, value } = e.target;
        console.log(name, value,)
        setFormData({
        ...formData,
        [name]:  value,
        });
        
    }

    const addNewCI = async (e) =>  {

        e.preventDefault();
        let newErrors ={}
        // if (!formData.PO_number)  newErrors.po="PO is required!";
        if (!formData.date)  newErrors.date="Date is required!";
        if (!formData.CI_number) newErrors.ci = "CI is required";
        
        setError(newErrors);
        // console.log(NewErrors)

        if (formData.AUD.length === 0 ){
            formData.AUD = 0;
        }
        if(formData.USD.length === 0){
            formData.USD = 0;
        }
        if(formData.Freight.length === 0){
            formData.Freight = 0;
        }

        if (Object.keys(newErrors).length === 0){
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
                const response = await fetch("https://secusafe-backend-production.up.railway.app/ci/addCI?brand="+name, config);
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
        }
  };

  // ✅ Handle Input Change
    const handleInputChange = (e, record) => {
        setEditedPO({
            ...editedPO,
            [record.id]: e.target.value,
        });
    };

    // ✅ Save Changes
    const handleSave = (record) => {
        if (editedPO[record.id] !== undefined) {
            updatePO(record.id, editedPO[record.id]); // Call API or update function
        }
        setEditingRow(null);
    };
    const updatePO = async () => {

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

                    <Table 
                        dataSource={filteredCIs} 
                        rowKey={(record) => record.PO_no+"-"+record.id} 
                        bordered
                        pagination={false} // Disable pagination if not needed
                        rowClassName={(record) => (record.remittance_id === null ? "" : "faded-row")} // ✅ Apply class if remittance_id is not null
                    >
                        <Column
                            title="PO Number"
                            dataIndex="PO_no"
                            key="PO_no"
                            render={(text, record) => (
                                <div 
                                    onClick={() => setEditingRow(record.id)}
                                    style={{ padding: "2px", cursor: "pointer", minHeight: "35px", display: "flex", alignItems: "center"
                                     }}
                                >
                                    {editingRow === record.id ? (
                                        <Input
                                            value={editedPO[record.id] ?? text}
                                            onChange={(e) => handleInputChange(e, record)}
                                            onBlur={() => handleSave(record)}
                                            onPressEnter={() => handleSave(record)}
                                            autoFocus
                                            style={{ width: "100%" }}
                                        />
                                    ) : (
                                        <span>{text}</span>
                                    )}
                                </div>
                            )}
                        />
                        <Column title="Reference(CI Number)" dataIndex="CI_no" key="CI_no" />
                        <Column title="Supplier Name" dataIndex="supplier" key="supplier" />
                        <Column title="Date" dataIndex="date" key="date" />
                          
                        <Column 
                            title="Value (USD)" 
                            dataIndex="value_USD" 
                            key="value_USD"
                            render={(text) => Number(text).toLocaleString()} // ✅ Format number
                        />
                        
                        <Column 
                            title="Value (AUD)" 
                            dataIndex="value_AUD" 
                            key="value_AUD"
                            render={(text) => Number(text).toLocaleString()} // ✅ Format number
                        />
                         
                        <Column title="Freight" dataIndex="freight" key="freight" />
                    </Table>
                        <Row>
                            <Col md={{ span: 2, offset: 2 }}>
                                <h5>Total PI:</h5>
                                <h5>Total CI: </h5>
                                <h5>GAP: </h5>
                            </Col>
                            <Col md={{ span: 3 }}>
                                <h5>${Number(piUSD).toLocaleString()} USD</h5>
                                <h5>${Number(tempUSDCI.toFixed(2)).toLocaleString()} USD</h5>
                                <h5>${Number(piUSD-tempUSDCI).toLocaleString()} USD</h5>
                            </Col>
                            <Col md={{ span: 3, offset: 0 }}>
                                <h5>${Number(piAUD).toLocaleString()} AUD</h5>
                                <h5>${Number(tempAUDCI.toFixed(2)).toLocaleString()} AUD</h5>
                                <h5>${Number(piAUD-tempAUDCI).toLocaleString()} AUD</h5>
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
                                        <Col xs={8}>
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
                                        // className={error.po ? "is-invalid" : ""}
                                        onChange={handleChange}
                                        />
                                        {/* {error.po && <div className="invalid-feedback">{error.po}</div>}  */}
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
                                        className={error.ci ? "is-invalid" : ""}
                                        value={formData.CI_number}
                                        onChange={handleChange}
                                        />{error.ci && <div className="invalid-feedback">{error.ci}</div>} 
                                    </Col>
                                    
                                </Row>
                                <br />
                                <Row>
                                    <Form.Label column>Date </Form.Label>
                                    <Col xs={8}><Form.Control type="date" 
                                    name="date"
                                    value={formData.date}
                                    className={error.date ? "is-invalid" : ""}
                                    onChange={handleChange}
                                    />
                                    {error.date && <div className="invalid-feedback">{error.date}</div>} 
                                    </Col>
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
                                    <Form.Label column md={3}>Freight </Form.Label>
                                    <Col xs={4}>
                                    <Form.Control 
                                    type="number" 
                                    name="Freight" 
                                    placeholder='0'  
                                    value={ formData.Freight}
                                    onChange={handleChange}
                                    />
                                    </Col>
                                   
                                </Row>
                                <br />
 
                                <Button variant="primary"  type="primary" onClick={addNewCI}>
                                    ADD
                                </Button>
                                </Form>
                            </Offcanvas.Body>
                        </Offcanvas>
                        <Button onClick={handleShow}  type="primary">Add new CI</Button>
                    </div>
                    </Container>
                </div>
            </div>
        </main>

    );

}