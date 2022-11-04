/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const commodity = {
	// 员工
	path: '/commodity',
	component: Layout,
	redirect: '/commodity/index',
	name: '商品管理',
	meta: {
		title: '商品管理',
		icon: 'el-icon-s-custom'
	},
	children: [
		{
			path: '/commodity/index',
			component: () => import('@/views/commodity/index'),
			name: '删改商品',
			meta: { title: '删改商品' }
		},
		{
			path: '/commodity/overdue',
			component: () => import('@/views/commodity/overdue'),
			name: '货期商品',
			meta: { title: '货期商品' }
		}
	]
}

export default commodity
