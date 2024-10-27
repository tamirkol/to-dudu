import { todoReducer } from "./reducers/todo.reducer.js"
import { combineReducers, compose, applyMiddleware, legacy_createStore as createStore } from "redux"

const rootReducer = combineReducers({
    todoModule: todoReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware()))

window.gStore = store
