import React, { Component } from "react";
import "./FirebaseProject.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Item from "../../components/Item/Item";
import NewItem from "../../components/NewItem/NewItem";

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
        ],
        newToDoName: "",
        newMovieName: ""
    }

    onNavLinkClick = (activeLink) => {
        console.log("pathname =", activeLink);
    }

    // ------- New item -------//
    updateNewItemName(event, newItemName) {
        if (newItemName === "newToDoName") this.setState({ newToDoName: event.target.value });
        else this.setState({ newMovieName: event.target.value });
    }

    isValidString(str) {
        const isNull = str === null;
        const isUndefined = str === undefined;
        if (!isNull && !isUndefined) {
            str = str.trim();
        }
        if (str) return true;
        else return false;
    }

    addNewItem = (newItemName) => {
        if (!this.isValidString(this.state[newItemName])) {
            console.log("New item name is empty");
            return;
        };

        const DateInMilliseconds = new Date().getTime();
        const newItem = {
            id: DateInMilliseconds,
            name: this.state[newItemName]
        }

        if (newItemName === "newToDoName") {
            const itemsCopy = [...this.state.toDoList];
            itemsCopy.push(newItem);
            this.setState({ toDoList: itemsCopy, newToDoName: "" });
        }
        else {
            const itemsCopy = [...this.state.movieNamesList];
            itemsCopy.push(newItem);
            this.setState({ movieNamesList: itemsCopy, newMovieName: "" });
        }
    }

    // ------- Items -------//
    updateItemName = (id, currentList, currentListName, event) => {
        const index = currentList.findIndex(p => p.id === id);
        const itemsCopy = [...currentList];
        itemsCopy[index].name = event.target.value;
        if (currentListName === "movieNamesList") this.setState({ movieNamesList: itemsCopy });
        else this.setState({ toDoList: itemsCopy });
    }

    removeItem = (id, currentList, currentListName) => {
        const index = currentList.findIndex(p => p.id === id);
        const itemsCopy = [...currentList];
        itemsCopy.splice(index, 1);
        if (currentListName === "movieNamesList") this.setState({ movieNamesList: itemsCopy });
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
                                    <NavLink className="FirebaseProject-navLink" to="/todo" onClick={() => this.onNavLinkClick("toDoList")}>To-Do list</NavLink>
                                    <NavLink className="FirebaseProject-navLink" to="/movieNames" onClick={() => this.onNavLinkClick("movieNamesList")}>Movie names list</NavLink>
                                </Col>
                            </Row>
                        </header>

                        <Routes>
                            <Route path="/" element={<p>Choose your list</p>} />
                            <Route path="/todo" element={
                                <>
                                    <NewItem
                                        itemName={this.state.newToDoName}
                                        onItemNameChange={(event) => this.updateNewItemName(event, "newToDoName")}
                                        onAddClick={() => this.addNewItem("newToDoName")}
                                    />
                                    <p>To-Do list:</p>
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
                                    <NewItem
                                        itemName={this.state.newMovieName}
                                        onItemNameChange={(event) => this.updateNewItemName(event, "newMovieName")}
                                        onAddClick={() => this.addNewItem("newMovieName")}
                                    />
                                    <p>To watch list:</p>
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