import { useState } from 'react';
import { Form, FormControl, Button, Row,Col, Nav, NavDropdown}  from 'react-bootstrap';


export default function FilterBar({years,chooseYear,setChooseYear,CIs,chooseCI,setChooseCi, searchQuery, setSearchQuery, flag}) {
    // const [flag, setFlag] = useState("");

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
    const yearFilter = (year) => {
        console.log(year)
        setChooseYear(year);
        if(flag){
            setChooseCi("");
        }
    }
    const ciFilter = (ci) => {
        console.log(ci)
        // setChooseYear(year);
        setChooseCi(ci)
    }
    const reset = () =>{
        // setChooseYear("");
        if(flag){
            setChooseCi("");
        }
    }

    return (
      <Form className="d-flex mb-3">
        <Row className="w-100 justify-content-end">
            <Col xs = {1}>
                <p className="pt-2">Filter:</p>
            </Col>
            <Col>
                <Nav>
                    <NavDropdown
                    id="nav-dropdown"
                    title="Year"
                    >
                        {years.map((year) => (
                            <NavDropdown.Item 
                            key={year}  
                            onClick={() => yearFilter(year)}>
                                {year}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>

                    {flag ? <NavDropdown
                    id="nav-dropdown"
                    title="CI"
                    >
                        {CIs.map((CI) => (
                            <NavDropdown.Item 
                            key={CI}  
                            onClick={() => ciFilter(CI)}>
                                {CI}
                            </NavDropdown.Item>
                        ))}
                        </NavDropdown>: null
                    
                    }
                    <Nav.Link onClick={() => reset()}>Reset</Nav.Link>
                    
                </Nav>
            </Col>
             
            <Col xs="auto">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    />
            
            </Col>
            {/* <Col xs="auto"><Button variant="outline-success">Search</Button></Col> */}
        </Row>

      </Form>
    );
  }