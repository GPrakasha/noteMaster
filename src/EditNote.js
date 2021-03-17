import React, {useEffect, useState} from 'react';
import firebase from 'firebase';
import {Form, Button} from 'react-bootstrap';
import { Modal } from 'react-morphing-modal';

function EditNote(props) {
    const [title, setTitle] = useState();
    const [note, setNote] = useState();
    const userId = localStorage.userId;

    useEffect(() => {
        setTitle(props.title);
        setNote(props.note);
    },[]);

    function handleSave(title, note) {
        // var noteRef = firebase.database().ref(
        //     'notes'/+props.key
        // );
        var noteObj = {
            title: title,
            note: note,
            belongs_to: [userId],
            last_updated: firebase.database.ServerValue.TIMESTAMP
        };
        var update = {};
        update['/notes/' + props.key] = noteObj;
        firebase.database().ref().update(JSON.parse(JSON.stringify(update)));
    }

    return (
        <div>
            <Modal {...props.modalProps}
                onHide={props.onHide}>
                <Form onSubmit={() => handleSave(title, note)}>
                    <Form.Group>
                        <Form.Control defaultValue={title} required type="text" onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>
                    <hr></hr>
                    <Form.Group>
                        <Form.Control style={{height: "70vh"}} defaultValue={note} as="textarea" rows={3} onChange={(e) => setNote(e.target.value)}/>
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

export default EditNote;