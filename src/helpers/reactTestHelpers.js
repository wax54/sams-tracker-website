import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from "react-redux";
import { store } from "../models/store"



function preRender(options = {}) {
    const defaultOptions = {
        initialEntries: ['/'],
    }
    const newOptions = {
        initialEntries:
            [...(options.initialEntries || []), ...defaultOptions.initialEntries],
        store: options.store || store
    }
    //console.log('options: ', options, 'newOptions', newOptions);
    return newOptions;
}

export function renderWithRedux(Component, options) {
    options = preRender(options);
    return render(
        <Provider store={options.store}>
            <MemoryRouter initialEntries={options.initialEntries}>
                <Component />
            </MemoryRouter>
        </Provider>
    );
}

export async function renderAndWaitFor(Component, options) {
    options = preRender(options);
    return await waitFor(() => render(
        <Provider store={options.store}>
            <MemoryRouter initialEntries={options.initialEntries}>
                <Component />
            </MemoryRouter>
        </Provider>
    ));
}
