
const AppContext = createContext()

const AppContextProvider = ({children}) => {


    // // Набор изменяемых состояний.
    // const teamMembersNames = ['John', 'Mary', 'Jason', 'David']
    // // С помощью этой функции будут меняться данные при клике на соответствующую кнопку.
    // const [user, setUser] = useState(teamMembersNames)

    // Можно доработать установщики значений, обернув их
    const [appliedVehicles, setEditedVehicles] = useState()
    const setVehicles = (dataPack) => {
        setEditedVehicles(dataPack) // Смысла конечно мало. Но может и пригодятся обертки, кто знает.
    }

    // // Это добавляется при сохранении / отмене
    // const newData = {data: [{vehicleid: 123456789, vehiclename: "Кран 25 тонн", hours: 8}, {vehicleid: 123456789, vehiclename: "Кран 25 тонн", hours: 8},], comment: ""}
    // setVehicles(newData)

    const appContext = {
        appliedVehicles: [appliedVehicles, setVehicles],
        // celltwo: [user, signin],
    }

    return (
            <AppContext.Provider value={appContext}>
            {children}
            </AppContext.Provider>
        )
}
