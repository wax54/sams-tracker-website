import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithUserContext } from '../testHelpers';
import Signup from './Signup';

//the history object we will be seeing if called
const mockHistory = { push: jest.fn() };
//setting up a mock of the react-router-dom, where almost 
//everything is the same except useHistory returns our mocked history instead
jest.mock('react-router-dom', () => (
    {
        ...jest.requireActual('react-router-dom'),
        useHistory: () => mockHistory,
    }));

describe('Signup Tests', () => {    
    const context = { registerUser: (data) => Promise.resolve({status: true}) }

    test("doesn't blow up", () => {
        renderWithUserContext(Signup, { context });
    });

    test("matchesSnapshot", () => {
        const { asFragment, getByText } = renderWithUserContext(Signup, { context });
        expect(asFragment()).toMatchSnapshot();


        const submitBtn = getByText("Sign Up!");
        fireEvent.click(submitBtn);
    });

    test("gets form data back when submitted", () => {
        const context = {
            registerUser: (data) => {
                result = data;
                return { status: true };
            }
        }

        let result = false;
        const { getByText } = renderWithUserContext(
            Signup, 
            { context });

        const submitBtn = getByText("Sign Up!");
        fireEvent.click(submitBtn);

        expect(result).toEqual({
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: ""
        });
    });

    test("redirects to home on success", async () => {

        const { queryByText} = renderWithUserContext(Signup, { context });
        const submitBtn = queryByText("Sign Up!");

        fireEvent.click(submitBtn);
        await waitFor(() => expect(mockHistory.push).toBeCalledWith('/'));
    });

    test("Errors are displayed when they are passed back from registerUser", async () => {
        const { queryByText, debug } = 
            renderWithUserContext(
                Signup, 
                { context: 
                    { registerUser: (data) => Promise.resolve({ status: false, errors: ["DB ERROR"] }) },
                }
            );
        const submitBtn = queryByText("Sign Up!");
        
        expect(queryByText("DB ERROR")).not.toBeInTheDocument();

        fireEvent.click(submitBtn);
        await waitFor(() => expect(queryByText("DB ERROR")).toBeInTheDocument());
    });
    
});
