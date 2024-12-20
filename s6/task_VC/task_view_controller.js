/*jshint esversion: 6 */
$(function() {

// VIEWs

const taskList = function(tasks) { 
  return `<h1>Task list</h1>
  <button class="new">New task</button>
  <button class="reset">Reset tasks</button>
  <p/>` +
  tasks.reduce(
    (ac, task) => ac += 
    `<div>
    <button type="submit" class="delete" taskid="${task.id}" title="Delete"> <img src="icon_delete.png"/> </button>
    <button type="button" class="edit"   taskid="${task.id}" title="Edit"  > <img src="icon_edit.png"/> </button>
    <button type="button" class="switch" taskid="${task.id}" title=${task.done ? 'Start' : 'Stop'}> <img src="${task.done ? 'icon_play.png' : 'icon_stop.png'}"/> </button>
    ${task.title}
    </div>\n`, 
    "");
};

const taskForm = function(msg, id, action, title, done) {
  return `<h1>Task form</h1>
  ${msg}: <p>
  <input type="text"     name="title"  value="${title}" placeholder="title"/>
  Done: 
  <input type="checkbox" name="done"   ${done ? 'checked' : ''}/>
  <button class="${action}" taskid="${id}">${action}</button>
  </p>
  <button class="list">Go back</button>
  `;
};


// CONTROLLERs

const listController = function() {
  $('#tasks').html(taskList(task_model.getAll()));
};

const newController = function() {
  $('#tasks').html(taskForm('New task', null, 'create', '', ''));
};

const editController = function(id) {
  let task = task_model.get(id);
  $('#tasks').html(taskForm('Edit task', id, 'update', task.title, task.done));
};

const createController = function() {
  task_model.create($('input[name=title]').val(), $('input[name=done]').is(':checked'));  
  listController();
};

const updateController = function(id) {
  task_model.update(id, $('input[name=title]').val(), $('input[name=done]').is(':checked'));
  listController();
};

const switchController = function(id) {
  let task = task_model.get(id);
  if (task) {
    task.done = !task.done;
    task_model.update(id, task.title, task.done);
    listController();
  }
};

const deleteController = function(id) {
  task_model.delete(id);
  listController();
};

const resetController = function() {
  task_model.reset();
  listController();
};

let showAllTasks = true;

$('#toggle-tasks').on('click', function() {
  showAllTasks = !showAllTasks;
  renderTasks();
  $(this).text(showAllTasks ? 'Active tasks' : 'All tasks');
});

function renderTasks(searchText = '') {
  let tasks = task_model.getAll();
  let filteredTasks = showAllTasks ? tasks : tasks.filter(task => !task.done);
  if (searchText) {
    filteredTasks = filteredTasks.filter(task => 
      task.title.toLowerCase().includes(searchText)
    );
  }

  $('#tasks').html(taskList(filteredTasks));
}

$('#search-tasks').on('input', function() {
  let searchText = $(this).val().toLowerCase();
  renderTasks(searchText);
});



// ROUTER

const eventsController = function() {
  $(document).on('click','.list',   () => listController());
  $(document).on('click','.new',    () => newController());
  $(document).on('click','.edit',   (e)=> editController(Number($(e.currentTarget).attr("taskid"))));
  $(document).on('click','.create', () => createController());
  $(document).on('click','.update', (e)=> updateController(Number($(e.currentTarget).attr("taskid"))));
  $(document).on('click','.switch', (e)=> switchController(Number($(e.currentTarget).attr("taskid"))));
  $(document).on('click','.delete', (e)=> deleteController(Number($(e.currentTarget).attr("taskid"))));
  $(document).on('click','.reset',  (e)=> resetController());
};

let task_model = new TaskModel();
listController();
eventsController();
});
