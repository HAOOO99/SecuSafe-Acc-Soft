import { useState,useEffect } from 'react'
import {Container, Offcanvas, Form ,Row, Col, Modal} from 'react-bootstrap';
import FilterBar from './FilterBar';
import { Table ,Button, Select } from "antd";
import "./styles.css"; // ✅ Import CSS for styling
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';

// import { w3cwebsocket as W3CWebSocket } from 'websocket';
// const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/comments/');

export default function CNPage(){
    const {name} = useParams();
    const { Column } = Table;
    const [flag] = useState(false);//state to control flag showing in filter bar
    const [show, setShow] = useState(false); // State to control offcanvas visibility
    const [errors, setErrors] = useState({});
    const [suppliers,setSuppliers] = useState([])
    const [checkInput,setCheckInput] = useState({})


    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [years, setYears] = useState([]); // State to store all years
    const [CNs, setCNs] = useState([]) // State to store CNs
    // const [currency,setCurrency] = useState("");

    const [chooseYear, setChooseYear] = useState(new Date().getFullYear()); // State to store selected year
    const [showModal, setShowModal] = useState(false); // State to control offcanvas visibility
    // const [selectedRow, setSelectedRow] = useState(null);

    // const [supplierCN,setSupplierCN] = useState("");
    // const [received,setReceived] = useState("");
    // const [receivedCurrency, setReceivedCurrency] = useState("AUD");
    // const [ssCN, setSSCN] = useState("");
    // const [status,setStatus] = useState("");

    const [selectedRow, setSelectedRow] = useState({
        
        supplier_CN: "",
        received: '',
        received_currency: "",
        ss_CN: "",
        // status: "",
    });
    const [formData, setFormData] = useState({
        brand:name,
        supplier_name:name,
        date:"",
        description:"",
        estimateCN:'',
        estimateCurrency:"",
        CNType:"Compensation",
        status: "Pending",
    }); // State to store form data

    useEffect(() => {
        fetchCNs();
        showYears();
        getCurrency();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[chooseYear]);

    const filteredCNs = CNs.filter((CN) =>
        CN.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // CN.supplier_CN.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // CI.date.toLowerCase().includes(searchQuery.toLowerCase())  ||
        CN.description.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    
    const tempUSDEstimate = filteredCNs.reduce((sum,CN)=> 
        (CN.estimate_currency && CN.estimate_currency.trim() === "USD" && CN.estimate != null)
            ? (CN.status === "Cancelled" ? sum : sum + parseFloat(CN.estimate)) 
                : sum,
            0
        );

    const tempAUDEstimate = filteredCNs.reduce((sum, CN) => 
        (CN.estimate_currency && CN.estimate_currency.trim() === "AUD" && CN.estimate != null)
            ? (CN.status === "Cancelled" ? sum : sum + parseFloat(CN.estimate)) 
                : sum,
            0
        );

    const tempUSDReceived = filteredCNs.reduce((sum,CN)=> 
        (CN.received_currency !== null && CN.received_currency.trim() === "USD" && CN.received != null)
            ? (CN.status === "Cancelled" ? sum : sum + parseFloat(CN.received)) 
                : sum,
            0
        );
    const tempAUDReceived = filteredCNs.reduce((sum, CN) => 
        (CN.received_currency !== null && CN.received_currency.trim() === "AUD" && CN.received != null)
            ? (CN.status === "Cancelled" ? sum : sum + parseFloat(CN.received)) 
                : sum,
            0
        );
    
    async function fetchCNs() {
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch("https://secusafe-backend-production.up.railway.app/cn?brand="+name+"&year="+chooseYear , config);
            const data = await response.json();
            
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }
            console.log(data,selectedRow)
            setCNs(data.CNs)
            return data;
        } catch (e){
            console.log(e);
        }
    }

    async function showYears(){
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch("https://secusafe-backend-production.up.railway.app/cn/years?brand="+name , config);
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
    
    async function getCurrency() {
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try{
            const response = await fetch("https://secusafe-backend-production.up.railway.app/target?brand=" + name , config);
            const data = await response.json();
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                
                return;
            } 
            
            setFormData({brand:name,
                supplier_name:name,
                date:"",
                description:"",
                estimateCN:"",
                estimateCurrency:data.targets[0].defaultCurrency,
                CNType:"Compensation",
            })

            // console.log(formData.estimateCurrency)
            
           
            
            return data;
           
        } catch (e){
            console.log(e);
        }
    }

    async function update(e){
        e.preventDefault();

        console.log(11111, selectedRow)
            // Check for empty fields
        let newErrors = {};
        if (!selectedRow.supplier_CN) newErrors.supplier_CN = "Supplier CN is required!";
        if (!selectedRow.received) newErrors.received = "Received Amount is required!";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            if(selectedRow.received.length === 0){
                selectedRow.received = 0;
            }
            const config = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    brand:name,
                    id:selectedRow.id,
                    supplier:selectedRow.supplier,
                    supplierCN:selectedRow.supplier_CN,
                    received:selectedRow.received, 
                    currency:selectedRow.received_currency,
                    ssCN:selectedRow.ss_CN,
                    // status:selectedRow.status,
                })
            }
            try{
                const response = await fetch("https://secusafe-backend-production.up.railway.app/cn/update" , config);
                const data = await response.json();
                
                if (data === undefined || data.length === 0){
                    alert("Nothing is found");
                    return;
                }
                console.log(data);
                setShowModal(false);
                
                if(data["status"] === "failed"){
                    alert("CN fail to be updated");
                }
                else{
                    alert("CN has been updated");
                }
                fetchCNs();
                return data;
            } catch (e){
                console.log(e);
            }
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
            console.log(11111111,data["suppliers"])
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

    const addNewCN = async (e) =>  {
        e.preventDefault();

        let NewCNErrors = {};
        

        if (!formData.estimateCN)  NewCNErrors.estimate="Estimate CN is required!";
        if (!formData.date)  NewCNErrors.date="Date is required!";

        setCheckInput(NewCNErrors);
        if (Object.keys(NewCNErrors).length === 0) {

            if (formData.estimateCN.length === 0) {
                formData.estimateCN = 0;
            }
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
                const response = await fetch("https://secusafe-backend-production.up.railway.app/cn/addCN", config);
                const data = await response.json();
                console.log(data);
                if (data.status === 'success') {
                    alert("New CN added successfully!");
                    fetchCNs();
                    handleClose();
                } else {
                    alert("Failed to add new CN");
                }
            } catch (e) {
                console.log(e);
                }
            }
        
        }

    const handleChangeForm = (e) => {          
        const { name, value } = e.target;
        console.log(name, value)
        setFormData({
        ...formData,
        [name]:  value,
        });
        
    }

    const handleChangeSupplier = (e) =>{
        // const [name,value] = e.target;
        setSelectedRow({ ...selectedRow, supplier_CN: e.target.value });
    }

    const handleChangeaRecevied = (e) => {
        console.log(e.target.value)
        
        setSelectedRow({ ...selectedRow, received: e.target.value });
    }
    const handleChangeCurrency = (e) => {
        console.log(e.target.value)
        
        setSelectedRow({ ...selectedRow, received_currency: e.target.value });
        
    }
    const handleChangeSS = (e) => {
        // setSSCN(e.target.value)
        setSelectedRow({ ...selectedRow, ss_CN: e.target.value });
    }
    const handleChangeStatus = (e) => {
        console.log(e.target.value)
        // setStatus(e.target.value)
        setSelectedRow({ ...selectedRow, status: e.target.value });
    }

    const handleClose = () => {
                setFormData({
                    brand:name,
                    supplier_name:name,
                    description:"",
                    date:"",
                    estimateCN:"",
                    estimateCurrency:formData.estimateCurrency,
                    CNType:"Compensation"
                });
                setErrors({});
                setCheckInput({});
                setShow(false);};

    const handleShow = () => {setShow(true);showSuppliers();};
    const handleRowClick = (row) => {
        setSelectedRow(row);
        setShowModal(true);
    };

///drop down test
    const handleStatusChange = (value, record) => {
        console.log(`Status changed for ID ${record.id}: ${value}`);
        // Call API or update state
        updateStatus(record.id, value);
        // const updatedData = filteredCNs.map((item) =>
        //     item.id === record.id ? { ...item, status: value } : item
        // );
        // setCNs(updatedData);
    };
    
    const updateStatus = async (id, newStatus) => {
        // Update the status in the table's state
   
        // e.preventDefault();
        try {
            const response = await fetch(`https://secusafe-backend-production.up.railway.app/cn/status/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"brand":name,"id":id, "status": newStatus }),
            });
            
            if (!response.ok) {
                throw new Error("Failed to update status");
            }
    
            console.log(`Status updated to ${newStatus} for ID ${id}`);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <main className="py-1">
            <div style={{display: 'flex'}}> 
                <NavBar />
                <div  style={{ flex: 1, padding: '20px', overflowY: 'auto', marginLeft: '250px' }}>
                    <Container>
                    <h3 key="title" className="text-center mb-5">CN Information for {name}</h3>
                    <FilterBar 
                    years = {years} 
                    chooseYear={chooseYear} 
                    setChooseYear={setChooseYear}
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery}
                    flag={flag}/>
                    
                    <hr />
                    <Table
                        dataSource={filteredCNs}
                        rowKey={(record) => record.id}
                        bordered
                        pagination={false}
                        onRow={
                            (record) => {
                                if (record.status === "Pending" || record.status === null) {
                                    return {
                                        onClick: (event) => {
                                            // Prevent click event if clicking on the "Status" column
                                            if (event.target.closest(".status-column")) {
                                                event.stopPropagation();
                                                return;
                                            }
                                            // Otherwise, handle row click
                                            handleRowClick(record);
                                        },
                                    };
                                }
                                return {}; // Default empty object for non-clickable rows
                        }}
                        rowClassName={(record) => (record.status === null || record.status === "Pending" ? "" : "faded-row")}
                    >
                        <Column title="Date" dataIndex="date" key="date" />
                        <Column title="Supplier" dataIndex="supplier" key="supplier" />
                        <Column title="Description" dataIndex="description" key="description" />
                        <Column
                            title="Type"
                            dataIndex="type"
                            key="type"
                            
                        />
                        
                        <Column
                            title="CN Estimate"
                            dataIndex="estimate"
                            key="estimate"
                            render={(text, record) => `${Number(record.estimate).toLocaleString()} ${record.estimate_currency}`}
                        />

                        <Column
                            title="Supplier CN"
                            dataIndex="supplier_CN"
                            key="supplier_CN"
                            render={(text, record) => 
                                record.supplier_CN === null || record.supplier_CN.length === 0 ? 
                                <span onClick={() => handleRowClick(record)}>{""}</span> :
                                record.supplier_CN
                            }
                        />

                        <Column
                            title="Received"
                            dataIndex="received"
                            key="received"
                            render={(text, record) =>
                                record.received === null || record.received.length === 0 ? (
                                    <span onClick={() => handleRowClick(record)}>{record.received}</span>
                                ) : (
                                    <span>{Number(record.received).toLocaleString()} {record.received_currency}</span>
                                )
                            }
                        />

                        <Column
                            title="SS CN"
                            dataIndex="ss_CN"
                            key="ss_CN"
                            render={(text, record) =>
                                record.ss_CN === null || record.ss_CN.length === 0 ? (
                                    <span onClick={() => handleRowClick(record)}>{record.ss_CN || ""}</span>
                                ) : (
                                    record.ss_CN
                                )
                            }
                        />

                        <Column
                            title="Status"
                            dataIndex="status"
                            key="status"
                            className="status-column"
                            render={(text, record) => (
                                <Select
                                    value={record.status || "Pending"}
                                    onChange={(value) => handleStatusChange(value, record)}
                                    disabled={record.status !== "Pending" }
                                    style={{ width: 100 }}
                                >
                                    <Select.Option value="Pending">Pending</Select.Option>
                                    <Select.Option value="Approved">Approved</Select.Option>
                                    <Select.Option value="Cancelled">Cancelled</Select.Option>
                                </Select>
                            )}
                        />
                    </Table>

                        <Row>
                            <Col md={{ span: 2, offset: 2 }}>
                                <h5>Total Estimate:</h5>
                                <h5>Total Received: </h5>
                                <h5>Balance: </h5>
                            </Col>
                            <Col md={{ span: 3 }}>
                                <h5>${tempUSDEstimate.toLocaleString()} USD</h5>
                                <h5>${tempUSDReceived.toLocaleString()} USD</h5>
                                <h5>${(tempUSDReceived - tempUSDEstimate).toLocaleString()} USD</h5>
                            </Col>
                            <Col md={{ span: 3, offset: 0 }}>
                                <h5>${tempAUDEstimate.toLocaleString()} AUD</h5>
                                <h5>${tempAUDReceived.toLocaleString()} AUD</h5>
                                <h5>${(tempAUDReceived - tempAUDEstimate).toLocaleString()} AUD</h5>
                            </Col>
                        </Row>

                        <Modal show={showModal} onHide={() => (setShowModal(false),setErrors({}))}>
                            <Modal.Header closeButton>
                                <Modal.Title>Item Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedRow ? (
                                    <>
                                        <p><strong>Description:</strong> {selectedRow.description}</p>
                                        <p><strong>Supplier:</strong> {selectedRow.supplier}</p>
                                        <p><strong>ID:</strong> {selectedRow.id}</p>
                                        <div><strong>Supplier CN:</strong> 
                                        <Form.Control  
                                        required  
                                        type="text" 
                                        placeholder="Supplier Credit Number" 
                                        onChange={(e)=>handleChangeSupplier(e)} 
                                        className={errors.supplier_CN ? "is-invalid" : ""}
                                        value={selectedRow.supplier_CN}/>
                                        {errors.supplier_CN && <div className="invalid-feedback">{errors.supplier_CN}</div>} 
                                        </div>
                                        <Row>
                                            <Col><div><strong>Received Amount:</strong> 
                                            <Form.Control 
                                            required 
                                            type="number" 
                                            value={selectedRow.received}
                                            className={errors.received ? "is-invalid" : ""}
                                            onChange={(e)=>handleChangeaRecevied(e)}/>
                                            {errors.received && <div className="invalid-feedback">{errors.received}</div>} 
                                            </div></Col>
                                            <Col> <p><strong>Currency Type:</strong> 
                                            <Form.Select 
                                            required 
                                            value={selectedRow.received_currency || formData.estimateCurrency} 
                                            name='received_currency'
                                            onChange={(e)=>handleChangeCurrency(e)} >

                                                    <option key={0} value="AUD">AUD</option>
                                                    <option key={1} value="USD">USD</option>
                                                 </Form.Select></p></Col>
                                        </Row> 

                                        <div><strong>SS CN:</strong> 
                                        <Form.Control 
                                        required 
                                        type="text" 
                                        placeholder="Secusafe Credit Number" 
                                        onChange={(e)=>handleChangeSS(e)} value={selectedRow.ss_CN}/>  
                                        </div>
                                        {/* <p><strong>Status:</strong> 
                                            <Form.Select required defaultValue={"Pending"} name='status' value={selectedRow.status}
                                                        onChange={(e)=>handleChangeStatus(e)} >
                                                    <option key={0} value="">-------</option>
                                                    <option key={1} value="Bank Transfer">Bank Transfer</option>
                                                    <option key={2} value="Offset Statement">Offset Statement</option>
                                                    <option key={3} value="Pending">Pending</option>
                                                    <option key={4} value="Cancelled">Cancelled</option>
                                                 </Form.Select>
                                            </p> */}
                                    </>
                                ) : (
                                    <p>No item selected.</p>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={(e) => update(e)}>Update</Button>
                            </Modal.Footer>
                        </Modal>
                    
                     <div className="text-center mb-5">
                        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                            <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Add New CN </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Form>
                                    <Row >
                                        <Col >
                                        <Form.Label column >Supplier</Form.Label>
                                        </Col>
                                        <Col xs={8}>
                                        <Form.Select defaultValue={formData.supplier} name='supplier_name'
                                                    onChange={handleChangeForm} required>
                                        {suppliers.map((supplier, index) => (
                                                
                                                <option key={index} value={supplier}>{supplier}</option>
                                            ))}
                                                 </Form.Select>
                                        </Col>
                                    
                                    </Row>
                                    <br />

                                    <Row>
                                    <Form.Label column >Date </Form.Label>
                                    <Col xs={8}><Form.Control type="date" 
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChangeForm}
                                    className={checkInput.date ? "is-invalid" : ""}
                                    />
                                    {checkInput.date && <div className="invalid-feedback">{checkInput.date}</div>} 
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col column>
                                    <Form.Label column>Description</Form.Label>
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Control
                                        as="textarea"
                                        name="description"
                                        placeholder="Enter description"
                                        value={formData.description}
                                        onChange={handleChangeForm}
                                        />
                                    </Col>
                                    </Row>
                                <br />
                                <Row>
                                    <Form.Label column md={4}>CN Estimate</Form.Label>
                                    <Col xs={4}>
                                    <Form.Control 
                                    type="number" 
                                    name="estimateCN"  
                                    // placeholder="0"
                                    value={formData.estimateCN}
                                    onChange={handleChangeForm}
                                    className={checkInput.estimate ? "is-invalid" : ""}
                                    />
                                    {checkInput.estimate && <div className="invalid-feedback">{checkInput.estimate}</div>} 
                                    </Col>
                                    
                                </Row>
                                <br />

                                <Row>
                                <Form.Label column md={4}>Currency Type</Form.Label>
                                <Col xs={4}>
                                <Form.Select required  value={formData.estimateCurrency} name='estimateCurrency'
                                            onChange={handleChangeForm} >

                                    <option key={0} value="AUD">AUD</option>
                                    <option key={1} value="USD">USD</option>
                                    </Form.Select>
                                </Col>

                                </Row>
                                <br />

                                <Row>
                                <Form.Label column md={4}>CN Type</Form.Label>
                                <Col xs={6}>
                                <Form.Select required defaultValue={"Compensation"} value={formData.CNType} name='CNType'
                                            onChange={handleChangeForm} >
                                    
                                    <option key={0} value="Compensation">Compensation</option>
                                    <option key={1} value="Marketing">Marketing</option>                                    
                                    <option key={2} value="Discount">Discount</option>
                                    <option key={4} value="BankTransfer">Bank Transfer</option>
                                    <option key={5} value="OffsetStatement">Offset Statement</option>
                                    </Form.Select>
                                </Col>
                                
                                </Row>
                                <br />

                                <Button variant="primary"  type="primary" onClick={addNewCN}>
                                    ADD
                                </Button>
                                </Form>
                            </Offcanvas.Body>
                        </Offcanvas>
                        <Button onClick={handleShow} type="primary">Add new CN </Button>
                    </div> 
                    </Container>
                </div>
            </div> 
        </main>

    );

}