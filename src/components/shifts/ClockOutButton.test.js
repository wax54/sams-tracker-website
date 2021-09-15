import { renderWithRedux, renderAndWaitFor } from '../../helpers/reactTestHelpers';
import ClockOutButton from './ClockOutButton';
import { createStore } from 'redux';
import userEvent from '@testing-library/user-event';
import { store } from '../../models/store';
import { resetAll, startShift } from '../../models/actionCreators';
import { minsFrom, Shift } from '../../models/ShiftCollection';


const start = new Date();
const stop = minsFrom(10, start)
const TEST_SHIFT = new Shift({ id: 0, type: "testtype", category: "testcategory", start, stop });
const addShift = (shift) => ({ type: "START_SHIFT", payload: shift });


beforeEach(() => {
    store.dispatch(resetAll());
    store.dispatch(addShift(TEST_SHIFT));
});

test("doesn't blow up", () => {
    renderWithRedux(() => <ClockOutButton shiftId={TEST_SHIFT.id} />);
    renderWithRedux(() => <ClockOutButton shiftId={'non existent'} />);
});

test("matchesSnapshot", () => {
    const { asFragment:withValidShiftId} = renderWithRedux(() => 
        <ClockOutButton shiftId={TEST_SHIFT.id} />
    );

    expect(withValidShiftId()).toMatchSnapshot();

    const { asFragment: withoutValidShiftId } = renderWithRedux(() => 
        <ClockOutButton shiftId={'non existent'} />
    );
    expect(withoutValidShiftId()).toMatchSnapshot();
    
});


test("Default Buttons on Page", () => {
    const { getByText, } = renderWithRedux(() => <ClockOutButton shiftId={TEST_SHIFT.id} />);
    expect(getByText("Clock Out")).toBeInTheDocument();
    expect(getByText("CANCEL SHIFT")).toBeInTheDocument();
});

test("clockOut 15mins ago appears when shift older than 15mins", () => {
    
    const olderThan15Mins = {
        ...TEST_SHIFT,
        id: 'testShift2',
        start: minsFrom(-16),
    }

    store.dispatch(addShift(olderThan15Mins));

    const { getByText: getOlderByText } = renderWithRedux(() => <ClockOutButton shiftId={olderThan15Mins.id} />);
    expect(getOlderByText("15 MINUTES AGO")).toBeInTheDocument();
});

test("clockOut 15mins ago Does not appears when shift older than 15mins", () => {

    const youngerThan15Mins = {
        ...TEST_SHIFT,
        id: 'testShift1',
        start: minsFrom(-14)
    }

    store.dispatch(addShift(youngerThan15Mins));

    const { queryByText: queryYoungerByText } = renderWithRedux(() => <ClockOutButton shiftId={youngerThan15Mins.id} />);
    expect(queryYoungerByText("15 MINUTES AGO")).not.toBeInTheDocument();
});


test("deletes shift when CANCEL SHIFT is pressed", () => {
    const { getByText } = renderWithRedux(() => 
        <ClockOutButton shiftId={TEST_SHIFT.id} />
    );
    const cancelBtn = getByText("CANCEL SHIFT");

    expect(Object.keys(store.getState().shifts).length).toBe(1);
    userEvent.click(cancelBtn);
    expect(Object.keys(store.getState().shifts).length).toBe(0);

});