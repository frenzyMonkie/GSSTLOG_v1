var departments = [
    {name: "Энергетическая служба", is_selected: false, id: 1,  },
    {name: "Механическая служба", is_selected: false, id: 2,  },
    {name: "Транспортная служба", is_selected: true, id: 3,  },
] // .sort() лучше вообще сделать так, чтобы изначально с сервера приходил отсортированный по именам.
var objects = [
    {name: "Силикатный пр-д", type: "Водопонижение", contractor:"МСТ", is_selected: false, id: 1,  },
    {name: "Амурская", type: "Водопонижение", contractor:"Самолёт", is_selected: false, id: 2,  },
    {name: "Кронштадский пр-д", type: "Проходка", contractor:"ЗИЛ", is_selected: true, id: 3,  },
    {name: "Кульнева", type: "ГНБ", contractor:"Смайнекс", is_selected: false, id: 4,  },
    {name: "Тимирязевская", type: "Проходка", contractor:"МСТ", is_selected: true, id: 5,  },
    {name: "3-я Парковая", type: "Водопонижение", contractor:"МСТ", is_selected: false, id: 6,  },
    {name: "Загорская ГАЭС-2", type: "Водопонижение", contractor:"Смайнекс", is_selected: false, id: 7,  },
    {name: "Камова 24", type: "Водопонижение", contractor:"Самолёт", is_selected: true, id: 8,  },
    {name: "Амбер-Сити", type: "Водопонижение", contractor:"Самолёт", is_selected: false, id: 9,  },
    {name: "Ташкентская", type: "Водопонижение", contractor:"ЗИЛ", is_selected: false, id: 10,  },
] // .sort() лучше вообще сделать так, чтобы изначально с сервера приходил отсортированный по именам.
var workers = [
    {worker_id: 1, band_type: "OBJ", fullname: "Авплетий Ничан Пастырович", band: "Рябов",  selected_in: [5, 8],
        timenodes: [
            {date: "06.06.2024", hours: 12, object_id: 1, object_name: "Тимирязевская",work_shift:"Ночные смены", work_type:"Бурение"},
            {date: "06.06.2024", hours: 12, object_id: 1, object_name: "Тимирязевская", work_shift:"День", work_type:"Бурение"},
            {date: "07.06.2024", hours: null, object_id: 1, object_name: "Тимирязевская", work_shift:"День", work_type:"Замывка"},
            {date: "08.06.2024", hours: 8, object_id: 1, object_name: "Тимирязевская", work_shift:"День", work_type:"Дежурство"}
    ],},
    {worker_id: 2, band_type: "OBJ", fullname: "Ахмедов Ахмед Ахмедович", band: "Дьячков",  selected_in: [], timenodes: [],},
    {worker_id: 3, band_type: "OBJ", fullname: "Джованни Джорджо Яковлевич", band: "Дьячков",  selected_in: [], timenodes: [],},
    {worker_id: 4, band_type: "OBJ", fullname: "Захаров Дмитрий Алексеевич", band: "Геоспецстрой",  selected_in: [], timenodes: [],},
    {worker_id: 5, band_type: "OBJ", fullname: "Мухатгалиев Якубджон Джамшут-оглы", band: "Дьячков",  selected_in: [], timenodes: [],},
    {worker_id: 6, band_type: "OBJ", fullname: "Нагорный Ламинат Горыныч", band: "Данченко",  selected_in: [], timenodes: [],},
    {worker_id: 7, band_type: "OBJ", fullname: "Сальчичон Балык Хамонович", band: "Дьячков",  selected_in: [], timenodes: [],},
    {worker_id: 8, band_type: "OBJ", fullname: "Смешной Егор Егорович", band: "Ражабов",  selected_in: [], timenodes: [],},
    {worker_id: 9, band_type: "DEP", fullname: "Якубенко Владислав Игоревич", band: "Энергетическая служба",  selected_in: [], timenodes: [],},
]     // .sort() лучше вообще сделать так, чтобы изначально с сервера приходил отсортированный по именам.

function App () {
    var work_shiftOptions = ["День", "Ночные смены"]
    var work_typeOptions = ["Дежурство", "Монтаж", "Сварка", "Бурение", "Невыходы", "Выходные"]
    var SendMenuOptions = [
        {"option":"Табель за месяц", "sub": "Проверить, подтвердить и отправить (себе в личку / в общую группу)"},
        {"option":"Ежедневные отчёты", "sub": "Отправить в чат объекта (все новые дни, которые еще не были отправлены / выбранные вручную по каждому объекту)"}
    ]
    const getUserState = async (TLctx) => {
        var payload = {
            headers: {
                datetime: Math.floor(Date.now() / 1000),
                reqtype: "AUTH_GETUSERSTATE",
            },
            "user_phone": TLctx.user.phone,
            "user_pincode": TLctx.user.PIN,

        }
        var payload = {

                "headers": {},
                "user_phone": "89774763357",
                "user_pincode": "1234"

        }
        await fetch('http://localhost:8080/auth_getstate', {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                // "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(payload)
        })
           .then(response => response.json())
           .then (
                json => {
                console.log(json)
                TLctx.maps = json.maps,
                TLctx.user.userID = json.userID
                TLctx.objects_selected_ids = json.objects_selected_ids
                TLctx.initialState = {
                    maps: json.maps,
                    objects: json.objects,
                    objects_selected_ids: structuredClone(json.objects_selected_ids),
                    workers: json.workers,
                    userID: json.userID,
                }
                }
            )
            .catch(
                TLctx.initialState = {
                    // maps: maps,
                    // objects: objects,
                    // workers: workers,
                    // userID: TLctx.user.userID,
                }
            )
    }
    const TLctx = React.useContext(TimeLogContext) // Берем контекст
    console.log(TLctx)
    TLctx.initialState = {
        objects: objects,
        objects_selected_ids: [1,2],
        workers: workers,
        userID: 1,
    }
    useEffect(() => {
        getUserState(TLctx);
    }, []);
    return (
        <AuthProvider>
        <AppContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* <Route path="*" element={<NotFound />} /> */}
                    <Route index element={<FillDataMain />} />

                    <Route path="CalendarPro" element={<CalendarPro />} />
                    <Route path="TimeLogSelectWorkers" element={<TimeLogSelectWorkers />} />
                    <Route path="TimeLogSelectObjects" element={<TimeLogSelectObjects />} />
                    <Route path="Buttongrid" element={<ButtonGrid />} />
                    <Route path="WorkerTableFilter_work_shift" element={<WorkerTableFilter filterCategory="work_shift" filterVals={work_shiftOptions} />}/>
                    <Route path="WorkerTableFilter_work_type" element={<WorkerTableFilter filterCategory="work_type" filterVals={work_typeOptions} />}/>

                    <Route path="SendMenu" element={<SendMenu SendMenuOptions={SendMenuOptions}/>} />

                    <Route path="TimeLogSelectDepartmnets" element={<TimeLogSelectObjects contextType="DEP"/>} />
                    <Route path="TimeLogSelectIndividuals" element={<TimeLogSelectWorkers contextType="IND"/>} />
                    {/* <Route path="TimeLogSelectIndividuals" element={<TimeLogSelectWorkers contextType="IND"/>} /> */}


                    <Route path="ReportCorrectionPage" element={<ReportCorrectionPage />} />
                    <Route path="OldReportsPage" element={<OldReportsPage />} />
                    <Route path="SettingsPage" element={<SettingsPage />} />
                    <Route path="CustomListsPage" element={<CustomListsPage />} />

                    <Route path="ReportPage" element={<ReportPage />} />
                    <Route path="PumpLog" element={<PumpLog />} />
                    <Route path="SpendingLog" element={<SpendingLog />} />
                    <Route path="StageLog" element={<StageLog />} />
                    <Route path="FillDataMain" element={<FillDataMain />} />
                    <Route path="VehicleLog" element={<VehicleLog />} />
                    <Route path="WaterLog" element={<WaterLog />} />
                    <Route path="WorkLog" element={<WorkLog />} />



                    {/* <Route path="login" element={<LoginPage />} />
                    <Route path="contacts" element={
                        <RequireAuth>
                            <Contacts />
                        </RequireAuth>} />
                    <Route path="protectedсontent" element={<ProtectedContent />} /> */}
                </Route>
            </Routes>
        </AppContextProvider>
        </AuthProvider>
        );
    // }

// </RequireAuth directChild={<Contacts/>} />
}



const Home = () => {
    const appCanvas = AppCanvas // useOutletContext();
    const PageTitle = "Home"
    const renderCanvas = () => {
        return (
            <Fragment>
            </Fragment>
        )
    }
    const navLeft  = () => {
        return (
        <Fragment>
        <i class="header_back fi fi-rr-arrow-small-left"></i>
        </Fragment>
    )}
    const navRight  = () => {
        return (
            <Fragment>
            <i class="header_save fi fi-rs-disk"></i>
            </Fragment>
    )}
    // context = usePageContext()
    return PageComponent({
        renderCanvas: renderCanvas,
        pageTitle: PageTitle,
        navLeft: navLeft,
        navRight: navRight
        })
}

const Contacts = () => {

    const PageTitle = "Contacts"
    const renderCanvas = () => {
        return (
            <Fragment>
                <h2>Переход на защищенный контент. По сути просто страница входа в нашем случае</h2>
                <Link to="/protectedсontent">Войти</Link>
            </Fragment>
        )
    }
    const navLeft  = () => {
        return (
        <Fragment>
        <i class="header_back fi fi-rr-arrow-small-left"></i>
        </Fragment>
    )}
    const navRight  = () => {
        return (
            <Fragment>
            <i class="header_save fi fi-rs-disk"></i>
            </Fragment>
    )}
    // context = usePageContext()
    return PageComponent({
        renderCanvas: renderCanvas,
        pageTitle: PageTitle,
        navLeft: navLeft,
        navRight: navRight
        })
}

const ProtectedContent = () => {
    const appCanvas = AppCanvas // useOutletContext();
    const PageTitle = "ProtectedContent"
    const {signout} = useContext(AuthContext);
    const navigate = useNavigate();
    const renderCanvas = () => {
        return (<button onClick={ () => signout( () => navigate("/", {replace: true}))}>Выйти</button>)
    }
    const navLeft  = () => {
        return (
        <Fragment>
        <i class="header_back fi fi-rr-arrow-small-left"></i>
        </Fragment>
    )}
    const navRight  = () => {
        return (
            <Fragment>
            <i class="header_save fi fi-rs-disk"></i>
            </Fragment>
    )}
    // context = usePageContext()
    return PageComponent({
        renderCanvas: renderCanvas,
        pageTitle: PageTitle,
        navLeft: navLeft,
        navRight: navRight
        })
}

const NotFound = () => {
    const appCanvas = AppCanvas // useOutletContext();
    const PageTitle = "NotFound"
    const renderCanvas = () => {
        return (<h2>Page not found. 404.</h2>)
    }
    const navLeft  = () => {
        return (
        <Fragment>
        <i class="header_back fi fi-rr-arrow-small-left"></i>
        </Fragment>
    )}
    const navRight  = () => {
        return (
            <Fragment>
            <i class="header_save fi fi-rs-disk"></i>
            </Fragment>
    )}
    // context = usePageContext()
    return PageComponent({
        renderCanvas: renderCanvas,
        pageTitle: PageTitle,
        navLeft: navLeft,
        navRight: navRight
        })
}



ReactDOM.render(
    <HashRouter><App /></HashRouter>, document.getElementById('app')
)
