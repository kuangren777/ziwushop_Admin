<template>
  <div>
    <div class="h-24 w-full bg-white p-3 mb-6">
      <div>
        <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1 font-bold">商品管理</span>
        <div class="pt-3 text-xl text-black font-bold">
          商品管理
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
          <n-form-item label="商品名：" path="name">
            <n-input v-model:value="formSearch.title" placeholder="请输入" />
          </n-form-item>
          <n-form-item label="是否上架">
            <n-button type="info" v-model:value="data.in_on" size="small" class="mr-4" @click="sellSubmit(1)">
              出售中商品
            </n-button>
            <n-button type="info" size="small" @click="sellSubmit(0)">
              下架的商品
            </n-button>
          </n-form-item>

          <n-form-item label="是否推荐">
            <n-button type="info" size="small" class="mr-4" @click="recommendSubmit(1)">
              已推荐
            </n-button>
            <n-button type="info" size="small" @click="recommendSubmit(0)">
              未推荐
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
          <span>商品列表</span>
          <span class="ml-auto"><NButton type="info" @click="showModal = true" >+ 新建</NButton></span>
        </div>
        <div>

          <n-data-table
              :columns="columns"
              :data="data"
              :pagination="pagination"
              :bordered="false"
              :loading = "loading"
          />
          <div class="p-4 flex justify-end pr-10">
            <n-pagination v-model:page="page" @update:page="updatePage" :page-count="totalPages" />
          </div>
        </div>
      </div>
      <AddGood :showModal="showModal" @checkShowModal="checkShowModal" @reloadTable="reload"></AddGood>
      <EditGood v-if="showEditModal"  :good_id="good_id" :showModal="showEditModal" @checkShowModal="checkEditModal" @reloadTable="reload"></EditGood>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h,ref,onMounted } from "vue";
import { NButton, useMessage,NImage,NSwitch,useLoadingBar } from "naive-ui";
import AddGood from "./components/AddGood.vue";
import EditGood from "./components/EditGood.vue";
import { goods,getGoodLock,recommendGood } from "@/api/goods";
const page = ref(1);
const message = useMessage();
const loading = ref(true);
const data:any = ref([]);
const totalPages = ref(0);
const columns:any = [
	{
		title: "图片",
		key: "cover",
		align:"center",
		render (row) {
			return h(NImage,{round:true,src:row.cover_url,width:"60"});
		}
	},
	{
		title: "商品名",
		key: "title",
		align:"center",
	},
	{
		title: "价格",
		key: "price",
		align:"center",
    render(row) {
      return '￥'+ row.price + '.00'; // This formats the price as a string with two decimal places preceded by the currency symbol
    }
	},
	{
		title: "库存",
		key: "stock",
		align:"center",
	},
	{
		title: "销量",
		key: "sales",
		align:"center",
	},
	{
		title: "是否上架",
		key: "is_on",
		align:"center",
		render(row){
			return h(NSwitch,{
				size:"medium",
				color:"#1890ff",
				activeColor:"#52c41a",
				inactiveColor:"#d9d9d9",
				activeValue:1,
				inactiveValue:0,
				value:row.is_on == 0 ? false : true,
				onClick:()=>{
					// console.log(row.is_locked,'row.isload')
					row.is_on==0 ? row.is_on=1 : row.is_on=0;
					// console.log(row.is_locked,'row.isload')
					handleChangeOn(row);
				}
			});
		}
	},
	{
		title: "是否推荐",
		key: "is_recommend",
		align:"center",
		render(row){
			return h(NSwitch,{
				size:"medium",
				color:"#1890ff",
				activeColor:"#52c41a",
				inactiveColor:"#d9d9d9",
				activeValue:1,
				inactiveValue:0,
				value:row.is_recommend == 0 ? false : true,
				onClick:()=>{
					// console.log(row.is_locked,'row.isload')
					row.is_recommend==0?row.is_recommend=1:row.is_recommend=0;
					// console.log(row.is_locked,'row.isload')
					handleChange(row);
				}
			});
		}
	},
	{
		title: "创建时间",
		key: "created_at",
		align:"center",
	},
	{
		title: "操作",
		key: "created_at",
		align:"center",
		render(row){
			return h(NButton,{
				size:"small",
				color:"#1890ff",
				strong:true,
				onClick:()=>{
					good_id.value = row.id;
					showEditModal.value = true;
				}
			},"编辑");
		}}
];
const pagination = ref(false as const);
const formSearch = ref({
	title:"",
	is_on:0 | 1,
	is_recommend: 0 | 1
});

// 添加模态框显示状态
const showModal = ref(false);
// 编辑模态框
const showEditModal = ref(false);
// 商品id
const good_id = ref(0);

const checkEditModal = (show:boolean) => {
	showEditModal.value = show;
};
const loadingBar = useLoadingBar();

onMounted(()=>{
	getGoodList({});
});
// 分页功能实现
const updatePage = (pageNum) => {
	getGoodList({
		current:pageNum,
		title:formSearch.value.title,
		is_on:formSearch.value.is_on,
		is_recommend:formSearch.value.is_recommend
	});
};
//定义重复方法
const repetition = ()=>{
	getGoodList({
		title: formSearch.value.title,
		is_on: formSearch.value.is_on,
		is_recommend: formSearch.value.is_recommend,
		current:1
	});
};

// 已上架按钮功能实现
const sellSubmit = (sell) => {
	formSearch.value.is_on =sell;
	repetition();
};

// 已推荐功能实现
const recommendSubmit = (recommend) => {
	formSearch.value.is_recommend =recommend;
	repetition();
};

// 搜索功能实现
const searchSubmit = (e) =>{
	e.preventDefault();
	repetition();
};
// 重置功能实现
const searchReload = ()=>{
	getGoodList({});
	formSearch.value = {
		title:"",
		is_on: 0|1,
		is_recommend: 0|1,

	};
};
//获取商品列表
const getGoodList = (params) =>{
	loadingBar.start();
	goods(params).then((res:any) =>{
		data.value = res.data;
		totalPages.value = res.meta.pagination.total_pages;
		page.value = res.meta.pagination.current_page;
		loadingBar.finish();
		loading.value = false;
	}).catch(()=>{
		loadingBar.error();
	});
};

// 上架和下架状态更改方法
const handleChangeOn = (row) => {
	getGoodLock(row.id).then(()=>{
		//可以在此处设置验证是否进行状态的修改
		message.info("上架状态已修改");
	});
};
// 推荐和不推荐状态更改方法
const handleChange = (row) => {
	recommendGood(row.id).then(()=>{
		message.info("推荐状态已修改");
	});
};


const checkShowModal = (status)=>{
	showModal.value = status;
};
const reload = ()=>{
	getGoodList({
		current:page.value,
		title:formSearch.value.title,
	});
};
</script>

<style scoped>

</style>