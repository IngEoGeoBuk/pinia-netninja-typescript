
import { defineStore } from 'pinia';
import type Task from '../types/Task'

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: <Task[]>[],
        loading: <boolean>false,
    }),
    getters: {
        favs(): Task[] {
            return this.tasks.filter((task) => task.isFav)
        },
        favCount() {
            return this.tasks.reduce((prev, cur) => {
                return cur.isFav ? prev + 1 : prev
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length
        }
    },
    actions: {
        async getTasks() {
            this.loading = true
            const res = await fetch('http://localhost:3000/tasks')
            const data = await res.json()

            this.tasks = data
            this.loading = false
        },
        addTask(task) {
            this.tasks.push(task)
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => {
                return task.id !== id
            })
        },
        toggleFav(id) {
            const task = this.tasks.find((task) => 
                task.id === id
            )
            task.isFav = !task.isFav
        }
    }
})