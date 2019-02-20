
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

	webix.ready(function(){

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
									header:"Add Result", body:{
										view:"form", autoheight: false,
										height: 100,id:"myform", scroll: true,
										elements:[
											{
												view:"text", id:'name', label: 'Name',
												labelWidth: 100, value: "Peter Johnson"
											},
											{
												view:"Result", view: "slider", label:"Value",
												labelWidth: 100, value:"80", name:"result", title: "#value#"
											},
											{
												view:"radio", vertical: true, labelWidth: 100,
												label:"Exam type", Points: "Practice",
												options:["Theory", "Practice"]
											},

											{
												view:"button", type:"form", id:'save',
												label: 'Save', align:"center", inputWidth: 150
											}
										]
									}
								},
								{
									header:"All Person's Results", body:{
									view:"datatable",
									columns:[
										{ id:"id",	header:"  ",  		width:50},
										{ id:"month",	header:"Date",  width:100},
										{ id:"score",	header:"Points", css:"number", width:80},
										{ id:"type",	header:"Exam type", 	fillspace: true}
									],
									prerender: true,
									scroll: "y", scrollX:false,
									data: set,
									select:true
								}}
							]
						},
						{
							id: "chart",
							rows:[
								{
									id: "barChart",
									view: "chart",
									type: "barH",
									value: "#score#",
									color: "#e79043",
									radius: 0,
									xAxis:{
										start: 0,
										step: 10,
										end: 100
									},
									yAxis: {
										template: function(obj){
											return obj.month.split("-")[0]
										},
										lines: false
									},
									data: set,
									on:{
										onBeforeRender: function(){
											this.data.silent(function(){
												this.filter(function(obj){
													return obj.type == ($$("examType").getValue()||"Practice");
												});
											});
										}
									}
								},
								{ height: 5},
								{
									id:"examType", align:"center", view:"segmented",
									multiview: true, selected: "Practice",
									options:[
										{id:"Practice", value:"Practice", width: 100},
										{id:"Theory", value:"Theory", width: 100}
									],
									on:{
										onChange:function(){
											$$("barChart").refresh();
										}
									}
								},
								{ height: 5}

							]
						},
						{
							id: "list",
							type: "clean",
							rows:[
								{
									cells:[
										{
											id: "grouplist",
											view: "grouplist",
											select: true,
											templateItem: "<b>#value#</b><br/>Average: #average#; Minimum: #min#",
											data: webix.copy(groupdata),
											type: {
												height: "auto"
											}
										},
										{
											id: "tree",
											view: "tree",
											activeTitle: true,
											select: true,
											scroll: "y",
											template:"{common.icon()} <span>#value#</span>",
											data: webix.copy(groupdata)
										}

									]
								},
								{ height: 5},
								{
									align:"center", view:"segmented", multiview: true, selected: "List",
									options:[
										{id:"grouplist", value:"List", width: 100},
										{id:"tree", value:"Tree", width: 100}
									],
									on:{
										onChange:function(){
											$$("barChart").refresh();
										}
									}
								},
								{ height: 5}

							]
						},
						{
							view:"unitlist",
							id:"members",
							select:true,
							scheme:{
								$sort:{
									by:"name",
									dir: 'asc',
									as:"string"
								}
							},
							uniteBy:function(obj){
								return obj.name.substr(0,1);
							},
							template:"#name#",
							data: list_data,
							select:true,
							on:{
								onAfterLoad:function(){
									this.select(1);
								}
							}
						}
					]
				},
				{
					view: "tabbar",
					type: "iconTop",
					multiview: true,
					tabMinWidth: 80,
					options:[
						{ id:"results", icon:"mdi mdi-flag-outline", value: "Personal" },
						{ id:"chart",  icon:"mdi mdi-chart-bar", value: "Chart" },
						{ id:"list", icon:"mdi mdi-book", value: "Statistic" },
						{ id:"members", icon:"mdi mdi-account", value: "Members" }
					]
				}
			]


		};



		if (!webix.env.touch){
			document.getElementById("nontouch_text").style.display = "";
			webix.ui({
				type:"clean", rows:[
					{
						css:"touch_demo", content:"nontouch_text"
					},
					{
						view:"navbar", value:"touch"
					}
				]
			});
			appui.container = "demo_screen";
			appui.borderless = true;
			webix.ui(appui);
		} else {
			webix.ui.fullScreen();
			webix.ui(appui);

			// change active view on swipe
			webix.$$("$multiview1").attachEvent("onSwipeX",function(context0,context1){
				var delta = context1.x - context0.x;
				var index = this.index(webix.$$(this.getActiveId()));
				var options = webix.$$("$tabbar1").config.options;
				index += (delta <0?1:-1);
				if(options[index]){
					webix.$$("$tabbar1").setValue(options[index].id);
				}
			});
		}
	});
