// $(function(e) {

    multidatepicker = (that) => {

        $('#date_range').datepicker({
            init: true,
            showWeek: false, // При нажатии на номер недели чтобы вся неделя выделялась - сделать...
            range: 'multiple', // режим - выбор нескольких дат
            maxDate: "0",
            maxDate: "+10",
            minDate: new Date('@minDate'),
            //   range_multiple_max: '30', // макимальное число выбираемых дат
            onSelect: function(dateText, inst, extensionRange) {
                // extensionRange - объект расширения
                $('[name=multipleDate]').val(extensionRange.datesText.join('\n'));

                // Объект, временно хранящий состояния календаря.
                // Следовательно, нужно прикрепить его к общему useState.
                // Каков будет механизм
                // Сформировать (из предварительно заполненных и сохраненных в useState & cookies блоков, preview + presend-select) -> Отправить (-> jsonify -> post request) -> Подтверждение (Статус доставки) -> История (список отправленных)
                // var extensionRange = $('#date_range').datepicker('widget').data('datepickerExtensionRange');
                // if (extensionRange.datesText) console.log(extensionRange.datesText);
                that.setState({dates: extensionRange.datesText})
                var tnodes = []
                extensionRange.datesText.forEach(element => {
                    tnodes.push({date: element, hours: "some"})
                });
                that.setState({timenodes: tnodes})

                console.log("Datepicker inner ", that.state)
            }
            });
    }




    // Нужно ограничивать календарь помесячно. Заполнил месяц, месяц прошел - открывается новый. Чтобы не было сложностей с уже заполненными предыдущими месяцами.
    // Плюс, возможно, кнопки "Закрыть 01-15" "Закрыть 16-30". Чтобы кнопка = подпись. Можно даже сделать чтобы в чат скидывался pdf и псевдоподпись.

    // выделить послезавтра и следующие 2 дня
    // $('#date_range').datepicker('setDate', ['-1d']);
    // $.datepicker._clearDate( e.target );

    // $('#date_range').find(".ui-datepicker-current-day").removeClass("ui-datepicker-current-day"); // this actually removes the highlight
    // объект расширения (хранит состояние календаря)


// });

// $( function() {
// $( "#datepicker").datepicker( $.datepicker.regional[ "ru" ] );
// // $( "#locale" ).on( "change", function() {
// //     $( "#datepicker" ).datepicker( "option",
// //     $.datepicker.regional[ $( this ).val() ] );
// // });
// } );
