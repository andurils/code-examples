<template>
  <transition name="me-alert-fade">
    <div class="me-alert" :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]" v-show="visible" role="alert">
      <i class="me-alert__icon" :class="[iconClass, isBigIcon]" v-if="showIcon"></i>
      <div class="me-alert__content">
        <span class="me-alert__title" :class="[isBoldTitle]" v-if="title || $slots.title">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="me-alert__description" v-if="$slots.default && !description"><slot></slot></p>
        <p class="me-alert__description" v-if="description && !$slots.default">{{ description }}</p>
        <i class="me-alert__closebtn" :class="{ 'is-customed': closeText !== '', 'me-icon-close': closeText === '' }" v-show="closable" @click="close()">{{
          closeText
        }}</i>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
const TYPE_CLASSES_MAP = {
  success: 'me-icon-success',
  warning: 'me-icon-warning',
  error: 'me-icon-error',
}
export default {
  name: 'MeAlert',

  props: {
    // 标题
    title: {
      type: String,
      default: '',
    },
    // 辅助性文字。也可通过默认 slot 传入
    description: {
      type: String,
      default: '',
    },
    // 主题		success/warning/info/error
    type: {
      type: String,
      default: 'info',
    },
    // 是否可关闭
    closable: {
      type: Boolean,
      default: true,
    },
    // 关闭按钮自定义文本
    closeText: {
      type: String,
      default: '',
    },
    // 是否显示图标
    showIcon: Boolean,
    // 文字是否居中
    center: Boolean,
    // 选择提供的主题	 light/dark
    effect: {
      type: String,
      default: 'light',
      validator: function (value) {
        return ['light', 'dark'].indexOf(value) !== -1
      },
    },
  },

  data() {
    return {
      visible: true,
    }
  },

  methods: {
    close() {
      this.visible = false
      this.$emit('close')
    },
  },

  computed: {
    typeClass() {
      return `me-alert--${this.type}`
    },

    iconClass() {
      return TYPE_CLASSES_MAP[this.type] || 'me-icon-info'
    },

    isBigIcon() {
      return this.description || this.$slots.default ? 'is-big' : ''
    },

    isBoldTitle() {
      return this.description || this.$slots.default ? 'is-bold' : ''
    },
  },
}
</script>
