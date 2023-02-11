//유저가 값을 입력한다.
// + 버튼을 클릭하면, 할 일이 추가된다.
// delete버튼을 누르면 할 일이 삭제된다.
//check버튼을 누르면 할 일이 끝나면서 밑줄이 간다.
//1. check 버튼을 클릭하는 순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안 끝난걸로 간주하고 그대로

// 끝남 탭은 끝난 아이템만, 진행 탭은 진행 중인 아이템만
// 전체 탭을 누르면 다시 전체 아이템으로 돌아온다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [] // 할 일 리스트
addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", function() {
    taskInput.value = "";
})



// 함수 Area-----------------------------

//할 일 추가하는 함수
function addTask() {

    //객체 생성하기
    let task = {
        taskContent: taskInput.value,
        isComplete: false
    }

    taskList.push(task);
    console.log(taskList);
    render();
}

// 랜더링하기
function render() {
    let resultHTML = '';
    for(let i=0; i<taskList.length; i++) {
        resultHTML += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete()">check</button>
            <button id="">delete</button>
        </div>
    </div>`
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete() {
    
}