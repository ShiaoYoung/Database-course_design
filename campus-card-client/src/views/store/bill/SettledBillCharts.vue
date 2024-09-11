<script setup>
import { ref, onMounted } from 'vue'

const monthORday = ref('每月')

// 当前时间
const currentTime = new Date();
const year = ref(currentTime.getFullYear());
const month = ref(currentTime.getMonth() + 1);

// 定义数据项
const charge_total = ref(0);
const consume_total = ref(0);
const x = ref([]);
const charge_y = ref([]);
const consume_y = ref([]);


// 1. 导入echarts
import * as echarts from 'echarts';

const chart1 = ref(null) // 使用ref创建虚拟DOM引用，使用时用chart.value
onMounted(() => {
    changeChart();
})
const init = (chart) => {
    // 2. 初始化echarts对象
    let myChart;
    let option;
    if (chart === 'month') {
        myChart = echarts.init(chart1.value, 'null', { width: 600, height: 500 });
        myChart.clear();
        // 3. 准备配置项
        option = {
            title: {

            },
            tooltip: {
                formatter: '<strong>{a}</strong><br/>{b}月：{c}元'
            },
            toolbox: {
                feature: {
                    magicType: {
                        show: true,
                        type: ['bar', 'line']
                    }
                }
            },
            xAxis: {
                type: 'category',
                data: x.value,
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '收入',
                    type: 'line',
                    data: consume_y.value
                }
            ]
        }
    }
    else if (chart === 'day') {
        myChart = echarts.init(chart1.value, 'null', { width: 1000, height: 500 });
        myChart.clear();
        // 3. 准备配置项
        option = {
            title: {

            },
            tooltip: {
                formatter: '<strong>{a}</strong><br/>{b}日：{c}元'
            },
            toolbox: {
                feature: {
                    magicType: {
                        show: true,
                        type: ['bar', 'line']
                    }
                }
            },
            xAxis: {
                type: 'category',
                data: x.value,
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '收入',
                    type: 'line',
                    data: consume_y.value
                }
            ]
        }
    }

    // 4. 将配置项设置给echarts对象
    myChart.setOption(option);
}

// 更新图表
import { settledChartDataService } from '@/api/consume.js';
const changeChart = async () => {
    if (monthORday.value === '每月') {
        let params = {
            type: monthORday.value,
            monthORday: year.value,
        }
        let consume_result = await settledChartDataService(params);

        // 动态绑定数据
        x.value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        consume_total.value = consume_result.data.total;

        for (let index = 0; index < consume_result.data.items.length; index++) {
            const item = consume_result.data.items[index];
            consume_y.value[index] = item.amount;
        }
        console.log(consume_y.value);

        init('month');
    }
    else if (monthORday.value === '每日') {
        let params = {
            type: monthORday.value,
            monthORday: month.value,
        }
        let consume_result = await settledChartDataService(params);

        // 动态绑定数据
        x.value = [];
        for (let index = 1; index <= consume_result.data.items.length; index++) {
            x.value.push(index);
        }
        consume_total.value = consume_result.data.total;

        for (let index = 0; index < consume_result.data.items.length; index++) {
            const item = consume_result.data.items[index];
            consume_y.value[index] = item.amount;
        }
        console.log(consume_y.value);

        init('day');
    }
}
</script>

<template>
    <div style="text-align-last: center;">
        <el-radio-group v-model="monthORday" size="large" @click="changeChart">
            <el-radio-button label="每月" value="每月" />
            <el-radio-button label="每日" value="每日" />
        </el-radio-group>
    </div>
    <el-card class="page-container">
        <template #header>
            <div class="extra">
                <!-- 每月 -->
                <span v-if="monthORday === '每月'">年份：</span>
                <el-select v-if="monthORday === '每月'" v-model="year" placeholder="请选择年份" style="width: 240px">
                    <el-option value="2022" label="2022"></el-option>
                    <el-option value="2023" label="2023"></el-option>
                    <el-option value="2024" label="2024"></el-option>
                    <el-option value="2025" label="2025"></el-option>
                    <el-option value="2026" label="2026"></el-option>
                </el-select>
                <!-- 每年 -->
                <span v-if="monthORday === '每日'">月份：</span>
                <el-select v-if="monthORday === '每日'" v-model="month" placeholder="请选择月份" style="width: 240px">
                    <el-option value="1" label="1"></el-option>
                    <el-option value="2" label="2">2</el-option>
                    <el-option value="3" label="3">3</el-option>
                    <el-option value="4" label="4">4</el-option>
                    <el-option value="5" label="5">5</el-option>
                    <el-option value="6" label="6">6</el-option>
                    <el-option value="7" label="7">7</el-option>
                    <el-option value="8" label="8">8</el-option>
                    <el-option value="9" label="9">9</el-option>
                    <el-option value="10" label="10">10</el-option>
                    <el-option value="11" label="11">11</el-option>
                    <el-option value="12" label="12">12</el-option>
                </el-select>
                <el-button type="primary" @click="changeChart" style="margin-left: 20px;">确定</el-button>
            </div>
            <div class="header">
                <!-- <span>账单报表</span> -->
                <span v-if="monthORday === '每月'">
                    您在<strong> {{ year }} </strong>年已结算收入为<strong> {{ consume_total }} </strong>元。
                </span>
                <span v-if="monthORday === '每日'">
                    您在<strong> {{ month }} </strong>月已结算收入为<strong> {{ consume_total }} </strong>元。
                </span>
            </div>
        </template>
        <div ref="chart1"></div>
    </el-card>

</template>


<style lang="scss" scoped>
.page-container {
    margin-top: 20px;
    min-height: 90%;
    max-height: 90%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

.extra {
    margin-bottom: 20px;
}
</style>