
function DrawPullCall() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('PullCall'));

    // 指定图表的配置项和数据
    option = {
        title: {
            text: 'Pull & Call'

        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Pull', 'Call']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['201106', '201107', '201109', '201112', '201206']
            }
        ],
        yAxis: [
            {
                type: 'value',
                min: 15

            }
        ],
        series: [
            {
                name: 'Pull',
                type: 'line',
                data: [23.6, 23.7, 24, 23.2, 22]
            },
            {
                name: 'Call',
                type: 'line',
                data: [16, 15.5, 15, 15.8]
            }

        ]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function SetIndex(obj) {
    var sh_dot = obj.content.market.shanghai.curdot;
    var sh_rate = obj.content.market.shanghai.rate;
    setNumber('shanghai', sh_dot.toFixed(2), sh_rate);
    var hs_dot = obj.content.market.HSI.curdot;
    var hs_rate = obj.content.market.HSI.rate;
    setNumber('hangseng', hs_dot, hs_rate);
    var dj_dot = obj.content.market.DJI.curdot;
    var dj_rate = obj.content.market.DJI.rate;
    setNumber('DowJones', dj_dot, dj_rate);
    var ns_dot = obj.content.market.IXIC.curdot;
    var ns_rate = obj.content.market.IXIC.rate;
    setNumber('Nasdaq', ns_dot, ns_rate);
}

function setNumber(index, dot, rate) {
    $("#" + index).html('<strong>' + dot + '</strong>');

    if (rate < 0) {
        $("#" + index + "-rate").html(rate + '%');
        $("#" + index).css("color", "red");
        $("#" + index + "-rate").css("color", "red");
    } else {
        $("#" + index + "-rate").html('+' + rate + '%');
        $("#" + index).css("color", "green");
        $("#" + index + "-rate").css("color", "green");
    }
}

function logout() {
    connect("EBanking.php", {
        type: "USER_LOGOUT",
        data: {
        }
    }, function (obj) {
        alert(obj.errmsg);
        window.location.reload();
    }, function () {
    });
}

function Searching() {
    connect("EBanking.php", {
        type: "USER_Search_Balance",
        data: {
        }
    }, function (obj) {
//                    alert(JSON.stringify(obj));
        var i = 0;
        var j = 0;
        var pie = null;
        var value = null;
        while (obj.content["deposits"][i]) {

            C_id = obj.content["deposits"][i].C_id;
            type = obj.content["deposits"][i].type;
            balance = obj.content["deposits"][i].balance;
            currency = obj.content["deposits"][i].currency;
//                        alert(C_id);
            $("#Account-List").append('<a id=' + C_id + ' class="list-group-item" onclick="ShowDetail(\'' + C_id + '\')"><h4 class = "list-group-item-heading">' + C_id + '</h4><p class = "list-group-item-text">' + type + '<span class = "list-group-item-text" style = "float: right">' + balance + '   ' + currency + '</span></p></a>');
            d_chart.load({
                columns: [
                    [C_id, parseInt(balance, 10)]
                ]
            });
            i++;
        }
        var sum_debit = 0;
        var sum_credit = 0;
        while (obj.content["credit"][j]) {
            C_id = obj.content["credit"][j].C_id;
            credit = obj.content["credit"][j].credit;
            debit = obj.content["credit"][j].debit;
            currency = obj.content["credit"][j].currency;
            type = obj.content["credit"][j].type;
//                        alert(debit);
            sum_debit += debit;
            sum_credit += credit;
            $("#Credit-List").append('<a id=' + C_id + ' class="list-group-item" onclick="ShowDetail(\'' + C_id + '\')"><h4 class = "list-group-item-heading">' + C_id + '  ( ' + type + ' )</h4><p class = "list-group-item-text">credit: ' + credit + ' ' + currency + '<span class = "list-group-item-text" style = "float: right">' + debit + '  ' + currency + '</span></p></a>');
            j++;


        }

        c_chart.load({
            columns: [
                ["Sum-credit", parseInt(sum_credit, 10)],
                ["Sum-debit", parseInt(sum_debit, 10)]
            ]
        });


    });
}

function ShowDetail(name) {
    localStorage["Account_ID"] = name;
    window.location.href = "Detail.html";
}

function ShowStock(obj) {
    var name = obj.content.current.stockinfo[0].name;
    var code = obj.content.current.stockinfo[0].code;
    var price = obj.content.current.stockinfo[0].currentPrice;
    var growth = obj.content.current.stockinfo[0].growth;
    var rate = obj.content.current.stockinfo[0].growthPercent;
    var date = obj.content.current.stockinfo[0].date;
    var hprice = obj.content.current.stockinfo[0].hPrice;
    var lprice = obj.content.current.stockinfo[0].lPrice;
    var oprice = obj.content.current.stockinfo[0].openningPrice;
    var cprice = obj.content.current.stockinfo[0].closingPrice;

    $("#s-name").html(name);
    $("#s-id").html('(' + code + '.HK)');
    $("#s-price").html(price.toFixed(2));

    $("#open").html(oprice.toFixed(2));
    $("#low").html(lprice.toFixed(2));
    $("#high").html(hprice.toFixed(2));
    $("#close").html(cprice.toFixed(2));



    $("#s-rate").html('(' + rate.toFixed(2) + '%)');
    $("#s-time").html(date);

    if (growth < 0) {
        $("#s-change").html('' + growth.toFixed(2));
        $("#s-rate").css("color", "red");
        $("#s-change").css("color", "red");
    } else {
        $("#s-change").html('' + '+' + growth.toFixed(2));
        $("#s-rate").css("color", "green");
        $("#s-change").css("color", "green");
    }



}

function setKchart(myChart, kdata, kdate, obj) {
    var name = obj.content.current.stockinfo[0].name;
    var option = {
        title: {
            text: name + '-Annualized K chart'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var res = params[0].seriesName + ' ' + params[0].name;
                res += '<br/>  Open : ' + params[0].value[0] + '  High : ' + params[0].value[3];
                res += '<br/>  Close : ' + params[0].value[1] + '  Low : ' + params[0].value[2];
                return res;
            }
        },
        legend: {
            data: [name + 'Annualized Trend']
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataZoom: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        dataZoom: {
            show: true,
            realtime: true,
            start: 50,
            end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                axisTick: {onGap: false},
                splitLine: {show: false},
                data: kdate
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                boundaryGap: [0.01, 0.01]
            }
        ],
        series: [
            {
                name: name,
                type: 'k',
                data: kdata
            }
        ]
    };

    myChart.setOption(option);

}

function DrawFuture() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('future'));

    // 指定图表的配置项和数据
    option = {
        title: {
            text: 'Future'

        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['市场期货价格', '理论期货价格']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['T1', 'T2', 'T3', 'T4']
            }
        ],
        yAxis: [
            {
                type: 'value',
                min: 15

            }
        ],
        series: [
            {
                name: '市场期货价格',
                type: 'line',
                data: [23.6, 23.7, 24, 23.2]
            },
            {
                name: '理论期货价格',
                type: 'line',
                data: [16, 15.5, 15, 15.8]
            }

        ]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

