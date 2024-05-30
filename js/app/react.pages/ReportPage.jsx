
// Компонент "Отчёт"
const ReportPage = () => {
    const state = {
            pageTitle: "Заполнение отчёта",
            currentObject: "",
            currentObjectCustoms: {},
            formData: {},
            formLabel: "ReportPage",
            backPage: "/Main",
            nextPage: "/#",
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
    const renderCanvas = () => {
        return (
            <Fragment>
            </Fragment>
        )
    }

    const render = () => {

        return PageComponent({
                renderCanvas: renderCanvas,
                pageTitle: state.pageTitle,
                navLeft: navLeft,
                navRight: navRight
               })
    }
    return render()
}
