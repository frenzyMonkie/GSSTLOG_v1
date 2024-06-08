// Компонент "Насосы"
const PumpLog = () => {
    const state = {
        pageTitle: "Мои списки",
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
   const renderCanvas = () => {
        return (
            <div class="container">
                <h1>Техника</h1>
                <form class="pumps" action="">
                    <input type="text" name="pump_state" id="pump_state" placeholder="Состояние (в работе/ прочее)"/>
                    <input type="text" name="pump_label" id="pump_label" placeholder="Насос"/>
                    <input type="number" name="pump_amount" id="pump_amount" placeholder="Кол-во"/>
                    <button type="button">Добавить поле</button>
                    <button type="button">Удалить добавленное поле</button>
                    <button type="reset">Сбросить все значения</button>
                    <button type="submit">Сохранить для отправки</button>
                    <button type="reset">Выйти в другое меню</button>
                </form>
            </div>
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
