const WorkerTableFilter = ({ filterCategory, filterVals }) => {
    const [menuSelected, setMenuSelected] = useOutletContext();
    const goPage = (page) => {
        setMenuSelected(page)
        navigate(page);
    }
    const TLctx = React.useContext(TimeLogContext) // Берем контекст
    const navigate = useNavigate();
    // const [selectedSmena, setSelectedSmena] = useState("Дневные смены")
    // const [selectedWorkType, setSelectedWorkType] = useState("Дежурство")
    TLctx.filters = {}
    // TLctx.filters['smena'] = [selectedSmena, setSelectedSmena]
    // TLctx.filters['workType'] = [selectedWorkType, setSelectedWorkType]
    const state = {
        pageTitle: "Тип работ",
        currentObject: "",
        currentObjectCustoms: {},
        formData: {},
        formLabel: "TimeLogFilter",
        backPage: "/CalendarPro",
        nextPage: "/CalendarPro",
        const: {Spendables: [], MeasureUnits: [] },
    }
    const oneFilterSelectableCanvas = (filterName, filterVal, selected) => {
        console.log("[ RE-CALLED ] : oneWorkerSelectableCanvas")
        const applyFilter = (filterName, filterVal) => {
                    // Это уже при клике
            // setSelectedSmena(TLctx.current.smena)
            // setSelectedWorkType(TLctx.current.workType)
            TLctx.current[filterName] = filterVal;
            // console.log(TLctx.current[filterName], filterName, filterVal)
            // navigate("/CalendarPro", {replace: true})
            goPage("/CalendarPro")
        }; // Тоггл галочки выбора
        let iconClass = "task_item_arr fi fi-br-check"
        let itemClass = "task_item"
        // let itemWokerBandClass = "task_item_info label_s"
        let itemNameClass = "task_item_header nomargin title_m"
        return (
            <div className={selected == filterVal ? itemClass + " selected" : itemClass } onClick={() => applyFilter(filterName, filterVal)}>
                                <div class="task_item_text">
                                    <p className={selected == filterVal ? itemNameClass  + " selected" : itemNameClass}>{filterVal}</p>
                                </div>
                                <i className={selected == filterVal ? iconClass + " selected" : iconClass }></i>
                        </div>
          );
    }
    const filterCanvasManager = (filterCategory, filterVals) => {
        var ret = []
        // console.log(TLctx.current[filterCategory])
        var selected = TLctx.current[filterCategory]

        for (var filterVal of filterVals) {
            var canvas = oneFilterSelectableCanvas(filterCategory, filterVal, selected)
            // var isSelected = filterVal == selected ? true : false
            let newWorkerData = {
                canvas: canvas,
                // isSelected: isSelected
            }
            ret.push(newWorkerData)
        }

        return ret
    }

    const filterFilters = (filterCategory, filterVals) => {
        filterVals = filterCategory == "smena" && TLctx.current.type == "Водопонижение" ? ["Дневные смены"] : filterVals
        filterVals = filterCategory == "workType" && TLctx.current.type != "Водопонижение" ? ["Монтаж", "Сварка", "Электрика", "Прогулы", "Выходные"] : filterVals
        return filterVals
    }

    const renderContent = () => {
        console.log("[ RE-CALLED ] : renderContent")
        // Подготовка данных
        filterVals = filterFilters(filterCategory, filterVals)
        TLctx.filters[filterCategory] = filterCanvasManager(filterCategory, filterVals)
        // console.log(TLctx.filters)
        const nameList_mainmode = <div className="tab__content" id="tab__filters">
                                        {TLctx.filters[filterCategory].map((item, mapindex) => ( // Отрисовать результаты поиска по всему файлу.
                                            item.canvas
                                            // Если бы тут была функция, возвращающая канвас, а не сам канвас, то можно бы было прокинуть порядковый номер.
                                        ))}
                                    </div>
        const mainCanvas = <Fragment>
                                <input type="radio" id="tab0" name="tabGroup4" class="tab" checked/>
                                {nameList_mainmode}
                            </Fragment>

        return (
            <TimeLogContext.Provider>
            <div class="timelog">
                <div class="filters">
                    <div class="tab-wrap">
                        {mainCanvas}
                    </div>
                </div>
            </div>
            </TimeLogContext.Provider>
        )

    }
    const backToCalendar = () => {
        // navigate("/CalendarPro", {replace: true})
        goPage("/CalendarPro")
    }
    const navLeft  = ({children}) => {
        console.log("[ RE-CALLED ] : navLeft")
        var btn = <i onClick={backToCalendar} className="header_back fi fi-rr-arrow-small-left"></i>
        return (
            <Fragment>
            {btn}
            </Fragment>
    )}

    const navRight  = (handler) => { console.log("[ RE-CALLED ] : navRight")
        // var btn = selectMode ? <button onClick={toggleSelectMode} class="header_save change_workers ready">Готово</button> : <button onClick={toggleSelectMode} class="header_save change_workers">Изменить</button>
        // var btn = selectMode ? <i onClick={toggleSelectMode} className="fi fi-rs-disk"></i> : <i onClick={toggleSelectMode} className="fi fi-bs-edit"></i>
        return (
        <Fragment>
        {/* <i class="header_save fi fi-rs-disk"></i> */}
        {/* {btn} */}
        </Fragment>
    )}
    const header = (handler) => {
        console.log("[ RE-CALLED ] : header")
        return (
            <div class="header" id="header_main">
                <div className="nav_left"> {navLeft(handler) || null}</div>
                <div class="header_title"> {state.pageTitle || "Нету названия"} </div>
                <div className="nav_right"> {navRight(handler) || null}</div>
            </div>
        )
    }

    const render = () => {
        // console.log(filterCategory, filterVals)
        return AppCanvas({
                renderCanvas: renderContent,
                pageTitle: state.pageTitle,
                navLeft: navLeft,
                navRight: navRight,
                head: header
            })
    }

return render()

}
