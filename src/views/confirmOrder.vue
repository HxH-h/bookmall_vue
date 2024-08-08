<template>
    <el-row >
        <el-col :span="1">
            <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="11">
            <h4 style="text-align: center;">待送出订单</h4>
            <el-table :data="deliver" :border="true" style="width: 100%">

                <el-table-column label="订单号" prop="id" />
                <el-table-column label="地址" prop="address" />
                <el-table-column label="收货人" prop="consignee" />
                <el-table-column label="电话" prop="phone" />
                <el-table-column label="Operations" min-width="120" v-slot="scope">
                    <el-button link type="primary" size="small" @click="updateStatus(scope.row.id,1)">
                        发出
                    </el-button>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="11">
            <h4 style="text-align: center;" >待完成订单</h4>
            <el-table :data="complete" :border="true" style="width: 100%">
                <el-table-column label="订单号" prop="id" />
                <el-table-column label="地址" prop="address" />
                <el-table-column label="收货人" prop="consignee" />
                <el-table-column label="电话" prop="phone" />
                <el-table-column label="Operations" min-width="120" v-slot="scope">
                    <el-button link type="primary" size="small" @click="updateStatus(scope.row.id,2)">
                        完成
                    </el-button>
                </el-table-column>
            </el-table>

        </el-col>
        <el-col :span="1">
            <div class="grid-content ep-bg-purple" />
        </el-col>
    </el-row>


</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { useStore } from "vuex";
import { ElMessage } from 'element-plus'


const store = useStore();
const deliver = ref([])
const complete = ref([])

function getDeliveryOrder(){
    return axios({
        method: 'GET',
        url: 'http://localhost:8080/admin/order/needdeliver',
        headers: {
            Authorization: store.state.token
        }
    })
}

function getCompleteOrder(){
    return axios({
        method: 'GET',
        url: 'http://localhost:8080/admin/order/needcomplete',
        headers: {
            Authorization: store.state.token
        }
    })
}

onMounted(() => {
    axios.all([getDeliveryOrder(), getCompleteOrder()]).then(axios.spread((deliverRes, completeRes) => {
        deliver.value = deliverRes.data.data
        complete.value = completeRes.data.data
    }))
})



function updateStatus(id, status){
    axios({
        method: 'POST',
        url: 'http://localhost:8080/admin/order/updateStatus',
        headers: {
            Authorization: store.state.token
        },
        data: {
            id: id,
            status: status
        }
    }).then(res => {
        ElMessage({
        message: '订单状态更改成功',
        type: 'success',
    })
        console.log(res.data)
    })
}







</script>


<style scoped></style>