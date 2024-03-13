import React from "react";
import { Container, Navbar } from "react-bootstrap";

const HeaderLayout = () => {
    return (
        <Navbar className="bg-body-tertiary">
            <Container fluid className="text-center">    
                <Navbar.Brand href="#"><h3>Seo Crawler</h3></Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default HeaderLayout;