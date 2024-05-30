// Компонент "Главная страница"

// const [user, setUser] = useState('someText')
// const allContextData = {user, setUser}
// const PageContext = createContext()

// function usePageContext() {
//     return useContext(PageContext)
// }
// const pageContext = usePageContext()
// console.log(pageContext)

const PageComponent = (props) => {

    const state = {
        pageTitle: "АО Геоспецстрой",
        currentObject: "",
        currentObjectCustoms: {},
        formData: {},
        formLabel: "PageComponent",
        backPage: "/Main",
        nextPage: "/Main",
        const: {Spendables: [], MeasureUnits: [] },
    }
    // context = pageContext
    // idb = useIDB(null)

    const onPageLoad = () => {}
    const onPageRefresh = () => {}
    const onPageClose = () => {}
    const onFormEdit = () => {}
    const onFormSubmit = () => {}
    const onFormReset = () => {}
    const onErrEvent = () => {}
    const onSuccEvent = () => {}
    const onCautionEvent = () => {}
    const navLeft  = ({children}) => {return (
        <Fragment>
        {children}
        </Fragment>
    )}
    const navRight  = ({children}) => {return (
        <Fragment>
        {children}
        </Fragment>
    )}
    const renderCanvas = ({children}) => {
        return (
            <Fragment>
            {children}
            </Fragment>
    )}

    const render = (props) => {

        return (
             <Fragment>
                {AppCanvas({
                    renderCanvas: props.renderCanvas,
                    pageTitle: props.pageTitle || state.pageTitle,
                    navLeft: props.navLeft,
                    navRight: props.navRight
                })}
            </Fragment>

        )
    }
    // onMount
    useEffect(() => {
        console.log('MyComponent onMount');
        return () => {
          console.log('MyComponent onUnmount');
          // например, отрисовать pop-up в стиле "Сохранить изменения?" - но только в случае если не нажата "Сохранить" и есть изменения в данных.
      };
  }, []);
    // onSomeUpdate
//     [counter, setCounter] = useState()
//     useEffect(() => {
//         // action here
//    }, [counter]); // checks for changes in the values in this array
    return render(props)

}
// 1.q Чем отличается this.state от useContext
// 1.a Хз, насчет this.state есть вопросы, что с этим делают обычно.
// 2.q Откуда (про место в потоке исполения, функцию идет речь) будут пробрасываться данные и куда, в this.state или в useContext, который будет крепиться к this.state
// 2.a Функция внутри класса компонента должна подтягивать данные и записывать в DOM при необходимости, значит она и будет вызывать все эти абстрактные dbsync, fetch.
// Получается ирерархия компонентов, но каждый просто импортом а не пробрасыванием подключается ко всем ассистентам.
