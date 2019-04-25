const express=require('express');
const pool=require('../pool');
var router=express.Router();
//商品列表
router.get('./list'(req.res)=>{
	var obj=req.query;
	var $start=parseInt(obj.start);
	var $count=parseInt(obj.count);
	if ($start==0)
	{
		$start=1;
	}
	if ($count==0)
	{
		$count=10;
	}
	$start=($start-1)*$count;
	pool.query('select * from tsf_product LIMIT ?,?',[$start,$count],(err,result)=>{
		if (err) throw err;
		res.send(result);
	})
});
//商品添加
router.post('./add',(req,res)=>{
	var obj=req.body;
	var i=400;
	for(var key in obj){
		i++;
		if (!obj[key])
		{
			res.send({code:i,msg:key+'required'});
			return;
		}
	}
	pool.query('INSERT INTO tsf_product SET ?',[obj],(err,result)=>{
		if (err) throw err;
		res.send({code:200,msg:'添加成功'})
	})
})
//商品修改
router.post('/update',(req.res)=>{
	var obj=req.body;
	var $pid=obj.pid
	var $title=obj.title;
	var $subtitle=obj.subtitle;
	var $collection_price=obj.collection_price;
	var $price=obj.price;
	var $spec=obj.spec;
	var $pname=obj.pname;
	var $category=obj.category;
	var $details=obj.details;
	var $shelf_time=obj.shelf_time;
	var $sold_count=obj.sold_count;
	var $is_onsale=obj.is_onsale;
	pool.query({'UPDATE tsf_product SET title=?,subtitle=?,collection_price=?,price=?,spec=?,pname=?,category=?,details=?,shelf_time=?,sold_count=?,is_onsale=?where uid=?',[$title,$subtitle,$collection_price,$price,$spec,$pname,$category,$details,$shelf_time,$sold_count,$is_onsale,$uid],(err,result)=>{
	if (err) throw err;
	if (result.affectedRows>0)
	{
		res.send({code:200,msg:'修改成功'})
	}else{
		res.send({code:301,msg:'修改失败'})
	};
	});
})
//产品删除
router.get('/delete',(req,res)=>{
	var obj=req.query;
	var $pid=obj.pid;
	if (!pid)
	{
		res.send({code:401,msg:'删除失败'})
	}
	pool.query('DELETE * FROM tsf_product WHERE pid=?',[$pid],(err,result)=>{
	if (err) throw err;
	if (result.affectedRows>0)
	{
		res.send({code:200,msg:'删除成功'})
	}else{
		res.send({code:301,msg:'删除失败'})	
	}
	})
})
module.exports=router;