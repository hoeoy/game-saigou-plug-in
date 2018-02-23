/**
 * @author andyzhao
 */
(function (incomeAggRecord) {
    //定义页面数据模型
    var url = window.houoy.public.static.contextPath + "/api";
    incomeAggRecord.model = (function () {
        if (!incomeAggRecord.model) {
            incomeAggRecord.model = {};
        }

        incomeAggRecord.model = window.houoy.public.createPageModel();


        return incomeAggRecord.model;
    })();

    incomeAggRecord.view = (function () {
        if (!incomeAggRecord.view) {
            incomeAggRecord.view = {};
        }

        incomeAggRecord.view.new = function () {
            //初始化模型
            incomeAggRecord.model.setUIState(window.houoy.public.PageManage.UIState.SEARCH);//默认是查询状态
            incomeAggRecord.model.setSelectState(window.houoy.public.PageManage.DataState.NONE_SELECT);//默认是没有选中数据
            incomeAggRecord.model.setModal(window.houoy.public.PageManage.UIModal.LIST);//默认是列表模式

            //初始化表格
            incomeAggRecord.dataTable = window.houoy.public.createDataTable({
                dataTableID: "table",
                single: true,
                url: url + "/income/retrieveAgg",
                urlType: "get",
                param: {//查询参数
                    date: function () {
                        return $("#date").val();
                    }
                },
                order: [[1, "desc"]],
                columns: [
                    {"title": "日期", 'data': 'date'},
                    {"title": "玩家下注", 'data': 'bet', 'render': incomeAggRecord.tableCellRender},
                    {"title": "盈利", 'data': 'win', 'render': incomeAggRecord.tableCellRender}
                ],
                onSelectChange: function (selectedNum, selectedRows) {
                    if (selectedNum > 1) {
                        incomeAggRecord.model.setSelectState(window.houoy.public.PageManage.DataState.MUL_SELECT);
                    } else if (selectedNum == 1) {
                        incomeAggRecord.model.setSelectState(window.houoy.public.PageManage.DataState.ONE_SELECT);
                    } else {
                        incomeAggRecord.model.setSelectState(window.houoy.public.PageManage.DataState.NONE_SELECT);//没有选中数据
                    }
                }
            });
        };

        return incomeAggRecord.view;
    }());

    incomeAggRecord.tableCellRender = function (data, type, full, meta) {
        if(!data) return null;
        return data / 100;
    };

    incomeAggRecord.controller = (function () {
        if (!incomeAggRecord.controller) {
            incomeAggRecord.controller = {};
        }

        //刷新表格数据
        incomeAggRecord.controller.search = function () {
            incomeAggRecord.dataTable.refresh();
        };

        //搜索区reset
        incomeAggRecord.controller.searchReset = function () {
            $("#date").val("");
            incomeAggRecord.controller.search();
        };

        return incomeAggRecord.controller;
    }());

    incomeAggRecord.registerEvent = function () {
        //注册事件监听
        $("#searchBtn").click(incomeAggRecord.controller.search);
        $("#searchResetBtn").click(incomeAggRecord.controller.searchReset);
    };

    incomeAggRecord.view.new();
    incomeAggRecord.registerEvent();

})(window.houoy.incomeAggRecord || {});


