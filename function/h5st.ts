import axios from "axios"
import {format} from "date-fns"
import * as CryptoJS from 'crypto-js'

class H5ST {
  tk: string = "";
  timestamp: string = "";
  rd: string = "";
  appId: string = "";
  fp: string = "";
  time: number = 0;
  ua: string = "";
  enc: string = "";

  constructor(appId: string, ua: string, fp: string) {
    this.appId = appId
    this.ua = ua
    this.fp = fp || this.__genFp()
  }

  __genFp() {
    let e = "0123456789";
    let a = 13;
    let i = '';
    for (; a--;)
      i += e[Math.random() * e.length | 0];
    return (i + Date.now()).slice(0, 16)
  }

  async __genAlgo() {
    this.time = Date.now()
    this.timestamp = format(this.time, "yyyyMMddHHmmssSSS")
    let {data} = await axios.post(`https://cactus.jd.com/request_algo?g_ty=ajax`, {
      'version': '3.1',
      'fp': this.fp,
      'appId': this.appId.toString(),
      'timestamp': this.time,
      'platform': 'web',
      'expandParams': ''
    }, {
      headers: {
        'Host': 'cactus.jd.com',
        'accept': 'application/json',
        'content-type': 'application/json',
        'user-agent': this.ua,
      }
    })
    console.log(data)
    this.tk = data.data.result.tk
    this.rd = data.data.result.algo.match(/rd='(.*)'/)[1]
    this.enc = data.data.result.algo.match(/algo\.(.*)\(/)[1]
  }

  __genKey(tk: string, fp: string, ts: string, ai: string, algo: object) {
    let str = `${tk}${fp}${ts}${ai}${this.rd}`;
    let f :Function = algo[this.enc as keyof typeof algo]
    return f(str, tk)
  }
  __genH5st(body: object) {
    let y = this.__genKey(this.tk, this.fp, this.timestamp, this.appId, CryptoJS).toString(CryptoJS.enc.Hex)
    console.log(y)
    console.log(CryptoJS.enc.Utf8.parse("wm0!@w_s#1l1f1o("))
    let s = ''
    for (let key of Object.keys(body)) {
      key === 'body' ? s += `${key}:${CryptoJS.SHA256(body[key as keyof typeof body]).toString(CryptoJS.enc.Hex)}&` : s += `${key}:${body[key as keyof typeof body]}&`
    }
    s = s.slice(0, -1)
    console.log(s)
    s = CryptoJS.HmacSHA256(s, y).toString(CryptoJS.enc.Hex)
    return encodeURIComponent(`${this.timestamp};${this.fp};${this.appId.toString()};${this.tk};${s};3.1;${this.time.toString()};`)
  }
  __genLast(body: object){
    let key = "wm0!@w_s#1l1f1o("
    let iv = "0102030405060708"
    return CryptoJS.AES.encrypt(customPadding(JSON.stringify(body),128,0x0,"hex"),CryptoJS.enc.Utf8.parse(key)),{
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7

    }
  }
}

function customPadding(str: string, blockSize: number, padder:number, format:BufferEncoding) {
  str = Buffer.from(str, "utf8").toString(format);
  //1 char = 8bytes
  var bitLength = str.length * 8;

  if (bitLength < blockSize) {
      for (let i = bitLength; i < blockSize; i += 8) {
          str += padder;
      }
  } else if (bitLength > blockSize) {
      while ((str.length * 8) % blockSize != 0) {
          str += padder;
      }
  }
  return Buffer.from(str, format).toString("utf8");
}

function post(url: string, prarms?: string | object, headers?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios.post(url, prarms, {
      headers: headers
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject({
        code: err?.response?.status || -1,
        msg: err?.response?.statusText || err.message || 'error'
      })
    })
  })
}
export {
  H5ST,post
}