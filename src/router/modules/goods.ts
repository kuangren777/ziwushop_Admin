import { RouteRecordRaw} from "vue-router";
import Layout from "@/layout/index.vue";
import {BagHandleSharp} from "@vicons/ionicons5";
import {renderIcon} from "@/utils";
const routeName = "goods";
/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
	{
		path: "/goods",
		name: routeName,
		component: Layout,
		redirect: "/goods/list",
		meta: {
			title: "商品管理",
			icon: renderIcon(BagHandleSharp),
			sort:3,
			permissions:["goods"]
		},
		children: [
			{
				path: "list",
				name: `${routeName}_list`,
				meta: {
					title: "商品列表",
					icon: renderIcon(BagHandleSharp),
				},
				component: () => import("@/views/goods/index.vue"),
			}]
	}
];
export default routes;