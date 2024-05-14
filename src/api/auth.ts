import request from "@/utils/request";
//登录接口
export function login(data){
	return request(
		{
			url:"/api/auth/login",
			method: "POST",
			data,
		}
	);
}
//用户接口
export function user(){
	return request(
		{
			url:"/api/admin/user",
			method:"GET",
		}
	);
}
//退出登录接口
export function logout() {
	return request(
		{
			url:"/api/auth/logout",
			method:"POST"
		}
	);
}