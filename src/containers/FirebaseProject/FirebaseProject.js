import React, { Component } from "react";
import "./FirebaseProject.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Item from "../../components/Item/Item";

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

    // ------- Items -------//
    updateItemName = (id, currentState, currentStateKey, event) => {
        const index = currentState.findIndex(p => p.id === id);
        const itemsCopy = [...currentState];
        itemsCopy[index].name = event.target.value;
        if (currentStateKey === "movieNamesList") this.setState({ movieNamesList: itemsCopy });
        else this.setState({ toDoList: itemsCopy });
    }

    removeItem = (id, currentState, currentStateKey) => {
        const index = currentState.findIndex(p => p.id === id);
        const itemsCopy = [...currentState];
        itemsCopy.splice(index, 1);
        if (currentStateKey === "movieNamesList") this.setState({ movieNamesList: itemsCopy });
        else this.setState({ toDoList: itemsCopy });
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
                            <Route path="/" element={<p>Choose your list</p>} />
                            <Route path="/todo" element={
                                <>
                                    {
                                        this.state.toDoList.map(item => (
                                            <Item
                                                key={item.id}
                                                itemName={item.name}
                                                onItemNameChange={(event) => this.updateItemName(item.id, this.state.toDoList, "toDoList", event)}
                                                onRemoveClick={() => this.removeItem(item.id, this.state.toDoList, "toDoList")}
                                            />
                                        ))
                                    }
                                </>
                            } />
                            <Route path="/movieNames" element={
                                <>
                                    {
                                        this.state.movieNamesList.map(item => (
                                            <Item
                                                key={item.id}
                                                itemName={item.name}
                                                onItemNameChange={(event) => this.updateItemName(item.id, this.state.movieNamesList, "movieNamesList", event)}
                                                onRemoveClick={() => this.removeItem(item.id, this.state.movieNamesList, "movieNamesList")}
                                            />
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