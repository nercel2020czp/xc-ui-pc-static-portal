var  getCookie = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
};
var setCookie = function (c_name, value, expiredays) {
    // alert("setCookie: "+"c_name="+c_name+";  value="+value);
    // alert("document.domain="+document.domain);
    let date=new Date();
    let expireDays1=1; //将date设置为10天以后的时间
    date.setTime(date.getTime()+expireDays1*24*3600*1000); //将userId和userName两个cookie设置为10天后过期
    // document.cookie = c_name + "=" + escape(value) + "; domain=" + document.domain + "; path=/";

    document.cookie = c_name + "=" + value + "; expires="+date.toUTCString()  + "; domain=" + document.domain + "; path=/";
    // alert(c_name + "=" + value + "; expires="+date.toUTCString()  + "; domain=" + document.domain + "; path=/");
    // alert("document.cookie="+document.cookie);
};
var setCookie1 = function (c_name, value, expiredays) {
    // alert("setCookie: "+"c_name="+c_name+";  value="+value);
    // alert("document.domain="+document.domain);
    let date=new Date();
    date.setTime(date.getTime()+expiredays*24*3600*1000); //将userId和userName两个cookie设置为10天后过期
    // document.cookie = c_name + "=" + escape(value) + "; domain=" + document.domain + "; path=/";

    document.cookie = c_name + "=" + value + "; expires="+date.toUTCString()  + "; domain=" + document.domain + "; path=/";
    // alert(c_name + "=" + value + "; expires="+date.toUTCString()  + "; domain=" + document.domain + "; path=/");
    // alert("document.cookie="+document.cookie);
};
var delCookie1 = function(c_name){
    setCookie1(c_name,"",-1);
};
var getUserSession =function (key) {
    return sessionStorage.getItem(key);
};
var setUserSession =function (key, value) {
    return sessionStorage.setItem(key, value);
}
var delUserSession =function (key) {
    return sessionStorage.removeItem(key)
}
var getActiveUser = function(){
    let uid = getCookie("uid")
    if(uid){
        let activeUserStr = getUserSession("activeUser");
        if(activeUserStr){
            return JSON.parse(activeUserStr);
        }
        return ;
    }else{
        delUserSession("activeUser")
    }
}
//获取jwt令牌
var getJwt = function(){
    let activeUser = getActiveUser()
    if(activeUser){
        return activeUser.jwt
    }
}
//解析jwt令牌，获取用户信息
var getUserInfoFromJwt = function (jwt) {
    if(!jwt){
        return ;
    }
    var jwtDecodeVal = jwt_decode(jwt);
    if (!jwtDecodeVal) {
        return ;
    }
    let activeUser={}
    //console.log(jwtDecodeVal)
    activeUser.utype = jwtDecodeVal.utype || '';
    activeUser.username = jwtDecodeVal.name || '';
    activeUser.userpic = jwtDecodeVal.userpic || '';
    activeUser.userid = jwtDecodeVal.userid || '';
    activeUser.authorities = jwtDecodeVal.authorities || '';
    activeUser.uid = jwtDecodeVal.jti || '';
    activeUser.jwt = jwt;
    return activeUser;
}
var  checkActiveUser2=  function(){
    // var jwt = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjEyNjMzNjUsInVzZXJfbmFtZSI6IjEyMyIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iLCJnZXRSZXNvdXJjZSJdLCJqdGkiOiI3NmIxOTgzMi01MDk3LTQyMDMtYjhjMS1kOGI1N2ZmMmZhOTAiLCJjbGllbnRfaWQiOiJtYW5hZ2VyIiwic2NvcGUiOlsibWFuYWdlciJdfQ.MzycLCC9cR-905ilrd1bWH52nqto4MDYbbMSXgcRdVkUGlv2A2JrlIvbvxNc2BVug1L59AV_7hUa_SHZQgrOdHnyoMdcu5KoHHXsJi1O5wUXkuahc-K3KoBhwkyWY9O-DvwZhrmzsYN2gb_3qmU2xbHu6U1pwwscXGHjbKJDoWGdrmMkRc1cpxuqvH-0eusR1GLQ4gTBSyVNW4XVO7jMt9ATBubos7GhtbAMXnCQVO9pui2zvPvKVxlvwMjJowjdCc_5hvXjyUvWgbU1qUrdtXeskeT-HoVUtsol6OnFHnq7o9bIin1493ZwjDck_0R1R8mkGRGKylQtZdzESeQpYA';
    var jwt_base64 = getCookie("juid");
    if (jwt_base64 ) {
        let jwt = Base64.decode(jwt_base64)
        var jwtDecodeVal = jwt_decode(jwt);
        //console.log(jwtDecodeVal);
//    var user = sessionStorage.getItem('user');
        if (jwtDecodeVal) {

//      user = JSON.parse(user);
            let activeUser={}
            //console.log(jwtDecodeVal)
            activeUser.utype = jwtDecodeVal.utype || '';
            activeUser.username = jwtDecodeVal.user_name || '';
            activeUser.userpic = jwtDecodeVal.userpic || '';
            activeUser.userid = jwtDecodeVal.userid || '';
            activeUser.authorities = jwtDecodeVal.authorities || '';
            activeUser.menus = jwtDecodeVal.menus || '';

            setUserSession("activeUser",JSON.stringify(activeUser))
            return getUserSession("activeUser")
        }
    }
    return null;
}