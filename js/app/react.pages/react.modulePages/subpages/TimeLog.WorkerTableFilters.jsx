const WorkerTableFilter = ({ filterCategory, filterVals }) => {
    const [menuSelected, setMenuSelected] = useOutletContext();
    const goPage = (page) => {
        setMenuSelected(page)
        navigate(page);
    }
    const TLctx = React.useContext(TimeLogContext) // Берем контекст
    const navigate = useNavigate();
    // const [selectedwork_shift, setSelectedwork_shift] = useState("День")
    // const [selectedwork_type, setSelectedwork_type] = useState("Дежурство")
    TLctx.filters = {}
    // TLctx.filters['work_shift'] = [selectedwork_shift, setSelectedwork_shift]
    // TLctx.filters['work_type'] = [selectedwork_type, setSelectedwork_type]
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
    const oneFilterSelectableCanvas = (filterCategory, filterVals, key, selected) => {
        console.log("[ RE-CALLED ] : oneWorkerSelectableCanvas")
        const applyFilter = (filterCategory, key) => {
                    // Это уже при клике
            // setSelectedwork_shift(TLctx.current.work_shift)
            // setSelectedwork_type(TLctx.current.work_type)
            console.log(TLctx.current[filterCategory])
            TLctx.current[filterCategory] = Number(key);
            console.log(TLctx.current[filterCategory])
            // console.log(TLctx.current[filterCategory], filterCategory, filterVal)
            // navigate("/CalendarPro", {replace: true})
            goPage("/CalendarPro")
        }; // Тоггл галочки выбора
        let iconClass = "task_item_arr fi fi-br-check"
        let itemClass = "task_item"
        // let itemWokerBandClass = "task_item_info label_s"
        let itemNameClass = "task_item_header nomargin title_m"

        return (
            <div className={key  == selected ? itemClass + " selected" : itemClass } onClick={() => applyFilter(filterCategory, key)}>
                                <div class="task_item_text">
                                    <p className={key  == selected ? itemNameClass  + " selected" : itemNameClass}>{filterVals[key]}</p>
                                </div>
                                <i className={ key == selected ? iconClass + " selected" : iconClass }></i>
                        </div>
          );
    }
    const filterCanvasManager = (filterCategory) => {
        var ret = []
        // console.log(TLctx.current[filterCategory])
        var selected = TLctx.current[filterCategory]

        var filterVals = filterCategory == "work_shift" ? TLctx.maps.work_shifts
        : filterCategory == "work_type" ? TLctx.maps.work_types
        : []
        // var filterValues = [...Object.keys(TLctx.maps.work_shifts).map(function(key) {
        //     return TLctx.maps.work_shifts[key];
        // })]
        // [...Object.keys(TLctx.maps.work_types).map(function(key) {
        //     return TLctx.maps.work_types[key];
        // })]
        console.log(filterVals)
        // filterVals.forEach((value, key, map) => {
        //     console.log(value)
        //     var canvas = oneFilterSelectableCanvas(filterCategory, value, selected)
        //     // var is_selected = filterVal == selected ? true : false
        //     let newWorkerData = {
        //         canvas: canvas,
        //         // is_selected: is_selected
        //     }
        //     ret.push(newWorkerData)
        // })
        for (var key in filterVals) {
            var canvas = oneFilterSelectableCanvas(filterCategory, filterVals, key, selected)
            // var is_selected = filterVal == selected ? true : false
            let newWorkerData = {
                canvas: canvas,
                // is_selected: is_selected
            }
            ret.push(newWorkerData)
        }

        return ret
    }

    const filterFilters = (filterCategory, filterVals) => {
        filterVals = filterCategory == "work_shift" && TLctx.current.type == "Водопонижение" ? ["День"] : filterVals
        filterVals = filterCategory == "work_type" && TLctx.current.type != "Водопонижение" ? ["Монтаж", "Сварка", "Электрика", "Прогулы", "Выходные"] : filterVals
        return filterVals
    }

    const renderContent = () => {
        console.log("[ RE-CALLED ] : renderContent")
        // Подготовка данных
        // console.log(TLctx.maps.work_shifts.values())

        // filterVals = filterFilters(filterCategory, filterVals)
        TLctx.filters[filterCategory] = filterCanvasManager(filterCategory)
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
