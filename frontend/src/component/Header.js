import React from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import { logout } from '../actions/userActions'

const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  
    const logoutHandler = () => {
      dispatch(logout())
    }
  
    return (
      <>
       <header >
                <Navbar className="custom-navbar"  expand='lg' collapseOnSelect>
                    <Container>
                      
                        <LinkContainer to='/'>
                             <Navbar.Brand>
                                 <img src="/coloshop-new.png"width="40%"></img>

                                 {/* <span style={{color:"#F24E68",fontSize:"20px"}}>COLO</span>
                                 <span style={{color:"white",fontSize:"20px"}}>SHOP</span> */}
                             </Navbar.Brand>
                        </LinkContainer>
                     
                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='ml-auto'>
                            {userInfo && (
                            <LinkContainer to='/cart' >
                                <Nav.Link >
                                <i className='fas fa-shopping-cart white-color'></i>
                                <span className="white-color">Cart</span>
                                </Nav.Link>
                            </LinkContainer>
                            
                            )}
                             {userInfo && (
                            <LinkContainer to='/wishlist' >
                                <Nav.Link >
                                <i className='fas fa-heart white-color'></i>
                                <span className="white-color">Wishlist</span>
                                </Nav.Link>
                            </LinkContainer>
                            
                            )}
                            {userInfo ? (
                               <span className="white-color"><NavDropdown   title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                                </NavDropdown></span> 
                            ) : (
                                <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className='fas fa-user white-color'></i>
                                     <span className="white-color">Sign In</span>
                                </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                                </NavDropdown>
                            )}
                            </Nav>
                        </Navbar.Collapse>
                
                    </Container>
               </Navbar>
            
        </header>
    </>
    )
}

export default Header
