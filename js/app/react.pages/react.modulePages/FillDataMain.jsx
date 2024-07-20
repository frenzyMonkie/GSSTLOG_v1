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
        return (
            <div class="menu_main">

                <div class="main_section" onClick = {() => navigate("/", {replace: true})}>
                    <i class="main_section_icon fi fi-ss-employee-man-alt "></i>
                    <div class="main_section_text">Индивидуальные табели<br/></div>
                    <i class="fi fi-sr-caret-right"></i>
                </div>
                <div class="main_section" onClick = {() => navigate("/TimeLogSelectObjects", {replace: true})}>
                    <i class="main_section_icon fi fi-ss-user-helmet-safety"></i>
                    <div class="main_section_text">Табели объектов</div>
                    {/* <span><br/> Неотправленных табелей: 4</span></div> */}
                    <i class="fi fi-sr-caret-right"></i>
                </div>
                <div class="main_section">
                    <i class="main_section_icon fi fi-ss-notebook-main"></i>
                    <div class="main_section_text">Табели отделов </div>
                    {/* <span><br/>Ожидают заполения: 4 </span></div> */}
                    <i class="fi fi-sr-caret-right"></i>
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
