const  Nav =[
    {
        key: 10,
        name: '新车发布',
        icon: 'laptop',
        child: [
            {
                name: '新车发布',
                key: 1001,
                url:'release'
            },{
                name: '车辆管理',
                key: 1002,
                url:'car-review'
            }
        ]
    },
    {
        key: 1,
        name: '新车预约',
        icon: 'book',
        child: [
            {
                name: '预约管理',
                key: 101,
                url:'order'
            }
        ]
    }
];
export  default Nav