import {h} from "vue";
import {NIcon} from "naive-ui";
import {Component} from "@vue/runtime-core";

export const renderIcon =  (icon:Component) : Component =>{
	return () => h(NIcon, null, { default: () => h(icon) });
};

/**
 * 递归组装菜单格式
 */
export function generatorMenu(routerMap: Array<any>) {
	// routerMap 按照 sort 排序
	routerMap.sort((a, b) => a.meta.sort - b.meta.sort);
	const result = routerMap.map((item) => {
		// 判断 item.name 是否在 permissions 中 如果不存在跳过
		const menu: {label: any, key: any, icon: any, children: any} = {
			label: item?.meta?.title,
			key: item?.name,
			icon: item.meta?.icon,
			children: item?.meta.children

		};
		if (item.children && item.children.length > 1){ // 有子元素并且长度大于1，不止一个
			menu.children = generatorMenu(item.children); // 递归
		}else if (item.children && item.children.length === 1){
			menu.key = item?.children[0].name;
		}
		return menu;
	});
	// 去除result null
	return result;
}
/**
 * 判断根路由 Router
 * */
export function isRootRouter(item):boolean {
	return  item.children?.length === 1;
}
