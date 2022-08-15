import { useState, useEffect } from "react";
import { useDispatch, useSelector, getState } from "react-redux";
import { fetchFilters, selectAll } from "../heroesFilters/filtersSlice";
import { useHttp } from "../../hooks/http.hook";
import { v4 as uuidv4 } from 'uuid';
import { useCreateHeroMutation } from "../../api/apiSlice";
import store from "../../store";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать ++
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid ++
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:d
// Элементы <option></option> желательно сформировать на базе ++
// данных из фильтров ++

const HeroesAddForm = () => {

    const dispatch = useDispatch();
    const [createHero, {isLoading}] = useCreateHeroMutation();
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');


    const onSubmit = (e) => {
        e.preventDefault();
        const formResult = {
            id: uuidv4(),
            name,
            description,
            element
        };
        createHero(formResult).unwrap();
        setName('');
        setDescription('');
        setElement('');

    }

    useEffect(() => {
        dispatch(fetchFilters())

        // eslint-disable-next-line
    }, []);

    const renderItems = (data, status) => {

        if (status === "loading") {
            return <option>Загрузка данных...</option>;
        } else if (status === "error") {
            return <option>Ошибка загрузки данных...</option>;
        }


        if (data && data.length > 0 ) {
            return filters.map(({name, value, id}) => {

                // eslint-disable-next-line
                if (value === "All") return;

                return <option key={id} value={value}>{name}</option>
            })
        }
    }

    const elements = renderItems(filters, filtersLoadingStatus);

    // const elements = renderItems(filters);
    return (
        <form onSubmit={(e) => onSubmit(e)} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    onChange={(e) => setElement(e.target.value)}
                    value={element}
                    name="element">
                        <option value="">Я владею элементом...</option>
                        {elements}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}


export default HeroesAddForm;