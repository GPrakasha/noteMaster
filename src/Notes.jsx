import React, { useState, useEffect, Fragment } from 'react';
import firebase from './firebase';
import FlipMove from 'react-flip-move';
import Swal from 'sweetalert2';
import { Switch, Input } from '@material-ui/core';
import withReactContent from 'sweetalert2-react-content';
import { Form, Col, Button, Nav } from 'react-bootstrap';
import { useModal, Modal } from 'react-morphing-modal';
import AddNote from './AddNote';
import Note from './Note';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ShareNotes from './ShareNotes';


function Notes() {
    
    const [notes, setNotes] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const user_email = localStorage.user_email;
    const { modalProps, getTriggerProps } = useModal();
    const [isMultiSelect, setMultiSelect] = useState(false);
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [openShareModal, setShareModal] = useState(false);
    const [filteredNotes, setFilteredNotes] = useState();

    useEffect(() => {
        console.log(notes);
        var nodeRef = firebase.database().ref('notes');
        nodeRef.on('value', (snapshot) => {
            var allNotes = [];
            const data = snapshot.val();
            for(var key in data) {
                if(data.hasOwnProperty(key)) {
                    console.log(typeof(key));
                    data[key]["id"] = key;
                    data[key]?.belongs_to?.includes(user_email) && 
                        allNotes.push({
                            title: data[key].title,
                            last_updated: data[key].last_updated,
                            id: key
                        }) ;
                }
            }
            setNotes([...new Set(allNotes, notes)]);
            setLoaded(true);
        });
    }, []);
    
    useEffect(() => {
        setFilteredNotes(notes);
    }, [notes]);

    function handleNoteSelection(key, isSelected) {
        !isSelected ?
            setSelectedNotes([...selectedNotes, key])
        :
            setSelectedNotes(selectedNotes.filter((x) => x !== key));
            
    }

    function handleSearch(e) {
        e.preventDefault();
        e.stopPropagation();
        setFilteredNotes(notes.filter(note => note.title.includes(e.target.value)));
    }

    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row mt-4">
                <Button className="m-auto">Light<Switch checked={isMultiSelect} onChange={() => setMultiSelect(!isMultiSelect)} name="checkedA" />Dark</Button>
                <div className="m-auto">
                    <Input type="text" onChange={(e) => handleSearch(e)}></Input>
                    <Button variant="outline-primary"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></Button>
                </div>
                <Button variant="outline-secondary" className="m-auto">
                    Multi Select notes
                    <Switch checked={isMultiSelect} onChange={() => setMultiSelect(!isMultiSelect)} name="checkedA" />
                </Button>
                {
                    isMultiSelect &&
                    <Button variant="outline-secondary" className="m-auto">
                        {selectedNotes.length} selected <Button onClick={() => setShareModal(true)}>Share</Button>
                    </Button>
                }
            </div>
            <FlipMove className="mt-4">
            {
                loaded && notes ? 
                filteredNotes.map((note, index) => (
                    <div key={index}>
                        <Note
                            title={note.title} 
                            last_updated={
                                moment(notes.last_updated).fromNow()
                            }
                            isMultiSelect={isMultiSelect}
                            key={note.id}
                            id={note.id}
                            handleNoteSelection={handleNoteSelection}
                        />
                    </div>
                ))
                : <div>Loader</div>
            }
            </FlipMove>
            <Button 
                style={{width: "50%"}}
                className="m-auto"
                onClick={() => setShowModal(true)} 
                variant="primary"  
                {...getTriggerProps({ background: '#ECEBEB'})}
            >
                Add
            </Button>
            <AddNote
                modalProps={modalProps}
                show={showModal}
                onHide={() => setShowModal(false)}
            />
            <ShareNotes 
                openShareModal={openShareModal}
                onHide={() => setShareModal(false)}
                selectedNotes={selectedNotes}
            />
        </div>
    );
}

export default Notes;