## 资源

[官方网站](https://nssurge.com/) / [手册](http://manual.nssurge.com/) / [常见问题](https://nssurge.zendesk.com/) / [社区](https://community.nssurge.com/)

## 配置

| 类别 | 配置 |
| :------------: | :------------: |
| 出国版 | [Outbound](https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Outbound.conf) |
| 回国版 | [Inbound](https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Inbound.conf) |

## 说明

### 关于 IPv6

默认并不开启 IPv6，如需要可在「更多设置 >」里打开「IPv6 支持」，或在文本配置中修改 `ipv6 = false` 为 `ipv6 = true`。

### 关于 DNS

如果所使用的网络没有 DNS 劫持问题，则配置为使用系统 DNS 并追加公共 DNS，如果所使用的网络存在 DNS 劫持问题，则配置为仅使用公共 DNS；
> 如部分运营商存在劫持海外正常网站至反诈页面的（据目前反馈它们没有抢答公共 DNS，所以）可以在「DNS 设置」中选择「使用自定义 DNS 服务器」或文本配置中将 `dns-server =` 中的 `system` 移除。

不建议使用海外 DNS（包括 119.28.28.28），如 `1.1.1.1` 解析哔哩哔哩返回的是香港的 CDN，这时候再指定个规则直连没什么意义；
> 如果非要用海外 DNS 或不知道所用 DNS 是否为海外，遇到应走直连的国内域名走了代理或不知道为什么走了代理，可自行排查：在「工具」的「DNS 结果」中查找走了代理的相关域名，就可以看到是哪个 DNS 返回了什么结果（IP）。

> 注意，有代理规则的域名并不会有本地 DNS 结果（远程解析），如果出现已有代理规则的域名出现在「DNS 结果」说明有不带「no-resolve」参数的 IP 规则位于 DOMAIN 规则之前。

非必要不建议使用 DoH；
> 必要指的是如中国移动这种抢答公共 DNS 的运营商

### 关于 Apple 分流

默认 Apple 分流为直连（除了被动或主动屏蔽的那些，所以 Apple.list 放在 Global.list 之后），所以如果想完全走代理可以将 `RULE-SET,Apple.list` 修改为代理策略。

但若想 Apple 只要国内全走直连只要国外全走代理可将 `RULE-SET,Apple.list` 注释或移除，**前提是 Apple 相关域名仅使用国内 DNS**。

### 服务器不支持 UDP 转发时的策略行为

当服务器不支持 UDP 转发时会阻止相关 UDP 请求，如果你没有支持 UDP 转发的服务器，可以注释掉 `udp-policy-not-supported-behaviour = reject` 或将其值修改为 `direct` 以开启允许相关 UDP 请求直连。

### 关于规则及策略组

使用排序要求如下：

1. [必须] Unbreak.list - 用于修正后续规则行为
2. [可选] Advertising.list - 广告
3. [可选] Privacy.list - 隐私（行为分析、隐私追踪）
4. [可选] Hijacking.list - 劫持（运营商、恶意网址）
5. [必须] Streaming.list - 流媒体服务
6. [可选] StreamingSE.list - （大陆面向国际的）流媒体服务
7. [必须] Global.list - 国际网络分流
8. [必须] China.list - 国内网络分流

#### Unbreak

主要用于修正后续规则中 REJECT 及 PROXY 策略的一些不正确情况，如常见的暴力去广告造成的某些推送服务无法使用、使用 Google 的一些可直连服务。

#### Streaming

主要为国际流媒体服务，`StreamingMedia` 下目录里的独立分流文件全是从 `Streaming.list` 中剥离出来的。

Streaming 策略组最初的设想使用方式是独立出来给有观看流媒体服务的用户一个方便的使用方式。如默认节点使用的是美国但有日本和英国的流媒体服务，在观看 AbemaTV 时在 Streaming 策略组选择日本节点，在观看 BBC 时选择英国节点。

而对于一些流媒体爱好者而言，他们会进一步按照区域建立策略组如 HK、JP 等，然后将适用于相应区域的流媒体服务独立分流文件的策略，指定为相应的策略组，如此就不用在 Streaming 策略组来回切换。

一些需要注意的事项：
1. 一些流媒体服务需要「原生（或称「本土」）」的 IP，此类称呼存在争议只需要明白如开通的是港区 Netflix 不是随便找个香港服务器就能够使用的。
2. tv 位于 `Extra` 目录下的 `Apple` 目录内；
3. `StreamingMedia` 下的 `bilibili.list` 和 `iQiyi.list` 与国内版不是一个 App；
4. 当不需要「Streaming 策略组」时，`Streaming.list` 策略应该调整为 PROXY 而不是移除；

#### StreamingSE

一般为中国大陆的流媒体面向港澳台或海外的版本，不同于上述的独立版本，下列流媒体如果直接代理会影响中国大陆版内容的播放。所以以策略组的形式，在需要观看面向港澳台或海外的版本时切换代理，日常可选直连。
目前支持：
- 哔哩哔哩（僅限港澳台地區）；
- 愛奇藝海外站；
- 芒果TV国际；