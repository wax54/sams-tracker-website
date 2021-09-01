import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import thunk from "redux-thunk";
import root from "./reducers";
import { createStore, applyMiddleware } from "redux";

/**TODO 
 * UPDATE SHIFT STORAGE FROM API ON INIT LOAD.
 * 
 * ALREADY UPDATES SHIFTS ON USER AUTH 
 */

//merges the initial state with the incoming state with a shallow merge
//reset everytime for testing
localStorage.clear();
const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, root);

//the Redux Store
export const store = createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(thunk),
    )
);

/** an object containing 
 * .purge()
 *    purges state from disk and returns a promise
 * .flush()
 *    immediately writes all pending state to disk and returns a promise
 * .pause()
 *    pauses persistence
 * .persist()
 *    resumes persistence
 */
export const persistedStore = persistStore(store);
