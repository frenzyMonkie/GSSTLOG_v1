
const MainPage  = () => {

        const state = {
            pageTitle: "АО Геоспецстрой",
            currentObject: "",
            currentObjectCustoms: {},
            formData: {},
            formLabel: "MainPage",
            backPage: "/Main",
            nextPage: "/Main",
            const: {Spendables: [], MeasureUnits: [] },
        }
        const context = null

    const navLeft  = () => {return (
        <Fragment>
        {/* <i class="header_back fi fi-rr-arrow-small-left"></i> */}
        </Fragment>
    )}
    const navRight  = () => {return (

        <Fragment>
        {/* <i class="header_save fi fi-rs-disk"></i> */}
        </Fragment>
    )}
    const renderCanvas = () => {

        return (
            <Fragment>
            <TimeLogSelectWorkers/>
            </Fragment>
    )}

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



