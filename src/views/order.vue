<template>

    <el-row>
        <el-col :span="1">
            <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="22">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                    <template #default="props">
                        <div m="4">
                            <p m="t-0 b-2">总价: {{ props.row.amount }}</p>
                            <p m="t-0 b-2">下单时间: {{ props.row.order_time }}</p>

                            <el-table :data="props.row.books">
                                <el-table-column label="图书名" prop="title" />
                                <el-table-column label="作者" prop="author" />
                                <el-table-column label="数量" prop="cnt" />
                            </el-table>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="订单号" prop="id" />
                <el-table-column label="地址" prop="address" />
                <el-table-column label="收货人" prop="consignee" />
                <el-table-column label="电话" prop="phone" />
                <el-table-column label="Operations" min-width="120" v-slot="scope">

                    <el-button link type="primary" size="small" @click="confirm(scope.row.id)">
                        确认
                    </el-button>
                    <el-button link type="primary" size="small" @click="cancel(scope.row.id)">取消</el-button>

                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="1">
            <div class="grid-content ep-bg-purple" />
        </el-col>
    </el-row>

    <el-dialog v-model="dialogVisible" title="请输入取消原因" width="400" :before-close="handleClose">
        <span></span>
        <el-input v-model="currentOrder" disabled autocomplete="off" label="订单号" style="padding: 10px;" />

        <el-input v-model="reason" autocomplete="off" label="取消原因" style="padding: 10px;" />
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submit">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>


</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useStore } from "vuex";
const store = useStore();
const tableData = ref([])
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)
const reason = ref("")
const currentOrder = ref("")

onMounted(() => {
    axios({
        method: 'GET',
        url: 'http://localhost:8080/admin/order/needconfirm',
        headers: {
            Authorization: store.state.token
        }
    }).then(res => {
        console.log(res.data.data)
        tableData.value = res.data.data
    })
})
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            reason.value = ''
            done()
        })
        .catch(() => {
            // catch error
        })
}

function submit() {
    if (reason.value == '') {
        ElMessageBox.alert('请填写取消原因', 'Tips', {
            confirmButtonText: 'OK',
        })
        return
    }
    axios({
        method: 'POST',
        url: 'http://localhost:8080/admin/order/cancel',
        headers: {
            Authorization: store.state.token
        },
        data: {
            id: currentOrder.value,
            reason: reason.value
        }
    }).then(res => {
        console.log(res.data)
        if (res.data.code == 200) { }
    })
    ElMessage({
        message: '订单取消成功',
        type: 'success',
    })
    dialogVisible.value = false
}

function confirm(orderid) {
    currentOrder.value = orderid
    axios({
        method: 'POST',
        url: 'http://localhost:8080/admin/order/confirm',
        headers: {
            Authorization: store.state.token
        },
        data: {
            id: orderid,
        }
    }).then(res => {
        ElMessage({
        message: '订单确认成功',
        type: 'success',
    })
        console.log(res.data)
    })
}

function cancel(orderid) {
    currentOrder.value = orderid
    dialogVisible.value = true
}

</script>

<style></style>