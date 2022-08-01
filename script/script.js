const inpText = document.querySelector('#text');
const btnAdd = document.querySelector('#btnAdd');
const list = document.querySelector('#list');
const complited = document.querySelector('#complited');

const templ = document.querySelector('#templ');

let todoArr = [];

function addArr () {
    const text = inpText.value;
    if(!text.trim()) return;

    let todoArrItem = {                                  
        text,
        status: 'uncomplited'
    }
    todoArr.push(todoArrItem);

    todoArr.forEach((item, index) => {todoArrItem.id = `li-${index}`});  // присваиваю ID объекту без сторонней библиотеки
    
    inpText.value = '';
    inpText.focus();    
    render();
}

function render() {
    list.innerHTML  = '';
    complited.innerHTML  = '';
      
    /* const ul = document.createElement('ul'); */

    const ul = templ.content.cloneNode(true);       

    todoArr.forEach((ev) => {
        /* const newLi = document.createElement('li');        
        newLi.innerHTML = ev.text;
        newLi.setAttribute('id', ev.id);           
        const a = document.createElement('a');
        a.href = '#';
        a.innerHTML = 'Удалить';
        newLi.appendChild(a);        
        ul.appendChild(newLi); */
        
        const newLi = ul.querySelector('li');
        const a = newLi.querySelector('a')
        newLi.firstChild.textContent = ev.text;
        newLi.setAttribute('id', ev.id);        
               

        newLi.addEventListener('click', function(ev){
            if(ev.target.nodeName != 'LI') return;
            let id = newLi.getAttribute('id');
            todoArr.forEach(item =>{
                if(item.id == id){                    
                   item.status = item.status == 'complited' ? 'uncomplited' : 'complited';                                      
                }
                render();
            })
        });
        
        a.addEventListener('click', function(ev){
            ev.preventDefault();
            let id = this.parentNode.getAttribute('id');           
            todoArr = todoArr.filter(item => item.id != id);
            render();                       
        })
             
    })
    todoArr.forEach(item =>{
        item.status == 'uncomplited' ? list.appendChild(ul) : complited.appendChild(ul);
    })   
}

btnAdd.addEventListener('click', addArr);



