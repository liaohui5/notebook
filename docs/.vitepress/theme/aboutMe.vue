<template>
  <div class="w-full h-screen flex items-center justify-center">
    <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full overflow-hidden -z-10"></canvas>
    <div class="z-10 rounded-xl p-8 text-center max-w-2xl mx-4" style="background: rgba(20, 20, 40, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(125, 100, 255, 0.25); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);">
      <div class="flex flex-col items-center">
        <div class="w-24 h-24 overflow-hidden rounded-full mb-5" style="box-shadow: 0 0 20px rgba(189, 52, 254, 0.5), 0 0 40px rgba(65, 209, 255, 0.3);">
          <img
            class="!border-none w-full h-full object-cover"
            src="https://notebook-imgbed.s3.bitiful.net/notebook-imgbed/2026_06_18_2d7ebf4b9ea2f13099e9bfb7a5fbadbd.jpg"
          />
        </div>
        <div class="text-white">
          <h2 class="text-3xl font-bold mb-3" style="background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">好记性不如烂笔头 🙃</h2>
          <p class="text-lg mb-4" style="color: rgba(255, 255, 255, 0.7);">有好的坑位欢迎联系我 👀</p>
          <div class="flex justify-center items-center gap-4 mb-6">
            <a href="https://github.com/liaohui5" target="_blank" class="flex items-center gap-1.5 transition-all duration-300 hover:scale-110" style="color: #bd34fe;">
              <svg class="inline-flex" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M11.999 1C5.926 1 1 5.925 1 12c0 4.86 3.152 8.983 7.523 10.437c.55.102.75-.238.75-.53c0-.26-.009-.952-.014-1.87c-3.06.664-3.706-1.475-3.706-1.475c-.5-1.27-1.221-1.61-1.221-1.61c-.999-.681.075-.668.075-.668c1.105.078 1.685 1.134 1.685 1.134c.981 1.68 2.575 1.195 3.202.914c.1-.71.384-1.195.698-1.47c-2.442-.278-5.01-1.222-5.01-5.437c0-1.2.428-2.183 1.132-2.952c-.114-.278-.491-1.397.108-2.91c0 0 .923-.297 3.025 1.127A10.5 10.5 0 0 1 12 6.32a10.5 10.5 0 0 1 2.754.37c2.1-1.424 3.022-1.128 3.022-1.128c.6 1.514.223 2.633.11 2.911c.705.769 1.13 1.751 1.13 2.952c0 4.226-2.572 5.156-5.022 5.428c.395.34.747 1.01.747 2.037c0 1.47-.014 2.657-.014 3.017c0 .295.199.637.756.53C19.851 20.979 23 16.859 23 12c0-6.075-4.926-11-11.001-11"
                />
              </svg>
              <span class="font-medium">GitHub</span>
            </a>
            <a href="mailto:secretx500@qq.com" class="flex items-center gap-1.5 transition-all duration-300 hover:scale-110" style="color: #41d1ff;">
              <svg class="inline-flex" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
                  <path d="M44 24V9H4v30h20m7-3l5 4l8-10" />
                  <path d="m4 9l20 15L44 9" />
                </g>
              </svg>
              <span class="font-medium">Email</span>
            </a>
          </div>
          <div class="mb-2" style="height: 1px; background: linear-gradient(90deg, transparent, rgba(189, 52, 254, 0.5), rgba(65, 209, 255, 0.5), transparent);"></div>
          <h3 class="text-left text-xl font-semibold mb-4 mt-5" style="color: #bd34fe;">📦 开源项目</h3>
          <div class="flex flex-col gap-3 text-left">
            <a href="https://github.com/liaohui5/fiber-curd-api" target="_blank" class="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:translate-x-1" style="background: rgba(189, 52, 254, 0.08); border: 1px solid rgba(189, 52, 254, 0.2);">
              <svg class="flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                <path fill="#bd34fe" fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10" clip-rule="evenodd" />
              </svg>
              <div>
                <p class="font-semibold text-base transition-colors duration-300 group-hover:text-[#bd34fe]" style="color: rgba(255, 255, 255, 0.9);">fiber-curd-api</p>
                <p class="text-sm" style="color: rgba(255, 255, 255, 0.4);">基于 Fiber 框架的 CURD API 实现</p>
              </div>
              <svg class="ml-auto flex-shrink-0 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="color: #bd34fe;">
                <path fill="currentColor" d="M13.025 1l-2.847 2.828L6.174 1.22L5.55 3.06l4.152.061L5.37 6.54l1.893 1.364l3.888-2.749l3.745 2.788l-1.893 1.364l-4.217-.051l4.178 2.84l1.624-1.393l-2.784-2.862l2.848-2.838l2.783 2.862z" transform="rotate(45 12 12)" />
              </svg>
            </a>
            <a href="https://github.com/liaohui5/mini-browser-start-page" target="_blank" class="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:translate-x-1" style="background: rgba(65, 209, 255, 0.08); border: 1px solid rgba(65, 209, 255, 0.2);">
              <svg class="flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                <path fill="#41d1ff" fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10" clip-rule="evenodd" />
              </svg>
              <div>
                <p class="font-semibold text-base transition-colors duration-300 group-hover:text-[#41d1ff]" style="color: rgba(255, 255, 255, 0.9);">mini-browser-start-page</p>
                <p class="text-sm" style="color: rgba(255, 255, 255, 0.4);">简约高效的浏览器起始页</p>
              </div>
              <svg class="ml-auto flex-shrink-0 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="color: #41d1ff;">
                <path fill="currentColor" d="M13.025 1l-2.847 2.828L6.174 1.22L5.55 3.06l4.152.061L5.37 6.54l1.893 1.364l3.888-2.749l3.745 2.788l-1.893 1.364l-4.217-.051l4.178 2.84l1.624-1.393l-2.784-2.862l2.848-2.838l2.783 2.862z" transform="rotate(45 12 12)" />
              </svg>
            </a>
            <a href="https://github.com/liaohui5/media-devices-demo" target="_blank" class="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:translate-x-1" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1);">
              <svg class="flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                <path fill="#a0a0c0" fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10" clip-rule="evenodd" />
              </svg>
              <div>
                <p class="font-semibold text-base transition-colors duration-300 group-hover:text-[#c0c0e0]" style="color: rgba(255, 255, 255, 0.9);">media-devices-demo</p>
                <p class="text-sm" style="color: rgba(255, 255, 255, 0.4);">浏览器媒体设备 API 演示</p>
              </div>
              <svg class="ml-auto flex-shrink-0 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="color: #a0a0c0;">
                <path fill="currentColor" d="M13.025 1l-2.847 2.828L6.174 1.22L5.55 3.06l4.152.061L5.37 6.54l1.893 1.364l3.888-2.749l3.745 2.788l-1.893 1.364l-4.217-.051l4.178 2.84l1.624-1.393l-2.784-2.862l2.848-2.838l2.783 2.862z" transform="rotate(45 12 12)" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { ref, watchEffect } from "vue";
import { init } from "./canvas.ts";

const canvas = ref<null | HTMLCanvasElement>(null);

watchEffect(() => {
  if (canvas.value) {
    init(canvas.value);
  }
});
</script>
