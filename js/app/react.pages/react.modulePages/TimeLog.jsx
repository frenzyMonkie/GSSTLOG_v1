// Компонент "учет времени"
const TimeLog = () => {

    const state = {
        pageTitle: "Учёт рабочего времени",
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
            {/* <TimeLogSelectWorkers/> */}
            </Fragment>
        )
    }

    const render = () => {
        // context = usePageContext()
        return PageComponent({
            renderCanvas: renderCanvas,
            pageTitle: state.pageTitle,
            navLeft: navLeft,
            navRight: navRight
           })
    }
    return render()
}