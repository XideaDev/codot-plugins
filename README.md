# Codot Plugins

Codot 官方插件仓库。每个插件独立版本、独立 ZIP、独立发布。当前四个插件为 Codot 提供任务来源（收件箱、任务导入、评论同步）。

| 插件 | 包名 | 插件 ID | 来源 ID | Release 标签 |
| --- | --- | --- | --- | --- |
| [GitHub](plugins/github/README.md) | codot-plugin-github | codot.github | github | github-vX.Y.Z |
| [Jira](plugins/jira/README.md) | codot-plugin-jira | codot.jira | jira | jira-vX.Y.Z |
| [Linear](plugins/linear/README.md) | codot-plugin-linear | codot.linear | linear | linear-vX.Y.Z |
| [禅道](plugins/zentao/README.md) | codot-plugin-zentao | codot.zentao | zentao | zentao-vX.Y.Z |

需要 Codot 0.21.5 或更高版本。

## 安装

在 Codot「设置 → 插件」的推荐列表中安装；或选择「从其他位置安装 → GitHub Release」，仓库填写 `XideaDev/codot-plugins`，标签前缀如 `github-v`。也可以安装本地构建的 `dist/plugin` 目录或 ZIP。

插件以独立 Node 进程运行，只与对应服务（如 `api.github.com`）通信，不收集或上报任何数据；凭据由 Codot 保存并在每次调用时传给插件，插件不写入磁盘、不写入日志。

## 开发

需要 Node >=22.13，CI 使用 Node 24。在仓库根目录执行：

```sh
npm ci
npm run check
# 单独验证或构建一个插件
npm run check --workspace codot-plugin-github
npm run build --workspace codot-plugin-github
```

`npm run check` 执行所有插件的类型检查、模拟 API 测试、发布脚本测试和构建。每个插件生成 `plugins/<slug>/dist/plugin/` 和 `plugins/<slug>/dist/codot-plugin-<slug>-<version>.zip`。ZIP 包含 SDK 和所有运行依赖，用户安装时无需安装 Node 或 npm。构建使用固定 ZIP 时间戳，相同输入得到相同校验和；每个 ZIP 旁边生成 `<zip>.sha256`，随 Release 一起上传，Codot 安装官方插件时据此校验下载内容。

SDK 包在 `vendor/`，由 Codot 主仓库的 `packages/plugin-sdk`（`@codot/plugin-sdk`）打包而来：

```sh
cd <Codot>/packages/plugin-sdk && pnpm pack --pack-destination <codot-plugins>/vendor
```

## 独立发布

1. 只更新目标插件的 package.json、manifest.json 版本及 CHANGELOG.md。
2. 执行 `npm run check`，提交变更。
3. 推送与插件版本匹配的标签，例如 `github-v1.1.1`。

Release 工作流先执行完整检查，再验证标签与目标插件版本一致，只上传目标插件的 ZIP 和该插件的更新日志；带预发布后缀的版本标为 prerelease。已有 Release 不覆盖，普通提交与 PR 只验证。

## 来源与许可证

本仓库派生自 [flyhero/antumi-plugins](https://github.com/flyhero/antumi-plugins)（Apache-2.0），保留了其提交历史；改动说明见 [NOTICE](NOTICE)。许可证：Apache-2.0。

## 评论同步

四个来源声明 `commentSync: 1`。Codot 可以关注已导入的任务和排查会话，每 15 分钟拉取新评论，由用户决定是否把新评论发给已有会话；评论到达本身不会启动 Agent。GitHub 支持 Issue/PR 的普通讨论评论，不含行内 review 评论。禅道需要原生 action ID 或带稳定键的 action 映射，否则只保留 Markdown 快照，无法可靠识别新评论。
