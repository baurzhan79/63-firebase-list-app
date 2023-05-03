import React, { Component } from "react";
import "./Item.css";

class Item extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        const result = nextProps.itemName !== this.props.itemName;

        if (result) console.log(`${nextProps.itemName} should update:`, result);
        return result;
    }

    render() {
        return (
            <div className="Item">
                <input className="Item-input" value={this.props.itemName} onChange={this.props.onItemNameChange} placeholder="Movie name is empty" />
                <button className="Item-btn" onClick={this.props.onRemoveClick}>X</button>
            </div>
        )
    }

    componentDidUpdate() {
        console.log(`${this.props.itemName} updated`);
    }
}

export default Item