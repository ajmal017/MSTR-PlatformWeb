
function connect(url, params, succ, fail) {
    $.ajax({
        url: url,
        type: "GET",
        data: {
            request: JSON.stringify(params)
        },
        success: function (data) {
            
            var obj = JSON.parse(data);
            if (obj.success) {
                if (succ) {
                    succ(obj);
                } else {
                    alert(JSON.stringify(obj));
//                    alert(obj.errmsg);
                }
            } else {
                if (fail) {
                    fail(obj);
                } else {
                    alert(obj.errmsg);
                }
            }
        },
        error: function (data) {

        }

    });
}
