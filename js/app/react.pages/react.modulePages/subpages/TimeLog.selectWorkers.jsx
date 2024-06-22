var workers = [
    {name: "Авплетий Ничан Пастырович", band: "Рябов", isFav: false, isSelected: true,
        timenodes: [
            {date: "06.06.2024", hours: 12, smena:"Ночные смены", workType:"Бурение"},
            {date: "06.06.2024", hours: 12, smena:"Дневные смены", workType:"Бурение"},
            {date: "07.06.2024", hours: null, smena:"Дневные смены", workType:"Замывка"},
            {date: "08.06.2024", hours: 8, smena:"Дневные смены", workType:"Дежурство"}
    ],},
    {name: "Ахмедов Ахмед Ахмедович", band: "Дьячков", isFav: true, isSelected: false, timenodes: [],},
    {name: "Джованни Джорджо Яковлевич", band: "Дьячков", isFav: false, isSelected: false, timenodes: [],},
    {name: "Захаров Дмитрий Алексеевич", band: "Геоспецстрой", isFav: true, isSelected: true, timenodes: [],},
    {name: "Мухатгалиев Якубджон Джамшут-оглы", band: "Дьячков", isFav: false, isSelected: true, timenodes: [],},
    {name: "Нагорный Ламинат Горыныч", band: "Данченко", isFav: false, isSelected: false, timenodes: [],},
    {name: "Сальчичон Балык Хамонович", band: "Дьячков", isFav: false, isSelected: false, timenodes: [],},
    {name: "Смешной Егор Егорович", band: "Ражабов", isFav: true, isSelected: true, timenodes: [],},
    {name: "Якубенко Владислав Игоревич", band: "Илькевич", isFav: true, isSelected: false, timenodes: [],},
]


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
    const useTimeLogContext = React.useContext(TimeLogContext) // Берем контекст

    // Должно быть:
    // 1. Заходим и видим список фамилий. При нажатии на любую - попадаем уже в индивидуальный отчёт.
    // 2. Есть кнопка "изменить":
        // - Окошко поиска для фильтрации по ФИО / Бригаде
        // - Кнопка "готово" для сохранения и кнопка "<-" для сброса
        // - Тогглы как в айфоне "отобразить только выбранных", "отобразить избранные"
            // -При удалении выбранного он остается в списке без галочки, и только при следующем нажатии на тоггл он исчезает. (чтобы не мискликали)
            // Либо придумать другое поведение.

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

    // const [btnGridVisible, setBtnGridVisible] = useState(true)
    // console.log(setBtnGridVisible)
    // useTimeLogContext.btnGrid = [btnGridVisible, setBtnGridVisible]



    // https://codepen.io/Spruce_khalifa/pen/GRrWjmR

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParam] = useState(["name", "band"]);
    const [filterParam, setFilterParam] = useState(["Выбранные"]); // "Все", "Избранное". "Выбранные"
    const navigate = useNavigate();
    const toggleSelectMode = () => {
        setSelectMode(!selectMode)
        setFilterParam("Выбранные")
    }
    function search(items) {
        console.log("[ RE-CALLED ] : search", items)
        // console.log(items)
        return items.filter((item) => { // Отобразятся только элементы, по которым прошло true по условиям.
            // Если значение элемента совпадает с указанным в фильтре (напр. избранное или выбранные)
            console.log("item", item)
            if (filterParam == "Все") {
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
const object = {name: "Амурская", type: "СВП"}
// const [smena, setSmena] = useState()
// const [workType, setWorkType] = useState(object.type == "123" ? "Дежурство" : "Бурение")

// const [currentObject, setCurrentObject] = useState("Силикатный пр-д");
// useTimeLogContext.current.object = currentObject;
const oneWorkerMainCanvas = (idx, newWorker) => {
    console.log("[ RE-CALLED ] : oneWorkerMainCanvas")
    const editWorker = (idx) => {

        // При перезагрузке страницы календаря - контекст сбрасывается, всё теряется.
        // Т.е. нужно брать все данные из базы данных вообще? Тогда реактивность будет пропадать.
        // Можно перенаправлять на главную страницу при перезагрузке,
        // мб проверять снэпшот контекста, сохраненный в базе, с актуальным, и если есть разница, то показывать сообщение типа "страница обновлена, несохраненные данные сброшены"
        // На крайний случай завести переменную типа "enteredEditMode" в базе данных, чтобы при загрузке любой страницы понимать,
        // что состояние прервалось в момент корректировки и запускать соответствующее сообщение.
        // (при переходе в контекст редактирования ставить true, при выходе/сохранении false,
        // и затем на переходе на новую страницу ставить проверку, что должно быть всегда false, иначе понимаем что прервался режим редактирования,
        // и уже потом в зависимости от контекста страницы ставим true или false для последующих проверок)

        // Здесь добавляем в current только те timenodes, которые соответствуют фильтрам.
        // При смене фильтра - будут меняться все current значения, в т.ч. timenodes.
        // var lastEditedSmena = newWorker // newWorker.timenodes[idx].smena
        // var lastEditedWorkType = newWorker
        console.log(newWorker)
        let newWorker = useTimeLogContext.workers[idx]
        useTimeLogContext.current.idx = idx;
        useTimeLogContext.current.worker = newWorker;
        // useTimeLogContext.current.smena = smena;
        // useTimeLogContext.current.workType = workType;
        // useTimeLogContext.current.smena = newWorker.LastSmena // newWorker.useLastSmena[0];
        // useTimeLogContext.current.smena = newWorker.useLastSmena[0];
        // useTimeLogContext.current.setSmena = newWorker.useLastSmena[1];
        // useTimeLogContext.current.workType = newWorker.LastWorkType // newWorker.useLastWorkType[0];
        // useTimeLogContext.current.workType = newWorker.useLastWorkType[0];
        // useTimeLogContext.current.setWorkType = newWorker.useLastWorkType[1];
        console.log("useTimeLogContext.current.smena", useTimeLogContext.current.smena)
        useTimeLogContext.current.smena = useTimeLogContext.current.smena ? useTimeLogContext.current.smena : newWorker.LastSmena
        useTimeLogContext.current.workType = useTimeLogContext.current.workType ? useTimeLogContext.current.workType : newWorker.LastWorkType
        useTimeLogContext.workers[idx].LastSmena = useTimeLogContext.current.smena ? useTimeLogContext.current.smena : useTimeLogContext.workers[idx].LastSmena
        useTimeLogContext.workers[idx].LastWorkType = useTimeLogContext.current.LastWorkType ? useTimeLogContext.current.LastWorkType : useTimeLogContext.workers[idx].LastWorkType
        let timenodes = []
        useTimeLogContext.workers[idx].timenodes.forEach(node => {
            console.log(node)
            if (
                node.workType == useTimeLogContext.current.workType &&
                node.smena == useTimeLogContext.current.smena) {
                    timenodes.push(node)
                }
        });
        // useTimeLogContext.current.timenodes = useTimeLogContext.workers[idx].timenodes;
        useTimeLogContext.current.timenodes = timenodes;
        // CTX - SERVER FILLS DATA

        console.log("ok", newWorker)
        console.log("worker",newWorker);
        console.log("contetx", useTimeLogContext.workers);
        console.log("worker index", useTimeLogContext.workers.indexOf(newWorker));
        navigate("/CalendarPro", {replace: true})
    }; // Тоггл галочки


    // console.log(newWorker)

    // console.log("ok", newWorker)

    // Тут нам нужен явно привязанный кк элементу worker.
    return (
        <div class="task_item" onClick={() => editWorker(idx)}>
                            <div class="task_item_text">
                                <p class="task_item_header nomargin title_m">{newWorker.name}</p>
                                <p class="task_item_info label_s">{newWorker.band}</p>
                            </div>
                            <i className="task_item_arr fi fi-br-angle-small-right "></i>
                    </div>
        );
}


const oneWorkerSelectableCanvas = (idx, newWorker, nameSelected, setNameSelected) => {
    console.log("[ RE-CALLED ] : oneWorkerSelectableCanvas")
    const toggleWorkerisSelected = () => {
        setNameSelected( !nameSelected );
    }; // Тоггл галочки выбора
    let iconClass = "task_item_arr fi fi-br-check"
    let itemClass = "task_item"
    let itemWokerBandClass = "task_item_info label_s"
    let itemWokerNameClass = "task_item_header nomargin title_m"
    return (
        <div className={nameSelected == false ? itemClass : itemClass + " selected"} onClick={toggleWorkerisSelected}>
                            <div class="task_item_text">
                                <p className={nameSelected == false ? itemWokerNameClass : itemWokerNameClass + " selected"}>{newWorker.name}</p>
                                <p className={nameSelected == false ? itemWokerBandClass : itemWokerBandClass + " selected"}>{newWorker.band}</p>

                            </div>
                            <i className={nameSelected == false ? iconClass : iconClass + " selected"}></i>
                    </div>
      );
}
const parseContextNames = (useTimeLogContext) => {
    console.log("[ RE-CALLED ] : parseContextNames")
    var ret = [] // Просто выдираем имена из контекста
    for (var uniqueWorker of useTimeLogContext.workers) {
        ret.push(uniqueWorker.name)
    }
    return ret
}
const workerCanvasManager = (newWorker, idx, nameSelected, setNameSelected) => {
    console.log("[ RE-CALLED ] : workerCanvasManager")
    // useTimeLogContext - нужно здесь обновить TimeLogContext на предмет выбранной ячейки,
    //  чтобы считывать для отображения в календаре и записывать туда корректируемые данные
    // Для этого нужна нормальная структура данных

    const useCells = (potentialCell, defaultValue) => {
        var [selected, setSelected] = useState(defaultValue)
        var [selected2, setSelected2] = potentialCell ? potentialCell : [null, null]
        selected = potentialCell ? selected2 : selected
        setSelected = potentialCell ? setSelected2 : setSelected // Создаем индивидуальное хранилище для отслеживания клика (для иконки). Приходится выкручиваться из-за правил использования хуков.
        return [selected, setSelected]
    }
    console.log(newWorker)
    // var [selected, setSelected] = useState(newWorker.isSelected)
    // var [selected2, setSelected2] = newWorker.useNameSelected ? newWorker.useNameSelected : [null, null]
    // selected = newWorker.useNameSelected ? selected2 : selected
    // setSelected = newWorker.useNameSelected ? setSelected2 : setSelected // Создаем индивидуальное хранилище для отслеживания клика (для иконки). Приходится выкручиваться из-за правил использования хуков.
    var defaultSmena = "Дневные смены"
    var defaultWorkType = "Бурение"
    var [selected, setSelected] = useCells(newWorker.useNameSelected, newWorker.isSelected)
    let newWorkerData = {
        ...newWorker,
        index: idx, // По этому индексу можно не перербирвать массив рабочих, а напрямую записывать по индексу (комечно после проверки на совпадение по имени)
        useNameSelected: [selected, setSelected],
        // useLastSmena: [smena, setSmena],
        // useLastWorkType: [workType, setWorkType],
        LastSmena: defaultSmena,
        LastWorkType: defaultWorkType,
    }

    var canvas = selectMode ? oneWorkerSelectableCanvas(idx, newWorker, selected, setSelected) : oneWorkerMainCanvas(idx, newWorker, nameSelected, setNameSelected)
    // Создаем контент для хранилища. Один элемент, который может отрисовываться в разных вкладках несколько раз.
    newWorkerData = {
        ...newWorkerData,
        canvas: canvas,
    }

    // Проверяем, есть ли полученное с сервера или базы имя в оперативном контексте.
    // .sort() лучше вообще сделать так, чтобы изначально с сервера приходил отсортированный по именам.
    // var namesInContext = parseContextNames(useTimeLogContext)
    // console.log(useTimeLogContext)
    // if (!namesInContext.includes(newWorker.name)) { // Если в контексте такого ещё нет, то добавляем его.
    //     useTimeLogContext.workers.push(newWorkerData)
    //     console.log("789s", useTimeLogContext.workers)
    // } else {
    //     var idx = useTimeLogContext.workers.findIndex((element) => element.name == newWorkerData.name)
    //     // Имя уже добавлено, но возможно его параметры другие. Новые параметры находятся в newWorker
    //     useTimeLogContext.workers[idx] = newWorkerData
    //     console.log("456s", useTimeLogContext.workers)
    // }
    // Добавляем newWorkerData но происходит запоздание?
    return newWorkerData
}






const renderContent = () => {
    console.log("[ RE-CALLED ] : renderContent")
    const renderMainMode = (ctx) => {
        console.log("[ RE-CALLED ] : renderMainMode")
        return ctx.filter( (item) => {
            console.log("item", item)
            if (item.useNameSelected[0]) { return true }
        })
    }

    // Подготовка данных
    var workerList = prepareWorkers()
    var namesInContext = parseContextNames(useTimeLogContext)

    for (var newWorker of workerList) {
        if (!namesInContext.includes(newWorker.name)) { // Если в контексте такого ещё нет, то добавляем его.
            useTimeLogContext.workers.push(newWorker)
            console.log("789s", useTimeLogContext.workers)
        } else {
            var idx = useTimeLogContext.workers.findIndex((element) => element.name == newWorker.name)
            // Имя уже добавлено, но возможно его параметры другие. Новые параметры находятся в newWorker
            useTimeLogContext.workers[idx] = newWorker
            console.log("456s", useTimeLogContext.workers)
        }
    }
    console.log("workerList", workerList)
    console.log("useTimeLogContext.workers", useTimeLogContext.workers)
    // var workers = useTimeLogContext.workers
    // На этом этапе useTimeLogContext.workers не содержит useNameSelected и прочих. Хотя они были добавлены ранее.
    // Возможно, стоит сначала составлять обычный массив, а потом передавать его в useTimeLogContext
    const nameList_selectmode = <div className="tab__content" id="tab__favourite_workers">
                                    {search(useTimeLogContext.workers).map((item) => ( // Отрисовать результаты поиска по всему файлу.
                                        item.canvas
                                    ))}
                                </div>
    const nameList_mainmode = <div className="tab__content" id="tab__chosen_workers">
                                    {renderMainMode(useTimeLogContext.workers).map((item, mapindex) => ( // Отрисовать результаты поиска по всему файлу.
                                        item.canvas
                                        // Если бы тут была функция, возвращающая канвас, а не сам канвас, то можно бы было прокинуть порядковый номер.
                                    ))}
                                </div>
    const sbar = React.useMemo(() => searchBar(searchQuery, setSearchQuery));
    var object = <div class='workerselectObject' id='workerselect_object' onclick='onClick()'><div class='obj'>Объект:</div><div>{useTimeLogContext.current.object}</div></div>
    var objInfo = <div class='workerselectObject' id='workerselect_writernames' onclick='onClick()'><div class='writernames'>Заполнявшие в этом месяце: <br/><span>Захарченко И.С.</span></div><div></div></div>
    const selectmodeCanvas = <Fragment>
                                {object}
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
                            {object} {objInfo}
                            <input type="radio" id="tab0" name="tabGroup4" class="tab" checked/>
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



    const parseContextNames = (useTimeLogContext) => {
        console.log("[ RE-CALLED ] : parseContextNames")
        // console.log(useTimeLogContext)
        var ret = [] // Просто выдираем имена из контекста
        for (var uniqueWorker of useTimeLogContext.workers) {
            ret.push(uniqueWorker.name)
        }
        return ret
    }
    var wrks = useTimeLogContext.workers.length == 0 ? workers : useTimeLogContext.workers
    var alreadyInitializedItems = parseContextNames(useTimeLogContext)
    let index = 0  // По этому индексу можно не перербирвать массив рабочих, а напрямую записывать по индексу (комечно после проверки на совпадение по имени)
    let ret = []
    for (var newWorker of wrks) {
        let worker = workerCanvasManager(newWorker, index, alreadyInitializedItems) // Инициализируем сам элемент с логикой и холстом
        index++
        ret.push(worker)
    }
    console.log(ret)
    return ret
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
