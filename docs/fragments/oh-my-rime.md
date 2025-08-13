## 中州韵离线输入法配置

[中州韵输入法](https://rime.im/) 是一款开源可高度定制的离线输入法, 不会收集用户隐私
[oh-my-rime-docs](https://www.mintimate.cc/zh/guide/configurationOverride.html) 是一个用于配置中州韵输入法的配置项目
他们的关系就类似与 neovim 和 lazyvim 的关系

## 相关文档

- [中州韵输入法](https://rime.im/)
- [oh-my-rime-github](https://github.com/Mintimate/oh-my-rime)
- [oh-my-rime-docs](https://www.mintimate.cc/zh/guide/configurationOverride.html)

## 我的配置

::: code-group

```yaml [rime_mint.custom.yaml]
#######################################
# 用于覆盖输入法方案设置
#######################################
patch:
  # 输入方案(只需要拼音输入法就行)
  schema_list:
    - rime_mint

  # 候选词个数
  "menu/page_size": 9

  # 按键绑定
  "key_binder/bindings":
    - { when: composing, accept: Control+h, send: Left } # 前一个候选词
    - { when: composing, accept: Control+l, send: Right } # 后一个候选词
    - { accept: Control+k, send: Page_Up, when: paging } # 向上翻页(第一页时候无效)
    - { accept: Control+j, send: Page_Down, when: has_menu } # 向下翻页

  # 切换输入法快捷键
  ascii_composer:
    good_old_caps_lock: true
    switch_key:
      Caps_Lock: noop # commit_code | commit_text | clear
      Shift_L: noop # commit_code | commit_text | inline_ascii | clear | noop
      Shift_R: noop # commit_code | commit_text | inline_ascii | clear | noop
      Control_L: noop # commit_code | commit_text | inline_ascii | clear | noop
      Control_R: noop # commit_code | commit_text | inline_ascii | clear | noop

  # 输入法默认状态(中文使用英文符号)
  switches:
    - name: ascii_mode
      reset: 0
      states: [中文, 英文]
    - name: emoji_suggestion
      states: ["😣️", "😁️"]
      reset: 1
    - name: full_shape
      states: [半角, 全角]
      reset: 0
    - name: tone_display
      states: [声杳, 声起]
      reset: 0
    - name: transcription
      states: [简体, 繁体]
      reset: 0
    - name: ascii_punct
      states: ["。，", "．，"]
      reset: 1
```

```yaml [default.custom.yaml]
#######################################
# 用于设置切换输入方案快捷键
#######################################
patch:
  # 切换输入方案 & 输入法状态
  "switcher/hotkeys":
    - F4
    - Control+Shift+F4
    - Control+Shift+grave
```

```yaml [squirrel.custom.yaml]
#######################################
# 用于设置样式
#######################################
patch:
  # 设置显示样式,如果皮肤有设置则使用皮肤的设置
  "style/color_scheme": mint_dark_blue
  "style/candidate_list_layout": linear # stacked | linear 皮肤横竖排显示是调整这个
  "style/text_orientation": horizontal # horizontal | vertical  文字方向
  "style/corner_radius": 6 # 外边框 圆角大小
  "style/border_height": 2 # 外边框 高度
  "style/font_point": 18 # 候选词字体大小
  "style/line_spacing": 6 # 行间距

  # 修改皮肤样式设置(定义在 squirrel.yaml)
  "preset_color_schemes/mint_dark_blue/inline_preedit": false
  "preset_color_schemes/mint_dark_blue/translucency": false
  "preset_color_schemes/mint_dark_blue/hilited_candidate_back_color": 0xed9564
  "preset_color_schemes/mint_dark_blue/line_spacing": 6
```

:::
