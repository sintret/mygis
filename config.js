module.exports={
    tokenUrl:'http://192.168.30.153:8090/iportal/services/security/tokens.json',//token申请地址
    adminAcount:{"userName":"admin", "password":"Admin123", "clientType":"NONE", "expiration":60},//iportal管理员密码
    expiteTime:3500000,//token过期时间
    userInfoUrl:'http://192.168.30.153:8090/iportal/manager/security/users',//获取用户信息地址
    ynadmin:'ynAdmin',//管理权限用户组名称
    dataEditUrl_point:'http://192.168.30.153:8099/iserver/services/data-SARData/rest/data/datasources/Disaster/datasets/disaster_pt/features.json',//灾害编辑iserver数据服务地址
    dataEditUrl_polygon:'http://192.168.30.153:8099/iserver/services/data-SARData/rest/data/datasources/Disaster/datasets/disaster_py/features.json',
    loginUrl:'http://192.168.30.153:8090/iportal/web/login.json'//iportal login url
}