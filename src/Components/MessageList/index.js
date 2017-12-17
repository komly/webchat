import * as React from 'react';
import { connect } from 'react-redux';

const Message = ({text}) => {
    return (
        <div>
            { text }
        </div>
    )
}


const MessageList = ({messages}) => {
    return (
        <div>
            {
                messages && messages.map(m => <Message {...m.data} />)
            }
            messageList
        </div>
    );
}


export default connect((state) => ({
    messages: state.messages
}))(MessageList);