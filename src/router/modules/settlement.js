/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const settlement = {
	// 员工
	path: '/settlement',
	component: Layout,
	redirect: '/settlement/index',
	name: '结算管理',
	meta: {
		title: '结算管理',
		icon: 'el-icon-s-custom'
	},
	children: [
		{
			path: '/settlement/index',
			component: () => import('@/views/settlement/index'),
			name: '结算管理',
			meta: { title: '结算管理' }
		}
	]
}

export default settlement
