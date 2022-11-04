/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const deliverGoods = {
	// 员工
	path: '/deliver-goods',
	component: Layout,
	redirect: '/deliver-goods/index',
	name: '发货时间',
	meta: {
		title: '发货时间',
		icon: 'el-icon-s-custom'
	},
	children: [
		{
			path: '/deliver-goods/index',
			component: () => import('@/views/deliver-goods/index'),
			name: '发货时间',
			meta: { title: '发货时间' }
		}
	]
}

export default deliverGoods
