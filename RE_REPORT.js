/* eslint-disable no-var, camelcase */
var RE_REPORT = (function (global) {
  if (global.RE_REPORT) {
    return global.RE_REPORT;
  }

  var _log_list = [];
  var _log_map = {};
  var _config = {
    appId: 0, // 上报 id
    reportUrl: '',
    random: 1, // 抽样 (0-1] 1-全量
    delay: 2000, // 延迟上报 ms, 收集一段时间后统一上报
    submit: null, // 自定义上报方式
    repeat_timeout: 500, // 重复上报时间间隔 ms (对于同一个操作短时间内不上报第二次),
  };
  var _report_default = {
    appId: 0, // 上报 id,
    // uid: 0, // uid, 游客为0
    actionId: null, // action id, string
    // actionMsg: '', // 描述等
    deviceType: '',
    ext: null, // 扩展参数 额外信息, 用于自定义上报
  };

  var Tool = {
    isOBJByType: function (o, type) {
      return Object.prototype.toString.call(o) === '[object ' + (type || 'Object') + ']';
    },

    isOBJ: function (obj) {
      var type = typeof obj;
      return type === 'object' && !!obj;
    },

    isEmpty: function (obj) {
      if (obj === null) {
        return true;
      }
      if (Tool.isOBJByType(obj, 'Number')) {
        return false;
      }
      return !obj;
    },

    extend: function (src, source, isDeep = false) {
      var obj = isDeep ? {} : src;
      console.log(src, source);
      for (var key in src) {
        obj[key] = source[key] || src[key];
      }
      return obj;
    },

    isRepeat: function (report) {
      if (!Tool.isOBJ(report)) {
        return true;
      }
      var actionId = report.actionId;
      var oldTimes = _log_map[actionId] || 0;
      var time = new Date().getTime();
      var gapTime = time - oldTimes;
      // 判断间隔是否小于配置间隔
      if (gapTime < _config.repeat_timeout) {
        return true;
      }
      _log_map[actionId] = new Date().getTime();
      return false;
    },

    // 获取当前操作系统
    getOS: (function () {
      var deviceType;

      var userAgent = navigator.userAgent.toLowerCase();
      var isIpad = userAgent.indexOf('ipad') > -1;
      var isIphone = userAgent.indexOf('iphone') > -1;
      var isMidp = userAgent.indexOf('midp') > -1;
      var isUc7 = userAgent.indexOf('rv:1.2.3.4') > -1;
      var isUc = userAgent.indexOf('ucweb') > -1;
      var isAndroid = userAgent.indexOf('android') > -1;
      var isLinux = userAgent.indexOf('linux') > -1;
      var isCE = userAgent.indexOf('windows ce') > -1;
      var isWM = userAgent.indexOf('windows mobile') > -1;

      if (!(isIpad || isIphone || isMidp || isUc7 || isUc || isAndroid || isCE || isWM || isLinux)) {
        deviceType = "PC";
      } else if (isAndroid || isLinux) {
        deviceType = 'Android';
      } else if (isIphone || isIpad) {
        deviceType = 'iOS';
      } else if (isCE || isWM) {
        deviceType = 'WP';
      } else {
        deviceType = 'Others';
      }

      return function () {
        return deviceType;
      };
    })(),
  };

  var createXHR = (function () {
    var versions = [
      'Microsoft.XMLHTTP',
      'MSXML.XMLHTTP',
      'Msxml2.XMLHTTP.7.0',
      'Msxml2.XMLHTTP.6.0',
      'Msxml2.XMLHTTP.5.0',
      'Msxml2.XMLHTTP.4.0',
      'MSXML2.XMLHTTP.3.0',
      'MSXML2.XMLHTTP'
    ];
    var verId = 0;

    if (global.XMLHttpRequest) {
      return function () {
        return new XMLHttpRequest();
      };
    }
    for (var i = 0; i < versions.length; i++) {
      try {
        if (new ActiveXObject(versions[i])) {
          verId = i;
          break;
        }
      } catch (e) {
        continue;
      }
    }
    return function () {
      return new ActiveXObject(versions[verId]);
    };
  })();

  // ajax
  var ajax = function (data) {
    var xhr = createXHR();
    var json = {
      data: data
    };

    xhr.open('POST', _config.reportUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(JSON.stringify(json));
  };

  // 提交逻辑
  var submit_log_list = [];
  var _submit_log = function () {
    if (!submit_log_list.length) {
      return;
    }

    var url = _config.reportUrl;

    if (_config.submit) {
      _config.submit(url, submit_log_list);
    } else {
      // ajax(submit_log_list);
      // console.log(JSON.parse(JSON.stringify(submit_log_list)), Date.now() / 1000);

      var _img = new Image();
      _img.src = url + '?data=' + encodeURIComponent(JSON.stringify(submit_log_list));
    }

    submit_log_list = [];
  };

  // 验证逻辑
  var _process_log = function () {
    if (!_config.reportUrl) {
      return;
    }

    var randomIgnore = _config.randomIgnore;

    while (_log_list.length) {
      var isIgnore = false;
      var report_log = _log_list.shift();
      // 有效保证字符不要过长
      if (report_log.actionMsg) {
        report_log.actionMsg = (report_log.actionMsg + '' || '').substr(0, 200);
      }
      if (!isIgnore && !randomIgnore) {
        submit_log_list.push(report_log);
      }
    }

    _submit_log();
  };

  // report 主逻辑
  var reportTimeout = 0;
  var report = global.RE_REPORT = {
    // 将 info 推到缓存池
    push: function (info) {
      if (!Tool.isOBJ(info)) {
        console.error('Report data should be an object.');
        return;
      }
      if (!info.actionId) {
        console.error('"actionId" is required.');
        return;
      }
      var data = Tool.extend(_report_default, info, true);

      // ext 有默认值, 且上报不包含 ext, 使用默认 ext
      if (_report_default.ext && !data.ext) {
        data.ext = _report_default.ext;
      }

      // 重复上报
      if (Tool.isRepeat(data)) {
        return;
      }
      _log_list.push(data);

      if (!reportTimeout) {
        reportTimeout = setTimeout(function () {
          // console.log('delay', _log_list);
          _process_log();
          clearTimeout(reportTimeout);
          reportTimeout = 0;
        }, _config.delay); // 延迟上报
      }
    },

    report: function (info) { // report
      if (info && info.actionId) {
        report.push(info);
      } else {
        console.warn('Did you set `actionId` in your report?');
      }
      // if (isReportNow) {
      //   _process_log(true);
      // }
      return report;
    },

    init: function (config) { // 初始化
      if (Tool.isOBJ(config)) {
        Tool.extend(_config, config);
        _report_default.ext = config.ext;
        _report_default.appId = config.appId;
        _report_default.deviceType = Tool.getOS();
      }
      _config.randomIgnore = Math.random() >= _config.random;

      // 没有设置 appId 和 url 将不上报
      var appId = parseInt(_config.appId, 10);
      var url = _config.reportUrl;
      if (!appId || !url) {
        console.warn('This app will not report yet. Did you set "appId" and "reportUrl"?');
        return;
      }

      // if had logs in cache , report now
      if (_log_list.length) {
        _process_log();
      }

      return report;
    },
  };


  return report;
}(window));

if (typeof module !== 'undefined') {
  module.exports = RE_REPORT;
}