
// Компонент "Расход"
const SpendingLog = () => {
    const state = {
        pageTitle: "Расходники",
        currentObject: "",
        currentObjectCustoms: {},
        formData: {},
        formLabel: "SpendingLog",
        backPage: "/ReportPage",
        nextPage: "/ReportPage",
        const: {Spendables: [], MeasureUnits: [] },
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
            <div class="container">
                <h1>Техника</h1>
                <form class="spendables" action="">
                    <input type="text" name="spendable_label" id="spendable_label" placeholder="Расходник"/>
                    <input type="number" name="spendable_amount" id="spendable_amount" placeholder="Кол-во"/>
                    <input type="text" name="spendable_measure_unit" id="spendable_measure_unit" placeholder="м3"/>
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
