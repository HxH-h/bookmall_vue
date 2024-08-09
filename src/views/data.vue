<template>
    <el-container style="height: 100vh;">
        <el-main>
            <el-row type="flex" justify="space-between">
                <el-col :span="12">
                    <div class="left-column">
                        <el-row type="flex" justify="space-around">
                            <el-col :span="24" style="height: 50%;">
                                <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-change="handleClick">
                                    <el-tab-pane label="本周" name="first" />
                                    <el-tab-pane label="本月" name="second" />
                                    <el-tab-pane label="近七天" name="third" />
                                    <el-tab-pane label="近30天" name="fourth" />
                                </el-tabs>
                                <div ref="turnover" class="chart" style="border-bottom: 1px solid #ccc;"></div>
                            </el-col>
                            <el-col :span="24" style="height: 50%;">
                                <div ref="order" class="chart"></div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div ref="rank" style="height: 80vh;width: 45vw;"></div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>




</template>

<script lang="ts" setup>
import axios from 'axios';
import * as echarts from 'echarts';
import type { TabsPaneContext } from 'element-plus'
import { ref, nextTick, onMounted } from 'vue'
import { useStore } from "vuex";
import { ElMessage } from 'element-plus'
const store = useStore();

const turnover = ref(null)
const order = ref(null)
const rank = ref(null)
const activeName = ref('first')





var saledata = []
var failedorder = []
var completeorder = []
var bookrank = []

var myChart
var orderChart
var rankChart
let timeslot = getWeekDays()
onMounted(async () => {

    getOrderStat(timeslot[0], timeslot[timeslot.length - 1])
    getSales(timeslot[0], timeslot[timeslot.length - 1])
    getBookRank(timeslot[0], timeslot[timeslot.length - 1])
    await nextTick();
    myChart = echarts.init(turnover.value);
    orderChart = echarts.init(order.value);
    rankChart = echarts.init(rank.value);
    rendener()
    rendenOrder()
    renderRank()
})



function rendener() {
    var option = {
        title: {
            text: '营业额',
            x: 'center',
            y: 'top',
            textStyle: {
                fontFamily: 'Arial, Verdana, sans...',
                fontSize: 24,

            },
        },
        xAxis: {
            type: 'category',
            data: timeslot,
            axisLabel: {
                interval: 0,
                rotate: -40
            }
        },
        yAxis: {
            type: 'value',

        },
        series: [
            {
                data: saledata,
                type: 'line'
            }
        ]
    };
    myChart.setOption(option);
}

function rendenOrder() {
    var option = {
        title: {
            text: '订单数',
            x: 'center',
            y: 'top',
            textStyle: {
                fontFamily: 'Arial, Verdana, sans...',
                fontSize: 24,

            },
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'top',
            data: ['成功订单', '失败订单']
        },
        xAxis: {
            type: 'category',
            data: timeslot,
            axisLabel: {
                interval: 0,
                rotate: -40
            }
        },
        yAxis: {
            type: 'value',

        },
        series: [
            {
                name: '成功订单',
                data: completeorder,
                type: 'line',
                lineStyle: { color: 'green' },
                itemStyle: {
                    color: 'green', // 数据点颜色
                },

            },
            {
                name: '失败订单',
                data: failedorder,
                type: 'line',
                lineStyle: { color: 'blue' },
                itemStyle: {
                    color: 'blue', // 数据点颜色
                },

            }
        ]
    };
    orderChart.setOption(option);
}

function renderRank() {
    var option = {
        legend: {
            top: 'bottom'
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [50, 250],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: bookrank
            }
        ]
    };
    rankChart.setOption(option);
}




function getSales(begin: string, end: string) {
    axios({
        method: 'GET',
        url: 'http://localhost:8080/admin/data/turnover/' + begin + '/' + end,
        headers: {
            Authorization: store.state.token
        }
    }).then(res => {
        var temp = []
        res.data.data.forEach(element => {
            if (element == null) {
                temp.push(0)
            } else {
                temp.push(element.sum)
            }
        });

        saledata = temp
        rendener()
    })
}

function getFailedOrder(begin: string, end: string) {
    return axios({
        method: 'GET',
        url: 'http://localhost:8080/admin/data/order' + '/' + begin + '/' + end + '/' + 1,
        headers: {
            Authorization: store.state.token
        }
    })
}

function getCompleteOrder(begin: string, end: string) {
    return axios({
        method: 'GET',
        url: 'http://localhost:8080/admin/data/order' + '/' + begin + '/' + end + '/' + 2,
        headers: {
            Authorization: store.state.token
        }
    })
}


function getOrderStat(begin: string, end: string) {
    axios.all([getFailedOrder(begin, end), getCompleteOrder(begin, end)]).then(axios.spread((deliverRes, completeRes) => {
        var temp1 = []
        var temp2 = []
        deliverRes.data.data.forEach(element => {
            if (element == null) {
                temp1.push(0)
            } else {
                temp1.push(element)
            }
        });
        completeRes.data.data.forEach(element => {
            if (element == null) {
                temp2.push(0)
            } else {
                temp2.push(element)
            }
        });
        failedorder = temp1
        completeorder = temp2
        rendenOrder()
    }))
}

function getBookRank(begin: string, end: string){
    axios({
        method: 'GET',
        url: 'http://localhost:8080/admin/data/rank/' + begin + '/' + end +'/'+10,
        headers: {
            Authorization: store.state.token
        }
    }).then(res => {
        bookrank = res.data.data
        console.log(bookrank)
        renderRank()
    })
}


const handleClick = (tab: TabsPaneContext, event: Event) => {
    let begin = ''
    let end = ''
    if (activeName.value == 'first') {
        timeslot = getWeekDays()
    } else if (activeName.value == 'second') {
        timeslot = getMonthDays()
    } else if (activeName.value == 'third') {
        timeslot = getBeforeDays(7)
    } else if (activeName.value == 'fourth') {
        timeslot = getBeforeDays(30)
    } else {
        const open4 = () => {
            ElMessage.error('时间非法')
        }
        return
    }
    if (timeslot.length == 0) {
        const open4 = () => {
            ElMessage.error('时间非法')
        }
        return
    }
    begin = timeslot[0]
    end = timeslot[timeslot.length - 1]
    getSales(begin, end)
    getOrderStat(begin, end)
    getBookRank(begin, end)
}

function getWeekDays() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 今天是一周中的第几天（0表示周日，1表示周一，以此类推）

    // 计算本周第一天（周一）的日期
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));

    // 创建一个数组来存储本周的日期
    const datesOfThisWeek = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(firstDayOfWeek);
        date.setDate(date.getDate() + i); // 获取从周一到周日的每一天
        datesOfThisWeek.push(`${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`);
    }

    return datesOfThisWeek;
}

function getMonthDays() {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var day = new Date(year, month, 0).getDate(); // 获取当前月份的最后一天
    let now = new Date(year, month - 1, 1); // 设置为当前月份的第一天
    let current_month_num = day;
    let current_month = [];

    for (let i = 1; i <= current_month_num; i++) {
        now.setDate(i);
        current_month.push(`${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)}`);
    }

    return current_month;
}

function getBeforeDays(num) {
    let now = new Date();
    let before_days = [];
    for (let i = 0; i < num; i++) {
        now.setDate(now.getDate() - 1);
        before_days.push(`${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)}`);
    }
    return before_days.reverse();
}

</script>


<style scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.chart {
    background-color: #f5f7fa;

    padding: 20px;
    width: 42vw;
    height: 50vh;

}
</style>