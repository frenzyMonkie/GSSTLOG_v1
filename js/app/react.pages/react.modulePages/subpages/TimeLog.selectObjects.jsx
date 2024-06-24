var objects = [
    {name: "Силикатный пр-д", type: "Водопонижение", isSelected: false,},
    {name: "Амурская", type: "Водопонижение", isSelected: false,},
    {name: "Кронштадский пр-д", type: "Проходка", isSelected: true,},
    {name: "Кульнева", type: "ГНБ", isSelected: false,},
    {name: "Тимирязевская", type: "Проходка", isSelected: true,},
    {name: "3-я Парковая", type: "Водопонижение", isSelected: false,},
    {name: "Загорская ГАЭС-2", type: "Водопонижение", isSelected: false,},
    {name: "Камова 24", type: "Водопонижение", isSelected: true,},
    {name: "Амбер-Сити", type: "Водопонижение", isSelected: false,},
    {name: "Ташкентская", type: "Водопонижение", isSelected: false,},
] // .sort() лучше вообще сделать так, чтобы изначально с сервера приходил отсортированный по именам.


const TimeLogSelectObjects  = () => {
    const useTimeLogContext = React.useContext(TimeLogContext) // Берем контекст
    const state = {
        pageTitle: "Доступные объекты",
        currentObject: "",
        currentObjectCustoms: {},
        formData: {},
        formLabel: "TimeLogObjectList",
        backPage: "/TimeLog",
        nextPage: "/TimeLogSelectWorkers",
        const: {Spendables: [], MeasureUnits: [] },
    }

    // const [btnGridVisible, setBtnGridVisible] = useState(true)
    // console.log(setBtnGridVisible)
    // useTimeLogContext.btnGrid = [btnGridVisible, setBtnGridVisible]

    // https://codepen.io/Spruce_khalifa/pen/GRrWjmR
    const [selectMode, setSelectMode] = useState(false)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParam] = useState(["name", "type"]);
    const [filterParam, setFilterParam] = useState(["Выбранные"]); // "Все", "Избранное". "Выбранные"
    const navigate = useNavigate();
    const toggleSelectMode = () => {
        setSelectMode(!selectMode)
        setFilterParam("Выбранные")
    }
    const searchBarObjects = (searchQuery, setSearchQuery) => {
        console.log("[ RE-CALLED ] : searchBar")
        return <input
                        key="searchObjectss"
                        type="search"
                        class="people_search"
                        placeholder="Поиск"
                        defaultValue={searchQuery}
                        onChange={ (e) => setSearchQuery(e.target.value) }  /> // autoFocus
    }
    function search(items) {
        console.log("[ RE-CALLED ] : search in objects", items)
        // console.log(items)
        return items.filter((item) => { // Отобразятся только элементы, по которым прошло true по условиям.
            // Если значение элемента совпадает с указанным в фильтре (напр. избранное или выбранные)
            // console.log("item", item)
            if (filterParam == "Все") {
                return searchParam.some((newItem) => {
                    // console.log(item) // Итем со всеми его данными из общего контейнера
                    // console.log(newItem) // нужный ключ. в данном случае "capital"/.capital Нам нужен
                    // console.log(item[newItem]) // название города, для сравнения с введенным в поиске значением. Kabul / Khartoum /  Gitega
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) > -1
                    );
                });
            }
            if (filterParam == "Избранное" && item.isFav) { // Если в избранном и итем принадлежит этой категории
                return searchParam.some((newItem) => { // Возвращаем true если есть совпадение хотя бы по одному ключу ( ФИО или Бригада )
                    return ( // Возвращаем true если есть вхождение набранного текста в очередной айтем.
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) > -1
                    );
                });
            }
            if (filterParam == "Выбранные" && item.useNameSelected[0]) { // Если в выбранных и итем принадлежит этой категории

                return searchParam.some((newItem) => { // Возвращаем true если есть совпадение хотя бы по одному ключу ( ФИО или Бригада )
                    // console.log(newItem)
                    return ( // Возвращаем true если есть вхождение набранного текста в очередной айтем.
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) > -1
                    );
                });
            }
            console.log("[ RE-CALLED ] : search in object inner", item)
        });

    }


//////////////////

    const objectItemMainCanvas = (newObject, idx) => {
        console.log("[ RE-CALLED ] : objectItemMainCanvas")
        const editObjectTable = () => {
            useTimeLogContext.current.idx = idx;
            useTimeLogContext.current.object = newObject.name;
            useTimeLogContext.current.type = newObject.type;

            // CTX - SERVER FILLS DATA
            // console.log("object",newObject);
            // console.log("contetx", useTimeLogContext.objects);
            // console.log("object index", useTimeLogContext.objects.indexOf(newObject));
            navigate("/TimeLogSelectWorkers", {replace: true})
        }; // При клике на объект - переходим в полотно выбора рабочих с фильтрами на этот объект.

        return (
            <div class="task_item" onClick={editObjectTable}>
                                <div class="task_item_text">
                                    <p class="task_item_header nomargin title_m">{newObject.name}</p>
                                    <p class="task_item_info label_s">{newObject.type}</p>
                                </div>
                                <i className="task_item_arr fi fi-br-angle-small-right "></i>
                        </div>
            );
    }


    const objectItemSelectCanvas = (newObject, idx, nameSelected, setNameSelected) => {
        console.log("[ RE-CALLED ] : objectItemSelectCanvas")
        const toggleIsSelected = () => {
            setNameSelected( !nameSelected );
        }; // Тоггл галочки выбора
        let iconClass = "task_item_arr fi fi-br-check"
        let itemClass = "task_item"
        let itemWokerBandClass = "task_item_info label_s"
        let itemWokerNameClass = "task_item_header nomargin title_m"
        return (
            <div className={nameSelected == false ? itemClass : itemClass + " selected"} onClick={toggleIsSelected}>
                                <div class="task_item_text">
                                    <p className={nameSelected == false ? itemWokerNameClass : itemWokerNameClass + " selected"}>{newObject.name}</p>
                                    <p className={nameSelected == false ? itemWokerBandClass : itemWokerBandClass + " selected"}>{newObject.type}</p>

                                </div>
                                <i className={nameSelected == false ? iconClass : iconClass + " selected"}></i>
                        </div>
        );
    }

    const objectCanvasManager = (newObject, idx, alreadyInitializedItems) => {
        console.log("[ RE-CALLED ] : objectCanvasManager")

        // let cached = newObject.useNameSelected != undefined && newObject.useNameSelected != []


        // Возможно, дело в том, что хук вызывается во вложенной функции относительно ObjectPage. Но это не точно)
        // Да точняк. из-за того что тут кондишанл создание юзстейт / выбор уже существующего, может быть такое что кол-во именно ВЫЗОВОВ функции useState разное, хотя кол-во самих [val, seVal] одинаковое.
        // Хотя странно что двойной рендер не выдал ошибку в этом случае.
        // https://www.dhiwise.com/post/dealing-with-fewer-hooks-than-expected-in-rendered-output
        var [selected, setSelected] = useState(newObject.isSelected)
        var [selected2, setSelected2] = newObject.useNameSelected ? newObject.useNameSelected : [null, null]
        selected = newObject.useNameSelected ? selected2 : selected
        setSelected = newObject.useNameSelected ? setSelected2 : setSelected // Создаем индивидуальное хранилище для отслеживания клика (для иконки). Приходится выкручиваться из-за правил использования хуков.
        // var [selected, setSelected] = newObject.useNameSelected ? newObject.useNameSelected : useState(newObject.isSelected)
        // console.log(newObject.useNameSelected ? true : false, newObject)
        console.log('selectMode', selectMode)
        var canvas = selectMode ? objectItemSelectCanvas(newObject, idx, selected, setSelected) : objectItemMainCanvas(newObject, idx, selected, setSelected)
        console.log("canvas", canvas)
        // Создаем контент для хранилища. Один элемент, который может отрисовываться в разных вкладках несколько раз.
        let newObjectData = {
            ...newObject,
            index: idx, // По этому индексу можно не перербирвать массив рабочих, а напрямую записывать по индексу (комечно после проверки на совпадение по имени)
            canvas: canvas,
            useNameSelected: [selected, setSelected],
        }

        // Проверяем, есть ли полученное с сервера или базы имя в оперативном контексте.
        if (!alreadyInitializedItems.includes(newObject.name)) { // Если в контексте такого ещё нет, то добавляем его.
            useTimeLogContext.objects.push(newObjectData)
            console.log("not yet initializedItem. newObjectData:", newObjectData)

        } else { // Имя уже добавлено, но возможно его параметры другие. Новые параметры находятся в newObject
            console.log("already initializedItem. SelectMode: ", selectMode,  "newObjectData:", newObjectData)
            var idx = useTimeLogContext.objects.findIndex((element) => element.name == newObjectData.name)
            useTimeLogContext.objects[idx] = newObjectData

        }

        // console.log("canvas", canvas) - OK
        // console.log("not yet initializedItem. newObjectData:", newObjectData) - NOT OK?
    }



    const prepareObjects = () => {
        /// При первом рендере кладем воркеров в контекст и используем контекст
        // Во всех остальных - используем контекст.
        console.log("[ RE-CALLED ] : prepareObjects")
        const parseContextNames = (useTimeLogContext) => {
            console.log("[ RE-CALLED ] : parseContextNames")
            // console.log(useTimeLogContext)
            var ret = [] // Просто выдираем имена из контекста
            for (var uniqueObject of useTimeLogContext.objects) {
                ret.push(uniqueObject.name)
            }
            return ret
        }
        var obj = useTimeLogContext.objects.length == 0 ? objects : useTimeLogContext.objects
        var alreadyInitializedItems = parseContextNames(useTimeLogContext)
        let index = 0  // По этому индексу можно не перербирвать массив рабочих, а напрямую записывать по индексу (комечно после проверки на совпадение по имени)
        for (var newObject of obj) {
            objectCanvasManager(newObject, index, alreadyInitializedItems) // Инициализируем сам элемент с логикой и холстом
            index++
        }
    }



    const renderContent = () => {
        console.log("[ RE-CALLED ] : renderContent")

        const renderMainMode = (ctx) => {
            console.log("[ RE-CALLED ] : renderMainMode", )
            return ctx.filter( (item) => {
                // console.log(item.useNameSelected[0])
                if (item.useNameSelected[0]) { return true }
            })
        }

        prepareObjects() // Подготовка данных
        console.log("Элементы готовы. Переходим к собиранию полотна")
        const nameList_selectmode = <div className="tab__content" id="tab__favourite_workers">
                                        {search(useTimeLogContext.objects).map((item) => ( // Отрисовать результаты поиска по всему файлу.
                                            item.canvas
                                        ))}
                                    </div>
        const nameList_mainmode = <div className="tab__content" id="tab__chosen_workers">
                                        {renderMainMode(useTimeLogContext.objects).map((item, mapindex) => ( // Отрисовать результаты поиска по всему файлу.
                                            item.canvas
                                            // Если бы тут была функция, возвращающая канвас, а не сам канвас, то можно бы было прокинуть порядковый номер.
                                        ))}
                                    </div>
        const sbar = React.useMemo(() => searchBarObjects(searchQuery, setSearchQuery));
        // var object = <div class='workerselectObject' id='workerselect_object' onclick='onClick()'><div class='obj'>Объект:</div><div>{useTimeLogContext.current.object}</div></div>
        // var objInfo = <div class='workerselectObject' id='' onclick='onClick()'><div class='writernames'>Заполнявшие в этом месяце: <br/><span>Захарченко И.С.</span></div><div></div></div>
        const selectmodeCanvas = <Fragment>
                                    {/* {object} */}
                                    <div className="grid">

                                        <input type="radio" id="tab1" name="tabGroup1" class="tab" checked={filterParam == "Выбранные" ? true : false}/>
                                        <label for="tab1" onClick={() => {return setFilterParam("Выбранные")}}><div class="label_bordbot">Выбранные</div></label>
                                        <input type="radio" id="tab3" name="tabGroup1" class="tab" checked={filterParam == "Все" ? true : false}/>
                                        <label for="tab3" onClick={() => {return setFilterParam("Все")}}><div class="label_bordbot">Все</div></label>

                                        {/* <input type="radio" id="tab2" name="tabGroup1" class="tab" checked={filterParam == "Избранное" ? true : false}/>
                                        <label for="tab2" onClick={() => {return setFilterParam("Избранное")}}><div class="label_bordbot">Избранное</div></label> */}
                                        {sbar}
                                        {nameList_selectmode}
                                    </div>
                                </Fragment>
        const mainCanvas = <Fragment>
                                {/* {object} {objInfo} */}
                                <input type="radio" id="tab0" name="tabGroup4" class="tab" checked/>
                                {nameList_mainmode}
                            </Fragment>
        console.log("Полотно готово к рендеру")
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

    const navLeft  = (handler) => {console.log("[ RE-CALLED ] : navLeft")
        return (
            <Fragment>
            <i class="header_back fi fi-rr-arrow-small-left"></i>
            </Fragment>
    )}
    const navRight  = (handler) => { console.log("[ RE-CALLED ] : navRight")
        // var btn = selectMode ? <button onClick={toggleSelectMode} class="header_save change_workers ready">Готово</button> : <button onClick={toggleSelectMode} class="header_save change_workers">Изменить</button>
        var btn = selectMode ? <i onClick={toggleSelectMode} className="fi fi-rs-disk"></i> : <i onClick={toggleSelectMode} className="fi fi-bs-edit"></i>
        return (
        <Fragment>
        {/* <i class="header_save fi fi-rs-disk"></i> */}
        {btn}
        </Fragment>
    )}
    const header = (handler) => {
        console.log("[ RE-CALLED ] : header")
        return (
            <div class="header" id="header_main">
                <div className="nav_left"> {navLeft(handler) || null}</div>
                <div class="header_title"> {state.pageTitle || "Нету названия"} </div>
                <div className="nav_right"> {navRight(handler) || null}</div>
            </div>
        )
    }

    // Можно конечно попробовать рендерит ьвсё прямо здесь.. а уже потом оборачивать в контекст отловщика ошибок и т.д.
    // const renderCanvas = () => {
    //     var he = header()
    //     var co = content()
    //     return (
    //         <Fragment>
    //             {he}
    //             {co}
    //         </Fragment>
    //     )
    // }

    const render = () => {

        return AppCanvas({
                renderCanvas: renderContent,
                pageTitle: state.pageTitle,
                navLeft: navLeft,
                navRight: navRight,
                head: header
            })
    }
    return render()

}
