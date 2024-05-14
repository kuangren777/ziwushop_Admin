import request from "@/utils/request";
/**
 * @description: 用户列表
 * @param params
 * */
// 轮播列表
export function slides(params){
	return request(
		{
			url:"/api/admin/slides",
			method:"GET",
			params,
		}
	);
}

// 轮播详情
export  function getSlidesInfo(slideid) {
	return request(
		{
			url: `/api/admin/slides/${slideid}`,
			method: "GET",
		}
	);
}

// 添加轮播
export  function addSlide(data) {
	return request(
		{
			url: "/api/admin/slides",
			method: "POST",
			data,
		}
	);
}

// 修改轮播
export  function changeSlide(slideid, data) {
	return request(
		{
			url: `/api/admin/slides/${slideid}`,
			method: "PUT",
			data
		}
	);
}

// 轮播删除
export  function delSlide(slideid) {
	return request(
		{
			url: `/api/admin/slides/${slideid}`,
			method: "DELETE",
		}
	);
}

// 轮播排序
/*export  function updateSlide(slideid) {
	return request(
		{
			url: `/api/admin/slides/${slideid}/seq`,
			method: "PUT",
		}
	);
}*/

// 轮播禁用和启用
export  function getSlideLock(slideid) {
	return request(
		{
			url: `/api/admin/slides/${slideid}/status`,
			method: "PATCH",
		}
	);
}


