
    const multidatepicker = (useTimeLogContext) => {
        console.log("useTimeLogContext", useTimeLogContext)
        $('#date_range').datepicker({
            // !!!!!!!!!!!!!!!!!!!! Ключевой момент тут - отрисовка хранящихся на сервере дат.
            useTimeLogContext: useTimeLogContext,
            timenodes: useTimeLogContext.timenodes, // Нужно залезать в исходный код календаря и механически проставлять туда классы "selected" на основе входящих timenodes.
            init: true,
            showWeek: false, // При нажатии на номер недели чтобы вся неделя выделялась - сделать...
            range: 'multiple', // режим - выбор нескольких дат
            maxDate: "+0",
            minDate: new Date('@minDate'),
            minDate: '-3 month', // Есть ли смысл, хз, т.к. для админа нужен выбор любой даты...
            //   range_multiple_max: '30', // макимальное число выбираемых дат
            onSelect: function(dateText, inst, extensionRange) {
                // extensionRange - объект расширения
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
                var tnodes = []

                // {date: '28.03.2026', smena: 'День', workType: 'Дежурство', workHours: 12}
                // Можно и сводную делать {smena: 'День', workType: 'Дежурство', dates: [{date: '28.03.2026', workHours: 12},{date: '29.03.2026', workHours: 12},{}]}
                if (extensionRange.datesText) {
                    extensionRange.datesText.forEach(element => {
                        tnodes.push({date: element, hours: "some", "smena": useTimeLogContext.current.smena, "workType": useTimeLogContext.current.workType})
                    });
                    // var ret = {}
                    // ret[focusedName] = tnodes
                    useTimeLogContext.current.timenodes = tnodes
                }

                console.log("Datepicker inner ", useTimeLogContext)
            }
            });
    }

// Вроде как можно попробовать привязаться через useEffect и getElById("worktype"), getElById("smena")
// Вариант с интегрировонием (может не пройти) - прокидывать туда jsx-компонент с привязанными хендлерами, которые в свою очередь связаны с контекстом, в котором будет фамилия и сохранение данных.
var onClick = (w) => {
    // event.preventDefault();
    // props.handleSubmit(this.state);
    // console.log("onSave", this.state)
    // this.setState(this.initialState); // Тут не нужно сбрасывать. Наоборот, значения должны сохраняться.
    console.log("Показать боттом-меню выбора ", w)
    console.log("При выборе из списка - обновить значение в контексте для хранения данных формы, обновить отображаемое значение ", w)
    console.log("Для этого нужно использовать useContext с готовым useState внутри")
}

const filters_inject = (useTimeLogContext) => {
    // const useTimeLogContext = React.useContext(TimeLogContext) // Берем контекст
    var smena = "<div class='calendFilter' id='calendar_smena' onclick='onClick()'><i class='task_item_arr calendar_menu_arr fi fi-br-angle-small-right'></i><div>Дневные смены</div>" + "</div>"
    var wtype = "<div class='calendFilter' id='calendar_worktype' onclick='onClick()'><i class='task_item_arr calendar_menu_arr fi fi-br-angle-small-right'></i><div>Дежурство</div>" + "</div>"
    var name = "<div class='calendFilter' id='calendar_workername' onclick='onClick()'> <div class='workername'>Сотрудник:</div><div>" + useTimeLogContext.current.worker.name + "</div></div>"
    var object = "<div class='calendFilter' id='calendar_object' onclick='onClick()'><div class='obj'>Объект:</div>" + "<div>   Силикатный пр-д</div>" + "</div>"

    return (
        "<div class='calendFilters'>" + name + object +"<div class='calendarFilterSection'>"  + wtype + smena + "</div>" + "</div>"
    )
}
const filters = (useTimeLogContext) => {
    // const useTimeLogContext = React.useContext(TimeLogContext) // Берем контекст
    var smena = <div class='calendFilter' id='calendar_smena' onclick='onClick()'><i class='task_item_arr calendar_menu_arr fi fi-br-angle-small-right'></i><div>Дневные смены</div></div>
    var wtype = <div class='calendFilter' id='calendar_worktype' onclick='onClick()'><i class='task_item_arr calendar_menu_arr fi fi-br-angle-small-right'></i><div>Дежурство</div></div>
    var name = <div class='calendFilter' id='calendar_workername' onclick='onClick()'> <div class='workername'>Сотрудник:</div><div>{useTimeLogContext.current.worker.name}</div></div>
    var object = <div class='calendFilter' id='calendar_object' onclick='onClick()'><div class='obj'>Объект:</div><div>Силикатный пр-д</div></div>

    return (
        <div class='calendFilters'>{name}{object}<div class='calendarFilterSection'>{wtype}{smena}</div></div>
    )
}
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
//         console.log(1, this.props.useTimelogContext.workers[0][0])
//         const calendarData = this.props.useTimelogContext.workers[0][0];

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
//         console.log(123, this.props.useTimeLogContext)
//         multidatepicker(this, this.props.useTimeLogContext)
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
const MultidateCalendar = (props) => {
    // console.log("123", props)
    var initialState = []
    var state = initialState;

    // При сохранении, выходе, изменении параметров workType, smena - нужно сохранять current.timenodes в контекст соответствующего рабочего, в т.ч. в базу данных.
    const useTimeLogContext = props.useTimeLogContext
    const onSave = event => {

        event.preventDefault();
        props.handleSubmit(state);
        console.log("onSave", state)
        // this.setState(initialState); // Тут не нужно сбрасывать. Наоборот, значения должны сохраняться.
    }

    useEffect(() => { // Устанавливаем пресетные значения
        const onMount = async () => {
            // console.log(1, props.useTimelogContext.workers[0][0])
            // const calendarData = props.useTimelogContext.workers[0][0];
            // this.setState(calendarData) // Этап стартовой загрузки данных, предварительно запрошенных из БД
            // console.log(123, props.useTimeLogContext)
            multidatepicker(props.useTimeLogContext)
        };
        onMount()
    }, []); // https://maxrozen.com/learn-useeffect-dependency-array-react-hooks
    console.log(props.useTimeLogContext)
    const headInfo = filters(useTimeLogContext)
    const render = () => {
            // const { characterData, removeCharacter } = props;
            return (
                <Fragment>
                {headInfo}
                    <form onSubmit={onSave}>
                    <div>
                        <div id="date_range"></div>
                        <br/>
                        {/* <textarea name="multipleDate"></textarea>
                        <button type="submit"  class="calendar_approve">
                            Добавить
                        </button> */}
                    </div>
                </form>
                </Fragment>

        );
    }
    return render();
}


const Calendar = () => {
    const useTimeLogContext = React.useContext(TimeLogContext) // Берем контекст
    const state = {
        // Номер проводки (ключ), Дата внесения, номер записи
        // номер записи (ключ),  Дата отчёта, Ответственный, Объект, Сотрудник, Смена, Вид работ, Часы.
        calendar_data: [{
            "Смешной Андрей Яковлевич":  [{
                date: "28.03.2026",
                smena: "День",
                workType: "Дежурство",
                workHours: 12,
            }, {
                date: "28.03.2026",
                smena: "День",
                workType: "Монтаж",
                workHours: 12,
        }]
    }]
    };

    // Для завершения редактирования
    const handleSubmit = character => {
        console.log(character)
        // console.log("character", [...this.state.characters, character])
        this.setState({characters: [...this.state.characters, character]});
        }

    // Для обновления данных по клику на выбранную дату
    const handleSubmit_calendar = new_data => {

        this.props.currentWorker
        this.props.calendar_data

        console.log("new_data", new_data)
        // if (!this.state.calendar_data.some(element => element !== undefined)) {
        this.setState({calendar_data: [...this.state.calendar_data, new_data]});
        // }

        // О боже мой я бал js почему так сложно
        if (this.state.calendar_data.length > 0) {
            this.state.calendar_data.forEach((block) => {
            if (block.name === new_data.name) {
            console.log("block.name", new_data.name)
                this.setState({calendar_data: [...this.state.calendar_data.pop(block), new_data]}); // Что-то не проходит, не совсем понимаю почему
            } else {
            this.setState({calendar_data: [...this.state.calendar_data, new_data]});
            }
            });
        } else {
            this.setState({calendar_data: new_data});
        }
        // this.setState({calendar_data: [...this.state.calendar_data, new_data]});
    }
    const parseContextNames = (useTimelogContext) => {
        var ret = [] // Просто выдираем имена из контекста
        for (var uniqueWorker of useTimelogContext.workers) {
            ret.push(uniqueWorker.name)
        }
        return ret
    }
    const render = () => {
        // const useTimelogContext = React.useContext(TimeLogContext) // Берем контекст
        // names = parseContextNames(useTimelogContext)
        const { calendar_data } = state; // Извлекаем ссылку на calendar_data из реестра.
        console.log(calendar_data)

        // useTimelogContext.workers.push([...calendar_data]) // Некие данные загружены. Пушим их в контекст.
        // var currentWorker = Object.keys(useTimelogContext[0][0])[0] // Ищем выбранного рабочего (здесь необяхательно, из контекста можно вытащить потом)
        // console.log(currentWorker)

        return (
                                <div className="container">
                                <MultidateCalendar
                                    // currentWorker={currentWorker}
                                    // calendarData={calendar_data}
                                    handleSubmit={handleSubmit_calendar}
                                    useTimeLogContext = {useTimeLogContext} />
                                    {/* <Form
                                    //   characterData={characters}
                                        handleSubmit={this.handleSubmit} /> */}
                                </div>
        );
  }
  return render()
}
