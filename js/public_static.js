/**
 * 家校易全局变量
 * @author andyzhao
 */
(function pub(houoy) {
    if (!window.houoy) {
        window.houoy = houoy;
    }
})(window.houoy || {});

(function pub(s) {
    if (!window.houoy.public) {
        window.houoy.public = s;
    }

    //定义全局变量
    if (typeof s.static == "undefined") {
        s.static = {
            contextPath: "http://localhost:8890",//后端服务器地址
            cmsContextPath: "http://localhost:8890",//后端服务器地址
            //contextPath: "http://172.247.157.150:8900",//后端服务器地址
            //cmsContextPath: "http://172.247.157.150:8900",//后端服务器地址
            xauthtoken: "com.jiaxiaoyi.xauthtoken",//sessionid的token
            getURLParameter: function (name) {//获得页面url参数
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
            },
            getSessionID:function(){
                return sessionStorage.getItem( window.houoy.public.static.xauthtoken);
            },
            setSessionID:function(value){
                sessionStorage.setItem(window.houoy.public.static.xauthtoken,value);
            }
        }
    }

})(window.houoy.public || {});