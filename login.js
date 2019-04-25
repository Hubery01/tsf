var login = document.getElementById('login');
var uname = document.getElementById('uname');
var upwd = document.getElementById('upwd');
var msg1 = document.getElementById('msg1');
var msg2 = document.getElementById('msg2');
uname.onblur = function(){
    var un = uname.value;
    var reg = /^[a-z0-9_]{3,16}$/;
    console.log(un)
    if(!un){
        msg1.innerHTML = '用户名不能为空!'
        msg1.style = 'color:red;background:yellow;font-size:14px;';
        return;
    }else{
        if(reg.test(un)){
            msg1.innerHTML="用户名输入正确"
			msg1.style="color:white; background:green; font-size:13px;";
			return;
		}else{
			msg1.innerHTML="用户名格式不正确";
			msg1.style="color:red; background:yellow; font-size:13px;";
			return;
		}
    }
}
upwd.onblur=function(){
	var up=upwd.value;
	var reg=/^[0-9a-zA-Z_]{5,17}$/
	if(!up){
		msg2.innerHTML="密码不能为空!"
		msg2.style="color:red; background:yellow; font-size:13px;";
	}else{
		if(reg.test(up)){
			msg2.innerHTML="密码输入正确"
			msg2.style="color:white; background:green; font-size:13px;"
		}else{
			msg2.innerHTML="密码格式不正确";
			msg2.style="color:red; background:yellow; font-size:13px;";
		}
	}
}
login.onclick = function(){
    var name = uname.value;
    var pwd = upwd.value;
    $.ajax({
        url:`http://127.0.0.1:3000/login?uname=${name}&upwd=${pwd}`,
        type:'get',
        dataType:'json'
    }).then(result=>{
        console.log(result)
        if(result.code==1){
			location="index.html"
		}else{
			if(name.length==0||pwd.length==0){
				msg1.innerHTML="用户名或密码不能为空";
				msg1.style="color:red; background:yellow; font-size:13px;";
			}else{
			msg2.innerHTML="用户名或密码错误";
			msg2.style="color:red; background:yellow; font-size:13px;";
			}
		}
    })
}