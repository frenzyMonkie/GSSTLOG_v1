const BottomSheet = (title, items) => {

    // // Select DOM elements
    // const showModalBtn = document.querySelector(".show-modal");
    // const bottomSheet = document.querySelector(".bottom-sheet");
    // const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
    // const sheetContent = bottomSheet.querySelector(".content");
    // const dragIcon = bottomSheet.querySelector(".drag-icon");

    // const optionbox = document.getElementsByClassName("content_calc")
    // for (let i of optionbox) {
    //     listH = window.getComputedStyle(i, null).height
    //     listH = Number(listH.substring(0, listH.length - 2))
    // }

    // // Global variables for tracking drag events
    // let isDragging = false, startY, startHeight;

    // // Show the bottom sheet, hide body vertical scrollbar, and call updateSheetHeight
    // const showBottomSheet = () => {
    //     bottomSheet.classList.add("show");
    //     document.body.style.overflowY = "hidden";

    //     // updateSheetHeight(50);
    //     updateSheetHeight(100*listH/window.innerHeight);
    // }

    // const updateSheetHeight = (height) => {
    //     sheetContent.style.height = `${height}vh`; //updates the height of the sheet content
    //     // Toggles the fullscreen class to bottomSheet if the height is equal to 100
    //     bottomSheet.classList.toggle("fullscreen", height === 100);
    // }

    // // Hide the bottom sheet and show body vertical scrollbar
    // const hideBottomSheet = () => {
    //     bottomSheet.classList.remove("show");
    //     document.body.style.overflowY = "auto";
    // }

    // // Sets initial drag position, sheetContent height and add dragging class to the bottom sheet
    // const dragStart = (e) => {
    //     isDragging = true;
    //     startY = e.pageY || e.touches?.[0].pageY;
    //     startHeight = parseInt(sheetContent.style.height);
    //     bottomSheet.classList.add("dragging");
    // }

    // // Calculates the new height for the sheet content and call the updateSheetHeight function
    // const dragging = (e) => {
    //     if(!isDragging) return;
    //     const delta = startY - (e.pageY || e.touches?.[0].pageY);
    //     const newHeight = startHeight + delta / window.innerHeight * 100;
    //     updateSheetHeight(newHeight);
    // }

    // // Determines whether to hide, set to fullscreen, or set to default
    // // height based on the current height of the sheet content
    // const dragStop = () => {
    //     isDragging = false;
    //     bottomSheet.classList.remove("dragging");
    //     const sheetHeight = parseInt(sheetContent.style.height);
    //     sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);
    // }

    // dragIcon.addEventListener("mousedown", dragStart);
    // document.addEventListener("mousemove", dragging);
    // document.addEventListener("mouseup", dragStop);

    // dragIcon.addEventListener("touchstart", dragStart);
    // document.addEventListener("touchmove", dragging);
    // document.addEventListener("touchend", dragStop);

    // sheetOverlay.addEventListener("click", hideBottomSheet);
    // showModalBtn.addEventListener("click", showBottomSheet);


    let items = [{text: 1, is_selected: true}, {text: 2, is_selected: false}, {text: 3, is_selected: false},]
    var canvas = items.map((e, idx) =>
            <div key={idx} className={e.is_selected ? "select_option selected" : "select_option"}>
                <div class="option_selected_icon"></div>
                <div class="option_text">{e.text}</div>
                <div class="option_selected_icon"></div>
            </div>
    )
    return <div class="bottom-sheet">
                <div class="sheet-overlay"></div>
                <div class="content">
                <div class="content_calc">
                    <div class="header">
                    <div class="drag-icon"><span></span></div>
                    </div>
                    <h2 class="select_header">{title}</h2>
                    <div class="body">
                    <div class="select_options">
                            {canvas}
                    </div>
                    </div>
                </div>
                </div>
            </div>
}
