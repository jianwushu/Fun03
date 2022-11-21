/*

export HELP_JOYPARK=""

[task_local]
#汪汪乐园每日任务
0 1,7,20 * * * jd_joypark_task.ts, tag=汪汪乐园每日任务, 
new Env('极速版汪汪赛跑');
*/

import {H5ST} from "./function/h5st"
const jdCookieNode = require('./function/jdCookie.js')
let cookiesArr = [], cookie = '';



let invitePin = []

!(async () => {

  if (true) {
    Object.keys(jdCookieNode).forEach((item) => {
      cookiesArr.push(jdCookieNode[item])
    })
  }

  if (!cookiesArr[0]) {
    console.log("无ck，退出")
    return;
  }

  h5stTool = new H5ST('4abce', 'jdltapp;', "9740943917498265")
  await h5stTool.__genAlgo()
  let h5st = h5stTool.__genH5st({
    appid: "activities_platform",
    body: JSON.stringify({"taskId":"","inviteType":"","inviterPin":"","linkId":"LsQNxL7iWDlXUs6cFl-AAg"}),
    client: "android",
    clientVersion: "4.3.0",
    functionId: "joyBaseInfo",
    t: timestamp.toString()
  })

  console.log(h5st)
  // $.log("======收集互助码======")
  // for (let i = 0; i < cookiesArr.length; i++) {
  //   $.UA = `jdapp;iPhone;10.1.4;13.1.2;${randomString(40)};network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`

  //   cookie = cookiesArr[i];
  //   if (cookie) {
  //     $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
  //     $.index = i + 1;
  //     console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);

  //     let resp = await getJoyBaseInfo("", "", "");
  //     if (resp.success) {
  //       console.log(resp.invitePin)
  //       $.invitePin.push(resp.invitePin)
  //     }
  //     await $.wait(1000)
  //   }
  // }
  // $.log("\n======汪汪乐园开始内部互助======\n")
  // for (let i = 0; i < cookiesArr.length; i++) {
  //   $.UA = `jdapp;iPhone;10.1.4;13.1.2;${randomString(40)};network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`

  //   cookie = cookiesArr[i];
  //   if (cookie) {
  //     $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
  //     $.index = i + 1;
  //     $.isLogin = true;
  //     $.nickName = '';
  //     console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
  //     $.newinvitePinTaskList = [ ...($.invitePin || [])]
  //     for (const invitePinTaskListKey of $.newinvitePinTaskList) {
  //       $.log(`【京东账号${$.index}】${$.nickName || $.UserName} 助力 ${invitePinTaskListKey}`)
  //       let resp = await getJoyBaseInfo("610", 1, invitePinTaskListKey);
  //       if (resp.success) {
  //         if (resp.data.helpState === 1) {
  //           $.log("助力成功！");
  //         } else if (resp.data.helpState === 0) {
  //           $.log("自己不能助力自己！");
  //         } else if (resp.data.helpState === 2) {
  //           $.log("助力过了！");
  //         } else if (resp.data.helpState === 3) {
  //           $.log("没有助力次数了！");
  //           break
  //         } else if (resp.data.helpState === 4) {
  //           $.log("这个B助力满了！");
  //         }
  //       } else {
  //         $.log("数据异常 助力失败！\n\n")
  //         break
  //       }
  //     }
  //   }
  //   await $.wait(1000)
  // }
})()

/**
 * 互助
 * @param taskId
 * @param inviteType
 * @param inviterPin
 * @returns {Promise<unknown>}
 */
function getJoyBaseInfo(taskId = '', inviteType = '', inviterPin = '') {
  return new Promise(resolve => {
    $.post(taskPostClientActionUrl(`body={"taskId":"${taskId}","inviteType":"${inviteType}","inviterPin":"${inviterPin}","linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&_t=1625480372020&appid=activities_platform`, `joyBaseInfo`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          $.joyBaseInfo = data.data
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function taskPostClientActionUrl(body, functionId) {
  return {
    url: `https://api.m.jd.com/client.action?functionId=${functionId}`,
    body: body,
    headers: {
      'User-Agent': $.UA,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': 'api.m.jd.com',
      'Origin': 'https://joypark.jd.com',
      'Referer': 'https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0',
      'Cookie': cookie,
    }
  }
}
function randomString(e) {
  e = e || 32;
  let t = "abcdef0123456789", a = t.length, n = "";
  for (i = 0; i < e; i++)
    n += t.charAt(Math.floor(Math.random() * a));
  return n
}

function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}


