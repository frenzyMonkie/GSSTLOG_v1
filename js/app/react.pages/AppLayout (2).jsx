
const AppCanvas = (props) => {

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    // const [data, setData] = useState([]);

    // По сути это и есть syncDatabases();
    const onClickDataIterator = (dataPack) => {

        // console.log(dataPack.formLabel)
        // console.log(dataPack.formData)
        for (let contextCell of dataPack.formData) {
            var setData = contextCell.setData
            setData(contextCell.cellData.data)
            console.log(contextCell.cellData.data)
        } // Обновляем состояния в контексте

        // updateDatabases(dataPack)
        // Тут уже в зависисмости от дата-роутинга, поэтому нужен отдельный модуль для этого.
    }

    const handlePageData = async (clickType, dataPack, nextPage, debugvar) => {
        console.log("До", debugvar)
        setLoading(true); // Включаем спиннер
        setErrorMessage(null);
        try {
            if (clickType == "onApply") { onClickDataIterator(dataPack) }
            if (clickType == "onCancel") { onClickDataIterator(dataPack) }
            // onClickDataIterator(dataPack)  // Форма: {keys: {data: data, setData: setData]}
            // const response = await fetch(
            // "https://jsonplaceholder.typicode.com/posts/"
            // );
            // if (!response.ok) {
            // throw new Error("Failed to fetch data");
            // }
            // const res = await response.json();
            // setData(res);
        } catch (error) {
            setErrorMessage("Network error: " + error.message);
        } finally {
            setLoading(false);
            console.log("После", debugvar)
            // showPopup() // success || error || warning
            nextPage();
        }
    };  //   <button onClick={handleFetchClick}>Fetch Data</button>
    console.log(props)
    var head = props.head(handlePageData)

    return (
        <Fragment>
        {head}

                <div className="container">
                { loading ? (
                    <LoadSpinner />
                    ) : errorMessage ? (
                        <div style={{ color: "red" }}>Error: {error}</div>
                    ): (<Fragment></Fragment>)
                    }
                    <div class="content" id="content_main">
                        {props.renderCanvas()}
                    </div>
                </div>
        </Fragment>
    )
}
// const [visible, setVisible] = React.useState(false);
// {/* <button onClick={() => setVisible(true)}>Mount MyComponent</button> */}
// {/* <button onClick={() => setVisible(false)}>Unmount MyComponent</button> */}
// { visible && <LoadSpinner /> } // On/off

const Layout = () => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    //
    const goMainPage = () => navigate("/", {replace: true});
    const goReportPage = () => navigate("/ReportPage");
    const goOldReportsPage = () => navigate("/OldReportsPage");
    const goSettingsPage = () => navigate("/SettingsPage");
    const goReportCorrectionPage = () => navigate("/ReportCorrectionPage");

    const logIn = () => navigate("/login");
    const goHome = () => navigate("/", {replace: true}); // Без записи перехода в историю, может пригодиться.

    const menus = ['mainpage', 'editpage', 'history', 'settings']
    const menuSelected = "mainpage"
    return (
        <Fragment>
            <Outlet />
            <div class="nav_footer">
                {/* <nav>
                    <Link to="/"><button>Home</button></Link>
                    <hr />
                    <Link to="/contacts"><button>Contacts</button></Link>
                    <button onClick={goBack}>Обратно</button>
                </nav> */}
                <div class="nav_main" id="nav_main">
                    <div class="menu menu_s">
                        <div onClick={goMainPage} class="menu_item_s" id="presets">
                            {menuSelected == "mainpage" ? <i class="fi fi-ss-notebook-selected"></i> : <i class="fi fi-ss-notebook"></i>}
                            <div class={menuSelected == "editpage" ? "menu_selected" : null }>Главная</div>
                        </div>
                        <div onClick={goReportCorrectionPage} class="menu_item_s" id="report_corrections">
                            {menuSelected == "editpage" ? <i class="fi fi-ss-notebook-selected"></i> : <i class="fi fi-ss-notebook"></i>}
                            <div class={menuSelected == "editpage" ? "menu_selected" : null }>Корректировка отчётов</div>
                        </div>
                        <div onClick={goOldReportsPage} class="menu_item_s" id="get_reports">
                            {menuSelected == "history" ? <i class="fi fi-rr-time-watch-calendar-selected"></i> : <i class="fi fi-rr-time-watch-calendar"></i>}
                            {menuSelected == "history" ? <div>История отчётов</div> : <div class="menu_selected">История отчётов</div>}
                        </div>
                        <div onClick={goSettingsPage} class="menu_item_s" id="personal">
                            {menuSelected == "settings" ? <i class="fi fi-sr-admin-alt-selected"></i> : <i class="fi fi-sr-admin-alt"></i>}
                            {menuSelected == "settings" ? <div>Настройки</div> : <div class="menu_selected">Настройки</div>}
                        </div>
                    </div>
                </div>
                <div class="nav_current" id="nav_tasks"></div>
            </div>
            </Fragment>
    )
}


