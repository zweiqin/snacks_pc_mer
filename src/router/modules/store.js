/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const store = {
	// 员工
	path: '/store',
	component: Layout,
	redirect: '/store/index',
	name: '门店管理',
	meta: {
		title: '门店管理',
		icon: 'el-icon-s-custom'
	},
	children: [
		{
			path: '/store/index',
			component: () => import('@/views/store/index'),
			name: '门店管理',
			meta: { title: '门店管理' }
		}
	]
}

export default store
