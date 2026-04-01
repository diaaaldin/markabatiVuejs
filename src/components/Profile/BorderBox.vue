<template>
  <div class="border-box" :class="{ 'border-box--rent': variant === 'rent' }">
    <div v-if="title" class="border-box__head">
      <span class="border-box__accent" aria-hidden="true" />
      <span class="border-box__title">{{ title }}</span>
    </div>
    <div class="border-box__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BorderBox',
  props: {
    title: {
      type: String,
      default: '',
    },
    /** 'sale' | 'rent' — subtle tint difference */
    variant: {
      type: String,
      default: 'sale',
    },
  },
};
</script>

<style scoped>
.border-box {
  --bb-accent: #26d829;
  --bb-accent-soft: rgba(38, 216, 41, 0.12);
  --bb-border: rgba(38, 216, 41, 0.28);
  border: 1px solid var(--bb-border);
  border-radius: 14px;
  background: linear-gradient(145deg, rgba(38, 216, 41, 0.07) 0%, #ffffff 42%, #fafafa 100%);
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 1.25rem;
}

.border-box--rent {
  background: linear-gradient(145deg, rgba(38, 216, 41, 0.09) 0%, #ffffff 40%, #f8fffb 100%);
}

.border-box__head {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.85rem 1.1rem;
  border-bottom: 1px solid var(--bb-accent-soft);
  background: rgba(255, 255, 255, 0.85);
}

.border-box__accent {
  width: 4px;
  height: 1.15rem;
  border-radius: 4px;
  background: linear-gradient(180deg, var(--bb-accent), #1ea822);
  flex-shrink: 0;
}

.border-box__title {
  font-weight: 600;
  font-size: 1rem;
  color: #1c1c1c;
  letter-spacing: 0.01em;
}

.border-box__body {
  padding: 1.1rem 1.15rem 0.85rem;
}

/* Price privacy row — RTL-friendly */
.border-box :deep(.price-privacy-toggle) {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  margin-bottom: 0.35rem;
}

.border-box :deep(.price-privacy-toggle__input) {
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
  accent-color: #26d829;
  cursor: pointer;
  border-radius: 4px;
}

.border-box :deep(.price-privacy-toggle__text) {
  flex: 1;
  font-weight: 600;
  color: #222;
  line-height: 1.5;
}

.border-box :deep(.price-privacy-hint) {
  font-size: 0.88rem;
  color: #5a6570;
  line-height: 1.55;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  background: rgba(38, 216, 41, 0.06);
  border: 1px dashed rgba(38, 216, 41, 0.35);
  margin-top: 0.5rem;
}

.border-box :deep(.price-fields-enter-active),
.border-box :deep(.price-fields-leave-active) {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.border-box :deep(.price-fields-enter-from),
.border-box :deep(.price-fields-leave-to) {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
