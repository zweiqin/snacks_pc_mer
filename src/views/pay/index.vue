<template>
	<div>
		<el-card class="box-card">

			<div class="flex-center">
				<div style="margin-bottom: 20px">支付图片</div>

				<div>
					<el-image :src="src" fit="contain" :preview-src-list="[src]" style="width: 400px; height: 400px">
						<div slot="placeholder">
							加载中<span>...</span>
						</div>
					</el-image>
				</div>

				<div style="margin-top: 20px">
					<el-button type="primary" round size="medium" @click="upload_visible = true">上传图片</el-button>
				</div>
			</div>

		</el-card>

		<!-- s 附件上传 -->
		<el-dialog :visible.sync="upload_visible" title="附件上传" width="50%">
			<el-upload
				ref="upload"
				class="upload-demo"
				:action="upload_url"
				:headers="upload_headers"
				:data="uploadForm"
				name="file"
				:with-credentials="false"
				accept=".jpg,.jpeg,.png,.JPG,.JPEG"
				:on-remove="handleRemove"
				:on-success="handleSuccess"
				:on-error="handleError"
				:before-upload="beforeAvatarUpload"
				list-type="text"
				:file-list="fileList"
				:limit="1"
				:on-exceed="handleExceed"
			>
				<el-button size="small" type="primary">点击上传</el-button>
				<!--        <div slot="tip" class="el-upload__tip">只能上传zip,rar,7z文件</div>-->
				<div slot="tip" class="el-upload__tip">只能上传png,jpg,jpeg文件</div>
			</el-upload>
		</el-dialog>
		<!-- e 附件上传 -->

	</div>
</template>

<script>
import { GetPayImage } from '@/api/snack'
import { getToken } from '@/utils/auth'

export default {
	name: 'index',
	data() {
		return {
			src: '',
			upload_visible: false,
			upload_url: process.env.VUE_APP_BASE_API + 'v1/SystemPayImg/EditSystemPayImg', // 附件上传地址
			upload_headers: {
				token: getToken()
			},
			uploadForm: {
				id: 1
			},
			fileList: [] // 附件列表

		}
	},
	computed: {
	},
	mounted() {
		// this.getList(1)
		this.getPic()
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
		getPic() {
			GetPayImage({ })
				.then((res) => {
					this.src = res.data
				})
				.catch((err) => {
					this.$message.error(err.data.data || err.data.msg)
				})
		},
		// s上传附件相关函数
		handleRemove(file, fileList) {
			this.fileList = fileList
		},
		handleSuccess(res, file) {
			console.warn('handleSuccess', res, file)
			if (res.status === 200) {
				this.fileList = []
				this.upload_visible = false
				this.$message({
					message: '上传成功',
					type: 'success'
				})
				// this.getAllFile()
			} else {
				this.$message.error(res.msg)
				this.fileList = []
			}
		},
		handleError(err, file) {
			this.$message({
				message: '上传失败',
				type: 'error'
			})
		},
		beforeAvatarUpload(file) {
			// const isZip = file.name.endsWith('.zip') || file.name.endsWith('.rar') || file.name.endsWith('.7z')
			// if (!isZip) {
			//   this.$message.error('上传文件只能是 zip rar 7z 格式!')
			// }
			// return isZip
			const isPic = file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')
			if (!isPic) {
				this.$message.error('上传文件只能是 png jpg jpeg 格式!')
			}
			return isPic
		},
		handleExceed(files, fileList) {
			this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
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
  align-items: center;
}

</style>
