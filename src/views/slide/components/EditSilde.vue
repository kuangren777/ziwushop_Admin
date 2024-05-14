<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="编辑轮播图"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <n-button type="error"  @click="$emit('checkShowModal',false)">X</n-button>
      </template>
      <n-form  ref="formRef" :model="model" :rules="rules">
        <n-form-item path="title">
          <div class="title">标题：</div>
          <n-input v-model:value="model.title" placeholder="请输入标题" />
        </n-form-item>
        <n-form-item path="url" >
          <div class="title">跳转URL：</div>
          <n-input
              v-model:value="model.url"
              type="email"
              placeholder="请输入跳转URL"
          />
        </n-form-item>
        <n-form-item label="选择商品图" path="img">
          <Upload @backKey="backKey"></Upload>
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: space-evenly">
              <n-button
                  round
                  type="primary"
                  @click="slideSubmit"
              >
                提交
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script setup>
import { h, ref,defineProps,defineEmits,onMounted } from "vue";
import {addSlide,getSlidesInfo,changeSlide,delSlide} from "@/api/slide";
const props =  defineProps({
	showModal: {
		type: Boolean,
		default: false
	},
	slide_id:{
		type: Number,
		default: ""
	}
});
const model = ref({
	title: null,
	img: null,
	url: null,

});
const showForm = ref(false);
const emit = defineEmits(["checkShowModal","shuaxin"]);
onMounted(()=>{
	// console.log(123123);
	if(props.slide_id){
		getSlidesInfo(props.slide_id).then(res=>{
			model.value.title = res.title;
			model.value.url = res.url;
			model.value.img = res.img;
			showForm.value = true;
			// console.log(res);
		});
	}
});

const rules = {
	name: [
		{
			required: true,
			message: "请输入标题"
		}
	],
	img: [
		{
			required: true,
			message: "请上传图片"
		}
	],
	url: [
		{
			required: true,
			message: "输入输入跳转链接"
		}
	],
};
const formRef = ref();
const slideSubmit = (e)=>{
	e.preventDefault();
	formRef.value.validate(errors=>{
		if(errors){
			// console.log(errors);
		}else{
			changeSlide(props.slide_id,model.value).then(res=>{
				window.$message.success("修改成功");
				emit("checkShowModal",false);
				emit("reloadTable");
			});
		}
	});
};


const backKey = (key)=>{
	model.value.img = key;
};

</script>

<style scoped>

</style>