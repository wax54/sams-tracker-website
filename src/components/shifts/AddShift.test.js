import { renderWithRedux, renderAndWaitFor } from '../../helpers/testHelpers';
import AddShift from './AddShift';
import userEvent from '@testing-library/user-event';
import { store } from '../../models/store';
import { resetAll, startShift } from '../../models/actionCreators';

beforeEach(() => store.dispatch(resetAll()));

test("doesn't blow up", () => {
    renderWithRedux(AddShift);
});

test("matchesSnapshot", () => {
    const { asFragment } = renderWithRedux(AddShift);
    expect(asFragment()).toMatchSnapshot();
});

test("inputs on page", () => {
    const { getByLabelText } = renderWithRedux(AddShift);

    const workTypeInput = getByLabelText("Work-Type");
    expect(workTypeInput).toBeInTheDocument();
    const categoryInput = getByLabelText("Category");
    expect(categoryInput).toBeInTheDocument();
});

test("Can Type into Inputs", async () => {

    const { getByLabelText, getByText, debug } = renderWithRedux(AddShift);
    const workTypeInput = getByLabelText("Work-Type");

    const categoryInput = getByLabelText("Category");

    userEvent.type(workTypeInput, "HELLO");
    userEvent.type(categoryInput, "GOODBYE");

    expect(workTypeInput.value).toEqual("HELLO");
    expect(categoryInput.value).toEqual("GOODBYE");

});

test("Submit lowercases inputs", async () => {
    const { getByLabelText, getByText } = renderWithRedux(AddShift,);

    const workTypeInput = getByLabelText("Work-Type");
    const categoryInput = getByLabelText("Category");

    userEvent.type(workTypeInput, "HELLO");
    userEvent.type(categoryInput, "GOODBYE");

    const clockInBtn = getByText("Clock In");

    userEvent.click(clockInBtn);

    const shifts = store.getState().shifts;
    const shiftId = Object.keys(shifts)[0];
    
    expect(shifts[shiftId].category).toEqual("goodbye");
    expect(shifts[shiftId].type).toEqual("hello");


});

test("Submit fails any empty category", async () => {
    const { getByLabelText, getByText, debug } = renderWithRedux(AddShift,);

    const workTypeInput = getByLabelText("Work-Type");
    const categoryInput = getByLabelText("Category");

    userEvent.type(workTypeInput,"empty category");
    userEvent.type(categoryInput, "");

    const clockInBtn = getByText("Clock In");

    userEvent.click(clockInBtn);

    expect(Object.keys(store.getState().shifts).length).toBe(0);
    expect(getByText('input must be filled')).toBeInTheDocument();


});
test("Submit fails any empty type", async () => {
    const { getByLabelText, getByText, debug } = renderWithRedux(AddShift,);

    const workTypeInput = getByLabelText("Work-Type");
    const categoryInput = getByLabelText("Category");

    userEvent.type(workTypeInput, "");
    userEvent.type(categoryInput, "empty type");

    const clockInBtn = getByText("Clock In");

    userEvent.click(clockInBtn);

    expect(Object.keys(store.getState().shifts).length).toBe(0);
    expect(getByText('input must be filled')).toBeInTheDocument();

});


test("Submit fails if already working type and category", async () => {
    store.dispatch(startShift("testtype", "testcategory"));

    const { getByLabelText, getByText, debug } = renderWithRedux(AddShift);

    const workTypeInput = getByLabelText("Work-Type");
    const categoryInput = getByLabelText("Category");


    userEvent.type(workTypeInput, "testType");
    userEvent.type(categoryInput, "testCategory");

    const clockInBtn = getByText("Clock In");

    userEvent.click(clockInBtn);

    expect(Object.keys(store.getState().shifts).length).toBe(1);
    expect(getByText(`Already clocked in to testtype for testcategory`)).toBeInTheDocument();

});