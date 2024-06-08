// Select DOM elements
const showModalBtn = document.querySelector(".show-modal");
const bottomSheet = document.querySelector(".modal");
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
const sheetContent = bottomSheet.querySelector(".buttons_grid");
const dragIcons = bottomSheet.querySelectorAll(".button_hour");

// Show the bottom sheet, hide body vertical scrollbar, and call updateSheetHeight
const showBottomSheet = () => {
    bottomSheet.classList.toggle("show");
}

// Hide the bottom sheet and show body vertical scrollbar
const hideBottomSheet = () => {
    bottomSheet.classList.toggle("show");
}
for (i of dragIcons) {
    i.addEventListener("mousedown", hideBottomSheet);
    i.addEventListener("touchstart", hideBottomSheet);
}

// document.addEventListener("mousemove", dragging);
// document.addEventListener("mouseup", dragStop);


// document.addEventListener("touchmove", dragging);
// document.addEventListener("touchend", dragStop);

sheetOverlay.addEventListener("click", hideBottomSheet);
showModalBtn.addEventListener("click", showBottomSheet);
// bottomSheet.addEventListener("mousedown", hideBottomSheet)