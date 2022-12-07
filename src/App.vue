<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <button @click="filterTask = 'all'">All tasks</button>
      <button @click="filterTask = 'favs'">Fav tasks</button>
    </nav>

    <div class="loading" v-if="loading">Loadind tasks...</div>

    <div class="task-list" v-if="filterTask === 'all'">
      <p>your have {{ totalCount }} tasks left to do</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task"/>
      </div>
    </div>
    <div class="task-list" v-if="filterTask === 'favs'">
      your have {{ favCount }} tasks left to do
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task"/>
      </div>
    </div>
    <button @click="taskStore.$reset">reset state</button>
  </main>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'
import { useTaskStore } from './stores/TaskStore'
import { defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    TaskDetails,
    TaskForm
  },
  setup() {
    const taskStore = useTaskStore()

    const { 
      tasks, 
      loading, 
      favs, 
      totalCount, 
      favCount 
    } = storeToRefs(taskStore)

    // fetch tasks
    taskStore.getTasks();
    const filterTask = ref('all');
    
    return { 
      taskStore, 
      filterTask, 
      tasks, 
      loading, 
      favs, 
      totalCount, 
      favCount 
    }
  },
});
</script>