import React, { Component } from "react";
import "./NewItem.css";

class NewItem extends Component {
    render() {
        return (
            <div className="NewItem">
                <input className="NewItem-input" value={this.props.itemName} onChange={this.props.onItemNameChange} placeholder="Enter the name" />
                <button className="NewItem-btn" onClick={this.props.onAddClick}>Add</button>
            </div>
        )
    }
}

export default NewItem