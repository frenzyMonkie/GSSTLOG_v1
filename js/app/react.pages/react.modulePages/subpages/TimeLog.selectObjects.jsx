
// const TimeLogContext = React.createContext({
//     workers: [],
//     current: {
//         idx: null,
//         worker: null,
//         workType: null,
//         smena: null,
//         timenodes: [], // При сохранении записываем в workers. Чтобы не лезть не удалять при сбросе.
//     }})
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
const TimeLogSelectObjects  = () => {
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
        pageTitle: "Доступные объекты",
        currentObject: "",
        currentObjectCustoms: {},
        formData: {},
        formLabel: "TimeLogObjectList",
        backPage: "/TimeLog",
        nextPage: "/TimeLogSelectWorkers",
        const: {Spendables: [], MeasureUnits: [] },
    }

    const [selectMode, setSelectMode] = useState(false)
    var firstLoad = true
    // const [btnGridVisible, setBtnGridVisible] = useState(true)
    // console.log(setBtnGridVisible)
    // useTimeLogContext.btnGrid = [btnGridVisible, setBtnGridVisible]
    var workers = [
        {name: "Авплетий Ничан Пастырович", band: "Рябов", isFav: false, isSelected: true,
            timenodes: [
                {date: "06.06.2024", hours: 12, smena:"Ночные смены", workType:"Проходка"},
                {date: "06.06.2024", hours: 12, smena:"Дневные смены", workType:"Проходка"},
                {date: "07.06.2024", hours: null, smena:"Дневные смены", workType:"Проходка"},
                {date: "08.06.2024", hours: 8, smena:"Дневные смены", workType:"Проходка"}
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
    ]


    // https://codepen.io/Spruce_khalifa/pen/GRrWjmR

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
                    console.log(newItem)
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
const [smena, setSmena] = useState("Дневные смены")
const [objType, setObjType] = useState(object.type == "123" ? "Проходка" : "Водопонижение")
const [currentObject, setCurrentObject] = useState(objects[0].name);
useTimeLogContext.current.object = currentObject;





//////////////////




const oneWorkerMainCanvas = (idx, newObject) => {
    console.log("[ RE-CALLED ] : oneWorkerMainCanvas")
    const editWorker = () => {

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

        useTimeLogContext.current.idx = idx;
        useTimeLogContext.current.object = newObject.name;
        // useTimeLogContext.current.smena = smena;
        useTimeLogContext.current.type = objType;
        // let timenodes = []
        // useTimeLogContext.objects[idx].timenodes.forEach(node => {
        //     console.log('[editWorker]', node)
        //     if (
        //         node.type == useTimeLogContext.current.type) {
        //             timenodes.push(node)
        //         }
        // });
        // useTimeLogContext.current.timenodes = useTimeLogContext.objects[idx].timenodes;
        // useTimeLogContext.current.timenodes = timenodes;
        // CTX - SERVER FILLS DATA

        console.log("object",newObject);
        console.log("contetx", useTimeLogContext.objects);
        console.log("object index", useTimeLogContext.objects.indexOf(newObject));
        navigate("/TimeLogSelectWorkers", {replace: true})
    }; // Тоггл галочки




    console.log("ok", newObject)

    return (
        <div class="task_item" onClick={editWorker}>
                            <div class="task_item_text">
                                <p class="task_item_header nomargin title_m">{newObject.name}</p>
                                <p class="task_item_info label_s">{newObject.type}</p>
                            </div>
                            <i className="task_item_arr fi fi-br-angle-small-right "></i>
                    </div>
        );
}


const oneWorkerSelectableCanvas = (idx, newObject, nameSelected, setNameSelected) => {
    console.log("[ RE-CALLED ] : oneWorkerSelectableCanvas")
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
const parseContextNames = (useTimeLogContext) => {
    console.log("[ RE-CALLED ] : parseContextNames")
    console.log(useTimeLogContext)
    var ret = [] // Просто выдираем имена из контекста
    for (var uniqueObject of useTimeLogContext.objects) {
        ret.push(uniqueObject.name)
    }
    return ret
}
const workerCanvasManager = (idx, newObject, nameSelected, setNameSelected) => {
    console.log("[ RE-CALLED ] : workerCanvasManager")
    // useTimeLogContext - нужно здесь обновить TimeLogContext на предмет выбранной ячейки,
    //  чтобы считывать для отображения в календаре и записывать туда корректируемые данные
    // Для этого нужна нормальная структура данных

    var canvas = selectMode ? oneWorkerSelectableCanvas(idx, newObject, nameSelected, setNameSelected) : oneWorkerMainCanvas(idx, newObject, nameSelected, setNameSelected)
    // Создаем контент для хранилища. Один элемент, который может отрисовываться в разных вкладках несколько раз.
    let newObjectData = {
        index: idx, // По этому индексу можно не перербирвать массив рабочих, а напрямую записывать по индексу (комечно после проверки на совпадение по имени)
        canvas: canvas,
        useNameSelected: [nameSelected, setNameSelected],
        ...newObject
    }
    // Проверяем, есть ли полученное с сервера или базы имя в оперативном контексте.
    // .sort() лучше вообще сделать так, чтобы изначально с сервера приходил отсортированный по именам.
    var namesInContext = parseContextNames(useTimeLogContext)
    console.log(useTimeLogContext)
    if (!namesInContext.includes(newObject.name)) { // Если в контексте такого ещё нет, то добавляем его.
        useTimeLogContext.objects.push(newObjectData)
    } else {
        var idx = useTimeLogContext.objects.findIndex((element) => element.name == newObjectData.name)
        // Имя уже добавлено, но возможно его параметры другие. Новые параметры находятся в newObject
        useTimeLogContext.objects[idx] = newObjectData
    }

    return canvas
}






const renderContent = () => {
    console.log("[ RE-CALLED ] : renderContent")
    const renderMainMode = (ctx) => {
        console.log("[ RE-CALLED ] : renderMainMode")
        return ctx.filter( (item) => {
            if (item.useNameSelected[0]) { return true }
        })
    }

    // Подготовка данных
    prepareWorkers()

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
    if (firstLoad) {
        firstLoad = false
        let idx = 0  // По этому индексу можно не перербирвать массив рабочих, а напрямую записывать по индексу (комечно после проверки на совпадение по имени)
        for (var newObject of objects) { // Формируем список фамилий
            console.log("created new object", newObject)
            const [selected, setSelected] = useState(false) // Создаем индивидуальное хранилище для отслеживания клика (для иконки)
            workerCanvasManager(idx, newObject, selected, setSelected) // Инициализируем сам элемент с логикой и холстом
            if (newObject.isSelected) {
                useEffect(() => { // Устанавливаем пресетные значения
                    const addSelected = async () => {
                        setSelected(true)
                    };
                    addSelected()
                }, []); // https://maxrozen.com/learn-useeffect-dependency-array-react-hooks
            }
            idx++
        }
    } else {
        // console.log(firstLoad)
        for (var newObject of useTimeLogContext.objects) {
            if (newObject.useNameSelected[0]) { // if (newObject.isSelected)
                useEffect(() => { // Устанавливаем пресетные значения
                    const addSelected = async () => {newObject.useNameSelected[1](true)};
                    addSelected()
                    }, []); // https://maxrozen.com/learn-useeffect-dependency-array-react-hooks

                workerCanvasManager(idx, newObject, newObject.useNameSelected[0], newObject.useNameSelected[1]) // Инициализируем сам элемент с логикой и холстом
            }
        }
    }
}
    const navLeft  = ({children}) => {console.log("[ RE-CALLED ] : navLeft")
        return (
            <Fragment>
            <i class="header_back fi fi-rr-arrow-small-left"></i>
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
