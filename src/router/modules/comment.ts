import { RouteRecordRaw} from "vue-router";
import Layout from "@/layout/index.vue";
import {ChatbubbleEllipsesOutline} from "@vicons/ionicons5";
import {renderIcon} from "@/utils";
const routeName = "comment";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/comment",
		name: routeName,
		component: Layout,
		redirect: "/comment",
		meta: {
			title: "评论管理",
			icon: renderIcon(ChatbubbleEllipsesOutline),
			sort:5,

		},
		children: [
			{
				path: "list",
				name: `${routeName}_list`,
				meta: {
					title: "用户列表",
					icon: renderIcon(ChatbubbleEllipsesOutline),
				},
				component: () => import("@/views/comment/index.vue"),
			}
		]
	}
];
export default routes;