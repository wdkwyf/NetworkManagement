export class AppConfig {
  private static username;
  // private static userInfo;
  //  {
  //   'phone': '15221530965',
  //   'workplace': '上海市 市辖区 杨浦区',
  //   'occupation': '学生',
  //   'job': 'IT/互联网 研发',
  //   'influence': 10,
  //   'organization': '上海交通大学',
  //   'university': '上海交通大学',
  //   'qq': '593880978',
  //   'wechat': 'anna',
  //   'weibo': '15221530965',
  //   'avatar': 'assets/imgs/avatar.jpg',
  //   'include': {'name': 'anna', 'email': 'huanganna@sjtu.edu.cn'},
  //   'hasGroups': [{'id':1,'name':'同学','count':1},{'id':2,'name':'同事','count':2}]
  // };

  // public static getUserInfo() {
  //   return this.userInfo;
  // }

  // public static setUserInfo(userInfo) {
  //   this.userInfo = userInfo;
  // }
  public static getUsername(){
    return this.username;
  }

  public static setUsername(username){
    this.username = username;
  }


}
