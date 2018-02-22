/**
 * @author andyzhao
 */
(function (setting) {
    //定义页面数据模型
    setting.pageModel = window.houoy.public.createPageModel();
    setting.pageModel.setCurrentData({
        odds: $("#odds").val(),
        rateTwo: $("#rateTwo").val(),
        rateNum: $("#rateNum").val()
    });

    //定义页面成员方法
    setting.init = function () {
        $("#saveBtn").click(function () {
            setting.save(function () {
                setting.pageModel.setUIState(window.houoy.public.PageManage.UIState.SEARCH);
            }, function () {
            });
        });

        //初始化
        setting.pageModel.setUIState(window.houoy.public.PageManage.UIState.UPDATE);//默认是更新
        setting.pageModel.setSelectState(window.houoy.public.PageManage.DataState.NONE_SELECT);//默认是没有选中数据
        setting.pageModel.setModal(window.houoy.public.PageManage.UIModal.CARD);//默认是列表模式

        window.houoy.public.get(window.houoy.public.static.contextPath + '/api/setting/retrieve', null,
            function (data) {
                $("#odds").val(data.odds);
                $("#rateTwo").val(data.rateTwo);
                $("#rateNum").val(data.rateNum);
            }, null);
    };

    setting.save = function (onSuccess, onError) {
        setting.pageModel.getCurrentData().odds = $("#odds").val();
        setting.pageModel.getCurrentData().rateTwo = $("#rateTwo").val();
        setting.pageModel.getCurrentData().rateNum = $("#rateNum").val();
        debugger;
        $.ajax({
            type: 'post',
            url: window.houoy.public.static.contextPath + '/api/setting/save',
            contentType: "application/json;charset=UTF-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-auth-token", window.houoy.public.static.getSessionID());  //使用spring session的token方式
            },
            dataType: "json",
            data: JSON.stringify(setting.pageModel.getCurrentData()),
            success: function (data) {
                if (data.success) {
                    alert("保存成功");
                    onSuccess();
                } else {
                    alert("保存失败:" + data.msg);
                }
            },
            error: function (data) {
                alert("保存失败！");
                onError();
            }
        });
    };

    setting.init();
})(window.houoy.setting || {});
