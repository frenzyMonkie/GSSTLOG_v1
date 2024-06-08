// Основной вопрос - я хочу использовать контескт CustomListsPage в модуле TimeLog.
// Это именно что локальный контекст, получается что мне нужно использовать глобальный контекст,
// но нужно вызывать его через useContext. В классовых не получится чтоли?

// Компонент "Кастомные списки"
const CustomListsPage = () => {

    const state = {
            pageTitle: "Мои списки",
            currentObject: "",
            currentObjectCustoms: {},
            formData: {},
            formLabel: "CustomListsPage",
            backPage: "/Main",
            nextPage: "/Main",
            const: {Spendables: [], MeasureUnits: [] },
        }



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
