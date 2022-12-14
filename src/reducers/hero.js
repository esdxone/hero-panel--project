import { createReducer } from "@reduxjs/toolkit"

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesAddItem,
    heroesDeleteItem
} from '../components/heroesList/heroesSlice'

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroesAddItem, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(heroesDeleteItem, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        })
        .addDefaultCase(() => {});
})

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HEROES_DELETE_ITEM':
//             return  {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload)
//             };

//             case 'HEROES_ADD_ITEM':
//             return {
//                 ...state,
//                 heroes: [...state.heroes,...action.payload],
//                 heroesLoadingStatus: 'idle'
//             }
//         default: return state
//     }
// }

export default heroes;