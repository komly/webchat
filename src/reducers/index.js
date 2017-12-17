
export default (state = {}, action) => {
    switch(action.type) {
        case 'NEW_MESSAGE':
            return {
                messages: [
                    ...state.messages,
                    action.payload
                ]
            };
        default: 
            // return state;
            return {
                ...state,
                messages: []
            }
    }
}