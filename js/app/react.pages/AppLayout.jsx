
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

    return (
        <Fragment>
                <div class="header" id="header_main">

                <div className="nav_left"> {props.navLeft(handlePageData) || null}</div>
                <div class="header_title"> {props.pageTitle || "Нету названия"} </div>
                <div className="nav_right"> {props.navRight(handlePageData) || null}</div>

                </div>
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


    return (
        <Fragment>
            <Outlet />
            <div class="nav_footer">
                <nav>
                    <Link to="/"><button>Home</button></Link>
                    <hr />
                    <Link to="/contacts"><button>Contacts</button></Link>
                    <button onClick={goBack}>Обратно</button>
                </nav>
                <div class="nav_main" id="nav_main">
                    <div class="menu menu_s">
                        <button onClick={goMainPage} class="menu_item_s" id="presets">
                            <i class="fi fi-sr-input-numeric"></i>
                            Главная
                        </button>
                        <button onClick={goReportCorrectionPage} class="menu_item_s" id="report_corrections">
                            <i class="fi fi-sr-input-numeric"></i>
                            Корректировка отчётов
                        </button>
                        <button onClick={goOldReportsPage} class="menu_item_s" id="get_reports">
                            <i class="fi fi-sr-input-numeric"></i>
                            История отчётов
                        </button>
                        <button onClick={goSettingsPage} class="menu_item_s" id="personal">
                            <i class="fi fi-sr-input-numeric"></i>
                            Настройки
                        </button>
                    </div>
                </div>
                <div class="nav_current" id="nav_tasks"></div>
            </div>
            </Fragment>
    )
}


