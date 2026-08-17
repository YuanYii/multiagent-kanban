# kanban-skeleton —— 看板设计骨架模块

从 design-capability skill 的 `design-skeletons/kanban-board` 提取的独立看板模块，
作为本仓库的 UI 设计参考资产，与主看板应用（`offline_board.html`）并行存在。

## 目录结构

| 文件 | 说明 |
|---|---|
| `SKILL.md` | 原始设计规范（AI 生成看板时的布局与输出契约） |
| `example.html` | 可独立打开的参考实现（Sprint 看板示例） |
| `css/skeleton.css` | 从 example.html 提取的样式层（CSS 变量 + 组件样式） |

## 与主看板的关系

| 维度 | 本模块（skeleton） | 主看板（offline_board.html） |
|---|---|---|
| 定位 | 静态设计参考 / 样式来源 | 功能完整的任务看板 |
| 状态 | 4 列固定（Backlog / In progress / In review / Done） | 9 种状态动态配置 |
| 交互 | 无 JS，仅 hover | 拖拽、筛选、审计、持久化 |
| 数据 | 内置示例 | board.json + localStorage |
| 字段 | 卡片标题 + 标签 + 点数 + 头像 | 15 个结构化字段 |

## 可复用资产

- **设计 token**：`--bg / --paper / --ink / --muted / --line / --accent` 等 CSS 变量，可用于主看板主题层升级
- **组件样式**：任务标签 chip（bug / feat / design / chore / research）、进度条 `.progress`、渐变头像 `.av-sm`、Sprint pulse 侧栏面板

## 使用

直接用浏览器打开 `example.html` 即可预览；样式改动在 `css/skeleton.css`。
