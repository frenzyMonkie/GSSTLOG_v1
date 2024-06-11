

// Компонент "Насосы"
const CalendarPro = () => {
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

    const navLeft  = () => {return (
        <Fragment>
        <i class="header_back fi fi-rr-arrow-small-left"></i>
        </Fragment>
    )}
    const navRight  = () => {return (

        <Fragment>
        <i class="header_save fi fi-rs-disk"></i>
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
            <CalendarProCanvas />
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

const ButtonGrid = () => {
    return <div id="myModal" class="modal">
                <div class="sheet-overlay"></div>
                <div class="modal-content">
                    <div class="container">
                        <div class="buttons_grid">
                            <div class="button_hour" id="h1">1</div>
                            <div class="button_hour" id="h2">2</div>
                            <div class="button_hour" id="h3">3</div>
                            <div class="button_hour" id="h4">4</div>
                            <div class="button_hour" id="h5">5</div>
                            <div class="button_hour" id="h6">6</div>
                            <div class="button_hour" id="h7">7</div>
                            <div class="button_hour checked" id="h8">8</div>
                            <div class="button_hour" id="h9">9</div>
                            <div class="button_hour" id="h10">10</div>
                            <div class="button_hour" id="h11">11</div>
                            <div class="button_hour" id="h12">12</div>
                            <div class="button_hour" id="h13">13</div>
                            <div class="button_hour" id="h14">14</div>
                            <div class="button_hour" id="h15">15</div>
                            <div class="button_hour" id="h16">16</div>
                            <div class="button_hour" id="h17">17</div>
                            <div class="button_hour" id="h18">18</div>
                            <div class="button_hour" id="h19">19</div>
                            <div class="button_hour" id="h20">20</div>
                            <div class="button_hour" id="h21">21</div>
                            <div class="button_hour" id="h22">22</div>
                            <div class="button_hour" id="h23">23</div>
                            <div class="button_hour" id="h24">24</div>
                        </div>
                    </div>
                </div>
            </div>
}
