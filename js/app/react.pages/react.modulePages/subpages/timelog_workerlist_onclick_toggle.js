


// Выбираем элементы DOM
const selectedRows = document.querySelectorAll(".task_item");



// let i = 0
for (var s of selectedRows) {
    console.log("123455")
    subIcon = s.querySelector(".fi");
    console.log("123455")
    // i++
    // s.classList.add("id__" + i);
    // subIcon.classList.add("id__" + i);

    s.addEventListener("click", ( (passedInElement) => {     // s.addEventListener("click", (event) => toggleIcon(event, s) );
        return (e) => {toggleWorkerState(e, passedInElement);
        }}) (this.s), false); // IIFE https://stackoverflow.com/questions/10000083/javascript-event-handler-with-parameters

}