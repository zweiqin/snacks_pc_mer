/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const shop = {
	// 员工
	path: '/shop',
	component: Layout,
	redirect: '/shop/index',
	name: '商城上架管理',
	meta: {
		title: '商城上架管理',
		icon: 'el-icon-s-custom'
	},
	children: [
		{
			path: '/shop/index',
			component: () => import('@/views/shop/index'),
			name: '商城上架管理',
			meta: { title: '商城上架管理' }
		}
	]
}

export default shop
