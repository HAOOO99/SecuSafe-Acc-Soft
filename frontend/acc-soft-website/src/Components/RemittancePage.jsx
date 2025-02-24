import { useState,useEffect } from 'react'
import { Container, Button, Offcanvas, Form ,Row, Col, Modal} from 'react-bootstrap';
import { Table } from 'antd';
import FilterBar from './FilterBar';

import NavBar from './NavBar';
import { useParams } from 'react-router-dom';


export default function RemittancePage(){  
    const { Column } = Table;

    const {name}  = useParams();
    const [show, setShow] = useState(false); // State to control offcanvas visibility
    const [flag, setFlag] = useState(false); // state to control flag showing in filter bar
    const [showModal, setShowModal] = useState(false); // State to control offcanvas visibility
    const [Pos,setPos] = useState([]);
    const [error, setError]= useState("")


    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [years, setYears] = useState([]); // State to store all years
    const [chooseYear, setChooseYear] = useState(new Date().getFullYear()); // State to store selected year
    const [Remittances,setRemittances] = useState([])

    const [selectedTableRow, setselectedTableRow] = useState([]); // state to store selected POs for each remittance

    const [selectedRow, setSelectedRow] = useState({});
    const [formData,setFormData] = useState({
        brand:name,
        date:"",
        amount:0,
        currency:"",
        status:"",
        bank:""
    })
    
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
    const getAllPos = async () => {
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch("http://127.0.0.1:8000/ci?brand="+name +"&year="+chooseYear, config);
            const data = await response.json();
            console.log(data)
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }

            let arrays = data.CIwithPOs
            const POarrays = arrays.map((item, index) => ({
                key: index, // Key starts from 1
                po: item.PO_no
              }))

            setPos(POarrays)
            
            return data;
        } catch (e){
            console.log(e);
        }

    }

   const addPO = async (e,row) => {
        e.preventDefault();
        const values = selectedTableRow.map(key => Pos[key]);
        const pos = values.reduce((list,item) => {list.push(item["po"]);return list},[])
        const config = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({brand:name,id:row.id,pos:pos})
        }
        try{
            const response = await fetch("http://127.0.0.1:8000/remittance/addPo/", config);
            const data = await response.json();
            console.log(data)
            if (data === undefined || data.length === 0){
                alert("Nothing is found");
                return;
            }

            setShowModal(false);
            setselectedTableRow([]);
            fetchRe();
            
            return data;
        } catch (e){
            console.log(e);
        }
    }

    const addNew = async (e) => {
        e.preventDefault();
        if (!formData.date){
                setError("date is required!");}
        else{
            const config = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(formData)
            }
        
            try{
                const response = await fetch("http://127.0.0.1:8000/remittance/addRe/", config);
                const data = await response.json();
                console.log(formData)
                if (data === undefined || data.length === 0){
                    alert("Nothing is found");
                    return;
                }
                alert(data.msg)
                handleClose();
                
                fetchRe();
                
                return data;
            } catch (e){
                console.log(e);
            }
        }
        
    }

    const handleShow = () => (setShow(true));
    const handleClose = () => {setShow(false); 
                                setError("");
                                setselectedTableRow([]);
                                setFormData({ brand:name,
                                    date:"",
                                    amount:0,
                                    currency:"",
                                    status:"",
                                    bank:""});};

    const handleRowClick = (row) => {
        getAllPos();
        setSelectedRow(row);
        setShowModal(true);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setselectedTableRow(newSelectedRowKeys);
      };
    const rowSelection = {
        selectedTableRow,
        onChange: onSelectChange,
    };
    const hasSelected = selectedTableRow.length > 0;


    const handleChange = (e) => {          
        const { name, value } = e.target;
        console.log(name, value,)
        setFormData({
        ...formData,
        [name]:  value,
        });
        
    }

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
                <Table dataSource={filteredREs}
                    rowKey={(record) => (record.id)} // ✅ Ensure each row has a unique ke
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record), 
                    })}
                    small
                    expandable={{
                        expandedRowRender: (record) => (
                            <p style={{margin: 0,}}>
                            Related POs : {record.PO}
                            </p>
                        ),
                        rowExpandable: (record) => record.PO !== '',
                    }}
                    pagination={{
                        position: ['none', 'none'],
                      }}
                    >
                    <Column title="Date" dataIndex="date" key="date" style={{ whiteSpace: "nowrap" }}/>
                    <Column title="Bank Account" dataIndex="bank" key="bank" />
                    <Column title="Amount" dataIndex="amount" key="amount" />
                    <Column title="Currency" dataIndex="currency" key="currency" />
                    <Column title="Status" dataIndex="status" key="status" />
                    
                </Table>                    
                    <div className="text-center mt-3">
                    <h5>Total USD Value: ${Number(tempUSD.toFixed(2)).toLocaleString()}</h5>
                    <h5>Total AUD Value: ${Number(tempAUD.toFixed(2)).toLocaleString()}</h5>
                    {selectedRow ? (
                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Item Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                
                                    <>
                                        <p><strong>Description:</strong> {selectedRow.status}</p>
                                        <div>
                                            {selectedRow.id}
                                            <Table dataSource={Pos} rowSelection={rowSelection}  >
                                            <Column title="PO Number" dataIndex="po" key="po" style={{ whiteSpace: "nowrap" }}/>
                                            </Table>
                                        </div>
                                    </>

                                    </Modal.Body>
                            <Modal.Footer>
                            {hasSelected ? `Selected ${selectedTableRow.length} items` : null}
                                <Button variant="secondary" onClick={() => addPO(selectedRow)}>Add</Button>
                                
                            </Modal.Footer>
                        </Modal>
                                ) : (
                                    <p>No item selected.</p>
                                ) }

                    </div>
                    
                <div className="text-center mb-5">
                    <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Add New Remittance </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Form>
                                
                            <br />
                            <Row>
                                <Form.Label column md={3}>Date </Form.Label>
                                <Col xs={6}><Form.Control type="date" 
                                name="date"
                                value={formData.date}
                                className={error ? "is-invalid" : ""}
                                onChange={handleChange}/>
                                {error && <div className="invalid-feedback">{error}</div>} </Col>
                                

                            </Row>
                            <br />
                            <Row>
                                <Form.Label column md={3}>Bank Account</Form.Label>
                                <Col xs={6}>
                                <Form.Control 
                                type="text" 
                                name="bank"  
                                placeholder=""
                                value={formData.bank}
                                onChange={handleChange}/></Col>
                                
                            </Row>
                            <br />
                            <Row>
                                <Form.Label column md={4}>Amount</Form.Label>
                                <Col xs={4}>
                                <Form.Control 
                                type="number" 
                                name="amount"  
                                placeholder="0"
                                value={formData.amount}
                                onChange={handleChange}/></Col>
                                
                            </Row>
                            <br />
                            <Row>
                                <Form.Label column md={4}>Currency</Form.Label>
                                <Col xs={4}>
                                <Form.Select required  value={formData.currency} name='currency'
                                            onChange={handleChange} >

                                    <option key={0} value="AUD">AUD</option>
                                    <option key={1} value="USD">USD</option>
                                    </Form.Select>
                                </Col>

                                </Row>
                              
                            <br />
                            <Row>
                                <Form.Label column md={4}>Status </Form.Label>
                                <Col xs={5}>
                                <Form.Select required  value={formData.status} name='status'
                                            onChange={handleChange} >
                                    <option key={0} value="prepaid">prepaid</option>
                                    <option key={1} value="wait">waiting</option>
                                    <option key={2} value="paid">paid</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <br />

                        
                            <Button variant="primary" type="submit" onClick={(e)=>addNew(e)} >
                                ADD
                            </Button>
                            </Form>
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

