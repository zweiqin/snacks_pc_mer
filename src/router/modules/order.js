/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const order = {
	// 员工
	path: '/order',
	component: Layout,
	redirect: '/order/index',
	name: '订单管理',
	meta: {
		title: '订单管理',
		icon: 'el-icon-s-custom'
	},
	children: [
		{
			path: '/order/index',
			component: () => import('@/views/order/index'),
			name: '订单管理',
			meta: { title: '订单管理' }
		}
	]
}

export default order
