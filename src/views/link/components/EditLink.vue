<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="编辑友情链接"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <n-button type="error"  @click="$emit('checkShowModal',false)">X</n-button>
      </template>
      <n-form  ref="formRef" :model="model" :rules="rules">
        <n-form-item path="name">
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
        <n-form-item path="img">
          <div class="title">选择商品图：</div>
          <Upload @backKey="backKey"></Upload>
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: space-evenly">
              <n-button
                  round
                  type="primary"
                  @click="linkSubmit"
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
import {addLink,getLinksInfo,changeLink,delLink} from "@/api/link";
const props =  defineProps({
	showModal: {
		type: Boolean,
		default: false
	},
	link_id:{
		type: Number,
		default: ""
	}
});
const model = ref({
	name: null,
	img: null,
	url: null,
	status: null
});
const showForm = ref(false);
const emit = defineEmits(["checkShowModal","shuaxin"]);
onMounted(()=>{
	// Comment(123123);
	if(props.link_id){
		getLinksInfo(props.link_id).then(res=>{
			model.value.name = res.name;
			model.value.url = res.url;
			model.value.img = res.img;
			model.value.status = res.status;
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
			changeLink(props.link_id,model.value).then(res=>{
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

<style>
.title{
  font-size: 16px;
  height: 32px;
  line-height: 30px;
  text-align: center;
  width: 40%;
  margin-right: 5px;
  border: 1px solid #ccc;
  background-color: #DEECF4;
}
</style>