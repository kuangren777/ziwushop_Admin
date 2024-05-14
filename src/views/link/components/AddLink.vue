<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="添加轮播图"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <n-button type="error"  @click="$emit('checkShowModal',false)">X</n-button>
      </template>
      <n-form  ref="formRef" :model="model" :rules="rules">
        <n-form-item path="name" >
          <div class="title">名称：</div>
          <n-input v-model:value="model.name" placeholder="请输入" />
        </n-form-item>
        <n-form-item path="url">
          <div class="title">跳转链接URL：</div>
          <n-input
              v-model:value="model.url"
              type="email"
              placeholder="跳转链接URL"
          />
        </n-form-item>
        <n-form-item path="status">
          <div class="title" style="width: 28%">是否启用：</div>
          <n-radio-group v-model:value="model.status" name="status">
            <n-space>
              <n-radio :value="0">
                否
              </n-radio>
              <n-radio :value="1">
                是
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item path="img">
          <div class="title">选择商品图：</div>
          <Upload @backKey="backKey"></Upload>
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button
                  round
                  type="primary"
                  @click="linkSubmit"
              >
                添加
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref } from "vue";
import { addLink } from "@/api/link";
import Upload from "@/components/Upload/index.vue";

const props =  defineProps({
	showModal: {
		type: Boolean,
		default: false
	}
});
const emit = defineEmits(["checkShowModal","shuaxin"]);

const model = ref({
	name: null,
	img: null,
	url: null,
	status: null
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
	status: [
		{
			required: true,
			message: "请选择状态"
		}
	],
};
const formRef = ref();
const linkSubmit = (e)=>{
	e.preventDefault();
	formRef.value.validate(errors=>{
		if(errors){
			// console.log(errors);
		}else{
			// 请求API 添加数据
			addLink(model.value).then(res=>{
				// console.log(res);
				window.$message.success("添加成功");
				emit("checkShowModal",false);
				emit("reloadTable");
			});
			// console.log(model.value);
		}
	});
};
const backKey = (key)=>{
	model.value.img = key;
};
</script>

<style scoped>

</style>

