import Vue from 'vue'
import Vuex from 'vuex'
import { tomorrow } from '../utils/time'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        currentIndex:0,
        todos:[
            {
                icon: 'user',
                name: '个人',
                tasks: [
                  {
                    id: 1,
                    title: '下午茶',
                    date: new Date(),
                    done: false,
                    deleted: false
                  }
                ],
                colors: [ '#C779D0', '#FEAC5E']
              },
              {
                icon: 'suitcase',
                name: '工作',
                tasks: [
                  {
                    id: 3,
                    title: 'CSS动画特效学习',
                    date: new Date(),
                    done: true,
                    deleted: false
                  },
                  {
                    id: 4,
                    title: '首页制作',
                    date: new Date(),
                    done: false,
                    deleted: false
                  },
                  {
                    id: 5,
                    title: '需求评审会议',
                    date: new Date(),
                    done: false,
                    deleted: false
                  },
                  {
                    id: 6,
                    title: '前后端数据联调',
                    date: new Date(),
                    done: false,
                    deleted: false
                  },
                  {
                    id: 7,
                    title: '详情页制作',
                    date: new Date(),
                    done: false,
                    deleted: false
                  },
                  {
                    title: '通讯录功能',
                    date: new Date('2020-09-16'),
                    done: false,
                    deleted: false
                  },
                  {
                    id: 8,
                    title: '页面设计审美练习',
                    date: new Date('2020-10-16'),
                    done: false,
                    deleted: false
                  }
                ],
                colors: ['#654ea3', '#eaafc8']
              },
              {
                icon: 'home',
                name: '家庭',
                tasks: [
                  {
                    id: 2,
                    title: '房间卫生',
                    date: new Date(),
                    done: true,
                    deleted: false
                  }
                ],
                colors: [ '#3494E6','#EC6EAD']
              }
        ],
        selected: null,
        unselect: null,
        editing: null
    },
    getters:{
        currentTodo(state){
            return state.todos[state.currentIndex]
        },
        todayTasks(state){
            const tasks = []
            state.todos.forEach(todo => {
                todo.tasks.forEach( task => {
                    if(task.date <= tomorrow && !task.done && !task.deleted){
                        tasks.push(task)
                    }
                })
            })
            return tasks
        }
    },
    mutations:{
        selectTodo(state,selected){
            state.unselect = null
            state.selected = selected
        },
        unselectTodo (state) {
            state.unselect = state.selected
            state.selected = null
        },
        nextTodo (state) {
            if (state.currentIndex < state.todos.length - 1) {
              state.currentIndex++
            }
        },
        prevTodo (state) {
            if (state.currentIndex > 0) {
              state.currentIndex--
            }
        },
        deleteTask (_, { task }) {
            task.deleted = true
        },
        toggleEditing(state){
            if(state.editing && state.editing.text){
                state.selected.todo.tasks.unshift({
                    title: state.editing.text,
                    date: new Date(),
                    done: false,
                    deleted: false
                })
            }
            state.editing = state.editing ? null : { text: '' }
        }
    },
    actions:{}
})

