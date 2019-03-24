// gis的基础框架会主动调用loadCustom这个方法
mapApp.loadCustom = function () {
    if (window.loadWidget) {
        loadWidget();
    }
}
var local = {};

function getMapChoosedAddress(diag,callback) {
	callback(local);
	diag.close();
}
function loadWidget() {
    // 使用VUE构造器，创建一个VUE实例（组件）
    var ProblemAreaWidget = Vue.extend({
        // 设置当前VUE实例的DOM模板
        template: document.getElementById('problem-area-widget-template'),
        data: function () {
            return {
                // 矢量图层用到的data
                sourceFeatures: [], // 绑定设置当前图层数据源
                // curSelecteFeat: null, // 绑定设置当前SelectedFeat，选中的数据项
                defaultStyle: {}, // 绑定设置当前图层默认样式
                selectedStyle: {}, // 绑定设置当前图层数据被选中的样式
            }
        },
        watch: {
            //监听'mapState.clickInfo'属性，当点击地图
            'mapState.clickInfo': function () {
                //设置选中的点为当前图层显示的点
				debugger
                let wgs84coor = ol.proj.transform(this.mapState.clickInfo.coordinate, this.mapState.clickInfo.projection, 'EPSG:4326')
                let xCoordinate = wgs84coor[0]
                let yCoordinate = wgs84coor[1]
                // 使用x、y坐标查询地名数据，此处假设一个地名数据；
                //let address = '新大托斯卡纳(望江路)'
                local.address = '新大托斯卡纳(望江路)';
				
            	local.xCoordinate = wgs84coor[0];
            	local.yCoordinate = wgs84coor[1];
            	
                let features = [{
                    "feature": {
                        "type": "Point",
                        "coordinates": [xCoordinate, yCoordinate]
                    },
                    "__index__": 1,
                    "name": local.address,
                    "id": "1"
                    // "showInMap": true,
                    // "origin": "zidingyi"
                }]

                this.sourceFeatures = Object.freeze(features)
                // this.curSelecteFeat = features[0]
            }
        },
        mounted: function () {
            // 初始化组建时调用本方法
            // 定义默认样式
            this.defaultStyle = {
                "image": {
                    "crossOrigin": "anonymous",
                    "size": [18, 25],
                    "src": "./images/icon/green.png"
                },
                "text": {
                    "font": "16px sans-serif",
                    "field": "name",
                    "fill": {
                        "color": "#fff"
                    },
                    "textAlign": "center",
                    "textBaseline": "top",
                    "offsetY": -48
                }
            }
            // 定义选中样式
            this.selectedStyle = {
                "image": {
                    "crossOrigin": "anonymous",
                    "size": [18, 25],
                    "src": "./images/icon/red.png"
                },
                "text": {
                    "font": "16px sans-serif",
                    "field": "name",
                    "fill": {
                        "color": "#fff"
                    },
                    "textAlign": "center",
                    "textBaseline": "top",
                    "offsetY": -48
                }
            }
        },
        methods: {}
    })
    // 将定义的VUE实例注册为（组件）
    // 注册的名字为problem-area-widget，这个名字将被用于将组件添加到地图上
    Vue.component('problem-area-widget', ProblemAreaWidget)
}