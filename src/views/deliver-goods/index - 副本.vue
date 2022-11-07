<template>
	<div>
		<el-card class="box-card">

			<div class="flex-center">
				<el-tree
					ref="tree"
					:data="data"
					show-checkbox
					node-key="id"
					:default-expanded-keys="[]"
					:default-checked-keys="list"
					@check-change="handleCheckChange"
				>
				</el-tree>
			</div>

			<div style="margin-top: 20px">
				<el-button type="primary" round size="medium" @click="handleEdit">确认修改发货时间</el-button>
			</div>

		</el-card>

	</div>
</template>

<script>
import { GetDeliveryTime, EditEbSystemDeliveryTimeById } from '@/api/snack'
import { getToken } from '@/utils/auth'

export default {
	name: 'index',
	data() {
		return {
			data: [],
			list: []

		}
	},
	computed: {
	},
	created() {
	},
	mounted() {
		// this.getList(1)
		const temp_arr = []
		for (let i = 0; i < 24; i++) {
			temp_arr.push({
				id: String(i),
				label: `${i}点`,
				children: new Array(60).join(',')
					.split(',')
					.map((item, index) => (
						{
							id: `${i < 10 ? '0' + i : i}:${index < 10 ? '0' + index : index}`,
							label: `${i < 10 ? '0' + i : i}:${index < 10 ? '0' + index : index}`
						}
					))
			})
		}
		this.data = temp_arr
		this.getList()
	},
	methods: {
		// 列表
		getList() {
			GetDeliveryTime()
				.then((res) => {
					this.list = res.data.List
				})
				.catch((err) => {
					this.$message.error(err.data.data || err.data.msg)
				})
		},
		handleEdit() {
			EditEbSystemDeliveryTimeById({ list: this.list })
				.then((res) => {
					this.list = res.data.List
					this.$message.success('修改成功')
				})
				.catch((err) => {
					this.$message.error(err.data.data || err.data.msg)
				})
		},
		handleCheckChange(data, checked, indeterminate) {
			console.log(data, checked, indeterminate)
			const temp_arr = []
			this.$refs.tree.getCheckedNodes().forEach((item) => {
				if (!item.children) {
					// item.children.forEach((part) => {
					// 	temp_arr.push(part.id)
					// })
					temp_arr.push(item.id)
				}
			})
			this.list = temp_arr
			console.log(this.list)
			console.log(this.$refs.tree.getCheckedNodes())
		}

	}
}
</script>

<style scoped>

.box-card {
  margin: 20px 20px;
}
.flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

</style>
