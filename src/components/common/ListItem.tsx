import React from "react";

const ListItem = React.memo((props) => {
    const { id, name, quantity, handleRemoveQuantity, handleAddQuantity } = props
    return (
        <li key={id}>
            <p>{name}</p>
            <p role="timer">{new Date().getTime()}</p>
            <button
                aria-label={`item-${id}-remove`}
                onClick={() => handleRemoveQuantity(id)}
            >
                -1
            </button>
            <span>{quantity}</span>
            <button
                aria-label={`item-${id}-add`}
                onClick={() => handleAddQuantity(id)}
            >
                +1
            </button>
        </li>
    );
});

ListItem.displayName = 'ListItem'

export default ListItem