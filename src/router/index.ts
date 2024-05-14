import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
// import Home from '@/views/Home.vue'
import Login from "@/views/login/index.vue";
// const modules = import.meta.glob('./modules/**/*.ts',{eager: true}  );
const modules:any = import.meta.glob("./modules/**/*.ts",{eager:true});
const routeModuleList: RouteRecordRaw[] = [];


Object.keys(modules).forEach((key) => {
	const mod = modules[key].default || {};
	const modList = Array.isArray(mod)? [...mod] : [mod];
	routeModuleList.push(...modList);
});

const routes = [
	{
		path: "/",
		redirect:"/Login"
		// component: Home
	},
	{
		path: "/Login",
		component: Login,
		name:"Login",
		meta: {
			title: "登录"
		}
	}
];
const baseRoutes = [...routes,...routeModuleList];
const router = createRouter({

	// 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
	history: createWebHistory(),
	routes:baseRoutes, // `routes: routes` 的缩写
});
router.beforeEach((to,_from,next) =>{
	document.title = (to?.meta?.title as string) || document.title;
	if(to.name != "Login"){
		// 判断是否登录
		if(!localStorage.getItem("token")){
			next({
				path: "/login"
			});
		}
	}
	next();
});

export {routeModuleList};
export default router;