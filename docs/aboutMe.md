---
layout: page
---

<!-- TODO: 

个人信息页面, 使用 vite 组件

    头像
邮箱 secretx500
  鼠标特效

-->

<div>
  <div>
    关于我页面, 还未完成... {{count}}
  </div>
  <button @click="increment">increment</button>
</div>

<script setup>
import { ref } from 'vue'

const count = ref(0)
function increment() {
  count.value++;
}
</script>

