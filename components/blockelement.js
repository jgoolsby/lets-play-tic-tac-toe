import React, { Component } from 'react';

function blockelement(props) {
    return (
        <div
            onClick={(e) => props.handleCellClick(e, props.index)}
            data-cell-index={props.index}
            className="cell"
        >
        </div>
    )
}

export default blockelement
