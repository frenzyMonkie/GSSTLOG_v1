// Компонент "Главная страница"
const ReportCorrectionPage = () => {

        const state = {
            pageTitle: "Корректировка отчётов",
            currentObject: "",
            currentObjectCustoms: {},
            formData: {},
            formLabel: "ReportCorrectionPage",
            backPage: "/Main",
            nextPage: "/Main",
            const: {Spendables: [], MeasureUnits: [] },
        };



    // onPageLoad = () => {}
    // onPageRefresh = () => {}
    // onPageClose = () => {}
    // onFormEdit = () => {}
    // onFormSubmit = () => {}
    // onFormReset = () => {}
    // onErrEvent = () => {}
    // onSuccEvent = () => {}
    // onCautionEvent = () => {}
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
            <Fragment>
            </Fragment>
        )
    }

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


