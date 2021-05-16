import React, { useState } from 'react';
import './Note.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

function Note(props) {

    const history = useHistory();
    const [isSelected, setSelected] = useState(false);

    const checkBox = {
        border: "1px solid gray",
        height: "40px",
        width: "40px",
        display: "flex",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "10px",
        borderRadius: "4px",
    }

    function handleCheck(e) {
        e.stopPropagation();
        e.preventDefault();
        setSelected(!isSelected);
        props.handleNoteSelection(props.id, isSelected)
    }
    
    function handleClick() {
        history.push('/notes/' + props.id);
    }

    return (
        <div
            className="d-flex NoteItem mb-4"
            onClick={() => handleClick()}
            style={{
                cursor: "pointer"
            }}
        >
            {
                props.isMultiSelect &&
                <div style={props?.isMultiSelect ? checkBox : null} onClick={(e) => handleCheck(e)}>
                    {isSelected ? <FontAwesomeIcon icon={faCheckSquare} className="m-auto" size="2x" /> : null}
                </div>
            }
            <div className="mr-auto ml-4 mt-auto mb-auto text-truncate" style={{ maxWidth: "75%" }}>
                {props?.title}
            </div>
            <div className="ml-auto mr-4 mt-auto mb-auto text-truncate">
                {props?.last_updated}
            </div>
        </div>
    )
}

export default Note;