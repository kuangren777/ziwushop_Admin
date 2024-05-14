import request from "@/utils/request";
/**
 * @description: 用户列表
 * @param params
 * */
// 友情链接列表
export function links(params){
	return request(
		{
			url:"/api/admin/links",
			method:"GET",
			params,
		}
	);
}

// 友情链接详情
export  function getLinksInfo(linkid) {
	return request(
		{
			url: `/api/admin/links/${linkid}`,
			method: "GET",
		}
	);
}

// 添加友情链接
export  function addLink(data) {
	return request(
		{
			url: "/api/admin/links",
			method: "POST",
			data,
		}
	);
}

// 修改友情链接
export  function changeLink(linkid, data) {
	return request(
		{
			url: `/api/admin/links/${linkid}`,
			method: "PUT",
			data
		}
	);
}

// 友情链接删除
export  function delLink(linkid) {
	return request(
		{
			url: `/api/admin/links/${linkid}`,
			method: "DELETE",
		}
	);
}

// 友情链接排序
/*export  function updateLink(linkid) {
	return request(
		{
			url: `/api/admin/links/${linkid}/seq`,
			method: "PUT",
		}
	);
}*/

// 友情链接禁用和启用
export  function getLinkLock(linkid) {
	return request(
		{
			url: `/api/admin/links/${linkid}/status`,
			method: "PATCH",
		}
	);
}


