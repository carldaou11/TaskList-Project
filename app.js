//Define UI Variables
const form =document.querySelector("#task-form");
const taskList =document.querySelector(".collection");
const clearBtn =document.querySelector(".clear-tasks");
const filter =document.querySelector("#filter");
const taskInput =document.querySelector("#task");

// Load all event Listeners
loadEventListeners();

//Load all event Listeners
function loadEventListeners(){
    //DOM load event
    document.addEventListener("DOMcontentLoaded" ,getTasks);
    //add task event
    form.addEventListener('submit' ,addTask);
    //Remove Task event 
    taskList.addEventListener("click", removeTask);
    //Clear task event 
    clearBtn.addEventListener("click",clearTasks);
    //Filter tasks event
    filter.addEventListener("keyup" ,filterTasks)

}
//Get Tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks =[];
    } else {
        tasks =JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.forEach(function(task){
        // Create li element
    const li =document.createElement('li');
    //Add Class
    li.className='Collection-item';
    // Create Text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new Link element
    const link =document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML ='<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);



    });

}

//add Task
function addTask(e) {
    if(taskInput.value ===' '){
        alert("add a task");
    }
    // Create li element
    const li =document.createElement('li');
    //Add Class
    li.className='Collection-item';
    // Create Text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new Link element
    const link =document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML ='<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    //Clear input
    taskInput.value ="";
    
    //store in LS
    storeTaskinLocalStorage(taskInput.value);
    e.preventDefault();

    
}
//Store Task 
function storeTaskinLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks =[];
    } else {
        tasks =JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.push(task);

    localStorage.setItem("tasks" ,JSON.stringify(tasks));
    
}


//Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains ("delete-item")) {
        if(confirm("Are you Sure?")){
        e.target.parentElement.parentElement.remove();
        //remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        
        }
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks =[];
    } else {
        tasks =JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        if(taskItem.textContent === task){
            tasks.splice(index ,1);
        }
    });
    localStorage.setItem("tasks" ,JSON.stringify(tasks));
    }

//clear tasks
function clearTasks(){
    taskList.innerHTML=""

    //Faster
    //while(taskList.firstChild){
      //  taskList.removeChild(taskList,firstChild);
   // }
    //Link to show diff between the two (https://isperf.com/innerhtml-vs-removechild)
    // Filter Tasks


    // Clear form LS
    clearTasksFromLocalStorage();
}
//Clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
    function filterTasks(e){
        const text = e.target.value.toLowerCase();

        document.querySelectorAll(".collection-item").forEach(function(task){
            const item =task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = "block";
            } else {
                task.style.display ="none";
            }
        });
       
    }