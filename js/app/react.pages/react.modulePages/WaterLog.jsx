// Компонент "Поток"
// userCurrentTasks.object + obj.customs + obj.preset
// Debit
// Piesometers
const WaterLog = () => {
    const state = {
        pageTitle: "Показатели системы водопонижения",
        currentObject: "",
        currentObjectCustoms: {sectors: [], },
        formData: {debitPlan: "", debitFact: "", },
        formLabel: "WaterLog",
        backPage: "/ReportPage",
        nextPage: "/ReportPage",
        const: {Pumps: [], pumpStates: [] },
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
