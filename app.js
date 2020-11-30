$(document).ready(() => {

    console.log('jQuery is Working');
    $('#task-result').hide();
    fetchTasks();
    let updateId = 0;

    $('#search').keyup((e) => {  
        if($('#search').val()) {
            let search = $('#search').val();
            // var request = $.ajax({
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: { search },
                success: (response) => {
                    let tasks = JSON.parse(response);
                    let template = '';
    
                    tasks.forEach(task => {
                        template += `<li>
                            ${task.name}
                        </li>`
                    });
                    $('#container').html(template);
                    if(template.length > 0)
                        $('#task-result').show();
                }
            });                
        } else $('#task-result').hide();
    });

    $('#task-form').submit((e) => {
        e.preventDefault();
        const postData = {
            name: $('#name').val(),
            description: $('#descript').val(),
            updateId: updateId
        }
        $.post('task-addupd.php', postData, (response) => {
            // console.log(response);
            fetchTasks()
            $('#task-form').trigger('reset');
            updateId = 0;
        });
    });

    function fetchTasks() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: (response) => {
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task => {
                    template += `
                        <tr>
                            <td class="taskId text-center" data-id="${task.id}">${task.id}</td>
                            <td>
                                <a href="#" class="task-item" data-id="${task.id}">${task.name}</a>
                            </td>
                            <td>${task.description}</td>
                            <td>
                                <button class="task-delete btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>  
                    `
                });
                $('#tasks').html(template);
            }
        });        
    }

    $(document).on('click', '.task-delete', (e) => {
        if(confirm('Esta seguro de quere eliminarlo? ')){
            let element = e.target.parentElement.parentElement;
            let id = element.querySelector('.taskId').dataset.id;
            $.post('task-delete.php', {id}, response => {
                console.log(response);
                fetchTasks()
            });            
        }
    });

    $(document).on('click', '.task-item', (e) => {
        let element = e.target.parentElement.parentElement;
        let id = element.querySelector('.task-item').dataset.id;
        $.post('task-single.php', {id}, response => {
            const task = JSON.parse(response);
            $('#name').val(task[0].name);
            $('#descript').val(task[0].description);
            updateId = id;
        });
    });
});

