document.addEventListener("DOMContentLoaded", () => {
    
  });
  const form  = document.querySelector("#create-task-form")
     const task = document.querySelector("#tasks")
  console.log(tasks)
  form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const taskDescription = document.querySelector("#new-task-description")
    const taskValue=taskDescription.value
    if(taskValue==""){
      console.log(taskValue)
      alert("Please write a to do")
    }
    else{
      const taskList = document.createElement('li');
      taskList.textContent = taskValue
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent='x';
      console.log(taskList)
      tasks.appendChild(taskList)
      taskList.appendChild(deleteButton)
      deleteButton.addEventListener('click',()=>{
        taskList.remove();
      })
    } 
  
    form.reset()
  });