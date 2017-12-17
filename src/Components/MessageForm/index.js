import * as React from 'react';
import styled from 'styled-components';

import { sendMessage } from '../../actions';
import chat from '../../Service/chat';

const Wrapper = styled.form`
    position: fixed;
    bottom: 0px;
    background: white;
    width: 100%;
`;

const TextArea = styled.textarea`
    height: 50px;
    width: 80%;
    border: 0px;
    padding: 10px 15px;
    font-size: 14px;
`;
const SendButton = styled.button`
    position: absolute;
    right: 0px;
    bottom: 10px;

    width: 20%;
    box-sizing: border-box;
    padding: 10px 10px;
    border: 0px;
    background: #3fb183;
    color: white;
    font-weight: 900;
    letter-spacing: 1.05px;
`;

export default class MessageForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
        }

        this.reflectToState = this.reflectToState.bind(this);
        this.send = this.send.bind(this);
    }

    send() {
        const {message} = this.state;
        chat.send(sendMessage(message));
        this.setState({
            message: ''
        });
    }

    reflectToState(e) {
        const name = e.target.getAttribute('name');
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        const { message } = this.state;
        return (
            <Wrapper>
                <TextArea name='message' onChange={this.reflectToState} placeholder="Новое сообщение" value={message} />
                <SendButton onClick={this.send}> Отправить </SendButton>
            </Wrapper>
        )
    }
}  

// export default () => (
//     <Wrapper>
//         <TextArea placeholder="Новое сообщение" />
//         <SendButton> Отправить </SendButton>
//     </Wrapper>
// )