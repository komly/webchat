import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
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
    constructor(props) {super(props)}

    render() {

        return (
            <Wrapper>
                <TextArea placeholder="Новое сообщение" />
                <SendButton> Отправить </SendButton>
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