import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import { Switch, Input } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import Note from '../components/Note';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ShareNotes from '../components/ShareNotes';
import { useHistory } from 'react-router-dom';
import { store } from '../App.js';
import { ThemeContext, Themes } from '../theme/ThemeContext';
import ThemedButton from '../components/ThemedButton';
import CustomLoader from '../common/Loader';

function Notes(props) {

    const [notes, setNotes] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const user_email = localStorage.user_email;
    const [isMultiSelect, setMultiSelect] = useState(false);
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [openShareModal, setShareModal] = useState(false);
    const [filteredNotes, setFilteredNotes] = useState();
    const history = useHistory();

    useEffect(() => {
        if(store.getState().notesReducer.notes.length !== 0) {
            setNotes(store.getState().notesReducer.notes);
            setLoaded(true);
        } else {
            var nodeRef = firebase.database().ref('notes');
            nodeRef.on('value', (snapshot) => {
                var allNotes = [];
                const data = snapshot.val();
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        data[key]["id"] = key;
                        data[key]?.belongs_to?.includes(user_email) &&
                            allNotes.push({
                                title: data[key].title,
                                last_updated: data[key].last_updated,
                                id: key
                            });
                    }
                }
                setNotes(allNotes);
                store.dispatch({
                    type: 'ADD_NOTE',
                    payload: {
                        notes: allNotes
                    }
                });
                setLoaded(true);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setFilteredNotes(notes.filter(note => note.title.toLocaleLowerCase().includes(e.target.value)));
    }

    function handleShare(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!selectedNotes.length > 0) {
            alert("please select atleast one note");
        } else {
            setShareModal(true);
        }
    }

    const theme = useContext(ThemeContext);

    return (
        <div className="d-flex flex-column w-100" style={{minHeight: "100vh", overflowY: "scroll"}}>
            <div className="d-flex flex-wrap mt-4">
                <ThemedButton className="m-auto">
                    Light
                    <Switch
                        checked={theme.currentTheme !== Themes.LIGHT}
                        onChange={() => theme.changeTheme()}
                    />
                    Dark
                </ThemedButton>
                <div className="m-auto">
                    <Input
                        type="text"
                        style={{height: "52px"}}
                        className={theme.currentTheme !== Themes.LIGHT ? "border-bottom border-primary" : null}
                        onChange={(e) => handleSearch(e)}
                    ></Input>
                    <ThemedButton style={{height: "52px", width: "52px"}}>
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    </ThemedButton>
                </div>
                <ThemedButton className="m-auto">
                    Multi Select notes
                    <Switch
                        checked={isMultiSelect}
                        onChange={() => {
                            setMultiSelect(!isMultiSelect);
                            setSelectedNotes([]);
                        }}
                    />
                </ThemedButton>
                {
                    <ThemedButton className="m-auto">
                        {selectedNotes.length} selected <Button className={(!selectedNotes.length > 0) ? '' : ''} disabled={!selectedNotes.length > 0} onClick={(e) => handleShare(e)}>Share</Button>
                    </ThemedButton>
                }
                <div className="m-auto">
                    <ThemedButton style={{height: "52px"}} onClick={() => {firebase.auth().signOut(); history.go('')}}><div><FontAwesomeIcon icon={faSignOutAlt} className="mr-2"></FontAwesomeIcon>Logout</div></ThemedButton>
                </div>
            </div>
            <FlipMove enterAnimation="none" leaveAnimation="none"  className="mt-4 d-flex flex-column" key={filteredNotes?.length || selectedNotes}>
            {
                (loaded && notes) ? 
                filteredNotes.map((note, index) => (
                    <Note
                        title={note.title} 
                        last_updated={
                            moment(note.last_updated).fromNow()
                        }
                        isMultiSelect={isMultiSelect}
                        isSelected={selectedNotes.includes(note.id)}
                        key={note.id}
                        id={note.id}
                        handleNoteSelection={handleNoteSelection}
                    />
                ))
                : 
                <div className="m-auto">
                    <CustomLoader />
                </div>
            }
            </FlipMove>
            <ThemedButton 
                style={{width: "50%"}}
                className="mb-auto ml-auto mr-auto"
                onClick={() => history.push('/add')}
            >
                Add
            </ThemedButton>
            <ShareNotes 
                openShareModal={openShareModal}
                onHide={() => setShareModal(false)}
                selectedNotes={selectedNotes}
            />
        </div>
    );
}


export default Notes;