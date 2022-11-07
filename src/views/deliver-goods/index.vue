<template>
	<div>
		<el-card class="box-card">
			<div>
				<el-button type="primary" round size="medium" @click="edit_visible=true">增加配送时间</el-button>
			</div>

			<div class="flex-center">
				<div v-for="(item,index) in list" style="margin-top: 10px">
					<el-time-picker
						v-model="list[index]"
						:picker-options="{
							selectableRange: '00:00:00 - 23:59:59'
						}"
						placeholder="任意时间点"
						format="HH:mm"
						value-format="HH:mm"
					>
					</el-time-picker>
					<el-button type="danger" round size="medium" style="margin-left: 10px" @click="handleDelete(index)">删除</el-button>
				</div>
				<el-button v-if="list.length!==0" type="primary" round size="medium" style="margin-top: 10px" @click="handleChange()">确认修改</el-button>
			</div>

		</el-card>

		<!-- s编辑 -->
		<el-dialog title="增加配送时间" :close-on-click-modal="false" :visible.sync="edit_visible" class="edit" width="50%">
			<el-form ref="editForm" :model="editForm" :rules="editRules">
				<el-form-item label="配送时间" label-width="120px" prop="time">
					<!--					<el-time-select-->
					<!--						v-model="editForm.time"-->
					<!--						:picker-options="{-->
					<!--							start: '00:00',-->
					<!--							step: '00:01',-->
					<!--							end: '23:59'-->
					<!--						}"-->
					<!--						placeholder="选择时间"-->
					<!--					>-->
					<!--					</el-time-select>-->
					<el-time-picker
						v-model="editForm.time"
						:picker-options="{
							selectableRange: '00:00:00 - 23:59:59'
						}"
						placeholder="任意时间点"
						format="HH:mm"
						value-format="HH:mm"
					>
					</el-time-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="edit_submit('editForm')">确认添加</el-button>
			</div>
		</el-dialog>
		<!-- e编辑 -->

	</div>
</template>

<script>
import { GetDeliveryTime, EditEbSystemDeliveryTimeById, ChangePayStatus, UpdateDeliveryInfo } from '@/api/snack'

export default {
	name: 'index',
	data() {
		return {
			value: '',
			list: '',

			// 编辑
			edit_visible: false,
			editForm: {
				time: ''
			},
			editRules: {
				time: [ { required: true, message: '请选择要添加的时间', trigger: 'change' } ]
			}
		}
	},
	computed: {
	},
	created() {
	},
	mounted() {
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
					this.$message.success('增加成功')
					this.edit_visible = false
					this.getList()
				})
				.catch((err) => {
					this.$message.error(err.data.data || err.data.msg)
				})
		},
		// 编辑--确认
		edit_submit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// if (this.list.some((item) => item === this.editForm.time)) return this.$message.error('与已有时间重复')
					// const temp_num = Number(this.editForm.time.substring(0, 2)) * 60 + Number(this.editForm.time.substring(3, 5))
					// if (this.list.length === 0) {
					// 	this.list = [ this.editForm.time ]
					// } else if (this.list.length === 1) {
					//
					// }
					this.list.push(this.editForm.time)
					this.list.sort((a, b) => (Number(a.substring(0, 2)) * 60 + Number(a.substring(3, 5))) - (Number(b.substring(0, 2)) * 60 + Number(b.substring(3, 5))))
					this.handleEdit()
				} else {
					return false
				}
			})
		},
		handleDelete(index) {
			this.list.splice(index, 1)
			console.log(this.list)
			console.log(this.value)
			EditEbSystemDeliveryTimeById({ list: this.list })
				.then((res) => {
					this.getList()
					this.$message.success('删除成功')
				})
				.catch((err) => {
					this.$message.error(err.data.data || err.data.msg)
				})
		},
		handleChange() {
			EditEbSystemDeliveryTimeById({ list: this.list })
				.then((res) => {
					this.getList()
					this.$message.success('修改成功')
				})
				.catch((err) => {
					this.$message.error(err.data.data || err.data.msg)
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
