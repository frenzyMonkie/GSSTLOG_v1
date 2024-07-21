var objects = [
    {name: "Силикатный пр-д", type: "Водопонижение", contractor:"МСТ", isSelected: false, keyID: 1},
    {name: "Амурская", type: "Водопонижение", contractor:"Самолёт", isSelected: false, keyID: 2},
    {name: "Кронштадский пр-д", type: "Проходка", contractor:"ЗИЛ", isSelected: true, keyID: 3},
    {name: "Кульнева", type: "ГНБ", contractor:"Смайнекс", isSelected: false, keyID: 4},
    {name: "Тимирязевская", type: "Проходка", contractor:"МСТ", isSelected: true, keyID: 5},
    {name: "3-я Парковая", type: "Водопонижение", contractor:"МСТ", isSelected: false, keyID: 6},
    {name: "Загорская ГАЭС-2", type: "Водопонижение", contractor:"Смайнекс", isSelected: false, keyID: 7},
    {name: "Камова 24", type: "Водопонижение", contractor:"Самолёт", isSelected: true, keyID: 8},
    {name: "Амбер-Сити", type: "Водопонижение", contractor:"Самолёт", isSelected: false, keyID: 9},
    {name: "Ташкентская", type: "Водопонижение", contractor:"ЗИЛ", isSelected: false, keyID: 10},
] // .sort() лучше вообще сделать так, чтобы изначально с сервера приходил отсортированный по именам.
var workers = [
    {keyID: 1, name: "Авплетий Ничан Пастырович", band: "Рябов", isFav: false, selectedInObjects: [5, 8],
        timenodes: [
            {date: "06.06.2024", hours: 12, object: "Тимирязевская",smena:"Ночные смены", workType:"Бурение"},
            {date: "06.06.2024", hours: 12, object: "Тимирязевская", smena:"Дневные смены", workType:"Бурение"},
            {date: "07.06.2024", hours: null, object: "Тимирязевская", smena:"Дневные смены", workType:"Замывка"},
            {date: "08.06.2024", hours: 8, object: "Тимирязевская", smena:"Дневные смены", workType:"Дежурство"}
    ],},
    {keyID: 2, name: "Ахмедов Ахмед Ахмедович", band: "Дьячков", isFav: true, selectedInObjects: [], timenodes: [],},
    {keyID: 3, name: "Джованни Джорджо Яковлевич", band: "Дьячков", isFav: false, selectedInObjects: [], timenodes: [],},
    {keyID: 4, name: "Захаров Дмитрий Алексеевич", band: "Геоспецстрой", isFav: true, selectedInObjects: [], timenodes: [],},
    {keyID: 5, name: "Мухатгалиев Якубджон Джамшут-оглы", band: "Дьячков", isFav: false, selectedInObjects: [], timenodes: [],},
    {keyID: 6, name: "Нагорный Ламинат Горыныч", band: "Данченко", isFav: false, selectedInObjects: [], timenodes: [],},
    {keyID: 7, name: "Сальчичон Балык Хамонович", band: "Дьячков", isFav: false, selectedInObjects: [], timenodes: [],},
    {keyID: 8, name: "Смешной Егор Егорович", band: "Ражабов", isFav: true, selectedInObjects: [], timenodes: [],},
    {keyID: 9, name: "Якубенко Владислав Игоревич", band: "Илькевич", isFav: true, selectedInObjects: [], timenodes: [],},
]     // .sort() лучше вообще сделать так, чтобы изначально с сервера приходил отсортированный по именам.

function App () {
    var smenaOptions = ["Дневные смены", "Ночные смены"]
    var workTypeOptions = ["Дежурство", "Монтаж", "Сварка", "Бурение", "Невыходы", "Выходные"]
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
                TLctx.user.userID = json.userID
                TLctx.initialState = {
                    objects: json.objects,
                    workers: json.workers,
                    userID: json.userID,
                }
                }
            )
            .catch(
                TLctx.initialState = {
                    objects: objects,
                    workers: workers,
                    userID: TLctx.user.userID,
                }
            )
    }
    const TLctx = React.useContext(TimeLogContext) // Берем контекст
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
                    <Route path="WorkerTableFilter_Smena" element={<WorkerTableFilter filterCategory="smena" filterVals={smenaOptions} />}/>
                    <Route path="WorkerTableFilter_WorkType" element={<WorkerTableFilter filterCategory="workType" filterVals={workTypeOptions} />}/>

                    <Route path="SendMenu" element={<SendMenu SendMenuOptions={SendMenuOptions}/>} />

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
