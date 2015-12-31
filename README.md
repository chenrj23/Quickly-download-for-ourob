# Quickly-download-for-ourob

### 结构

- myscript.js  算入口文件，对dom操作主要放这
- tr.js        定义了tr类
- config.js    分析每个帖子的规则
- background.js 解决每次请求后cookie问题


### 现存问题：

$.get()后，

``
data = $('div[id^="post_"] > table:first > tbody > tr:first', data).html();
``

这步会对取得的HTML内的图片再次请求。增加了许多不必要的HTTP请求
