import React, { useState, useEffect, useContext } from 'react';
import {  Form, Button } from 'react-bootstrap';
import { Modal, useModal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../theme/ThemeContext';
import CustomLoader from '../common/Loader';

function AddNote(props) {

    const [title, setTitle] = useState();
    const [note, setNote] = useState();
    const user_email = localStorage.user_email;
    const history = useHistory();
    const { modalProps, getTriggerProps } = useModal({
        onClose: () => history.push('/')
    });
    const style = JSON.parse(localStorage.themes)[localStorage.currentTheme];

    function handleSave(title, note) {
        if (title || note) {
            var newNoteKey = firebase.database().ref().child('notes').push().key;
            var noteObj = {
                title: title,
                note: note,
                belongs_to: [user_email],
                last_updated: firebase.database.ServerValue.TIMESTAMP
            };
            var update = {};
            update['/notes/' + newNoteKey] = noteObj;
            firebase.database().ref().update(JSON.parse(JSON.stringify(update))).then(() => {
                history.push('/')
            });   
        }
    }

    useEffect(() => {
        document.getElementById("add").click();
    }, []);

    const theme = useContext(ThemeContext);

    return (
        <div className="vh-100 d-flex w-100">
            <div id="add" {...getTriggerProps({ background: theme.backgroundColor, color: theme.color })} className="m-auto">
                <CustomLoader/>
            </div>
            {
                <Modal {...modalProps}>
                    <Form>
                        <Form.Group>
                            <Form.Control  style={{ background: theme.backgroundColor, color: theme.color }} required type="text" onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <hr></hr>
                        <Form.Group>
                            <Form.Control style={{ height: "70vh", background: theme.backgroundColor, color: theme.color }} as="textarea" rows={3} onChange={(e) => setNote(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="d-flex">
                            <Button onClick={() => history.push('/')} variant={(localStorage.currentTheme === "light") ? "outline-secondary" : "primary"}>
                                Cancel
                            </Button>
                            <Button type="button" className="ml-auto" variant={(localStorage.currentTheme === "light") ? "outline-primary" : "primary"} onClick={() => handleSave(title, note)}>
                                Add
                        </Button>
                        </Form.Group>
                    </Form>
                </Modal>       
            }
        </div>
    )
}

export default AddNote;