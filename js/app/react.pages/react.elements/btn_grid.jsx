

const ButtonGrid = () => {
    const useTimelogContext = React.useContext(TimeLogContext) // Берем контекст
    // // Select DOM elements
    // const showModalBtn = document.querySelector(".show-modal");
    // const bottomSheet = document.querySelector(".modal");
    // const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
    // const sheetContent = bottomSheet.querySelector(".buttons_grid");
    // const dragIcons = bottomSheet.querySelectorAll(".button_hour");

    // // Show the bottom sheet, hide body vertical scrollbar, and call updateSheetHeight
    // const showBottomSheet = () => {
    //     bottomSheet.classList.toggle("show");
    // }

    // // Hide the bottom sheet and show body vertical scrollbar
    // const hideBottomSheet = () => {
    //     bottomSheet.classList.toggle("show");
    // }
    // for (i of dragIcons) {
    //     i.addEventListener("mousedown", hideBottomSheet);
    //     i.addEventListener("touchstart", hideBottomSheet);
    // }

    // // document.addEventListener("mousemove", dragging);
    // // document.addEventListener("mouseup", dragStop);


    // // document.addEventListener("touchmove", dragging);
    // // document.addEventListener("touchend", dragStop);

    // sheetOverlay.addEventListener("click", hideBottomSheet);
    // showModalBtn.addEventListener("click", showBottomSheet);
    // // bottomSheet.addEventListener("mousedown", hideBottomSheet)
    const handleBtnClick = e => {
        console.log(e.target.id)
        console.log(e.target.classList.toggle("checked"))
        console.log(e.target.textContent)
        setCheckedBtn(e.target.id)
        // setBtnGridVisible(false)
    }
    const [btnGridVisible, setBtnGridVisible] = useState(false)
    const [checkedBtn, setCheckedBtn] = useState(null)
    useTimelogContext.btnGrid = [btnGridVisible, setBtnGridVisible]
    // const btnGridVisible = useTimelogContext.btnGrid[0]
    // const setBtnGridVisible = useTimelogContext.btnGrid[1]
    // console.log(setBtnGridVisible)

    return  (
        <Fragment>
                <div id="myModal" className={btnGridVisible ? "modal show" : "modal"}>
                {/* <div id="myModal" class="modal show"> */}
                    <div class="sheet-overlay"></div>
                    <div class="modal-content">
                        <div class="btn_container">
                            <div class="buttons_grid">
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h1" ? "button_hour checked" : "button_hour"} id="h1">1</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h2" ? "button_hour checked" : "button_hour"} id="h2">2</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h3" ? "button_hour checked" : "button_hour"} id="h3">3</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h4" ? "button_hour checked" : "button_hour"} id="h4">4</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h5" ? "button_hour checked" : "button_hour"} id="h5">5</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h6" ? "button_hour checked" : "button_hour"} id="h6">6</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h7" ? "button_hour checked" : "button_hour"} id="h7">7</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h8" ? "button_hour checked" : "button_hour"} id="h8">8</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h9" ? "button_hour checked" : "button_hour"} id="h9">9</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h10" ? "button_hour checked" : "button_hour"} id="h10">10</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h11" ? "button_hour checked" : "button_hour"} id="h11">11</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h12" ? "button_hour checked" : "button_hour"} id="h12">12</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h13" ? "button_hour checked" : "button_hour"} id="h13">13</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h14" ? "button_hour checked" : "button_hour"} id="h14">14</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h15" ? "button_hour checked" : "button_hour"} id="h15">15</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h16" ? "button_hour checked" : "button_hour"} id="h16">16</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h17" ? "button_hour checked" : "button_hour"} id="h17">17</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h18" ? "button_hour checked" : "button_hour"} id="h18">18</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h19" ? "button_hour checked" : "button_hour"} id="h19">19</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h20" ? "button_hour checked" : "button_hour"} id="h20">20</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h21" ? "button_hour checked" : "button_hour"} id="h21">21</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h22" ? "button_hour checked" : "button_hour"} id="h22">22</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h23" ? "button_hour checked" : "button_hour"} id="h23">23</div>
                                <div onClick={(e) => handleBtnClick(e)} className={ checkedBtn == "h24" ? "button_hour checked" : "button_hour"} id="h24">24</div>
                                <div onClick={() => setBtnGridVisible(!btnGridVisible)} class="remove" id="remove">Удалить время</div>
                                <div onClick={() => setBtnGridVisible(!btnGridVisible)} class="quit" id="return">Вернуться</div>
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}
