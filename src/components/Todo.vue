<template>
  <div class="todo" :class="{ todo__selected: selected }"  @click="handleClick">
      <div class="todo_head" >
          <div class="todo_icon" :style="{ color }">
              <i :class="['fa', `fa-${todo.icon}`]"></i>
          </div>
          <div class="todo_menu">
              <i class="fa fa-ellipsis-v"></i>
          </div>
      </div>
      <div class="todo_body">
           <p class="todo_tips">{{ todo.tasks.length }} 条任务</p>
           <h3 class="todo_title">{{ todo.name }}</h3>
           <div class="todo_progress">
                <span class="todo_progress_line">
                    <i :style="{ width: progress, backgroundImage: progressColor }"></i>
                </span>
                <span class="todo_progress_num">{{ progress }}</span>
           </div>
           <div class="todo_tasks">
               <h4 class="todo_subtitle" v-if="todayTasks.length">今天</h4>
                <ul>
                    <li v-for="task in todayTasks" :key="task.id">
                        <task :todo="todo" :task="task" />
                    </li>
                </ul>
                <h4 class="todo_subtitle" v-if="tomorrowTasks.length">明天</h4>
                <ul>
                    <li v-for="task in tomorrowTasks" :key="task.id">
                        <task :todo="todo" :task="task" />
                    </li>
                </ul>
                <h4 class="todo_subtitle" v-if="outdatedTasks.length">过期</h4>
                <ul>
                    <li v-for="task in outdatedTasks" :key="task.id">
                        <task :todo="todo" :task="task" />
                    </li>
                </ul>
           </div>
      </div>
  </div>
</template>

<script>
import { today, tomorrow } from '../utils/time'
import Task from './Task'
export default {
    components:{
        Task
    },
    props:{
        todo: {
            type: Object,
            required: true
        },
        selected: {
            type: Boolean
        }
    },
    computed:{
        color () {
            return this.todo.colors[0]
        },
        progress () {
            const totalCount = this.todo.tasks.filter(t => !t.deleted).length
            const doneCount = this.todo.tasks.filter(t => !t.deleted && t.done).length
            return `${Math.round((doneCount / totalCount) * 100)}%`
        },
        progressColor () {
            const colorLeft = `color-stop(30%, ${this.todo.colors[0]})`
            const colorRight = `to(${this.todo.colors[1]})`
            return `-webkit-gradient(linear, left bottom, right bottom, ${colorLeft}, ${colorRight})`
        },
        todayTasks () {
            return this.todo.tasks.filter(task => {
                return task.date >= today && task.date < tomorrow
            })
        },
        tomorrowTasks () {
            return this.todo.tasks.filter(task => {
                return task.date >= tomorrow
            })
        },
        outdatedTasks () {
            return this.todo.tasks.filter(task => {
                return task.date < today
            })
        }
    },
    methods:{
        handleClick () {
            console.log("变了吗？")
            const appRect = document.querySelector('.gradient').getBoundingClientRect()
            const elRect = this.$el.getBoundingClientRect()
            const todo = this.todo
            const rect = {}
            console.log(appRect)
            console.log(elRect)
            rect.top = elRect.top - appRect.top
            rect.left = elRect.left - appRect.left
            rect.width = elRect.width
            rect.height = elRect.height
            rect.appWidth = appRect.width
            rect.appHeight = appRect.height
            console.log(rect)
            this.$emit('select', { rect, todo })
        }
    }
}
</script>

<style lang="scss">
.todo {
  flex: 1;
  margin: 0 8px;
  overflow: hidden;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #666;
}
.todo__selected {
  visibility: hidden;
}
.todo_head {
  display: flex;
  padding: 20px;
  height: 44px;
  justify-content: space-between;
  align-items: flex-start;
  transform: translate3d(0, 0, 0);
  will-change: transform;
}
.todo_body {
  padding: 0 20px;
  transform: translate3d(0, 179px, 0);
  will-change: transform;
}
.todo_icon {
  display: flex;
  width: 44px;
  height: 44px;
  border: 1px solid #E6E6E6;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.todo_menu {
  color: #eee;
}
.todo_tips {
  opacity: 0.6;
  font-size: 13px;
  font-weight: 600;
}
.todo_title {
  margin-top: 6px;
  font-size: 32px;
}
.todo_progress {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.todo_progress_line {
  margin-right: 10px;
  flex: 1;
  height: 3px;
  background-color: #eee;

  i {
    display: block;
    height: 100%;
    transition: all 0.3s ease;
  }
}
.todo_progress_num {
  font-size: 12px;
}
.todo_tasks {
  opacity: 0;
  transform: scale3d(1, 0, 1);
  // transform-origin: top;
  // will-change: transform opacity;
}
.todo_subtitle {
  margin-top: 32px;
  margin-bottom: 8px;
  color: #999;
}
</style>