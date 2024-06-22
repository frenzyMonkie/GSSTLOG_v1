const WorkerTableFilter = ({ filterCategory, filterVals }) => {
    const useTimeLogContext = React.useContext(TimeLogContext) // Берем контекст
    const navigate = useNavigate();
    // const [selectedSmena, setSelectedSmena] = useState("Дневные смены")
    // const [selectedWorkType, setSelectedWorkType] = useState("Дежурство")
    useTimeLogContext.filters = {}
    // useTimeLogContext.filters['smena'] = [selectedSmena, setSelectedSmena]
    // useTimeLogContext.filters['workType'] = [selectedWorkType, setSelectedWorkType]
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
            // setSelectedSmena(useTimeLogContext.current.smena)
            // setSelectedWorkType(useTimeLogContext.current.workType)
            useTimeLogContext.current[filterName] = filterVal;
            console.log(useTimeLogContext.current[filterName], filterName, filterVal)
            navigate("/CalendarPro", {replace: true})
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
        console.log(useTimeLogContext.current[filterCategory])
        var selected = useTimeLogContext.current[filterCategory]
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

    const renderContent = () => {
        console.log("[ RE-CALLED ] : renderContent")
        // Подготовка данных
        useTimeLogContext.filters[filterCategory] = filterCanvasManager(filterCategory, filterVals)
        console.log(useTimeLogContext.filters)
        const nameList_mainmode = <div className="tab__content" id="tab__chosen_workers">
                                        {useTimeLogContext.filters[filterCategory].map((item, mapindex) => ( // Отрисовать результаты поиска по всему файлу.
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
                <div class="workers">
                    <div class="tab-wrap">
                        {mainCanvas}
                    </div>
                </div>
            </div>
            </TimeLogContext.Provider>
        )

    }
    const backToCalendar = () => {
        navigate("/CalendarPro", {replace: true})
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
        console.log(filterCategory, filterVals)
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
