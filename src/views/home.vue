<template>
  <div class="home">
      <app-bar title="todo" left="bars" right="search"></app-bar>
      <avatar></avatar>
      <gradient></gradient>
      <todo-list></todo-list>
      <todo-detail></todo-detail>
      <todo-editing></todo-editing>
      <floating-button></floating-button>
  </div>
</template>

<script>
import AppBar from '../components/AppBar'
import Avatar from '../components/Avatar'
import FloatingButton from '../components/FloatingButton.vue'
import Gradient from '../components/Gradient.vue'
import TodoDetail from '../components/TodoDetail.vue'
import TodoEditing from '../components/TodoEditing.vue'
import TodoList from '../components/TodoList.vue'

export default {
    components:{
        AppBar,
        Avatar,
        Gradient,
        TodoList,
        TodoDetail,
        TodoEditing,
        FloatingButton
    }
}

</script>


<style>
.home {
  height: 100%;
  width: 100%;
  overflow: hidden;
  color: white;
}
</style>
