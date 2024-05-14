import request from "@/utils/request";

/**
 * @description: 订单列表
 * @param params
 * */

// 订单列表
export function orders(params){
	return request(
		{
			url:"/api/admin/orders",
			method:"GET",
			params
		}
	);
}

// 订单详情
export  function getOrderInfo(orderid,params) {
	return request(
		{
			url: `/api/admin/orders/${orderid}`,
			method: "GET",
			params

		}
	);
}

// 订单发货
export function OrderPost (orderid,params) {
	return request(
		{
			url: `/api/admin/orders/${orderid}/post`,
			method: "PATCH",
			params
		}
	);
}