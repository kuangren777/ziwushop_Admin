import { RouteRecordRaw} from "vue-router";
import Layout from "@/layout/index.vue";
import {Apps} from "@vicons/ionicons5";
import {renderIcon} from "@/utils";
const routeName = "category";
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
		path: "/category",
		name: routeName,
		component: Layout,
		redirect: "/category",
		meta: {
			title: "分类管理",
			icon: renderIcon(Apps),
			sort:1,
			permissions:["category"]
		},
		children: [
			{
				path: "list",
				name: `${routeName}_list`,
				meta: {
					title: "分类列表",
					icon: renderIcon(Apps),
				},
				component: () => import("@/views/category/index.vue"),
			}
		]
	}
];
export default routes;