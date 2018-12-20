<template>
    <div class="main">
        <Row>
            <Col span="12">
                <h3 style="text-align: center">用户来源</h3>
                <ve-pie :data="chartData2" :settings="chartSettings"></ve-pie>
            </Col>
            <Col span="12">
                <h3 style="text-align: center">每周用户活跃量</h3>
                <ve-histogram :data="chartData3" :settings="chartSettings"></ve-histogram>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <ve-line :data="chartData1"></ve-line>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "Main",
        data() {
            this.chartSettings = {
                roseType: 'radius'
            }
            return {
                chartData1: {
                    columns: ['日期', '访问用户', '预约用户', '预约率'],
                    rows: [
                        {'日期': '12月5号', '访问用户': 1393, '预约用户': 1093, '预约率': 0.32},
                        {'日期': '12月9号', '访问用户': 3530, '预约用户': 3230, '预约率': 0.26},
                        {'日期': '12月12号', '访问用户': 2923, '预约用户': 2623, '预约率': 0.76},
                        {'日期': '12月13号', '访问用户': 1723, '预约用户': 1423, '预约率': 0.49},
                        {'日期': '12月15号', '访问用户': 3792, '预约用户': 3492, '预约率': 0.323},
                        {'日期': '12月19号', '访问用户': 4593, '预约用户': 4293, '预约率': 0.78},
                    ]
                },
                chartData2: {
                    columns: ['访问来源', '访问量'],
                    rows: [
                        {'访问来源': '西北师范大学', '访问量': 1393},
                        {'访问来源': '兰州理工大学', '访问量': 3530},
                        {'访问来源': '兰州交通大学', '访问量': 2923},
                        {'访问来源': '兰州大学', '访问量': 1723},
                        {'访问来源': '西北政法大学', '访问量': 3792},
                        {'访问来源': '其他', '访问量': 4593}
                    ]
                },
                chartData3: {
                    columns: ['星期', '活跃量',],
                    rows: [
                        {'星期': '星期一', '活跃量': 1393,},
                        {'星期': '星期二', '活跃量': 3530,},
                        {'星期': '星期三', '活跃量': 2923,},
                        {'星期': '星期四', '活跃量': 1723,},
                        {'星期': '星期五', '活跃量': 3792,},
                        {'星期': '星期六', '活跃量': 4593,},
                        {'星期': '星期日', '活跃量': 5593,}
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>