import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {reducer as TodoReducer} from "./slices/todo.slice";
import {apiAuth} from "./slices/apiAuth";



const rootReducers = combineReducers({
    todo: TodoReducer,
    [apiAuth.reducerPath]: apiAuth.reducer
})

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiAuth.middleware)
})

// export const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch