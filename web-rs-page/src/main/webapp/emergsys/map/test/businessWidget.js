// businessWidget.js
// gis的基础框架会主动调用这个方法
mapApp.loadCustom = function () {
    if (window.loadBusinessWidget) {
        loadBusinessWidget();
    }
}

function loadBusinessWidget() {

    // 使用VUE构造器，创建一个VUE实例（组件）
    var PersonBusinessWidget = Vue.extend({
        // 设置当前VUE实例的DOM模板
        template: document.getElementById('person-widget-template'),
        data: function () {
            return {
                userFeatures: [],
                userdefaultStyle: {},
                userselectedStyle: {}
            }
        },
        mounted: function () {
            this.userdefaultStyle = {
                "image": {
                    "crossOrigin": "anonymous",
                    "size": [32, 32],
                    "src": "green.png"
                }
            }
            this.userselectedStyle = {
                "image": {
                    "crossOrigin": "anonymous",
                    "size": [32, 32],
                    "src": "red.png"
                }
            }
            var that = this
            // 接受重写定义的person_position方法，对图层进行赋值
            window.person_position = function (res, status) {
                if (status) {
                    // if(status)，获取数据，并赋值给layer图层
                    that.api.post({
                        url: '/cgi/emergsys/addressbook/AddressbookPosition/list',
                        params: {}
                    }).then(function (resdata) {
                        var featuresData = [];
                        var featureData= {
                            "otherAttr": null,
                            "feature": {
                                "type": "Point",
                                "coordinates": []
                            },
                            "__index__": null,
                            "name": null,
                            "id": null
                        }
                        for(var i=0;i<resdata.data.length;i++){
                            featureData.__index__  = i+1;
                            featureData.name = resdata.data[i].name;
                            featureData.id  = resdata.data[i].id;
                            featuresData.push(featureData);
                        }
                        that.userFeatures = Object.freeze(featuresData)
                    }).catch(function () {
                        //GIS弹出错误的固定模板
                        that.$msg({
                            message: '获数据错误',
                            type: 'error'
                        })
                    })
                } else {
                    // if(!status)将数据设置为空，清除地图数据
                    that.userFeatures = []
                }
            }
        }

    })
    // 将定义的VUE实例注册为（组件）
    // 注册的名字为business-widget，这个名字将被用于将组件添加到地图上
    Vue.component('person-widget', PersonBusinessWidget)

// 使用VUE构造器，创建一个VUE实例（组件）
    var RiskBusinessWidget = Vue.extend({
        // 设置当前VUE实例的DOM模板
        template: document.getElementById('risk-widget-template'),
        data: function () {
            return {
                riskFeatures: [],
                riskdefaultStyle: {},
                riskselectedStyle: {}
            }
        },
        mounted: function () {
            this.riskdefaultStyle = {
                "image": {
                    "crossOrigin": "anonymous",
                    "size": [32, 32],
                    "src": "green.png"
                }
            }
            this.riskselectedStyle = {
                "image": {
                    "crossOrigin": "anonymous",
                    "size": [32, 32],
                    "src": "red.png"
                }
            }
            var that = this
            // 接受重写定义的person_position方法，对图层进行赋值
            window.risk_position = function (res, status) {
                if (status) {
                    // if(status)，获取数据，并赋值给layer图层
                    that.api.post({
                        url: '/cgi/emergsys/rs/enterprsieriskinfo/getEnterprsieInfo',
                        params: {}
                    }).then(function (resdata) {
                        var featuresData = [];
                        var featureData= {
                            "otherAttr": null,
                            "feature": {
                                "type": "Point",
                                "coordinates": []
                            },
                            "__index__": null,
                            "name": null,
                            "id": null
                        }
                        for(var i=0;i<resdata.data.length;i++){
                            featureData.__index__  = i+1;
                            featureData.name = resdata.data[i].name;
                            featureData.id  = resdata.data[i].id;
                            featureData.feature.coordinates = [resdata.data[i].x,resdata.data[i].y];
                            featuresData.push(featureData);
                        }
                        that.riskFeatures = Object.freeze(featuresData)
                    }).catch(function () {
                        //GIS弹出错误的固定模板
                        that.$msg({
                            message: '获数据错误',
                            type: 'error'
                        })
                    })
                } else {
                    // if(!status)将数据设置为空，清除地图数据
                    that.riskFeatures = []
                }
            }
        }

    })
    // 将定义的VUE实例注册为（组件）
    // 注册的名字为business-widget，这个名字将被用于将组件添加到地图上
    Vue.component('risk-widget', RiskBusinessWidget)

    // 使用VUE构造器，创建一个VUE实例（组件）
    var MaterialBusinessWidget = Vue.extend({
        // 设置当前VUE实例的DOM模板
        template: document.getElementById('material-widget-template'),
        data: function () {
            return {
                materialFeatures: [],
                materialdefaultStyle: {},
                materialselectedStyle: {}
            }
        },
        mounted: function () {
            this.materialdefaultStyle = {
                "image": {
                    "crossOrigin": "anonymous",
                    "size": [32, 32],
                    "src": "green.png"
                }
            }
            this.materialselectedStyle = {
                "image": {
                    "crossOrigin": "anonymous",
                    "size": [32, 32],
                    "src": "red.png"
                }
            }
            var that = this
            // 接受重写定义的person_position方法，对图层进行赋值
            window.material_position = function (res, status) {
                if (status) {
                    // if(status)，获取数据，并赋值给layer图层
                    that.api.post({
                        url: '/cgi/emergsys/rs/enterpriseinfo/getEnterprsieInfo',
                        params: {}
                    }).then(function (resdata) {
                        var featuresData = [];
                        var featureData= {
                            "otherAttr": null,
                            "feature": {
                                "type": "Point",
                                "coordinates": []
                            },
                            "__index__": null,
                            "name": null,
                            "id": null
                        }
                        for(var i=0;i<resdata.data.length;i++){
                            featureData.__index__  = i+1;
                            featureData.name = resdata.data[i].name;
                            featureData.id  = resdata.data[i].id;
                            featureData.feature.coordinates = [resdata.data[i].x,resdata.data[i].y];
                            featuresData.push(featureData);
                        }
                        that.materialFeatures = Object.freeze(featuresData)
                    }).catch(function () {
                        //GIS弹出错误的固定模板
                        that.$msg({
                            message: '获数据错误',
                            type: 'error'
                        })
                    })
                } else {
                    // if(!status)将数据设置为空，清除地图数据
                    that.materialFeatures = []
                }
            }
        }

    })
    // 将定义的VUE实例注册为（组件）
    // 注册的名字为business-widget，这个名字将被用于将组件添加到地图上
    Vue.component('material-widget', MaterialBusinessWidget)

// 使用VUE构造器，创建一个VUE实例（组件）
    var SpotBusinessWidget = Vue.extend({
        // 设置当前VUE实例的DOM模板
        template: document.getElementById('spot-widget-template'),
        data: function () {
            return {
                spotFeatures: [],
                spotdefaultStyle: {},
                spotselectedStyle: {}
            }
        },
        mounted: function () {
            this.spotdefaultStyle = {
                "image": {
                    "crossOrigin": "anonymous",
                    "size": [32, 32],
                    "src": "green.png"
                }
            }
            this.spotselectedStyle = {
                "image": {
                    "crossOrigin": "anonymous",
                    "size": [32, 32],
                    "src": "red.png"
                }
            }
            var that = this
            // 接受重写定义的person_position方法，对图层进行赋值
            window.spot_position = function (res, status) {
                if (status) {
                    // if(status)，获取数据，并赋值给layer图层
                    that.api.post({
                        url: '/cgi/emergsys/rs/rssensitivespot/getSpotInfo',
                        params: {}
                    }).then(function (resdata) {
                        var featuresData = [];
                        var featureData= {
                            "otherAttr": null,
                            "feature": {
                                "type": "Point",
                                "coordinates": []
                            },
                            "__index__": null,
                            "name": null,
                            "id": null
                        }
                        for(var i=0;i<resdata.data.length;i++){
                            featureData.__index__  = i+1;
                            featureData.name = resdata.data[i].name;
                            featureData.id  = resdata.data[i].id;
                            featureData.feature.coordinates = [resdata.data[i].x,resdata.data[i].y];
                            featuresData.push(featureData);
                        }
                        that.spotFeatures = Object.freeze(featuresData)
                    }).catch(function () {
                        //GIS弹出错误的固定模板
                        that.$msg({
                            message: '获数据错误',
                            type: 'error'
                        })
                    })
                } else {
                    // if(!status)将数据设置为空，清除地图数据
                    that.spotFeatures = []
                }
            }
        }

    })
    // 将定义的VUE实例注册为（组件）
    // 注册的名字为business-widget，这个名字将被用于将组件添加到地图上
    Vue.component('spot-widget', SpotBusinessWidget)
}
