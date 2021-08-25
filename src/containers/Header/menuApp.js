export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user', 
        menus: [
            
            {
                
                        name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'

                   


              

            },
        ]
    },
    { //quản lý phòng khám
        name: 'menu.admin.clinic', 
        menus: [
            {
                name: 'menu.admin.manage-clinic',link: '/system/user-manage'
            
            },
            
           
        ]
    },
    { //quản lý dịch vụ
        name: 'menu.admin.specialty', 
        menus: [
            {
                name: 'menu.admin.manage-specialty',link: '/system/user-redux'
            
            },
            
           
        ]
    },
    { //quản lý cẩm nang
        name: 'menu.admin.handbook', 
        menus: [
            {
                name: 'menu.admin.manage-handbook',link: '/system/manage-doctor'
            
            },
            
           
        ]
    },
];


export const doctorMenu = [
   {
        name: 'menu.admin.manage-user',
        menus: [
    { //quản lý cẩm nang
        
                name: 'menu.doctor.schedule', link: '/doctor/manage-schedule'

            },


        ]
    },
];


