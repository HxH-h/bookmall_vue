<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :header-cell-style="{ 'text-align': 'center' }"
    :cell-style="{ 'text-align': 'center' }"
  >
    <el-table-column prop="title" label="title" width="200" />
    <el-table-column prop="author" label="author" width="120" />
    <el-table-column prop="time" label="time" width="120" />
    <el-table-column prop="press" label="press" width="150" />
    <el-table-column prop="price" label="price" width="80" />
    <el-table-column prop="cnt" label="cnt" width="60" />
    <el-table-column prop="addtime" label="addtime" width="180" />
    <el-table-column prop="updatetime" label="updatetime" width="180" />
    <el-table-column label="Operations" min-width="120" v-slot="scope">
      <el-popover placement="left" :width="200" trigger="hover">
        <span slot="reference">{{ scope.row.detail }}</span>
        <template #reference>
          <el-button link type="primary" size="small"> Detail </el-button>
        </template>
      </el-popover>

      <el-button link type="primary" size="small" @click="Edit(scope.row.uuid)"
        >Edit</el-button
      >
      <el-button link type="primary" size="small" @click="Delete(scope.row.uuid)"
        >delete</el-button
      >
    </el-table-column>
  </el-table>
  <div class="example-pagination-block">
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      v-model:current-page="currentPage"
      @current-change="handelCurrentChange"
    />
  </div>

  <el-dialog v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
    <el-form :model="form">
      <el-form-item label="图书编号" :label-width="formLabelWidth">
        <el-input v-model="currentBook" :readonly="true" autocomplete="off" />
      </el-form-item>
      <el-form-item label="金额" :label-width="formLabelWidth">
        <el-input v-model="form.price" autocomplete="off" />
      </el-form-item>
      <el-form-item label="库存" :label-width="formLabelWidth">
        <el-input v-model="form.cnt" autocomplete="off" />
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input v-model="form.detail" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirm"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { ElMessageBox } from "element-plus";

const dialogVisible = ref(false);
const tableData = ref([]);
const currentPage = ref(1);
const store = useStore();
const total = ref(0);
const currentBook = ref("");
const handelCurrentChange = (page) => {
  currentPage.value = page;
  changeData();
};

const form = reactive({
  price: undefined,
  cnt: undefined,
  detail: null,
});

onMounted(() => {
  axios
    .get("http://localhost:8080/admin/book/sum", {
      headers: {
        Authorization: store.state.token,
      },
    })
    .then((res) => {
      total.value = res.data.data;
    });
  changeData();
});

function changeData() {
  var url = "http://localhost:8080/admin/book/search/" + currentPage.value + "/10";
  axios
    .get(url, {
      headers: {
        Authorization: store.state.token,
      },
    })
    .then((res) => {
      tableData.value = res.data.data;
    });
}
function getDetail(row) {
  console.log(row.detail);
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

function confirm() {
  dialogVisible.value = false;

  axios({
    method: "post",
    url: "http://localhost:8080/admin/book/update",
    data: JSON.stringify({
      uuid: currentBook.value,
      cnt: form.cnt,
      price: form.price,
      detail: form.detail,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: store.state.token,
    },
  }).then((res) => {});
  form.detail = null;
  form.price = null;
  form.cnt = null;
}
function Edit(uuid) {
  currentBook.value = uuid;
  dialogVisible.value = true;
}
function Delete(uuid) {
  axios
    .delete("http://localhost:8080/admin/book/" + uuid, {
      headers: {
        "Content-Type": "application/json",
        Authorization: store.state.token,
      },
    })
    .then((res) => {});
}
</script>

<style>
.example-pagination-block {
  margin-bottom: 16px;
  float: right;
}
</style>
