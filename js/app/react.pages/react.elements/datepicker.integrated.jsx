
    const multidatepicker = (TLctx) => {
        // console.log("[multidatepicker] TLctx", TLctx)
        // К примеру, здесь добавить все уже указанные ноды времени в extensionRange или куда угодно ещё чтобы они отрисовались.


        $('#date_range').datepicker({
            // !!!!!!!!!!!!!!!!!!!! Ключевой момент тут - отрисовка хранящихся на сервере дат.
            TLctx: TLctx,
            timenodes: TLctx.current.timenodes, // Нужно залезать в исходный код календаря и механически проставлять туда классы "selected" на основе входящих timenodes.
            init: true,
            showWeek: false, // При нажатии на номер недели чтобы вся неделя выделялась - сделать...
            range: 'multiple', // режим - выбор нескольких дат
            maxDate: "+12month",
            minDate: new Date('@minDate'),
            minDate: '-3 month', // Есть ли смысл, хз, т.к. для админа нужен выбор любой даты...
            //   range_multiple_max: '30', // макимальное число выбираемых дат
            onUpdateDatepicker: function (dateText, inst, extensionRange) {
                // $('[name=multipleDate]').val(extensionRange.datesText.join('\n'));

            },
            onChangeMonthYear : function () {},
            onClose: function () {},
            onSelect: function(dateText, inst, extensionRange) {
                // extensionRange - объект расширения
                // console.log("extensionRange", extensionRange)
                $('[name=multipleDate]').val(extensionRange.datesText.join('\n'));

                // console.log(extensionRange.datesText.join(' * ')) // 04.06.2024 * 05.06.2024 * 06.06.2024
                // console.log(extensionRange.dates) // Wed Jun 05 2024 00:00:00 GMT+0300 (Москва, стандартное время)
                // console.log(extensionRange.datesText) // ['06.06.2024', '04.06.2024']
                // console.log(dateText) // 28.06.2024
                // console.log(inst.selectedDay) // 28
                // console.log(inst.selectedMonth) // 06
                // console.log(inst.selectedYear) // 2024
                // Объект, временно хранящий состояния календаря.
                // Следовательно, нужно прикрепить его к общему useState.
                // Каков будет механизм
                // Сформировать (из предварительно заполненных и сохраненных в useState & cookies блоков, preview + presend-select) -> Отправить (-> jsonify -> post request) -> Подтверждение (Статус доставки) -> История (список отправленных)
                // var extensionRange = $('#date_range').datepicker('widget').data('datepickerExtensionRange');
                // if (extensionRange.datesText) console.log(extensionRange.datesText);

                // TLctx.current.timenode = dateText

                // TLctx.current.timenodes.forEach(el => {
                //     console.log(el.date, dateText)
                //     if (el.date == dateText) {
                //         console.log(el.hours)
                //         TLctx.current.hours =  el.hours
                //         TLctx.checkedBtn[1](el.hours)
                //     }
                // })
                // TLctx.current.timenodes.forEach(el => {
                //     if (el.hours != null) {}
                //     if (TLctx.current.hours != null){
                //         // Если у timenode.hours != null, то выделяем ячейку и рисуем туда кол-во часов.
                //         // Иначе - снимаем выделение у ячейки.
                //     }
                // })


            //    console.log('dateText', TLctx)
            //     console.log('extensionRange', extensionRange)

                // {date: '28.03.2026', smena: 'День', workType: 'Дежурство', workHours: 12}
                // Можно и сводную делать {smena: 'День', workType: 'Дежурство', dates: [{date: '28.03.2026', workHours: 12},{date: '29.03.2026', workHours: 12},{}]}

                // TLctx.current.timenodes.forEach(item => {
                //     if (item.hours == null || item.hours == undefined) {
                //         let index = TLctx.current.timenodes.indexOf(item);
                //         if (index !== -1) {
                //             TLctx.current.timenodes.splice(index, 1);
                //         }
                //     }
                // })

                // }) = TLctx.current.timenodes.filter(item => (item.hours != null && item.hours != undefined));
                var tnodes = []
                // console.log('Datepicker dates', extensionRange.datesText)
                // if (extensionRange.datesText) {
                //     extensionRange.datesText.forEach(dateText => {
                //         // Взять все выбранные даты, и если есть новая дата, то добавить её. и
                //         TLctx.current.timenodes.forEach(node => {
                //             tnodes.push(node.date)
                //         })
                //         // console.log(tnodes.includes(dateText))
                //         if (!tnodes.includes(dateText)) {
                //             TLctx.current.timenodes.push({
                //                 date: dateText,
                //                 object: TLctx.current.object,
                //                 smena: TLctx.current.smena,
                //                 workType: TLctx.current.workType
                //             })
                //         }

                //         // tnodes.push({date: element, smena: TLctx.current.smena, workType: TLctx.current.workType})
                //     });

                //     // CTX - USER UPDATES DATA
                // }
                TLctx.current.date = dateText
                // TLctx.current.timenodes = tnodes
                console.log("Datepicker inner ", TLctx)
                // $('#date_range').datepicker( "refresh" )
            }
            });
    }

// Вроде как можно попробовать привязаться через useEffect и getElById("worktype"), getElById("smena")
// Вариант с интегрировонием (может не пройти) - прокидывать туда jsx-компонент с привязанными хендлерами, которые в свою очередь связаны с контекстом, в котором будет фамилия и сохранение данных.


// const filters_inject = (TLctx) => {
//     // const TLctx = React.useContext(TimeLogContext) // Берем контекст
//     var smena = "<div class='calendFilter' id='calendar_smena' onclick='onClick()'><i class='task_item_arr calendar_menu_arr fi fi-br-angle-small-right'></i><div>Дневные смены</div>" + "</div>"
//     var wtype = "<div class='calendFilter' id='calendar_worktype' onclick='onClick()'><i class='task_item_arr calendar_menu_arr fi fi-br-angle-small-right'></i><div>Дежурство</div>" + "</div>"
//     var name = "<div class='calendFilter' id='calendar_workername' onclick='onClick()'> <div class='workername'>Сотрудник:</div><div>" + TLctx.current.worker.name + "</div></div>"
//     var object = "<div class='calendFilter' id='calendar_object' onclick='onClick()'><div class='obj'>Объект:</div>" + "<div>   Силикатный пр-д</div>" + "</div>"

//     return (
//         "<div class='calendFilters'>" + name + object +"<div class='calendarFilterSection'>"  + wtype + smena + "</div>" + "</div>"
//     )
// }

// filters используется в jquery.datepicker при формировании канваса. можно канвас вытянуть сюда например вместо внедрения туда, не суть.
// Также в канвас придется делать автозаполнение значениями. Сейчас такое уже есть в списке людей, в календаре уже есть хранилище. Нужно повторить и дополнить.

// Нужно ограничивать календарь помесячно. Заполнил месяц, месяц прошел - открывается новый. Чтобы не было сложностей с уже заполненными предыдущими месяцами.
// Плюс, возможно, кнопки "Закрыть 01-15" "Закрыть 16-30". Чтобы кнопка = подпись. Можно даже сделать чтобы в чат скидывался pdf и псевдоподпись.

// выделить послезавтра и следующие 2 дня
// $('#date_range').datepicker('setDate', ['-1d']);
// $.datepicker._clearDate( e.target );

// $('#date_range').find(".ui-datepicker-current-day").removeClass("ui-datepicker-current-day"); // this actually removes the highlight
// объект расширения (хранит состояние календаря)

// class MultidateCalendar extends Component {
//     constructor(props) {
//         super(props);
//         this.initialState = []
//         this.state = this.initialState;
//     }


//     onSave = event => {
//         event.preventDefault();
//         this.props.handleSubmit(this.state);
//         console.log("onSave", this.state)
//         // this.setState(this.initialState); // Тут не нужно сбрасывать. Наоборот, значения должны сохраняться.
//     }

//     componentDidMount() {
//         console.log(1, this.props.TLctx.workers[0][0])
//         const calendarData = this.props.TLctx.workers[0][0];

//         // const { currentWorker } = this.props
//         // Предполагается пустой или заполненный ммассив данных на входе.
//         // Сымитируем оба варианта.
//         // calendar_data_empty = [{
//         //     id: "",
//         //     name: "some",
//         //     data: [{
//         //       category: "",
//         //       timenodes: [{ date: "", hours: "" }]
//         //     }]
//         // }]
//         // calendar_data_loaded = [{
//         //     id: "1",
//         //     name: "Леонид Диснеевич Каневский",
//         //     data: [{
//         //         workshift: 1,
//         //         category: "Дежурство",
//         //         timenodes: [{ date: "28.04.2024", hours: "24" },{ date: "29.04.2024", hours: "12" }]
//         //     },{
//         //         workshift: 1,
//         //         category: "Монтаж",
//         //         timenodes: [{ date: "29.04.2024", hours: "12" }]
//         //     }]
//         // },{
//         //     id: "2",
//         //     name: "Жорик Капитулович Вартанов",
//         //     data: [{
//         //         workshift: 1,
//         //         category: "Замывка",
//         //         timenodes: [{ date: "28.04.2024", hours: "12" }]
//         //     }]
//         // }]
//         // var arr = []
//         // calendarData.forEach(element => {
//         //   arr.push(element)
//         // });
//         // if (arr.includes(currentWorker)) {
//         //   // 1. Найти объект где currentWorker
//         //   // calendarData[calendarData.indexOf(currentWorker)].data[someindex]
//         //   // 2. Обновить его перечень данных
//         //   // this.setState([...this.state].pop(calendarData.indexOf(currentWorker)), element.data.timenodes)
//         // } else {
//         //     console.log(arr)
//         //   this.setState([...this.state], element.data.timenodes) // Указывать на id выбранного человека
//         // }
//         this.setState(calendarData) // Этап стартовой загрузки данных, предварительно запрошенных из БД
//         console.log(123, this.props.TLctx)
//         multidatepicker(this, this.props.TLctx)
//     }

//     render() {
//             // const { characterData, removeCharacter } = props;
//             return (
//                 <form onSubmit={this.onSave}>
//                     <div>
//                         <div id="date_range"></div>
//                         <br/>
//                         {/* <textarea name="multipleDate"></textarea>
//                         <button type="submit"  class="calendar_approve">
//                             Добавить
//                         </button> */}
//                     </div>
//                 </form>
//         );
//     }
// }



