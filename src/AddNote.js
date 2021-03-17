import React, { useState } from 'react';
import {  Form, Button } from 'react-bootstrap';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';
import firebase from './firebase';

function AddNote(props) {

    const [title, setTitle] = useState();
    const [note, setNote] = useState();
    const user_email = localStorage.user_email;

    function handleSave(title, note) {
        var newNoteKey = firebase.database().ref().child('notes').push().key;
        var noteObj = {
            title: title,
            note: note,
            belongs_to: [user_email],
            last_updated: firebase.database.ServerValue.TIMESTAMP
        };
        var update = {};
        update['/notes/' + newNoteKey] = noteObj;
        firebase.database().ref().update(JSON.parse(JSON.stringify(update)));
    }

    return (
        <div>
            <Modal {...props.modalProps}>
                <Form onSubmit={() => handleSave(title, note)}>
                    <Form.Group>
                        <Form.Control required type="text" onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>
                    <hr></hr>
                    <Form.Group>
                        <Form.Control style={{height: "70vh"}} as="textarea" rows={3} onChange={(e) => setNote(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Button onClick={() => props.onHide}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Add
                        </Button>
                    </Form.Group>
                </Form>
            </Modal>
        </div>
    )
}

export default AddNote;