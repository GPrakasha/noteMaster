import React, { useState, useEffect } from 'react';
import './Note.css'
import { useModal } from 'react-morphing-modal';
import EditNote from './EditNote';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import firebase from 'firebase';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

function Note(props) {

    const [showModal, setShowModal] = useState(false);
    const { modalProps, getTriggerProps } = useModal();
    const [isSelected, setSelected] = useState(false);
    const [note, setNote] = useState();
    const location = useLocation();
    const noteId = location.pathname.split('/')[2];
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        firebase.database().ref('notes/' + (noteId || props.id)).on('value', function (snap) {
            setNote(snap.val());
            console.log(snap.val())
        });
        console.log(note)
        setLoading(true);
    }, []);

    useEffect(() => {
        if (!props.id) {
            document.getElementById(noteId || props.id).click();
        }
    },[note])

    return (
        <>
            {
                <div  onClick={() => setShowModal(true)}>
                    <div className="d-flex NoteItem" id={noteId || props.id}
                        {...getTriggerProps({ background: "#ECEBEB" })}
                    >
                        {
                            props.isMultiSelect &&
                            <div style={props?.isMultiSelect ? checkBox : null} onClick={(e) => handleCheck(e)}>
                                {isSelected ? <FontAwesomeIcon icon={faCheckSquare} className="m-auto" size="2x" /> : null}
                            </div>
                        }
                        <div className="mr-auto ml-4 mt-auto mb-auto text-truncate" style={{ maxWidth: "75%" }}>
                            {props?.title || note?.title}
                        </div>
                        <div className="ml-auto mr-4 mt-auto mb-auto text-truncate">
                            {props?.last_updated || note?.last_updated}
                        </div>
                    </div>
                </div>
                }
            {
                showModal &&
                <EditNote
                    modalProps={modalProps}
                    onHide={() => setShowModal(false)}
                    show={showModal}
                    title={note?.title}
                    note={note?.note}
                    key={note?.key}
                />
            }
        </>
    )
}

export default Note;