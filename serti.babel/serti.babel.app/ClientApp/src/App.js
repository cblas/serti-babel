import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import GlobalStyles from './components/GlobalStyles';


const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<Home />} />

            </Routes>
        </ThemeProvider>
    );
}

export default App;