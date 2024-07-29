

// Компонент "Насосы"
const CalendarPro = () => {
    const navigate = useNavigate();
    const [menuSelected, setMenuSelected] = useOutletContext();


    const goPage = (page) => {
        setMenuSelected(page)
        navigate(page);
    }
    const TLctx = React.useContext(TimeLogContext) // Берем контекст
    const [btnGridVisible, setBtnGridVisible] = useState(false)
    TLctx.btnGrid = [btnGridVisible, setBtnGridVisible]
    const [currentDate, setCurrentDate] = useState(null)
    TLctx.currentDate = [currentDate, setCurrentDate]
    // const pageTitle = () => {
    //     try {
    //         var title = TLctx.current.worker.fullname
    //     } catch (e) {
    //         var title = "ОШИБКА ЧТЕНИЯ КОНТЕКСТА"
    //     }
    //     return title
    // }

    const state = {
        pageTitle: "Табель сотрудника",
        currentObject: "",
        currentObjectCustoms: {sectors: [], },
        formData: {},
        formLabel: "PumpLog",
        backPage: "/ReportPage",
        nextPage: "/ReportPage",
        const: {Pumps: [], pumpStates: [] }
    }
    const context = null
    const idb = null
    // const onPageLoad = () => {}
    // const onPageRefresh = () => {}
    // const onPageClose = () => {}
    // const onFormEdit = () => {}
    // const onFormSubmit = () => {}
    // const onFormReset = () => {}
    // const onErrEvent = () => {}
    // const onSuccEvent = () => {}
    // const onCautionEvent = () => {}
    const handleQuitTLOG = () => {
        // Предупредить о сбросе данных и перейти назад, если человек согласен
        // let idx = TLctx.current.idx
        // for (let cn of TLctx.current.timenodes) {
        //     for (let sn of TLctx.workers[idx]) {
        //         let match = cn.object_name == sn.object_name && cn.work_shift == sn.work_shift && cn.work_type == sn.work_type && cn.date == sn.date
        //         if (match) {}
        //     }
        // }
        TLctx.current.timenodes = []
        // navigate("/TimeLogSelectWorkers", {replace: false})
        goPage("/TimeLogSelectWorkers")
        console.log(TLctx)
    }
    const navLeft  = (handler) => {
        var btn = <i onClick={handleQuitTLOG} className="fi fi-rr-arrow-small-left"></i>
        return (
        <Fragment>
        {btn}
        </Fragment>
    )}
    const handleSaveTLOG = () => {
        // Сохранить данные и перейти назад.
        // console.log("TLctx.current.timenodes", TLctx.current.timenodes)
        let idx = TLctx.current.idx
        TLctx.workers[idx].last_workshift = TLctx.current.work_shift
        TLctx.workers[idx].last_worktype = TLctx.current.work_type
        // console.log("TLctx.workers", TLctx.workers, "TLctx.current.idx", TLctx.current.idx, TLctx.workers[TLctx.current.idx].timenodes)
        TLctx.workers[TLctx.current.idx].timenodes = structuredClone(TLctx.current.timenodes) // Ну примерно так
        // console.log("TLctx.workers", TLctx.workers, "TLctx.current.idx", TLctx.current.idx, TLctx.workers[TLctx.current.idx].timenodes)
        console.log(TLctx)
        // navigate("/TimeLogSelectWorkers", {replace: true})
        // console.log(Math.floor(Date.now() / 1000))
        var payload = {
            headers: {
                datetime: Math.floor(Date.now() / 1000),
                reqtype: "POSTDB_SAVETNODES",
            },
            "user_id": TLctx.user.ID,
            "objects_selected_ids": TLctx.objects_selected_ids,
            "workers": [ ],
        }
        for (let w of TLctx.workers) {
            payload.workers.push({
                "worker_id": w.worker_id,
                last_workshift: w.last_workshift,
                last_worktype: w.last_workshift,
                selected_in: w.selected_in,
                timenodes: w.timenodes,
             })
        }
        console.log("PAYLOAD", payload)
        saveState(payload)

        goPage("/TimeLogSelectWorkers")

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

    const navRight  = ({children}) => {
        // Нужно сделать апдейт в этом моменте useTLCXT.current + .workers.

        var btn = <i onClick={handleSaveTLOG} className="fi fi-rs-disk"></i>
        return (
        <Fragment>
        {btn}
        </Fragment>
    )}
    const header = (handler) => {
        console.log(TLctx.current, 'TLctx.current')
        var date = TLctx.current.date
        return (
            // <Fragment>
            // {TLctx.btnGrid[0] ? null : <div class="header" id="header_main">
            //     <div className="nav_left"> {TLctx.btnGrid[0] ? null : navLeft(handler)}</div>
            //     <div class="header_title"> {TLctx.btnGrid[0] ? TLctx.current.date : state.pageTitle} </div>
            //     <div className="nav_right"> {TLctx.btnGrid[0] ? null : navRight(handler)}</div>
            // </div>}
            // </Fragment>
            <div class="header" id="header_main">
                <div className="nav_left"> {TLctx.btnGrid[0] ? null : navLeft(handler)}</div>
                <div class="header_title"> {TLctx.btnGrid[0] ? date : state.pageTitle}</div>
                <div className="nav_right"> {TLctx.btnGrid[0] ? null : navRight(handler)}</div>
            </div>

        )
    }
    const renderCanvas = () => {
        return (
            <Fragment>
            <CalendarProCanvas />
            </Fragment>

    )}
    const render = () => {
        return AppCanvas({
            renderCanvas: renderCanvas,
            pageTitle: state.pageTitle,
            navLeft: navLeft,
            navRight: navRight,
            head: header
           })
    }
    return render()
}

const CalendarProCanvas = () => {

    const render = () => {
        return <Calendar />
        // (
        //     <div class="container">

        //         <div class="content" id="content_main">
        //         <Calendar />

                    {/* <div class="menu">
                        <div class="menu_item menu_item_thin" id="presets">
                            <p class="title_s"> Силикатный пр-д</p>
                            <p class="title_s">25.04.2024</p>
                        </div>
                    </div> */}
                    {/* <div class="tasks" id="today_tasks"> */}
                        {/* <div class="tasks_header title_m">
                            <div class="tasks_header_left">
                                <i class="fi fi-rr-receipt"></i>
                                <p>Календарь. Выбор даты.</p>
                            </div>
                            <div class="tasks_header_right title_s">

                                <div id="date_range"></div>
                            </div>
                        </div> */}

                        {/* <div class="tasks_list">
                            <div class="task_item" id="date_applied">
                                <div class="task_item_text">

                                </div>
                            </div>
                        </div> */}

                    {/* </div> */}
                    {/* <div class="menu">
                        <div class="menu_item menu_item_thin" id="presets">
                            <p class="title_s"> Назад </p>
                            <p class="title_s">Далее</p>
                        </div>
                    </div> */}
        //         </div>
        // </div>
        // )
    }

    return render()
}

const Calendar = () => {
    const TLctx = React.useContext(TimeLogContext) // Берем контекст
    const state = {
        // Номер проводки (ключ), Дата внесения, номер записи
        // номер записи (ключ),  Дата отчёта, Ответственный, Объект, Сотрудник, Смена, Вид работ, Часы.
        calendar_data: [{
            "Смешной Андрей Яковлевич":  [{
                date: "28.03.2026",
                work_shift: "День",
                work_type: "Дежурство",
                workHours: 12,
            }, {
                date: "28.03.2026",
                work_shift: "День",
                work_type: "Монтаж",
                workHours: 12,
        }]
    }]
    };

    // Для завершения редактирования
    const handleSubmit = character => {
        // console.log(character)
        // console.log("character", [...this.state.characters, character])
        this.setState({characters: [...this.state.characters, character]});
        }

    // Для обновления данных по клику на выбранную дату
    const handleSubmit_calendar = new_data => {

        this.props.currentWorker
        this.props.calendar_data

        console.log("new_data", new_data)
        // if (!this.state.calendar_data.some(element => element !== undefined)) {
        this.setState({calendar_data: [...this.state.calendar_data, new_data]});
        // }

        // О боже мой я бал js почему так сложно
        if (this.state.calendar_data.length > 0) {
            this.state.calendar_data.forEach((block) => {
            if (block.name === new_data.name) {
            // console.log("block.name", new_data.name)
                this.setState({calendar_data: [...this.state.calendar_data.pop(block), new_data]}); // Что-то не проходит, не совсем понимаю почему
            } else {
            this.setState({calendar_data: [...this.state.calendar_data, new_data]});
            }
            });
        } else {
            this.setState({calendar_data: new_data});
        }
        // this.setState({calendar_data: [...this.state.calendar_data, new_data]});
    }
    const parseContextNames = (TLctx) => {
        var ret = [] // Просто выдираем имена из контекста
        for (var uniqueWorker of TLctx.workers) {
            ret.push(uniqueWorker.fullname)
        }
        return ret
    }
    const render = () => {
        // const TLctx = React.useContext(TimeLogContext) // Берем контекст
        // names = parseContextNames(TLctx)
        // const { calendar_data } = state; // Извлекаем ссылку на calendar_data из реестра.
        // console.log(calendar_data)

        // TLctx.workers.push([...calendar_data]) // Некие данные загружены. Пушим их в контекст.
        // var currentWorker = Object.keys(TLctx[0][0])[0] // Ищем выбранного рабочего (здесь необяхательно, из контекста можно вытащить потом)
        // console.log(currentWorker)

        return (    <Fragment>
                                {/* <div className="container"> */}
                                <ButtonGrid/>
                                <MultidateCalendar
                                    // currentWorker={currentWorker}
                                    // calendarData={calendar_data}
                                    handleSubmit={handleSubmit_calendar}
                                    TLctx = {TLctx}
                                />
                                    {/* <Form
                                    //   characterData={characters}
                                        handleSubmit={this.handleSubmit} /> */}
                                {/* </div> */}
                    </Fragment>
        );
  }
  return render()
}
const MultidateCalendar = (props) => {
    // console.log("123", props)
    var initialState = []
    var state = initialState;
    // var [choosingHours, setChoosingHours] = useState(false)
    // При сохранении, выходе, изменении параметров work_type, work_shift - нужно сохранять current.timenodes в контекст соответствующего рабочего, в т.ч. в базу данных.
    const TLctx = props.TLctx
    console.log(TLctx)
    // TLctx.choosingHours = [choosingHours, setChoosingHours]
    const navigate = useNavigate();
    const [menuSelected, setMenuSelected] = useOutletContext();
    const onSave = event => {
        event.preventDefault();
        props.handleSubmit(state);
        console.log("onSave", state)
        // this.setState(initialState); // Тут не нужно сбрасывать. Наоборот, значения должны сохраняться.
    }


        useEffect(() => { // Устанавливаем пресетные значения
            const onMount = () => {
                // console.log(1, props.TLctx.workers[0][0])
                // const calendarData = props.TLctx.workers[0][0];
                // this.setState(calendarData) // Этап стартовой загрузки данных, предварительно запрошенных из БД
                // console.log(123, props.TLctx)

                multidatepicker(props.TLctx, navigate, setMenuSelected)
            };
            onMount()
        }, []); // https://maxrozen.com/learn-useeffect-dependency-array-react-hooks




    // console.log(props.TLctx)
    const headInfo = filters(TLctx)
    const summaryInfo = infoSection(TLctx)
    const render = () => {
            // const { characterData, removeCharacter } = props;
            return (
                <Fragment>
                {headInfo}
                    {/* <form onSubmit={onSave}>
                        <div>
                            <div id="date_range"></div>
                            <textarea name="multipleDate"></textarea>
                            <button type="submit"  class="calendar_approve">
                                Добавить
                            </button>
                        </div>
                    </form> */}
                <div id="date_range"></div>
                {summaryInfo}
                </Fragment>

        );
    }
    return render();
}

const filters = (TLctx) => {

    const [menuSelected, setMenuSelected] = useOutletContext();
    const goPage = (page) => {
        setMenuSelected(page)
        navigate(page);
    }
    const navigate = useNavigate();
    var onClick = (w) => {
        // event.preventDefault();
        // props.handleSubmit(this.state);
        // console.log("onSave", this.state)
        // this.setState(this.initialState); // Тут не нужно сбрасывать. Наоборот, значения должны сохраняться.
        console.log("Показать боттом-меню выбора ", w)
        console.log("При выборе из списка - обновить значение в контексте для хранения данных формы, обновить отображаемое значение ", w)
        console.log("Для этого нужно использовать useContext с готовым useState внутри")
    }
    // const TLctx = React.useContext(TimeLogContext) // Берем контекст
    // var objectOnclick =  () => navigate("/TimeLogSelectObjects", {replace: true})
    // var nameOnclick = () => navigate("/TimeLogSelectWorkers", {replace: true})
    // var name = <div class='calendFilter' id='calendar_workername' onClick={nameOnclick}> <div class='workername'>Сотрудник:</div><div>{TLctx.current.worker.fullname}</div> </div>
    // var object = <div class='calendFilter' id='calendar_object' onClick={objectOnclick}><div class='obj'>Объект:</div><div>{TLctx.current.object}</div></div>
    var name = <div class='calendFilter' id='calendar_workername'> <div class='workername'>Сотрудник:</div><div>{TLctx.current.worker.fullname}</div> </div>
    var object = <div class='calendFilter' id='calendar_object'><div class='obj'>Объект:</div><div>{TLctx.current.object_name}</div></div>

    // Далее, очевидно - сделать связь между выбираемой сменой и обновлением холста календаря.
    // var work_shiftOptions = ["День", "Ночные смены"]
    // var work_typeOptions = ["Дежурство", "Монтаж", "Сварка", "Бурение"]


    // Здесь нужно привязать, последний стык.
    // {item} должен быть из контекста, а не из массива
    // {TLctx.current.work_shift}
    // const filterBlock = (items, category) => {
    //     return items.map((item) => ( // Отрисовать результаты поиска по всему файлу.
    //         // console.log(TLctx.current[item])
    //         // console.log("filteritem", item)
    //         // Тут получается расхождение - с одной стороны реактивное поведение setState, с другой - проактивное select onChange
    //         // Либо мы меняем тег option selected при select onChange, и внутри меняем  TLctx.current.filter,
    //         // который тогда в свою очередь должен использоваться при проверках того, какие данные календаря рендерить.
    //         // Т.е. вопрос там, где сам state из useState соединяется с select option. Но нам необязательно рендерить сам стейт, так ведь?
    //         item == TLctx.current[category] ? <option key={item}  value={item} selected>{item}</option> : <option key={item} value={item}>{item}</option>
    //         // {/* <option key={item} value={item}>{item}</option> */}

    //     ))
    // }

    const handleFilterClick = (target) => {
        // console.log(e.target.id)
        // console.log(e.target.value)
        // const value = e.target.value
        if (target == "calendar_work_shift" ) {
            // navigate("/WorkerTableFilter_work_shift", {replace: true})
            goPage("/WorkerTableFilter_work_shift")
        } else if (target == "calendar_work_type" ) {
            // navigate("/WorkerTableFilter_work_type", {replace: true})
            goPage("/WorkerTableFilter_work_type")
        }
    }

    // var work_shiftChoose =  <select onChange={e => handleFilterClick(e)} class="calendFilter input_measure spendables_units" id='calendar_work_shift'>
    //                         {filterBlock(work_shiftOptions, 'work_shift')}
    //                     </select>

    // var wtypeChoose =  <select onChange={e => handleFilterClick(e)} class="calendFilter input_measure spendables_units" id='calendar_work_type'>
    //                         {filterBlock(work_typeOptions, 'work_type')}
    //                     </select>

    // var work_shift = <div class='calendFilter' id='calendar_work_shift' onClick={onClick}><i class='task_item_arr calendar_menu_arr fi fi-br-angle-small-right'></i><div>{TLctx.current.work_shift}</div></div> // <div class='band'>Бригадир: {TLctx.current.worker.band}</div>
    // var wtype = <div class='calendFilter' id='calendar_work_type' onClick={onClick}><i class='task_item_arr calendar_menu_arr fi fi-br-angle-small-right'></i><div>{TLctx.current.work_type}</div></div>

    var work_shiftChoose =  <div class='calendFilter' id='calendar_work_shift' onClick={() => handleFilterClick('calendar_work_shift')}><i class='task_item_arr calendar_menu_arr fi fi-sr-caret-right'></i><div>{TLctx.maps.work_shifts[TLctx.current.work_shift]}</div></div> // <div class='band'>Бригадир: {TLctx.current.worker.band}</div>
    var wtypeChoose =  <div class='calendFilter' id='calendar_work_type' onClick={() => handleFilterClick('calendar_work_type')}><i class='task_item_arr calendar_menu_arr fi fi-sr-caret-right'></i><div>{TLctx.maps.work_types[TLctx.current.work_type]}</div></div>

    return (
        <div class='calendFilters'>{object}{name}<div class='calendarFilterSection'>{work_shiftChoose}{wtypeChoose}</div></div>
    )
}
const infoSection = (TLctx) => {
    // 1. Нужно посчитать суммы по каждым категориям, типу работ и сменам.
    // 2. Нужно чтобы такой переподсчет проводился при старте окна и отдельно, при закрытии btn-grid. И через setState обновлялись бы значения.
    var days = 0, hours = 0, wt = []
    let sumVals = []

    // const applyData = (item, node) => {
    //     item.work_type = node.work_type
    //     item.work_shift = node.work_shift
    //     item.hours += Number(node.hours)
    //     item.days++
    // }
    let newVals = []
    TLctx.current.worker.timenodes.forEach(node => {
        // let i = {work_type: '', work_shift: "", days: 0, hours: 0}

        if (node.hours != null && sumVals.length != 0) {

            for (let item of sumVals) {
                let mainfound = false
                if (node.work_type == item.work_type) {
                    let found = false
                    console.log('item', item)
                    for (let d of item.data) {
                        if (node.work_shift == d.work_shift) {
                            console.log('item', item)
                            d.hours += Number(node.hours)
                            d.days++
                            found = true
                            mainfound = true
                        }
                    }
                    if (!found) {
                        let dd = {work_shift: node.work_shift, hours: Number(node.hours), days: 1}
                        item.data.push(dd)
                        mainfound = true
                    }

                }
                if (!mainfound) {
                    let data = {work_type: node.work_type, data: [{work_shift: node.work_shift, hours: Number(node.hours), days: 1}]}
                    newVals.push(data)
                }
            }
        } else if (node.hours != null && sumVals.length == 0) {
            let data = {work_type: node.work_type, data: [{work_shift: node.work_shift, hours: Number(node.hours), days: 1}]}
            sumVals.push(data)
        }




        // if (node.hours != null && node.work_shift == TLctx.current.work_shift && node.work_type == TLctx.current.work_type) {
        //     hours += Number(node.hours)
        //     days++

        // }
        // if (node.hours != null && !wt.includes(node.work_type + ": " + node.work_shift)) {
        //     wt.push(node.work_type + ": " + node.work_shift )
        // }

    }) // Подсчёт кол-ва часов и дней с учётом фильтров
    sumVals.push(...newVals)
    console.log('sumVals', sumVals)
    // data = []

    // Бурение:
    // День:
    // Ночные смены:
    let i = {work_type: '', data: [{work_shift: "", days: 0, hours: 0}, {work_shift: "", days: 0, hours: 0}]}
    let tableRow = (item, ) => {
        let mapData = (i) => {
            return <div class="summary_work_shift">
                <div class='summary_value work_shift'>{i.work_shift}</div>
                <div class='summary_value work_shift_count'>{i.days}</div>
                <div class='summary_value hours_count'>{i.hours}</div>
            </div>
        }
        let vals =  <div class="summary_values">
                        {item.data.map((i) => mapData(i))}
                    </div>
        return <div class="summary">
            <div class='summary_category'>{item.work_type}</div>
            {vals}
        </div>
    }
    var objInfo = <div class='workerselectObject' id='workerselect_writernames' onclick='onClick()'><div class='writernames'>Заполнявшие в этом месяце: <br/><span>Захарченко И.С.</span></div><div></div></div>
    // Если нет ночных, то дневные растягиваем, вместо 3 секций - 2.
    let header = [{work_type: 'Категория', data: [{work_shift: "Смена", days: "Смен", hours: "Часов"}]}]
    let summaryItem = <Fragment>
                        {header.map( (item) => tableRow(item) )}
                        {sumVals.map( (item) => tableRow(item) )}
                    </Fragment>

    // let timeSum = <div class='calendFilter label_s' id="calendar_summary">В этом месяце: <br/> Всего: {hours}ч. / {days}дн.</div>
    // let workSum = wt.map( w => <div class='calendFilter label_s' id="calendar_summary">{w}</div>)
    // var [summary, setSummary] = useState(null)
    return (
        <Fragment>
            <div class='calendFilters'><div class='calendarFilterSection'>{summaryItem}</div></div>
            {objInfo}
        </Fragment>

    )
}
