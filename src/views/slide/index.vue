<template>
  <div>
    <div class="h-24 w-full bg-white p-3 mb-6">
      <div>
        <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1 font-bold">轮播管理</span>
        <div class="pt-3 text-xl text-black font-bold">
          轮播管理
        </div>
      </div>
    </div>
    <div class="content px-4">

      <div class="mt-4 bg-white">
        <div class="text-xl px-6 py-4 flex ">
          <span>轮播图列表</span>
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
      <AddSlide :showModal="showModal" @checkShowModal="checkShowModal" @reloadTable="reload"></AddSlide>
      <EditSlide v-if="showEditModal"  :slide_id="slide_id" :showModal="showEditModal" @checkShowModal="checkEditModal" @reloadTable="reload"></EditSlide>
      <DeleteSlide v-if="showDelModal" :slide_id="slide_id" :showModal="showDelModal" @checkShowModal="checkDelModal" @reloadTable="reload"></DeleteSlide>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h,ref,onMounted } from "vue";
import { NButton, useMessage,NImage,NSwitch,useLoadingBar } from "naive-ui";
import AddSlide from "./components/AddSlide.vue";
import { slides,getSlideLock } from "@/api/slide";
import EditSlide from "./components/EditSilde.vue";
import DeleteSlide from "./components/DeleteSlide.vue";

const page = ref(1);
const message = useMessage();
const data = ref([]);
const totalPages = ref(0);
const columns:any = [
	{
		title: "轮播图",
		key: "img",
		align:"center",
		render (row) {
			return h(NImage,{round:true,src:row.img_url,width:"100"});
		}
	},
	{
		title: "标题",
		key: "title",
		align:"center",
	},
	{
		title: "跳转链接",
		key: "url",
		align:"center",
		width:"300"
	},
	{
		title: "是否禁用",
		key: "status",
		align:"center",
		render(row){
			return h(NSwitch,{
				size:"medium",
				color:"#1890ff",
				activeColor:"#52c41a",
				inactiveColor:"#d9d9d9",
				activeValue:1,
				inactiveValue:0,
				value:row.status == 0 ? false : true,
				onClick:()=>{
					// console.log(row.status,"row.isload");
					row.status==0?row.status=1:row.status=0;
					// console.log(row.status,"row.isload");
					handleChange(row);
				}
			});
		}
	},
	{
		title: "排序",
		key: "seq",
		align:"center",
		sorter: (row1, row2) => row1.seq - row2.seq,
	},
	{
		title: "更新时间",
		key: "updated_at",
		align:"center",
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
					slide_id.value = row.id;
					showEditModal.value = true;
				}
			},"编辑"),
			h(NButton,{
				type:"error",
				bordered:false,
				ghost:true,
				size:"small",
				strong:true,
				onClick:()=>{
					slide_id.value = row.id;
					showDelModal.value = true;
				}
			},"删除")
			];
		}},

];
const loading = ref(true);
const pagination = ref(false as const);
const formSearch = ref({
	name:"",
	email:""
});
// 添加模态框显示状态
const showModal = ref(false);
// 编辑模态框
const showEditModal = ref(false);
// 删除模态框
const showDelModal = ref(false);
const slide_id = ref(0);

const checkEditModal = (show:boolean) => {
	showEditModal.value = show;
};
const checkDelModal = (show:boolean) => {
	showDelModal.value = show;
};
const loadingBar = useLoadingBar();

onMounted(()=>{
	getUserList({});
});
const updatePage = (pageNum) => {
	getUserList({
		current:pageNum,
		name:formSearch.value.name,
		email:formSearch.value.email
	});
};


const getUserList = (params) =>{
	loadingBar.start();
	slides(params).then((res:any) =>{
		// console.log(res);
		data.value = res.data;
		totalPages.value = res.meta.pagination.total_pages;
		page.value = res.meta.pagination.current_page;
		loadingBar.finish();
		loading.value = false;
	}).catch(()=>{
		loadingBar.error();
	});
};

const handleChange = (row) => {
	getSlideLock(row.id).then(()=>{
		//可以在此处设置验证是否进行状态的修改
		message.info("禁用状态已修改");
	});
};
const checkShowModal = (status)=>{
	showModal.value = status;
};
const reload = ()=>{
	getUserList({
		current:page.value,
		name:formSearch.value.name,
		email:formSearch.value.email
	});
};
</script>

<style scoped>

</style>