import React,{useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import firebase from 'firebase';

function ShareNotes(props) {

    const [emails, setEmails] = useState([]);
    const [count, setCount] = useState(0);
    const [noteSnap, setNoteSnap] = useState();

    function handleEmailInput(email) {
        var temp = emails;
        temp[count] = email;
        console.log(emails, temp)
        setEmails(temp);
    }

    const [emailTags, setEmailTags] = useState([
        <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" id={count} onChange={(e) => handleEmailInput(e.target.value)}/>
        </Form.Group>
    ]);

    function addInput() {
        setCount(count+1);
        setEmailTags([...emailTags, 
            <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" id={count} placeholder="Enter email" onChange={(e) => handleEmailInput(e.target.value)} />
        </Form.Group>
        ]);
    }

     

    function handleShare() {
        props.selectedNotes.map((noteId) => {
            firebase.database().ref('/notes/' + noteId ).get().then((snap) => {
                setNoteSnap(snap.val());
                console.log(noteSnap);
            });
            var tempNote = noteSnap;
            console.log(noteSnap);
            tempNote.belongs_to = [...tempNote.belongs_to, ...emails];
            setNoteSnap(tempNote); 
            console.log(tempNote);           
            var update = {};
            update['/notes/' + noteId] = noteSnap;
            firebase.database().ref().update(JSON.parse(JSON.stringify(update)));

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