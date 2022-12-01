<template>
    <form @submit.prevent="handleSubmit">
        <input 
            type="text"
            placeholder="I need to..."
            v-model="newTask"
        >
        <button>Add</button>
    </form>
</template>

<script lang="ts">
    import { useTaskStore } from '@/stores/TaskStore'
    import { defineComponent, ref } from 'vue'

    export default defineComponent({
        setup() {
            const taskStore = useTaskStore()
            const newTask = ref('')
            const handleSubmit = () => {
                if (newTask.value.length > 0) {
                    taskStore.addTask({
                        id: Math.floor(Math.random() * 10000),
                        title: newTask.value,
                        isFav: false
                    })
                    newTask.value = ''
                }
            }
            
            return {
                newTask,
                handleSubmit
            }
        }
    })
</script>

<style scoped>

</style>