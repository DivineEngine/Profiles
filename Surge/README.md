## 说明

### Surge 4

对于 Surge 4（指已解锁「模块」功能）的用户，可自行删除 `[URL Rewrite]` 内的 Rewrite，以模块替代方便更新，建议必选 Module 目录下的 `General.sgmodule` 模块，其他按需添加。

### Surge 3

对于 Surge 3（指未解锁「模块」功能）的用户，默认不带有去广告的 Rewrite 及 hostname，你需要进行以下步骤：

0. 需要安装[快捷指令](https://apps.apple.com/app/apple-store/id915249334)并在系统设置中设置「允许不受信任的快捷指令」，然后添加快捷指令：[更新 Rewrite Block Ads](https://www.icloud.com/shortcuts/c1c80c2c67a742f2ac734f086f12b30b)。
1. 打开 Surge 进入「配置列表」，在底部选择「导出到 iCloud 或其他应用」，选择「我的 iPhone」或「iCloud Drive」。
2. 打开快捷指令「更新 Rewrite Block Ads」根据提示打开刚才导出的配置。
3. 在自动化配置完成后会自动弹出界面，在应用图标那一行向左滑动，在最右侧有「更多」图标，点击进去后选择『拷贝到「Surge」』
4. 在配置列表内选择刚才导入进来已经更新完成的配置文件名，默认为「Surge.conf」（若需要修改成其他名字可自行修改快捷指令，在末尾处）。

⚠️ 注意：如在 Surge 内出现『未能打开文件「*.conf」，因为它不存在』的错误提示，这一般出现在运行快捷指令时 Surge 没有同时打开，这时关掉提示重新运行一次快捷指令即可。

之后更新有关去广告的 Rewrite 及 hostname 均可重复此步骤，此方法极大简化了未解锁「模块」功能用户更新 Rewrite 及 hostname 部分的困难操作，如有自定义的 `hostname` 放置在首部（也就是 `www.google.cn` 之前）不会在更新时被覆盖。

### Surge 2

对于 Surge(Legacy Support) 即 Surge 2 用户的支持已经停止。