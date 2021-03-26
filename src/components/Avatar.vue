<template>
  <div class="avatar" :class="{ avatar__selected: !!selected }">
      <div class="avatar_face">
          <img src="../assets/face.png" alt="">
      </div>
      <h2 class="avatar_name">Hi,喵大侠侠</h2>
      <p class="avatar_tips">
        又是美好的一天。<br />你今天有 {{ todayTasks.length }}条任务代办
      </p>
      <p class="avatar_date">今天 : {{ today | dateString }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    data(){
        return{
            today: new Date()
        }
    },
    computed: {
        ...mapState(['selected']),
        ...mapGetters(['todayTasks'])
    },
    filters:{
        dateString(val){
            return val.getFullYear()+'年'+(val.getMonth()+1)+'月'+val.getDate()+'日'
        }
    }
}
</script>

<style lang="scss">
.avatar{
  display: flex;
  padding: 0 40px;
  height: 300px;
  justify-content: flex-end;
  flex-direction: column;
  transition: all 0.5s ease;
  .avatar_face{
    width: 44px;
    height: 44px;
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    img{
        height:100%;
        width:100%;
        display:block;
    }
  }
  .avatar_name{
    margin-top: 32px;
    padding: 0 6px;
    font-size: 32px;
    letter-spacing: 1px;
    font-weight: 300;
  }
  .avatar_tips{
    margin-top: 16px;
    padding: 0 6px;
    font-size: 13px;
    font-weight: 100;
    opacity: 0.8;
    line-height: 1.6em;
  }
  .avatar_date {
    margin-top: 44px;
    margin-bottom: 16px;
    padding: 0 6px;
    font-size: 14px;
}
}
.avatar__selected{
  transform: translate3d(0, 20px, 0);
  opacity: 0;
}
</style>