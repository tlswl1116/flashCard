<template>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      setting: {
        sceneWidth: 1000,
        sceneHeight: 625, // => 1000 * 10 / 16;

        sceneZindex: 1,
        membraneZindex: 5,
        underMembraneZindex: 4,
        overMembraneZindex: 7,
        widgetZindex: 10,
        topMostZindex: 100,

        numberOfAttempts: 1, // 시도 가능 회수

        startRoundMembraneAlpha: 0.5, // 액티비티에 대한 설명 출력시 검정 배경 알파값
        endInningMembraneAlpha: 0.7, // 인닝 종료시 검정 배경 알파값
      },
    };
  },
  methods: {
    fitAppSize() {
      const app = document.getElementById("app");
      const horzScale = window.innerWidth / this.setting.sceneWidth;
      const vertScale = window.innerHeight / this.setting.sceneHeight;
      if (horzScale > vertScale) {
        app.style.transform = `translateX(${(window.innerWidth - this.setting.sceneWidth * vertScale) / 2}px) scale(${vertScale})`;
      } else {
        app.style.transform = `translateY(${(window.innerHeight - this.setting.sceneHeight * horzScale) / 2}px) scale(${horzScale})`;
      }
    },
  },
  mounted() {
    this.fitAppSize();

    window.onresize = () => {
      this.fitAppSize();
    };
  },
};
</script>

<style lang="scss">
#app {
  width: 1000px;
  height: 625px;
  transform-origin: left top;
}
</style>
