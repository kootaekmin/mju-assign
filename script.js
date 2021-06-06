const addButton = document.querySelectorAll('.add-button:not(.solid)');
const saveButton = document.querySelectorAll('.solid');
const addForm = document.querySelectorAll('.add-form');
const addFormInput = document.querySelectorAll('.add-form-input');

const contentList = document.querySelectorAll('.drag-content-list');
const doneContent = document.getElementById('done-list');
const doingContent = document.getElementById('doing-list');
const todoContent = document.getElementById('todo-list');

// Sample list & current State
let doneContentArray = ['예시)시험 공부', '예시)과제', ,];
let doingContentArray = [
	'예시)휴식중~~!',
	'다했으면 드래그해서 옮길수 있습니다.',
];
let todoContentArray = ['예시)운동', '예시)청소', '예시)강아지 산책'];
let contentsArray = [];
let draggedItem;
let dragging = false;
let currentColumn;

// Creating DOM based on contents Array
function createElement(contentColumn, column, item, index) {
	const contentList = document.createElement('li');
	contentList.textContent = item;
	contentList.id = index;
	contentList.draggable = true;
	contentList.contentEditable = true;
	contentList.classList.add('drag-list');
	contentList.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
	contentList.setAttribute('ondragstart', 'drag(event)');
	contentColumn.appendChild(contentList);
}

function updateItem(id, column) {
	const selectedArray = contentsArray[column];
	const selectedColumnEl = contentList[column].children;
	if (!dragging) {
		if (!selectedColumnEl[id].textContent) {
			delete selectedArray[id];
		} else {
			selectedArray[id] = selectedColumnEl[id].textContent;
		}
		updateDOM();
	}
}

function updateDOM() {
	doneContent.textContent = '';
	doneContentArray.forEach((content, i) => {
		createElement(doneContent, 0, content, i);
	});

	doingContent.textContent = '';
	doingContentArray.forEach((content, i) => {
		createElement(doingContent, 1, content, i);
	});

	todoContent.textContent = '';
	todoContentArray.forEach((content, i) => {
		createElement(todoContent, 2, content, i);
	});

	contentsArray = [doneContentArray, doingContentArray, todoContentArray];
}

function showAddForm(column) {
	addButton[column].style.visibility = 'hidden';
	saveButton[column].style.display = 'flex';
	addForm[column].style.display = 'flex';
}

function addToColumn(column) {
	const inputContent = addFormInput[column].textContent;
	addFormInput[column].textContent = '';
	if (inputContent) {
		const selectedArray = contentsArray[column];
		// 컨텐츠를 배열을 push method사용해서 업데이트 후 updateDOM() call 함
		selectedArray.push(inputContent);
		updateDOM();
	} else {
		window.alert('빈내용임');
	}
}

function hideAddForm(column) {
	addButton[column].style.visibility = 'visible';
	saveButton[column].style.display = 'none';
	addForm[column].style.display = 'none';
	addToColumn(column);
}

// 드래그 시작할때
function drag(event) {
	draggedItem = event.target;
	dragging = true;
}

// 드래깅한 아이템 진입할떄
function dragEnter(column) {
	currentColumn = column;
}

// 드래깅 허락
function allowDrop(event) {
	event.preventDefault();
}

// 드롭할때
function drop(event) {
	event.preventDefault();
	console.log(event);
	const onMouseLocation = contentList[currentColumn];
	onMouseLocation.appendChild(draggedItem);
	dragging = false;
}

// 초기 실행
updateDOM();
