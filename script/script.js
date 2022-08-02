const inpText = document.querySelector('#text');
const btnAdd = document.querySelector('#btnAdd');
const list = document.querySelector('#list');
const complited = document.querySelector('#complited');



let todoArr = [];

function addArr () {

  const text = inpText.value;

  if(!text.trim()) return;

  const obj = {
    text,
    status: 'inProcess'
  }
  obj.text = text;
  todoArr.push(obj);

  todoArr.forEach((item, index)=>{
    item.id = `ul-${index}`
  })

  inpText.value = '';
  inpText.focus();
  render();
}

function render(){

    list.innerHTML = '';
    complited.innerHTML = '';

    const ulInProcess = document.createElement('ul');
    const ulDone = document.createElement('ul');

    todoArr.forEach((item) =>{
        const liId = item.id;      

        const li = document.createElement('li');
        const textNode = document.createTextNode(item.text);
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = 'Удалить';
        
        li.setAttribute('id', liId);
        li.appendChild(textNode);
        li.appendChild(a);
        

        li.addEventListener('click', function(ev){
           if(ev.target.nodeName !== 'LI') return;
           const id = this.getAttribute('id') 
           todoArr.forEach(item => {
            if(item.id == id){
            item.status = item.status == 'Done' ? 'InProcess' : 'Done';
            }            
            });
            render();           
        })        

        a.addEventListener('click', function(ev){
            ev.preventDefault();
            const id = this.parentNode.getAttribute('id')                       
            todoArr = todoArr.filter(item => item.id !== id);            
            render();
        })

        item.status == 'Done' ? ulDone.appendChild(li) : ulInProcess.appendChild(li); 
    });

    list.appendChild(ulInProcess);
    complited.appendChild(ulDone);
}

btnAdd.addEventListener('click', addArr);



