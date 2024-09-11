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
  "ui_font_size": 16,
  "buffer_font_size": 16,
  "theme": {
    "mode": "system",
    "light": "KTRZ Monokai",
    "dark": "KTRZ Monokai"
  },

  // font
  "buffer_font_family": "JetBrainsMono Nerd Font Mono",
  "ui_font_family": "JetBrainsMono Nerd Font Mono",

  // auto save
  "autosave": "on_focus_change",

  // vim
  "vim_mode": true,
  "vim": {
    "use_system_clipboard": "always",
    "use_multiline_find": true,
    "use_smartcase_find": true,
    "custom_digraphs": {}
  }
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
      "ctrl-k": "menu::SelectPrev"
    }
  },
  {
    "context": "VimControl && !menu",
    "bindings": {
      "ctrl-p": "file_finder::Toggle",
      "space o u": "editor::OpenUrl",
      "space f s": "workspace::Save",
      "$": ["workspace::SendKeystrokes", "end h"],

      // bufferline
      "shift-l": "pane::ActivateNextItem",
      "shift-h": "pane::ActivatePrevItem",
      "space b d": ["pane::CloseActiveItem", { "saveIntent": "saveAll" }],
      "space b o": "workspace::CloseInactiveTabsAndPanes",

      // scroll
      "ctrl-d": ["workspace::SendKeystrokes", "5 j z z"],
      "ctrl-u": ["workspace::SendKeystrokes", "5 k z z"],

      // toggle file expleror
      "ctrl-e": "workspace::ToggleLeftDock",

      // toggle terminal in editor
      "ctrl-x": "workspace::ToggleBottomDock"
    }
  },
  {
    // toggle terminal in terminal
    "context": "Workspace",
    "bindings": {
      "ctrl-x": "workspace::ToggleBottomDock"
    }
  },
  {
    "context": "VimControl && vim_mode == normal",
    "bindings": {
      // for normal mode comment
      "ctrl-\\": ["workspace::SendKeystrokes", "g c c"],

      // open project list
      "space p l": "projects::OpenRecent"
    }
  },
  {
    "context": "VimControl && vim_mode == visual",
    "bindings": {
      // for visual mode comment
      "ctrl-\\": ["workspace::SendKeystrokes", "g c"]
    }
  },
  {
    // select code suggestion
    "context": "Editor && vim_mode == insert && (showing_code_actions || showing_completions)",
    "bindings": {
      "ctrl-k": "editor::ContextMenuPrev",
      "ctrl-j": "editor::ContextMenuNext"
    }
  },
  {
    // file explorer
    "context": "ProjectPanel && not_editing",
    "bindings": {
      // toggle file expleror
      "ctrl-e": "workspace::ToggleLeftDock",
      ":": "command_palette::Toggle",
      "a": "project_panel::NewFile",
      "shift a": "project_panel::NewDirectory",
      "x": "project_panel::Delete",
      "r": "project_panel::Rename",
      "ctrl-f": "project_panel::RevealInFileManager"
    }
  }
]
```
