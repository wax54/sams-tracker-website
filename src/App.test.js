import { renderWithRedux, renderAndWaitFor } from './helpers/testHelpers';
import App from './App';
import { store } from './models/store';

test("doesn't blow up", () => {
    renderWithRedux(App);
});

test("matchesSnapshot", () => {
    const { asFragment } = renderWithRedux(App);
    expect(asFragment()).toMatchSnapshot();
});
