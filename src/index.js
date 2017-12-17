import React from 'react';
import ReactDOM from 'react-dom';
import styled, { injectGlobal } from 'styled-components';
import { Provider } from 'react-redux';

import Header from './Components/Header';
import MessageForm from './Components/MessageForm';
import MessageList from './Components/MessageList';
import chat from './Service/chat';

import store from './store';

injectGlobal`
  html, body {
    margin: 0;
    height: 100%;
    background: #90fdd1;
}
  
`;

const Wrapper = styled.div`

`;



const App = () => (
    <Provider store={store}>
        <Wrapper>
            <Header />
            <MessageList />
            <MessageForm />
        </Wrapper>
    </Provider>
)


ReactDOM.render(<App />, document.getElementById('root'));
