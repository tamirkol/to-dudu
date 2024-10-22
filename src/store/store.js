import { todoReducer } from "./reducers/todo.reducer.js"
import { combineReducers, compose, legacy_createStore as createStore } from "redux"

const rootReducer = combineReducers({
    todoModule: todoReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : () => { }

export const store = createStore(rootReducer, middleware)

window.gStore = store
