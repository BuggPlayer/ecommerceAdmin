
import { createStore, combineReducers, applyMiddleware } from "redux";
// import { productCartReducer } from "../store/reducers/ProductReducer";



const rootReducer = combineReducers({
//   product: productCartReducer,
});

export const store = createStore(rootReducer);