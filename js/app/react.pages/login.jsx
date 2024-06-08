
const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const PageTitle = "LoginPage"
    // const fromPage = location.state?.from?.pathname || "/"
    const fromPage = location.state.from.pathname


    const {signin} = useContext(AuthContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target
        const user = form.username.value

        signin(user, () => navigate(fromPage, {replace: true}));
    }
    const renderCanvas = () => {
        return (
            <Fragment>
                <h1>Войти</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name: <input name="username" />
                    </label>
                    <button type="submit">Войти</button>
                </form>
                {fromPage}
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
    const header = (handler) => {
        return (
            <div class="header" id="header_main">
                <div className="nav_left"> {navLeft(handler) || null}</div>
                <div class="header_title"> {state.pageTitle || "Нету названия"} </div>
                <div className="nav_right"> {navRight(handler) || null}</div>
            </div>
        )
    }
    // context = usePageContext()
    return AppCanvas({
        renderCanvas: renderCanvas,
        pageTitle: state.pageTitle,
        navLeft: navLeft,
        navRight: navRight,
        head: header
       })
}
