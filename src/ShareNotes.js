import React,{useState, useEffect} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import firebase from 'firebase';

function ShareNotes(props) {

    const [emails, setEmails] = useState([]);
    const [count, setCount] = useState(0);
    const [emailTags, setEmailTags] = useState([]);

    function handleEmailInput(email) {
        var temp = [...emails];
        temp[count] = email;
        setEmails(temp);
    }

    useEffect(() => {
        setEmailTags([...emailTags,
        ...[
            <Form.Group>
                <Form.Control type="email" id={count} placeholder="Enter email" onChange={(e) => handleEmailInput(e.target.value)} />
            </Form.Group>
        ]
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    function addInput() {
        const newEmail = count + 1; 
        setCount(newEmail);
    }

    function handleShare() {
        props.selectedNotes.map((noteId) => {
            firebase.database().ref('/notes/' + noteId ).get().then((snap) => {
                const data = snap.val();
                var tempNote = { ...data };
                tempNote.belongs_to = [...tempNote.belongs_to, ...emails];     
                var update = {};
                update['/notes/' + noteId] = tempNote;
                firebase.database().ref().update(JSON.parse(JSON.stringify(update))).then(() => {
                    props.onHide();
                });
            });
            return null;
        })

    }

    return (
        <Modal show={props.openShareModal} onHide={() => props.onHide()}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                <Form.Label>Share to</Form.Label>
                {emailTags}
                <Button onClick={() => addInput()}>
                    Add
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onHide()}>
                    Close
            </Button>
                <Button variant="primary" onClick={() => handleShare()}>
                    Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ShareNotes;