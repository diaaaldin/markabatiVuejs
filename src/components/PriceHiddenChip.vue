<template>
  <span class="price-hidden" :title="text" :aria-label="text">
    <svg
      v-if="showIcon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.1 2.1L21.9 21.9" stroke="#26d829" stroke-width="2" stroke-linecap="round" />
      <path
        d="M10.58 10.58C10.77 10.21 11.17 10 11.6 10C12.2 10 12.7 10.5 12.7 11.1C12.7 11.53 12.49 11.93 12.12 12.12"
        stroke="#26d829"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M9.88 5.08C10.45 4.99 11.04 4.95 11.65 4.95C18.2 4.95 22 11 22 11C21.4 12.06 20.6 13.1 19.6 14.03"
        stroke="#26d829"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M6.23 6.23C3.9 7.6 2 10.2 2 11C2 11 5.8 17.05 12.35 17.05C13.62 17.05 14.79 16.79 15.83 16.35"
        stroke="#26d829"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
    <span class="price-hidden-text">{{ text }}</span>
  </span>
</template>

<script>
export default {
  name: 'PriceHiddenChip',
  props: {
    text: {
      type: String,
      default: 'السعر مخفي',
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

