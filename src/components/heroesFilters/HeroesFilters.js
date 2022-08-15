import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import store from "../../store";
import { filtersChange, fetchFilters, selectAll } from "./filtersSlice";
import Spinner from "../spinner/Spinner";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом



const HeroesFilters = () => {

    const dispatch = useDispatch();
    const {filtersLoadingStatus, filterValue} = useSelector(state => state.filters)
    const filters = selectAll(store.getState());

    useEffect(() => {
        dispatch(fetchFilters())
        // eslint-disable-next-line
    }, []);
    const renderItems = (data, status) => {

        if (status === "loading") {
            return <Spinner/>;
        } else if (status === "error") {
            return <h5>Ошибка загрузки данных...</h5>;
        }


        if (data && data.length > 0 ) {
            return data.map(({name, value, id}) => {

                let elementClassName;
                    switch (value) {
                        case 'fire':
                            elementClassName = 'btn-danger';
                            break;
                        case 'water':
                            elementClassName = 'btn-primary';
                            break;
                        case 'wind':
                            elementClassName = 'btn-success';
                            break;
                        case 'earth':
                            elementClassName = 'btn-secondary';
                            break;
                        default:
                            elementClassName = 'btn-outline-dark';
                    }

                return <button
                key={id}
                onClick={() =>  dispatch(filtersChange(value))}
                className={`btn
                ${elementClassName}
                ${filterValue === value ? 'active' : null}`
                }
                >
                {name}
                </button>
            })
        }
    }

    const elements = renderItems(filters, filtersLoadingStatus);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;