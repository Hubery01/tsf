const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//检索用户
router.get('/detail',(req,res)=>{
	var obj=req.query;
	var $uid=obj.uid;
	if (!$uid)
	{
		res.send({code:401,msg:'uid required'});
		return;
	}
	pool.query('SELECT * FROM tsf_product WHERE uid=?',[$uid],(err,result)=>{
	if(err) throw err;
	res.send(result);
	})
})
//用户注册
router.post('/reg',(req,res)=>{
	var obj=req.body;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	var $email=obj.email;
	var $phone=obj.phone;
	if(!$uname)
	{res.send({code:401,msg:'请输入用户名'})
	return;
	};
	if (!$upwd)
	{res.send({code:402,msg:'请输入密码'})
	return;
	};
	if (!$email)
	{res.send({code:403,msg:'请输入电子邮箱'})
	return;
	}
	if (!$phone)
	{res.send({code:404,msg:'请输入电话号码'})
	return;
	}
	pool.query('INSERT INTO tsf_user SET ?',[obj],(req,res)=>{
	if (err) throw err
	if (result.affectedRows>0)
	{res.send({code:200,msg:'注册成功'});}
	});
});
//用户登录
router.post('/login',(req,res)=>{
	var obj=req.body;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	if (!$uname)
	{res.send({code:401,msg:'请输入用户名'})
	return;
	};
	if (!upwd)
	{res.send({code:402,msg:'请输入密码'})
	return;
	};
	pool.query('SELECT * FROM tsf_user WHERE uname=? AND upwd=?',[$uname,$upwd],(err,result)=>{
	if (err) throw err;
	if (result.length>0)
	{res.send({code:200,msg:'登陆成功'});
	}else
	res.send({code:401,msg:'登录失败'})
	});
});
//更改用户
router.post('/update',(req,res)=>{
	var obj=req.body;
	var $uid=obj.uid;
	var $email=obj.email;
	var $phone=obj.phone;
	var $user_name=obj.user_name;
	var $gender=obj.gender;
	pool.query('UPDATE tsf_user SET email=?,phone=?,user_name=?,gender=? ',[$email,$phone,$user_name,$gender],(err,result)=>{
	if (err) throw err;
	if (result.affectedRows>0)
	{res.send({code:200,msg:'修改成功'})
	}else{
	res.send({code:301,msg:'修改失败'})
	};
	});
})
//删除用户
router.post('/delete',(req,res)=>{
	 var obj=req.body;
	 var $uid=obj.uid;
	 if (!$uid)
	 {
		 res.send({code:301,msg:'请输入编号'})
	 }
	pool.query('DELETE * FROM tsf_user WHERE uid=?',[$uid],(err,result)=>{
	if (err) throw err;
	if(res.resultAffectedRows>0)
	{
		res.send({code:200,msg:'删除成功'})
	}else{
		res.send({code:301,msg:'删除失败'})
	}
	})
})
router.get('/list',(req,res)=>{
	var obj=req.query;
	var $start=obj.start;
	var $count=obj.count;
	if ($start==0)
	{
		$start=1;
	}
	if ($count==0)
	{
		$count=10;
	}
	var $start=($start-1)*$count;
	pool.query('SELECT * FROM tsf_user LIMIT ?,?',[$start,$count],(err,result)=>{
	if (err) throw err;
	res.send(result);
	})
})
module.exports=router;