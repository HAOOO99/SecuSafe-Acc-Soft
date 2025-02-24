import { Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { useNavigate, useParams} from 'react-router-dom';


export default function NavBar(){
    const navigate = useNavigate();
    const {name}  = useParams();

    const handleDashboardNavigation = (brandName) => {
      navigate('/dashboard/'+ brandName);
    };
    const handlePINavigation = (brandName) => {
        navigate('/pi/'+ brandName);
    };
    const handleCINavigation = (brandName) => {
        navigate('/ci/'+ brandName);
    };
    const handleCNNavigation = (brandName) => {
        navigate('/cn/'+ brandName);
    };
    const handleRemittanceNavigation = (brandName) => {
        navigate('/remittance/'+ brandName);
    };

    const handleMarketNavigation = (brandName) => {
        navigate('/market/'+ brandName);
    };
    

    const handleBrandsNavigation = () => {
        navigate('/');
    };

    const handleLogout = ()=>{
        sessionStorage.clear(); // Clear session storage
        localStorage.clear(); // Clear local storage    
        alert("Logout successful");
        navigate('/login'); // Navigate to login page
    }

      

   return (
        <Navbar bg="light" expand={false} className="flex-column vh-100" style={{ width: '250px', position: 'fixed' }}>
            <Nav className="flex-column">
                <Nav.Link onClick={() => handleDashboardNavigation(name)} className="py-2">
                    Dashboard
                </Nav.Link>
                <Nav.Link onClick={() => handlePINavigation(name)} className="py-2">
                    PI Information
                </Nav.Link>
                <Nav.Link onClick={() => handleCINavigation(name)} className="py-2">
                    CI Information
                </Nav.Link>
                <Nav.Link onClick={() => handleCNNavigation(name)} className="py-2">
                    Credit Support
                </Nav.Link>
                <Nav.Link onClick={() => handleRemittanceNavigation(name)} className="py-2">
                    Remittance
                </Nav.Link>
                <Nav.Link onClick={() => handleMarketNavigation(name)} className="py-2">
                    Marketing
                </Nav.Link>
            </Nav>
            <Nav className="flex-column mt-auto">
                <Nav.Link onClick={() => handleBrandsNavigation(name)} className="py-2">
                        Brands Selection
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="py-2">
                    Logout
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}