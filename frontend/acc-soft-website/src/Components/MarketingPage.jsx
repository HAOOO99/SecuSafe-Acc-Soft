import { useState,useEffect } from 'react'
import { Table ,Container, Button, Form ,Row, Col, Modal} from 'react-bootstrap';
import FilterBar from './FilterBar';

import NavBar from './NavBar';
import { useParams } from 'react-router-dom';

// import { w3cwebsocket as W3CWebSocket } from 'websocket';
// const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/comments/');

export default function CNPage(){
    const {name} = useParams();
    const [flag, ] = useState(false);//state to control flag showing in filter bar
    const [errors, setErrors] = useState({});

    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [years, setYears] = useState([]); // State to store all years
    const [CNs, setCNs] = useState([]) // State to store CNs
    // const [currency,setCurrency] = useState("");

    const [chooseYear, setChooseYear] = useState(new Date().getFullYear()); // State to store selected year
    const [showModal, setShowModal] = useState(false); // State to control offcanvas visibility

    const [selectedRow, setSelectedRow] = useState({
        
        supplier_CN: "",
        received: "",
        received_currency: "",
        ss_CN: "",
        status: "",
    });
    const [formData] = useState({
        company_name:name,
        supplier_name:name,
        date:"",
        description:"",
        estimateCN:"",
        estimateCurrency:"",
        CNType:"Compensation",
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
    
    const tempUSDEstimate = filteredCNs.reduce((sum,CN)=> sum + (CN.estimate_currency.trim() === "USD" && CN.estimate != null? parseFloat(CN.estimate): 0),0);
    const tempAUDEstimate = filteredCNs.reduce((sum, CN) => sum + (CN.estimate_currency.trim() === "AUD" && CN.estimate != null ? parseFloat(CN.estimate):0),0);

    const tempUSDReceived = filteredCNs.reduce((sum,CN)=> sum + (CN.received_currency !== null ? (CN.received_currency.trim() === "USD" && CN.received != null? parseFloat(CN.received): 0) :0),0);
    const tempAUDReceived = filteredCNs.reduce((sum, CN) => sum + (CN.received_currency !== null ? (CN.received_currency.trim() === "AUD"&& CN.received != null ? parseFloat(CN.received):0):0),0);   

    async function fetchCNs() {
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch("http://127.0.0.1:8000/cn/marketing/?brand="+name+"&year="+chooseYear , config);
            const data = await response.json();
            
            if (data === undefined || data.msg.length === 0){
                alert("Nothing is found");
                console.log(data.msg);
                setCNs(data.msg);
                return;
            }else{
                setCNs(data.msg);
            }
            console.log(data);
            
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
            const response = await fetch("http://127.0.0.1:8000/cn/years?brand="+name , config);
            const data = await response.json();
            
            if (data === undefined || data.total_years.length === 0){
                alert("Nothing is found");
                return;
            }
            console.log(data);
            setYears(data["total_years"]);
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
            const response = await fetch("http://127.0.0.1:8000/target?brand=" + name , config);
            const data = await response.json();

            // setFormData({company_name:name,
            //     supplier_name:name,
            //     date:"",
            //     description:"",
            //     estimateCN:"",
            //     estimateCurrency:data.targets[0].defaultCurrency,
            //     CNType:"Compensation",})

            // console.log(formData.estimateCurrency)
            
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            } 
            
            return data;
           
        } catch (e){
            console.log(e);
        }
    }

    async function update(e){
        e.preventDefault();

        console.log(11111, selectedRow);
            // Check for empty fields
        let newErrors = {};
        if (!selectedRow.supplier_CN) newErrors.supplier_CN = "Supplier CN is required!";
        if (!selectedRow.received) newErrors.received = "Received Amount is required!";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
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
                    status:selectedRow.status,
                })
            }
            try{
                const response = await fetch("http://127.0.0.1:8000/cn/update" , config);
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
                // fetchCNs();
                return data;
            } catch (e){
                console.log(e);
            }
        }
    }

   

    const handleChangeSupplier = (e) =>{
        // const [name,value] = e.target;
        setSelectedRow({ ...selectedRow, supplier_CN: e.target.value });
    }

    const handleChangeaRecevied = (e) => {
        console.log(e.target.value);
        
        setSelectedRow({ ...selectedRow, received: e.target.value });
    }
    const handleChangeCurrency = (e) => {
        console.log(e.target.value);
        
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
                    <h3 key="title" className="text-center mb-5">Marketing CN for {name}</h3>
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
                            <th>Supplier</th>
                            <th>Description</th>
                            <th>CN Estimate</th>
                            <th>Supplier CN </th>
                            <th>Received</th>
                            <th>SS CN</th>
                            <th>Status</th>
                            {/* <th>Note</th> */}
                            {/* <th>Cr Type</th> */}
                            </tr>
                        </thead>
                        <tbody>
                        {filteredCNs.map((CN) => (
                            CN.status === null || CN.status.length === 0 ?
                            <tr key={CN.id}> 
                            <td style={{ whiteSpace: "nowrap" }}>{CN.date}</td>
                                <td>{CN.supplier}</td>
                                <td>{CN.description}</td>
                                <td style={{ whiteSpace: "nowrap" }}>{CN.estimate} {CN.estimate_currency}</td>
                                {CN.supplier_CN === null || CN.supplier_CN.length===0 ? <td onClick={()=>handleRowClick(CN)}>{CN.supplier_CN}</td> : <td>{CN.supplier_CN}</td>}
                                {CN.received === null || CN.received.length===0? <td onClick={()=>handleRowClick(CN)}>{CN.received}</td> : <td style={{ whiteSpace: "nowrap" }} >{CN.received} {CN.received_currency}</td> }
                                {CN.ss_CN === null || CN.ss_CN.length===0 ? <td onClick={()=>handleRowClick(CN)}>{CN.ss_CN}</td> : <td>{CN.ss_CN}</td>}
                                {CN.status === null || CN.status.length===0? <td onClick={()=>handleRowClick(CN)}>{CN.status}</td> :<td>{CN.status}</td> }
                            </tr>
                            :
                            //when record staus is applied it become grey it will not be allowed to add new data
                            <tr key={CN.id} style = {{opacity:0.5}}> 
                            <td style={{ whiteSpace: "nowrap" }}>{CN.date}</td>
                                <td>{CN.supplier}</td>
                                <td>{CN.description}</td>
                                <td style={{ whiteSpace: "nowrap" }}>{CN.estimate} {CN.estimate_currency}</td>
                                {CN.supplier_CN === null || CN.supplier_CN.length===0 ? <td >{CN.supplier_CN}</td> : <td>{CN.supplier_CN}</td>}
                                {CN.received === null || CN.received.length===0? <td o>{CN.received}</td> : <td style={{ whiteSpace: "nowrap" }}>{CN.received} {CN.received_currency}</td> }
                                {CN.ss_CN === null || CN.ss_CN.length===0 ? <td >{CN.ss_CN}</td> : <td>{CN.ss_CN}</td>}
                                {CN.status === null || CN.status.length===0? <td >{CN.status}</td> :<td>{CN.status}</td> }
                            </tr>
                            
                         ))} 
                        </tbody>
                        
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

                        <Modal show={showModal} onHide={() => setShowModal(false)}>
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
                                        <p><strong>Status:</strong> 
                                            <Form.Select required defaultValue={""} name='status' value={selectedRow.status}
                                                        onChange={(e)=>handleChangeStatus(e)} >
                                                    <option key={0} value="">-------</option>
                                                    <option key={1} value="Bank Transfer">Bank Transfer</option>
                                                    <option key={2} value="Offset Statement">Offset Statement</option>
                                                    <option key={3} value="Pending">Pending</option>
                                                 </Form.Select>
                                            </p>
                                    </>
                                ) : (
                                    <p>No item selected.</p>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={(e) => update(e)}>Update</Button>
                            </Modal.Footer>
                        </Modal>
                    
                    </Container>
                </div>
            </div> 
        </main>

    );

}