## 我是真的记不住啊
---
### Markdown语法
- 使用 "#" 来创建标题，符号数量越少，标题等级越高
- 使用 "-" 来创建无序列表
- 使用 "[:id]" 来创建有序列表
- 使用 "** **" 来表示强调
- 使用 ">" 来表示引用
- 使用 " `` " 来表示代码块
- 使用 "---" 来创建分割线
- 使用 "[超链接显示名] (地址)" 来创建超链接
---
### 正则表达式
- [] 匹配括号内的字符
- \w 等价于 [A-Za-z0-9_]
- '*' 零次或多次
- '+' 一次或多次
- {n} 匹配n次
- ^$ 开始与结束
---
### screen 命令
- screen -ls 显示所有窗口
- screen -r [name] 进入窗口
- exit 进入窗口后退出即可删除窗口
- ctrl+a+d 正常退出窗口并保持运行
- screen -R [name] 创建一个不同的窗口
- screen -D [name] 踢掉正在占用窗口的用户
---
### git 命令
- git init 初始化仓库
- git add . 将仓库所有内容放到代存区
- git commit -m [描述] 提交代存区内容
- git remote add origin [远程仓库] 关联远程仓库
- git pull origin master 拉取远程仓库与本地合并
- git push -u origin master 推送至远程仓库的master
---
### linux 命令
- tar -zxvf [压缩包名称] 解压压缩包
- mv [文件或文件夹名称] [路径] 移动或者重命名
---
### mongo 命令
- show dbs 显示所有数据库
- use [数据库名称] 操作某个数据库
- show collections 显示所有集合
- db.[集合名称].[操作方法] 进行操作如find()
