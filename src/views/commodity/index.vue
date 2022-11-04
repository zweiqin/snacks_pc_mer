<template>
	<!-- 停车位管理--车位管理 -->
	<div class="parkingSpace">
		<el-card class="box-card">

			<div slot="header" class="clearfix">
				<!-- s搜索区 -->
				<div class="container">
					<el-form inline size="small" label-position="right">

						<el-form-item label="是否上架">
							<el-select
								v-model="form.is_show"
								placeholder="请选择是否上架"
								@change="getList(1)"
							>
								<el-option label="全部" value="" />
								<el-option label="否" value="0" />
								<el-option label="是" value="1" />
							</el-select>
						</el-form-item>

						<el-form-item label="是否删除">
							<el-select
								v-model="form.is_del"
								placeholder="请选择是否删除"
								@change="getList(1)"
							>
								<el-option label="全部" value="" />
								<el-option label="否" value="0" />
								<el-option label="是" value="1" />
							</el-select>
						</el-form-item>

						<el-button class="ResetSearch mr10" size="small" type="reset" @click="reset">重置</el-button>
						<el-button type="primary" label="default" size="small" @click="getList(1)">查询</el-button>
					</el-form>
				</div>
				<!-- e搜索区 -->

			</div>

			<!-- s表格 -->
			<el-table :data="tableData.data" style="width: 100%" size="small" highlight-current-row border>

				<el-table-column prop="id" label="商品ID" min-width="130" />
				<el-table-column prop="mer_id" label="商户ID" min-width="130" />

				<el-table-column prop="image" label="商品图片" min-width="150">
					<template slot-scope="scope">
						<div v-if="!scope.row.image">无</div>
						<div v-else>
							<el-image ref="lazyImg" class="vx-lazyLoad" :src="scope.row.image" fit="fit" :preview-src-list="[scope.row.image]" style="width: 150px; height: 100px">
								<div slot="placeholder" class="image-slot">
									<i class="el-icon-loading"></i>加载中
								</div>
								<div slot="error" class="image-slot">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="recommend_image" label="推荐图" min-width="150">
					<template slot-scope="scope">
						<div v-if="!scope.row.image">无</div>
						<div v-else>
							<el-image ref="lazyImg" class="vx-lazyLoad" :src="scope.row.image" fit="fit" :preview-src-list="[scope.row.image]" style="width: 150px; height: 100px">
								<div slot="placeholder" class="image-slot">
									<i class="el-icon-loading"></i>加载中
								</div>
								<div slot="error" class="image-slot">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="slider_image" label="轮播图" min-width="320">
					<template slot-scope="scope">
						<div v-if="!scope.row.image">无</div>
						<div v-else style="width: 1200px">
							<el-image v-for="(item,index) in JSON.parse(scope.row.slider_image)" :key="index" ref="lazyImg" class="vx-lazyLoad" :src="item" fit="fit" :preview-src-list="[item]" style="width: 150px; height: 100px">
								<div slot="placeholder" class="image-slot">
									<i class="el-icon-loading"></i>加载中
								</div>
								<div slot="error" class="image-slot">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="store_name" label="商品名称" min-width="100" />
				<el-table-column prop="store_info" label="商品简介" min-width="100" />
				<el-table-column prop="keyword" label="关键字" min-width="100" />
				<el-table-column prop="bar_code" label="商品条码" min-width="100" />
				<el-table-column prop="cate_id" label="分类ID" min-width="100" />
				<el-table-column prop="price" label="商品价格" min-width="100" />
				<el-table-column prop="vip_price" label="会员价格" min-width="100" />
				<el-table-column prop="ot_price" label="市场价" min-width="100" />
				<el-table-column prop="postage" label="邮费" min-width="100" />
				<el-table-column prop="unit_name" label="单位名" min-width="100" />
				<el-table-column prop="sort" label="排序" min-width="100" />
				<el-table-column prop="sales" label="销量" min-width="100" />
				<el-table-column prop="stock" label="库存" min-width="100" />

				<el-table-column prop="is_show" label="状态" min-width="100">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.is_show == 0">未上架</el-tag>
						<el-tag v-else type="success">上架</el-tag>
					</template>
				</el-table-column>

				<el-table-column prop="is_hot" label="是否热卖" min-width="100">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.is_hot == 0">否</el-tag>
						<el-tag v-else type="success">是</el-tag>
					</template>
				</el-table-column>

				<el-table-column prop="is_benefit" label="是否优惠" min-width="100">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.is_benefit == 0">否</el-tag>
						<el-tag v-else type="success">是</el-tag>
					</template>
				</el-table-column>

				<el-table-column prop="is_best" label="是否精品" min-width="100">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.is_best == 0">否</el-tag>
						<el-tag v-else type="success">是</el-tag>
					</template>
				</el-table-column>

				<el-table-column prop="is_new" label="是否新品" min-width="100">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.is_new == 0">否</el-tag>
						<el-tag v-else type="success">是</el-tag>
					</template>
				</el-table-column>

				<el-table-column prop="is_virtual" label="是否虚拟商品" min-width="100">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.is_virtual == 0">否</el-tag>
						<el-tag v-else type="success">是</el-tag>
					</template>
				</el-table-column>

				<el-table-column prop="virtual_type" label="虚拟商品类型" min-width="100" />

				<el-table-column prop="add_time" label="创建时间" min-width="100">
					<template slot-scope="scope">
						<div>{{ $moment.unix(scope.row.add_time).format('YYYY-MM-DD HH:mm:ss') }}</div>
					</template>

					<el-table-column prop="is_postage" label="是否包邮" min-width="100">
						<template slot-scope="scope">
							<el-tag v-if="scope.row.is_postage == 0">否</el-tag>
							<el-tag v-else type="success">是</el-tag>
						</template>
					</el-table-column>

					<el-table-column prop="is_del" label="是否删除" min-width="100">
						<template slot-scope="scope">
							<el-tag v-if="scope.row.is_del == 0">否</el-tag>
							<el-tag v-else type="success">是</el-tag>
						</template>
					</el-table-column>

					<el-table-column prop="mer_use" label="商户是否可代理" min-width="100">
						<template slot-scope="scope">
							<el-tag v-if="scope.row.mer_use == 0">否</el-tag>
							<el-tag v-else type="success">是</el-tag>
						</template>
					</el-table-column>

					<el-table-column prop="give_integral" label="获得积分" min-width="100" />
					<el-table-column prop="cost" label="成本价" min-width="100" />

					<el-table-column prop="is_seckill" label="秒杀状态" min-width="100">
						<template slot-scope="scope">
							<el-tag v-if="scope.row.is_seckill == 0">未开启</el-tag>
							<el-tag v-else type="success">开启</el-tag>
						</template>
					</el-table-column>

					<el-table-column prop="is_bargain" label="砍价状态" min-width="100">
						<template slot-scope="scope">
							<el-tag v-if="scope.row.is_bargain == 0">未开启</el-tag>
							<el-tag v-else type="success">开启</el-tag>
						</template>
					</el-table-column>

					<el-table-column prop="is_good" label="是否优品推荐" min-width="100">
						<template slot-scope="scope">
							<el-tag v-if="scope.row.is_good == 0">否</el-tag>
							<el-tag v-else type="success">是</el-tag>
						</template>
					</el-table-column>

					<el-table-column prop="is_sub" label="是否单独分佣" min-width="100">
						<template slot-scope="scope">
							<el-tag v-if="scope.row.is_sub == 0">否</el-tag>
							<el-tag v-else type="success">是</el-tag>
						</template>
					</el-table-column>

					<el-table-column prop="is_vip" label="是否开启会员价格" min-width="100">
						<template slot-scope="scope">
							<el-tag v-if="scope.row.is_vip == 0">否</el-tag>
							<el-tag v-else type="success">是</el-tag>
						</template>
					</el-table-column>

					<el-table-column prop="ficti" label="虚拟销量" min-width="100" />
					<el-table-column prop="browse" label="浏览量" min-width="100" />
					<el-table-column prop="code_path" label="商品二维码地址（用户小程序海报）" min-width="100" />
					<el-table-column prop="soure_link" label="淘宝京东1688类型" min-width="100" />
					<el-table-column prop="video_link" label="主图视频链接" min-width="100" />
					<el-table-column prop="temp_id" label="运费模板ID" min-width="100" />

					<el-table-column prop="spec_type" label="规格" min-width="100">
						<template slot-scope="scope">
							<el-tag v-if="scope.row.is_vip == 0">单</el-tag>
							<el-tag v-else type="success">多</el-tag>
						</template>
					</el-table-column>

					<el-table-column prop="activity" label="活动显示排序" min-width="100">
						<template slot-scope="scope">
							<el-tag v-if="scope.row.activity.includes('1')">秒杀</el-tag>
							<el-tag v-if="scope.row.activity.includes('2')">砍价</el-tag>
							<el-tag v-if="scope.row.activity.includes('3')">拼团</el-tag>
						</template>
					</el-table-column>

					<el-table-column prop="spu" label="商品SPU" min-width="100" />
					<el-table-column prop="label_id" label="标签ID" min-width="100" />
					<el-table-column prop="command_word" label="复制口令" min-width="100" />
					<el-table-column prop="recommend_list" label="推荐商品ID" min-width="100" />
					<el-table-column prop="supplier_id" label="供应商关联ID" min-width="100" />
					<el-table-column prop="expiration_time" label="过期时间" min-width="100" />
				</el-table-column></el-table>

			<div class="block">
				<el-pagination
					:page-sizes="[5, 10, 20, 40, 60, 80]"
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

	</div>
</template>

<script>
// import { mul, div } from '@/utils/compute'
// import moment from 'moment'
// import localstorage from '@/utils/localStorage'

import { GetEbStoreProductList, GetExpirationTimeProduct } from '@/api/snack'
export default {
	name: 'index',
	data() {
		return {
			form: {
				page: 1,
				limit: 5,
				is_show: '',
				is_del: ''
			},
			tableData: {
				data: [],
				total: 0
			}

		}
	},
	computed: {
	},
	mounted() {
		this.getList(1)
	},
	methods: {
		// 列表
		getList(num) {
			this.form.page = num || this.form.page
			GetEbStoreProductList(this.form)
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
				is_show: '',
				is_del: ''
			}
			this.getList('')
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
