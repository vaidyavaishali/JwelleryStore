import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProductPage from './components/ProductPage';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Container, Navbar, Badge, Nav, NavDropdown } from 'react-bootstrap';
import { store } from './Context/store';
import { LinkContainer } from 'react-router-bootstrap';
import { CardPage } from './components/CardPage';
import SigninPage from './components/SignInPage';
// import { ToastContainer } from 'react-toastify';
import AddressPage from './components/AddressPage';
import SignUpPage from './components/SignUpPage';
import PaymentMethod from './components/PaymentMethod';
import PlaceOrder from './components/PlaceOrder';
import OrderPage from './components/OrderPage';
// import LandingPage from './components/LandingPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { state, dispatch: cxtDispatch } = useContext(store);
  const { cart, userInfo } = state

  const LogoutHandler = () => {
    cxtDispatch({ type: 'USER_LOGOUT' })
    localStorage.removeItem("userInfo")
    localStorage.removeItem("shippingAddress")
    localStorage.removeItem("paymentMethod")
  }
  return (
    <div className='d-flex flex-column main-container'>
      <header style={{ position: "sticky", top:"0", zIndex:"1" }}>
        <Navbar bg='primary' variant='dark' style={{ height: "15vh" }} expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand className='title'> <span style={{ color: "#841918", fontSize: "130%" }} > BLUESTONE</span> <br /> <span className='title-jw' style={{ fontSize: "120%" }}>Jwellers</span> </Navbar.Brand>

            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              <Nav className="me-auto w-100  justify-content-end">
                <Link to="/card" className='nav-link'>

                  <span style={{ marginTop: "45%", color: "white" }}>Cart</span>

                  {/* cart */}
                  {/* <i class="fa fa-heart-o" aria-hidden="true" ></i> */}

                  {cart.cartItems.length > 0 && (
                    <div style={{ width: "50%", height: "4vh", marginLeft: "60%", marginTop: "-70%" }} >
                      <p>
                        <Badge bg="danger" className='rounded-5' style={{ marginTop: "-70%", marginLeft: "50%", color: "white" }}>
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      </p>
                    </div>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='basic-nav-dropdown' style={{ color: "white" }}>

                    <LinkContainer to="/profile">
                      <NavDropdown.Item> User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to="/signin">
                      <NavDropdown.Item className='dropdown-item' to="/logout" onClick={LogoutHandler}>Logout</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                ) : (
                  <Link to="/signin" className='nav-link signup text-white'  >
                    {/* <h5> */}
                    SignIn
                    {/* </h5> */}

                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </header>
      <main>
        <Container>
          <Routes>
            <Route path='/products/unique_indentity/:unique_indentity' element={<ProductPage />} />
            {/* <Route path='/' element={<LandingPage/>} /> */}
            <Route path="/" element={<HomePage />} />
            <Route path='/card' element={<CardPage />} />
            <Route path='/shipping' element={<AddressPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/payment' element={<PaymentMethod />} />
            <Route path='/signin' element={<SigninPage />} />
            <Route path='/placeorder' element={<PlaceOrder />} />
            <Route path='/order/:id' element={<OrderPage />} />
          </Routes>
        </Container>
      </main>

      <footer className="text-center">
        <div>All Right Received</div>
      </footer>
      <ToastContainer position='top-center' limit={1} />
    </div>
  );
}

export default App;
