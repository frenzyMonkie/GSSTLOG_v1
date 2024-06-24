

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
        navigate("/TimeLogSelectWorkers", {replace: false})
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
        console.log("useTimelogContext.current.timenodes", useTimelogContext.current.timenodes)
        let current = useTimelogContext.current.timenodes
        console.log("useTimelogContext.workers", useTimelogContext.workers, "useTimelogContext.current.idx", useTimelogContext.current.idx, useTimelogContext.workers[useTimelogContext.current.idx].timenodes)
        useTimelogContext.workers[useTimelogContext.current.idx].timenodes = structuredClone(current) // Ну примерно так
        console.log("useTimelogContext.workers", useTimelogContext.workers, "useTimelogContext.current.idx", useTimelogContext.current.idx, useTimelogContext.workers[useTimelogContext.current.idx].timenodes)
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
        // context = usePageContext()
        // multidatepicker(this)
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

