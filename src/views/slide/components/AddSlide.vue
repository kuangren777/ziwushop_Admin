<!--<template>-->
<!--  <n-modal-->
<!--      v-model:show="props.showModal"-->
<!--      @update:show="$emit('checkShowModal',false)"-->
<!--      :mask-closable="true"-->
<!--  >-->
<!--    <n-card-->
<!--        style="width: 600px"-->
<!--        title="添加轮播图"-->
<!--        :bordered="false"-->
<!--        size="huge"-->
<!--        role="dialog"-->
<!--        aria-modal="true"-->
<!--    >-->
<!--      <template #header-extra>-->
<!--        <n-button type="error"  @click="$emit('checkShowModal',false)">X</n-button>-->
<!--      </template>-->
<!--      <n-form  ref="formRef" :model="model" :rules="rules">-->
<!--        <n-form-item path="title">-->
<!--          <div class="title">标题：</div>-->
<!--          <n-input v-model:value="model.title" placeholder="请输入标题" />-->
<!--        </n-form-item>-->
<!--        <n-form-item path="url" >-->
<!--          <div class="title">跳转URL：</div>-->
<!--          <n-input-->
<!--              v-model:value="model.url"-->
<!--              type="email"-->
<!--              placeholder="请输入跳转URL"-->
<!--          />-->
<!--        </n-form-item>-->
<!--        <n-form-item  path="status">-->
<!--          <div class="title" style="width: 28%">是否启用：</div>-->
<!--          <n-radio-group v-model:value="model.status" name="status">-->
<!--            <n-space>-->
<!--              <n-radio :value="0">-->
<!--                否-->
<!--              </n-radio>-->
<!--              <n-radio :value="1">-->
<!--                是-->
<!--              </n-radio>-->
<!--            </n-space>-->
<!--          </n-radio-group>-->
<!--        </n-form-item>-->
<!--        <n-form-item label="选择商品图" path="img">-->
<!--          <Upload @backKey="backKey"></Upload>-->
<!--        </n-form-item>-->
<!--        <n-row :gutter="[0, 24]">-->
<!--          <n-col :span="24">-->
<!--            <div style="display: flex; justify-content: space-evenly">-->
<!--              <n-button-->
<!--                  round-->
<!--                  type="primary"-->
<!--                  @click="slideSubmit"-->
<!--              >-->
<!--                添加-->
<!--              </n-button>-->
<!--            </div>-->
<!--          </n-col>-->
<!--        </n-row>-->
<!--      </n-form>-->
<!--    </n-card>-->
<!--  </n-modal>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref } from "vue";-->
<!--import { addSlide } from "@/api/slide";-->
<!--import Upload from "@/components/Upload/index.vue";-->

<!--const props =  defineProps({-->
<!--	showModal: {-->
<!--		type: Boolean,-->
<!--		default: false-->
<!--	}-->
<!--});-->
<!--const emit = defineEmits(["checkShowModal","shuaxin"]);-->

<!--const model = ref({-->
<!--	title: null,-->
<!--	img: null,-->
<!--	url: null,-->
<!--	status: null-->
<!--});-->
<!--const rules = {-->
<!--	title: [-->
<!--		{-->
<!--			required: true,-->
<!--			message: "请输入标题"-->
<!--		}-->
<!--	],-->

<!--	url: [-->
<!--		{-->
<!--			required: true,-->
<!--			message: "输入输入跳转链接"-->
<!--		}-->
<!--	],-->
<!--	status: [-->
<!--		{-->
<!--			required: true,-->
<!--			message: "请选择状态"-->
<!--		}-->
<!--	],-->
<!--};-->
<!--const formRef = ref();-->
<!--const slideSubmit = (e)=>{-->
<!--	e.preventDefault();-->
<!--	formRef.value.validate(errors=>{-->
<!--		if(errors){-->
<!--			// console.log(errors);-->
<!--		}else{-->
<!--			// 请求API 添加数据-->
<!--			addSlide(model.value).then(res=>{-->
<!--				// console.log(res);-->
<!--				window.$message.success("添加成功");-->
<!--				emit("checkShowModal",false);-->
<!--				emit("reloadTable");-->
<!--			});-->
<!--			// console.log(model.value);-->
<!--		}-->
<!--	});-->
<!--};-->
<!--const backKey = (key)=>{-->
<!--	model.value.img = key;-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--.title{-->
<!--  font-size: 16px;-->
<!--  height: 32px;-->
<!--  line-height: 30px;-->
<!--  text-align: center;-->
<!--  width: 40%;-->
<!--  margin-right: 5px;-->
<!--  border: 1px solid #ccc;-->
<!--  /*font-weight: bold;*/-->
<!--  background-color: #DEECF4;-->
<!--}-->
<!--</style>-->

<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal', false)"
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
        <n-button type="error" @click="$emit('checkShowModal', false)">X</n-button>
      </template>
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="title">
          <div class="title">标题：</div>
          <n-input v-model:value="model.title" placeholder="请输入标题" />
        </n-form-item>
        <n-form-item path="url">
          <div class="title">跳转URL：</div>
          <n-input
              v-model:value="model.url"
              placeholder="请输入跳转URL"
          />
        </n-form-item>
        <n-form-item path="status">
          <div class="title" style="width: 28%">是否启用：</div>
          <n-radio-group v-model:value="model.status" name="status">
            <n-space>
              <n-radio :value="0">否</n-radio>
              <n-radio :value="1">是</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="选择商品图" path="img">
          <Upload @backKey="backKey" />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: space-evenly">
              <n-button
                  round
                  type="primary"
                  @click="slideSubmit"
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
import { addSlide } from "@/api/slide";
import Upload from "@/components/Upload/index.vue";

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["checkShowModal", "reloadTable"]);

const model = ref({
  title: null,
  img: null,
  url: null,
  status: 1  // 默认启用
});
const rules = {
  title: [{ required: true, message: "请输入标题" }],
  img: [{ required: true, message: "请上传图片" }],
  // 如果url不是必填项，可以将此规则移除
  url: [{ required: false, message: "请输入跳转链接" }],
  status: [{ required: true, message: "请选择状态" }],
};
const formRef = ref();

const slideSubmit = (e) => {
  e.preventDefault();
  formRef.value.validate(errors => {
    if (errors) {
      // Display error messages
      Object.keys(errors).forEach(field => {
        errors[field].forEach(error => {
          window.$message.error(error.message);
        });
      });
      return;
    }

    // Call the API to add a new slide
    addSlide(model.value).then(res => {
      window.$message.success("添加成功");
      emit("checkShowModal", false);
      emit("reloadTable");
    }).catch(error => {
      window.$message.error("添加失败: " + error.message);
    });
  });
};

const backKey = (key) => {
  model.value.img = key;
};
</script>

<style>
.title {
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
