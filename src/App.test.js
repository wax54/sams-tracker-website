import { renderWithRedux, renderAndWaitFor } from './helpers/reactTestHelpers';
import App from './App';
import { store } from './models/store';

test("doesn't blow up", () => {
    renderWithRedux(App);
});

test("matchesSnapshot", () => {
    const { asFragment } = renderWithRedux(App);
    expect(asFragment()).toMatchSnapshot();
});
