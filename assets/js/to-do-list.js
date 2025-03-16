// Système de gestion des tâches avec localStorage
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task');
    const addTaskBtn = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    
    // Créer un compteur de tâches
    const taskCounter = document.createElement('div');
    taskCounter.id = 'task-counter';
    document.getElementById('To-Do-List').appendChild(taskCounter);
    
    // Message quand il n'y a pas de tâches
    const emptyMessage = document.createElement('div');
    emptyMessage.id = 'empty-tasks';
    emptyMessage.textContent = 'Aucune tâche pour le moment';
    taskList.after(emptyMessage);
    
    // Charger les tâches depuis le localStorage
    loadTasks();
    
    // Ajouter une tâche lorsqu'on clique sur le bouton
    addTaskBtn.addEventListener('click', addTask);
    
    // Ajouter une tâche lorsqu'on appuie sur Entrée
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Fonction pour ajouter une tâche
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            // Animation d'erreur si le champ est vide
            taskInput.classList.add('error');
            setTimeout(() => taskInput.classList.remove('error'), 500);
            return;
        }
        
        // Créer un objet tâche avec un identifiant unique
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        // Ajouter la tâche à la liste
        addTaskToList(task);
        
        // Ajouter la tâche au localStorage
        saveTask(task);
        
        // Vider le champ de saisie
        taskInput.value = '';
        
        // Mettre le focus sur le champ de saisie
        taskInput.focus();
        
        // Mettre à jour le compteur de tâches
        updateTaskCounter();
        
        // Cacher le message "aucune tâche"
        emptyMessage.style.display = 'none';
    }
    
    // Fonction pour ajouter une tâche à la liste HTML
    function addTaskToList(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        
        // Conteneur pour le texte de la tâche
        const taskTextSpan = document.createElement('span');
        taskTextSpan.classList.add('task-text');
        taskTextSpan.textContent = task.text;
        
        // Si la tâche est complétée, ajouter la classe
        if (task.completed) {
            taskTextSpan.classList.add('completed');
        }
        
        // Conteneur pour les boutons d'action
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('task-actions');
        
        // Bouton pour marquer comme complétée
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.innerHTML = '✓';
        completeBtn.title = 'Marquer comme terminée';
        completeBtn.addEventListener('click', function() {
            toggleTaskComplete(task.id);
        });
        
        // Bouton pour supprimer
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '×';
        deleteBtn.title = 'Supprimer la tâche';
        deleteBtn.addEventListener('click', function() {
            deleteTask(task.id);
        });
        
        // Assembler les éléments
        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(deleteBtn);
        li.appendChild(taskTextSpan);
        li.appendChild(actionsDiv);
        
        // Ajouter à la liste
        taskList.appendChild(li);
    }
    
    // Fonction pour charger les tâches depuis le localStorage
    function loadTasks() {
        // Récupérer les tâches du localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        // Afficher chaque tâche
        if (tasks.length > 0) {
            tasks.forEach(task => {
                addTaskToList(task);
            });
            emptyMessage.style.display = 'none';
        } else {
            emptyMessage.style.display = 'block';
        }
        
        // Mettre à jour le compteur
        updateTaskCounter();
    }
    
    // Fonction pour sauvegarder une tâche
    function saveTask(task) {
        // Récupérer les tâches existantes
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        // Ajouter la nouvelle tâche
        tasks.push(task);
        
        // Sauvegarder dans localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Fonction pour supprimer une tâche
    function deleteTask(id) {
        // Récupérer l'élément HTML
        const taskElement = document.querySelector(`li[data-id="${id}"]`);
        
        // Animation de suppression
        taskElement.style.animation = 'fadeOut 0.3s ease forwards';
        
        setTimeout(() => {
            // Supprimer l'élément du DOM
            taskElement.remove();
            
            // Supprimer la tâche du localStorage
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks = tasks.filter(task => task.id !== id);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            // Mettre à jour le compteur
            updateTaskCounter();
            
            // Afficher le message si la liste est vide
            if (tasks.length === 0) {
                emptyMessage.style.display = 'block';
            }
        }, 300);
    }
    
    // Fonction pour marquer une tâche comme complétée ou non
    function toggleTaskComplete(id) {
        // Récupérer les tâches
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        // Trouver l'index de la tâche
        const taskIndex = tasks.findIndex(task => task.id === id);
        
        if (taskIndex !== -1) {
            // Inverser l'état de la tâche
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            
            // Sauvegarder les modifications
            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            // Mettre à jour l'affichage
            const taskElement = document.querySelector(`li[data-id="${id}"] .task-text`);
            if (tasks[taskIndex].completed) {
                taskElement.classList.add('completed');
            } else {
                taskElement.classList.remove('completed');
            }
            
            // Mettre à jour le compteur
            updateTaskCounter();
        }
    }
    
    // Fonction pour mettre à jour le compteur de tâches
    function updateTaskCounter() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const completedTasks = tasks.filter(task => task.completed).length;
        
        taskCounter.textContent = `${completedTasks}/${tasks.length} tâches terminées`;
        
        // Si toutes les tâches sont terminées et qu'il y a au moins une tâche
        if (completedTasks === tasks.length && tasks.length > 0) {
            taskCounter.style.color = 'rgba(255, 255, 255, 0.9)';
            // Ajouter une petite animation ou effet pour célébrer
            taskCounter.style.animation = 'pulse 1s ease';
            setTimeout(() => {
                taskCounter.style.animation = '';
            }, 1000);
        } else {
            taskCounter.style.color = 'rgba(255, 255, 255, 0.7)';
        }
    }
    
    // Ajouter l'animation pour le compteur de tâches
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .error {
            animation: shake 0.5s ease;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});n