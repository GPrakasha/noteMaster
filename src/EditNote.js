import React, {useEffect, useState} from 'react';
import firebase from 'firebase';
import {Form, Button} from 'react-bootstrap';
import { Modal, useModal } from 'react-morphing-modal';
import { useHistory, useLocation } from 'react-router-dom';

function EditNote() {
    const [title, setTitle] = useState();
    const [note, setNote] = useState();
    const userId = localStorage.user_email;
    const history = useHistory();
    const [loaded, setLoaded] = useState();
    const { modalProps, getTriggerProps } = useModal({
        onClose: () => history.push('/')
    });
    const location = useLocation();
    const noteId = location.pathname.split('/')[2];

    useEffect(() => {
        firebase.database().ref('notes/' + noteId).on('value', function (snap) {
            const data = snap.val();
            setNote(data.note)
            setTitle(data.title);
            setLoaded(true);
        });
    }, []);

    const style = JSON.parse(localStorage.themes)[localStorage.currentTheme];

    useEffect(() => {
        document.getElementById(noteId).click();
    }, [loaded])

    function handleSave(title, note) {
        var noteObj = {
            title: title,
            note: note,
            belongs_to: [userId],
            last_updated: firebase.database.ServerValue.TIMESTAMP
        };
        var update = {};
        update['/notes/' + noteId] = noteObj;
        firebase.database().ref().update(JSON.parse(JSON.stringify(update))).then(() => {
            history.push('/')
        });
    }

    return (
        <div className="vh-100 d-flex w-100">
            <div id={noteId} {...getTriggerProps({ background: style.background, color: style.color })} className="m-auto">Loading</div>
            {
                loaded && (
                    <Modal {...modalProps}>
                    <Form>
                        <Form.Group>
                            <Form.Control style={{ background: style.background, color: style.color }} defaultValue={title} required type="text" onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <hr></hr>
                        <Form.Group>
                            <Form.Control style={{ height: "70vh", background: style.background, color: style.color }} defaultValue={note} as="textarea" rows={3} onChange={(e) => setNote(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="d-flex">
                            <Button onClick={() => history.push('/')} variant={(localStorage.currentTheme === "light") ? "outline-secondary" : "primary" }>
                                Cancel
                            </Button>
                            <Button type="button" className="ml-auto" variant={(localStorage.currentTheme === "light") ? "outline-primary" : "primary" } onClick={() => handleSave(title, note)}>
                                Save
                        </Button>
                        </Form.Group>
                    </Form>
                </Modal>
                )
            }
        </div>
    )
}

export default EditNote;