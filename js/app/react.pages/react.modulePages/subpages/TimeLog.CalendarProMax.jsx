

// Компонент "Насосы"
const CalendarPro = () => {
    const navigate = useNavigate();
    const useTimelogContext = React.useContext(TimeLogContext) // Берем контекст
    // const pageTitle = () => {
    //     try {
    //         var title = useTimelogContext.current.worker.name
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
        // let idx = useTimelogContext.current.idx
        // for (let cn of useTimelogContext.current.timenodes) {
        //     for (let sn of useTimelogContext.workers[idx]) {
        //         let match = cn.object == sn.object && cn.smena == sn.smena && cn.workType == sn.workType && cn.date == sn.date
        //         if (match) {}
        //     }
        // }
        useTimelogContext.current.timenodes = []
        navigate("/TimeLogSelectWorkers", {replace: false})
        console.log(useTimelogContext)
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
        // console.log("useTimelogContext.current.timenodes", useTimelogContext.current.timenodes)
        let idx = useTimelogContext.current.idx
        useTimelogContext.workers[idx].LastSmena = useTimelogContext.current.smena
        useTimelogContext.workers[idx].LastWorkType = useTimelogContext.current.workType
        // console.log("useTimelogContext.workers", useTimelogContext.workers, "useTimelogContext.current.idx", useTimelogContext.current.idx, useTimelogContext.workers[useTimelogContext.current.idx].timenodes)
        useTimelogContext.workers[useTimelogContext.current.idx].timenodes = structuredClone(useTimelogContext.current.timenodes) // Ну примерно так
        // console.log("useTimelogContext.workers", useTimelogContext.workers, "useTimelogContext.current.idx", useTimelogContext.current.idx, useTimelogContext.workers[useTimelogContext.current.idx].timenodes)
        navigate("/TimeLogSelectWorkers", {replace: true})

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
        return (
            <div class="header" id="header_main">
                <div className="nav_left"> {navLeft(handler) || null}</div>
                <div class="header_title"> {state.pageTitle || "Нету названия"} </div>
                <div className="nav_right"> {navRight(handler) || null}</div>
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
        return (
            <div class="container">

                <div class="content" id="content_main">
                <Calendar />

                    {/* <div class="menu">
                        <div class="menu_item menu_item_thin" id="presets">
                            <p class="title_s"> Силикатный пр-д</p>
                            <p class="title_s">25.04.2024</p>
                        </div>
                    </div> */}
                    <div class="tasks" id="today_tasks">
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

                    </div>
                    {/* <div class="menu">
                        <div class="menu_item menu_item_thin" id="presets">
                            <p class="title_s"> Назад </p>
                            <p class="title_s">Далее</p>
                        </div>
                    </div> */}
                </div>
        </div>
        )
    }

    return render()
}

const Calendar = () => {
    const useTimeLogContext = React.useContext(TimeLogContext) // Берем контекст
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
    const parseContextNames = (useTimelogContext) => {
        var ret = [] // Просто выдираем имена из контекста
        for (var uniqueWorker of useTimelogContext.workers) {
            ret.push(uniqueWorker.name)
        }
        return ret
    }
    const render = () => {
        // const useTimelogContext = React.useContext(TimeLogContext) // Берем контекст
        // names = parseContextNames(useTimelogContext)
        // const { calendar_data } = state; // Извлекаем ссылку на calendar_data из реестра.
        // console.log(calendar_data)

        // useTimelogContext.workers.push([...calendar_data]) // Некие данные загружены. Пушим их в контекст.
        // var currentWorker = Object.keys(useTimelogContext[0][0])[0] // Ищем выбранного рабочего (здесь необяхательно, из контекста можно вытащить потом)
        // console.log(currentWorker)

        return (
                                <div className="container">
                                <ButtonGrid/>
                                <MultidateCalendar
                                    // currentWorker={currentWorker}
                                    // calendarData={calendar_data}
                                    handleSubmit={handleSubmit_calendar}
                                    useTimeLogContext = {useTimeLogContext} />
                                    {/* <Form
                                    //   characterData={characters}
                                        handleSubmit={this.handleSubmit} /> */}
                                </div>
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
    const useTimeLogContext = props.useTimeLogContext
    console.log(useTimeLogContext)
    // useTimeLogContext.choosingHours = [choosingHours, setChoosingHours]
    const onSave = event => {
        event.preventDefault();
        props.handleSubmit(state);
        console.log("onSave", state)
        // this.setState(initialState); // Тут не нужно сбрасывать. Наоборот, значения должны сохраняться.
    }


        useEffect(() => { // Устанавливаем пресетные значения
            const onMount = () => {
                // console.log(1, props.useTimelogContext.workers[0][0])
                // const calendarData = props.useTimelogContext.workers[0][0];
                // this.setState(calendarData) // Этап стартовой загрузки данных, предварительно запрошенных из БД
                // console.log(123, props.useTimeLogContext)
                multidatepicker(props.useTimeLogContext)
            };
            onMount()
        }, []); // https://maxrozen.com/learn-useeffect-dependency-array-react-hooks




    // console.log(props.useTimeLogContext)
    const headInfo = filters(useTimeLogContext)
    const summaryInfo = infoSection(useTimeLogContext)
    const render = () => {
            // const { characterData, removeCharacter } = props;
            return (
                <Fragment>
                {headInfo}
                    <form onSubmit={onSave}>
                        <div>
                            <div id="date_range"></div>
                            <br/>
                            {/* <textarea name="multipleDate"></textarea>
                            <button type="submit"  class="calendar_approve">
                                Добавить
                            </button> */}
                        </div>
                    </form>
                {summaryInfo}
                </Fragment>

        );
    }
    return render();
}

const filters = (useTimeLogContext) => {
    // let idx = useTimeLogContext.current.idx
    // var [smena, setSmena] = useState(useTimeLogContext.workers[idx].LastSmena)
    // var [workType, setWorkType] = useState(useTimeLogContext.workers[idx].LastWorkType)
    // useTimeLogContext.current.setSsmena = setSmena
    // useTimeLogContext.current.setWorkType = setWorkType
    // useTimeLogContext.current.smena = useTimeLogContext.current.smena ?  useTimeLogContext.current.smena : useTimeLogContext.workers[idx].LastSmena
    // useTimeLogContext.current.workType = useTimeLogContext.current.workType? useTimeLogContext.current.workType : useTimeLogContext.workers[idx].LastWorkType
    // useTimeLogContext.workers[idx].LastSmena = useTimeLogContext.current.smena ? useTimeLogContext.current.smena : useTimeLogContext.workers[idx].LastSmena
    // useTimeLogContext.workers[idx].LastWorkType = useTimeLogContext.current.LastWorkType ? useTimeLogContext.current.LastWorkType : useTimeLogContext.workers[idx].LastWorkType

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
    // const useTimeLogContext = React.useContext(TimeLogContext) // Берем контекст
    // var objectOnclick =  () => navigate("/TimeLogSelectObjects", {replace: true})
    // var nameOnclick = () => navigate("/TimeLogSelectWorkers", {replace: true})
    // var name = <div class='calendFilter' id='calendar_workername' onClick={nameOnclick}> <div class='workername'>Сотрудник:</div><div>{useTimeLogContext.current.worker.name}</div> </div>
    // var object = <div class='calendFilter' id='calendar_object' onClick={objectOnclick}><div class='obj'>Объект:</div><div>{useTimeLogContext.current.object}</div></div>
    var name = <div class='calendFilter' id='calendar_workername'> <div class='workername'>Сотрудник:</div><div>{useTimeLogContext.current.worker.name}</div> </div>
    var object = <div class='calendFilter' id='calendar_object'><div class='obj'>Объект:</div><div>{useTimeLogContext.current.object}</div></div>

    // Далее, очевидно - сделать связь между выбираемой сменой и обновлением холста календаря.
    // var smenaOptions = ["Дневные смены", "Ночные смены"]
    // var workTypeOptions = ["Дежурство", "Монтаж", "Сварка", "Бурение"]


    // Здесь нужно привязать, последний стык.
    // {item} должен быть из контекста, а не из массива
    // {useTimeLogContext.current.smena}
    // const filterBlock = (items, category) => {
    //     return items.map((item) => ( // Отрисовать результаты поиска по всему файлу.
    //         // console.log(useTimeLogContext.current[item])
    //         // console.log("filteritem", item)
    //         // Тут получается расхождение - с одной стороны реактивное поведение setState, с другой - проактивное select onChange
    //         // Либо мы меняем тег option selected при select onChange, и внутри меняем  useTimeLogContext.current.filter,
    //         // который тогда в свою очередь должен использоваться при проверках того, какие данные календаря рендерить.
    //         // Т.е. вопрос там, где сам state из useState соединяется с select option. Но нам необязательно рендерить сам стейт, так ведь?
    //         item == useTimeLogContext.current[category] ? <option key={item}  value={item} selected>{item}</option> : <option key={item} value={item}>{item}</option>
    //         // {/* <option key={item} value={item}>{item}</option> */}

    //     ))
    // }

    const handleFilterClick = (target) => {
        // console.log(e.target.id)
        // console.log(e.target.value)
        // const value = e.target.value
        if (target == "calendar_smena" ) {
            navigate("/WorkerTableFilter_Smena", {replace: true})
        } else if (target == "calendar_worktype" ) {
            navigate("/WorkerTableFilter_WorkType", {replace: true})
        }
    }

    // var smenaChoose =  <select onChange={e => handleFilterClick(e)} class="calendFilter input_measure spendables_units" id='calendar_smena'>
    //                         {filterBlock(smenaOptions, 'smena')}
    //                     </select>

    // var wtypeChoose =  <select onChange={e => handleFilterClick(e)} class="calendFilter input_measure spendables_units" id='calendar_worktype'>
    //                         {filterBlock(workTypeOptions, 'workType')}
    //                     </select>

    // var smena = <div class='calendFilter' id='calendar_smena' onClick={onClick}><i class='task_item_arr calendar_menu_arr fi fi-br-angle-small-right'></i><div>{useTimeLogContext.current.smena}</div></div> // <div class='band'>Бригадир: {useTimeLogContext.current.worker.band}</div>
    // var wtype = <div class='calendFilter' id='calendar_worktype' onClick={onClick}><i class='task_item_arr calendar_menu_arr fi fi-br-angle-small-right'></i><div>{useTimeLogContext.current.workType}</div></div>

    var smenaChoose =  <div class='calendFilter' id='calendar_smena' onClick={() => handleFilterClick('calendar_smena')}><i class='task_item_arr calendar_menu_arr fi fi-br-angle-small-right'></i><div>{useTimeLogContext.current.smena}</div></div> // <div class='band'>Бригадир: {useTimeLogContext.current.worker.band}</div>
    var wtypeChoose =  <div class='calendFilter' id='calendar_worktype' onClick={() => handleFilterClick('calendar_worktype')}><i class='task_item_arr calendar_menu_arr fi fi-br-angle-small-right'></i><div>{useTimeLogContext.current.workType}</div></div>

    return (
        <div class='calendFilters'>{object}{name}<div class='calendarFilterSection'>{smenaChoose}{wtypeChoose}</div></div>
    )
}
const infoSection = (useTimeLogContext) => {
    var days = 0, hours = 0
    useTimeLogContext.current.worker.timenodes.forEach(node => {
        if (node.hours != null && node.smena == useTimeLogContext.current.smena && node.workType == useTimeLogContext.current.workType) {
            hours += Number(node.hours)
            days++
        }
    }) // Подсчёт кол-ва часов и дней с учётом фильтров
    var summary =  <div class='calendFilter label_s' id="calendar_summary">В этом месяце: {hours}ч. / {days}дн.</div>
    return (
        <div class='calendFilters'><div class='calendarFilterSection'>{summary}</div></div>
    )
}
