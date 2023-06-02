<template>
  <div class="pop-card">
    <button type="button" class="btn-sound ico-type" @click="listenWord()">sound</button>

    <div class="card-box">
      <div class="card-title">{{ flashtitle }}</div>

      <ul class="card-list" :class="{ 'flip-type': activeType === 3 }">
        <li class="item" ref="cardItem" v-for="item in cardList" :key="item.word">
          <div class="card-img" :class="{ active: activeFlip, cursor: isActiveType }" @click="flipCard()">
            <div class="flip">
              <div class="card-front" v-if="activeType !== 2">
                <img :src="item.img" :alt="item.word" />
              </div>
              <div class="card-back" v-if="activeType !== 1">
                <strong class="word">{{ item.word }}</strong>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="card-paging">
        <button type="button" class="btn-arrow ico-type prev" @click="prevCard()">prev</button>
        <span class="count">
          <em class="current">{{ totalCnt + 1 - activeCnt }}</em> / {{ totalCnt }}
        </span>
        <button type="button" class="btn-arrow ico-type next" @click="nextCard()">next</button>
      </div>
    </div>

    <audio ref="cardSound" :src="soundSrc"></audio>

    <button type="button" class="btn-close ico-type" @click="closeCard()">close</button>
  </div>
</template>

<script>
export default {
  name: "TheCard",
  props: {
    flashtitle: {
      type: String,
    },
    activeType: {
      type: Number,
    },
    cardList: {
      type: Array,
    },
    totalCnt: {
      type: Number,
    },
  },
  computed: {
    isActiveType() {
      return this.activeType === 3;
    },
  },
  data() {
    return {
      soundSrc: null,
      activeFlip: false,
      activeCnt: 1,
    };
  },
  methods: {
    closeCard() {
      this.$emit("closeCard");
    },
    flipCard() {
      if (this.activeType !== 3) return;

      this.activeFlip = !this.activeFlip;
    },
    prevCard() {
      if (this.activeCnt >= this.totalCnt) {
        this.activeCnt = this.totalCnt;
        alert("첫 카드 입니다.");
      } else {
        this.activeCnt = this.activeCnt + 1;
        this.changeCard(this.activeCnt - 1, "prev");
        this.setSound(this.activeCnt - 1);
      }
    },
    nextCard() {
      if (this.activeCnt - 1 <= 0) {
        this.activeCnt = 1;
        alert("마지막 카드 입니다.");
      } else {
        this.activeCnt = this.activeCnt - 1;
        this.changeCard(this.activeCnt, "next");
        this.setSound(this.activeCnt - 1);
      }
    },
    changeCard(idx, dir) {
      const myCard = this.$refs.cardItem[idx];
      let activeClass = dir === "next" ? "next" : "prev";
      let zClass = dir === "next" ? "z1" : "z2";

      this.$refs.cardItem[idx].classList.add(activeClass);

      myCard.onanimationend = () => {
        myCard.classList.remove(activeClass, "z1", "z2");
        myCard.classList.add(zClass);
      };
    },
    setSound(idx) {
      this.soundSrc = this.cardList[idx].mp3;
    },
    listenWord() {
      this.$refs.cardSound.play();
    },
  },
  mounted() {
    this.activeCnt = this.totalCnt;
    this.setSound(this.activeCnt - 1 < 0 ? 0 : this.activeCnt - 1);
  },
};
</script>
