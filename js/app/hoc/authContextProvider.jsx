
const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [user, setUser] = useState('guest')

    const signin = (user, cb) => {
        setUser(user)
        cb()
    }
    const signout = (cb) => {
        console.log(user)
        setUser('guest')
        console.log(user)
        cb()
    }

    const value = {user, signin, signout}

    return (
            <AuthContext.Provider value={value}>
            {children}
            </AuthContext.Provider>
        )
}

function useAuth() {
    return useContext(AuthContext)
}


const RequireAuth = ({children}) => {
    const location = useLocation()

    // По идее, мы должны хранить данные об успешной авторизации в IDB,
    // чтобы при перезагрузке страницы авторизация не слетала.
    //
    const {user} = useContext(AuthContext) // Заменить на readLocalDatabase({targetData: "user"})
    // readLocalDatabase({cellName: "user"})
    // Но чтобы одновременно и useContext использовался и корректировался бы, либо отказаться от useContext вообще?
    const isAuthenticated = user != 'guest'

    // Запрашиваем данные по пользователю у хоста
    useEffect(() => {
        if (isAuthenticated) {
            loadHostedUserData(user)
        }
    }, [isAuthenticated])

    // Если не залогинен, то перенаправляем на страницу логина
    if(user == 'guest'){
        return <Navigate to='/login' state={{from: location}}/>
    } // Если залогинен, то открываем рендер вложенных блоков
    return <Fragment>{children}</Fragment>
}
