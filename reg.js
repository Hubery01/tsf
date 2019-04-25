var phone = document.getElementById('phone');
var uname = document.getElementById('uname');
var email = document.getElementById('email');
var upwd = document.getElementById('upwd');
var upwd1 = document.getElementById('upwd1');
var reg = document.getElementById('reg');
var msg1 = document.getElementById('msg1');
var msg2 = document.getElementById('msg2');
var msg3 = document.getElementById('msg3');
var msg4 = document.getElementById('msg4');
var msg5 = document.getElementById('msg5');
var msg6 = document.getElementById('msg6');
uname.onblur = function(){
    var un = uname.value;
    var reg = /^[a-z0-9_]{3,16}$/;
    console.log(un)
    if(!un){
        msg2.innerHTML = '用户名不能为空!'
        msg2.style = 'color:red;background:yellow;font-size:14px;';
        return;
    }else{
        if(reg.test(un)){
            msg2.innerHTML="用户名输入正确"
			msg2.style="color:white; background:green; font-size:13px;";
			return;
		}else{
			msg2.innerHTML="用户名格式不正确";
			msg2.style="color:red; background:yellow; font-size:13px;";
			return;
		}
    } 
}
upwd.onblur=function(){
	var up=upwd.value;
	var reg=/^[0-9a-zA-Z_]{5,17}$/
	if(!up){
		msg4.innerHTML="密码不能为空!"
		msg4.style="color:red; background:yellow; font-size:13px;";
	}else{
		if(reg.test(up)){
			msg4.innerHTML="密码可以使用"
			msg4.style="color:white; background:green; font-size:13px;"
		}else{
			msg4.innerHTML="密码格式不正确";
			msg4.style="color:red; background:yellow; font-size:13px;";
		}
	}
}
upwd1.onblur=function(){
    var up1 = upwd1.value;
    if(up1!=upwd.value){
        msg5.innerHTML='两次密码不一致';
        msg5.style="color:red; background:yellow; font-size:13px;";
    }else{
        msg5.innerHTML='输入一致';
        msg5.style="color:white; background:green; font-size:13px;"
    }
}
email.onblur=function(){
    var em = email.value;
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(!em){
		msg3.innerHTML="邮箱不能为空!"
		msg3.style="color:red; background:yellow; font-size:13px;";
	}else{
		if(reg.test(em)){
			msg3.innerHTML="邮箱可以使用"
			msg3.style="color:white; background:green; font-size:13px;"
		}else{
			msg3.innerHTML="邮箱格式不正确";
			msg3.style="color:red; background:yellow; font-size:13px;";
		}
	}
}
phone.onblur=function(){
    var ph = phone.value;
    var reg = /^1[3-8]\d{9}$/
    if(!ph){
		msg1.innerHTML="手机号不能为空!"
		msg1.style="color:red; background:yellow; font-size:13px;";
	}else{
		if(reg.test(ph)){
			msg1.innerHTML="手机号可以使用"
			msg1.style="color:white; background:green; font-size:13px;"
		}else{
			msg1.innerHTML="手机号格式不正确";
			msg1.style="color:red; background:yellow; font-size:13px;";
		}
	}
}
reg.onclick = function(){
    var name = uname.value;
    var pwd = upwd.value;
    var em = email.value;
    var ph = phone.value;
    console.log(name+':'+pwd+':'+em+':'+ph)
    $.ajax({
        url:'http://127.0.0.1:3000/reg?uname='+name+'&upwd='+pwd+'&email='+em+'&phone='+ph,
        type:'get',
        dataType:'json'
    }).then(result=>{
        console.log(result)
        if(result.code==1){
			location="login.html"
		}else{
			alert('请检查输入的信息，有错误哟！')
        }
    })
}