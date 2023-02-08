import plugin from '../../lib/plugins/plugin.js'
import fetch from 'node-fetch'
//插件修改自chatgpt·变态版@群除我gay，思路参考了OpenAI插件（不好意思实在不知道作者是谁）的写法，首发群：834240439

var tempMsg = ""
var tempMsg_num = ""
var max_num = 1000//这是AI累计回复字数限制，字数越多对话次数越多，但是到后面出错概率会变大

export class ChatGpt extends plugin {
  constructor () {
    super({
      name: 'ChatGpt',
      dsc: '聊天机器人',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      priority: 9999,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '',
          /** 执行方法 */
          fnc: 'chatGpt',
          /** 执行日志 */
          log: false
        }, 
        {
          /** 命令正则匹配 */
          reg: "^#?重置猫娘$", //匹配消息正则,命令正则
          /** 执行方法 */
          fnc: 'chatnew'
        }
      ]
    })
    this.cfg = {
      /** 机器人的名字 */
      name: "然比",
      /** 主人称谓 */
      human: "henry",
      /** OpenAI的SecretKey */
      token: "",
      /** [1-妹妹·一般涩], [2-猫娘·非常涩] */
      pornograph: 2,
      /** 语言模型，一般不用改 */
      model: "text-davinci-003"
    }
  }


  async chatnew(e) {
    tempMsg = ""
    tempMsg_num = ""
    e.reply('猫娘已重置')
  }


  async chatGpt (e) {
    // if (!e.isMaster) return false
    if (!e.msg || e.img) return false
    if (e.isPrivate && !e.isMaster) return false
    if (e.isGroup && !e.atBot) return false
    /** 不是主人拒绝涩涩 */
    if (!e.isMaster) {
		this.cfg.pornograph = 1
		//e.reply('非主人命令 采用妹妹模式')
	}

    if (tempMsg_num.length < 1){
       e.reply("猫娘有些忙，请耐心等待\n"+'喵喵~最多聊'+max_num+'字哦')
  }

  tempMsg = tempMsg + "\nHuman: " + e.msg
  //e.reply('tempMsg:',String(tempMsg))
  console.log('tempMsg:',String(tempMsg));
  
    let res = await fetch('http://114.132.218.87:12583/api/chatgpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...this.cfg, message: tempMsg })
    })
    res = await res.json()
    if (!res || res.status !== 1) {
      logger.mark('[ChatGpt] 接口没有返回喵~')
      e.reply('ChatGpt接口没有返回喵~快对猫娘使用#重置猫娘')
      return false
    }
    tempMsg_num = tempMsg_num + "\nAI: " + res.msg
    //console.log('tempMsg_num',String(tempMsg_num));
    await e.reply(res.msg+['\n\n喵~，已经发送：', String(tempMsg_num.length)]+'字')
    tempMsg = tempMsg + "\nAI: " + res.msg
    if (tempMsg_num.length > max_num)
    {
      tempMsg = ""
      tempMsg_num = ""
      e.reply('喵~字数过多，请#重置猫娘，谢谢喵~')
      return true;
    }
  }
}