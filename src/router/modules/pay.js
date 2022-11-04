/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const pay = {
	// 员工
	path: '/pay',
	component: Layout,
	redirect: '/pay/index',
	name: '支付图片',
	meta: {
		title: '支付图片',
		icon: 'el-icon-s-custom'
	},
	children: [
		{
			path: '/pay/index',
			component: () => import('@/views/pay/index'),
			name: '支付图片',
			meta: { title: '支付图片' }
		}
	]
}

export default pay
