const TimeLogSelectWorkers  = () => {


    // Должно быть:
    // 1. Заходим и видим список фамилий. При нажатии на любую - попадаем уже в индивидуальный отчёт.
    // 2. Есть кнопка "изменить":
        // - Окошко поиска для фильтрации по ФИО / Бригаде
        // - Кнопка "готово" для сохранения и кнопка "<-" для сброса
        // - Тогглы как в айфоне "отобразить только выбранных", "отобразить избранные"
            // -При удалении выбранного он остается в списке без галочки, и только при следующем нажатии на тоггл он исчезает. (чтобы не мискликали)
            // Либо придумать другое поведение.

    const state = {
        pageTitle: <Fragment> <span class="timelog_object">Силикатный пр-д</span><br/> <span class="timelog_month">Апрель 2024</span></Fragment>,
        currentObject: "",
        currentObjectCustoms: {},
        formData: {},
        formLabel: "TimeLogWorkerList",
        backPage: "/TimeLog",
        nextPage: "/TimeLog",
        const: {Spendables: [], MeasureUnits: [] },
    }
    const TimeLogContext = React.createContext([])
    const [selectMode, setSelectMode] = useState(false)
    const [chosenSelected, setChosenSelected] = useState(true)
    const [favSelected, setFavSelected] = useState(false)
    const [allSelected, setAllSelected] = useState(false)
    var firstLoad = true

    const searchInput = React.useRef(null);
    var workers = [
    {id : 1, name: " Авплетий Ничан Пастырович", band: "🢒 Дьячков", isFav: false, isSelected: true},
    {id : 2, name: " Ахмедов Ахмед Ахмедович", band: "🢒 Дьячков", isFav: true, isSelected: false},
    {id : 3, name: " Джованни Джорджо Яковлевич", band: "🢒 Дьячков", isFav: false, isSelected: false},
    {id : 4, name: " Захаров Дмитрий Алексеевич", band: "🢒 Геоспецстрой", isFav: true, isSelected: true},
    {id : 5, name: " Мухатгалиев Якубджон Джамшут-оглы", band: "🢒 Дьячков", isFav: false, isSelected: true},
    {id : 6, name: " Нагорный Ламинат Горыныч", band: "🢒 Дьячков", isFav: false, isSelected: false},
    {id : 7, name: " Сальчичон Балык Хамонович", band: "🢒 Дьячков", isFav: false, isSelected: false},
    {id : 8, name: " Смешной Егор Егорович", band: "🢒 Дьячков", isFav: true, isSelected: true},
    {id : 9, name: " Якубенко Владислав Игоревич", band: "🢒 Илькевич", isFav: true, isSelected: false},
    ]


    // https://codepen.io/Spruce_khalifa/pen/GRrWjmR

    // const [items, setItems] = useState([]);
    // const data = Object.values(items);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["name", "band"]);
    const [filterParam, setFilterParam] = useState(["Выбранные"]); // "Все", "Избранное". "Выбранные"
    // const [chosenSelected, setChosenSelected] = useState(true)
    // const [favSelected, setFavSelected] = useState(false)
    // const [allSelected, setAllSelected] = useState(false)

    function search(items) {
        // console.log(items)
        return items.filter((item) => { // Отобразятся только элементы, по которым прошло true по условиям.
            // Если значение элемента совпадает с указанным в фильтре (напр. избранное или выбранные)
            // console.log(item)
            if (filterParam == "Все") {
                return searchParam.some((newItem) => {
                    // console.log(item) // Итем со всеми его данными из общего контейнера
                    // console.log(newItem) // нужный ключ. в данном случае "capital"/.capital Нам нужен
                    // console.log(item[newItem]) название города, для сравнения с введенным в поиске значением. Kabul / Khartoum /  Gitega
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
            if (filterParam == "Избранное" && item.isFav) { // Если в избранном и итем принадлежит этой категории
                return searchParam.some((newItem) => { // Возвращаем true если есть совпадение хотя бы по одному ключу ( ФИО или Бригада )
                    return ( // Возвращаем true если есть вхождение набранного текста в очередной айтем.
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
            if (filterParam == "Выбранные" && item.useState[0]) { // Если в выбранных и итем принадлежит этой категории
                return searchParam.some((newItem) => { // Возвращаем true если есть совпадение хотя бы по одному ключу ( ФИО или Бригада )
                    return ( // Возвращаем true если есть вхождение набранного текста в очередной айтем.
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
        });
    }

const oneWorkerMainCanvas = (newWorker) => {
    const editWorker = () => {
        console.log("ok", newWorker)
    }; // Тоггл галочки выбора
    return (
        <div class="task_item" onClick={editWorker}>
                            <div class="task_item_text">
                                <p class="task_item_header nomargin title_m">{newWorker.name}</p>
                                <p class="task_item_info label_s">{newWorker.band}</p>
                            </div>
                            <i className="task_item_arr fi fi-br-angle-small-right"></i>
                    </div>
        );
}


const oneWorkerSelectableCanvas = (newWorker, nameSelected, setNameSelected) => {
    const toggleWorkerisSelected = () => {
        setNameSelected( !nameSelected );
    }; // Тоггл галочки выбора
    let iconClass = "task_item_arr fi fi-br-check"
    return (
        <div class="task_item" onClick={toggleWorkerisSelected}>
                            <div class="task_item_text">
                                <p class="task_item_header nomargin title_m">{newWorker.name}</p>
                                <p class="task_item_info label_s">{newWorker.band}</p>
                            </div>
                            <i className={nameSelected == false ? iconClass : iconClass + " selected"}></i>
                    </div>
      );
}

const workerCanvasManager = (useTimelogContext, newWorker, nameSelected, setNameSelected) => {

    const parseContextNames = (useTimelogContext) => {
        var ret = [] // Просто выдираем имена из контекста
        for (var uniqueWorker of useTimelogContext) {
            ret.push(uniqueWorker.name)
        }
        return ret
    }
    var canvas = selectMode ? oneWorkerSelectableCanvas(newWorker, nameSelected, setNameSelected) : oneWorkerMainCanvas(newWorker, nameSelected, setNameSelected)
    // Создаем контент для хранилища. Один элемент, который может отрисовываться в разных вкладках несколько раз.
    let newWorkerData = {
        canvas: canvas,
        useState: [nameSelected, setNameSelected],
        ...newWorker
    }

    // Проверяем, есть ли полученное с сервера или базы имя в оперативном контексте.
    // .sort() лучше вообще сделать так, чтобы изначально с сервера приходил отсортированный по именам.
    var namesInContext = parseContextNames(useTimelogContext)
    if (!namesInContext.includes(newWorker.name)) { // Если в контексте такого ещё нет, то добавляем его.
        useTimelogContext.push(newWorkerData)
    } else {
        console.log(useTimelogContext)
        var idx = useTimelogContext.findIndex((element) => element.name == newWorkerData.name)
        // Имя уже добавлено, но возможно его параметры другие. Новые параметры находятся в newWorker
        useTimelogContext[idx] = newWorkerData
    }

    return canvas
}

const renderEditMode = (ctx) => {
    return ctx.filter( (item) => {
        if (item.useState[0]) { return true }
    })
}



// // the value of the search field
// const [name, setName] = useState('');
// // the search result
// const [foundUsers, setFoundUsers] = useState(USERS);
// const filter = (e) => {
//     const keyword = e.target.value;
//     if (keyword !== '') {
//         const results = USERS.filter((user) => {
//         return user.name.toLowerCase().startsWith(keyword.toLowerCase());
//         // Use the toLowerCase() method to make it case-insensitive
//         });
//         setFoundUsers(results);
//     } else {
//         setFoundUsers(USERS);
//         // If the text field is empty, show all users
//     }
//     setName(keyword);


//   return (
//     <div className="container">
//       <input
//         type="search"
//         value={name}
//         onChange={filter}
//         className="input"
//         placeholder="Filter"
//       />

//       <div className="user-list">
//         {foundUsers && foundUsers.length > 0 ? (
//           foundUsers.map((user) => (
//             <li key={user.id} className="user">
//               <span className="user-id">{user.id}</span>
//               <span className="user-name">{user.name}</span>
//               <span className="user-age">{user.age} year old</span>
//             </li>
//           ))
//         ) : (
//           <h1>No results found!</h1>
//         )}
//       </div>
//     </div>
//   );
// }

const searchBar = () => {
    // const ref = React.createRef();

    // useEffect(() => {
    //     console.log(searchInput)
    //     searchInput.current.focus();
    // }, [q]);
    // onFocus={(e) => e.target.select()}
    return <input key="seacrhWorkers" type="search" class="people_search" placeholder="Поиск" defaultValue={q} onChange={ setInputValue} ref={searchInput}  /> // autoFocus setQ
    // React.useMemo(() => (
    //   ), [] );
}


const setInputValue = (e) => {

    // Фиксируем проблему: при вводе текста в инпут происходит полный ре-рендер, который ре-рендерит еще и сам инпут, поэтому он теряет фокус.
    // Если e.target.value != "", то автофокус?
    // Еще вариант, попробовать
        // 1. Вынуть input из подфункций, но хз поможет ли, всё равно рендерится на одном холсте.
        // 2. Попробовать изолировать обновление листа от других компонентов. Чтобы его изменение не триггерило изменение родительсткого холста и рядом стоящих элементов.

    console.log(e)
    console.log(e.target.value)

    setQ(e.target.value)
    searchInput.current.focus()

}

const cb_SetQ = React.useCallback((evt) => {
        setQ(evt)
    }, [])


const renderCanvas2 = () => {



    const useTimelogContext = React.useContext(TimeLogContext) // Берем контекст
    prepareWorkers(useTimelogContext)

    const nameList_selectmode = <div className="tab__content" id="tab__favourite_workers">
                                    {search(useTimelogContext).map((item) => ( // Отрисовать результаты поиска по всему файлу.
                                        item.canvas
                                    ))}
                                </div>
    const nameList_mainmode = <div className="tab__content" id="tab__chosen_workers">
                                    {renderEditMode(useTimelogContext).map((item) => ( // Отрисовать результаты поиска по всему файлу.
                                        item.canvas
                                    ))}
                                </div>
    // if (firstLoad) {
    //     var selectedWorkersCanvas = []
    //     firstLoad = false
    //     for (var newWorker of workers) { // Формируем список фамилий
    //         const [isSelected, setSelected] = useState(false) // Создаем индивидуальное хранилище для отслеживания клика (для иконки)
    //         var listItemCanvas = workerCanvasManager(useTimelogContext, newWorker, isSelected, setSelected) // Инициализируем сам элемент с логикой и холстом
    //         // Распределяем созданные элементы ФИО в разные вкладки
    //         // if (newWorker.isSelected) {
    //             selectedWorkersCanvas.push(listItemCanvas)
    //             useEffect(() => { // Устанавливаем пресетные значения
    //                 const addSelected = async () => {if (newWorker.isSelected) {setSelected(true)}};
    //                 addSelected()
    //                 }, []); // https://maxrozen.com/learn-useeffect-dependency-array-react-hooks
    //         // } // Вкладка отмеченных

    //     }
    // }

    // if (!firstLoad) {
    //     var selectedWorkersCanvas = []
    //     for (var newWorker of useTimelogContext) {
    //         if (newWorker.useState[0]) {
    //         // 1. Взять listItemCanvas и добавить в useTimelogContext вместо uniqueName.
    //         // console.log(newWorker)
    //         var listItemCanvas = workerCanvasManager(useTimelogContext, newWorker, newWorker.useState[0], newWorker.useState[1]) // Инициализируем сам элемент с логикой и холстом
    //         selectedWorkersCanvas.push(listItemCanvas)
    //     }
    // }
    // }

    const selectmodeCanvas = <Fragment>
                                <div className="grid">

                                    <input type="radio" id="tab1" name="tabGroup1" class="tab" defaultChecked={filterParam == "Выбранные" ? true : null}/>
                                    <label for="tab1" onClick={() => {return setFilterParam("Выбранные")}}><label class="label_bordbot" >Выбранные</label></label>

                                    <input type="radio" id="tab2" name="tabGroup1" class="tab" defaultChecked={filterParam == "Избранное" ? true : null}/>
                                    <label for="tab2" onClick={() => {return setFilterParam("Избранное")}}><label class="label_bordbot"  >Свой список</label></label>

                                    <input type="radio" id="tab3" name="tabGroup1" class="tab" defaultChecked={filterParam == "Все" ? true : null}/>
                                    <label for="tab3" onClick={() => {return setFilterParam("Все")}}><label class="label_bordbot"  >Все(иконки?) </label></label>
                                    {searchBar()}

                                    {nameList_selectmode}
                                </div>



                            </Fragment>
    const mainCanvas = <Fragment>
                            <input type="radio" id="tab1" name="tabGroup1" class="tab" checked/>
                            {/* <label for="tab1">Выбранные</label> */}
                            {nameList_mainmode}
                        </Fragment>

    return (
        <TimeLogContext.Provider>
        <div class="container timelog">
            <div class="content timelog" id="content_main">
                <div class="tab-wrap">
                    {selectMode ? selectmodeCanvas : mainCanvas}
                </div>
            </div>
        </div>
        </TimeLogContext.Provider>
    )

}

// const renderCanvas = () => {
//     return selectMode ? renderSelectmodeCanvas() : renderMainCanvas()
// }
// const renderMainCanvas = () => {

//     // Хранилища для ссылок на холсты, которые будут далее собраны на основе данных

//     const useTimelogContext = React.useContext(TimeLogContext) // Берем контекст

//     // Сначала нужно определить, что у нас в контексте.
//     // 1. при смене режима именно контекст - главный
//     // 2. при инициализации именно входящие данные - главные.

//     prepareWorkers(useTimelogContext)

//     if (firstLoad) {
//         var selectedWorkersCanvas = []
//         firstLoad = false
//         for (var newWorker of workers) { // Формируем список фамилий
//             const [isSelected, setSelected] = useState(false) // Создаем индивидуальное хранилище для отслеживания клика (для иконки)
//             var listItemCanvas = workerCanvasManager(useTimelogContext, newWorker, isSelected, setSelected) // Инициализируем сам элемент с логикой и холстом
//             // Распределяем созданные элементы ФИО в разные вкладки
//             // if (newWorker.isSelected) {
//                 selectedWorkersCanvas.push(listItemCanvas)
//                 useEffect(() => { // Устанавливаем пресетные значения
//                     const addSelected = async () => {if (newWorker.isSelected) {setSelected(true)}};
//                     addSelected()
//                     }, []); // https://maxrozen.com/learn-useeffect-dependency-array-react-hooks
//             // } // Вкладка отмеченных

//         }
//     }

//     if (!firstLoad) {
//         var selectedWorkersCanvas = []
//         for (var newWorker of useTimelogContext) {
//             if (newWorker.useState[0]) {
//             // 1. Взять listItemCanvas и добавить в useTimelogContext вместо uniqueName.
//             // console.log(newWorker)
//             var listItemCanvas = workerCanvasManager(useTimelogContext, newWorker, newWorker.useState[0], newWorker.useState[1]) // Инициализируем сам элемент с логикой и холстом
//             selectedWorkersCanvas.push(listItemCanvas)
//         }
//     }
//     }

//     // useEffect(() => {
//     //     const finish = () => {setFirstLoad(false)};
//     //     finish()
//     // }, []);

//     return (
//         <TimeLogContext.Provider>
//         <div class="container timelog">
//             <div class="content timelog" id="content_main">
//                 <div class="tab-wrap">
//                     <input type="radio" id="tab1" name="tabGroup1" class="tab" checked/>
//                     {/* <label for="tab1">Выбранные</label> */}

//                     <div class="tab__content" id="tab__chosen_workers">
//                     {selectedWorkersCanvas}
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </TimeLogContext.Provider>
//     )


// }

// const renderWorker = (newWorker) => {
//     return useTimelogContext.filter((item) => {
//         console.log(item.canvas, newWorker)
//         if (useTimelogContext.includes(newWorker)) {
//             return
//         }
//     });

// }
const prepareWorkers = (useTimelogContext) => {
    // Вроде как надо подготовить холсты, а потом по результатам поиска доставать их из хранилища по совпадениям.
    // Хранилища для ссылок на холсты, которые будут далее собраны на основе данных
    const favouriteWorkersCanvas = []
    const selectedWorkersCanvas = []
    const allWorkersCanvas = []


    /// При первом рендере кладем воркеров в контекст и используем контекст
    // Во всех остальных - используем контекст.
    if (firstLoad) {
        firstLoad = false
        for (var newWorker of workers) { // Формируем список фамилий
            console.log(newWorker)
            const [selected, setSelected] = useState(false) // Создаем индивидуальное хранилище для отслеживания клика (для иконки)
            var listItemCanvas = workerCanvasManager(useTimelogContext, newWorker, selected, setSelected) // Инициализируем сам элемент с логикой и холстом
            // Распределяем созданные элементы ФИО в разные вкладки
            // selectedWorkersCanvas.push(listItemCanvas)
            // if (newWorker.isSelected) {console.log(newWorker.isSelected)}
            if (newWorker.isSelected) {
                useEffect(() => { // Устанавливаем пресетные значения
                    const addSelected = async () => {
                        setSelected(true)
                    };
                    addSelected()
                }, []); // https://maxrozen.com/learn-useeffect-dependency-array-react-hooks
            }

            // Вкладка отмеченных

        //     // if (newWorker.isFav) {favouriteWorkersCanvas.push(listItemCanvas)} // Вкладка избранных
        //     // allWorkersCanvas.push(listItemCanvas) // Общий список
        //     // console.log(allWorkersCanvas)
        }
    } else {
        for (var newWorker of useTimelogContext) {

            // var listItemCanvas = workerCanvasManager(useTimelogContext, newWorker, newWorker.useState[0], newWorker.useState[1]) // Инициализируем сам элемент с логикой и холстом
            if (newWorker.useState[0]) { // if (newWorker.isSelected)
                useEffect(() => { // Устанавливаем пресетные значения
                    const addSelected = async () => {newWorker.useState[1](true)};
                    addSelected()
                    }, []); // https://maxrozen.com/learn-useeffect-dependency-array-react-hooks
                var listItemCanvas = workerCanvasManager(useTimelogContext, newWorker, newWorker.useState[0], newWorker.useState[1]) // Инициализируем сам элемент с логикой и холстом
            }
        }
    }



    // return {favouriteWorkersCanvas, selectedWorkersCanvas, allWorkersCanvas}
}



// const renderSelectmodeCanvas = () => {
//     const useTimelogContext = React.useContext(TimeLogContext) // Берем контекст
//     // var {favouriteWorkersCanvas, selectedWorkersCanvas, allWorkersCanvas} = prepareWorkers(useTimelogContext)
//     prepareWorkers(useTimelogContext)
//     // console.log(useTimelogContext)

//     const searchBar = () => (<input type="search" class="people_search" placeholder="Поиск" value={q} onChange={ (e) => cb_SetQ(e.target.value)} autoFocus/>)
//     const nameList = <div className="tab__content" id="tab__favourite_workers">
//                                 {search(useTimelogContext).map((item) => ( // Отрисовать результаты поиска по всему файлу.
//                                     item.canvas
//                                 ))}
//                             </div>

//     return (
//         <TimeLogContext.Provider>
//         <div class="container timelog">
//             <div class="content timelog" id="content_main">
//                 <div class="tab-wrap">

//                     <input type="radio" id="tab1" name="tabGroup1" class="tab" defaultChecked={filterParam == "Выбранные" ? true : null}/>
//                     <label for="tab1" onClick={() => {return setFilterParam("Выбранные")}}>Выбранные</label>

//                     <input type="radio" id="tab2" name="tabGroup1" class="tab" defaultChecked={filterParam == "Избранное" ? true : null}/>
//                     <label for="tab2" onClick={() => {return setFilterParam("Избранное")}}>Избранное</label>

//                     <input type="radio" id="tab3" name="tabGroup1" class="tab" defaultChecked={filterParam == "Все" ? true : null}/>
//                     <label for="tab3" onClick={() => {return setFilterParam("Все")}}>Все</label>
//                     {/* this means that component itself or any of its parents instead of being updated is remounted: deleted and re-created. */}

//                     {searchBar()}
//                     {nameList}
//                     {/* Компонент ремаунтится / ререндерится вместе с самой строкой поиска, вот и вся проблема. */}

//                     {/* <div className="tab__content" id="tab__chosen_workers">
//                     {selectedWorkersCanvas}
//                     </div>
//                     <div className="tab__content" id="tab__favourite_workers">
//                     {favouriteWorkersCanvas}
//                     </div>
//                     <div className="tab__content" id="tab__all_workers">
//                     {allWorkersCanvas}
//                     </div> */}

//                 </div>
//             </div>
//         </div>
//         </TimeLogContext.Provider>
//     )
// }

    const toggleSelectMode = () => {
        setSelectMode(!selectMode)
    }
    const navLeft  = ({children}) => {return (
        <Fragment>
        <i class="header_back fi fi-rr-arrow-small-left"></i>

        </Fragment>
    )}
    const navRight  = ({children}) => {

        var btn = selectMode ? <button onClick={toggleSelectMode} class="header_save change_workers ready">Готово</button> : <button onClick={toggleSelectMode} class="header_save change_workers">Изменить</button>
        return (
        <Fragment>
        {/* <i class="header_save fi fi-rs-disk"></i> */}
        {btn}
        </Fragment>
    )}
    const header = (handler) => {

        return (
            <div class="header" id="header_main">
                <div className="nav_left"> {navLeft(handler) || null}</div>
                <div class="header_title"> {state.pageTitle || "Нету названия"} </div>
                <div className="nav_right"> {navRight(handler) || null}</div>
            </div>
        )
    }

    const renderCanvas = () => {
        var he = header()
        var co = content()
        return (
            <Fragment>
                {he}
                {co}
            </Fragment>
        )
    }
    const render = () => {
        return AppCanvas({
                renderCanvas: renderCanvas2,
                pageTitle: state.pageTitle,
                navLeft: navLeft,
                navRight: navRight,
                head: header
            })

    }
    const oldrender = () => {
        // console.log(123)
        return PageComponent({
            renderCanvas: renderCanvas2,
            pageTitle: state.pageTitle,
            navLeft: navLeft,
            navRight: navRight
        })
    }

    return render()

}
