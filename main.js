const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_btn');
const form = document.querySelector('.new_form');

input.focus();

form.addEventListener('submit', (event) => {
  event.preventDefault(); //submit은 기본적으로 브라우저를 새로고침 함. 이를 없앰
  onAdd();
});

//Add가 클릭되었을 때 (이름: 'on'Add)
function onAdd() {
  //1. 사용자가 입력한 텍스트 받아옴 
  const text = input.value; 
  //아무것도 input에 작성되지 않았을 때, 함수 종료(아무것도 실행x)
  if(text === '') {
    input.focus(); //포커스를 통해 더 편하게 입력할 수 있도록 함
    return;
  }
  // console.log(text); text 잘 들어오는지 확인 
  //2. 새로운 아이템 만듦(텍스트 + 삭제 버튼)
  const item = createItem(text);
  //3. items 컨테이너안에 새로 만든 아이템 추가한다
  items.appendChild(item); 
  //4. 새로 추가된 아이템으로 스크롤링 
  item.scrollIntoView({block: 'center'}); 
  //5. input을 초기화한다. 
  input.value = '';
  input.focus(); //포커스를 통해 더 편하게 입력할 수 있도록 함
}

let id = 0; //이후 실전에서는 UUID사용하기(지금처럼 글로벌 변수로 아이디 만드는 것 좋지 않음) 
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item_row');
  itemRow.setAttribute('data-id', id);

  //이전에 엄청 긴 코드를 간단하게 리팩토링
  itemRow.innerHTML = `
    <div class="item">
      <span class="item_name">${text}</span>
      <button class="item_delete" type="button">
        <i class="fas fa-trash-alt" data-id=${id}></i>
        <span class="blind">삭제하기 버튼</span>
      </button>
    </div>`;
  id++; //아이템 새로 만들어질 때 마다 id++
  return itemRow;
}

//이벤트 위임 
items.addEventListener('click', event => {
  const id = event.target.dataset.id;

  //부모 컨테이너(items)에서 원하는 target이 클릭되었을 때(id가 있는 경우_위 data id 지정해준 것) 
  if(id){
    const toBeDeleted = document.querySelector(`.item_row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
