import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from '../reducers/rootReducer.js';

const initialState = {};

const persistConfig = {
    key: 'root',
    storage,
  }

// const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer)
console.log(persistedReducer)


export const store = createStore(
    persistedReducer,
    initialState, 
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export const persistor = persistStore(store)
