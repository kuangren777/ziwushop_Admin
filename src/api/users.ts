import request from "@/utils/request";
/**
 * @description: 用户列表
 * @param params
 * */
export function users(params){
	return request(
		{
			url:"/api/admin/users",
			method:"GET",
			params,
		}
	);
}
//添加用户
export  function addUser(data) {
	return request(
		{
			url: "/api/admin/users",
			method: "POST",
			data,
		}
	);
}

// 禁用和启用
export  function getUserLock(userid) {
	return request(
		{
			url: `/api/admin/users/${userid}/lock`,
			method: "PATCH"
		}
	);
}

export  function getUserInfo(userid) {
	return request(
		{
			url: `/api/admin/users/${userid}`,
			method: "GET",
		}
	);
}

export  function updateUser(userid, data) {
	return request(
		{
			url: `/api/admin/users/${userid}`,
			method: "PUT",
			data
		}
	);
}