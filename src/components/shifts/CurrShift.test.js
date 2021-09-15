import { renderWithRedux, renderAndWaitFor } from '../../helpers/reactTestHelpers';
import CurrShift from './CurrShift';
import userEvent from '@testing-library/user-event';
import { store } from '../../models/store';
import { resetAll } from '../../models/actionCreators';
import { minsFrom, Shift } from '../../models/ShiftCollection';


const start = new Date();
const stop = minsFrom(10, start)
const TEST_SHIFT = new Shift({ id: 0, type: "testtype", category: "testcategory", start, stop });

beforeEach(() => {
    store.dispatch(resetAll());
    store.dispatch({ type: "START_SHIFT", payload: TEST_SHIFT });
});

test("doesn't blow up", () => {
    renderWithRedux(() => <CurrShift shift={TEST_SHIFT} />);
});

test("matchesSnapshot", () => {
    const { asFragment } = renderWithRedux(() => <CurrShift shift={TEST_SHIFT} />);
    expect(asFragment()).toMatchSnapshot();
});


test("Shift on page", () => {
    const { getByText,} = renderWithRedux(() => <CurrShift shift={TEST_SHIFT} />);
    expect(getByText(TEST_SHIFT.type)).toBeInTheDocument();
    expect(getByText(TEST_SHIFT.category)).toBeInTheDocument();
    expect(getByText(TEST_SHIFT.getFormattedDuration().trim())).toBeInTheDocument();
});

test("deletes shift when cancel is pressed", () => {
    const { getByText } = renderWithRedux(() => <CurrShift shift={TEST_SHIFT} />);
    const cancelBtn = getByText("CANCEL SHIFT");

    expect(Object.keys(store.getState().shifts).length).toBe(1);
    userEvent.click(cancelBtn);

    expect(Object.keys(store.getState().shifts).length).toBe(0);

});