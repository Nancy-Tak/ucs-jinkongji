// 常用工具类

const tools = {
    // 隐藏中间部分的手机号码
  hidenPhoneNumber(phoneNumber) {
        // 手机号码隐藏处理
    const reg = new RegExp('(\\d{3})(\\d{5})(\\d{3})');
    return phoneNumber.replace(reg, '$1*****$3');
  },
    // 根据ua判断是否IE浏览器
  isIEbrowser() {
    const userAgent = navigator.userAgent;
    if (!!window.ActiveXObject || 'ActiveXObject' in window) { return true; } else if (userAgent.indexOf('Edge') > -1) {
      return true;
    }
    return false;
  },
    //  url添加参数的方法,params为对象
  urlAddParam(url, params) {
    const reg = new RegExp(/\?+/);
    let hadParam = reg.test(url);
    for (const prop in params) {
      const connector = hadParam ? '&' : '?';
      url += `${connector + prop}=${params[prop]}`;
      if (!hadParam) {
        hadParam = true;
      }
    }
    return url;
  },
};

export default tools;
