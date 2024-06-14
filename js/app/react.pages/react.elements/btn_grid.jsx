

const ButtonGrid = () => {
    const useTimeLogContext = React.useContext(TimeLogContext) // Берем контекст
    const [btnGridVisible, setBtnGridVisible] = useState(false)
    const [checkedBtn, setCheckedBtn] = useState(null)
    useTimeLogContext.btnGrid = [btnGridVisible, setBtnGridVisible]
    useTimeLogContext.checkedBtn = [checkedBtn, setCheckedBtn]
    const [currentDate, setCurrentDate] = useState(null)
    useTimeLogContext.currentDate = [currentDate, setCurrentDate]
    const setCurrentTimenodesByDate = (useTimeLogContext, date, hours) => {
        if (date) useTimeLogContext.current.date = date // Устанавливаем фокус на выбранную дату
        useTimeLogContext.currentDate[1](date)
        useTimeLogContext.current.timenodes.forEach(el => { // Устанавливаем фокус на хранящееся число отработанных часов для последующей отрисовки
            if (el.smena == useTimeLogContext.current.smena && el.workType == useTimeLogContext.current.workType) {
                if (el.date == date) {

                    useTimeLogContext.current.hours = el.hours
                    setCheckedBtn(el.hours) // Выделяем новую кнопку цветом
                }
            }
        })
        $('#date_range').datepicker( "refresh" )
        console.log("[ Вход в контекст выбора часов]", useTimeLogContext)
    }
    useTimeLogContext.setCurrentTimenodesByDate = setCurrentTimenodesByDate

    const removeHoursData = e => {
        updateDatepicker(e, "remove")
        cleanupAndRefresh();
        // setTimeout(() => { cleanupAndRefresh(); }, 100);
    }

    const handleBtnClick = e => {
        updateDatepicker(e, "update")
        cleanupAndRefresh();
        // setTimeout(() => {  }, 100);
    }

    const cleanupAndRefresh = () => {
        // Поскольку выходим из контекста выбора, обнуляем и обновляем всё что требуется
        useTimeLogContext.current.date = null
        useTimeLogContext.current.hours = null
        $('#date_range').datepicker( "refresh" )
        setCheckedBtn(null) // Выделяем выделение кнопки цветом
        setBtnGridVisible(false) // Убираем панель
        console.log("[ Выход из контекста выбора часов]", useTimeLogContext)
    }

    const updateDatepicker = (e, action) => {

        // Устанавливаем выбранное пользователем кол-во часов
        useTimeLogContext.current.hours = action == "update" ? e.target.textContent : action == "remove" ? null : "QQQ"
        let hours = action == "update" ? e.target.textContent : action == "remove" ? null : "QQQ"
        let date = useTimeLogContext.currentDate[0]
        console.log("updateDatepicker", useTimeLogContext.current.timenodes)
        useTimeLogContext.current.timenodes.forEach(el => {
            console.log(el.date, date,  hours)
            el.hours = el.date == date ? hours : el.hours // Устанавливаем выбранное пользователем кол-во часов также в общем списке
            // Фильтруем по фильтрам, проверяем что у элемента уже проставлено значение часов.
            if (el.smena == useTimeLogContext.current.smena && el.workType == useTimeLogContext.current.workType) {
                if (action == "update" ? (el.hours != null) : action == "remove" ? (el.date != date) : false) {
                    console.log("el2", el)
                    // console.log(useTimeLogContext)
                    let date = el.date.split(".")
                    let e = new Date(date[2], date[1]-1, date[0]) // e - очередная дата в формате new Date()
                    $('#date_range').datepicker( "setDate", e )  // Устанавливаем для календаря отрисовку выбранной даты со всеми классами
                }
            }
                            // if (node.hours == null) {
                            //     var index = useTimeLogContext.current.timenodes.indexOf(node);
                            //     if (index !== -1) {
                            //         useTimeLogContext.current.timenodes.splice(index, 1);
                            //     }
                            // }
        })
    }

    return  (
        <Fragment>
                <div id="myModal" className={btnGridVisible ? "modal show" : "modal"}>
                {/* <div id="myModal" class="modal show"> */}
                    <div class="sheet-overlay"></div>
                    <div class="modal-content">
                        <div class="btn_container">
                            {currentDate}
                            <div class="buttons_grid">
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "1" ? "button_hour checked" : "button_hour"} id="h1">1</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "2" ? "button_hour checked" : "button_hour"} id="h2">2</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "3" ? "button_hour checked" : "button_hour"} id="h3">3</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "4" ? "button_hour checked" : "button_hour"} id="h4">4</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "5" ? "button_hour checked" : "button_hour"} id="h5">5</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "6" ? "button_hour checked" : "button_hour"} id="h6">6</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "7" ? "button_hour checked" : "button_hour"} id="h7">7</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "8" ? "button_hour checked" : "button_hour"} id="h8">8</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "9" ? "button_hour checked" : "button_hour"} id="h9">9</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "10" ? "button_hour checked" : "button_hour"} id="h10">10</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "11" ? "button_hour checked" : "button_hour"} id="h11">11</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "12" ? "button_hour checked" : "button_hour"} id="h12">12</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "13" ? "button_hour checked" : "button_hour"} id="h13">13</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "14" ? "button_hour checked" : "button_hour"} id="h14">14</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "15" ? "button_hour checked" : "button_hour"} id="h15">15</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "16" ? "button_hour checked" : "button_hour"} id="h16">16</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "17" ? "button_hour checked" : "button_hour"} id="h17">17</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "18" ? "button_hour checked" : "button_hour"} id="h18">18</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "19" ? "button_hour checked" : "button_hour"} id="h19">19</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "20" ? "button_hour checked" : "button_hour"} id="h20">20</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "21" ? "button_hour checked" : "button_hour"} id="h21">21</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "22" ? "button_hour checked" : "button_hour"} id="h22">22</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "23" ? "button_hour checked" : "button_hour"} id="h23">23</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "24" ? "button_hour checked" : "button_hour"} id="h24">24</div>
                                <div onClick={(e) => removeHoursData(e)} class="remove" id="remove">Удалить время</div>
                                <div onClick={() => setBtnGridVisible(!btnGridVisible)} class="quit" id="return">Вернуться</div>
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}
