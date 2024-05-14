<!--<template>-->
<!--  <n-upload :custom-request="customRequest" >-->
<!--    <n-button v-if="!imgurl">上传文件</n-button>-->
<!--    <n-image-->
<!--        v-else-->
<!--        width="100"-->
<!--        :src="imgurl"-->
<!--        :preview-disabled="true"-->
<!--    />-->
<!--  </n-upload>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref } from "vue";-->
<!--import {uploadToken} from "../../api/base";-->
<!--import axios from "axios";-->
<!--const emit = defineEmits(["backKey"]);-->
<!--const imgurl = ref(null);-->
<!--const customRequest = ({file,action,header,onFinish,onError})=>{-->
<!--	// console.log(file,action,header,onFinish,onError)-->
<!--	uploadToken().then(res=>{-->
<!--		// 图片上传的逻辑-->
<!--		// 组装上传的参数、-->
<!--		const formData = new FormData();-->
<!--		// 随机生成图片名称 带有时间戳 根据 file.name 来获取文件后缀名-->
<!--		const fileName = `${Date.now()}${Math.floor(Math.random()*1000)}.${file.name.split(".").pop()}`;-->
<!--		formData.append("key",fileName);-->
<!--		formData.append("OSSAccessKeyId",res.accessid);-->
<!--		formData.append("policy",res.policy);-->
<!--		formData.append("Signature",res.signature);-->
<!--		formData.append("file",file.file);-->
<!--		// 发送请求-->
<!--		// console.log(formData);-->
<!--		axios.post(res.host,formData,{-->
<!--			headers:{-->
<!--				"Content-Type":"multipart/form-data"-->
<!--			}-->
<!--		}).then(()=>{-->
<!--			emit("backKey",fileName);-->
<!--			// model.value.img = fileName;-->
<!--			imgurl.value = `${res.host}/${fileName}`;-->
<!--			onFinish(fileName);-->
<!--		}).catch(err=>{-->
<!--			// onError(err)-->
<!--		});-->
<!--	});-->

<!--};-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->


<template>
  <n-upload :custom-request="customRequest">
    <n-button v-if="!imgurl">上传文件</n-button>
    <n-image
        v-else
        width="100"
        :src="imgurl"
        :preview-disabled="true"
    />
  </n-upload>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const emit = defineEmits(["backKey"]);
const imgurl = ref(null);

// 通过自定义请求发送文件
const customRequest = ({ file, onFinish, onError }) => {
  const formData = new FormData();
  formData.append("file", file.file); // 确保这里和后端期待的字段匹配

  axios.post("http://127.0.0.1:8888/api/auth/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(response => {
    // 假设后端返回的response.data包含了文件的访问URL
    const imageUrl = response.data.url;
    console.log(response.data.url)
    emit("backKey", imageUrl);
    imgurl.value = imageUrl;
    onFinish(imageUrl);
  }).catch(err => {
    onError(err);
  });
};
</script>

<style scoped>
</style>

