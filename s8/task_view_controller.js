$(function() {

  // Models per cada task list
  let task_model = new TaskModel([
    { title: "PMUD HTML exercise", done: true },
    { title: "PMUD CSS exercise", done: false },
    { title: "PMUD JavaScript exercise", done: false }
  ]);

  let home_task_model = new TaskModel([
    { title: "Clean the house", done: false },
    { title: "Buy groceries", done: false },
    { title: "Cook dinner", done: false }
  ]);

  let university_task_model = new TaskModel([
    { title: "Finish assignment", done: false },
    { title: "Study for exams", done: false },
    { title: "Attend lecture", done: false }
  ]);

  const models = {
    'task_list': {
      model: task_model,
      showAllTasks: true,
      searchText: ''
    },
    'home_task_list': {
      model: home_task_model,
      showAllTasks: true,
      searchText: ''
    },
    'university_task_list': {
      model: university_task_model,
      showAllTasks: true,
      searchText: ''
    }
  };

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  let isSmallScreen = false;

  // Guarda els estats del collapse a les cookie
  function saveCollapseStates() {
    if (isSmallScreen) {
      return;
    }
    const collapseStates = {};
    $('.collapse').each(function() {
      const id = $(this).attr('id');
      collapseStates[id] = $(this).hasClass('show') ? 'show' : 'hide';
    });
    setCookie('collapseStates', JSON.stringify(collapseStates), 7); // Expira en 7 dies
  }

  function loadCollapseStates() {
    const collapseStates = JSON.parse(getCookie('collapseStates') || '{}');
    for (const id in collapseStates) {
      if (collapseStates.hasOwnProperty(id)) {
        const state = collapseStates[id];
        const collapseElement = $('#' + id);
        if (state === 'show') {
          collapseElement.addClass('show');
        } else {
          collapseElement.removeClass('show');
        }
      }
    }
  }

  function adjustCollapseStates() {
    const windowWidth = $(window).width();
    if (windowWidth < 768) {
      if (!isSmallScreen) {
        isSmallScreen = true;
        $('.collapse').each(function() {
          $(this).collapse('hide');
        });
      }
    } else {
      if (isSmallScreen) {
        isSmallScreen = false;
        loadCollapseStates();
      }
    }
  }

  // Fa un check inicial mentre carrega la pàgina
  adjustCollapseStates();

  $(window).on('resize', function() {
    adjustCollapseStates();
  });

  // VIEWs

  const renderTaskList = function(modelName) {
    const modelData = models[modelName];

    // Construeix el contingut HTML per task list sense els seus items
    let htmlContent = `
      <div class="btn-group mb-2">
        <button class="new btn btn-success" data-model="${modelName}">New task</button>
        <button class="reset btn btn-warning" data-model="${modelName}">Reset tasks</button>
        <button class="toggle-tasks btn btn-primary" data-model="${modelName}">${modelData.showAllTasks ? 'All tasks' : 'Active tasks'}</button>
      </div>
      <input type="text" id="search-tasks-${modelName}" class="form-control mb-2" placeholder="Search tasks..." value="${modelData.searchText}">
      <div id="tasks-container-${modelName}">
        <!-- Task items will be injected here -->
      </div>
    `;

    $(`#${modelName}_body`).html(htmlContent);

    renderTaskItems(modelName);
  };

  const renderTaskItems = function(modelName) {
    let modelData = models[modelName];
    let model = modelData.model;
    let tasks = model.getAll();

    let filteredTasks = modelData.showAllTasks ? tasks : tasks.filter(task => !task.done);
    if (modelData.searchText) {
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(modelData.searchText)
      );
    }

    // Construeix el contingut HTML dels task items
    let tasksHtml = '';
    filteredTasks.forEach(task => {
      tasksHtml += `
        <div class="card mb-1">
          <div class="card-body">
            <button type="button" class="delete btn btn-danger btn-sm me-1" taskid="${task.id}" data-model="${modelName}" title="Delete">🗑️</button>
            <button type="button" class="edit btn btn-info btn-sm me-1" taskid="${task.id}" data-model="${modelName}" title="Edit">✏️</button>
            <button type="button" class="switch btn btn-secondary btn-sm me-1" taskid="${task.id}" data-model="${modelName}" title="${task.done ? 'Mark as not done' : 'Mark as done'}">${task.done ? '✔️' : '❌'}</button>
            ${task.title}
          </div>
        </div>
      `;
    });

    $(`#tasks-container-${modelName}`).html(tasksHtml);
  };

  const renderTaskForm = function(msg, modelName, id, action, title, done) {
    let htmlContent = `
      <h1>${msg}</h1>
      <div class="form-group">
        <input type="text" class="form-control" name="title" value="${title}" placeholder="Title"/>
      </div>
      <div class="form-check mb-2">
        <input type="checkbox" class="form-check-input" name="done" ${done ? 'checked' : ''}/>
        <label class="form-check-label">Done</label>
      </div>
      <button class="${action} btn btn-primary" data-model="${modelName}" taskid="${id}">${action}</button>
      <button class="list btn btn-link" data-model="${modelName}">Go back</button>
    `;
    $(`#${modelName}_body`).html(htmlContent);
  };

  // CONTROLLERS

  const listController = function(modelName) {
    renderTaskList(modelName);
  };

  const renderTasks = function(modelName) {
    renderTaskItems(modelName);
  };

  const newController = function(modelName) {
    renderTaskForm('New task', modelName, null, 'create', '', '');
  };

  const editController = function(modelName, id) {
    let model = models[modelName].model;
    let task = model.get(id);
    renderTaskForm('Edit task', modelName, id, 'update', task.title, task.done);
  };

  const createController = function(modelName) {
    let model = models[modelName].model;
    model.create($('input[name=title]').val(), $('input[name=done]').is(':checked'));
    listController(modelName);
  };

  const updateController = function(modelName, id) {
    let model = models[modelName].model;
    model.update(id, $('input[name=title]').val(), $('input[name=done]').is(':checked'));
    listController(modelName);
  };

  const switchController = function(modelName, id) {
    let model = models[modelName].model;
    let task = model.get(id);
    if (task) {
      task.done = !task.done;
      model.update(id, task.title, task.done);
      renderTaskItems(modelName);
    }
  };

  const deleteController = function(modelName, id) {
    let model = models[modelName].model;
    model.delete(id);
    renderTaskItems(modelName);
  };

  const resetController = function(modelName) {
    let model = models[modelName].model;
    model.reset();
    renderTaskItems(modelName);
  };

  listController('task_list');
  listController('home_task_list');
  listController('university_task_list');

  $(document).on('click', '.toggle-tasks', function() {
    let modelName = $(this).data('model');
    let modelData = models[modelName];
    modelData.showAllTasks = !modelData.showAllTasks;
    $(this).text(modelData.showAllTasks ? 'All tasks' : 'Active tasks');
    renderTaskItems(modelName);
  });

  $(document).on('input', 'input[id^="search-tasks-"]', function() {
    let modelName = $(this).attr('id').replace('search-tasks-', '');
    let modelData = models[modelName];
    modelData.searchText = $(this).val().toLowerCase();
    renderTaskItems(modelName);
  });

  // ROUTER

  const eventsController = function() {
    $(document).on('click','.list',   (e) => {
      let modelName = $(e.currentTarget).data('model');
      listController(modelName);
    });

    $(document).on('click','.new',    (e) => {
      let modelName = $(e.currentTarget).data('model');
      newController(modelName);
    });

    $(document).on('click','.edit',   (e)=> {
      let modelName = $(e.currentTarget).data('model');
      let id = Number($(e.currentTarget).attr("taskid"));
      editController(modelName, id);
    });

    $(document).on('click','.create', (e) => {
      let modelName = $(e.currentTarget).data('model');
      createController(modelName);
    });

    $(document).on('click','.update', (e)=> {
      let modelName = $(e.currentTarget).data('model');
      let id = Number($(e.currentTarget).attr("taskid"));
      updateController(modelName, id);
    });

    $(document).on('click','.switch', (e)=> {
      let modelName = $(e.currentTarget).data('model');
      let id = Number($(e.currentTarget).attr("taskid"));
      switchController(modelName, id);
    });

    $(document).on('click','.delete', (e)=> {
      let modelName = $(e.currentTarget).data('model');
      let id = Number($(e.currentTarget).attr("taskid"));
      deleteController(modelName, id);
    });

    $(document).on('click','.reset',  (e)=> {
      let modelName = $(e.currentTarget).data('model');
      resetController(modelName);
    });
  };

  eventsController();

  $('.collapse').on('shown.bs.collapse', function () {
    saveCollapseStates();
  });

  $('.collapse').on('hidden.bs.collapse', function () {
    saveCollapseStates();
  });

});
