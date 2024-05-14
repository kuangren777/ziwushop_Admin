<!--<template>-->
<!--  <n-modal-->
<!--      v-model:show="props.showModal"-->
<!--      @update:show="$emit('checkShowModal',false)"-->
<!--      :mask-closable="true"-->
<!--  >-->
<!--    <n-card-->
<!--        style="width: 800px;min-height: 750px"-->
<!--        title="添加商品"-->
<!--        :bordered="false"-->
<!--        size="huge"-->
<!--        role="dialog"-->
<!--        aria-modal="true"-->
<!--    >-->
<!--      <template #header-extra>-->
<!--        <n-button type="error"  @click="$emit('checkShowModal',false)">X</n-button>-->
<!--      </template>-->
<!--      <n-form style="display: flex;flex-wrap: wrap;justify-content: space-between"  ref="formRef" :model="model" :rules="rules">-->
<!--&lt;!&ndash;        <n-form-item path="category_id" label="分类id">-->
<!--          <n-input v-model:value="model.category_id" placeholder="选择分类" />-->
<!--        </n-form-item>&ndash;&gt;-->
<!--        <n-form-item style="width: 40%;" path="title"  >-->
<!--          <div class="title">商品名：</div>-->
<!--          <n-input-->
<!--              v-model:value="model.title"-->
<!--              type="text"-->
<!--              placeholder="请输入"-->
<!--          />-->
<!--        </n-form-item>-->
<!--        <n-form-item style="width: 25%"  path="price" >-->
<!--          <div class="title">价格：</div>-->
<!--          <n-input type="number" v-model:value="model.price" placeholder="请输入" />-->
<!--        </n-form-item>-->
<!--        <n-form-item style="width: 25%" path="stock" >-->
<!--          <div class="title">库存：</div>-->
<!--          <n-input v-model:value="model.stock" placeholder="请输入" />-->
<!--        </n-form-item>-->
<!--        <div-->
<!--            class="describe"-->
<!--            path="description"-->
<!--        >-->
<!--          <div class="title" style="width: 100%;margin: 0">描述：</div>-->
<!--          <br>-->
<!--          <n-input-->
<!--              v-model:value="model.description"-->
<!--              type="textarea"-->
<!--              placeholder="请输入"-->
<!--          />-->
<!--        </div>-->


<!--        <div path="cover" style="width: 100%;display: flex;margin: 20px 0 20px">-->
<!--          <div class="title" style="width: 120px">图片上传：</div>-->
<!--          <Upload v-model:value="model.cover" @backKey="backKey"></Upload>-->
<!--        </div>-->
<!--        <n-form style="height: 160px" path="details" >-->
<!--          <div class="title" style="width: 100%">商品详情：</div>-->
<!--          <Editor v-model:value="model.details" @backContent="backContent"></Editor>-->
<!--        </n-form>-->
<!--        <n-row style="width: 720px;position: absolute;bottom: 20px;" :gutter="[0, 24]">-->
<!--          <n-col :span="24">-->
<!--            <div style="display: flex; justify-content: flex-end;flex-wrap: nowrap;justify-content: space-around">-->
<!--              <n-button-->
<!--                  round-->
<!--                  type="primary"-->
<!--                  @click="userSubmit"-->
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
<!--import { h, ref,defineProps,defineEmits } from "vue";-->
<!--import {addGood} from "@/api/goods";-->
<!--import Editor from "@/components/Editor/index.vue";-->
<!--import Upload from "@/components/Upload/index.vue";-->

<!--const props =  defineProps({-->
<!--	showModal: {-->
<!--		type: Boolean,-->
<!--		default: false-->
<!--	}-->
<!--});-->
<!--const emit = defineEmits(["checkShowModal","shuaxin"]);-->

<!--const model = ref({-->
<!--	category_id: 14,-->
<!--	title: null,-->
<!--	description: null,-->
<!--	price:null,-->
<!--	stock:null,-->
<!--	cover:null,-->
<!--	details:null-->
<!--});-->

<!--const rules = {-->
<!--	category_id:[-->
<!--		{-->
<!--			required: true,-->
<!--			message: "请输入"-->
<!--		}-->
<!--	],-->
<!--	title:[-->
<!--		{-->
<!--			required: true,-->
<!--			message: "请输入"-->
<!--		}-->
<!--	],-->
<!--	description:[-->
<!--		{-->
<!--			required: true,-->
<!--			message: "请输入"-->
<!--		}-->
<!--	],-->
<!--	price:[-->
<!--		{-->
<!--			required: true,-->
<!--			message: "请输入"-->
<!--		}-->
<!--	],-->
<!--	stock:[-->
<!--		{-->
<!--			required: true,-->
<!--			message: "请输入"-->
<!--		}-->
<!--	],-->
<!--	cover:[-->
<!--		{-->
<!--			required: true,-->
<!--			message: "请输入"-->
<!--		}-->
<!--	],-->
<!--	details:[-->
<!--		{-->
<!--			required: true,-->
<!--			message: "请输入"-->
<!--		}-->
<!--	],-->
<!--};-->
<!--const formRef = ref();-->
<!--//添加商品功能实现-->
<!--const userSubmit = (e)=>{-->
<!--	e.preventDefault();-->
<!--	// console.log(model);-->
<!--	formRef.value.validate(errors=>{-->
<!--		if(errors){-->
<!--			// console.log(errors);-->
<!--		}else{-->
<!--			addGood(model.value).then(res=>{-->
<!--				emit("checkShowModal",false);-->
<!--				emit("reloadTable");-->
<!--			});-->
<!--		}-->
<!--	});-->
<!--};-->
<!--const backContent = (htmlstring) =>{-->

<!--	model.value.details = htmlstring;-->
<!--};-->
<!--const backKey = (key)=>{-->
<!--	model.value.cover = key;-->
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
<!--.describe{-->
<!--  width: 100%;-->
<!--  display: flex;-->
<!--  flex-wrap: wrap-->
<!--}-->
<!--</style>-->


<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal', false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 800px; min-height: 750px"
        title="添加商品"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <n-button type="error" @click="$emit('checkShowModal', false)">X</n-button>
      </template>
      <n-form style="display: flex; flex-wrap: wrap; justify-content: space-between" ref="formRef" :model="model" :rules="rules">
        <n-form-item style="width: 40%;" path="title">
          <div class="title">商品名：</div>
          <n-input v-model:value="model.title" type="text" placeholder="请输入" />
        </n-form-item>
        <n-form-item style="width: 25%" path="price">
          <div class="title">价格：</div>
          <n-input type="number" v-model:value="model.price" placeholder="请输入" />
        </n-form-item>
        <n-form-item style="width: 25%" path="stock">
          <div class="title">库存：</div>
          <n-input v-model:value="model.stock" placeholder="请输入" />
        </n-form-item>
        <div class="describe" path="description">
          <div class="title" style="width: 100%; margin: 0">描述：</div>
          <br>
          <n-input v-model:value="model.description" type="textarea" placeholder="请输入" />
        </div>
        <div path="cover" style="width: 100%; display: flex; margin: 20px 0 20px">
          <div class="title" style="width: 120px">图片上传：</div>
          <Upload v-model:value="model.cover" @backKey="backKey"></Upload>
        </div>
        <n-form style="height: 160px" path="details">
          <div class="title" style="width: 100%">商品详情：</div>
          <Editor v-model:value="model.details" @backContent="backContent"></Editor>
        </n-form>
        <n-row style="width: 720px; position: absolute; bottom: 20px;" :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end; flex-wrap: nowrap; justify-content: space-around">
              <n-button round type="primary" @click="userSubmit">添加</n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script setup>
import { h, ref, defineProps, defineEmits } from "vue";
import { addGood } from "@/api/goods";
import Editor from "@/components/Editor/index.vue";
import Upload from "@/components/Upload/index.vue";

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["checkShowModal", "reloadTable"]);

const model = ref({
  category_id: 14,
  title: null,
  description: null,
  price: null,
  stock: null,
  cover: null,
  details: null
});

const rules = {
  title: [{ required: true, message: "请输入商品名" }],
  description: [{ required: true, message: "请输入商品描述" }],
  price: [{ required: true, message: "请输入商品价格" }],
  stock: [{ required: true, message: "请输入商品库存" }],
  cover: [{ required: true, message: "请上传商品图片" }],
  details: [{ required: true, message: "请输入商品详情" }]
};
const formRef = ref();

// 添加商品功能实现
const userSubmit = e => {
  e.preventDefault();
  formRef.value.validate(errors => {
    if (errors) {
      // Display error messages using window.$message.error
      Object.keys(errors).forEach(field => {
        errors[field].forEach(error => {
          window.$message.error(error.message);
        });
      });

      // Focus the first field with an error
      const firstInvalidField = Object.keys(errors)[0];
      const invalidInput = formRef.value.fields[firstInvalidField].$el.querySelector('input, textarea');
      if (invalidInput) invalidInput.focus();
      return; // Exit if there are any errors
    }

    // Check if description and details are filled
    if (!model.value.description || !model.value.details) {
      if (!model.value.description) {
        window.$message.error("商品描述是必填项，请输入商品描述。");
      }
      if (!model.value.details) {
        window.$message.error("商品详情是必填项，请输入商品详情。");
      }
      return; // Prevent submission if either field is empty
    }

    // Proceed with adding the good if all checks pass
    addGood(model.value).then(res => {
      window.$message.success("商品添加成功");
      emit("checkShowModal", false);
      emit("reloadTable");
    });
  });
};

const backContent = htmlstring => {
  model.value.details = htmlstring;
};

const backKey = key => {
  model.value.cover = key;
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
.describe {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
