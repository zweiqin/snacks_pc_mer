<template>
	<div>
		<el-card class="box-card">

			<div class="flex-center">
				<!--				<div style="margin-bottom: 20px">设置订单结算金额最小值：</div>-->

				<div>
					<el-form ref="settleForm" :model="settleForm" :rules="settleRules">
						<el-form-item label="设置订单结算金额最小值：" label-width="190px" prop="minMoney">
							<el-input v-model.number="settleForm.minMoney" placeholder="请输入金额"></el-input>
						</el-form-item>
					</el-form>
				</div>

				<div style="margin-top: 20px">
					<el-button type="primary" round size="medium" @click="handlSettle('settleForm')">确认设置</el-button>
				</div>
			</div>

		</el-card>

	</div>
</template>

<script>
import { GetMinPrice, ChangeMinPrice } from '@/api/snack'
import { getToken } from '@/utils/auth'

export default {
	name: 'index',
	data() {
		return {
			settleForm: {
				minMoney: ''
			},
			settleRules: {
				minMoney: [ { type: 'number', required: true, message: '请输入正确的金额', change: 'blue' } ]
			}

		}
	},
	computed: {
	},
	mounted() {
		this.getMinPrice()
	},
	methods: {
		// // 列表
		// getList(num) {
		//   this.form.page = num || this.form.page
		//   GetEbStoreOrderList(this.form)
		//     .then((res) => {
		//       this.tableData.data = res.data.items
		//       this.tableData.total = res.data.total
		//     })
		//     .catch((err) => {
		//       this.$message.error(err.data.data || err.data.msg)
		//     })
		// },
		// 图片
		getMinPrice() {
			GetMinPrice({ })
				.then((res) => {
					this.settleForm.minMoney = Number(res.data)
				})
				.catch((err) => {
					this.$message.error(err.data.data || err.data.msg)
				})
		},
		handlSettle(formName) {
			console.warn('handleSuccess')
			console.log(this.settleForm)
			this.$refs[formName].validate((valid) => {
				if (valid) {
					ChangeMinPrice({ min_price: this.settleForm.minMoney })
						.then((res) => {
							this.$message.success('设置成功！')
						})
						.catch((err) => {
							this.$message.error(err.data.data || err.data.msg)
						})
				} else {
					return false
				}
			})
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
