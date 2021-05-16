import { NOTE_ACTION } from '../common/constants';

const default_state = {
    notes: []
};

export function notesReducer(state = default_state, action) {
    switch(action.type) {
        case NOTE_ACTION.ADD:
            const newState = [...new Set(...state.notes,action.notes)];
            console.log(newState); 
            return {
                notes: newState
            } 
        case NOTE_ACTION.DELETE: 
            return state
        default:
            return state 
    }
}