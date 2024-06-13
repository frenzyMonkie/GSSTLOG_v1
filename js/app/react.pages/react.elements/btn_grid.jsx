

const ButtonGrid = () => {
    const useTimeLogContext = React.useContext(TimeLogContext) // Берем контекст
    // // Select DOM elements
    // const showModalBtn = document.querySelector(".show-modal");
    // const bottomSheet = document.querySelector(".modal");
    // const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
    // const sheetContent = bottomSheet.querySelector(".buttons_grid");
    // const dragIcons = bottomSheet.querySelectorAll(".button_hour");

    // // Show the bottom sheet, hide body vertical scrollbar, and call updateSheetHeight
    // const showBottomSheet = () => {
    //     bottomSheet.classList.toggle("show");
    // }

    // // Hide the bottom sheet and show body vertical scrollbar
    // const hideBottomSheet = () => {
    //     bottomSheet.classList.toggle("show");
    // }
    // for (i of dragIcons) {
    //     i.addEventListener("mousedown", hideBottomSheet);
    //     i.addEventListener("touchstart", hideBottomSheet);
    // }

    // // document.addEventListener("mousemove", dragging);
    // // document.addEventListener("mouseup", dragStop);


    // // document.addEventListener("touchmove", dragging);
    // // document.addEventListener("touchend", dragStop);

    // sheetOverlay.addEventListener("click", hideBottomSheet);
    // showModalBtn.addEventListener("click", showBottomSheet);
    // // bottomSheet.addEventListener("mousedown", hideBottomSheet)
    const handleBtnClick = e => {
        // console.log(e.target.id)
        // console.log(e.target.classList.toggle("checked"))
        // console.log(e.target.textContent)

        setCheckedBtn(e.target.textContent) // Выделяем новую кнопку цветом

        useTimeLogContext.current.hours = e.target.textContent // Устанавливаем выбранное пользователем кол-во часов
        let date = useTimeLogContext.current.date
        useTimeLogContext.current.timenodes.forEach(el => { // Обновляем также в общем списке
            el.hours = el.date == date ? Number(e.target.textContent) : el.hours
        })

        useTimeLogContext.current.date = null
        useTimeLogContext.current.hours = null


        setBtnGridVisible(false) // Убираем панель
        // useTimeLogContext.btnGrid[1](false)
        // $.datepicker_updateDatepicker(e)
        // useTimeLogContext.datepicker._setDate(useTimeLogContext.inst, )
        var id = "#" + useTimeLogContext.inst.id.replace( /\\\\/g, "\\" );
        var target = $(id)
        console.log(target)
        // useTimeLogContext.datepicker._refreshDatepicker(target)

        // console.log("[ Выход из контекста выбора часов] - ДО", s.datesText)
        // Видим datepickerExtension
        console.log(useTimeLogContext.datepicker.dpDiv.data("datepickerExtensionRange"))
        var s = useTimeLogContext.datepicker.dpDiv.data("datepickerExtensionRange");
        //
        // useTimeLogContext.datepicker( "refresh" )
        // var i = true // noChange для какой-то проверки, хз
        // var inst = useTimeLogContext.inst


        useTimeLogContext.current.timenodes.forEach(node => {
            // CTX - AUTOFILL PREDEFINED DATA
            // Либо изначально добавлять в current.timenodes только те timenodes, которые подходят под все выбранные фильтры.

                // 1. el.hours != null. Тогда выделяем ячейку и указываем время на отрисовках.
                // 2. el.hours == null. Тогда снимаем выделение у ячейки и не указываем время на отрисовках.

            if (node.smena == useTimeLogContext.current.smena && node.workType == useTimeLogContext.current.workType) {
                if (node.hours != null) {
                    // console.log(useTimeLogContext.current)
                    console.log("очередная pre-defined date", node)
                    // console.log("очередная pre-defined date", node.date)
                    let date = node.date.split(".")
                    let e = new Date(date[2], date[1]-1, date[0]) // e - очередная дата в формате new Date()
                    $('#date_range').datepicker( "setDate", e )
                    // s.fillDay(e, [true, ''])
                    // n._setDate(t, e, i) //, s.dates.push(n._getDate(t)), s.datesText.push(n._formatDate(t));
                }

            }

        })
        // n._inlineDatepicker( target, inst )
        // var date = new Date()
        // n._setDateDatepicker( target, date )
        $('#date_range').datepicker( "refresh" )
        // $( "#date_range" ).datepicker( "destroy" );
        // $( "#date_range" ).datepicker( "hide" );
        // $( "#date_range" ).datepicker( "show" );
        setCheckedBtn(null)
        console.log("[ Выход из контекста выбора часов]", useTimeLogContext)
        // console.log("[ Выход из контекста выбора часов] - После", s.datesText)


    }
    const [btnGridVisible, setBtnGridVisible] = useState(false)
    const [checkedBtn, setCheckedBtn] = useState(null)

    const setCurrentTimenodesByDate = (useTimeLogContext, date, hours) => {
        if (date) useTimeLogContext.current.date = date // Устанавливаем фокус на выбранную дату
        useTimeLogContext.current.timenodes.forEach(el => { // Устанавливаем фокус на хранящееся число отработанных часов для последующей отрисовки
            if (el.date == date) {
                useTimeLogContext.current.hours = el.hours
                console.log("el.hours", el.hours)
                setCheckedBtn(el.hours) // Выделяем новую кнопку цветом
                console.log("checkedBtn", checkedBtn)
            }
        })

        console.log("[ Вход в контекст выбора часов]", useTimeLogContext)
    }

    useTimeLogContext.setCurrentTimenodesByDate = setCurrentTimenodesByDate
    useTimeLogContext.btnGrid = [btnGridVisible, setBtnGridVisible]
    useTimeLogContext.checkedBtn = [checkedBtn, setCheckedBtn]

    const removeHoursData = (e) => {
        let date = useTimeLogContext.current.date
        useTimeLogContext.current.timenodes.forEach(el => {

            el.hours = el.date == date ? null : el.hours
            if (el.smena == useTimeLogContext.current.smena && el.workType == useTimeLogContext.current.workType) {
                if (el.date != date) {
                    // console.log(useTimeLogContext.current)
                    console.log("очередная pre-defined date remove", el)
                    // console.log("очередная pre-defined date", el.date)
                    let date = el.date.split(".")
                    let e = new Date(date[2], date[1]-1, date[0]) // e - очередная дата в формате new Date()
                    $('#date_range').datepicker( "setDate", e )
                    // s.fillDay(e, [true, ''])
                    // n._setDate(t, e, i) //, s.dates.push(n._getDate(t)), s.datesText.push(n._formatDate(t));
                }

            }
        })
        $('#date_range').datepicker( "refresh" )

        setCheckedBtn(null)
        setBtnGridVisible(!btnGridVisible)
        console.log(useTimeLogContext)
        // $.datepicker_updateDatepicker(e)
    }
    return  (
        <Fragment>
                <div id="myModal" className={btnGridVisible ? "modal show" : "modal"}>
                {/* <div id="myModal" class="modal show"> */}
                    <div class="sheet-overlay"></div>
                    <div class="modal-content">
                        <div class="btn_container">
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
