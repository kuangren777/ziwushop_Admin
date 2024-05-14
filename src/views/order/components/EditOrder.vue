<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="编辑发货"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <n-button type="error"  @click="$emit('checkShowModal',false)">X</n-button>
      </template>
      <n-form v-if="showForm"  ref="formRef" :model="model" >
        <n-form-item path="express_type" >
          <div class="title">快递类型：</div>
          <n-select placeholder="请选择快递类型" v-model:value="model.express_type" :options="options" />
        </n-form-item>
        <n-form-item path="express_no" >
          <div class="title">快递单号：</div>
          <n-input v-model:value="model.express_no" placeholder="请输入快递单号" />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: space-evenly">
              <n-button
                  round
                  type="primary"
                  @click="orderSubmit"
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
import { h, ref, defineProps, defineEmits, onMounted } from "vue";
import { getOrderInfo, OrderPost } from "@/api/order";

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  order_id: {
    type: Number,
    default: ""
  }
});
const model = ref({
  express_type: null,
  express_no: null,
});
const options = [
  {
    label: "顺丰",
    value: "SF",
  },
  {
    label: "圆通",
    value: "YTO"
  },
  {
    label: "韵达",
    value: "YD"
  }
];
const params = {
  include: "goods,user,orderDetails"
};
const showForm = ref(false);
const emit = defineEmits(["checkShowModal", "reloadTable"]);

onMounted(() => {
  if (props.order_id) {
    getOrderInfo(props.order_id, params).then(res => {
      model.value.express_type = res.express_type;
      model.value.express_no = res.express_no;
      showForm.value = true;
    });
  }
});

const formRef = ref();

const orderSubmit = (e) => {
  e.preventDefault();

  // Check if express_type is empty
  if (!model.value.express_type) {
    window.$message.error("请输入快递类型");
    return;
  }

  // Check if express_no is empty or contains special characters
  if (!model.value.express_no) {
    window.$message.error("请输入快递单号");
    return;
  } else if (/[^a-zA-Z0-9]/.test(model.value.express_no)) {
    window.$message.error("快递单号不能包含特殊字符");
    return;
  }

  // If validation passes, proceed with the API call
  OrderPost(props.order_id, model.value, params).then(res => {
    window.$message.success("修改成功");
    emit("checkShowModal", false);
    emit("reloadTable");
  });
};

</script>



<style>
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