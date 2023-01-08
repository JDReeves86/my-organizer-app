import React from "react";

function DefaultComp(props) {
    return (
        <p {...props.attributes}>{props.children}</p>
    )
}

export default DefaultComp