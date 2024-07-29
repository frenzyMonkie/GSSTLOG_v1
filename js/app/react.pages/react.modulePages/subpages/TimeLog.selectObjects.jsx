


const TimeLogSelectObjects  = ({contextType}) => {
    const [menuSelected, setMenuSelected] = useOutletContext();
    const goPage = (page) => {
        setMenuSelected(page)
        navigate(page);
    }
    const TLctx = React.useContext(TimeLogContext) // Берем контекст
    const state = {
        pageTitle: "Табели объектов",
        currentObject: "",
        currentObjectCustoms: {},
        formData: {},
        formLabel: "TimeLogSelectObjects",
        backPage: "/TimeLog",
        nextPage: "/TimeLogSelectWorkers",
        const: {Spendables: [], MeasureUnits: [] },
    }

    // https://codepen.io/Spruce_khalifa/pen/GRrWjmR
    const [selectMode, setSelectMode] = useState(false)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParam] = useState(["name", "type"]);
    const [filterParam, setFilterParam] = useState(["Все"]); // "Все", "Избранное". "Выбранные"
    const navigate = useNavigate();

    const saveObjectList = () => {
        toggleSelectMode()
        console.log(TLctx)
        updateStateAndSubmit()
    }
    const updateStateAndSubmit = () => {

        // 1. Обновляем список
        for (let obj of TLctx.objects) {
            obj.is_selected = obj.useNameSelected ? obj.useNameSelected[0] : obj.is_selected
            console.log("Очередной", obj.id, obj.is_selected)
            var index = TLctx.objects_selected_ids.indexOf(obj.id);
            if (obj.is_selected) { // Объект выбран
                if (index !== -1) { // И он есть в списке
                } else if (index == -1) { // Но его нет в списке
                    TLctx.objects_selected_ids.push(obj.id)
                    console.log("Добавляем в список", obj.id)
                }
            } else if (!obj.is_selected) {  // Объект не выбран
                if (index !== -1) { // И он есть в списке
                    TLctx.objects_selected_ids.splice(obj.id, 1);
                    console.log("Убираем из списка", obj.id)
                }
            }
        }
        console.log(TLctx)
        handleSaveTLOG()
        // // 2. Если есть расхождения - отправялем на сервер. Итерируемся по двум спискам
        // for (let id of TLctx.objects_selected_ids) {
        //     var index = TLctx.initialState.objects_selected_ids.indexOf(id);
        //     if (index == -1) {
        //         //   Если хотя бы одного индекса нет в спике, то надо бы сохранить состояние
        //         handleSaveTLOG()
        //     }
        // }
        // for (let id of TLctx.initialState.objects_selected_ids) {
        //     var index = TLctx.objects_selected_ids.indexOf(id);
        //     if (index == -1) {
        //         //   Если хотя бы одного индекса нет в спике, то надо бы сохранить состояние
        //         handleSaveTLOG()
        //     }

        // }
    }
    const handleSaveTLOG = () => {
        var payload = {
            headers: {
                datetime: Math.floor(Date.now() / 1000),
                reqtype: "POSTDB_SAVESTATE",
            },
            "user_id": TLctx.user.ID,
            "objects_selected_ids": TLctx.objects_selected_ids,
        }
        console.log("PAYLOAD", payload)
        saveState(payload)

    }
    const saveState = (payload) => {
        // https://www.topcoder.com/thrive/articles/fetch-api-javascript-how-to-make-get-and-post-requests
        // https://reqbin.com/code/javascript/wc3qbk0b/javascript-fetch-json-example#:~:text=To%20fetch%20JSON%20from%20the,text%2C%20call%20the%20response.text()%20method
        fetch('http://localhost:8080/save', {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
           .then(response => console.log(response))

    }
    const toggleSelectMode = () => {
        setSelectMode(!selectMode)
        setFilterParam("Все")
        window.scrollTo(0, 0);
    }
    const searchBarObjects = (searchQuery, setSearchQuery) => {
        console.log("[ RE-CALLED ] : searchBar")
        return <input
                        key="searchObjects"
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
            // console.log("[ RE-CALLED ] : search in object inner", item)
        });

    }


//////////////////

    const objectItemMainCanvas = (newObject, idx) => {
        // console.log("[ RE-CALLED ] : objectItemMainCanvas")
        const editObjectTable = () => {
            TLctx.current.idx = idx;
            TLctx.current.object_name = newObject.name;
            TLctx.current.object_id = newObject.id;
            TLctx.current.type = TLctx.maps.services[newObject.type];
            TLctx.current.contractor= TLctx.maps.contractors[newObject.contractor];



            // CTX - SERVER FILLS DATA
            goPage("/TimeLogSelectWorkers")
        }; // При клике на объект - переходим в полотно выбора рабочих с фильтрами на этот объект.

        return (
            <div class="task_item" onClick={editObjectTable}>
                                <div class="task_item_text">
                                    <p class="task_item_header nomargin title_m">{newObject.name}</p>
                                    <p class="task_item_info label_s">{TLctx.maps.contractors[newObject.contractor]}</p>
                                </div>
                                {/* <i className="task_item_arr fi fi-br-angle-small-right "></i> */}
                                <i className="task_item_arr fi fi-sr-caret-right "></i>
                        </div>
            );
    }


    const objectItemSelectCanvas = (newObject, idx, nameSelected, setNameSelected) => {
        // console.log("[ RE-CALLED ] : objectItemSelectCanvas")
        const toggleSelected = () => {
            setNameSelected( !nameSelected );
        }; // Тоггл галочки выбора
        let iconClass = "task_item_arr fi fi-sr-checkbox"
        let iconClassUnchecked = "task_item_arr fi fi-sr-checkbox-unchecked"
        let itemClass = "task_item"
        let itemWokerBandClass = "task_item_info label_s"
        let itemWokerNameClass = "task_item_header nomargin title_m"
        return (
            <div className={nameSelected == false ? itemClass : itemClass + " selected"} onClick={toggleSelected}>
                                <div class="task_item_text">
                                    <p className={nameSelected == false ? itemWokerNameClass : itemWokerNameClass + " selected"}>{newObject.name}</p>
                                    <p className={nameSelected == false ? itemWokerBandClass : itemWokerBandClass + " selected"}>{TLctx.maps.contractors[newObject.contractor]}</p>

                                </div>
                                <i className={nameSelected == false ? iconClassUnchecked : iconClass + " selected"}></i>
                        </div>
        );
    }

    const objectCanvasManager = (newObject, idx, alreadyInitializedItems) => {
        // console.log("[ RE-CALLED ] : objectCanvasManager")

        // https://www.dhiwise.com/post/dealing-with-fewer-hooks-than-expected-in-rendered-output
        // var [selected, setSelected] = useCells(newObject, newObject.is_selected)
        newObject.is_selected = newObject.useNameSelected ? newObject.useNameSelected[0] : newObject.is_selected
        let [selected, setSelected] = useState(newObject.is_selected)



        var canvas = selectMode ? objectItemSelectCanvas(newObject, idx, selected, setSelected) : objectItemMainCanvas(newObject, idx, selected, setSelected)
        // Создаем контент для хранилища. Один элемент, который может отрисовываться в разных вкладках несколько раз.
        let newObjectData = {
            ...newObject,
            index: idx, // По этому индексу можно не перербирвать массив рабочих, а напрямую записывать по индексу (комечно после проверки на совпадение по имени)
            canvas: canvas,
            useNameSelected: [selected, setSelected],
        }

        // Проверяем, есть ли полученное с сервера или базы имя в оперативном контексте.
        if (!alreadyInitializedItems.includes(newObject.name)) { // Если в контексте такого ещё нет, то добавляем его.
            TLctx.objects.push(newObjectData)
        } else { // Имя уже добавлено, но возможно его параметры другие. Новые параметры находятся в newObject
            var idx = TLctx.objects.findIndex((element) => element.name == newObjectData.name)
            TLctx.objects[idx] = newObjectData
        }

    }



    const prepareObjects = () => {
        /// При первом рендере кладем воркеров в контекст и используем контекст
        // Во всех остальных - используем контекст.
        // console.log("[ RE-CALLED ] : prepareObjects")
        const parseContextNames = (TLctx) => {
            // console.log("[ RE-CALLED ] : parseContextNames")
            // console.log(TLctx)
            var ret = [] // Просто выдираем имена из контекста
            // console.log(TLctx.objects)
            for (var uniqueObject of TLctx.objects) {
                ret.push(uniqueObject.name)
            }
            return ret
        }
        var obj = TLctx.objects.length == 0 ? TLctx.initialState.objects : TLctx.objects // objects

        var alreadyInitializedItems = parseContextNames(TLctx)
        let index = 0  // По этому индексу можно не перербирвать массив рабочих, а напрямую записывать по индексу (комечно после проверки на совпадение по имени)
        for (var newObject of obj) {
            objectCanvasManager(newObject, index, alreadyInitializedItems) // Инициализируем сам элемент с логикой и холстом
            index++
        }
    }



    const renderContent = () => {
        // console.log("[ RE-CALLED ] : renderContent")

        const renderMainMode = (ctx) => {
            // console.log("[ RE-CALLED ] : renderMainMode", )
            return ctx.filter( (item) => {
                // console.log(item.useNameSelected[0])
                if (item.useNameSelected[0]) { return true }
            })
        }
        const toggleFilterParam = () => {
            var optionAll = "Все"
            var optionChosen = "Выбранные"
            setFilterParam(filterParam == "Все" ? optionChosen : optionAll)
        }
        prepareObjects() // Подготовка данных
        // console.log("Элементы готовы. Переходим к собиранию полотна")
        const nameList_selectmode = <div className="tab__content" id="tab__favourite_objects">
                                        {search(TLctx.objects).map((item) => ( // Отрисовать результаты поиска по всему файлу.
                                            item.canvas
                                        ))}
                                    </div>
        const nameList_mainmode = <div className="tab__content" id="tab__chosen_objects">
                                        {renderMainMode(TLctx.objects).map((item, mapindex) => ( // Отрисовать результаты поиска по всему файлу.
                                            item.canvas
                                            // Если бы тут была функция, возвращающая канвас, а не сам канвас, то можно бы было прокинуть порядковый номер.
                                        ))}
                                    </div>
        const sbar = React.useMemo(() => searchBarObjects(searchQuery, setSearchQuery));
        var editWorkerListbtn = <i onClick={toggleSelectMode} className="fi fi-bs-edit"></i>
        // var object = <div class='workerselectObject' id='workerselect_object' onclick='onClick()'><div class='obj'>Объект:</div><div>{TLctx.current.object_name}</div></div>
        // var objInfo = <div class='workerselectObject' id='' onclick='onClick()'><div class='writernames'>Заполнявшие в этом месяце: <br/><span>Захарченко И.С.</span></div><div></div></div>
        var toggleFilter = filterParam == "Все"
        ? <label for="tab1" onClick={() => {return toggleFilterParam()}}><i className="fi fi-sr-summary-check "></i></label>
        : <label for="tab1" onClick={() => {return toggleFilterParam()}}><i className="fi fi-sr-summary-check-selected "></i></label>
        var actionsBar = <div class="timetable_controls">
            <div class="task_item"><div class="task_item_text">Отправить себе</div></div>
            <div class="task_item"><div class="task_item_text">Отправить в чат</div></div>
            <div class="task_item"><div class="task_item_text">Подтвердить месяц</div></div>
        </div>
        const selectmodeCanvas = <Fragment>
                                    {/* {object} */}
                                    <div className="grid">

                                        <input type="radio" id="objtab1" class="tab" checked={filterParam == "Выбранные" ? true : false}/>
                                        {/* <label for="tab1" onClick={() => {return setFilterParam("Выбранные")}}><div class="label_bordbot">Выбранные</div></label> */}
                                        <input type="radio" id="objtab3" class="tab" checked={filterParam == "Все" ? true : false}/>
                                        {/* <label for="tab3" onClick={() => {return setFilterParam("Все")}}><div class="label_bordbot">Все</div></label> */}

                                        {/* <input type="radio" id="objtab2" class="tab" checked={filterParam == "Избранное" ? true : false}/>
                                        <label for="tab2" onClick={() => {return setFilterParam("Избранное")}}><div class="label_bordbot">Избранное</div></label> */}
                                        <div class='toprow'>{toggleFilter}{sbar}</div>
                                        {nameList_selectmode}
                                    </div>
                                </Fragment>
        const mainCanvas = <Fragment>
                                {/* {object} {objInfo} */}

                                <input type="radio" id="objtab0" class="tab" checked/>
                                <div class="grid_header objects">
                                {editWorkerListbtn}
                                    <div>Выбранные</div>

                                </div>
                                {nameList_mainmode}
                            </Fragment>
        // console.log("Полотно готово к рендеру")
        return (
            <TimeLogContext.Provider>
            <div class="timelog">
                <div class="objects">
                    {/* {actionsBar} */}
                    <div class="tab-wrap">
                        {selectMode ? selectmodeCanvas : mainCanvas}
                    </div>
                </div>
            </div>
            </TimeLogContext.Provider>
        )

    }

    const navLeft  = (handler) => {console.log("[ RE-CALLED ] : navLeft")
        const goToMain = () => {
            goPage("/FillDataMain")
            window.scrollTo(0, 0);
        }
        return (
            <Fragment>
            {/* <i class="header_back fi fi-rr-arrow-small-left" onClick = {() => navigate("/FillDataMain", {replace: true})}></i> */}
            <i class="header_back fi fi-rr-arrow-small-left" onClick = {() => goToMain()}></i>
            {/* goPage("/TimeLogSelectWorkers") */}
            </Fragment>
    )}
    const goSendMenu = () => {
        setMenuSelected("/SendMenu")
        goPage("/SendMenu")
    }
    const navRight  = (handler) => { console.log("[ RE-CALLED ] : navRight")
        // var btn = selectMode ? <button onClick={toggleSelectMode} class="header_save change_workers ready">Готово</button> : <button onClick={toggleSelectMode} class="header_save change_workers">Изменить</button>
        var btn = selectMode ?
        <i onClick={saveObjectList} className="fi fi-rs-disk"></i> : null
        // : <i onClick={goSendMenu} className="fi fi-bs-paper-plane"></i> // <i onClick={toggleSelectMode} className="fi fi-bs-edit"></i>
        return (
        <Fragment>
        {/* <i class="header_save fi fi-rs-disk"></i> */}
        {btn}
        </Fragment>
    )}
    const header = (handler) => {
        // console.log("[ RE-CALLED ] : header")
        return (
            <div class="header" id="header_main">
                <div className="nav_left"> {navLeft(handler) || null}</div>
                <div class="header_title"> {state.pageTitle || "Нету названия"} </div>
                <div className="nav_right"> {navRight(handler) || null}</div>
            </div>
        )
    }

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
