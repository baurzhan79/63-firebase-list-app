import React, { Component } from "react";
import "./FirebaseProject.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

class FirebaseProject extends Component {
    state = {
        toDoList: [
            {
                id: 1,
                name: "Do homework"
            },
            {
                id: 2,
                name: "Buy milk"
            }

        ],
        movieNamesList: [
            {
                id: 1,
                name: "Avengers"
            },
            {
                id: 2,
                name: "Avatar"
            }
        ]
    }

    onNavLinkClick = (activeLink) => {
        console.log("pathname =", activeLink);
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <Container>
                        <header className="FirebaseProject-header shadow rounded">
                            <Row className="FirebaseProject-header-row">
                                < Col className="mb-2" xs={10} sm={10} lg={5} >
                                    <p className="FirebaseProject-header-title">My firebase-list</p>
                                </Col>
                                < Col className="mb-2 FirebaseProject-navLink-box" xs={12} lg={5} >
                                    <NavLink className="FirebaseProject-navLink" to="/todo" onClick={() => this.onNavLinkClick("toDoList")}>ToDo list</NavLink>
                                    <NavLink className="FirebaseProject-navLink" to="/movieNames" onClick={() => this.onNavLinkClick("movieNamesList")}>Movie names list</NavLink>
                                </Col>
                            </Row>
                        </header>

                        <Routes>
                            <Route path="/" element={
                                <>
                                    {
                                        this.state.toDoList.map(item => (
                                            <p key={item.id}>id: {item.id}, name: {item.name}</p>
                                        ))
                                    }
                                </>
                            } />
                            <Route path="/todo" element={
                                <>
                                    {
                                        this.state.toDoList.map(item => (
                                            <p key={item.id}>id: {item.id}, name: {item.name}</p>
                                        ))
                                    }
                                </>
                            } />
                            <Route path="/movieNames" element={
                                <>
                                    {
                                        this.state.movieNamesList.map(item => (
                                            <p key={item.id}>id: {item.id}, name: {item.name}</p>
                                        ))
                                    }
                                </>
                            } />
                            <Route path="*" element={<h2>404 Page not found</h2>} />
                        </Routes>

                    </Container>
                </BrowserRouter>
            </>
        )
    }
}

export default FirebaseProject