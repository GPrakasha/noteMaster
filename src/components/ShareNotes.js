import React,{useState, useEffect, useContext} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import firebase from 'firebase';
import { ThemeContext } from '../theme/ThemeContext';

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


    useEffect(() => {
        return () => {
            setCount(0);
        }
    },[]);

    function addInput() {
        const newEmail = count + 1; 
        setCount(newEmail);
    }

    function handleShare() {
        props.selectedNotes.map((noteId) => {
            firebase.database().ref('/notes/' + noteId ).get().then((snap) => {
                const data = snap.val();
                var tempNote = { ...data };
                var update = {};
                tempNote.belongs_to = [...tempNote.belongs_to, ...emails];     
                update['/notes/' + noteId] = tempNote;
                firebase.database().ref().update(JSON.parse(JSON.stringify(update))).then(() => {
                    props.onHide();
                });
            });
            return null;
        })

    }

    const theme = useContext(ThemeContext);

    return (
        <Modal show={props.openShareModal} onHide={() => props.onHide()}>
            <Modal.Header style={theme.currentTheme} closeButton>
                <Modal.Title style={theme.currentTheme}>Share Notes</Modal.Title>
            </Modal.Header>
            <Modal.Body  style={theme.currentTheme}>
                <Form.Text className="text-muted" style={theme.color}>
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