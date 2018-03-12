<template lang="html">
  <div class="waterfall-container">
    <div :class='`picture-box-wrapper classification-${lid}`'></div>
  </div>
</template>

<script>
export default {
  props: ['lid'],
  data() {
    return {
      init: false
    }
  },
  mounted(){

  },
  activated(){

  },
  watch: {

  },
  methods: {
    //模拟滚动条滚动时随机添加内容
    addPicBox(imgsArr) {
      if(!this.init){
        $(".classification-" + this.lid).gridalicious({
          selector: '.picture-box',
          width: 360,
          gutter: 20,
          animate: true,
          animationOptions: {
            speed: 200,
            duration: 300,
            effect: 'fadeInOnAppear',
            queue: true,
            complete: function () {}
          }
        });
        this.init = true
      }
      setTimeout(()=>{
        let box = [];
        // console.log(arr);
        for(let i=0;i < imgsArr.length;i++){
          let $div = $('<div class="picture-box"></div>');
          let content = `
          <img src="`+ imgsArr[i].purl +`" alt="">
          <div class="picture-wrapper" data-pic-info="`+ imgsArr[i].uid +`">

          </div>`;
          $div.append(content);
          box.push($div);
        }
        $(".classification-" + this.lid).gridalicious('append', box);
      },100)
    }
  }
}
</script>

<style>
.picture-box-wrapper {
  width: 100%;
}
.picture-box {
  border-radius: 3px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 10px;
}
</style>
