/**
 * @author andyzhao
 */
(function (betTotalRecord) {
    //定义页面数据模型
    var url = window.houoy.public.static.contextPath + "/api";
    betTotalRecord.model = (function () {
        if (!betTotalRecord.model) {
            betTotalRecord.model = {};
        }

        betTotalRecord.model = window.houoy.public.createPageModel();


        return betTotalRecord.model;
    })();

    betTotalRecord.view = (function () {
        if (!betTotalRecord.view) {
            betTotalRecord.view = {};
        }

        betTotalRecord.view.new = function () {
            //初始化模型
            betTotalRecord.model.setUIState(window.houoy.public.PageManage.UIState.SEARCH);//默认是查询状态
            betTotalRecord.model.setSelectState(window.houoy.public.PageManage.DataState.NONE_SELECT);//默认是没有选中数据
            betTotalRecord.model.setModal(window.houoy.public.PageManage.UIModal.LIST);//默认是列表模式

            //初始化表格
            betTotalRecord.dataTable = window.houoy.public.createDataTable({
                dataTableID: "table",
                single: true,
                url: url + "/bet/retrieveSumByPeriodPK",
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
                    {"title": "单", 'data': 'bet_odd', 'render': betTotalRecord.tableCellRender},
                    {"title": "双", 'data': 'bet_even', 'render': betTotalRecord.tableCellRender},
                    {"title": "大", 'data': 'bet_big', 'render': betTotalRecord.tableCellRender},
                    {"title": "小", 'data': 'bet_little', 'render': betTotalRecord.tableCellRender},
                    {"title": "1", 'data': 'bet_1', 'render': betTotalRecord.tableCellRender},
                    {"title": "2", 'data': 'bet_2', 'render': betTotalRecord.tableCellRender},
                    {"title": "3", 'data': 'bet_3', 'render': betTotalRecord.tableCellRender},
                    {"title": "4", 'data': 'bet_4', 'render': betTotalRecord.tableCellRender},
                    {"title": "5", 'data': 'bet_5', 'render': betTotalRecord.tableCellRender},
                    {"title": "6", 'data': 'bet_6', 'render': betTotalRecord.tableCellRender},
                    {"title": "7", 'data': 'bet_7', 'render': betTotalRecord.tableCellRender},
                    {"title": "8", 'data': 'bet_8', 'render': betTotalRecord.tableCellRender},
                    {"title": "9", 'data': 'bet_9', 'render': betTotalRecord.tableCellRender},
                    {"title": "10", 'data': 'bet_10', 'render': betTotalRecord.tableCellRender},
                    {"title": "总下注", 'data': 'total_bet', 'render': betTotalRecord.tableCellRender}
                ],
                onSelectChange: function (selectedNum, selectedRows) {
                    if (selectedNum > 1) {
                        betTotalRecord.model.setSelectState(window.houoy.public.PageManage.DataState.MUL_SELECT);
                    } else if (selectedNum == 1) {
                        betTotalRecord.model.setSelectState(window.houoy.public.PageManage.DataState.ONE_SELECT);
                    } else {
                        betTotalRecord.model.setSelectState(window.houoy.public.PageManage.DataState.NONE_SELECT);//没有选中数据
                    }
                }
            });
        };

        return betTotalRecord.view;
    }());

    betTotalRecord.tableCellRender = function (data, type, full, meta) {
        return data / 100;
    };

    betTotalRecord.controller = (function () {
        if (!betTotalRecord.controller) {
            betTotalRecord.controller = {};
        }

        //刷新表格数据
        betTotalRecord.controller.search = function () {
            betTotalRecord.dataTable.refresh();
        };

        //搜索区reset
        betTotalRecord.controller.searchReset = function () {
           // $("#pk_period").val("");
           // $("#win_type").val("");
            betTotalRecord.controller.search();
        };

        return betTotalRecord.controller;
    }());

    //betTotalRecord.registerEvent = function () {
        //注册事件监听
      //  $("#searchBtn").click(betTotalRecord.controller.search);
      //  $("#searchResetBtn").click(betTotalRecord.controller.searchReset);
   // };

    betTotalRecord.view.new();
   // betTotalRecord.registerEvent();

})(window.houoy.betTotalRecord || {});


