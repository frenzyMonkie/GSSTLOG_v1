// Компонент "учет времени"
const FillDataMain = () => {
    const navigate = useNavigate();
    const state = {
        pageTitle: "Внесение данных",
        currentObject: "",
        currentObjectCustoms: {},
        formData: {},
        formLabel: "TimeLog",
        backPage: "/ReportPage",
        nextPage: "/ReportPage",
        var: {userWorkerList: {},},
        const: {Worktypes: [], Shifts: [], Hours: [] }
    }
    const context = null
    const idb = null
    const onPageLoad = () => {}
    const onPageRefresh = () => {}
    const onPageClose = () => {}
    const onFormEdit = () => {}
    const onFormSubmit = () => {}
    const onFormReset = () => {}
    const onErrEvent = () => {}
    const onSuccEvent = () => {}
    const onCautionEvent = () => {}
    const renderCanvas = () => {
        return (
            <Fragment>
            <TimeLogSelectWorkers/>
            </Fragment>
        )
    }

    const renderContent = () => {
        console.log("[ RE-CALLED ] : renderContent")
        // prepareTimelog() // Подготовка данных
        return (
            <div class="timelog_main">
                <div class="timelog_main_section" onClick = {() => navigate("/TimeLogSelectObjects", {replace: true})}>
                    Учёт рабочего времени
                </div>
                <div class="timelog_main_section" onClick = {() => navigate("/", {replace: true})}>
                    Отчёты по объектам
                </div>
                <div class="timelog_main_section">
                </div>
            </div>
        )
    }
    const navLeft  = (handler) => {console.log("[ RE-CALLED ] : navLeft")
        return (
            <Fragment>
            {/* <i class="header_back fi fi-rr-arrow-small-left"></i> */}
            </Fragment>
    )}
    const navRight  = (handler) => { console.log("[ RE-CALLED ] : navRight")
        // var btn = selectMode ? <button onClick={toggleSelectMode} class="header_save change_workers ready">Готово</button> : <button onClick={toggleSelectMode} class="header_save change_workers">Изменить</button>
        // var btn = selectMode ? <i onClick={toggleSelectMode} className="fi fi-rs-disk"></i> : <i onClick={toggleSelectMode} className="fi fi-bs-edit"></i>
        return (
        <Fragment>
        {/* <i class="header_save fi fi-rs-disk"></i> */}
        {/* {btn} */}
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
    const render = () => {
        // context = usePageContext()
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
