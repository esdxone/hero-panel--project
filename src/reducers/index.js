// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     filterValue: "All"
// }

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FILTRED':
//             return {
//                 ...state,
//                 filterValue: action.payload
//             }
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
//             case 'FILTERS_FETCHING':
//                 return {
//                     ...state,
//                     filtersLoadingStatus: 'loading'
//             }
//             case 'FILTERS_FETCHED':
//                 return {
//                     ...state,
//                     filters: action.payload,
//                     filtersLoadingStatus: 'idle'
//             }
//             case 'FILTERS_FETCHING_ERROR':
//                 return {
//                     ...state,
//                     filtersLoadingStatus: 'error'
//             }
//         default: return state
//     }
// }

// export default reducer;