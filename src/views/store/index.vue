<template>
	<!-- 停车位管理--车位管理 -->
	<div class="parkingSpace">
		<el-card class="box-card">

			<div slot="header" class="clearfix">
				<!-- s搜索区 -->
				<div class="container">
					<el-form inline size="small" label-position="right">

						<el-form-item label="是否显示">
							<el-select
								v-model="form.is_show"
								placeholder="请选择是否显示"
								@change="getList(1)"
							>
								<el-option label="不显示" value="0" />
								<el-option label="显示" value="1" />
							</el-select>
						</el-form-item>

						<!--						<el-form-item label="是否删除">-->
						<!--							<el-select-->
						<!--								v-model="form.is_del"-->
						<!--								placeholder="请选择是否删除"-->
						<!--								@change="getList(1)"-->
						<!--							>-->
						<!--								<el-option label="否" value="0" />-->
						<!--								<el-option label="是" value="1" />-->
						<!--							</el-select>-->
						<!--						</el-form-item>-->

						<!--						<el-button class="ResetSearch mr10" size="small" type="reset" @click="reset">重置</el-button>-->
						<el-button type="primary" label="default" size="small" @click="getList(1)">查询</el-button>
					</el-form>
				</div>
				<!-- e搜索区 -->

			</div>

			<!-- s表格 -->
			<el-table :data="tableData.data" style="width: 100%" size="small" highlight-current-row>

				<el-table-column prop="id" label="门店ID" min-width="130" />
				<el-table-column prop="name" label="门店名称" min-width="130" />
				<el-table-column prop="introduction" label="描述" min-width="100" />
				<el-table-column prop="phone" label="电话" min-width="100" />
				<el-table-column prop="address" label="门店地址" min-width="100" />
				<el-table-column prop="detailed_address" label="门店详细地址" min-width="100" />

				<el-table-column prop="image" label="门店图片" min-width="150">
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

				<el-table-column prop="latitude" label="纬度" min-width="100" />
				<el-table-column prop="longitude" label="经度" min-width="100" />
				<el-table-column prop="day_time" label="运营时间" min-width="100" />

				<el-table-column prop="add_time" label="创建时间" min-width="100">
					<template slot-scope="scope">
						<div>{{ $moment.unix(scope.row.add_time).format('YYYY-MM-DD HH:mm:ss') }}</div>
					</template>
				</el-table-column>

				<el-table-column prop="is_del" label="是否删除" min-width="100">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.is_del == 0">否</el-tag>
						<el-tag v-else type="success">是</el-tag>
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

	</div>
</template>

<script>
// import { mul, div } from '@/utils/compute'
// import moment from 'moment'
// import localstorage from '@/utils/localStorage'

import { GetEbSystemStoreList } from '@/api/snack'
export default {
	name: 'index',
	data() {
		return {
			form: {
				page: 1,
				limit: 10,
				is_show: '1',
				is_del: '0'
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
			GetEbSystemStoreList(this.form)
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
