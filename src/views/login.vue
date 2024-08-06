<template>
  <el-container style="align-items: center;
                      justify-content: center;
                      ">
                      <el-header style="height: 20vh;"></el-header>
    <el-card style="max-width: 360px; text-align: center;">
      <template #header>
      <div class="card-header">
        <span>图书商城管理端</span>
      </div>
    </template>
      <el-form ref="ruleFormRef" style="max-width: 300px" :model="ruleForm" status-icon :rules="rules"
        label-width="auto" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model.number="ruleForm.name" />
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)" style="position: relative; left: 100px;">
            Submit
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex';
import type { FormInstance, FormRules } from 'element-plus'
import route from '@/router/index';
import axios from 'axios'
const ruleFormRef = ref<FormInstance>()
const store = useStore();

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {

    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  name: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    axios.post('http://localhost:8080/admin/login', {
      username: ruleForm.name,
      password: ruleForm.pass,
    }).then(res => {
      
      if (res.data.code == 1003) {
        store.commit('setToken', {
          name: ruleForm.name,
          token: res.data.data.token
        })
        route.push({ name: 'test' })
      }
    })

    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}

</script>


<style>

</style>