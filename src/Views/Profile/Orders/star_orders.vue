<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import FsLightbox from "fslightbox-vue/v3";
import { OrderStatusEnum, CurrenceEnum } from '@/config/config.js'


export default {
	data() {
		return {
			data: {
				id: 0,
				messageReplay: "",
				startDate: null,
				endDate: null,
			},

			selectedOrder: {
				id: 0,
				image: [],
			},

			dataSearch: {
				vm: {
					ownerId: 0,
					announcementType: 0,
					statusId: 0,
					dateFrom: null,
					dateTo: null,
				},
				page: 1,
				pageSize: 99
			},
			dateFrom: null,
			dateTo: null,

			dataStatus: {
				orderId: 0,
				statusId: 0,
				messageReplay: "",
			},

			toggler: false,

			OrderStatus: OrderStatusEnum,

			testData: []
		}
	},
	mounted() {

	},
	components: {
		FsLightbox,
	},

	emits: {

	},

	created() {
		// Call the function from the store directly when the component is created
		this.initFunc();
	},

	computed: {
		...mapGetters("Code", ["getOrderStatusData", "getAnnouncementTypesData"]),
		...mapGetters("Orders", ["getOrdersData", "getOrderDateTime"]),
	},
	methods: {
		...mapActions("Code", ["GetOrderStatus", "GetAnnouncementTypes"]),
		...mapActions("Orders", ["GetUserStarVehiclesOrders", "UpdateStarVehicleOrder", "DeleteStarVehicleOrder", "UpdateStarVehicleOrderStatus"]),

		initFunc() {
			const loading = ElLoading.service({
				lock: true,
				background: 'rgba(0, 0, 0, 0.7)',
				text: "",
			});
			this.GetOrderStatus();
			this.GetUserStarVehiclesOrders(this.dataSearch).then(Response => {
				loading.close();
			}).catch(error => {
				if (error.response && error.response.status === 401) {
					this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
						hideProgressBar: 'false',
						position: 'top-center',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'warning',
						timeout: 3000,
					});
				} else {
					// Handle other errors with the provided message from the response
					this.$moshaToast(error.response?.data?.message || 'An error occurred', {
						hideProgressBar: 'false',
						position: 'top-center',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'warning',  // Default type is 'warning'
						timeout: 3000,
					});
				}
				loading.close();
			});
		},
		GetData() {
			this.GetUserStarVehiclesOrders(this.dataSearch).then(Response => {

			}).catch(error => {
				if (error.response && error.response.status === 401) {
					this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
						hideProgressBar: 'false',
						position: 'top-center',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'warning',
						timeout: 3000,
					});
				} else {
					// Handle other errors with the provided message from the response
					this.$moshaToast(error.response?.data?.message || 'An error occurred', {
						hideProgressBar: 'false',
						position: 'top-center',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'warning',  // Default type is 'warning'
						timeout: 3000,
					});
				}
			});
		},
		SearchChange() {
			this.GetData();
		},
		SearchDateChange() {
			if (this.dateFrom != null && this.dateTo != null) {
				this.dataSearch.vm.dateFrom = this.dateFrom;
				this.dataSearch.vm.dateTo = this.dateTo;
				this.SearchChange();
			}
		},

		updateFunc() {
			if (this.checkUpdateValidation()) {
				const loading = ElLoading.service({
					lock: true,
					background: 'rgba(0, 0, 0, 0.7)',
					text: "",
				});
				try {
					this.UpdateStarVehicleOrder(this.data).then((Response) => {
						this.$moshaToast('تم تعديل الطلب بنجاح', {
							hideProgressBar: 'false',
							showIcon: 'true',
							swipeClose: 'true',
							type: 'success',
							timeout: 3000,
						});
						loading.close();
						this.GetData();
						$('#update_modal').modal('hide');
					});
				} catch (error) {
					this.$moshaToast(error.response?.data?.message || 'An error occurred', {
						hideProgressBar: 'false',
						position: 'top-center',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'warning',
						timeout: 3000,
					});
					loading.close();
				}
			}
		},
		checkUpdateValidation() {
			if (this.data.startDate == null) {
				this.$moshaToast('أدخل تاريخ بداية الإعلان', {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				return false;
			} else if (this.data.endDate == null) {
				this.$moshaToast('أدخل تاريخ نهاية الإعلان', {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				return false;
			} else if (this.data.endDate < this.data.startDate) {
				this.$moshaToast('قم بإدخال تاريخ العرض بشكل صحيح', {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				return false;
			}
			return true;
		},

		DeleteFunc() {
			if (this.checkDeleteValidation()) {

				const loading = ElLoading.service({
					lock: true,
					background: 'rgba(0, 0, 0, 0.7)',
					text: "",
				});

				this.DeleteStarVehicleOrder(this.data.id).then(Response => {
					this.$moshaToast('تمت عملية الحذف بنجاح', {
						hideProgressBar: 'false',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'success',
						timeout: 3000,
					});

					loading.close();
					this.GetData();
					$('#delete_modal').modal('hide');
				}).catch(error => {
					if (error.response && error.response.status === 401) {
						this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
							hideProgressBar: 'false',
							position: 'top-center',
							showIcon: 'true',
							swipeClose: 'true',
							type: 'warning',
							timeout: 3000,
						});
					} else {
						// Handle other errors with the provided message from the response
						this.$moshaToast(error.response?.data?.message || 'An error occurred', {
							hideProgressBar: 'false',
							position: 'top-center',
							showIcon: 'true',
							swipeClose: 'true',
							type: 'warning',  // Default type is 'warning'
							timeout: 3000,
						});
					}
					loading.close();
				});
			}
		},
		checkDeleteValidation() {
			if (this.data.orderId == 0) {
				this.$moshaToast('هنالك خطأ في التحديد', {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				return false;
			}
			return true;
		},

		ChangeStatusFunc() {
			if (this.checkChangeStatusValidation()) {
				const loading = ElLoading.service({
					lock: true,
					background: 'rgba(0, 0, 0, 0.7)',
					text: "",
				});
				this.UpdateStarVehicleOrderStatus(this.dataStatus).then(Response => {
					this.$moshaToast('تمت عملية تعديل الحالة بنجاح', {
						hideProgressBar: 'false',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'success',
						timeout: 3000,
					});
					loading.close();
					this.GetData();
					$('#change_status_modal').modal('hide');
				}).catch(error => {
					if (error.response && error.response.status === 401) {
						this.$moshaToast(this.$t('general_user_not_allow_error_message'), {
							hideProgressBar: 'false',
							position: 'top-center',
							showIcon: 'true',
							swipeClose: 'true',
							type: 'warning',
							timeout: 3000,
						});
					} else {
						// Handle other errors with the provided message from the response
						this.$moshaToast(error.response?.data?.message || 'An error occurred', {
							hideProgressBar: 'false',
							position: 'top-center',
							showIcon: 'true',
							swipeClose: 'true',
							type: 'warning',  // Default type is 'warning'
							timeout: 3000,
						});
					}
					loading.close();
				});
			}
		},
		checkChangeStatusValidation() {
			if (this.dataStatus.orderId === 0) {
				this.$moshaToast('هنالك خطأ في تحديد الطلب', {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				return false;
			} else if (this.dataStatus.statusId === 0) {
				this.$moshaToast('إختر نوع الحالة المرادة', {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				return false;
			}
			return true;
		},

		selectItem(id) {
			const foundItem = this.getOrdersData.orders.data.find(element => element.id === id);
			if (foundItem) {
				this.data.id = foundItem.id;
				this.dataStatus.orderId = foundItem.id;
			}
		},

		selectItemForUpdate(id) {
			this.clearData();
			const loading = ElLoading.service({
				lock: true,
				background: 'rgba(0, 0, 0, 0.7)',
				text: "",
			});
			const foundItem = this.getOrdersData.orders.data.find(element => element.id === id);
			if (foundItem) {
				this.data.id = foundItem.id;
				this.data.messageReplay = foundItem.messageReplay;
				this.data.startDate = this.formatDate(foundItem.startDate);
				this.data.endDate = this.formatDate(foundItem.endDate);
				loading.close();
			} else {
				loading.close();
			}

		},
		showImages(id) {
			console.log("images show : ", id);
		},
		clearData() {
			this.data.id = 0;
			this.data.messageReplay = "";
			this.data.startDate = null;
			this.data.endDate = null;
		},
		OpenFullScreenFunc(id) {
			this.selectedOrder.image = [];
			const foundItem = this.getOrdersData.orders.data.find(element => element.id === id);
			if (foundItem && foundItem.vehicleImage != "") {
				if (!Array.isArray(this.selectedOrder.image)) {
					this.selectedOrder.image = []; // Initialize as an empty array if not already
				}
				this.selectedOrder.image.push(foundItem.vehicleImage);
				this.toggler = !this.toggler;
			}

		},
		OpenFullScreenBillFunc(id) {
			this.selectedOrder.image = [];
			const foundItem = this.getOrdersData.orders.data.find(element => element.id === id);
			if (foundItem && foundItem.billImage != "") {
				if (!Array.isArray(this.selectedOrder.image)) {
					this.selectedOrder.image = []; // Initialize as an empty array if not already
				}
				this.selectedOrder.image.push(foundItem.billImage);
				this.toggler = !this.toggler;
			}

		},
		formatDate(dateString) {
			// Convert the date string to yyyy-MM-dd
			const date = new Date(`${dateString}Z`);
			return date.toISOString().split('T')[0];
		},

		formatCurrency(value, currency) {
			let currencyCode = "";

			switch (currency) {
				case CurrenceEnum.USD:
					currencyCode = "ILS";
					break;
				case CurrenceEnum.JOD:
					currencyCode = "JOD";
					break;
				default:
					currencyCode = "ILS";
			}

			return new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: currencyCode,
				// Allows up to 1 decimal digit
				maximumFractionDigits: 1
			}).format(value);
		},

	}
};
</script>
<template>

	<div class="col-12 col-lg-9 order">
		<div class="container white_card px-4 pt-4 pb-0 mt-3 mt-lg-0 right-side">
			<div class="table-responsive">
				<table class="table text-center">
					<thead>
						<tr>
							<th class="text-center">#</th>
							<th class="text-center">إسم المعلن</th>
							<th class="text-center">الرسالة</th>
							<th class="text-center">رد الرسالة</th>
							<th class="text-center">تاريخ البداية</th>
							<th class="text-center">تاريخ النهاية</th>
							<th class="text-center">السعر الإجمالي</th>
							<th class="text-center">حالة الدفع</th>
							<th class="text-center">الفاتورة</th>
							<th class="text-center">صورة المركبة</th>
							<th class="text-center">الحالة</th>
							<th class="text-center">خيارات</th>

							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in getOrdersData.orders.data">
							<td class="id">{{ index + 1 }}</td>
							<td>{{ item.userName }}</td>
							<td>{{ item.message }}</td>
							<td>{{ item.messageReplay }}</td>
							<td>{{ formatDate(item.startDate) }}</td>
							<td>{{ formatDate(item.endDate) }}</td>
							<td>{{ formatCurrency(item.totalPrice, 0) }}</td>
							<!-- <td class="text-center"> -->
							<!-- مدفوع -->
							<!-- <img v-if="item.isPayed == true" src="/images/icons_true.png" alt="show"> -->
							<!-- غير مدفوع -->
							<!-- <img v-else src="/images/icons8-false.png" alt="show"> -->
							<!-- </td> -->
							<td><img v-on:click="OpenFullScreenFunc(item.id)" :src="item.billImage"
									class="img-responsive table-img" alt="bill image" height="80">
							</td>
							<td><img v-on:click="OpenFullScreenBillFunc(item.id)" :src="item.image"
									class="img-responsive table-img" alt="image" height="80"></td>
							<td>
								<span v-if="item.statusId == orderStatus.accepted" class="availabe">{{ item.statusName }}</span>
								<span v-else-if="item.statusId == orderStatus.pending" class="warning">{{ item.statusName }}</span>
								<span v-else class="not-availabe">{{ item.statusName }}</span>
							</td>
							<td>
								<a class="option">تعديل</a>
								<a class="option del">حذف</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>


	<!-- update order -->
	<div class="modal fade" id="update_modal" aria-hidden="true" role="dialog">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">تعديل الطلب</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div>
						<div class="row form-row">
							<div class="col-12 col-sm-12">
								<div class="form-group">
									<label>رسالة الرد</label>
									<textarea v-model="data.messageReplay" type="text" class="form-control"
										maxlength="255"></textarea>
								</div>
							</div>
							<div class="col-12 col-sm-12">
								<div class="form-group">
									<label>تاريخ بدابة العرض</label>
									<input v-model="data.startDate" type="date" class="form-control">
								</div>
							</div>
							<div class="col-12 col-sm-12">
								<div class="form-group">
									<label>تاريخ نهاية العرض</label>
									<input v-model="data.endDate" type="date" class="form-control">
								</div>
							</div>
						</div>
						<button v-on:click="updateFunc()" class="btn btn-primary btn-block">حفظ</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /update order -->

	<!-- status change -->
	<div class="modal fade" id="change_status_modal" aria-hidden="true" role="dialog">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">تعديل الحالة</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div>
						<div class="row form-row">
							<div class="col-12 col-sm-12">
								<div class="form-group">
									<label>الحالة</label>
									<select v-model="dataStatus.statusId" class="form-control"
										aria-label="Default select example">
										<option value="0" key="0" selected>-- إختر الحالة --</option>
										<option v-for="item in getOrderStatusData" :value="item.id" :key="item.id">
											{{ item.name }}</option>
									</select>
								</div>
							</div>
							<div class="col-12 col-sm-12">
								<div class="form-group">
									<label>رسالة الرد</label>
									<textarea v-model="dataStatus.messageReplay" type="text" class="form-control"
										maxlength="255"></textarea>
								</div>
							</div>
						</div>
						<button v-on:click="ChangeStatusFunc()" class="btn btn-primary btn-block">حفظ</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /status change -->

	<!-- Delete Modal -->
	<div class="modal fade" id="delete_modal" aria-hidden="true" role="dialog">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<!--	<div class="modal-header">
							<h5 class="modal-title">Delete</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>-->
				<div class="modal-body">
					<div class="form-content p-2">
						<h4 class="modal-title">حذف</h4>
						<p class="mb-4">إنتبه سيتم حذف العنصر?</p>
						<button type="button" v-on:click="DeleteFunc()" class="btn btn-primary">حذف </button>
						<button type="button" class="btn btn-danger" data-dismiss="modal">إغلاق</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /Delete Modal -->

	<FsLightbox :toggler="toggler" :sources="selectedOrder.image" type="image" />

</template>
<style scoped>
.text-right a {
	margin-left: 5px;
}

.modal-body button {
	margin: 5px;
}
</style>