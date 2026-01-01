<template>
  <div class="w-full h-screen flex items-center justify-center">
    <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full overflow-hidden -z-10"></canvas>
    <div class="z-10 bg-black opacity-80 rounded p-6 text-center">
      <div class="flex items-center justify-center">
        <div class="w-18 h-18 overflow-hidden rounded-full">
          <img
            class="!border-none"
            src="https://raw.githubusercontent.com/liaohui5/images/main/images/20260102053322825.png"
          />
        </div>
        <div class="text-white p-2 text-start">
          <p>好记性不如烂笔头 🙃</p>
          <p>有好的坑位欢迎联系我 👀</p>

          <div class="flex justify-between items-center">
            <a href="https://github.com/liaohui5" target="_blank" class="mr-2">
              <svg class="inline-flex" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M11.999 1C5.926 1 1 5.925 1 12c0 4.86 3.152 8.983 7.523 10.437c.55.102.75-.238.75-.53c0-.26-.009-.952-.014-1.87c-3.06.664-3.706-1.475-3.706-1.475c-.5-1.27-1.221-1.61-1.221-1.61c-.999-.681.075-.668.075-.668c1.105.078 1.685 1.134 1.685 1.134c.981 1.68 2.575 1.195 3.202.914c.1-.71.384-1.195.698-1.47c-2.442-.278-5.01-1.222-5.01-5.437c0-1.2.428-2.183 1.132-2.952c-.114-.278-.491-1.397.108-2.91c0 0 .923-.297 3.025 1.127A10.5 10.5 0 0 1 12 6.32a10.5 10.5 0 0 1 2.754.37c2.1-1.424 3.022-1.128 3.022-1.128c.6 1.514.223 2.633.11 2.911c.705.769 1.13 1.751 1.13 2.952c0 4.226-2.572 5.156-5.022 5.428c.395.34.747 1.01.747 2.037c0 1.47-.014 2.657-.014 3.017c0 .295.199.637.756.53C19.851 20.979 23 16.859 23 12c0-6.075-4.926-11-11.001-11"
                />
              </svg>
              <span class="ml-1">GitHub</span>
            </a>
            <a href="mailto:secretx500@qq.com" class="mr-4">
              <svg class="inline-flex" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
                  <path d="M44 24V9H4v30h20m7-3l5 4l8-10" />
                  <path d="m4 9l20 15L44 9" />
                </g>
              </svg>
              <span class="ml-1">Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { init } from "./canvas.ts";

const canvas = ref<null | HTMLCanvasElement>(null);

watchEffect(() => {
  if (canvas.value) {
    init(canvas.value);
  }
});
</script>
