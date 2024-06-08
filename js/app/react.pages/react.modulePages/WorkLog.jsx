
// Компонент "МСГ и прочие работы"
const  WorkLog = () => {
    const state = {
        pageTitle: "Отчёт по работам",
        currentObject: "",
        currentObjectCustoms: {sectors: [], },
        formData: {},
        formLabel: "WorkLog",
        backPage: "/ReportPage",
        nextPage: "/ReportPage",
        var: {msgData: {},},
        const: {Worktypes: [], Brigades: [] }
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
