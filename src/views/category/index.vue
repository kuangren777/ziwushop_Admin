<template>
  <div>
    <div class="h-24 w-full bg-white p-3 mb-6">
      <div>
        <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1 font-bold">分类管理</span>
        <div class="pt-3 text-xl text-black font-bold">
          分类管理
        </div>
      </div>
    </div>
    <div class="content px-4">
      <span class="ml-auto"><NButton type="info" @click="showModal = true" >添加分类</NButton></span>
      <div class="mt-4 bg-white">
        <div>
          <n-data-table
              :columns="columns"
              :data="data"
              default-expand-all
              :loading="loading"
          />

        </div>
      </div>
      <AddCategory :showModal="showModal" @checkShowModal="checkShowModal" @reloadTable="reload"></AddCategory>
      <EditCategory v-if="showEditModal" :dataName="data"  :category_id="category_id" :showModal="showEditModal" @checkShowModal="checkEditModal" @reloadTable="reload"></EditCategory>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {h, ref, onMounted} from "vue";
import {NButton, useLoadingBar} from "naive-ui";
import {category} from "@/api/category";
import AddCategory from "@/views/category/components/AddCategory.vue";
import EditCategory from "@/views/category/components/EditCategory.vue";


const data:any = ref([]);
const columns:any = [
	{
		title: "分类名称",
		key: "name",
		width:"60%",
	},
	{
		title: "分类排序",
		key: "seq",
		width:"10%",
		align:"center",
		sorter: (row1, row2) => row1.seq - row2.seq,
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
					category_id.value = row.id;
					showEditModal.value = true;
				}
			},"修改");
		}}
];

const loading = ref(true);
// 添加模态框显示状态
const showModal = ref(false);
// 编辑模态框
const showEditModal = ref(false);

const loadingBar = useLoadingBar();
const category_id = ref(0);

onMounted(()=>{
	getCategoryList({type:"all"});
});

const checkEditModal = (show:boolean) => {
	showEditModal.value = show;
};
const checkShowModal = (status)=>{
	showModal.value = status;
};

const  getCategoryList =  (params) =>{
	loadingBar.start();
	category(params).then(res=>{
		// console.log(category,"cartegory");
		data.value = res;
		loadingBar.finish();
		loading.value = false;
	}).catch(()=>{
		// console.log(err);
		loadingBar.error();
	});
};
const reload = ()=>{
	getCategoryList({type:"all"});
};
</script>

<style scoped>

</style>