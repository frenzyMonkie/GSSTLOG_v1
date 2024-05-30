
// Компонент "Старые отчёты"
const OldReportsPage = () => {

    const state = {
            pageTitle: "История отчётов",
            currentObject: "",
            currentObjectCustoms: {},
            formData: {},
            formLabel: "OldReportsPage",
            backPage: "/Main",
            nextPage: "/Main",
            const: {Spendables: [], MeasureUnits: [] },
        };



    const onPageLoad = () => {}
    const onPageRefresh = () => {}
    const onPageClose = () => {}
    const onFormEdit = () => {}
    const onFormSubmit = () => {}
    const onFormReset = () => {}
    const onErrEvent = () => {}
    const onSuccEvent = () => {}
    const onCautionEvent = () => {}
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
