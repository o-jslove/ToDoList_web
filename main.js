//유저가 값을 입력한다.
// + 버튼을 클릭하면, 할 일이 추가된다.
// delete버튼을 누르면 할 일이 삭제된다.
//check버튼을 누르면 할 일이 끝나면서 밑줄이 간다.
// 끝남 탭은 끝난 아이템만, 진행 탭은 진행 중인 아이템만
// 전체 탭을 누르면 다시 전체 아이템으로 돌아온다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [] // 할 일 리스트
addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", function() {
    taskInput.value = "";
})
taskInput.addEventListener("keyup", function(event) {
    if(event.keyCode === 13) {
        event.preventDefault();
    }
})


// 함수 Area
function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = '';
    for(let i=0; i<taskList.length; i++) {
        resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div>
            <button>check</button>
            <button>delete</button>
        </div>
    </div>`
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}