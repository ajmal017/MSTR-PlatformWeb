/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function DrawPie() {
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    option = {
        title: {
            text: 'Profolio Percentage',
            left: 'center'

            
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                data: [
                    {value: 20, name: 'option'},
                    {value: 65, name: 'future'},
                    {value: 15, name: 'stock'}
                ]
            }
        ]

    };


    myChart.setOption(option);

}
;



function circularOut(k) {
    return Math.sqrt(1 - (--k * k));

}


function DrawLine() {
    var lineChart = echarts.init(document.getElementById('frontier'));


    var N_POINT = 30;

    var dataX = [];
    var dataY = [];
    for (var i = 0; i <= N_POINT; i++) {
        var x = i / N_POINT;
        var y = circularOut(x);

        dataX.push(x);
        dataY.push(y);


    }
    console.log(dataY);


    option = {
        legend: {
            data: ['Implied Volatilit']
        },
        tooltip: {
            trigger: 'axis',
            formatter: "ImV : <br/>{b} : {c}%"
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: dataX
            }
        ],
        yAxis: [
            {
                type: 'value'

            }
        ],
        series: [
            {
                name: '高度(km)与气温(°C)变化关系',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            shadowColor: 'rgba(0,0,0,0.4)'
                        }
                    }
                },
                data: dataY
            }
        ]
    };



    lineChart.setOption(option);


}
