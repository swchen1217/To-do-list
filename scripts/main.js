let template = document.querySelector(".list-item-template").cloneNode(true);
let showFinished = false;
updateList();
updateWindow();
init();
function init(){
    document.getElementById("addNewListItem").addEventListener('click', addNewListItem);
    document.getElementById("showItem").addEventListener('click', changeListState);
    document.getElementById("setting-btn").addEventListener('click', showSetting);
    document.getElementById("reset").addEventListener('click', resetData);
    document.getElementById("save-setting").addEventListener('click', updateSetting);
}
function addNewListItem(){
    let contentInput = document.getElementById("itemContent");
    let content = contentInput.value;
    let toDoListLocalStorage =  getData();
    toDoListLocalStorage.push(
        {
            data: content,
            isfinished: false,
        }
    );
    setData(toDoListLocalStorage);
    contentInput.value = '';
    
    updateList();
}
function updateList(){
    let toDoList = getData();
    let list = document.querySelector(".to-do-list");
    list.innerHTML = '';
    for(i = 0;i < toDoList.length;i++){
        if(!showFinished && toDoList[i].isfinished) continue;
        // to-do: clone element
        let listItem = document.querySelector(".list-item-template .list-item").cloneNode(true);
        let listItemBtn = listItem.getElementsByClassName("btn")[0];
        let listItemContent = listItem.getElementsByClassName("list-item-content")[0];
        
        if(toDoList[i].isfinished){
            listItemBtn.classList.add("fa-check");
        }else{
            listItemBtn.classList.add("fa-circle-thin");
        }

        // listItemBtn.setAttribute('onclick', `changeItemState(${i})`);
        listItemBtn.addEventListener('click', changeItemState.bind(null, i));
        listItemContent.textContent = toDoList[i].data;
        list.appendChild(listItem);
    }
}
function changeItemState(i){
    let toDoList = getData();
    toDoList[i].isfinished = !toDoList[i].isfinished;
    setData(toDoList);
    updateList();
}
function getData(){
    let toDoListLocalStorage =  JSON.parse(localStorage.getItem('toDoList')) ?? [];
    return toDoListLocalStorage;
}
function setData(toDoListLocalStorage){
    localStorage.setItem("toDoList", JSON.stringify(toDoListLocalStorage));
}
function resetData(){
    localStorage.setItem('toDoList', JSON.stringify([]));
    updateList();
}
function changeListState(){
    let showItemBtn = document.getElementById("showItem");
    showFinished = !showFinished;

    if(showFinished){
        showItemBtn.classList.remove("fa-circle-thin");
        showItemBtn.classList.add("fa-check");// ok
    }else{
        showItemBtn.classList.remove("fa-check");// ok
        showItemBtn.classList.add("fa-circle-thin");
    }
    updateList();
}

function updateWindow(){
    let setting = getSetting();
    let userName = setting['userName'];
    let themeList = setting['theme'];
    showName(userName);
    showBackgroud(themeList);
}
function showName(userName){
    let userNameHTML = document.querySelector(".name span");
    userNameHTML.textContent = userName;
}

function showBackgroud(themeList){
    let banner = document.querySelector(".banner");
    if(!window.navigator.onLine){
        let url = "images/default_background.jpg";
        banner.style.background = `url(${url}) center / cover no-repeat fixed`;
    }else{
        let url = "https://source.unsplash.com/1280x720/";
        banner.style.background = `url(${url}?${themeList}) center / cover no-repeat fixed`;
    }
}
function showSetting(){ // show on the input group
    let settingLocalStorage = getSetting();
    let settingInput = document.querySelectorAll(".setting-input-group");
    for(i = 0;i < settingInput.length;i++){
        let formControl = settingInput[i].querySelector(".form-control");
        let id = formControl.id;
        formControl.value = settingLocalStorage[id];
    }
}
function updateSetting(){
    let settingLocalStorage = getSetting();
    let settingInput = document.querySelectorAll(".setting-input-group");
    for(i = 0;i < settingInput.length;i++){
        let formControl = settingInput[i].querySelector(".form-control");
        let id = formControl.id;
        let value = formControl.value;
        settingLocalStorage[id] = value;
    }
    localStorage.setItem("setting", JSON.stringify(settingLocalStorage));
    updateWindow();
}

function getSetting(){
    if(localStorage.getItem('setting')){
        return JSON.parse(localStorage.getItem('setting'));
    }else{
        let setting = {
            userName: "ZHAO-XIN, PAN",
            theme: "city",
        }
        localStorage.setItem('setting', JSON.stringify(setting));
        return JSON.parse(localStorage.getItem('setting'));
    }
}