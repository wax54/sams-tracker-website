import { renderWithRedux, renderAndWaitFor } from '../../helpers/reactTestHelpers';
import Login from './Login';
import { createStore } from 'redux';
import userEvent from '@testing-library/user-event';
import { MockApi } from '../../setupTests';
import { store } from '../../models/store';
import { waitFor } from '@testing-library/react';
import { resetAll } from '../../models/actionCreators';

//the history object we will be seeing if called
const mockHistory = { push: jest.fn() };
jest.mock('react-router-dom', () => (
    {
        ...jest.requireActual('react-router-dom'),
        useHistory: () => mockHistory,
    }));



beforeEach(() => store.dispatch(resetAll()));

test("doesn't blow up", () => {
    renderWithRedux(Login);
});

test("matchesSnapshot", () => {
    const { asFragment } = renderWithRedux(Login);
    expect(asFragment()).toMatchSnapshot();
});

test("inputs on page", () => {
    const { getByLabelText } = renderWithRedux(Login);

    const usernameInput = getByLabelText("Username:");
    expect(usernameInput).toBeInTheDocument();
    const passwordInput = getByLabelText("Password:");
    expect(passwordInput).toBeInTheDocument();
});

test("Can Type into Inputs", async () => {

    const { getByLabelText, getByText, debug } = renderWithRedux(Login);

    const usernameInput = getByLabelText("Username:");

    const passwordInput = getByLabelText("Password:");
    
    userEvent.type(usernameInput, "HELLO");
    userEvent.type(passwordInput, "GOODBYE" );

    expect(usernameInput.value).toEqual("HELLO");
    expect(passwordInput.value).toEqual("GOODBYE");

});

test("Submit works with valid creds", async () => {
    createStore
    const { getByLabelText, getByText } = renderWithRedux(Login,);

    const usernameInput = getByLabelText("Username:");
    const passwordInput = getByLabelText("Password:");
    userEvent.type(usernameInput, MockApi.VALID_CREDENTIALS.username);
    userEvent.type(passwordInput, MockApi.VALID_CREDENTIALS.password);

    const loginBtn = getByText("Login!");

    userEvent.click(loginBtn);

    await waitFor(() => expect(mockHistory.push).toBeCalledWith('/'));
    expect(store.getState().user).toEqual(MockApi.VALID_USER);

});

test("Submit fails with invalid creds", async () => {
    createStore
    const { getByLabelText, getByText, debug } = renderWithRedux(Login,);

    const usernameInput = getByLabelText("Username:");
    const passwordInput = getByLabelText("Password:");
    userEvent.type(usernameInput, MockApi.VALID_CREDENTIALS.username);
    userEvent.type(passwordInput, "BAD PASSWORD");

    const loginBtn = getByText("Login!");

    userEvent.click(loginBtn);

    await waitFor(() => expect(mockHistory.push).not.toBeCalledWith('/'));
    expect(store.getState().user).toEqual({});
    expect(getByText(`Invalid Credentials!`)).toBeInTheDocument();

});