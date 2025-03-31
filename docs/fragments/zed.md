## 下载地址

- [zed.dev](https://zed.dev/)
- [github](https://github.com/zed-industries/zed)

## 设置

注意可能需要手动下载主题

```jsonc
// Zed settings
//
// For information on how to configure Zed, see the Zed
// documentation: https://zed.dev/docs/configuring-zed
//
// To see all of Zed's default settings without changing your
// custom settings, run `zed: open default settings` from the
// command palette
{
  // auto save & auto format
  "icon_theme": "Material Icon Theme", // 图标主题, 需要安装插件
  "format_on_save": "off",
  "autosave": "on_focus_change",
  "extend_comment_on_newline": false,

  // disable soft wrap
  "show_wrap_guides": false,
  "soft_wrap": "none",

  // ai auto completion
  "edit_predictions_disabled_in": ["comment"],
  "features": {
    "edit_prediction_provider": "supermaven",
  },

  // git
  "git": {
    "git_gutter": "tracked_files",
    "inline_blame": {
      "enabled": false,
    },
  },

  // vim
  "vim_mode": true,
  "vim": {
    "use_system_clipboard": "always",
    "use_multiline_find": true,
    "use_smartcase_find": true,
    "custom_digraphs": {},
  },

  // font
  "buffer_font_family": "Hack Nerd Font Mono",
  "ui_font_family": "Hack Nerd Font Mono",
  "buffer_line_height": "standard",
  "ui_font_size": 16,
  "buffer_font_size": 18,

  // theme
  "theme": {
    "mode": "system",
    "light": "One Dark",
    "dark": "One Dark",
  },

  // tabs
  "tabs": {
    "file_icons": true,
    "git_status": true,
    "show_close_button": "always",
  },

  // scrollbar
  "scrollbar": {
    "show": "never",
  },

  // status bar
  "toolbar": {
    "breadcrumbs": false,
    "quick_actions": false,
  },

  // telemetry
  "telemetry": {
    "diagnostics": false,
    "metrics": false,
  },
}
```

## 快捷键绑定

```jsonc
// Zed keymap
//
// For information on binding keys, see the Zed
// documentation: https://zed.dev/docs/key-bindings
//
// To see the default key bindings run `zed: open default keymap`
// from the command palette.
[
  {
    "bindings": {
      "ctrl-j": "menu::SelectNext",
      "ctrl-k": "menu::SelectPrevious",
    },
  },
  {
    "context": "VimControl && !menu",
    "bindings": {
      "ctrl-p": "file_finder::Toggle",
      "shift-l": "pane::ActivateNextItem",
      "shift-h": "pane::ActivatePreviousItem",
      "space o u": "editor::OpenUrl",
      "space f s": "workspace::Save",
      "space c a": "editor::ToggleCodeActions",
      "space b d": "pane::CloseActiveItem",
      "space b o": "workspace::CloseInactiveTabsAndPanes",
      "space s s": "outline_panel::ToggleFocus",
      "space f f": "editor::Format",
      "space r n": "editor::Rename",
      "space q l": "projects::OpenRecent",
      "space r r": "buffer_search::DeployReplace",

      // toggle panels
      "ctrl-e": "project_panel::ToggleFocus",
      "ctrl-g": "git_panel::ToggleFocus",
      "ctrl-x": "workspace::ToggleBottomDock",
      "space a": "assistant::ToggleFocus",

      // tabs
      "space b h": ["pane::CloseItemsToTheLeft", { "close_pinned": false }],
      "space b l": ["pane::CloseItemsToTheRight", { "close_pinned": false }],
      "space b shift-h": "pane::SwapItemLeft",
      "space b shift-l": "pane::SwapItemRight",

      // scroll
      "ctrl-d": ["workspace::SendKeystrokes", "5 j z z"],
      "ctrl-u": ["workspace::SendKeystrokes", "5 k z z"],
    },
  },
  {
    // toggle terminal in terminal
    "context": "Workspace",
    "bindings": {
      "ctrl-x": "workspace::ToggleBottomDock",
    },
  },
  {
    "context": "VimControl && vim_mode == normal",
    "bindings": {
      "space q q": "zed::Quit",
      "space f s": "workspace::Save",
      "ctrl-\\": ["workspace::SendKeystrokes", "g c c"],
    },
  },
  {
    "context": "VimControl && vim_mode == visual",
    "bindings": {
      // for vim visual mode
      "ctrl-\\": ["workspace::SendKeystrokes", "g c"],
    },
  },
  {
    "context": "vim_mode == insert",
    "bindings": {
      // for vim insert mode
      "ctrl-o": "editor::ShowCompletions",
      "ctrl-e": "editor::Cancel",
      "ctrl-a": "assistant::InlineAssist",

      // for snippets
      "ctrl-h": "editor::Backtab",
      "ctrl-l": "editor::Tab",
    },
  },
  {
    // select code suggestion
    "context": "Editor && vim_mode == insert && (showing_code_actions || showing_completions)",
    "bindings": {
      "ctrl-k": "editor::ContextMenuPrevious",
      "ctrl-j": "editor::ContextMenuNext",
    },
  },
  {
    "context": "Editor && edit_prediction",
    "bindings": {
      // confirm edit prediction
      "tab": "editor::AcceptEditPrediction",
      "enter": "editor::AcceptEditPrediction",
    },
  },
  {
    // file explorer
    "context": "ProjectPanel && not_editing",
    "bindings": {
      ":": "command_palette::Toggle",
      "ctrl-e": "workspace::ToggleLeftDock",
      "shift-a": "project_panel::NewDirectory",
      "a": "project_panel::NewFile",
      "o": "project_panel::OpenPermanent",
      "r": "project_panel::Rename",
      "x": ["project_panel::Trash", { "skip_prompt": false }],
      "d": "project_panel::Cut",
      "y": "project_panel::Copy",
      "shift-y": "workspace::CopyPath",
      "ctrl-y": "workspace::CopyRelativePath",
      "p": "project_panel::Paste",
      // "ctrl-enter": "project_panel::OpenWithSystem",
      "ctrl-enter": "project_panel::RevealInFileManager",
    },
  },
]
```
