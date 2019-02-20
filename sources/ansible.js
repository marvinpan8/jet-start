import "./styles/ansible.css";

webix.ready(function(){
    
	var set = [
		{ id:1, month:"Oct-05", score:56, type: "Theory"},
		{ id:2, month:"Oct-10", score:89, type:"Practice"},
		{ id:3, month:"Nov-02", score:75, type:"Theory"},
		{ id:4, month:"Nov-05", score:40, type: "Practice"},
		{ id:5, month:"Dec-06", score:70, type:"Theory"},
		{ id:6, month:"Dec-07", score:88, type:"Practice"},
		{ id:7, month:"Jan-15", score:66, type: "Theory"},
		{ id:8, month:"Jan-16", score:79, type:"Practice"},
		{ id:9, month:"Feb-08", score:92, type:"Theory"},
		{ id:10, month:"Feb-09", score:50, type: "Practice"},
		{ id:11, month:"Mar-06", score:90, type:"Theory"},
		{ id:12, month:"Mar-08", score:83, type:"Practice"}
	];
	var groupdata = [
		{
			id:"theory", value:"Theory",
			data:[
				{ id:1, value:"Oct-05", average:56, min: 10},
				{ id:2, value:"Nov-02", average:78, min: 15},
				{ id:3, value:"Dec-06", average:74, min: 20},
				{ id:4, value:"Jan-15", average:68, min: 30},
				{ id:5, value:"Feb-08", average:45, min: 35},
				{ id:6, value:"Mar-06", average:52, min: 32}
			]
		},
		{
			id:"practice", open:true, value:"Practice",
			data:[
				{ id:11, value:"Oct-10", average: 58.9, min: 41},
				{ id:12, value:"Nov-05", average: 67.7, min: 30},
				{ id:13, value:"Dec-07", average: 78.2, min: 35},
				{ id:14, value:"Jan-16", average: 75.1, min: 27},
				{ id:15, value:"Feb-09", average: 59.2, min: 38},
				{ id:16, value:"Mar-08", average: 78.0, min: 41}
			]
		}
	];
	var list_data = [
		{ id:1, name: "Peter Johnson"},
		{ id:2, name: "Rebeca Rid"},
		{ id:3, name: "Alex Murphy"},
		{ id:4, name: "Tory Miles"},
		{ id:5, name: "Rene Samerson"},
		{ id:6, name: "Anna Miranovich"},
		{ id:7, name: "Kristopher Turner"},
		{ id:8, name: "Michael Evans"},
		{ id:9, name: "Jodi Fernandez "},
		{ id:10, name: "Carmen Sims "},
		{ id:11, name: "Jody Silva"},
		{ id:12, name:"Jan Morris "}
    ];
    
    function buyClick(){
        webix.ajax().headers({"Content-Type":"application/json"})
        .post("/activity/deploy", { "action":"start"},function(t,d,x){
            var data = d.json();
            if(data.errorCode == 0 && data.errorMsg == 'ok') {
                $$("tenantid").setValue(data.tenantId);
                $$("user").setValue("admin");
                $$("password").setValue("123456");
            }
            if(data.errorCode == 1) {
                $$("tenantid").setValue("ERROR");
            }
        }); 
    }

    var appui = {
        rows:[
            {
                view: "multiview",
                cells:[
                    {
                        id: "results",
                        view:"accordion",
                        multi: "mixed",
                        rows:[
                            {
                                header:"<b>欢迎购买今日投资产品</b>", 
                                body:{
                                    id:"myform",
                                    view:"form", 
                                    height: 100,
                                    autoheight: false,
                                    elements:[
                                        {
                                            view: "button", 
                                            type:"form", 
                                            label: '购买', 
                                            align:"center", 
                                            inputWidth: 150,
                                            click: buyClick
                                        },
                                        {
                                            view: "text", 
                                            label: '网址: ',
                                            labelWidth: 100, 
                                            readonly: true,
                                            value: "tencentcda.txyun.investoday.net"
                                        },
                                        {
                                            view:"text", 
                                            id: "tenantid",
                                            label: '租户ID: ',
                                            labelWidth: 100, 
                                            readonly: true
                                        },
                                        {
                                            view: "text", 
                                            id: "user",
                                            label: '用户名: ',
                                            labelWidth: 100, 
                                            readonly: true
                                        },
                                        {
                                            view: "text", 
                                            id: "password",
                                            label: '密码: ',
                                            labelWidth: 100, 
                                            readonly: true
                                        },
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    };

    appui.container = "demo_screen";
    appui.borderless = true;
    webix.ui.fullScreen();
    webix.ui(appui).show();
   


});