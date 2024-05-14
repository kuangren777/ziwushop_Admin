<template>
  <div>
    <div class="h-24 w-full bg-white p-3 mb-6">
      <div>
        <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1 font-bold">评论管理</span>
        <div class="pt-3 text-xl text-black font-bold">
          评论管理
        </div>
      </div>
    </div>
    <div class="content px-4">
      <div class="bg-white pt-4 pr-6">
        <n-form
            ref="formRef"
            inline
            :label-width="80"
            :model="formSearch"
            label-placement="left"
        >
          <n-form-item label="商品名" path="goods_title">
            <n-input v-model:value="formSearch.title" placeholder="请输入内容" />
          </n-form-item>
          <n-form-item label="评论级别">
            <n-button type="info" size="small" class="mr-4" @click="goodSubmit(3)">
              好 评
            </n-button>
            <n-button type="info" size="small" class="mr-4" @click="goodSubmit(2)">
              中 评
            </n-button>
            <n-button type="info" size="small" class="mr-4" @click="goodSubmit(1)">
              差 评
            </n-button>
          </n-form-item>
          <n-form-item class="ml-auto">
            <n-button class="mr-4" attr-type="button" @click="searchReload">
              重置
            </n-button>
            <n-button type="info" attr-type="button" @click="searchSubmit">
              搜索
            </n-button>
          </n-form-item>
        </n-form>
      </div>
      <div class="mt-4 bg-white">
        <div class="text-xl px-6 py-4 flex ">
          <span>评论列表</span>
        </div>
        <div>

          <n-data-table
              :columns="columns"
              :data="data"
              :pagination="pagination"
              :bordered="false"
              :loading="loading"
          />
          <div class="p-4 flex justify-end pr-10">
            <!--            分页组件  绑定数据                 	当前页发生改变时的回调函数-->
            <n-pagination v-model:page="page" @update:page="updatePage" :page-count="totalPages" />
          </div>
        </div>
      </div>
      <EditComment v-if="showEditModal"  :comment_id="comment_id" :showModal="showEditModal" @checkShowModal="checkEditModal" @reloadTable="reload"></EditComment>
      <DeleteComment v-if="showDelModal" :comment_id="comment_id" :showModal="showDelModal" @checkShowModal="checkDelModal" @reloadTable="reload"></DeleteComment>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h,ref,onMounted} from "vue";
import { NButton,useLoadingBar } from "naive-ui";
import EditComment from "./components/EditComment.vue";
import { comments } from "@/api/comment";
import DeleteComment from "./components/DeleteComment.vue";

const loading = ref(true);
const page = ref(1);
// const message = useMessage();
const data = ref([]);
const totalPages = ref(0);
const columns:any = [
	{
		title: "商品",
		key: "goods.title",
		align:"center"
	},
	{
		title: "内容",
		key: "content",
		align:"center"

	},
	{
		title: "评级",
		key: "rate",
		align:"center",
		render(row){
			switch (row.rate) {
			case 3:
				return h(NButton, {size: "small", dashed:true, type:"error", strong:true,},"好评");
			case 2:
				return h(NButton, {size: "small", dashed:true, type:"primary", strong:true,},"中评");
			case 1:
				return h(NButton, {size: "small", dashed:true,type:"info", strong:true,},"差评");
			}

		}
	},
	{
		title: "星级",
		key: "star",
		align:"center"
	},
	{
		title: "回复",
		key: "reply",
		align:"center"
	},
	{
		title: "评价时间",
		key: "created_at",
		align:"center"
	},
	{
		title: "操作",
		key: "created_at",
		align:"center",
		render(row){
			return [h(NButton,{
				size:"small",
				bordered:false,
				ghost:true,
				color:"#1890ff",
				right:"10px",
				strong:true,
				onClick:()=>{
					comment_id.value = row.id;
					showEditModal.value = true;
				}
			},"回复"),
			h(NButton,{
				type:"error",
				bordered:false,
				ghost:true,
				size:"small",
				strong:true,
				onClick:()=>{
					comment_id.value = row.id;
					showDelModal.value = true;
				}
			},"删除")

			];
		}}
];
const pagination = ref(false as const);
const formSearch = ref({
	title:"",
	reply:"",
	rate: 3 | 2 | 1
});
// 添加模态框显示状态
// const showModal = ref(false);
// 编辑模态框
const showEditModal = ref(false);
// 删除模态框
const showDelModal = ref(false);

const comment_id = ref(0);

const checkEditModal = (show:boolean) => {
	showEditModal.value = show;
};
const checkDelModal = (show:boolean) => {
	showDelModal.value = show;
};

const loadingBar = useLoadingBar();

onMounted(()=>{
	getCommentList(params);
});
const updatePage = (pageNum) => {
	getCommentList({
		current:pageNum,
		goods_title:formSearch.value.title,
		include:params.include
		// rate:formSearch.value.rate,
	});
};
const searchSubmit = (e) =>{
	e.preventDefault();
	// console.log(formSearch.value.title);
	getCommentList({
		current:1,
		goods_title:formSearch.value.title,
		include:params.include
	});
	// console.log();
	// repetition ()
};
const searchReload = ()=>{
	getCommentList(params);
	formSearch.value = {
		// 重置后，进行搜索框清空
		title:"",
		reply:"",
		rate: 3 | 2 | 1
	};
};
const params={
	include:"goods,user" // 订单详情里包含商品信息
};
const repetition = ()=> {
	getCommentList({
		goods_title :formSearch.value.title,
		rate: formSearch.value.rate,
		reply:formSearch.value.reply,
		current: 1,
		include: params.include
	});
};

// 筛选已下单商品
const goodSubmit = (rates) =>{
	formSearch.value.rate = rates;
	repetition();
};

const getCommentList = (params) =>{
	loadingBar.start();
	comments(params).then((res:any) =>{
		data.value = res.data;
		// console.log(data.value,"1q1111111111111111111");
		// console.log(res,"33333333333333333333333");
		totalPages.value = res.meta.pagination.total_pages;
		page.value = res.meta.pagination.current_page;
		loadingBar.finish();
		loading.value = false;
	}).catch(()=>{
		loadingBar.error();
	});
};
const reload = ()=>{
	getCommentList({
		current:page.value,
		goods_title:formSearch.value.title,
		include:params.include,
	});
};
</script>

<style scoped>
.n-data-table .n-data-table-tr > td:last-child{
  display: flex;
  justify-content: space-between;
}
</style>