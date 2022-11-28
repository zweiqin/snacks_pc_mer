import request from '@/utils/request.js'

/*
 **
 **工单相关接口
 **
 */

// 门店列表
export function GetEbSystemStoreList(data) {
	return request.get('/v1/EbSystemStore/GetEbSystemStoreList', data)
}

// 列表
export function GetEbStoreProductList(data) {
	return request.get('/v1/EbStoreProduct/GetEbStoreProductList', data)
}

// 列表
export function GetExpirationTimeProduct(data) {
	return request.get('/v1/EbStoreProduct/GetExpirationTimeProduct', data)
}

// 列表
export function GetEbStoreOrderList(data) {
	return request.get('/v1/EbStoreOrder/GetEbStoreOrderList', data)
}

// 支付图片
export function GetPayImage(data) {
	return request.get('/v1/SystemPayImg/GetPayImage', data)
}

// 发货时间
export function GetDeliveryTime(data) {
	return request.get('/v1/EbSystemDeliveryTime/GetDeliveryTime', data)
}

// 发货时间
export function EditEbSystemDeliveryTimeById(data) {
	return request.put('/v1/EbSystemDeliveryTime/EditEbSystemDeliveryTimeById', data)
}

// 发货时间
export function GetEbDeliveryServiceList(data) {
	return request.get('/v1/EbDeliveryService/GetEbDeliveryServiceList', data)
}

// 发货时间
export function ChangePayStatus(data) {
	return request.put('/v1/EbStoreOrder/ChangePayStatus', data)
}

// 发货时间
export function UpdateDeliveryInfo(data) {
	return request.put('/v1/EbStoreOrder/UpdateDeliveryInfo', data)
}

// 配送金额
export function GetMinPrice(data) {
	return request.get('/v1/SystemDeliveryMin/GetMinPrice', data)
}

// 配送金额
export function ChangeMinPrice(data) {
	return request.put('/v1/SystemDeliveryMin/ChangeMinPrice', data)
}

// // 新增或修改安装人员
// export function OperateInstaller(data) {
// 	return request.post('/v1/installer/OperateInstaller', data)
// }
//
// // 为工单分配安装人员
// export function SetInstaller(data) {
// 	return request.put('/v1/order/SetInstaller', data)
// }
//
// // 审核工单
// export function ExamineWorkOrder(data) {
// 	return request.put('/v1/order/ExamineWorkOrder', data)
// }
