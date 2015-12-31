# Quickly-download-for-ourob
- myscript.js  算入口文件，对dom操作主要放这
- tr.js        定义了tr类
- config.js    分析每个帖子的规则

现存问题：
在取得每个tr的href后，$.get()后，jquery会对取得的HTML内的图片再次请求。增加了许多不必要的HTTP请求
