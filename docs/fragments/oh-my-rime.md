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
#################################################################
# 输入法方案配置, 可以覆盖 default.yaml
# https://www.mintimate.cc/zh/guide/configurationOverride.html
#################################################################
patch:
  # 候选词数量
  "menu/page_size": 9

  # 覆盖 switches 默认使用英文标点符号
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
    - name: transcription
      states: [简体, 繁体]
      reset: 0
    - name: ascii_punct
      states: ["。，", "．，"]
      reset: 1

  # 修改按键绑定
  "key_binder/bindings":
    - { when: composing, accept: Control+h, send: Left } # 前一个候选词
    - { when: composing, accept: Control+l, send: Right } # 后一个候选词
    - { accept: Control+k, send: Page_Up, when: paging } # 向上翻页(第一页时候无效)
    - { accept: Control+j, send: Page_Down, when: has_menu } # 向下翻页

  # 切换输入方案快捷键
  "switcher/hotkeys":
    - Control+Shift+grave

  # 定义切换到西文模式的快捷键
  # 禁用切换输入法, 仅输入中文即可
  ascii_composer:
    switch_key:
      Caps_Lock: noop # 按下 Caps Lock 会直接上屏
      Control_L: noop # 按下左 Control 键不做任何操作
      Control_R: noop # 按下右 Control 键不做任何操作
      Shift_L: noop # 按下左 Shift 键会直接上屏
      Shift_R: noop # 按下右 Shift 键会临时切换到西文模式
    good_old_caps_lock: true # 启用经典的 Caps Lock 开启西文模式的方式

  # 设置模糊音
  "speller/algebra":
    - erase/^xx$/ # 首选保留
    - derive/^([zcs])h/$1/ # zh, ch, sh => z, c, s
    - derive/^([zcs])([^h])/$1h$2/ # z, c, s => zh, ch, sh
    - derive/([aei])n$/$1ng/ # en => eng, in => ing
    - derive/([aei])ng$/$1n/ # eng => en, ing => in
    - derive/([iu])an$/$lan/ # ian => iang, uan => uang
    - derive/([iu])ang$/$lan/ # iang => ian, uang => uan
    - derive/([aeiou])ng$/$1gn/ # dagn => dang
    - derive/([dtngkhrzcs])o(u|ng)$/$1o/ # zho => zhong|zhou
    - derive/ong$/on/ # zhonguo => zhong guo
    - abbrev/^([a-z]).+$/$1/ #简拼（首字母）
    - abbrev/^([zcs]h).+$/$1/ #简拼（zh, ch, sh）
    - derive/v/u/ # u => ü
```

```yaml [squirrel.custom.yaml]
################################################################
# 输入的配置, 可以覆盖 default.yaml
# https://www.mintimate.cc/zh/guide/configurationOverride.html
################################################################
patch:
  # 横向布局
  "style/color_scheme": mint_dark_blue
  "style/horizontal": false
  "style/candidate_list_layout": "linear"
  "style/corner_radius": 4
  "style/border_height": 4
  "switcher/hotkeys":
    - Control+Shift+grave
  "preset_color_schemes/mint_dark_blue/hilited_candidate_back_color": 0xed9564
```
:::


