import React, { Component } from 'react';
import NavLink from '../navLink/navLink';
import { withRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import './header.css';

const navItems = [
    { path: "/home", text: "Dogs", isActive: true },
    { path: "/profile", text: "My Profile", isActive: false },
    { path: "/myBookings", text: "My Bookings", isActive: false },
    { path: "/myBookingRequest", text: "My Booking Requests", isActive: false }
];

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            links: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        let url = window.location.href.split('/')[3];
        const navItems = localStorage.getItem('userType')&&localStorage.getItem('userType').toLowerCase()==="o"?[
            { path: "/home", text: "Dogs", isActive: true },
            { path: "/profile", text: "My Profile", isActive: false },
            { path: "/myBookings", text: "My Bookings", isActive: false },
            { path: "/adddog", text: "Add New Dog", isActive: false }
        ]:[
            { path: "/home", text: "Dogs", isActive: true },
            { path: "/profile", text: "My Profile", isActive: false },
            { path: "/myBookings", text: "My Bookings", isActive: false }
        ];
        if (url !== "") {
            for (let i = 0; i < navItems.length; i++) {
                if (navItems[i].path.includes(url)) {
                    navItems[i].isActive = true;
                } else {
                    navItems[i].isActive = false;
                }
            }
        } else {
            for (let i = 0; i < navItems.length; i++) {
                if (navItems[i].path === "/home") {
                    navItems[i].isActive = true;
                } else {
                    navItems[i].isActive = false;
                }
            }
        }

        if (props.userId !== null) {
            return {links:navItems};
        }
        return null;
    }


    handleClick(i) {
        const links = this.state.links.slice();
        for (const j in links) {
            links[j].isActive = i == j;
        }
        this.setState({ links });
        this.props.linkClick(links[i])
        // console.log(links[i]);
    }

    logout = () => {
        localStorage.clear();
        this.props.logout();
    }

    render() {
        const name = (localStorage.getItem('name') !== 'null')? localStorage.getItem('name') : 'My Profile';
        return (
            <div>
                <Navbar bg="dark" expand="lg">
                    <Navbar.Brand href="/">
                        <span className="app-title">PAWSsible</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Form inline>
                            <NavDropdown title={<div style={{ display: "inline-block", color: '#FFFFFF' }}><span className="user-name">{name}</span> </div>} id="basic-nav-dropdown" className="">
                                {this.state.links.map((link, i) => {
                                    return (
                                        <NavDropdown.Item key={i} active={link.isActive}>
                                            <NavLink
                                                path={link.path}
                                                text={link.text}
                                                key={link.path}
                                                onClick={() => this.handleClick(i)}
                                            />
                                        </NavDropdown.Item>
                                    )
                                }

                                )}
                                <NavDropdown.Item>
                                    <NavLink
                                        text="logout"
                                        path="/"
                                        key="/"
                                        onClick={this.logout} />
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
export default withRouter(Header);