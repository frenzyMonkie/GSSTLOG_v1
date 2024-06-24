

const ButtonGrid = () => {
    const useTimeLogContext = React.useContext(TimeLogContext) // Берем контекст
    const [btnGridVisible, setBtnGridVisible] = useState(false)
    const [checkedBtn, setCheckedBtn] = useState(null)
    useTimeLogContext.btnGrid = [btnGridVisible, setBtnGridVisible]
    useTimeLogContext.checkedBtn = [checkedBtn, setCheckedBtn]
    const [currentDate, setCurrentDate] = useState(null)
    useTimeLogContext.currentDate = [currentDate, setCurrentDate]

    const setCurrentTLOGDate = (useTimeLogContext, date, hours) => {
        if (date) useTimeLogContext.current.date = date // Устанавливаем фокус на выбранную дату
        useTimeLogContext.currentDate[1](date)
        // let date = useTimeLogContext.currentDate[0]
        let object = useTimeLogContext.current.object
        let smena = useTimeLogContext.current.smena
        let workType = useTimeLogContext.current.workType
        useTimeLogContext.current.timenodes.forEach(item => { // Устанавливаем фокус на хранящееся число отработанных часов для последующей отрисовки
            let totalMatch = item.date == date && item.object == object && item.smena == smena && item.workType == workType
            let contextMatch = item.object == object && item.smena == smena && item.workType == workType
            if (totalMatch) {
                // if (item.date == date) {
                    useTimeLogContext.current.hours = item.hours
                    setCheckedBtn(item.hours) // Выделяем новую кнопку цветом
                // }
            }
        })
        $('#date_range').datepicker( "refresh" )
        console.log("[ Вход в контекст выбора часов]", useTimeLogContext)
    }
    useTimeLogContext.setCurrentTLOGDate = setCurrentTLOGDate

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
    const goBack = e => {
        updateDatepicker(e, "back")
        cleanupAndRefresh();
        // setTimeout(() => {  }, 100);
    }

    const cleanupAndRefresh = () => {
        // Поскольку выходим из контекста выбора, обнуляем и обновляем всё что требуется
        useTimeLogContext.current.date = null
        useTimeLogContext.current.hours = null

        setCheckedBtn(null) // Выделяем выбранную пользователем кнопку цветом
        setBtnGridVisible(false) // Убираем панель
        console.log("[ Выход из контекста выбора часов]", useTimeLogContext)
        $('#date_range').datepicker( "refresh" )

    }

    const updateDatepicker = (e, action) => {

        // let date = useTimeLogContext.currentDate[0]
        let currentDate = useTimeLogContext.current.date
        let object = useTimeLogContext.current.object
        let smena = useTimeLogContext.current.smena
        let workType = useTimeLogContext.current.workType

        // Устанавливаем выбранное пользователем кол-во часов
        let newHours = action == "update" ? Number(e.target.textContent)
        : action == "remove" ? null
        : action == "back" ? useTimeLogContext.current.hours
        : null
        useTimeLogContext.current.hoursAction = action

        let totalMatchFound = false
        useTimeLogContext.current.timenodes.forEach(item => {
            let filtersMatch = item.object == object && item.smena == smena && item.workType == workType
            let totalMatch = item.date == currentDate && filtersMatch
            totalMatchFound = totalMatch ? true : totalMatchFound
            // console.log(item, totalMatchFound)
            item.hours = totalMatch ? newHours : item.hours // Устанавливаем выбранное пользователем кол-во часов также в общем списке

            if (filtersMatch) {
                // console.log("next", item)
                if (action == "update" ? (item.hours != null) : action == "remove" ? (item.date != currentDate) : action == "back" ? true : false) {
                    // console.log("next", item)
                    // console.log(useTimeLogContext)
                    let date = item.date.split(".")
                    let e = new Date(date[2], date[1]-1, date[0]) // e - очередная дата в формате new Date()
                    $('#date_range').datepicker( "setDate", e )  // Устанавливаем для календаря отрисовку выбранной даты со всеми классами
                }
            }
        })
        // console.log('totalMatchFound check. hours: ', newHours)
        if (!totalMatchFound ) {
            // console.log('totalMatchFound => push ', totalMatchFound)
            var item = {
                date: currentDate,
                hours: newHours,
                object: useTimeLogContext.current.object,
                smena: useTimeLogContext.current.smena,
                workType: useTimeLogContext.current.workType,
            }

            // let contextMatch = el.object == object && el.smena == smena && el.workType == workType && el.hours != null
            // if (contextMatch) {
                if (action == "update" ? (item.hours != null) : action == "remove" ? (item.date != currentDate) : action == "back" ? true : false) {
                    // console.log('tmf', totalMatchFound)
                    // console.log("el2", el)
                    // console.log(useTimeLogContext)
                    let date = item.date.split(".")
                    let e = new Date(date[2], date[1]-1, date[0]) // e - очередная дата в формате new Date()
                    $('#date_range').datepicker( "setDate", e )  // Устанавливаем для календаря отрисовку выбранной даты со всеми классами
                    useTimeLogContext.current.timenodes.push(item)
                }
            // }
        }
        // $('#date_range').datepicker( "setDate", null ) // Для перезапуска и отправки ??

            // useTimeLogContext.current.timenodes.forEach(item => {
            //     if (item.hours == null || item.hours == undefined) {
            //         let index = useTimeLogContext.current.timenodes.indexOf(item);
            //         if (index !== -1) {
            //             useTimeLogContext.current.timenodes.splice(index, 1);
            //         }
            //     }
            // })

            // if (el.hours == null) {
            //     var index = useTimeLogContext.current.timenodes.indexOf(el);
            //     console.log(index)
            //     if (index !== -1) {
            //         useTimeLogContext.current.timenodes.splice(index, 1);
            //     }
            // }



        // Взять все выбранные даты, и если есть новая дата, то добавить её. и
     //    useTimeLogContext.current.timenodes.forEach(node => {
     //     tnodes.push(node.date)
     //     })
     //     // console.log(tnodes.includes(dateText))
     //     if (!tnodes.includes(dateText)) {
     //         useTimeLogContext.current.timenodes.push({
     //             date: dateText,
     //             object: useTimeLogContext.current.object,
     //             smena: useTimeLogContext.current.smena,
     //             workType: useTimeLogContext.current.workType
     //         })
     //     }

        // useTimeLogContext.current.timenodes.filter(item => (item.hours != null))



        //     let hours = action == "update" ? Number(e.target.textContent) : action == "remove" ? null : null
        //     let date = useTimeLogContext.currentDate[0]
        //     let object = useTimeLogContext.current.object
        //     let smena = useTimeLogContext.current.smena
        //     let workType = useTimeLogContext.current.workType
        //     console.log("updateDatepicker", useTimeLogContext.current.timenodes)

        //     // Устанавливаем выбранное пользователем кол-во часов
        //     useTimeLogContext.current.hours = action == "update" ? Number(e.target.textContent) : action == "remove" ? null : null

        //     var out = []
        //     useTimeLogContext.current.timenodes.forEach(el => {
        //         let totalMatch = el.date == date && el.object == object && el.smena == smena && el.workType == workType
        //         el.hours = totalMatch ? hours : el.hours
        //         if (totalMatch) {
        //             if (action == "update" ? (el.hours != null) : action == "remove" ? (el.date != date) : false) {
        //                 console.log("el2", el)
        //                 let date = el.date.split(".")
        //                 let e = new Date(date[2], date[1]-1, date[0]) // e - очередная дата в формате new Date()
        //                 $('#date_range').datepicker( "setDate", e )  // Устанавливаем для календаря отрисовку выбранной даты со всеми классами
        //             }
        //         }

        //     })

        //     let el = []
        //     if (out.length != 0) {
        //         el = out[0]
        //         console.log(out)
        //         console.log(el.date, date,  hours)
        //         let totalMatch = el.date == date && el.object == object && el.smena == smena && el.workType == workType
        //         el.hours = totalMatch ? hours : el.hours // Устанавливаем выбранное пользователем кол-во часов также в общем списке

        //         // Фильтруем по фильтрам, проверяем что у элемента уже проставлено значение часов.
        //         if (totalMatch) {
        //             if (action == "update" ? (el.hours != null) : action == "remove" ? (el.date != date) : false) {
        //                 console.log("el2", el)
        //                 let date = el.date.split(".")
        //                 let e = new Date(date[2], date[1]-1, date[0]) // e - очередная дата в формате new Date()
        //                 $('#date_range').datepicker( "setDate", e )  // Устанавливаем для календаря отрисовку выбранной даты со всеми классами
        //             }
        //         }
        //             // if (node.hours == null) {
        //             //     var index = useTimeLogContext.current.timenodes.indexOf(node);
        //             //     if (index !== -1) {
        //             //         useTimeLogContext.current.timenodes.splice(index, 1);
        //             //     }
        //             // }
        //     } else {
        //         console.log("date", date)
        //         el = {
        //             object: useTimeLogContext.current.object,
        //             smena: useTimeLogContext.current.smena,
        //             workType: useTimeLogContext.current.workType,
        //             date: date,
        //             hours: hours,
        //         }
        //         useTimeLogContext.current.timenodes.push(el)
        //     }



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
                                <div onClick={(e) => goBack(e)} class="quit" id="return">Вернуться</div>
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}
