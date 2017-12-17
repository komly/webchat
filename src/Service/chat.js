import store, { getState } from '../store';

import actions from '../actions';

const dispatch = store.dispatch.bind(store);

class Chat {
    constructor() {
        this.socket = new WebSocket('ws://127.0.0.1:3000/ws');

        this.socket.onmessage = ({data}) => {
            dispatch({
                type: 'NEW_MESSAGE',
                payload: JSON.parse(data)
            });
        }

        this.socket.onerror = (e) => {
            console.error('onerror e: ', e);
        }
        this.socket.onclose = (e) => {
            console.error('onclose e: ', e);
            alert('Error');
        };
    }
    send(data) {
        console.log('data', data);
        this.socket.send(JSON.stringify(data));
    }

}
export default new Chat();