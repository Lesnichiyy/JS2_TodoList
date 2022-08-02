// писать код теперь только в ооп


class toDoList {

    constructor(input, button, divInProcces, divDone){
        this.inpText = document.querySelector(input);
        this.btnAdd = document.querySelector(button);
        this.list = document.querySelector(divInProcces);
        this.complited = document.querySelector(divDone);
        this.todoArr = [];
        
        const addArr = this.addArr.bind(this);
        this.btnAdd.addEventListener('click', addArr);        
    }        
        
        addArr () {           

            const text = this.inpText.value;
            
                if(!text.trim()) return;
            
                const obj = {
                            text,
                            status: 'inProcess'
                            }

                obj.text = text;
                this.todoArr.push(obj);
            
                this.todoArr.forEach((item, index)=>{
                    item.id = `ul-${index}`
                })
            
            this.inpText.value = '';
            this.inpText.focus();
            this.render();
        
        }

        render(){

            const self = this;

            this.list.innerHTML = '';
            this.complited.innerHTML = '';
        
            const ulInProcess = document.createElement('ul');
            const ulDone = document.createElement('ul');
        
            this.todoArr.forEach((item) =>{
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
                   self.todoArr.forEach(item => {
                    if(item.id == id){
                    item.status = item.status == 'Done' ? 'InProcess' : 'Done';
                    }            
                    });
                    self.render();           
                })        
        
                a.addEventListener('click', function(ev){
                    ev.preventDefault();
                    const id = this.parentNode.getAttribute('id')                       
                    self.todoArr = self.todoArr.filter(item => item.id !== id);            
                    self.render();
                })
        
                item.status == 'Done' ? ulDone.appendChild(li) : ulInProcess.appendChild(li); 
            });
        
            this.list.appendChild(ulInProcess);
            this.complited.appendChild(ulDone);
        }

}

let newUl = new toDoList('#text', '#btnAdd', '#list', '#complited');


