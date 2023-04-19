// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render, fireEvent, screen, within } from "@testing-library/react";
import Homebar from "./components/other/Homebar";
import Login from "./components/profile/Login";
import React, { useState } from "react";
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom'


//HomeBar Navigation Tests

test('Testing Home Bar Button Text Presence', () => {
  const history = createMemoryHistory();
  render(
    <BrowserRouter>
      <Homebar loggedIn={false}/>
    </BrowserRouter>
  );
  expect(screen.getByTestId('LogInBtn')).toHaveTextContent('Login');
  expect(screen.getByTestId('HomeBtn')).toHaveTextContent('Home');
  expect(screen.getByTestId('SearchBtn')).toHaveTextContent('Search');
});



test('Testing Login Page Details', () => {


  render(
    <BrowserRouter>
    <Login loggedIn={false} setLoggedIn={() => {}}/>
    </BrowserRouter>
  );
  
  expect(screen.getByTestId('loginBtn')).toHaveTextContent('Login');

});

