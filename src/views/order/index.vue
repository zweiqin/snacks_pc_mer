<template>
	<!-- 停车位管理--车位管理 -->
	<div class="parkingSpace">
		<el-card class="box-card">

			<div slot="header" class="clearfix">
				<!-- s搜索区 -->
				<div class="container">
					<el-form inline size="small" label-position="right">

						<el-form-item label="配送方式">
							<el-select
								v-model="form.shipping_type"
								placeholder="请选择配送方式"
								@change="getList(1)"
							>
								<el-option label="快递" value="1" />
								<el-option label="自提" value="2" />
							</el-select>
						</el-form-item>

						<el-button class="ResetSearch mr10" size="small" type="reset" @click="reset">重置</el-button>
						<el-button type="primary" label="default" size="small" @click="getList(1)">查询</el-button>
					</el-form>
				</div>
				<!-- e搜索区 -->

			</div>

			<!-- s表格 -->
			<el-table :data="tableData.data" style="width: 100%" size="small" highlight-current-row>

				<el-table-column prop="id" label="订单ID" min-width="130" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />
				<!--				<el-table-column prop="pid" label="父类订单id" min-width="130" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<el-table-column prop="order_id" label="订单号" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />
				<!--				<el-table-column prop="trade_no" label="支付宝订单号" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<el-table-column prop="uid" label="用户id" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />
				<el-table-column prop="real_name" label="用户姓名" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />
				<el-table-column prop="user_phone" label="用户电话" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />
				<!--				<el-table-column prop="user_address" label="详细地址" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="cart_id" label="购物车id" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="freight_price" label="运费金额" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="total_num" label="订单商品总数" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="total_price" label="订单总价" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="total_postage" label="邮费" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="pay_price" label="实际支付金额" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="pay_postage" label="支付邮费" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="deduction_price" label="抵扣金额" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="coupon_id" label="优惠券id" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="coupon_price" label="优惠券金额" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->

				<el-table-column prop="paid" label="支付状态" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.paid == 0">未支付</el-tag>
						<el-tag v-else type="success">已支付</el-tag>
					</template>
				</el-table-column>

				<!--				<el-table-column prop="pay_time" label="支付时间" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">-->
				<!--					<template slot-scope="scope">-->
				<!--						<div>{{ $moment.unix(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }}</div>-->
				<!--					</template>-->
				<!--				</el-table-column>-->
				<!--				<el-table-column prop="pay_type" label="支付方式" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="add_time" label="创建时间" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">-->
				<!--					<template slot-scope="scope">-->
				<!--						<div>{{ $moment.unix(scope.row.add_time).format('YYYY-MM-DD HH:mm:ss') }}</div>-->
				<!--					</template>-->
				<!--				</el-table-column>-->

				<!--				<el-table-column prop="status" label="订单状态" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">-->
				<!--					<template slot-scope="scope">-->
				<!--						<el-tag v-if="scope.row.status == -1">申请退款</el-tag>-->
				<!--						<el-tag v-else-if="scope.row.status == -2">退货成功</el-tag>-->
				<!--						<el-tag v-else-if="scope.row.status == 0">待发货</el-tag>-->
				<!--						<el-tag v-else-if="scope.row.status == 1">待收货</el-tag>-->
				<!--						<el-tag v-else-if="scope.row.status == 2">已收货</el-tag>-->
				<!--						<el-tag v-else type="success">已退款</el-tag>-->
				<!--					</template>-->
				<!--				</el-table-column>-->

				<!--				<el-table-column prop="refund_status" label="是否退款" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">-->
				<!--					<template slot-scope="scope">-->
				<!--						<el-tag v-if="scope.row.refund_status == 0">未退款</el-tag>-->
				<!--						<el-tag v-else-if="scope.row.refund_status == 1">申请中</el-tag>-->
				<!--						<el-tag v-else type="success">已退款</el-tag>-->
				<!--					</template>-->
				<!--				</el-table-column>-->

				<!--				<el-table-column prop="refund_type" label="退款申请类型" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="refund_express" label="退货快递单号" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->

				<!--				<el-table-column prop="refund_reason_wap_img" label="退款图片" min-width="150" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">-->
				<!--					<template slot-scope="scope">-->
				<!--						<div v-if="!scope.row.refund_reason_wap_img">无</div>-->
				<!--						<div v-else>-->
				<!--							<el-image ref="lazyImg" class="vx-lazyLoad" :src="'http://'+scope.row.refund_reason_wap_img" fit="fit" :preview-src-list="['http://'+scope.row.refund_reason_wap_img]" style="width: 150px; height: 100px">-->
				<!--								<div slot="placeholder" class="image-slot">-->
				<!--									<i class="el-icon-loading"></i>加载中-->
				<!--								</div>-->
				<!--								<div slot="error" class="image-slot">-->
				<!--									<i class="el-icon-picture-outline"></i>-->
				<!--								</div>-->
				<!--							</el-image>-->
				<!--						</div>-->
				<!--					</template>-->
				<!--				</el-table-column>-->

				<!--				<el-table-column prop="refund_reason_wap_explain" label="退款用户说明" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="refund_reason_time" label="退款时间" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">-->
				<!--					<template slot-scope="scope">-->
				<!--						<div>{{ $moment.unix(scope.row.refund_reason_time).format('YYYY-MM-DD HH:mm:ss') }}</div>-->
				<!--					</template>-->
				<!--				</el-table-column>-->
				<!--				<el-table-column prop="refund_reason_wap" label="前台退款原因" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="refund_reason" label="不退款的理由" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="refund_price" label="退款金额" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="delivery_name" label="快递名称/送货人姓名" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="delivery_code" label="快递公司编码" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->

				<!--				<el-table-column prop="delivery_type" label="发货类型" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->

				<!--				<el-table-column prop="delivery_id" label="快递单号/手机号" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="fictitious_content" label="虚拟发货内容" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<el-table-column prop="delivery_uid" label="配送员id" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />
				<!--				<el-table-column prop="gain_integral" label="消费赚取积分" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="use_integral" label="使用积分" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="back_integral" label="给用户退了多少积分" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="spread_uid" label="推广人uid" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="spread_two_uid" label="上上级推广人uid" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="one_brokerage" label="一级返佣金额" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="two_brokerage" label="二级返佣金额" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="mark" label="备注" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->

				<!--				<el-table-column prop="is_del" label="是否删除" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">-->
				<!--					<template slot-scope="scope">-->
				<!--						<el-tag v-if="scope.row.is_del == 0">否</el-tag>-->
				<!--						<el-tag v-else type="success">是</el-tag>-->
				<!--					</template>-->
				<!--				</el-table-column>-->

				<!--				<el-table-column prop="unique" label="唯一id(md5加密)类似id" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="remark" label="管理员备注" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="mer_id" label="商户ID" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="is_mer_check" label="is_mer_check" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->

				<!--				<el-table-column prop="combination_id" label="拼团商品id" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">-->
				<!--					<template slot-scope="scope">-->
				<!--						<el-tag v-if="scope.row.combination_id == 0">一般商品</el-tag>-->
				<!--						<el-tag v-else type="success">{{ scope.row.combination_id }}</el-tag>-->
				<!--					</template>-->
				<!--				</el-table-column>-->

				<!--				<el-table-column prop="pink_id" label="拼团id" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">-->
				<!--					<template slot-scope="scope">-->
				<!--						<el-tag v-if="scope.row.pink_id == 0">没有拼团</el-tag>-->
				<!--						<el-tag v-else type="success">{{ scope.row.pink_id }}</el-tag>-->
				<!--					</template>-->
				<!--				</el-table-column>-->

				<!--				<el-table-column prop="cost" label="成本价" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="seckill_id" label="秒杀商品ID" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="bargain_id" label="砍价id" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="advance_id" label="预售商品id" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="verify_code" label="核销码" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="store_id" label="门店id" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->

				<!--				<el-table-column prop="shipping_type" label="配送方式" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">-->
				<!--					<template slot-scope="scope">-->
				<!--						<el-tag v-if="scope.row.shipping_type == 1">快递</el-tag>-->
				<!--						<el-tag v-else type="success">门店自提</el-tag>-->
				<!--					</template>-->
				<!--				</el-table-column>-->

				<!--				<el-table-column prop="clerk_id" label="店员id" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->

				<!--				<el-table-column prop="is_channel" label="支付渠道" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">-->
				<!--					<template slot-scope="scope">-->
				<!--						<el-tag v-if="scope.row.is_channel == 0">微信公众号</el-tag>-->
				<!--						<el-tag v-else type="success">微信小程序</el-tag>-->
				<!--					</template>-->
				<!--				</el-table-column>-->

				<!--				<el-table-column prop="is_remind" label="消息提醒" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">-->
				<!--					<template slot-scope="scope">-->
				<!--						<el-tag v-if="scope.row.is_remind == 0">无</el-tag>-->
				<!--						<el-tag v-else type="success">有</el-tag>-->
				<!--					</template>-->
				<!--				</el-table-column>-->

				<!--				<el-table-column prop="is_system_del" label="后台是否删除" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">-->
				<!--					<template slot-scope="scope">-->
				<!--						<el-tag v-if="scope.row.is_remind == 0">否</el-tag>-->
				<!--						<el-tag v-else type="success">是</el-tag>-->
				<!--					</template>-->
				<!--				</el-table-column>-->

				<!--				<el-table-column prop="channel_type" label="用户访问端标识" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="province" label="用户省份" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="express_dump" label="订单面单打印信息" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->

				<!--				<el-table-column prop="virtual_type" label="虚拟商品类型" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->

				<!--				<el-table-column prop="virtual_info" label="虚拟商品信息" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->

				<!--				<el-table-column prop="is_grab" label="是否抓取" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue">-->
				<!--					<template slot-scope="scope">-->
				<!--						<el-tag v-if="scope.row.is_grab == 0">没有抓取</el-tag>-->
				<!--						<el-tag v-else type="success">已经抓取</el-tag>-->
				<!--					</template>-->
				<!--				</el-table-column>-->

				<!--				<el-table-column prop="grab_time" label="抓取时间" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="lng" label="经度" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<!--				<el-table-column prop="lat" label="纬度" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />-->
				<el-table-column prop="delivery_time" label="配送时间" min-width="100" :formatter="(row, column, cellValue, index)=>cellValue===''?'无':cellValue" />

				<el-table-column label="操作" min-width="120" fixed="right" align="center">
					<template slot-scope="scope">
						<el-button v-if="(scope.row.paid==0&&scope.row.delivery_uid==0)" type="text" size="small" class="mr10" @click="editPay(scope.row)">修改支付状态</el-button>
						<el-button v-if="scope.row.paid==1&&scope.row.delivery_uid==0" type="text" size="small" class="mr10" @click="editDeliver(scope.row)">分配配送人员</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div class="block">
				<el-pagination
					:page-sizes="[10, 20, 40, 60, 80]"
					:page-size="form.limit"
					:current-page="form.page"
					layout="total, sizes, prev, pager, next, jumper"
					:total="tableData.total"
					@size-change="handleSizeChange"
					@current-change="pageChange"
				/>
			</div>
			<!-- e表格 -->
		</el-card>

		<!-- s编辑 -->
		<el-dialog title="修改支付状态" :close-on-click-modal="false" :visible.sync="edit_visible1" class="edit" width="50%">
			<el-form ref="editForm1" :model="editForm1" :rules="editRules1">
				<el-form-item label="支付状态" label-width="120px" prop="installer_id">
					<el-select
						v-model="editForm1.paid"
						placeholder="请选择支付状态"
					>
						<el-option :label="'已支付'" :value="1" />
						<el-option :label="'未支付'" :value="0" />
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="edit_submit('editForm1')">确认修改</el-button>
			</div>
		</el-dialog>
		<!-- e编辑 -->

		<!-- s编辑 -->
		<el-dialog title="分配安装人员" :close-on-click-modal="false" :visible.sync="edit_visible" class="edit" width="50%">
			<el-form ref="editForm" :model="editForm" :rules="editRules">
				<el-form-item label="安装人员" label-width="120px" prop="installer_id">
					<el-select
						v-model="editForm.service_id"
						placeholder="请选择安装人员"
					>
						<el-option
							v-for="item in installer_list"
							:key="item.id"
							:label="item.nickname"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="edit_submit('editForm')">确认分配</el-button>
			</div>
		</el-dialog>
		<!-- e编辑 -->

	</div>
</template>

<script>
// import { mul, div } from '@/utils/compute'
// import moment from 'moment'
// import localstorage from '@/utils/localStorage'

import { GetEbStoreOrderList, GetEbDeliveryServiceList, ChangePayStatus, UpdateDeliveryInfo } from '@/api/snack'
export default {
	name: 'index',
	data() {
		return {
			form: {
				page: 1,
				limit: 10,
				shipping_type: '1',
				installer_id: ''
			},
			installer_list: [],
			tableData: {
				data: [],
				total: 0
			},

			// 编辑1
			edit_visible1: false,
			editForm1: {
				id: '',
				paid: ''
			},
			editRules1: {
				paid: [ { required: true, message: '请选择支付状态', trigger: 'change' } ]
			},

			// 编辑
			edit_visible: false,
			editForm: {
				id: '',
				service_id: ''
			},
			editRules: {
				service_id: [ { required: true, message: '请选择要分配的配送人员', trigger: 'change' } ]
			}

		}
	},
	computed: {
	},
	mounted() {
		this.getServiceList()
		this.getList(1)
	},
	methods: {
		// 获取安装人员信息
		async getServiceList() {
			await GetEbDeliveryServiceList({})
				.then((res) => {
					this.installer_list = res.data.items
				})
				.catch((err) => {
					this.$message.error(err.data.data)
				})
		},
		// 列表
		getList(num) {
			this.form.page = num || this.form.page
			GetEbStoreOrderList(this.form)
				.then((res) => {
					this.tableData.data = res.data.items
					this.tableData.total = res.data.total
				})
				.catch((err) => {
					this.$message.error(err.data.data || err.data.msg)
				})
		},

		pageChange(page) {
			this.form.page = page
			this.getList('')
		},
		handleSizeChange(val) {
			this.form.limit = val
			this.getList('')
		},
		// 重置
		reset() {
			this.form = {
				page: 1,
				limit: 10,
				shipping_type: '',
				installer_id: ''
			}
			this.getList('')
		},

		// 编辑
		editPay(e) {
			this.editForm1.id = e.id
			this.editForm1.paid = Number(e.paid)
			this.editForm1.paid = ''
			this.edit_visible1 = true
		},
		// 编辑
		editDeliver(e) {
			this.editForm.id = e.id
			this.editForm.service_id = e.delivery_uid || ''
			this.edit_visible = true
		},
		// 编辑--确认
		edit_submit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (formName === 'editForm1') {
						ChangePayStatus(this.editForm1)
							.then((res) => {
								this.$message.success('修改成功！')
								this.getList('')
								this.edit_visible1 = false
							})
							.catch((err) => {
								this.$message.error(err.data.data)
							})
					} else {
						UpdateDeliveryInfo(this.editForm)
							.then((res) => {
								this.$message.success('成功分配安装人员！')
								this.getList('')
								this.edit_visible = false
							})
							.catch((err) => {
								this.$message.error(err.data.data)
							})
					}
				} else {
					return false
				}
			})
		}

	}
}
</script>

<style lang="scss" >
::deep [type=reset],
[type=submit],
button,
html [type=button] {
  -webkit-appearance: none !important;
}
.parkingSpace{
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .box-card {
    margin: 20px 20px
  }

  .container {
    min-width: 821px;
  }

  .block{
    float: right;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}

</style>
