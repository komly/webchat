import * as React from 'react';
import { connect } from 'react-redux';

const Message = ({text}) => {
    return (
        <div>
            { text }
        </div>
    )
}


const MessageList = ({messages}) => (
    <div>
        {
            messages && messages.map(m => <Message {...m} />)
        }
        messageList
    </div>
);


export default connect((state) => ({
    messages: state
}))(MessageList);