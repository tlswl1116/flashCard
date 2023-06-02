<template>
  <div>
    <h1 class="main-title">{{ flashtitle }}</h1>

    <ol class="unit-wrap">
      <li class="unit-item" v-for="item in flashunit" :key="item.flashunit_uid">
        <h2 class="unit-name">{{ `Unit ${item.flashunit_uid}` }}</h2>
        <dl class="unit-info">
          <dt class="title">{{ item.fc_title }}</dt>
          <dd class="desc">{{ item.fc_desc }}</dd>
        </dl>
        <div class="unit-check">
          <span class="input-check solo">
            <input type="checkbox" :id="`chk-unit${item.flashunit_uid}`" v-model="chkUnit" :value="item.flashunit_uid" />
            <label :for="`chk-unit${item.flashunit_uid}`"></label>
          </span>
        </div>
      </li>
    </ol>

    <div class="random-area">
      <span class="input-check">
        <input type="checkbox" id="chk-random" v-model="random" />
        <label for="chk-random">Randomly</label>
      </span>
    </div>

    <div class="util-area">
      <div class="btn-group">
        <button type="button" v-for="(item, idx) in studyType" :key="item" class="btn" :class="{ active: activeType === idx + 1 }" @click="setStudyType(idx + 1)">{{ item }}</button>
      </div>

      <button type="button" class="btn-start" @click="openCard()">START</button>
    </div>

    <TheCard v-if="openCardFlag" @closeCard="onCloseCard" :activeType="activeType" :flashtitle="flashtitle" :cardList="cardList" :totalCnt="totalCnt"></TheCard>
  </div>
</template>

<script>
import axios from "@/service/axios";
import TheCard from "@/views/TheCard.vue";

export default {
  name: "TheMain",
  components: { TheCard },
  data() {
    return {
      openCardFlag: false,
      studyType: ["Picture", "Word", "Blended"],
      activeType: 1,
      prodId: null,
      random: false,
      chkUnit: [],
      flashtitle: null,
      flashunit: [],
      cardList: [],
      totalCnt: 0,
    };
  },
  methods: {
    async init() {
      const urls = `/flash_unit?prod_uid=${this.prodId}`;
      console.log(urls);
      const res = await axios.get(urls);

      if (res.data.result_code === "success") {
        this.flashunit = res.data.flashunit;
        this.flashtitle = res.data.flashtitle;
      }
    },
    async openCard() {
      if (this.chkUnit.length < 1) {
        alert("유닛을 선택해 주세요.");
        return;
      }

      const unitId = Object.values(this.chkUnit);
      const random = this.random ? 1 : 0;
      const activeType = this.activeType;
      const urls = `/flash_word?puid=${this.prodId}&flashunit_uid=${unitId}&is_rand=${random}&card_type=${activeType}`;
      const res = await axios.get(urls);

      this.cardList = res.data.flashword.reverse();
      this.totalCnt = res.data.flashword.length;
      this.openCardFlag = true;
    },
    onCloseCard() {
      this.openCardFlag = false;
    },
    setStudyType(myType) {
      this.activeType = myType;
    },
  },
  mounted() {
    this.prodId = this.$route.query.prod_uid ? this.$route.query.prod_uid : "1481";

    this.init();
  },
};
</script>
