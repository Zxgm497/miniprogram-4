const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {

  console.log(event)

  const { OPENID } = cloud.getWXContext()

  const result = await cloud.openapi.customerServiceMessage.send({
    touser: OPENID,
    msgtype: 'text',
    text: {
      content: '收到：' + event.Content,
    }
  })

  // // 图片上传
  // exports.main = async (event, context) => {
  //   const fileStream = fs.createReadStream(path.join(__dirname, 'demo.jpg'))
  //   return await cloud.uploadFile({
  //     cloudPath: 'demo.jpg',
  //     fileContent: fileStream,
  //   })
  // }

  console.log(result)

  return result
}
