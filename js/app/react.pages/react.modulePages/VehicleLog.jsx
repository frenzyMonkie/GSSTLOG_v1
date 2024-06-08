// Компонент "Техника"
const VehicleLog = () => {
    const state = {
        pageTitle: "Техника",
        currentObject: "",
        currentObjectCustoms: {},
        formData: {},
        formLabel: "VehicleLog",
        backPage: "/ReportPage",
        nextPage: "/ReportPage",
        const: {Vehicles: [], Hours: [] },
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

    const headerNav = (navSide, handleClick) => {
        // Получаем с формы данные. Индивидуальные для каждого PAGE
        const freshData = {data: [{vehicleid: 123456789, vehiclename: "Кран 25 тонн", hours: 8}, {vehicleid: 123456789, vehiclename: "Кран 25 тонн", hours: 8},], comment: ""}

        // Вытягиваем контекст. Индивидуальный для каждого PAGE
        const {appliedVehicles} = useContext(AppContext)
        const setOnClick = appliedVehicles[1] // Функция для изменения данных в ячейке в контексте // setVehicles(newData)
        console.log(appliedVehicles[0])

        // Упаковываем данные в объект для передачи на склады.
        var dataPack = {formLabel: state.formLabel, formData: [{cellData: freshData, setData: setOnClick}]}

        // Навигация
        const navigate = useNavigate();
        const page = navSide == "navLeft" ? state.backPage : navSide == "navRight" ? state.nextPage : null
        const goToPage = () => navigate( page, {replace: true});
        // 1. Тут для каждого PAGE разные компоненты где Fragment. а также уточнение "onCancel" / "onDataSave", т.е.
        // в зависимости от стороны и модуля кнопка может триггерить разные сценарии, поэтому пока не будем вникать.
        return (
            navSide == "navLeft" ?
            <Fragment>
            <i onClick = {() => handleClick("onCancel", dataPack, goToPage, appliedVehicles[0])} class="header_back fi fi-rr-arrow-small-left"></i>
            </Fragment>
            : navSide == "navRight" ?
            <Fragment>
            <i onClick = {() => handleClick("onApply", dataPack, goToPage, appliedVehicles[0])} class="header_save fi fi-rs-disk"></i>
            </Fragment>
            :
            <Fragment></Fragment>
        )
    }
    const navLeft  = (handleClick) => {
        return headerNav("navLeft", handleClick)
    }
    const navRight  = (handleClick) => {
        return headerNav("navRight", handleClick)
    }

    const renderCanvas = (props) => {

        return (
            <div class="container">
                <h1>Техника</h1>
                <div>{props}</div>
                <form class="vehicles" action="">
                    <input type="text" name="vehicle_label" id="vehicle_label" placeholder="Техника"/>
                    <input type="number" placeholder="Часов" name="vehicle_hours" id="vehicle_hours"/>
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
