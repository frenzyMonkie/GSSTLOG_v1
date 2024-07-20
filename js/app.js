function App () {
    var smenaOptions = ["Дневные смены", "Ночные смены"]
    var workTypeOptions = ["Дежурство", "Монтаж", "Сварка", "Бурение"]

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
