<template>
	<div class="shop">
		<el-card class="el-card">
			<div slot="header">
				<el-form :inline="true" :model="search_form" class="demo-form-inline">
					<!--					<el-form-item label="商品名称">-->
					<!--						<el-input v-model="search_form.name" placeholder="请输入商品名称" size="small"></el-input>-->
					<!--					</el-form-item>-->
					<el-form-item label="商品状态">
						<el-select v-model="search_form.is_show" placeholder="请选择商品状态" size="small" @change="getProductList">
							<el-option label="全部" value=""></el-option>
							<el-option label="上架" value="1"></el-option>
							<el-option label="下架" value="0"></el-option>
						</el-select>
						<!--						<el-button size="small" type="primary" @click="search">查询</el-button>-->
					</el-form-item>
				</el-form>
				<el-upload
					style="display: inline;margin-left: 20px"
					class="upload-demo"
					:action="upload_url"
					:show-file-list="false"
					accept=".xlsx,.xls"
					:headers="upload_header"
					:data="upload_data"
					:file-list="fileList"
					:before-upload="beforeUploadFile"
					:on-success="handleAvatarSuccess"
					:on-error="handleAvatarError"
				>
					<el-button size="small" type="primary">批量增加商品</el-button>
				</el-upload>
				<el-button size="small" style="margin-left: 20px" type="success" @click="downloadShopList">下载商品列表
				</el-button>
				<el-upload
					:action="modify_upload_url"
					:before-upload="beforeUploadFile"
					:data="upload_data"
					:file-list="fileList"
					:headers="upload_header"
					:on-success="handleModifySuccess"
					:on-error="handleModifyError"
					:show-file-list="false"
					accept=".xlsx,.xls"
					class="upload-demo"
					style="display: inline;margin-left: 20px"
				>
					<el-button size="small" type="primary">批量修改商品</el-button>
				</el-upload>
			</div>
			<!--s 商品表格      -->
			<el-table :data="shop_list.data">
				<el-table-column prop="id" label="商品ID" min-width="130" />
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
				<el-table-column label="商品名称" min-width="240" prop="store_name"></el-table-column>
				<el-table-column prop="store_info" label="商品简介" min-width="100" />
				<el-table-column label="售价" min-width="100" prop="price"></el-table-column>
				<el-table-column label="成本价" min-width="100" prop="cost"></el-table-column>
				<el-table-column label="商品分类 | 商品分类id" min-width="120" prop="cate_name">
					<template v-slot="scope">
						<span>{{ scope.row.cate_name + ' | ' + scope.row.cate_id }}</span>
					</template>
				</el-table-column>
				<!--				<el-table-column label="供应商 | 供应商id" min-width="100" prop="supplier_name">-->
				<!--					<template v-slot="scope">-->
				<!--						<span>{{ scope.row.supplier_name + ' | ' + scope.row.supplier_id }}</span>-->
				<!--					</template>-->
				<!--				</el-table-column>-->
				<el-table-column prop="stock" label="库存" min-width="100" />
				<el-table-column prop="expiration_time" label="过期时间" min-width="100" :style="{color:'red'}">
					<template v-slot="scope">
						<span :style="{color:new Date(scope.row.expiration_time).getTime()>new Date().getTime()?'red':''}">{{ scope.row.expiration_time }}</span>
					</template>
				</el-table-column>
				<el-table-column label="商品状态" min-width="100" prop="is_show">
					<template v-slot="scope">
						<el-tag v-if="scope.row.is_show == 1" type="success">上架
						</el-tag>
						<el-tag v-else type="danger">下架</el-tag>
					</template>
				</el-table-column>
			</el-table>
			<!--			&lt;!&ndash;分页      &ndash;&gt;-->
			<!--			<el-pagination-->
			<!--				:current-page="search_form.page"-->
			<!--				:page-size="search_form.limit"-->
			<!--				:total="shop_list.total"-->
			<!--				:page-sizes="[10, 20, 30, 40]"-->
			<!--				@size-change="handleSizeChange"-->
			<!--				@current-change="handleCurrentChange"-->
			<!--			></el-pagination>-->
		</el-card>
	</div>
</template>

<script>
import { getToken } from '@/utils/auth'
import localStorage from '@/utils/localStorage'
// import { GetProductList } from '@/api/shop'
import { GetEbStoreProductList as GetProductList, GetExpirationTimeProduct } from '@/api/snack'
import exportXlsxPopulate from '@/utils/export-table'

export default {
	name: 'shop',
	data() {
		return {
			search_form: {
				is_show: '',
				is_del: '0'
			},
			shop_list: {
				data: [],
				total: 0
			},
			upload_url: process.env.VUE_APP_BASE_API + '/v1/EbStoreProduct/UploadProduct', // 批量增加商品地址
			modify_upload_url: process.env.VUE_APP_BASE_API + '/v1/EbStoreProduct/UpdateByImport', // 批量修改商品地址
			fileList: [],
			upload_header: {
				token: getToken()
			},
			upload_data: {
				admin_id: localStorage.get('admin_info').admin_id
			},
			shop_arr: [{
				value: 'id',
				label: 'id',
				isShow: true
			}, {
				value: 'store_name',
				label: '商品名称',
				isShow: true
			}, {
				value: 'price',
				label: '售价',
				isShow: true
			}, {
				value: 'cost',
				label: '成本价',
				isShow: true
			}, {
				value: 'cate_id',
				label: '商品分类ID',
				isShow: true
			}, {
				value: 'supplier_id',
				label: '过期日期',
				isShow: true
			}, {
				value: 'is_show',
				label: '商品状态',
				isShow: true
			}, {
				value: 'unit_name',
				label: '单位',
				isShow: true
			}, {
				value: 'stock',
				label: '库存',
				isShow: true
			}, {
				value: 'is_modified',
				label: '是否更改',
				isShow: true
			}]
		}
	},
	created() {
		this.getProductList()
	},
	methods: {
		// 获取商品列表
		getProductList() {
			GetProductList(this.search_form)
				.then((res) => {
					// 每一行添加一个是否更改的属性，用于在下载的时候生成是否更改的列，最终适用于批量修改商品处
					res.data.items.forEach((item) => {
						item.is_modified = 0
					})
					this.shop_list.data = res.data.items
				})
				.catch((err) => {
					this.$message.error(err.data.msg)
				})
		},
		// 下载商品列表
		downloadShopList() {
			exportXlsxPopulate(this.shop_list, '商品列表', this.shop_arr)
		},
		// handleSizeChange(val) {
		// 	this.search_form.limit = val
		// 	this.getProductList()
		// },
		// handleCurrentChange(val) {
		// 	this.search_form.page = val
		// 	this.getProductList()
		// },
		// 限制上传文件类型
		beforeUploadFile(file) {
			const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
			const isXls = extension === 'xls'
			const isXlsx = extension === 'xlsx'
			if (!isXls && !isXlsx) {
				this.$message.warning('只能上传excel的文件')
			}
			return isXls || isXlsx
		},
		// 上传成功
		handleAvatarSuccess(response, file, fileList) {
			console.log(response, file, fileList)
			response.status === 200 ? this.$message.success('批量增加商品成功') : this.$message.error('批量上传商品失败')
			this.getProductList()
		},
		// 批量修改成功
		handleModifySuccess(response, file, fileList) {
			response.status === 200 ? this.$message.success('批量修改商品成功') : this.$message.error('批量修改商品失败')
			this.getProductList()
		},
		// 批量上传
		handleAvatarError(err, file, fileList) {
			this.$message.error('批量上传商品失败')
		},
		// 批量修改
		handleModifyError(err, file, fileList) {
			this.$message.error('批量修改商品失败')
		},
		// 查询商品
		search() {
			this.getProductList()
		}
	}
}
</script>

<style lang='scss' scoped>
.shop {
  .el-card {
    margin: 20px;
  }
}
</style>
