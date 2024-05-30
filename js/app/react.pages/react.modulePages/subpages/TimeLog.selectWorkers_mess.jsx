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
    var [full, setFull] = useState([])

    // onClick={() => setWorkerSelected((prev) => !prev)}

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
    // let icon = <i className={selected ? iconClass + " selected" : iconClass}></i>
    let iconClass = "task_item_arr fi fi-br-check"
    let selected = workersSelected.includes(subName.props.children)
    // console.log(workersSelected)
    // console.log(subName.props.children)
    // let subIconCanvas = <i className={selected ? iconClass + " selected" : iconClass}></i> // Шаблон для иконки

    if (selected) { // Если находим имя в отмеченнных
        var index = workersSelected.indexOf(subName.props.children);
        if (index > -1) {
            workersSelected.splice(index, 1);
            // console.log(iconClass)
            setSubIconTag(iconClass)
        }
    } else {
        workersSelected.push(subName.props.children)
        // console.log(iconClass + " selected")
        setSubIconTag(iconClass + " selected")
    }

    setWorkerSelected(workersSelected)


    // Остается сделать смену иконки


    // subIcon.classList.toggle("selected");
    // Лучше всего просто здесь добавлять и убирать значения в итоговый список.
    // Но у нас 2 вкладки, и должно быть тогда хранилище с состояниями
    // subName = s.querySelector(".task_item_header");
    // for (var w of workers) {
    //     if (w.name == subName) {
    //         w.isSelected = false ? true : false // Устанавливаем отметку (необ)
    //         // Если включаем, то добавляем в список под отправку
    //         // Если выключаем, то убираем из списка под отправку.
    //     }
    // }

    // Логика: убираем / добавляем отмеченных рабочих в рамках списка workersPresend при тоггле
    // if (workersPresend.values().includes(s.name)) {
    //     // Убираем такое значение из списка
    // } else {
    //     // Добавляем такое значение в список
    // }
}

// https://www.cyberforum.ru/react-js/thread2429616.html
// Рендер только 1 раз с помощью useMemo
// https://tproger.ru/translations/react-hooks
// https://www.youtube.com/watch?v=SBuZSalHLe0
const workerClickable = (w) => {
    let iconClass = "task_item_arr fi fi-br-check"
    // Собираем очередную строку, которую можно будет выбрать
    let subNameCanvas = <p class="task_item_header nomargin title_m">{w.name}</p>  // Указываем имя
    let subBandCanvas = <p class="task_item_info label_s">{w.band}</p> // Указываем бригаду
    let subIconCanvas = <i className={subIconTag}></i> // Шаблон для иконки
    // let subIconCanvas = <i className={selected ? iconClass + " selected" : iconClass}></i> // Шаблон для иконки
    // subIconCanvas = React.createElement("i", {className: "task_item_arr fi fi-br-check selected", id: "box"});
    // subIconCanvas = React.createElement("i", {className: "task_item_arr fi fi-br-check", id: "box"});

    // let selected = workersSelected.includes(w.name)
    // for (x of full) {
    //     let selected = x.includes(w.name)
    //     subIconCanvas.props.className = selected ? iconClass + " selected" : iconClass
    // }
    // subIconCanvas.props.className = selected ? subIconTag : subIconCanvas.props.className
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


const renderCanvas = () => {

    // Подготавливаем хранилища для ссылок на холсты, которые будут далее собраны на основе данных
    var favouriteWorkers = []
    var selectedWorkers = []
    var allWorkers = []

    // Формируем элементы и наполняем ими хранилища
    for (var w of workers) {

        // Проверяем, должен ли работник быть отмеченным на основании днями ранее введенных данных с сервера.
        if (w.isSelected) {
            workersSelected.push(w.name)
            var selected = true // let selected = workersSelected.includes(w.name)
        }

        // let listItemCanvas = workerClickable(w)
        let listItemCanvas = test2(w)

        // let listItemCanvas = <workerClickable subName={subNameCanvas} subBand={subBandCanvas} subIcon={subIconCanvas} ></workerClickable>

        // let listItemCanvas =  <div class="task_item" onClick={(e) => {toggleWorkerState(e, subIconCanvas, subNameCanvas)}}>
        //                         <div class="task_item_text">
        //                                 {subNameCanvas}
        //                                 {subBandCanvas}
        //                             </div>
        //                             {subIconCanvas}
        //                         </div>
        // console.log(listItemCanvas)
        // listItemCanvas.addEventListener("click", ( (passedInElement) => {
        //     return (e) => {toggleWorkerState(e, passedInElement); // IIFE https://stackoverflow.com/questions/10000083/javascript-event-handler-with-parameters
        // }}) (this.listItemCanvas), false); // Добавляем к шаблону элемента новый индивидуальный кликер, и передаём ссылку на сам шаблон аргументом чтобы на клике менять иконку и состояние памяти.

        // Условное распределение загруженных ФИО в разные вкладки
        if (w.isSelected) {
            selectedWorkers.push(listItemCanvas) // или appendChild
            // Добавляем в список отмеченных (первая вкладка)
        }
        if (w.isFav) {
            favouriteWorkers.push(listItemCanvas)
            // Добавляем в список избранных (вторая вкладка)
        }
        allWorkers.push(listItemCanvas)
        // Добавляем в общий список (третья вкладка)
        // console.log(tabAllWorkers)
    }
    // Табы куда это всё добавлять.
    var tabSelectedWorkers = React.createElement("div", {className: "tab__content", id: "tab__chosen_workers"}, selectedWorkers) // document.querySelector("#tab__chosen_workers")
    var tabFavouriteWorkers = React.createElement("div", {className: "tab__content", id: "tab__favourite_workers"}, favouriteWorkers); // document.querySelector("#tab__favourite_workers")
    var tabAllWorkers = React.createElement("div", {className: "tab__content", id: "tab__all_workers"}, allWorkers) // document.querySelector("#tab__all_workers")

    console.log(tabSelectedWorkers)
    console.log(tabFavouriteWorkers)
    console.log(tabAllWorkers)

    // console.log(<Fragment>{tabSelectedWorkers}{tabFavouriteWorkers}{tabAllWorkers}</Fragment>)
    // return <Fragment></Fragment>
    return (
        <div class="container">
            <div class="content" id="content_main">
                <div class="tab-wrap">

                    <input type="radio" id="tab1" name="tabGroup1" class="tab" checked/>
                    <label for="tab1">Выбранные</label>

                    <input type="radio" id="tab2" name="tabGroup1" class="tab"/>
                    <label for="tab2">Избранное</label>

                    <input type="radio" id="tab3" name="tabGroup1" class="tab"/>
                    <label for="tab3">Все</label>
                    {tabSelectedWorkers}{tabFavouriteWorkers}{tabAllWorkers}
                </div>
            </div>
        </div>
        )
}



// If you only want to run the function given to useEffect after the initial render, you can give it an empty array as second argument.
function MyComponent() {
  useEffect(() => {
    loadDataOnlyOnce();
  }, []);

  return <div> {/* ... */} </div>;
}

// ...
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

// Usage example:
const ComponentToRender = () => {
    const [key, setKey] = React.useState(null);
    useEvent(window, 'keydown', (e) => setKey(e.key));
    useEvent(window, 'keyup', (e) => setKey(null));
    useEvent(window, 'blur', (e) => setKey(null));
  return (
    <div>
      <div>Click on this text to get focus and press some key on the keyboard!</div>
      <div>
        <span>Pessed key: </span>
        <span>{key ?? '[UNDEFIEND]'}</span>
      </div>
    </div>
  );
};


// Поставить компонент на рендер.
// Прокинуть в него сгенерированные children
// У каждого child должен быть отдельный id=r1, r2 ...
// При нажатии на child происходит чтение класса его иконки. Если там есть selected, то оно убирается, если нет, то добавляем.
// При нажатии на child происходит добавление / удаление из списка отмеченных по его id.



const test2 = (w) => {
    const [buttonClicked, setBtnState] = useState(false)

    const handleClick = () => {
        // console.log(buttonClicked)
        setBtnState( !buttonClicked );
    };


    let iconClass = "task_item_arr fi fi-br-check"
    let icon = <i className={state.buttonClicked == false ? iconClass : iconClass + " selected"}></i>
    let subNameCanvas = <p class="task_item_header nomargin title_m">{w.name}</p>  // Указываем имя
    let subBandCanvas = <p class="task_item_info label_s">{w.band}</p> // Указываем бригаду
    // console.log(icon)
    console.log(buttonClicked)
    return (
        <div class="task_item" onClick={handleClick}>
                                <div class="task_item_text">
                                        {subNameCanvas}
                                        {subBandCanvas}
                                </div>
                                {icon}
                            </div>
      );
    //   <div onClick={this.handleClick}>
    //   {this.props.children}
    //   {this.state.buttonClicked && <HiddenBox />}
    //   </div>
  }

// const CTR = (w) => {
//     // Рендер / отключение всего элемента, но тогда может вёрстка поплыть... хз щас посмотрим.
//     // https://stackforgeeks.com/blog/display-hide-a-child-component-in-react


//     // Логика понятная, но достать объект можно только после рендера, чтобы к нему нацепить обработчик.
//     iconClass = "task_item_arr fi fi-br-check"
//     let iconTag = <i className="task_item_arr fi fi-br-check selected"></i>
//     let subNameCanvas = <p class="task_item_header nomargin title_m">{w.name}</p>  // Указываем имя
//     let subBandCanvas = <p class="task_item_info label_s">{w.band}</p> // Указываем бригаду
//     let subIconCanvas = <i className={subIconTag}></i> // Шаблон для иконки

//     const [icon, setIcon] = React.useState(null);
//     const [selected, setSelected] = useState(null);
//     const clickableWorker = <div class="task_item">
//                                 <div class="task_item_text">
//                                         {subNameCanvas}
//                                         {subBandCanvas}
//                                 </div>
//                                 {icon}
//                             </div>
//     useEvent(clickableWorker, 'click', (e) => setIcon(<i className={selected ? iconClass : iconClass + "selected"}></i>));
//     return clickableWorker
//     // return <div class="task_item" onClick={(e) => {toggleWorkerState(e, subIconCanvas, subNameCanvas)}}>
//     //                             <div class="task_item_text">
//     //                                     {subNameCanvas}
//     //                                     {subBandCanvas}
//     //                             </div>
//     //                             {icon}
//     //         </div>
// }



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

{/* <div class="tab__content" id="tab__chosen_workers">
                        <div class="tasks_list">
                            <div class="task_item">
                                <div class="task_item_text">
                                    <p class="task_item_header nomargin title_m">Захаров Дмитрий Алексеевич</p>
                                    <p class="task_item_info label_s">Геоспецстрой</p>
                                </div>
                                <i class="task_item_arr fi fi-br-check"></i>
                            </div>
                            <div class="task_item">
                                <div class="task_item_text ">
                                    <p class="task_item_header nomargin title_m">Якубенко Владислав Игоревич</p>
                                    <p class="task_item_info label_s">Илькевич</p>
                                </div>
                                <i class="task_item_arr fi fi-br-check"></i>
                            </div>
                            <div class="task_item">
                                <div class="task_item_text ">
                                    <p class="task_item_header nomargin title_m">Мухатгалиев Якубджон Джамшут-оглы</p>
                                    <p class="task_item_info label_s">Дьячков</p>
                                </div>
                                <i class="task_item_arr fi fi-br-check"></i>
                            </div>
                        </div>
                    </div>



                    <div class="tab__content" id="tab__favourite_workers">
                        <div class="tasks_list">
                            <div class="task_item">
                                <div class="task_item_text">
                                    <p class="task_item_header nomargin title_m">Захаров Дмитрий Алексеевич</p>

                                    <p class="task_item_info label_s">Геоспецстрой</p>
                                </div>
                                <i class="task_item_arr fi fi-br-check"></i>
                            </div>
                            <div class="task_item">
                                <div class="task_item_text ">
                                    <p class="task_item_header nomargin title_m">Якубенко Владислав Игоревич</p>
                                    <p class="task_item_info label_s">Илькевич</p>
                                </div>
                                <i class="task_item_arr fi fi-br-check"></i>
                            </div>
                            <div class="task_item">
                                <div class="task_item_text ">
                                    <p class="task_item_header nomargin title_m">Мухатгалиев Якубджон Джамшут-оглы</p>

                                    <p class="task_item_info label_s">Дьячков</p>
                                </div>
                                <i class="task_item_arr fi fi-br-check"></i>
                            </div>
                        </div>
                    </div>

                    <div class="tab__content" id="tab__all_workers">
                        <input type="text" class="people_search" placeholder="Начните поиск..."/>
                        <div class="tasks_list">
                            <div class="task_item">
                                <div class="task_item_text">
                                    <p class="task_item_header nomargin title_m">Захаров Дмитрий Алексеевич</p>

                                    <p class="task_item_info label_s">Геоспецстрой 123</p>
                                </div>
                                <i class="task_item_arr fi fi-br-check"></i>
                            </div>
                            <div class="task_item">
                                <div class="task_item_text ">
                                    <p class="task_item_header nomargin title_m">Якубенко Владислав Игоревич</p>
                                    <p class="task_item_info label_s">Илькевич 123</p>
                                </div>
                                <i class="task_item_arr fi fi-br-check"></i>
                            </div>
                            <div class="task_item">
                                <div class="task_item_text ">
                                    <p class="task_item_header nomargin title_m">Мухатгалиев Якубджон Джамшут-оглы</p>

                                    <p class="task_item_info label_s">Дьячков 123</p>
                                </div>
                                <i class="task_item_arr fi fi-br-check"></i>
                            </div>
                        </div>
                    </div> */}
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