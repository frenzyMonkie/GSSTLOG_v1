var workers = [
    {name: "Авплетий Ничан Пастырович", band: "Рябов", isFav: false, selectedInObjects: ['Тимирязевская'],
        timenodes: [ // теперь нужно привязать timenodes  к объектам, и вызывать по ключу current.object
            {date: "06.06.2024", hours: 12, object: "Тимирязевская",smena:"Ночные смены", workType:"Бурение"},
            {date: "06.06.2024", hours: 12, object: "Тимирязевская", smena:"Дневные смены", workType:"Бурение"},
            {date: "07.06.2024", hours: null, object: "Тимирязевская", smena:"Дневные смены", workType:"Замывка"},
            {date: "08.06.2024", hours: 8, object: "Тимирязевская", smena:"Дневные смены", workType:"Дежурство"}
    ],},
    {name: "Ахмедов Ахмед Ахмедович", band: "Дьячков", isFav: true, selectedInObjects: [], timenodes: [],},
    {name: "Джованни Джорджо Яковлевич", band: "Дьячков", isFav: false, selectedInObjects: [], timenodes: [],},
    {name: "Захаров Дмитрий Алексеевич", band: "Геоспецстрой", isFav: true, selectedInObjects: [], timenodes: [],},
    {name: "Мухатгалиев Якубджон Джамшут-оглы", band: "Дьячков", isFav: false, selectedInObjects: [], timenodes: [],},
    {name: "Нагорный Ламинат Горыныч", band: "Данченко", isFav: false, selectedInObjects: [], timenodes: [],},
    {name: "Сальчичон Балык Хамонович", band: "Дьячков", isFav: false, selectedInObjects: [], timenodes: [],},
    {name: "Смешной Егор Егорович", band: "Ражабов", isFav: true, selectedInObjects: [], timenodes: [],},
    {name: "Якубенко Владислав Игоревич", band: "Илькевич", isFav: true, selectedInObjects: [], timenodes: [],},
]     // .sort() лучше вообще сделать так, чтобы изначально с сервера приходил отсортированный по именам.


const searchBar = (searchQuery, setSearchQuery) => {
    console.log("[ RE-CALLED ] : searchBar")
    return <input
                    key="searchWorkers"
                    type="search"
                    class="people_search"
                    placeholder="Поиск"
                    defaultValue={searchQuery}
                    onChange={ (e) => setSearchQuery(e.target.value) }  /> // autoFocus
}
const TimeLogSelectWorkers  = () => {
    const TLctx = React.useContext(TimeLogContext) // Берем контекст
    const state = {
        pageTitle: "Табель объекта",
        currentObject: "",
        currentObjectCustoms: {},
        formData: {},
        formLabel: "TimeLogWorkerList",
        backPage: "/TimeLog",
        nextPage: "/CalendarPro",
        const: {Spendables: [], MeasureUnits: [] },
    }

    const [selectMode, setSelectMode] = useState(false)
    // https://codepen.io/Spruce_khalifa/pen/GRrWjmR

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParam] = useState(["name", "band"]);
    const [filterParam, setFilterParam] = useState(["Все"]); // "Все", "Избранное". "Выбранные"
    const navigate = useNavigate();
    const toggleSelectMode = () => {
        setSelectMode(!selectMode)
        setFilterParam("Все")
    }
    function search(items) {
        console.log("[ RE-CALLED ] : search", items)
        // console.log(items)
        return items.filter((item) => { // Отобразятся только элементы, по которым прошло true по условиям.
            // Если значение элемента совпадает с указанным в фильтре (напр. избранное или выбранные)
            // console.log("item", item)
            if (filterParam == "Все" ) {
                return searchParam.some((newItem) => {
                    // console.log(item) // Итем со всеми его данными из общего контейнера
                    // console.log(newItem) // нужный ключ. в данном случае "capital"/.capital Нам нужен
                    // console.log(item[newItem]) название города, для сравнения с введенным в поиске значением. Kabul / Khartoum /  Gitega
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) > -1
                    );
                });
            }

            if (filterParam == "Избранное" && item.isFav && item.selectedInObjects.includes(TLctx.current.object)) { // Если в избранном и итем принадлежит этой категории
                return searchParam.some((newItem) => { // Возвращаем true если есть совпадение хотя бы по одному ключу ( ФИО или Бригада )
                    return ( // Возвращаем true если есть вхождение набранного текста в очередной айтем.
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) > -1
                    );
                });
            }
            if (filterParam == "Выбранные" && item.useNameSelected[0] && item.selectedInObjects.includes(TLctx.current.object)) { // Если в выбранных и итем принадлежит этой категории
                return searchParam.some((newItem) => { // Возвращаем true если есть совпадение хотя бы по одному ключу ( ФИО или Бригада )
                    return ( // Возвращаем true если есть вхождение набранного текста в очередной айтем.
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) > -1
                    );
                });
            }
            console.log("[ RE-CALLED ] : search", items)
        });

    }

const oneWorkerMainCanvas = (idx, newWorker) => {
    console.log("[ RE-CALLED ] : oneWorkerMainCanvas")
    const editWorker = (idx) => {

        let newWorker = TLctx.workers[idx]
        TLctx.current.idx = idx;
        TLctx.current.worker = newWorker;
        TLctx.current.smena = newWorker.LastSmena
        TLctx.current.workType = newWorker.LastWorkType
        let newNodes = TLctx.workers[idx].timenodes.filter(item => {
            return item.hours != null;
        }).map(item => item) // Очищаем массив от лишних, обнуленных элементов, и клонируем его.
        TLctx.current.timenodes = structuredClone(newNodes);  // Копируем куда надо
        console.log("enter", TLctx.current.timenodes)
        // CTX - SERVER FILLS DATA
        navigate("/CalendarPro", {replace: true})
    };

    return (
        <div class="task_item" onClick={() => editWorker(idx)}>
                            <div class="task_item_text">
                                <p class="task_item_header nomargin title_m">{newWorker.name}</p>
                                <p class="task_item_info label_s">{newWorker.band}</p>
                            </div>
                            {/* <i className="task_item_arr fi fi-br-angle-small-right "></i> */}
                            <i className="task_item_arr fi fi-sr-caret-right "></i>
                    </div>
        );
}

// ["1", "2"]
//
const oneWorkerSelectableCanvas = (idx, newWorker, selected, setSelected) => {
    console.log("[ RE-CALLED ] : oneWorkerSelectableCanvas")
    const toggleWorkerisSelected = () => {
        console.log('selected', selected)
        if (selected) {let index = newWorker.selectedInObjects.indexOf(TLctx.current.object)
                                if (index !== -1) {
                                    console.log(newWorker.selectedInObjects)
                                    newWorker.selectedInObjects.splice(index, 1);
                                    console.log(newWorker.selectedInObjects)
                    }
        } else if (!selected && !newWorker.selectedInObjects.includes(TLctx.current.object)){
            console.log(newWorker.selectedInObjects)
            newWorker.selectedInObjects.push(TLctx.current.object)
            console.log(newWorker.selectedInObjects)
        }
        // TLctx.workers[idx].useNameSelected[1]( !useNameSelected[0] );
        setSelected(!selected)
        // изменить на логику if newWorker.selectedInObjects.includes(TLctx.current.object) => setSelected(true) else setSelected(false)
    }; // Тоггл галочки выбора
    // let iconClass = "task_item_arr fi fi-br-check"
    let iconClass = "task_item_arr fi fi-sr-checkbox"
    let itemClass = "task_item"
    let itemWokerBandClass = "task_item_info label_s"
    let itemWokerNameClass = "task_item_header nomargin title_m"

    return (
        <div className={ selected ? itemClass + " selected" : itemClass } onClick={() => toggleWorkerisSelected()}>
                            <div class="task_item_text">
                                <p className={selected ? itemWokerNameClass + " selected" : itemWokerNameClass}>{newWorker.name}</p>
                                <p className={selected ? itemWokerBandClass + " selected" : itemWokerBandClass}>{newWorker.band}</p>

                            </div>
                            <i className={selected ? iconClass + " selected" : iconClass}></i>
                    </div>
      );
}
const parseContextNames = (TLctx) => {
    console.log("[ RE-CALLED ] : parseContextNames")
    var ret = [] // Просто выдираем имена из контекста
    for (var uniqueWorker of TLctx.workers) {
        ret.push(uniqueWorker.name)
    }
    return ret
}
const useCells = (newObject, defaultValue) => {
    let [sel, setSel] = useState(defaultValue)
    console.log('potentialCell', newObject )
    return newObject.useNameSelected ? newObject.useNameSelected : [sel, setSel]
}
const workerCanvasManager = (newWorker, idx, alreadyInitializedItems) => {
    console.log("[ RE-CALLED ] : workerCanvasManager")


    // console.log(newWorker)

    var defaultSmena = "Дневные смены"
    var defaultWorkType = "Бурение"
    // var [selected, setSelected] = useCells(newWorker.useNameSelected, newWorker.isSelected)
    // console.log('newWorker.selectedInObjects.includes(TLctx.current.object)', newWorker.selectedInObjects.includes(TLctx.current.object))
    newWorker.isSelected = newWorker.useNameSelected ? newWorker.useNameSelected[0] : newWorker.isSelected
    let [selected, setSelected] = useState(newWorker.selectedInObjects.includes(TLctx.current.object))
    console.log('selected 1', selected)
    // Здесь нужно не из воркера брать, а из контекста по idx
    let newWorkerData = {
        ...newWorker,
        index: idx, // По этому индексу можно не перербирвать массив рабочих, а напрямую записывать по индексу (комечно после проверки на совпадение по имени)
        useNameSelected: [selected, setSelected],
        LastSmena: defaultSmena,
        LastWorkType: defaultWorkType,
    }

    var canvas = selectMode ? oneWorkerSelectableCanvas(idx, newWorker, selected, setSelected) : oneWorkerMainCanvas(idx, newWorker)
    // Создаем контент для хранилища. Один элемент, который может отрисовываться в разных вкладках несколько раз.
    newWorkerData = {
        ...newWorkerData,
        canvas: canvas,
    }

    // Проверяем, есть ли полученное с сервера или базы имя в оперативном контексте.
    // var namesInContext = parseContextNames(TLctx)
    // console.log(TLctx)
    // if (!namesInContext.includes(newWorker.name)) { // Если в контексте такого ещё нет, то добавляем его.
    //     TLctx.workers.push(newWorkerData)
    //     console.log("789s", TLctx.workers)
    // } else {
    //     var idx = TLctx.workers.findIndex((element) => element.name == newWorkerData.name)
    //     // Имя уже добавлено, но возможно его параметры другие. Новые параметры находятся в newWorker
    //     TLctx.workers[idx] = newWorkerData
    //     console.log("456s", TLctx.workers)
    // }

    return newWorkerData
}






const renderContent = () => {
    console.log("[ RE-CALLED ] : renderContent")
    const renderMainMode = (ctx) => {
        console.log("[ RE-CALLED ] : renderMainMode")
        return ctx.filter( (item) => {
            // console.log("item", item)
            if (item.useNameSelected[0] && item.selectedInObjects.includes(TLctx.current.object)) { return true }
        })
    }
    const toggleFilterParam = () => {
        var optionAll = "Все"
        var optionChosen = "Выбранные"
        setFilterParam(filterParam == "Все" ? optionChosen : optionAll)
    }
    // Подготовка данных
    var workerList = prepareWorkers()

    // }
    // console.log("workerList", workerList)
    // console.log("TLctx.workers", TLctx.workers)
    // wrks = wrks.filter(worker => {
    //     return worker.selectedInObjects.includes(TLctx.current.object)})
    // console.log(wrks)
    const nameList_selectmode = <div className="tab__content" id="tab__favourite_workers">
                                    {search(TLctx.workers).map((item) => ( // Отрисовать результаты поиска по всему файлу.
                                        item.canvas
                                    ))}
                                </div>
    const nameList_mainmode = <div className="tab__content" id="tab__chosen_workers">
                                    {renderMainMode(workerList).map((item, mapindex) => ( // Отрисовать результаты поиска по всему файлу.
                                        item.canvas
                                        // Если бы тут была функция, возвращающая канвас, а не сам канвас, то можно бы было прокинуть порядковый номер.
                                    ))}
                                </div>
    const sbar = React.useMemo(() => searchBar(searchQuery, setSearchQuery));
    var object = <div class='workerselectObject' id='workerselect_object' onclick='onClick()'><div class='obj'>Объект:</div><div>{TLctx.current.object}</div></div>
    // var objInfo = <div class='workerselectObject' id='workerselect_writernames' onclick='onClick()'><div class='writernames'>Заполнявшие в этом месяце: <br/><span>Захарченко И.С.</span></div><div></div></div>
    var editWorkerListbtn = selectMode ? <i onClick={toggleSelectMode} className="fi fi-rs-disk"></i> : <i onClick={toggleSelectMode} className="fi fi-bs-edit"></i>
    var toggleFilter = filterParam == "Все"
    ? <label for="tab1" onClick={() => {return toggleFilterParam()}}><i className="fi fi-ss-team-check-alt"></i></label>
    : <label for="tab1" onClick={() => {return toggleFilterParam()}}><i className="fi fi-ss-team-check-alt-selected"></i></label>
    const selectmodeCanvas = <Fragment>
                                {object}

                                <div className="grid">
                                    <input type="radio" id="tab1" name="tabGroup1" class="tab" checked={filterParam == "Выбранные" ? true : false}/>
                                    {/* <label for="tab1" onClick={() => {return setFilterParam("Выбранные")}}><div class="label_bordbot">Выбранные</div></label> */}
                                    <input type="radio" id="tab3" name="tabGroup1" class="tab" checked={filterParam == "Все" ? true : false}/>
                                    {/* <label for="tab3" onClick={() => {return setFilterParam("Все")}}><div class="label_bordbot">Все</div></label> */}
                                    {/* <input type="radio" id="tab2" name="tabGroup1" class="tab" checked={filterParam == "Избранное" ? true : false}/>
                                    <label for="tab2" onClick={() => {return setFilterParam("Избранное")}}><div class="label_bordbot">Избранное</div></label> */}
                                    <div class='toprow'>{toggleFilter}{sbar}</div>
                                    {nameList_selectmode}
                                </div>
                            </Fragment>
    const mainCanvas = <Fragment>
                            {object}
                            {/* {objInfo} */}
                            <input type="radio" id="tab0" name="tabGroup4" class="tab" checked/>
                            <div class="grid_header workers">
                                    <div>Список сотрудников</div>
                                    {editWorkerListbtn}
                            </div>
                            {nameList_mainmode}

                        </Fragment>

    return (
        <TimeLogContext.Provider>
        <div class="timelog">
            <div class="workers">
                <div class="tab-wrap">
                    {selectMode ? selectmodeCanvas : mainCanvas}
                </div>
            </div>
        </div>
        </TimeLogContext.Provider>
    )

}

const prepareWorkers = () => {
    /// При первом рендере кладем воркеров в контекст и используем контекст
    // Во всех остальных - используем контекст.
    console.log("[ RE-CALLED ] : prepareWorkers")

    // Можно попробовать некую проверку контекста на наличие в нём всех загруженных новых актуальных данных вместо firstLoad
    // Но это будет дольше чем просто засунуть все новые данные.
    // Однако суть в том, что могут быть уже внесенные данные в контекст, которые отличаются от вновь загруженных
    // Поскольку список фамилий меняться не может, то проверять нужно только на них, и если есть новая фамилия, то добавлять в контекст, иначе пропускать,
    // т.к. пользователь мог поменять что-то.
    // Если же поменялись данные по пользователю на конкретном объекте и на конкретную дату, значит кто-то другой уже внес свою актуальную информацию, других вариантов нет.
    // Это значит что нужно на вкладке выбора времени указывать также имя того, кто внёс данные, и помечать кружок другим цветом (оранжевым к примеру),
    // если имя не совпадает с именем вносившего, просто чтобы человек обратил внимание, что кто-то внёс за него информацию, и мог уже действовать по-своему.
    // Соответственно, проверка должна быть в любом случае, и проверка должна быть двойной.
    // 1. Проверка на новые фамилии и добавление новых в случае отсутствия
    // 2. Проверка на соответствии имен пользователя и вносившего в контексте выбранной для редактирования фамилии
    // 3. Проверка серверная на дату и время заполнения, и всегда записывается та информация, время заполнения которой позже.
    // т.е. если пришел пакет, а там время заполнения раньше чем в последнем сохраненном, то он отклоняется. Чисто технический момент.
    // Если один и тот же пользователь меняет инфу из 2-х устройств? Например начал на ПК, сохранил,
    // интернета не было, он решил начать с телефона, и пока заполнял с телефона, появился интернет, и данные сохранились.
    // Тогда тут нужна проверка на время именно сохранения данных, момент заполнения.
    // И тот который позже всегда должен перезаписывать новый. Иначе могу быть казусы, чисто теоретически, и их надо исключить.



    const parseContextNames = (TLctx) => {
        console.log("[ RE-CALLED ] : parseContextNames")
        // console.log(TLctx)
        var ret = [] // Просто выдираем имена из контекста
        for (var uniqueWorker of TLctx.workers) {
            ret.push(uniqueWorker.name)
        }
        return ret
    }
    var wrks = TLctx.workers.length == 0 ? workers : TLctx.workers
    console.log("wrks", wrks)
    console.log("TLctx", TLctx)
    var alreadyInitializedItems = parseContextNames(TLctx)
    let index = 0  // По этому индексу можно не перербирвать массив рабочих, а напрямую записывать по индексу (комечно после проверки на совпадение по имени)
    let workerList = []
    console.log('wrks', wrks)
    for (var newWorker of wrks) {
        // if (newWorker.selectedInObjects.includes(TLctx.current.object)) {
        let worker = workerCanvasManager(newWorker, index, alreadyInitializedItems) // Инициализируем сам элемент с логикой и холстом
        index++
        workerList.push(worker)
        // }
    }

    var namesInContext = parseContextNames(TLctx)
    for (var newWorker of workerList) {
        // if (newWorker.selectedInObjects.includes(TLctx.current.object)) {
            if (!namesInContext.includes(newWorker.name)) { // Если в контексте такого ещё нет, то добавляем его.
                TLctx.workers.push(newWorker)
                // console.log("789s", TLctx.workers)
            } else {
                var idx = TLctx.workers.findIndex((element) => element.name == newWorker.name)
                console.log(idx)
                // Имя уже добавлено, но возможно его параметры другие. Новые параметры находятся в newWorker
                TLctx.workers[idx] = {
                    ...newWorker,
                    LastSmena: TLctx.workers[idx].LastSmena,
                    LastWorkType: TLctx.workers[idx].LastWorkType
                }
                console.log("456s", TLctx.workers)
            }
        // }
        }

    return workerList
}
    const backToObjectList = () => {
        navigate("/TimeLogSelectObjects", {replace: true})
    }
    const navLeft  = ({children}) => {
        console.log("[ RE-CALLED ] : navLeft")
        var btn = <i onClick={backToObjectList} className="header_back fi fi-rr-arrow-small-left"></i>
        return (
            <Fragment>
            {btn}
            </Fragment>
    )}
    const navRight  = ({children}) => { console.log("[ RE-CALLED ] : navRight")
        // var btn = selectMode ? <button onClick={toggleSelectMode} class="header_save change_workers ready">Готово</button> : <button onClick={toggleSelectMode} class="header_save change_workers">Изменить</button>
        var btn = selectMode ? <i onClick={toggleSelectMode} className="fi fi-rs-disk"></i> : null //  <i onClick={toggleSelectMode} className="fi fi-bs-edit"></i>
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
        console.log("[ RE-CALLED ] : render")
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
