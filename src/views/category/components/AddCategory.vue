<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="添加分类"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template  #header-extra>
        <n-button type="error"  @click="$emit('checkShowModal',false)">X</n-button>
      </template>
      <n-form  ref="formRef"  :model="model" :rules="rules" >
        <n-form-item style="width: 80%;" path="title"  >
          <div class="title">分类名称：</div>
          <n-input
              v-model:value="model.name"
              type="text"
              placeholder="请输入"
          />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button
                  round
                  type="primary"
                  @click="CategorySubmit"
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
import { ref, defineProps, defineEmits} from "vue";
import {addCategory} from "@/api/category";

const props =  defineProps({
	showModal: {
		type: Boolean,
		default: false
	}
});

/**
* 组件用的naive
* 这个是里面的级联选择组件
* */

const emit = defineEmits(["checkShowModal"]);
const model = ref({
	name: null,
});
const rules = {
	name: [
		{
			required: true,
			message: "请输入名称"
		}
	],
};

const formRef = ref();
const CategorySubmit = (e)=>{
	// e.preventDefault()
	formRef.value.validate(errors=>{
		// console.log(model.value);
		if(errors){
			// console.log(errors);
		}else{
			// console.log(model.value);
			addCategory(model.value).then(res=>{
				// console.log(res);
				emit("checkShowModal",false);
				emit("reloadTable");
			});
		}
	});
};


</script>

<style >
.title{
  font-size: 16px;
  height: 32px;
  line-height: 30px;
  text-align: center;
  width: 30%;
  margin-right: 5px;
  border: 1px solid #ccc;

  background-color: #DEECF4;
}
</style>