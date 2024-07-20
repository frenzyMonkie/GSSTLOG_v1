

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
    //         var title = TLctx.current.worker.name
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
        //         let match = cn.object == sn.object && cn.smena == sn.smena && cn.workType == sn.workType && cn.date == sn.date
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
        TLctx.workers[idx].LastSmena = TLctx.current.smena
        TLctx.workers[idx].LastWorkType = TLctx.current.workType
        // console.log("TLctx.workers", TLctx.workers, "TLctx.current.idx", TLctx.current.idx, TLctx.workers[TLctx.current.idx].timenodes)
        TLctx.workers[TLctx.current.idx].timenodes = structuredClone(TLctx.current.timenodes) // Ну примерно так
        // console.log("TLctx.workers", TLctx.workers, "TLctx.current.idx", TLctx.current.idx, TLctx.workers[TLctx.current.idx].timenodes)

        // navigate("/TimeLogSelectWorkers", {replace: true})
        goPage("/TimeLogSelectWorkers")

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
                smena: "День",
                workType: "Дежурство",
                workHours: 12,
            }, {
                date: "28.03.2026",
                smena: "День",
                workType: "Монтаж",
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
            ret.push(uniqueWorker.name)
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
    // При сохранении, выходе, изменении параметров workType, smena - нужно сохранять current.timenodes в контекст соответствующего рабочего, в т.ч. в базу данных.
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
    // let idx = TLctx.current.idx
    // var [smena, setSmena] = useState(TLctx.workers[idx].LastSmena)
    // var [workType, setWorkType] = useState(TLctx.workers[idx].LastWorkType)
    // TLctx.current.setSsmena = setSmena
    // TLctx.current.setWorkType = setWorkType
    // TLctx.current.smena = TLctx.current.smena ?  TLctx.current.smena : TLctx.workers[idx].LastSmena
    // TLctx.current.workType = TLctx.current.workType? TLctx.current.workType : TLctx.workers[idx].LastWorkType
    // TLctx.workers[idx].LastSmena = TLctx.current.smena ? TLctx.current.smena : TLctx.workers[idx].LastSmena
    // TLctx.workers[idx].LastWorkType = TLctx.current.LastWorkType ? TLctx.current.LastWorkType : TLctx.workers[idx].LastWorkType
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
    // var name = <div class='calendFilter' id='calendar_workername' onClick={nameOnclick}> <div class='workername'>Сотрудник:</div><div>{TLctx.current.worker.name}</div> </div>
    // var object = <div class='calendFilter' id='calendar_object' onClick={objectOnclick}><div class='obj'>Объект:</div><div>{TLctx.current.object}</div></div>
    var name = <div class='calendFilter' id='calendar_workername'> <div class='workername'>Сотрудник:</div><div>{TLctx.current.worker.name}</div> </div>
    var object = <div class='calendFilter' id='calendar_object'><div class='obj'>Объект:</div><div>{TLctx.current.object}</div></div>

    // Далее, очевидно - сделать связь между выбираемой сменой и обновлением холста календаря.
    // var smenaOptions = ["Дневные смены", "Ночные смены"]
    // var workTypeOptions = ["Дежурство", "Монтаж", "Сварка", "Бурение"]


    // Здесь нужно привязать, последний стык.
    // {item} должен быть из контекста, а не из массива
    // {TLctx.current.smena}
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
        if (target == "calendar_smena" ) {
            // navigate("/WorkerTableFilter_Smena", {replace: true})
            goPage("/WorkerTableFilter_Smena")
        } else if (target == "calendar_worktype" ) {
            // navigate("/WorkerTableFilter_WorkType", {replace: true})
            goPage("/WorkerTableFilter_WorkType")
        }
    }

    // var smenaChoose =  <select onChange={e => handleFilterClick(e)} class="calendFilter input_measure spendables_units" id='calendar_smena'>
    //                         {filterBlock(smenaOptions, 'smena')}
    //                     </select>

    // var wtypeChoose =  <select onChange={e => handleFilterClick(e)} class="calendFilter input_measure spendables_units" id='calendar_worktype'>
    //                         {filterBlock(workTypeOptions, 'workType')}
    //                     </select>

    // var smena = <div class='calendFilter' id='calendar_smena' onClick={onClick}><i class='task_item_arr calendar_menu_arr fi fi-br-angle-small-right'></i><div>{TLctx.current.smena}</div></div> // <div class='band'>Бригадир: {TLctx.current.worker.band}</div>
    // var wtype = <div class='calendFilter' id='calendar_worktype' onClick={onClick}><i class='task_item_arr calendar_menu_arr fi fi-br-angle-small-right'></i><div>{TLctx.current.workType}</div></div>

    var smenaChoose =  <div class='calendFilter' id='calendar_smena' onClick={() => handleFilterClick('calendar_smena')}><i class='task_item_arr calendar_menu_arr fi fi-sr-caret-right'></i><div>{TLctx.current.smena}</div></div> // <div class='band'>Бригадир: {TLctx.current.worker.band}</div>
    var wtypeChoose =  <div class='calendFilter' id='calendar_worktype' onClick={() => handleFilterClick('calendar_worktype')}><i class='task_item_arr calendar_menu_arr fi fi-sr-caret-right'></i><div>{TLctx.current.workType}</div></div>

    return (
        <div class='calendFilters'>{object}{name}<div class='calendarFilterSection'>{smenaChoose}{wtypeChoose}</div></div>
    )
}
const infoSection = (TLctx) => {
    // 1. Нужно посчитать суммы по каждым категориям, типу работ и сменам.
    // 2. Нужно чтобы такой переподсчет проводился при старте окна и отдельно, при закрытии btn-grid. И через setState обновлялись бы значения.
    var days = 0, hours = 0, wt = []
    let sumVals = []

    // const applyData = (item, node) => {
    //     item.workType = node.workType
    //     item.smena = node.smena
    //     item.hours += Number(node.hours)
    //     item.days++
    // }
    let newVals = []
    TLctx.current.worker.timenodes.forEach(node => {
        // let i = {workType: '', smena: "", days: 0, hours: 0}

        if (node.hours != null && sumVals.length != 0) {

            for (let item of sumVals) {
                let mainfound = false
                if (node.workType == item.workType) {
                    let found = false
                    console.log('item', item)
                    for (let d of item.data) {
                        if (node.smena == d.smena) {
                            console.log('item', item)
                            d.hours += Number(node.hours)
                            d.days++
                            found = true
                            mainfound = true
                        }
                    }
                    if (!found) {
                        let dd = {smena: node.smena, hours: Number(node.hours), days: 1}
                        item.data.push(dd)
                        mainfound = true
                    }

                }
                if (!mainfound) {
                    let data = {workType: node.workType, data: [{smena: node.smena, hours: Number(node.hours), days: 1}]}
                    newVals.push(data)
                }
            }
        } else if (node.hours != null && sumVals.length == 0) {
            let data = {workType: node.workType, data: [{smena: node.smena, hours: Number(node.hours), days: 1}]}
            sumVals.push(data)
        }




        // if (node.hours != null && node.smena == TLctx.current.smena && node.workType == TLctx.current.workType) {
        //     hours += Number(node.hours)
        //     days++

        // }
        // if (node.hours != null && !wt.includes(node.workType + ": " + node.smena)) {
        //     wt.push(node.workType + ": " + node.smena )
        // }

    }) // Подсчёт кол-ва часов и дней с учётом фильтров
    sumVals.push(...newVals)
    console.log('sumVals', sumVals)
    // data = []

    // Бурение:
    // Дневные смены:
    // Ночные смены:
    let i = {workType: '', data: [{smena: "", days: 0, hours: 0}, {smena: "", days: 0, hours: 0}]}
    let tableRow = (item, ) => {
        let mapData = (i) => {
            return <div class="summary_smena">
                <div class='summary_value smena'>{i.smena}</div>
                <div class='summary_value smena_count'>{i.days}</div>
                <div class='summary_value hours_count'>{i.hours}</div>
            </div>
        }
        let vals =  <div class="summary_values">
                        {item.data.map((i) => mapData(i))}
                    </div>
        return <div class="summary">
            <div class='summary_category'>{item.workType}</div>
            {vals}
        </div>
    }
    var objInfo = <div class='workerselectObject' id='workerselect_writernames' onclick='onClick()'><div class='writernames'>Заполнявшие в этом месяце: <br/><span>Захарченко И.С.</span></div><div></div></div>
    // Если нет ночных, то дневные растягиваем, вместо 3 секций - 2.
    let header = [{workType: 'Категория', data: [{smena: "Смена", days: "Смен", hours: "Часов"}]}]
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
