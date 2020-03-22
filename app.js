document.getElementById('formTasks').addEventListener('submit', saveTask);


//Debe capturar el evento cuando se ejecute el submit, 
//por default se refresca la paguina y voy a quitar ese comportamiento
function saveTask(e){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    //console.log(title, description);

    //objecto
    const task = {
        title: title, //title:title
        description: description //description:description
    };

    //Objecto pasarle a string con Json.stringify
    if(localStorage.getItem('tasks') == null){
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

    }else{
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
    }

    console.log(task)
    getTasks();
    document.getElementById('formTasks').reset();
    e.preventDefault();
    
}


function getTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML ='';//limpiar o quitar.
    
    for(let i = 0; i < tasks.length; ++i){
        let title = tasks[i].title;
        let description = tasks[i].description;
        //HTML con JS
        tasksView.innerHTML += `<div class="card mb-3">
            <div class="card-body">
                <p>${title} - ${description}</p>
                <a class="btn btn-danger" onclick="deleteTask('${title}')">Delete</a>
            </div>
        </div>`;
        console.log(tasks[i]);
    }

}

function deleteTask(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].title == title){
            tasks.splice(i,1);//Quitar un elemento del arreglo
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

getTasks();