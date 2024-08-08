<template>

    <el-row :gutter="20">
        <el-col :span="1">
            <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="22">
            <el-table :data="tableData" style="width: 100%" :header-cell-style="{ 'text-align': 'center' }"
                :cell-style="{ 'text-align': 'center' }">
                <el-table-column prop="id" label="订单号" width="150" />
                <el-table-column prop="order_time" label="下单时间" width="120" />
                <el-table-column prop="amount" label="支付金额" width="120" />
                <el-table-column prop="phone" label="手机号" width="120" />
                <el-table-column prop="address" label="地址" width="300" />
                <el-table-column prop="consignee" label="收件人" width="120" />
                <el-table-column fixed="right" label="Operations" min-width="120">
                    <template #default>
                        <el-button link type="primary" size="small">
                            Detail
                        </el-button>
                        <el-button link type="primary" size="small">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="1">
            <div class="grid-content ep-bg-purple" />
        </el-col>
    </el-row>



</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useStore } from "vuex";
const store = useStore();
const tableData = ref([])

// onMounted(() => {
//     axios({
//         method: 'POST',
//         url: 'http://localhost:8080/admin/order/getOrder',
//         headers: {
//             Authorization: store.state.token
//         }
//     }).then(res => {
//         console.log(res.data.data)
//         tableData.value = res.data.data
//     })
//})

</script>

<style></style>