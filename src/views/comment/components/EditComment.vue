<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="评论回复"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <n-button type="error"  @click="$emit('checkShowModal',false)">X</n-button>
      </template>
      <n-form v-if="showForm"  ref="formRef" :model="model" >
        <n-form-item label="回复内容">
          <n-input
              v-model:value="model.reply"
              type="textarea"
              placeholder="请输入"
          />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: space-evenly">
              <n-button
                  round
                  type="primary"
                  @click="commentSubmit"
              >
                提交
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
      <n-skeleton v-else text :repeat="2" />
    </n-card>
  </n-modal>
</template>

<script setup>
import { h, ref,defineProps,defineEmits,onMounted } from "vue";
import {getCommentInfo, getCommentReply} from "@/api/comment";
const props =  defineProps({
	showModal: {
		type: Boolean,
		default: false
	},
	comment_id:{
		type: Number,
		default: ""
	}
});
const model = ref({
	reply: "",
});

const params={
	include:"goods,user" // 订单详情里包含商品信息
};
const showForm = ref(false);
const emit = defineEmits(["checkShowModal","shuaxin"]);
onMounted(()=>{
	// console.log(123123);
	if(props.comment_id){
		getCommentInfo(props.comment_id,params).then(res=>{
			model.value.reply = res.reply;
			showForm.value = true;
		});
	}
});

const formRef = ref();
const commentSubmit = (e)=>{
	e.preventDefault();
	formRef.value.validate(errors=>{
		if(errors){
			// console.log(errors);
		}else{
			getCommentReply(props.comment_id,model.value,params).then(res=>{
				window.$message.success("修改成功");
				emit("checkShowModal",false);
				emit("reloadTable");
			});
		}
	});
};

</script>

<style scoped>

</style>