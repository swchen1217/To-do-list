let KEY_DATA = "toDoList";
let KEY_SETTING = "setting";
let DEFAULT_SETTING = {
  userName: "ZHAO-XIN, PAN",
  theme: "city",
}
let showFinished = false;
init();

function init() {
  document.getElementById("addNewListItem").addEventListener('click', addNewListItem);
  document.getElementById("showItem").addEventListener('click', changeListState);
  document.getElementById("settingBtn").addEventListener('click', renderSetting);
  document.getElementById("reset").addEventListener('click', () => setData([]));
  document.getElementById("saveSetting").addEventListener('click', saveSetting);

  renderList();
  updateWindow();
}

function renderList() {
  let data = getData();
  let list = document.querySelector(".to-do-list");
  // ref: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
  // list.innerHTML = '';
  while (list.firstChild) {
    list.firstChild.remove();
  }
  for (let i = 0; i < data.length; i++) {
    if (!showFinished && data[i].isFinished) continue;
    let template = document.querySelector(".list-item-template div").cloneNode(true);
    let itemBtn = template.getElementsByClassName('list-item-button')[0]
    let itemContent = template.getElementsByClassName('list-item-content')[0];
    if (data[i].isFinished) {
      itemBtn.classList.add("fa-check");
    } else {
      itemBtn.classList.add("fa-circle-thin");
    }

    itemBtn.addEventListener('click', changeItemState.bind(null, i));
    itemContent.textContent = data[i].data;
    list.appendChild(template);
  }
}

function getData() {
  return JSON.parse(localStorage.getItem(KEY_DATA)) ?? [];
}

function setData(data) {
  localStorage.setItem(KEY_DATA, JSON.stringify(data));
  renderList();
}

function addNewListItem() {
  let contentInput = document.getElementById("itemContent");
  let content = contentInput.value;
  let data = getData();
  data.push({
    data: content,
    isFinished: false,
  });
  setData(data);
  contentInput.value = '';
}

function changeItemState(i) {
  let data = getData();
  data[i].isFinished = !data[i].isFinished;
  setData(data);
}

function changeListState() {
  let showItemBtn = document.getElementById("showItem");
  showFinished = !showFinished;

  if (showFinished) {
    showItemBtn.classList.remove("fa-circle-thin");
    showItemBtn.classList.add("fa-check");// ok
  } else {
    showItemBtn.classList.remove("fa-check");// ok
    showItemBtn.classList.add("fa-circle-thin");
  }
  renderList();
}

function renderSetting() {
  let setting = getSetting();
  let formControls = document.querySelectorAll(".setting-input-group .form-control");
  for (let i = 0; i < formControls.length; i++) {
    let id = formControls[i].id;
    formControls[i].value = setting[id];
  }
}

function getSetting() {
  if (!localStorage.getItem(KEY_SETTING)) {
    localStorage.setItem(KEY_SETTING, JSON.stringify(DEFAULT_SETTING));
  }
  return JSON.parse(localStorage.getItem(KEY_SETTING));
}

function saveSetting() {
  let setting = getSetting();
  let formControls = document.querySelectorAll(".setting-input-group .form-control");
  for (let i = 0; i < formControls.length; i++) {
    let id = formControls[i].id;
    setting[id] = formControls[i].value;
  }
  localStorage.setItem(KEY_SETTING, JSON.stringify(setting));
  updateWindow();
}

function updateWindow() {
  let setting = getSetting();
  renderName(setting['userName']);
  renderBackground(setting['theme']);
}

function renderName(userName) {
  let userNameHTML = document.getElementById("name");
  userNameHTML.textContent = userName;
}

function renderBackground(themeList) {
  let banner = document.querySelector(".banner");
  let onlineUrl = `https://source.unsplash.com/1280x720/?${themeList}`;
  let defaultUrl = 'images/default_background.jpg';
  // banner.style.background = `url(${onlineUrl}) center / cover no-repeat fixed`;
  banner.style.backgroundImage = `url(${onlineUrl}), url(${defaultUrl})`;
  banner.style.backgroundPosition = 'center';
  banner.style.backgroundSize = 'cover';
  banner.style.backgroundRepeat = 'no-repeat';
  banner.style.backgroundAttachment = 'fixed';
  // fetch('https://source.unsplash.com/2x2/?null')
  //   .then((response) => {
  //     url = `https://source.unsplash.com/1280x720/?${themeList}`;
  //   })
  //   .catch((error) => {
  //     url = 'images/default_background.jpg';
  //   }).finally(() => {
  //   banner.style.background = `url(${url}) center / cover no-repeat fixed`;
  // })
}