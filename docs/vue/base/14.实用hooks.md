## 开源库

[vueuse](https://vueuse.org/) 是一个开源的 实用的 vue 组合式 API 库

## 倒计时

::: code-group

```js [倒计时]
import { isCallable } from "@/tools";
import { ref } from "vue";

// 倒计时
export function useCountDown(initSecs = 5) {
	const seconds = initSecs;
	const countdown = ref(seconds);

	let timer;
	function startCountdown(onEnd) {
		timer && clearTimeout(timer);
		timer = setInterval(() => {
			countdown.value -= 1;
			if (countdown.value <= 0) {
				timer && clearTimeout(timer);
				isCallable(onEnd) && onEnd();
			}
		}, 1000);
	}

	function restartCountdown(onEnd) {
		countdown.value = seconds;
		startCountdown(onEnd);
	}

	return {
		countdown,
		startCountdown,
		restartCountdown,
	};
}
```

```vue [应用: 60s之后再次发送短信]
<template>
  <button @click="handleClick">
    <span>发送短信验证码</span>
    <span v-if="isDisabled">({{ countdown }})</span>
  </button>
</template>

<script setup>
import { ref } from "vue";
import { useCountDown } from "@/hooks";

const isDisabled = ref(false);
const { countdown, restartCountdown } = useCountDown(60);

function handleClick() {
  if (isDisabled.value) {
    return;
  }

  isDisabled.value = true;
  restartCountdown(() => {
    isDisabled.value = false;
  });
}
</script>
```

:::

## 可重置的响应式对象

::: code-group
```js [可重置的响应式对象]
import { reactive, ref } from "vue";

// 深度克隆
function deepClone(obj) {
	return structuredClone(obj);
}

// 可以重置的 reactive
export function useResettableRective(obj) {
	const initial = deepClone(obj);
	const state = reactive(obj);

	function reset() {
		return Object.assign(state, initial);
	}

	// 可以这样返回, 看编码习惯
	// return { state, reset };
	// return [ state, reset ];

	// 也可以直接这样
	state.$reset = reset;
	return state;
}

// 可以重置的ref
export function useResettableRef(value) {
	const initial = deepClone(value);
	const state = ref(value);

	function reset() {
		state.value = deepClone(initial);
	}

	state.$reset = reset;
	return state;
}
```

```vue [应用: 重置表单]
<template>
  <form action="">
    <input type="text" v-model="formData1.email" placeholder="email" />
    <input type="password" v-model="formData1.password" placeholder="password" />
  </form>
  <form action="">
    <input type="text" v-model="formData2.email" placeholder="email" />
    <input type="password" v-model="formData2.password" placeholder="password" />
  </form>
  <button @click="handleClick">reset</button>
</template>

<script setup>
import { useResettableRef, useResettableReactive } from "./hooks";

const formData1 = useResettableReactive({
  email: "",
  password: "",
});

const formData2 = useResettableRef({
  email: "",
  password: "",
});

function handleClick() {
  formData1.$reset();
  formData2.$reset();
}
</script>
```
:::

