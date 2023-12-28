<template>
  <div class="tab-section">
    <ul class="tabs">
      <li
        v-for="(tab, index) in tabList"
        :key="index"
        :class="{'tab-active': index + 1 === activeTab}"
      >
        <label
          :for="`${index}`"
          v-text="tab"
          class="tab-btn"
          :class="activeTab"
        />
        <input
          :id="`${index}`"
          type="radio"
          :name="`${index}-tab`"
          :value="index + 1"
          v-model="activeTab"
          class="tab-input"
        />
      </li>
    </ul>
    <template v-for="(tab, index) in tabList">
      <div :key="index" v-if="index + 1 === activeTab" class="tab-content">
        <slot :name="`tab-${index + 1}`" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps(["tabList"])

const activeTab = ref(1)
</script>


