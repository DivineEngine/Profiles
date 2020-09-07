## 使用须知

1. `raw.githubusercontent.com` 已被污染，需自行在系统的 hosts 解决污染问题或使用其他 CDN 域名，在 Clash 配置内无效。

2. 一般来说，只需要配置节点信息即可使用。
自建用户：直接修改预设的 `1`、`2`、`3` 节点信息即可（更多协议配置示例参考官方 [Wiki](https://github.com/Dreamacro/clash/wiki/configuration)）。注意！如果修改了节点名，则策略组 `proxy-groups` 部分的名字也需要修改。
订阅用户：参照修改 `proxy-providers` 的订阅配置示例及策略组 `proxy-groups` 部分的引用配置即可。

虽然直接配置好后即可使用，但建议阅读 [Wiki](https://github.com/Dreamacro/clash/wiki/configuration)。