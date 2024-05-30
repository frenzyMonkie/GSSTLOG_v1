const TimeLogSelectWorkers  = () => {

    const state = {
        pageTitle: "Выберите рабочих",
        currentObject: "",
        currentObjectCustoms: {},
        formData: {},
        formLabel: "TimeLogWorkerList",
        backPage: "/TimeLog",
        nextPage: "/TimeLog",
        const: {Spendables: [], MeasureUnits: [] },
    }
    var [workersSelected, setWorkerSelected] = useState([]) // по id
    var [subIconTag, setSubIconTag] = useState("")

    const workerListContext = React.createContext([])


    var workers = [
        {id: 1, name: "Захаров Дмитрий Алексеевич", band: "Геоспецстрой", isFav: true, isSelected: true}, // isSelected если они уже ранее были добавлены в список, в этой или предыдущей сессии (в т.ч. данные с сервера.)
        {id: 2, name: "Якубенко Владислав Игоревич", band: "Илькевич", isFav: true, isSelected: false},
        {id: 3, name: "Мухатгалиев Якубджон Джамшут-оглы", band: "Дьячков", isFav: true, isSelected: true},
    ]
    var workersPresend = [
        {id: 1, name: "Захаров Дмитрий Алексеевич", data: {}},
        {id: 2, name: "Якубенко Владислав Игоревич", data: {}},
        {id: 3, name: "Мухатгалиев Якубджон Джамшут-оглы", data: {}},
    ] // Тогда мы должны гарантировать, что id навсегда привязаны к ФИО, и не будет косяков при обновлении баз данных.
    // В принципе мы должны это гарантировать, что при удалении номера 3 например, этот номер не будет присвоен другому человеку. При редактировании списка людей.


// Конструктор наполнения страницы
// Тоггл состояния блока при клике
const toggleWorkerState = (event, subIcon, subName) => {
    let iconClass = "task_item_arr fi fi-br-check"
    let selected = workersSelected.includes(subName.props.children)
    let subIconCanvas = <i className={selected ? iconClass + " selected" : iconClass}></i> // Шаблон для иконки

    if (selected) { // Если находим имя в отмеченнных
        var index = workersSelected.indexOf(subName.props.children);
        if (index > -1) {
            workersSelected.splice(index, 1);
            setSubIconTag(iconClass)
        }
    } else {
        workersSelected.push(subName.props.children)
        setSubIconTag(iconClass + " selected")
    }

    setWorkerSelected(workersSelected)

    // Остается сделать смену иконки

}

// https://www.cyberforum.ru/react-js/thread2429616.html
// Рендер только 1 раз с помощью useMemo
// https://tproger.ru/translations/react-hooks
// https://www.youtube.com/watch?v=SBuZSalHLe0
// https://dirask.com/posts/React-useEvent-hook-pYowN1
// https://stackforgeeks.com/blog/display-hide-a-child-component-in-react
// https://stackoverflow.com/questions/42630473/how-can-i-toggle-a-class-on-click-with-react
const workerClickable = (w) => {
    let iconClass = "task_item_arr fi fi-br-check"
    // Собираем очередную строку, которую можно будет выбрать
    let subNameCanvas = <p class="task_item_header nomargin title_m">{w.name}</p>  // Указываем имя
    let subBandCanvas = <p class="task_item_info label_s">{w.band}</p> // Указываем бригаду
    let subIconCanvas = <i className={subIconTag}></i> // Шаблон для иконки

    let selected = workersSelected.includes(w.name)
    subIconCanvas.props.className = selected ? iconClass + " selected" : iconClass
    return <div class="task_item" onClick={(e) => {toggleWorkerState(e, subIconCanvas, subNameCanvas)}}>
                                <div class="task_item_text">
                                        {subNameCanvas}
                                        {subBandCanvas}
                                </div>
                                {subIconCanvas}
            </div>
}

// Для использования в других функциях, например для сбора данных
// const { useState,  uniqueName} = React.useContext(StoreContext)
// const nameSelected = useState[0]
// const setNameSelected = useState[1]


const workerCanvasManager = (w, nameSelected, setNameSelected) => {
    // Здесь должно проверяться вообще, все имена и тд
    // И потом для каждого отрисовываемого поля прокидываться тот или иной дата-сет
    // Но это чтобы сохранить правильность данных на старте

    // А чтобы иметь один контроль над разными элементами, по сути мы должны иметь один элемент отрисованный два раза.
    let newWorkerData = {useState: [nameSelected, setNameSelected], uniqueName: w.name} // Создаем контент для хранилища
    const fullWorkerListContainer = React.useContext(workerListContext) // Берем контекст (лучше его прокинуть сюда конечно)
    // console.log(fullWorkerListContainer)

    var temp = []
    for (var uniqueWorker of fullWorkerListContainer) {
        temp.push(uniqueWorker.uniqueName)
    }
    if (!temp.includes(w.name)) { // Если в списке уникальных имён такого ещё нет, то добавляем его.
        fullWorkerListContainer.push(newWorkerData) // Здесь походу проблема, как-то иначе надо пушить?
    } else {
        // А вот если есть, то вопрос - почему такое могло произойти?
    }

    // console.log(fullWorkerListContainer)
    // console.log(w.isSelected)

    return workerClickable2(w, nameSelected, setNameSelected, fullWorkerListContainer)
}

const workerClickable2 = (w, nameSelected, setNameSelected, fullWorkerListContainer) => {
    // Если вынести это состояние в список [{buttonClicked: true, name: "имя"}{}{}] на общий план то будет однозначная привязка к объекту и получится
    // В принципе тут должен пойти useContext, который пробросим с общего элемета и туда добавим этот стейт, чтобы использовать его данные извне.

    // Зачем он нам извне?
    // Чтобы по нему крутить цикл и смотреть какие имена отмечены а какие нет, чтобы
    // 1. формировать Данные к отправке
    // 2. При клике на поле в одном меню менялось также и в другом.

    useEffect(() => {
        const getData = async () => {
            if (w.isSelected) {
                setNameSelected(true);
            }
        }; // https://maxrozen.com/learn-useeffect-dependency-array-react-hooks
        getData()
      }, []);



    const handleClick = () => {
        setNameSelected( !nameSelected );

        var selected = []
        for (var uniqueWorker of fullWorkerListContainer) {
            selected.push(uniqueWorker.uniqueName)
        }

        if (selected.includes(w.name)) { // Если в списке уникальных имён такого ещё нет, то добавляем его.
            // А вот если есть, то вопрос - почему такое могло произойти?
        } else {
            fullWorkerListContainer.push(newWorkerData)
        }
        console.log(fullWorkerListContainer)
        // let selected = workersSelected.includes(w.name)
        if (selected.includes(w.name)) { // Если находим имя в отмеченнных
            var index = workersSelected.indexOf(w.name);
            if (index > -1) {
                workersSelected.splice(index, 1);
            }
        } else {
            workersSelected.push(w.name)
        }
        setWorkerSelected(workersSelected)

    };



    let iconClass = "task_item_arr fi fi-br-check"
    let icon = <i className={nameSelected == false ? iconClass : iconClass + " selected"}></i>
    let subNameCanvas = <p class="task_item_header nomargin title_m">{w.name}</p>  // Указываем имя
    let subBandCanvas = <p class="task_item_info label_s">{w.band}</p> // Указываем бригаду

    return (
        <div class="task_item" onClick={handleClick}>
                                <div class="task_item_text">
                                        {subNameCanvas}
                                        {subBandCanvas}
                                </div>
                                {icon}
                            </div>
      );
  }



const StoreProvider = ({ children }) => {
    return <workerListContext.Provider> {children} </workerListContext.Provider>
    // return <StoreContext.Provider value={newWorkerState}> {children} </StoreContext.Provider>
}



const renderCanvas = () => {

    // Подготавливаем хранилища для ссылок на холсты, которые будут далее собраны на основе данных
    var favouriteWorkers = []
    var selectedWorkers = []
    var allWorkers = []

    // // Формируем элементы и наполняем ими хранилища
    for (var w of workers) {

        // Проверяем, должен ли работник быть отмеченным на основании днями ранее введенных данных с сервера.
        const [nameSelected, setNameSelected] = useState(false) // Создаем хранилище для отслеживания клика

        var listItemCanvas = workerCanvasManager(w, nameSelected, setNameSelected)
        // setNameSelected(w.isSelected)  // Вот тут теперь непонятно почему цикл происходит, мы ведь сейчас вне вызова создания кнопки, просто перебираем воркеров и каждому ставим свой setNameSelected
        // Мне что useEffect нужно сделать чтоб 1 раз только гарантированно вызывалась это функция?

        // Распределение загруженных ФИО в разные вкладки
        if (w.isSelected) { // В список отмеченных (первая вкладка)
            selectedWorkers.push(listItemCanvas) // или appendChild
        }
        if (w.isFav) { // В список избранных (вторая вкладка)
            favouriteWorkers.push(listItemCanvas)
        }
        allWorkers.push(listItemCanvas) // В общий список (третья вкладка)

    }

    console.log(workersSelected)

    // let listItemCanvas = workerCanvasManager(workers[0])
    // let listItemCanvas2 = workerCanvasManager(workers[1])

    return (
        <workerListContext.Provider>
        <div class="container">
            <div class="content" id="content_main">
                <div class="tab-wrap">

                    <input type="radio" id="tab1" name="tabGroup1" class="tab" checked/>
                    <label for="tab1">Выбранные</label>

                    <input type="radio" id="tab2" name="tabGroup1" class="tab"/>
                    <label for="tab2">Избранное</label>

                    <input type="radio" id="tab3" name="tabGroup1" class="tab"/>
                    <label for="tab3">Все</label>
                    {/* {tabSelectedWorkers}{tabFavouriteWorkers}{tabAllWorkers} */}
                    <div class="tab__content" id="tab__chosen_workers">
                    {/* {listItemCanvas} */} {favouriteWorkers}
                    </div>
                    <div class="tab__content" id="tab__favourite_workers">
                    {/* {listItemCanvas} */} {selectedWorkers}
                    </div>
                    <div class="tab__content" id="tab__all_workers">
                    {/* {listItemCanvas2} */} {allWorkers}
                    </div>

                </div>
            </div>
        </div>
        </workerListContext.Provider>
        )
}


// Поставить компонент на рендер.
// Прокинуть в него сгенерированные children
// У каждого child должен быть отдельный id=r1, r2 ...
// При нажатии на child происходит чтение класса его иконки. Если там есть selected, то оно убирается, если нет, то добавляем.
// При нажатии на child происходит добавление / удаление из списка отмеченных по его id.




const useEvent = (object, event, callback) => {
    const ref = React.useRef(null);
    React.useEffect(
        () => {
            const wrapper = (e) => {
                if (ref.current) {
                    ref.current(e);
                }
            };
            object.addEventListener(event, wrapper);
            return () => object.removeEventListener(event, wrapper);
        },
        [object, event]
    );
    ref.current = callback; // callback argument indicates function that is called when event occurs on the object.
};


const navLeft  = () => {return (
    <Fragment>
    <i class="header_back fi fi-rr-arrow-small-left"></i>
    </Fragment>
)}
const navRight  = () => {return (

    <Fragment>
    <i class="header_save fi fi-rs-disk"></i>
    </Fragment>
)}

const render = () => {

    return PageComponent({
        renderCanvas: renderCanvas,
        pageTitle: state.pageTitle,
        navLeft: navLeft,
        navRight: navRight
       })
}

return render()

}