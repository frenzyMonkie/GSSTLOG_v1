const SendMenu = ({ SendMenuOptions }) => {
    const [menuSelected, setMenuSelected] = useOutletContext();
    const goPage = (page) => {
        setMenuSelected(page)
        navigate(page);
    }
    const TLctx = React.useContext(TimeLogContext) // Берем контекст
    const navigate = useNavigate();
    // const [selectedwork_shift, setSelectedwork_shift] = useState("День")
    const [selectedwork_type, setSelectedwork_type] = useState("Дежурство")
    TLctx.filters = {}
    // TLctx.filters['work_shift'] = [selectedwork_shift, setSelectedwork_shift]
    // TLctx.filters['work_type'] = [selectedwork_type, setSelectedwork_type]
    const state = {
        pageTitle: "Отправка по каналам",
        currentObject: "",
        currentObjectCustoms: {},
        formData: {},
        formLabel: "SendMenu",
        backPage: "/TimeLogObjectList",
        nextPage: "/FillDataMain",
        const: {Spendables: [], MeasureUnits: [] },
    }
    const oneSendOptionSelectableCanvas = (sendMenuOption, sendMenuOptionSub) => {
        console.log("[ RE-CALLED ] : oneWorkerSelectableCanvas")
        const goFinalizeMenu = () => {
                    // Это уже при клике
            // setSelectedwork_shift(TLctx.current.work_shift)
            // setSelectedwork_type(TLctx.current.work_type)
            // TLctx.current[filterName] = filterVal;
            // console.log(TLctx.current[filterName], filterName, filterVal)
            // navigate("/CalendarPro", {replace: true})
            goPage("/FillDataMain")
        }; // Тоггл галочки выбора

        return (
            <div class="task_item" onClick={goFinalizeMenu}>
                <div class="task_item_text">
                    <p class="task_item_header nomargin title_m">{sendMenuOption.option}</p>
                    <p class="task_item_info label_s">{sendMenuOption.sub}</p>
                </div>
                {/* <i className="task_item_arr fi fi-br-angle-small-right "></i> */}
                <i className="task_item_arr fi fi-sr-caret-right "></i>
            </div>
          );
    }
    const sendTypeCanvasManager = (SendMenuOptions) => {
        var ret = []
        // console.log(TLctx.current[filterCategory])
        // var selected = TLctx.current[filterCategory]

        for (var sendMenuOption of SendMenuOptions) {
            var canvas = oneSendOptionSelectableCanvas(sendMenuOption)
            // var is_selected = filterVal == selected ? true : false
            let newWorkerData = {
                canvas: canvas,
                // is_selected: is_selected
            }
            ret.push(newWorkerData)
        }

        return ret
    }


    const renderContent = () => {
        console.log("[ RE-CALLED ] : renderContent")
        // Подготовка данных
        var Options = sendTypeCanvasManager(SendMenuOptions)
        // console.log(TLctx.filters)
        const nameList_mainmode = <div className="tab__content" id="tab__sendmenu_options">
                                        {Options.map((item, mapindex) => ( // Отрисовать результаты поиска по всему файлу.
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
                <div class="sendmenu">
                    <div class="tab-wrap">
                        {mainCanvas}
                    </div>
                </div>
            </div>
            </TimeLogContext.Provider>
        )

    }
    const backToObjectList = () => {
        // navigate("/CalendarPro", {replace: true})
        setMenuSelected("/TimeLogSelectObjects")
        goPage("/TimeLogSelectObjects")
    }
    const navLeft  = ({children}) => {
        console.log("[ RE-CALLED ] : navLeft")
        // var btn = <i onClick={backToObjectList} className="header_back fi fi-rr-arrow-small-left"></i>
        return (
            <Fragment>
            {/* {btn} */}
            </Fragment>
    )}
    const finalize = () => {
        // navigate("/CalendarPro", {replace: true})
        // отправить запрос, пока ожидается ответ - показать экран с бесконечной загрузкой
        // Таймаут на 7-8 секунд.
        var success = true // Провекра на успех отправки данных
        if (success) {
            // Отобразить что всё отправлено и перейти
            setMenuSelected("/FillDataMain")
            goPage("/FillDataMain")
        } else {
            // Отобразить ошибку, "Попробуйте отправить позднее" и остаться на странице
        }

    }
    const navRight  = (handler) => { console.log("[ RE-CALLED ] : navRight")
        // var btn = selectMode ? <button onClick={toggleSelectMode} class="header_save change_workers ready">Готово</button> : <button onClick={toggleSelectMode} class="header_save change_workers">Изменить</button>
        // var btn = selectMode ? <i onClick={toggleSelectMode} className="fi fi-rs-disk"></i> : <i onClick={toggleSelectMode} className="fi fi-bs-edit"></i>
        // var btn = <i onClick={finalize} className="fi fi-bs-paper-plane-finalize"></i>

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
