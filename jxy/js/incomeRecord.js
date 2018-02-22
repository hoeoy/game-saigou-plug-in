/**
 * @author andyzhao
 */
(function (incomeRecord) {
    //定义页面数据模型
    var url = window.houoy.public.static.contextPath + "/api";
    incomeRecord.model = (function () {
        if (!incomeRecord.model) {
            incomeRecord.model = {};
        }

        incomeRecord.model = window.houoy.public.createPageModel();


        return incomeRecord.model;
    })();

    incomeRecord.view = (function () {
        if (!incomeRecord.view) {
            incomeRecord.view = {};
        }

        incomeRecord.view.new = function () {
            //初始化模型
            incomeRecord.model.setUIState(window.houoy.public.PageManage.UIState.SEARCH);//默认是查询状态
            incomeRecord.model.setSelectState(window.houoy.public.PageManage.DataState.NONE_SELECT);//默认是没有选中数据
            incomeRecord.model.setModal(window.houoy.public.PageManage.UIModal.LIST);//默认是列表模式

            //初始化表格
            incomeRecord.dataTable = window.houoy.public.createDataTable({
                dataTableID: "table",
                single: true,
                url: url + "/income/retrieve",
                urlType: "get",
                param: {//查询参数
                    pk_period: function () {
                        return $("#pk_period").val();
                    },
                    win_type: function () {
                        return $("#win_type").val();
                    }
                },
                order: [[1, "desc"]],
                columns: [{"title": "pk", 'data': 'pk_income', "visible": false},
                    {"title": "期pk", 'data': 'pk_period'},
                    {"title": "单", 'data': 'bet_odd', 'render': incomeRecord.tableCellRender},
                    {"title": "双", 'data': 'bet_even', 'render': incomeRecord.tableCellRender},
                    {"title": "大", 'data': 'bet_big', 'render': incomeRecord.tableCellRender},
                    {"title": "小", 'data': 'bet_little', 'render': incomeRecord.tableCellRender},
                    {"title": "1", 'data': 'bet_1', 'render': incomeRecord.tableCellRender},
                    {"title": "2", 'data': 'bet_2', 'render': incomeRecord.tableCellRender},
                    {"title": "3", 'data': 'bet_3', 'render': incomeRecord.tableCellRender},
                    {"title": "4", 'data': 'bet_4', 'render': incomeRecord.tableCellRender},
                    {"title": "5", 'data': 'bet_5', 'render': incomeRecord.tableCellRender},
                    {"title": "6", 'data': 'bet_6', 'render': incomeRecord.tableCellRender},
                    {"title": "7", 'data': 'bet_7', 'render': incomeRecord.tableCellRender},
                    {"title": "8", 'data': 'bet_8', 'render': incomeRecord.tableCellRender},
                    {"title": "9", 'data': 'bet_9', 'render': incomeRecord.tableCellRender},
                    {"title": "10", 'data': 'bet_10', 'render': incomeRecord.tableCellRender},
                    {"title": "总下注", 'data': 'total_bet', 'render': incomeRecord.tableCellRender},
                    {"title": "开奖号码", 'data': 'win_num'},
                    {"title": "开奖方式", 'data': 'win_type'},
                    {"title": "收益", 'data': 'total_win', 'render': incomeRecord.tableCellRender},
                    {"title": "更新时间", 'data': 'ts'},
                ],
                onSelectChange: function (selectedNum, selectedRows) {
                    if (selectedNum > 1) {
                        incomeRecord.model.setSelectState(window.houoy.public.PageManage.DataState.MUL_SELECT);
                    } else if (selectedNum == 1) {
                        incomeRecord.model.setSelectState(window.houoy.public.PageManage.DataState.ONE_SELECT);
                    } else {
                        incomeRecord.model.setSelectState(window.houoy.public.PageManage.DataState.NONE_SELECT);//没有选中数据
                    }
                }
            });
        };

        return incomeRecord.view;
    }());

    incomeRecord.tableCellRender = function (data, type, full, meta) {
        if(!data) return null;
        return data / 100;
    };

    incomeRecord.controller = (function () {
        if (!incomeRecord.controller) {
            incomeRecord.controller = {};
        }

        //刷新表格数据
        incomeRecord.controller.search = function () {
            incomeRecord.dataTable.refresh();
        };

        //搜索区reset
        incomeRecord.controller.searchReset = function () {
            $("#pk_period").val("");
            $("#win_type").val("");
            incomeRecord.controller.search();
        };

        return incomeRecord.controller;
    }());

    incomeRecord.registerEvent = function () {
        //注册事件监听
        $("#searchBtn").click(incomeRecord.controller.search);
        $("#searchResetBtn").click(incomeRecord.controller.searchReset);
    };

    incomeRecord.view.new();
    incomeRecord.registerEvent();

})(window.houoy.incomeRecord || {});


