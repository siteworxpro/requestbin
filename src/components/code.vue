<template>
  <div>
    <pre>
    <code :class="codeType" ref="code">
<slot />
    </code>
  </pre>
  </div>
</template>
<style scoped>
code {
  margin-top: -10px;
}
pre {
  background-color: transparent;
  border: none;
  margin: -21px 0 -21px 0;
  padding: 0;
}
.copy {
  font-size: 10px;
  cursor: pointer;
  margin-top: 0;
}
</style>
<script>
import hljs from 'highlight.js'

export default {
  props: {
    codeType: {
      type: String,
      default: () => {
        return 'json'
      }
    }
  },
  mounted() {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    copy() {
      this.$refs.code.select()
      document.execCommand("Copy")
    }
  }
}
</script>