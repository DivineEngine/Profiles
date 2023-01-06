## 资源

[官方 Github 示例](https://github.com/crossutility/Quantumult-X)

## 配置

| 类别 | 配置 |
| :------------: | :------------: |
| 出国版 | [Outbound](https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Outbound.conf) |
| 回国版 | [Inbound](https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Inbound.conf) |

## 说明

得益于「资源解析器」的特性，你可以使用 Surge 的 Ruleset、Doaminset 和 Module。

### 关于 IPv6

默认并不开启 IPv6，如需要可在文本配置中在 `no-ipv6` 之前加上英文分号。

### 关于 DNS

如果所使用的网络没有 DNS 劫持问题，则配置为使用系统 DNS 并追加公共 DNS，如果所使用的网络存在 DNS 劫持问题，则配置为仅使用公共 DNS；
> 如部分运营商存在劫持海外正常网站至反诈页面的（据目前反馈它们没有抢答公共 DNS，所以）可以在文本配置中将 `;no-system` 开头的英文分号删除以启用。

不建议使用海外 DNS（包括 119.28.28.28），如 `1.1.1.1` 解析哔哩哔哩返回的是香港的 CDN，这时候再指定个规则直连没什么意义；
> 如果非要用海外 DNS 或不知道所用 DNS 是否为海外，遇到应走直连的国内域名走了代理或不知道为什么走了代理，可自行排查：在顶部的「DNS」面板搜索相关 DNS 记录，哪个 DNS 返回了什么结果（IP）。

非必要不建议使用 DoH；
> 必要指的是如中国移动这种抢答公共 DNS 的运营商

### 关于 Apple 分流

默认 Apple 分流为直连（除了被动或主动屏蔽的那些，所以 Apple.list 要放在 Global.list 之后），如果想完全走代理可以将「分流」的「引用」的 `Apple.list` 的「策略偏好」修改为「PROXY」。

但若想 Apple 只要国内全走直连只要国外全走代理可将「分流」里「引用」的 `Apple.list` 的勾去掉，**前提是 Apple 相关域名仅使用国内 DNS**。

### 服务器不支持 UDP 转发时的策略行为

当服务器不支持 UDP 转发时会阻止相关 UDP 请求，如果你没有支持 UDP 转发的服务器，可以将 `;fallback_udp_policy=direct` 开头的英文分号移除以开启允许相关 UDP 请求直连。

### 使用自定义 GeoIP 文件

建议在「其他设置」里「GeoLite2」的「来源」填写使用「 https://raw.githubusercontent.com/Loyalsoldier/geoip/release/Country.mmdb 」并开启「自动更新」

### 关于规则及策略组

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

### 从 Surge 迁移到 Quantumult X 可能遇上的问题

注意，Quantumult X 并没有官方文档，所以以下内容可能有误。

规则类型优先级，在 Quantumult X 中并不是完全按顺序匹配，各类型的优先级应该为： host > host-suffix > host-keyword > user-agnet > geoip & ip-cidr。
> 举个例子：如某远程分流文件中含有 `host-suffix, instagram.com, proxy` 时，添加 `host-keyword, instagram, direct` 并不能改变 instagram.com 的策略；

顺序上来说 Quantumult X 将本地规则放在规则列表的顶部，所以当本地规则存在 `geoip,cn,direct` 时，远程分流文件中对于 CN 地区的 IP 规则并不会生效，解决办法是将相关规则也写在本地或将 `geoip,cn,direct` 放到远程分流文件中。

另外，在 Surge 中如 `DOMAIN,1.1.1.1` 这样的规则可以用于匹配目标主机为 IP 地址 1.1.1.1 的连接，但并不适用于 Quantumult X。