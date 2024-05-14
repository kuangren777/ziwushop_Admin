import request from "@/utils/request";
/**
 * @description: 分类列表
 * @param params
 * */
// 分类列表
export function category(params){
	return request(
		{
			url:"/api/admin/category",
			method:"GET",
			params,
		}
	);
}

// 添加分类
export  function addCategory(data) {
	return request(
		{
			url: "/api/admin/category",
			method: "POST",
			data
		}
	);
}

// 分类详情
export  function getCategoryInfo(categoryid) {
	return request(
		{
			url: `/api/admin/category/${categoryid}`,
			method: "GET",
		}
	);
}


// 更新分类
export  function updateCategory(categoryid, data) {
	return request(
		{
			url: `/api/admin/category/${categoryid}`,
			method: "PUT",
			data
		}
	);
}


// 禁用和启用
export  function getCategoryLock(categoryid) {
	return request(
		{
			url: `/api/admin/category/${categoryid}/status`,
			method: "PATCH",
		}
	);
}

// 分类排序
export  function getCategorySeq(categoryid,params) {
	return request(
		{
			url: `/api/admin/category/${categoryid}/seq`,
			method: "PATCH",
			params
		}
	);
}