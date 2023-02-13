//유저가 값을 입력한다.
// + 버튼을 클릭하면, 할 일이 추가된다.
// delete버튼을 누르면 할 일이 삭제된다.

//check버튼을 누르면 할 일이 끝나면서 밑줄이 간다.
//1. check 버튼을 클릭하는 순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안 끝난걸로 간주하고 그대로

// 끝남 탭은 끝난 아이템만, 진행 탭은 진행 중인 아이템만
// 전체 탭을 누르면 다시 전체 아이템으로 돌아온다.

let mode = '';
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let underLine = document.getElementById("under-line")
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = []; // 할 일 리스트

// event 생성
addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", function() {
    taskInput.value = "";
})
for(let i=1; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event)
    });    
}

// 함수 Area-----------------------------

//할 일 추가하는 함수
function addTask() {

    //객체 생성하기
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }

    taskList.push(task);
    render();
}

// 랜더링하기
function render() {
    let resultHTML = '';
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">check</button>
                <button onclick="deleteTask('${taskList[i].id}')">delete</button>
            </div>
        </div>`
        }
        else {
            resultHTML += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${taskList[i].id}')">check</button>
            <button onclick="deleteTask('${taskList[i].id}')">delete</button>
        </div>
    </div>`
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

// check 기능 (사선 긋기)
function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

//삭제 기능
function deleteTask(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1); //splice를 통해서 중간에 있는 객체를 삭제
            break;
        }
    }
    render(); //UI도 업데이트 해줘야한다. (여기서 자동으로 해주는게 React라는 라이브러리이다.)
}

//필터 기능
function filter(event) {
    mode = event.target.id;
    let allList = [];
    let filterList = [];
    let doneList = [];

    if (event) {
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top =
          event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    }

    if(mode == "all") {
        render(); //전체 리스트를 보여주면 되기 때문에 render()하면 됨
    }
    else if(mode == "ongoing") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == false) { //객체 중 false인 것만
                filterList.push(taskList[i]); // filterList에 push한다.
            }
        }
        allList = taskList;
        taskList = filterList;
        render();
        taskList = allList;
    }
    else {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == true) {
                doneList.push(taskList[i]);
            }
        }
        allList = taskList;
        taskList = doneList;
        render();
        taskList = allList;
    }
}

// Unique ID 생성 함수
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}