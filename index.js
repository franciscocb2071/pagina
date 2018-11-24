var config = {
    apiKey: "AIzaSyALWrzIBe9pPhrD_fdJeYn913uT93XjQPg",
    authDomain: "crud-7120f.firebaseapp.com",
    databaseURL: "https://crud-7120f.firebaseio.com",
    projectId: "crud-7120f",
    storageBucket: "crud-7120f.appspot.com",
    messagingSenderId: "371828146409"
  };
  firebase.initializeApp(config);

  var d = new Date();
  var t = d.getTime();
  var counter = t;


  document.getElementById("form").addEventListener("submit",(e)=>{
  	var task = document.getElementById("task").value;
  	var description = document.getElementById("description").value;
  	e.preventDefault();
    //console.log(task+description);
    createTask(task,description);
  	form.reset();
  });

  function createTask(taskName,description){
    console.log(counter);
    counter+=1;
    console.log(counter);
    var task={
      id: counter,
      task: taskName,
      description:description
    }
    let db= firebase.database().ref("tasks/"+counter);
    db.set(task);
    document.getElementById("cardSection").innerHTML='';
    readTask();
  }

  function readTask(){
    var task = firebase.database().ref("tasks/");
    task.on("child_added",function(data){
      var taskValue = data.val();
      
      document.getElementById("cardSection").innerHTML+=`
        <div class = "card mb-3">
          <div class= "card-body">
            <h5 class="card-title">${taskValue.task}</h5>
            <p class="card-text">${taskValue.description}</p>
            /*bonotos para editar*/
            <button type"submit" style="color:white" class="btn btn-warning" onclick="updateTask(${taskValue.id},'${taskValue.task}','${taskValue.description}')">Edit Task</button>
            <button type="submit" class="btn btn-danger" onclick="deleteTask(${taskValue.id})">Delete task</button>
            </div>
        </div>
      `
    });
  }


  function reset(){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-" id="form">
    <div class="form-group">
      <label>Task</label>
      <input type="text" class="form-control" id="task" placeholder="Enter task">
    </div>
    <div class="form-grup">
      <label>Description</label>
      <input type="text" class="form-control" id="description" placeholder="Description">
    </div>
    <button type="submit" id="button1" class="btn btn-primary">ADD TASK</button>
    <button style="display: none" id="button2" class="btn btn-success">Update Task</button>
    <button style="display: none" id="button3" class="btn btn-danger">Calcel</button>
  </form>
    `;
    document.getElementById("form").addEventListener("submit",(e)=>{
      var task = document.getElementById("task").value;
      var description = document.getElementById("description").value;
      e.preventDefault();
      //console.log(task+description);
      createTask(task,description);
      form.reset();
    });
  }

  function updateTask(id, name, description){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-" id="form2">
    <div class="form-group">
      <label>Task</label>
      <input type="text" class="form-control" id="task" placeholder="Enter task">
    </div>
    <div class="form-grup">
      <label>Description</label>
      <input type="text" class="form-control" id="description" placeholder="Description">
    </div>
    <button style="display: none" id="button1" class="btn btn-primary">ADD TASK</button>
    <button type="submit" style="display: inline-block" id="button2" class="btn btn-success">Update Task</button>
    <button style="display: inline-block" id="button3" class="btn btn-danger">Calcel</button>
  </form>
    `;
    document.getElementById("form2").addEventListener("submit",(e)=>{
      e.preventDefault();
    });
    document.getElementById("button3").addEventListener("click",(e)=>{
      reset();//para cancelar lo que se va a editar
    });
    document.getElementById("button2").addEventListener("click",(e)=>{
      updateTask2(id,document.getElementById("task").value,document.getElementById("description").value);
    });
    document.getElementById("task").value=name;
    document.getElementById("description").value=description;
  }


function updateTask2(id, name,description){
  var taskUpdated={
    task:name,
    id:id,
    description:description
  }
  let db= firebase.database().ref("tasks/"+id);
  db.set(taskUpdated);

  document.getElementById("cardSection").innerHTML='';
  readTask();
  reset();
}

function deleteTask(id){
  var task = firebase.database().ref("tasks/"+id);
  task.remove();
  reset();
  document.getElementById("cardSection").innerHTML='';
  readTask();
}