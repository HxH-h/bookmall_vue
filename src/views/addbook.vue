<template>
    <el-container style="align-items: center; justify-content: center;">
        <el-header style="height: 10vh;"></el-header>
        <el-row>
            <el-col :span="18">
                <el-form :model="form" label-width="auto" style="max-width: 600px">
                    <el-form-item label="题目">
                        <el-input v-model="form.title" />
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="form.author" />
                    </el-form-item>
                    <el-form-item label="出版时间">
                        <el-col :span="11">
                            <el-date-picker v-model="form.date" type="date" placeholder="Pick a date"
                                style="width: 100%" value-format="YYYY-MM-DD" />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="出版社">
                        <el-input v-model="form.press" />
                    </el-form-item>
                    <el-form-item label="定价">
                        <el-input v-model="form.price" />
                    </el-form-item>
                    <el-form-item label="库存">
                        <el-input v-model="form.cnt" />
                    </el-form-item>
                    <el-form-item label="详情">
                        <el-input v-model="form.detail" type="textarea" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">Create</el-button>
                        <el-button>Cancel</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="6">
                <el-upload class="avatar-uploader" action="#"
                    ref="upload"
                    :show-file-list="false" 
                    :on-success="handleAvatarSuccess" 
                    :before-upload="beforeAvatarUpload" 
                    :http-request="uploadPicture" 
                    :auto-upload="false">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-col>
        </el-row>

    </el-container>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useStore } from "vuex"
import axios from 'axios';
import type { UploadProps } from 'element-plus'
import type { UploadFile } from 'element-plus'

const upload = ref<any>([]);
const imageUrl = ref('')
const store = useStore()
const form = reactive({
    title: '',
    author: '',
    date: '',
    press: '',
    price: '',
    cnt: '',
    detail: ''
})

const onSubmit = () => {

    if (form.title == '' || form.author == '' || form.date == '' || form.press == '' || form.price == '' || form.cnt == '') {
        alert('请填写完整信息')
        return
    }

    if (!/^[0-9]+\.?[0-9]*$/.test(form.price) || !/^[0-9]+$/.test(form.cnt)) {
        alert('价格和库存必须是数字')
        return
    }

    if (form.price == 0 || form.cnt == 0) {
        alert('价格和库存不能为0')
        return
    }
    console.log(form)
    
    upload.value.submit()
    console.log('submit!')
}


function uploadPicture(options: any) {
    console.log('upload!')
    const formData = new FormData()
    formData.append('file', options.file)
    formData.append('book', JSON.stringify(form))
    axios({
        method: 'post',
        url: 'http://localhost:8080/admin/book/add',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
             Authorization: store.state.token
        }
    })



}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    

  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

</script>



<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}




</style>