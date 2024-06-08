
// Компонент "Площадка"
const StageLog = () => {
    const state = {
        pageTitle: "Установки",
        currentObject: "",
        currentObjectCustoms: {sectors: [], },
        formData: {},
        formLabel: "StageLog",
        backPage: "/ReportPage",
        nextPage: "/ReportPage",
        const: {Places: [], placeStates: [] }
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
        // context = usePageContext()
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
