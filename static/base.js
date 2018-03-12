// var baseUrl = document.location.origin + '/user';
// var baseUrl = 'http://192.168.31.10:6705/user';
var baseUrl = 'http://localhost:6705/user';


function Ajax(obj) {

    if (Object.prototype.toString.call(obj).toLowerCase() != '[object object]') {
        console.log('参数错误1');
        return;
    }
    let url = obj.url,
        opt = obj.opt || 'post',
        args = obj.args,
        sucFn = obj.success || function(){},
        errFn = obj.error || function(){},
        asy = obj.asy;
    if (typeof url != 'string' || Object.prototype.toString.call(args).toLowerCase() != '[object object]' || typeof sucFn != 'function') {
        return console.log('参数错误2');
    }
    if(typeof opt != 'string' || (opt != 'post' && opt != 'get' && opt != 'options'))
      return console.log('method error');


    //登录验证
    if(url!='/login' && localStorage.uid == '') {
      tools.loading(false);
      alert('用户未登录，自动跳转到首页');
      setTimeout(function(){
        window.location.reload()
      },300);
      window.location.href = document.location.origin + '/';
      return;
    }

    var json2FormData = function(args){
      let formData = new FormData();
      for(let key in args){
        formData.append(key, args[key]);
      }
      return formData;
    }

    var fun = function(res) {
      console.log(res);
      switch (res.code) {
        case 0:
          sucFn(res);
          break;
        case 1:
          errFn(res);
          break;
        case 2:
          tools.info('操作异常', 'error');
          break;

      }
    };


    // 原生XMLHttpRequest
    let xhr = new XMLHttpRequest();
    let async = asy === undefined ? true : (asy === false ? false : true);
    xhr.open(opt, baseUrl + url, async);
    xhr.timeout = 10000;
    xhr.ontimeout = function() {
      tools.info('网络不给力', 'error');
    };
    xhr.onload = function() {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        tools.loading(false);
        let res = JSON.parse(xhr.responseText);
        fun(res);
      } else {
        tools.loading(false);
        if(xhr.status == 404){
          // window.location.href = document.location.origin + '/';
        }
        else {
          tools.info('错误码：' + xhr.status, 'error');
        }
      }
    }

    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');

    xhr.send(json2FormData(args));

}



var tools = {
  preventScorll: function(type) {
    type = typeof(type) == 'undefined' && true;
    if(type) {
      $('html,body').addClass('preventScorll');
    } else {
      $('html,body').removeClass('preventScorll');
    }
  },
  loading: function(type) {
    type = typeof(type) == 'undefined' ? true : false;
    if(type) {
      let $div = $("<div class='loading'><span class='fa fa-spinner fa-spin-2x'></span></div>");
      $("body").append($div);
    } else {
      $(".loading").remove();
    }

  },
  info: function(msg, type) {
    msg = msg || 'null';
    type = type || 'error';
    let $div = $("<div class='info info-" + type + "'><div class='info-msg'>"+ msg +"</div></div>");
    $("body").append($div);
    $div.fadeIn(500, function() {
        let $this = $(this);
        setTimeout(function() {
            $this.fadeOut(1000, function() {
                $this.remove();
            });
        }, 1000);
    });
  }
};


var reg = {
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  uname: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
  upsd: /^[a-zA-Z]\w{5,17}$/
};
var validate = {
  ckEmail: function(email) {
    return reg.email.test(email);
  },
  ckName: function(name) {
    return reg.uname.test(name);
  }
};
