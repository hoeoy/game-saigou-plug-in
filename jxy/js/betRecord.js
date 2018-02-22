/**
 * @author andyzhao
 */
(function (betRecord) {
    //定义页面数据模型
    var url = window.houoy.public.static.contextPath + "/api";
    betRecord.model = (function () {
        if (!betRecord.model) {
            betRecord.model = {};
        }

        betRecord.model = window.houoy.public.createPageModel();


        return betRecord.model;
    })();

    betRecord.view = (function () {
        if (!betRecord.view) {
            betRecord.view = {};
        }

        betRecord.view.new = function () {
            //初始化模型
            betRecord.model.setUIState(window.houoy.public.PageManage.UIState.SEARCH);//默认是查询状态
            betRecord.model.setSelectState(window.houoy.public.PageManage.DataState.NONE_SELECT);//默认是没有选中数据
            betRecord.model.setModal(window.houoy.public.PageManage.UIModal.LIST);//默认是列表模式

            //初始化表格
            betRecord.dataTable = window.houoy.public.createDataTable({
                dataTableID: "table",
                single: true,
                url: url + "/bet/retrieveUserSumByPeriodAndUser",
                urlType: "get",
                param: {//查询参数
                    //pk_period: function () {
                    //    return $("#pk_period").val();
                    //},
                    //win_type: function () {
                    //    return $("#win_type").val();
                    //}
                },
                order: [[1, "desc"]],
                columns: [{"title": "pk", 'data': 'pk_income', "visible": false},
                    {"title": "期pk", 'data': 'pk_period'},
                    {"title": "用户编码", 'data': 'user_code'},
                    {"title": "单", 'data': 'bet_odd', 'render': betRecord.tableCellRender},
                    {"title": "双", 'data': 'bet_even', 'render': betRecord.tableCellRender},
                    {"title": "大", 'data': 'bet_big', 'render': betRecord.tableCellRender},
                    {"title": "小", 'data': 'bet_little', 'render': betRecord.tableCellRender},
                    {"title": "1", 'data': 'bet_1', 'render': betRecord.tableCellRender},
                    {"title": "2", 'data': 'bet_2', 'render': betRecord.tableCellRender},
                    {"title": "3", 'data': 'bet_3', 'render': betRecord.tableCellRender},
                    {"title": "4", 'data': 'bet_4', 'render': betRecord.tableCellRender},
                    {"title": "5", 'data': 'bet_5', 'render': betRecord.tableCellRender},
                    {"title": "6", 'data': 'bet_6', 'render': betRecord.tableCellRender},
                    {"title": "7", 'data': 'bet_7', 'render': betRecord.tableCellRender},
                    {"title": "8", 'data': 'bet_8', 'render': betRecord.tableCellRender},
                    {"title": "9", 'data': 'bet_9', 'render': betRecord.tableCellRender},
                    {"title": "10", 'data': 'bet_10', 'render': betRecord.tableCellRender},
                    {"title": "总下注", 'data': 'total_bet', 'render': betRecord.tableCellRender}
                ],
                onSelectChange: function (selectedNum, selectedRows) {
                    if (selectedNum > 1) {
                        betRecord.model.setSelectState(window.houoy.public.PageManage.DataState.MUL_SELECT);
                    } else if (selectedNum == 1) {
                        betRecord.model.setSelectState(window.houoy.public.PageManage.DataState.ONE_SELECT);
                    } else {
                        betRecord.model.setSelectState(window.houoy.public.PageManage.DataState.NONE_SELECT);//没有选中数据
                    }
                }
            });
        };

        return betRecord.view;
    }());

    betRecord.tableCellRender = function (data, type, full, meta) {
        if(!data) return null;
        return data / 100;
    };

    betRecord.controller = (function () {
        if (!betRecord.controller) {
            betRecord.controller = {};
        }

        //刷新表格数据
        betRecord.controller.search = function () {
            betRecord.dataTable.refresh();
        };

        //搜索区reset
        betRecord.controller.searchReset = function () {
            //$("#pk_period").val("");
            //$("#win_type").val("");
            betRecord.controller.search();
        };

        //设置开奖号码
        betRecord.controller.setWin = function () {
            var winNum = $("#winNum").val();
            window.houoy.public.post(window.houoy.public.static.contextPath + '/api/period/setWinNum?winNum='+winNum, null,
                function (data) {
                    alert(data.content);
                }, function (data) {
                    alert(data.msg);
                });
        };

        return betRecord.controller;
    }());

    betRecord.registerEvent = function () {
        //注册事件监听
        $("#setWinNum").click(betRecord.controller.setWin);
        //$("#searchResetBtn").click(betRecord.controller.searchReset);
    };

    betRecord.view.new();
    betRecord.registerEvent();

})(window.houoy.betRecord || {});


