import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from '../reducers/rootReducer.js';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const initialState = {};

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    initialState, 
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export const persistor = persistStore(store)
