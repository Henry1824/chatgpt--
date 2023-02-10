# chatgpt变态版-连续对话
猫娘版本的chatgpt-云崽-yunzai-bot插件修改自@群除我gay  
## 注册
1. 先注册 OpenAI 开发者帐户，然后申请使用 GPT-3 API 的访问权限。
2. 你可以在 OpenAI 开发者控制台中申请使用 GPT-3 API，（选用双倍流量节点，香港等节点不可以，用gmail邮箱注册，对国内用户不开放）
3. b 站等网站搜索chatgpt注册即可，或者去某宝，某多多几块钱购买一个账号
*******************************************************
[控制台地址](https://beta.openai.com/signup/developer)
*******************************************************
## 配置(科学上网，不然看不到配置图片）
1. 本js下载下来，放到Yunzai-Bot\plugins\example\下
2. 注册开发者帐户并申请后，你就可以在 OpenAI **开发者控制台**中获取你的 *API 密钥*。
![](https://github.com/Henry1824/chatgpt--/blob/master/image/1.png)
![](https://github.com/Henry1824/chatgpt--/blob/master/image/2.png)
![](https://github.com/Henry1824/chatgpt--/blob/master/image/3.png)
3. 你可以使用这个密钥在你的应用程序中调用 GPT-3 API。将密匙填写在`token:`中
![](https://github.com/Henry1824/chatgpt--/blob/master/image/4.png)
## 使用
启动bot 发送指令如下：
|  指令   | 功能  |
|  ----  | ----  |
| @机器人＋问题  | 触发聊天（仅支持群聊，私聊仅主人生效） |
| #重置猫娘  | 重置对话 |
## 修改
### 最大字数
```JavaScript
var max_num = 1000//这是AI累计回复字数限制，字数越多对话次数越多，但是到后面出错概率会变大
```
### 修改程度-主人
```JavaScript
/** [1-妹妹·一般涩], [2-猫娘·非常涩] */
      pornograph: 2,
```
### 修改程度-非主人
```JavaScript
    if (!e.isMaster) {
		this.cfg.pornograph = 1
```
