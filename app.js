const express=require('express');
const bodyParser=require('body-parser');
const mysql = require('mysql')
const cors = require('cors');
var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'tsf',
	connectionLimit:10
});
var server=express();
server.use(cors({
	origin:['http://127.0.0.1:8080','http://localhost:8080'],
	credentials:true
}))
server.use(express.static('public'));
server.use(bodyParser.urlencoded({
	extended:false
}));
server.listen(3000);
// 1.login
server.get('/login',(req,res)=>{
	var $uname = req.query.uname;
	var $upwd = req.query.upwd;
	var sql = 'select * from tsf_user where uname = ? AND upwd = ?'
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if (err) throw err
		if(result.length == 1){
			res.writeHead(200,{
				"Access-Control-Allow-Origin":"*"
				});
				res.write(JSON.stringify({code:1,msg:"登陆成功"}));
				res.end();
		}else{
			res.writeHead(200,{
				"Access-Control-Allow-Origin":"*"
				});
				res.write(JSON.stringify({code:-1,msg:"登陆失败"}));
				res.end();
		}
	})
})
//用户注册
server.get('/reg',(req,res)=>{
	var obj=req.query;
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
	var sql = 'INSERT INTO tsf_user values(null,?,?,?,?,null,null,null)'
	pool.query(sql,[$uname,$upwd,$email,$phone],(err,result)=>{
	if (err) throw err
	if (result.affectedRows>0)
	{res.writeHead(200,{
		"Access-Control-Allow-Origin":"*"});
		res.write(JSON.stringify({code:1,msg:"登陆成功"}));
		res.end();
	}
	});
})
// 首页轮播图
server.get('/index',(req,res)=>{
	var sql = 'select cid,href from tsf_index_carousel';
	pool.query(sql,(err,result)=>{
		console.log(result)
		if(err) throw err;
		{res.writeHead(200,{
			"Access-Control-Allow-Origin":"*"});
			res.write(JSON.stringify({code:1,data:result}));
			res.end();
		}
	})
})
// 首页contbox
server.get('/contbox',(req,res)=>{
	var sql = 'select title,price,price1,pic,href from tsf_index_product';
	pool.query(sql,(err,result)=>{
		console.log(result)
		if(err) throw err
		{res.writeHead(200,{
			"Access-Control-Allow-Origin":"*"});
			res.write(JSON.stringify({code:1,data:result}));
			res.end();
		}
	})
})
// 首页HOT热卖
server.get('/hot',(req,res)=>{
	var sql = 'select hid,title,price2,pic,href from tsf_hot';
	pool.query(sql,(err,result)=>{
		console.log(result)
		if(err) throw err;
		{res.writeHead(200,{
			"Access-Control-Allow-Origin":"*"});
			res.write(JSON.stringify({code:1,data:result}));
			res.end();
		}
	})
})
// //更改用户
// server.post('/update',(req,res)=>{
// 	var obj=req.body;
// 	var $uid=obj.uid;
// 	var $email=obj.email;
// 	var $phone=obj.phone;
// 	var $user_name=obj.user_name;
// 	var $gender=obj.gender;
// 	pool.query('UPDATE tsf_user SET email=?,phone=?,user_name=?,gender=? ',[$email,$phone,$user_name,$gender],(err,result)=>{
// 	if (err) throw err;
// 	if (result.affectedRows>0)
// 	{res.send({code:200,msg:'修改成功'})
// 	}else{
// 	res.send({code:301,msg:'修改失败'})
// 	};
// 	});
// })
// //删除用户
// server.post('/delete',(req,res)=>{
// 	 var obj=req.body;
// 	 var $uid=obj.uid;
// 	 if (!$uid)
// 	 {
// 		 res.send({code:301,msg:'请输入编号'})
// 	 }
// 	pool.query('DELETE * FROM tsf_user WHERE uid=?',[$uid],(err,result)=>{
// 	if (err) throw err;
// 	if(res.resultAffectedRows>0)
// 	{
// 		res.send({code:200,msg:'删除成功'})
// 	}else{
// 		res.send({code:301,msg:'删除失败'})
// 	}
// 	})
// })
// server.get('/list',(req,res)=>{
// 	var obj=req.query;
// 	var $start=obj.start;
// 	var $count=obj.count;
// 	if ($start==0)
// 	{
// 		$start=1;
// 	}
// 	if ($count==0)
// 	{
// 		$count=10;
// 	}
// 	var $start=($start-1)*$count;
// 	pool.query('SELECT * FROM tsf_user LIMIT ?,?',[$start,$count],(err,result)=>{
// 	if (err) throw err;
// 	res.send(result);
// 	})
// })