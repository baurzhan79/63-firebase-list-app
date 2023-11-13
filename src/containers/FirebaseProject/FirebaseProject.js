import React, { Component } from "react";
import "./FirebaseProject.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import axios from "../../axios-lists";

import Item from "../../components/Item/Item";
import NewItem from "../../components/NewItem/NewItem";
import Spinner from "../../components/UI/Spinner/Spinner";

class FirebaseProject extends Component {
    state = {
        toDoList: [],
        movieNamesList: [],
        newToDoName: "",
        newMovieName: "",
        activeLink: "",
        loading: false
    }

    onNavLinkClick(event) {
        const currentLink = event.target.attributes.href.value;

        console.log("pathname =", currentLink);
        this.setState({ activeLink: currentLink });

        this.getItemsFromServer(currentLink);
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

    addNewItem(newItemName) {
        if (!this.isValidString(this.state[newItemName])) {
            console.log("New item name is empty");
            return;
        };

        // const DateInMilliseconds = new Date().getTime();
        // const newItem = {
        //     id: DateInMilliseconds,
        //     name: this.state[newItemName]
        // }

        // if (newItemName === "newToDoName") {
        //     const itemsCopy = [...this.state.toDoList];
        //     itemsCopy.push(newItem);
        //     this.setState({ toDoList: itemsCopy, newToDoName: "" });
        // }
        // else {
        //     const itemsCopy = [...this.state.movieNamesList];
        //     itemsCopy.push(newItem);
        //     this.setState({ movieNamesList: itemsCopy, newMovieName: "" });
        // }

        this.sendNewItemToServer(this.state.activeLink, this.state[newItemName]);
        if (newItemName === "newToDoName") this.setState({ newToDoName: "" });
        else this.setState({ newMovieName: "" });
    }

    // ------- Items -------//
    updateItemName(id, currentList, currentListName, event) {
        const index = currentList.findIndex(p => p.id === id);
        const itemsCopy = [...currentList];
        itemsCopy[index].name = event.target.value;
        if (currentListName === "movieNamesList") this.setState({ movieNamesList: itemsCopy });
        else this.setState({ toDoList: itemsCopy });
    }

    updateItem(id, currentList) {
        const index = currentList.findIndex(p => p.id === id);
        const updatedName = currentList[index].name;
        this.updateItemOnServer(this.state.activeLink, id, updatedName);

        // const index = currentList.findIndex(p => p.id === id);
        // const itemsCopy = [...currentList];
        // itemsCopy.splice(index, 1);
        // if (currentListName === "movieNamesList") this.setState({ movieNamesList: itemsCopy });
        // else this.setState({ toDoList: itemsCopy });
    }

    removeItem(id, currentList, currentListName) {
        this.deleteItemOnServer(this.state.activeLink, id);

        // const index = currentList.findIndex(p => p.id === id);
        // const itemsCopy = [...currentList];
        // itemsCopy.splice(index, 1);
        // if (currentListName === "movieNamesList") this.setState({ movieNamesList: itemsCopy });
        // else this.setState({ toDoList: itemsCopy });
    }

    // ------- Work with Firebase tables -------//
    getItemsFromServer(currentLink) {
        this.setState({ loading: true });

        const URL = currentLink + ".json";

        axios.get(URL)
            .then(response => {
                if (response.status === 200) { // OK
                    return response.data;
                }
                throw new Error('Something went wrong with network request');
            })
            .then(apiItems => {
                const items = [];
                const arrayOfKeys = Object.keys(apiItems);
                arrayOfKeys.map(currentKey => (
                    items.push({ id: currentKey, name: apiItems[currentKey].name })
                ))
                if (currentLink === "/todo") this.setState({ toDoList: items, loading: false });
                else this.setState({ movieNamesList: items, loading: false });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    sendNewItemToServer(currentLink, newItemName) {
        this.setState({ loading: true });

        const URL = currentLink + ".json";

        axios.post(URL, { name: newItemName })
            .then(response => {
                if (response.status === 200) { // OK
                    return response.data;
                }
                throw new Error('Something went wrong with network request');
            })
            .then(data => {
                console.log(`${newItemName} added to the ${URL} with id: ${data.name}`);
                this.setState({ loading: false });
            })
            .finally(() => {
                this.getItemsFromServer(currentLink);
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    updateItemOnServer(currentLink, id, updatedName) {
        this.setState({ loading: true });

        const URL = `${currentLink}/${id}.json`;

        axios.put(URL, { name: updatedName })
            .then(response => {
                if (response.status === 200) { // OK
                    return response.data;
                }
                throw new Error('Something went wrong with network request');
            })
            .then(data => {
                console.log(`Updated item with id: ${id}, new value of name is ${updatedName}`);
                this.setState({ loading: false });
            })
            .finally(() => {
                this.getItemsFromServer(currentLink);
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    deleteItemOnServer(currentLink, id) {
        const URL = `${currentLink}/${id}.json`;

        axios.delete(URL)
            .then(response => {
                if (response.status === 200) { // OK
                    return response.data;
                }
                throw new Error('Something went wrong with network request');
            })
            .then(data => {
                console.log(`Item with id: ${id} deleted from the ${currentLink}`);
            })
            .finally(() => {
                this.getItemsFromServer(currentLink);
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        if (this.state.activeLink === "") this.setState({ activeLink: window.location.pathname });
    }

    renderItems(newItemName, listTitle, currentList, currentListName) {
        if (this.state.loading) {
            return <Spinner />;
        }
        else
            return (
                <>
                    {
                        <NewItem
                            itemName={this.state[newItemName]}
                            onItemNameChange={(event) => this.updateNewItemName(event, newItemName)}
                            onAddClick={() => this.addNewItem(newItemName)}
                        />
                    }
                    <p>{listTitle}</p>
                    {
                        currentList.map(item => (
                            <Item
                                key={item.id}
                                itemName={item.name}
                                onItemNameChange={(event) => this.updateItemName(item.id, currentList, currentListName, event)}
                                onUpdateClick={() => this.updateItem(item.id, currentList)}
                                onRemoveClick={() => this.removeItem(item.id, currentList, currentListName)}
                            />
                        ))
                    }
                </>
            )
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
                                    <NavLink className="FirebaseProject-navLink" to="/todo" onClick={(event) => this.onNavLinkClick(event)}>To-Do list</NavLink>
                                    <NavLink className="FirebaseProject-navLink" to="/movieNames" onClick={(event) => this.onNavLinkClick(event)}>Movie names list</NavLink>
                                </Col>
                            </Row>
                        </header>

                        <Routes>
                            <Route path="/" element={<p>Choose your list</p>} />
                            <Route path="/63-firebase-list-app" element={<p>Choose your list</p>} />
                            <Route path="/todo" element={
                                this.renderItems("newToDoName", "To-Do list:", this.state.toDoList, "toDoList")
                            } />
                            <Route path="/movieNames" element={
                                this.renderItems("newMovieName", "To watch list:", this.state.movieNamesList, "movieNamesList")
                            } />
                            <Route path="*" element={<h2>404 Page not found</h2>} />
                        </Routes>

                    </Container>
                </BrowserRouter >
            </>
        )
    }
}

export default FirebaseProject