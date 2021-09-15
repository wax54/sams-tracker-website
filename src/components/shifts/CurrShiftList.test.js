import { renderWithRedux, renderAndWaitFor } from '../../helpers/testHelpers';
import CurrShiftList from './CurrShiftList';
import { store } from '../../models/store';
import { resetAll } from '../../models/actionCreators';

beforeEach(() => store.dispatch(resetAll()));
const TEST_SHIFT = {id:0, type:"testtype", category:"testcategory"};
test("doesn't blow up", () => {
    renderWithRedux(CurrShiftList);
});

test("matchesSnapshot", () => {
    const { asFragment } = renderWithRedux(CurrShiftList);
    expect(asFragment()).toMatchSnapshot();
});

test("matchesSnapshot with currShifts", () => {
    store.dispatch({ type: "START_SHIFT", payload: TEST_SHIFT});
    const { asFragment } = renderWithRedux(CurrShiftList);
    expect(asFragment()).toMatchSnapshot();
});


test("Not On Page when No Curr Shifts", () => {
    const { queryByText } = renderWithRedux(CurrShiftList);
    expect(queryByText("Current Shifts")).not.toBeInTheDocument();

});

test("currShifts on page", () => {
    store.dispatch({ type: "START_SHIFT", payload: TEST_SHIFT });

    const { getByText } = renderWithRedux(CurrShiftList);
    expect(getByText(TEST_SHIFT.type)).toBeInTheDocument();
    expect(getByText(TEST_SHIFT.category)).toBeInTheDocument();

});
