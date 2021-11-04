## 说明

（Outbound.yaml）使用排序要求如下：

1. [必须] Unbreak.yaml - 用于修正后续规则行为
2. [可选] Advertising.yaml - 广告（建议仅 iOS 端开启）
3. [可选] Privacy.yaml - 隐私（行为分析、隐私追踪，建议仅 iOS 端开启）
4. [可选] Hijacking.yaml - 劫持（运营商、恶意网址）
5. [必须] Streaming.yaml - 流媒体服务
6. [可选] StreamingSE.yaml - （大陆面向国际的）流媒体服务
7. [必须] Global.yaml - 国际网络分流
8. [必须] China.yaml - 国内网络分流
9. [可选] ChinaIP.yaml - 来自 ipipdotnet 的中国 IP 段数据

### Unbreak

Unbreak 主要用于修正后续规则中 REJECT 及 PROXY 策略的一些不正确情况，如常见的暴力去广告造成的某些推送服务无法使用、Google 的一些可直连服务。

### Streaming

支持的流媒体服务太多了不一一列举，具体见 Streaming.yaml（或直接浏览 StreamingMedia 下的分类目录）。

StreamingMedia 下的目录里的独立分流文件全是从 Streaming.yaml 中剥离出来的，所以不需要你一个个手动去加完。

Streaming 策略组最初的设想使用方式是独立出来给有观看流媒体服务的用户一个方便的使用方式。如默认节点使用的是美国但有日本和英国的流媒体服务，在观看 AbemaTV 时在 Streaming 策略组选择日本节点，在观看 BBC 时选择英国节点。而更为「懒人」的方式是使用独立分流文件直接指向一个区域的节点，更进一步省去手动改变策略组的操作。

1. 以 Netflix 为例，一些流媒体服务需要「原生IP」（也有叫「本土IP」）的节点，所以不是随便找个香港节点往上套就能观看；
2. tv 位于 Extra 目录下的 Apple 目录内；
3. 独立的 bilibili-Intl.yaml 和 iQIYI.yaml 与国内版不是一个 App；

### StreamingSE

一般为中国大陆的流媒体面向港澳台或海外的版本，不同于上述的独立版本，下列流媒体如果直接代理会影响中国大陆版内容的播放。所以以策略组的形式，在需要观看面向港澳台或海外的版本时切换代理，日常可选直连。

目前支持：
- 哔哩哔哩港澳台限定；
- 愛奇藝台灣站；

### Extra

一些额外的独立分流文件，可以看看但很有可能用不上，一些特别的在对应目录亦写有 README.md