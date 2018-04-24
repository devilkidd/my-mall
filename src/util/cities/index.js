var _cities={
    cityInfo:{
        '北京':['北京'],
        '上海':['上海'],
        '江苏':['南京','苏州'],
    },
    //获取所有省份
    getProvinces:function(){
        //定义provinces存放省份
        var provinces=[];
        //for in 遍历对象的key,并存入provinces
        for(var item in this.cityInfo){
            provinces.push(item);
        }
        return provinces;
    },
    //获取某省份的所有城市
    getCities:function(porvinceName){
        //获取城市,并做容错处理
        return this.cityInfo[porvinceName]||[];
    }
}
module.exports=_cities;