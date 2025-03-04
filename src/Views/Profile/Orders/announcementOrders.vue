<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import FsLightbox from "fslightbox-vue/v3";
import { OrderStatusEnum, CurrenceEnum } from '@/config/config.js'


export default {
	data() {
		return {
			data: {
				orderId: 0,
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

			testData:[],
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
		// this.initFunc();
	},

	computed: {
		...mapGetters("Code", ["getOrderStatusData", "getAnnouncementTypesData"]),
		...mapGetters("Orders", ["getOrdersData", "getOrderDateTime"]),
	},
	methods: {
		...mapActions("Code", ["GetOrderStatus", "GetAnnouncementTypes"]),
		...mapActions("Orders", ["GetAnnouncementOrder","GetAnnouncementOrders", "DeleteAnnouncementOrder", "UpdateAnnouncementOrderStatus"]),

		initFunc() {
			const loading = ElLoading.service({
				lock: true,
				background: 'rgba(0, 0, 0, 0.7)',
				text: "",
			});
			this.GetOrderStatus();
			this.GetAnnouncementTypes();
			this.GetAnnouncementOrders(this.dataSearch).then(Response => {
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
			this.GetAnnouncementOrders(this.dataSearch).then(Response => {

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
		DeleteFunc() {
			if (this.checkDeleteValidation()) {

				const loading = ElLoading.service({
					lock: true,
					background: 'rgba(0, 0, 0, 0.7)',
					text: "",
				});

				this.DeleteVehicle(this.data.orderId).then(Response => {
					this.$moshaToast('تمت عملية الحذف بنجاح', {
						hideProgressBar: 'false',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'success',
						timeout: 3000,
					});

					loading.close();
					this.GetAnnouncementOrders(this.dataSearch);
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
				this.UpdateAnnouncementOrderStatus(this.dataStatus).then(Response => {
					this.$moshaToast('تمت عملية تعديل الحالة بنجاح', {
						hideProgressBar: 'false',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'success',
						timeout: 3000,
					});
					loading.close();
					this.GetAnnouncementOrders(this.dataSearch);
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
				this.$moshaToast('هنالك خطأ في تحديد المركبة', {
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
				this.data.orderId = foundItem.id;
				this.dataStatus.orderId = foundItem.id;
			}
		},
		selectItemForUpdate(id) {
			const loading = ElLoading.service({
				lock: true,
				background: 'rgba(0, 0, 0, 0.7)',
				text: "",
			});
			this.GetAnnouncementOrder(id).then(Response => {
				loading.close();
				this.$router.push({ name: "update_announcement" });
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
		showImages(id) {
			console.log("images show : ", id);
		},
		clearData() {
			this.data.orderId = 0;
		},
		OpenFullScreenFunc(id) {
			this.selectedOrder.image = [];
			const foundItem = this.getOrdersData.orders.data.find(element => element.id === id);
			if (foundItem && foundItem.image != "") {
				if (!Array.isArray(this.selectedOrder.image)) {
					this.selectedOrder.image = []; // Initialize as an empty array if not already
				}
				this.selectedOrder.image.push(foundItem.image);
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
		goToAddAnnouncementFunc() {
			this.$router.push({ name: "add_announcement" });
		},
		formatDate(dateString) {
			// Convert the date string to yyyy-MM-dd
			const date = new Date(`${dateString}Z`);
			return date.toISOString().split('T')[0];
		},
		formatCurrency(value) {
			return new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: "ILS",
				// Allows up to 1 decimal digit
				maximumFractionDigits: 0
			}).format(value);
		}

	}
};
</script>
<template>
	<!-- Page Header -->
	<div class="page-header">
		<div class="row ">
			<div class="col-sm-12">
				<h3 class="page-title">إدارة الإعلانات</h3>
				<!-- <ul class="breadcrumb">
					<li class="breadcrumb-item active">إدارة المركبات</li>
				</ul> -->
			</div>
			<div class="col-12 row">
				
				<div class="col-3 text-left">
					<a href="javascript:void(0)" data-toggle="modal" v-on:click="goToAddAnnouncementFunc()"
						class="btn btn-primary float-left mt-2">إضافة إعلان جديد</a>
				</div>
			</div>
		</div>
	</div>
	<!-- /Page Header -->
	<div class="row">
		<div class="col-sm-12">
			<div class="card">
				<div class="card-body">
					<div class="table-responsive">
						<table class="datatable table table-hover table-center mb-0">
							<thead>
								<tr>
									<th class="text-center" >ID</th>
									<th class="text-center" >إسم المعلن</th>
									<th class="text-center" >الرسالة</th>
									<th class="text-center" >رد الرسالة</th>
									<th class="text-center" >تاريخ البداية</th>
									<th class="text-center" >تاريخ النهاية</th>
									<th class="text-center" >السعر الإجمالي</th>
									<th class="text-center" >حالة الدفع</th>
									<th class="text-center" >الفاتورة</th>
									<th class="text-center" >نوع الإعلان</th>
									<th class="text-center" >صورة الإعلان</th>
									<th class="text-center" >الحالة</th>

									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index ) in testData">
									<td class="text-center">{{ index + 1 }}</td>
									<td class="text-center">{{ item.userName }}</td>
									<td class="text-center">{{ item.message }}</td>
									<td class="text-center">{{ item.messageReplay }}</td>
									<td class="text-center">{{formatDate(item.startDate)  }}</td>
									<td class="text-center">{{formatDate(item.endDate)  }}</td>
									<td class="text-center">{{ formatCurrency(item.totalPrice) }} </td>
									<td class="text-center">
											<!-- مدفوع -->
											<img v-if="item.isPayed == true" src="/images/icons_true.png" alt="show">
											<!-- غير مدفوع -->
											<img v-else  src="/images/icons8-false.png" alt="show">
									</td>
									<td class="text-center">
										<img v-on:click="OpenFullScreenBillFunc(item.id)" :src="item.billImage"  class="img-responsive rounded" 
										alt="pay bill"
										height="80">
									</td>
									<td class="text-center">{{ item.announcementTypeName }}</td>

									<td class="text-center">
										<img v-on:click="OpenFullScreenFunc(item.id)" :src="item.image" class="img-responsive rounded" alt="announcement image"
											height="80">
									</td>
									<td class="text-center">
										<span v-if="item.statusId == OrderStatus.accepted"
											class="badge badge-pill bg-success inv-badge"> {{ item.statusName }}
										</span>
										<span v-else-if="item.statusId == OrderStatus.pending"
											class="badge badge-pill bg-warning inv-badge">{{ item.statusName }}</span>
										<span v-else class="badge badge-pill bg-danger inv-badge">{{ item.statusName
											}}</span>
									</td>
								

									<td class="text-right">
										<div class="actions">
											<a class="btn btn-sm bg-success-light" data-toggle="modal"
												v-on:click="selectItemForUpdate(item.id)">
												<i class="fe fe-pencil"></i> تعديل
											</a>
											<a class="btn btn-sm bg-success-light" data-toggle="modal"
												href="#change_status_modal" v-on:click="selectItem(item.id)">
												<i class="fe fe-pencil"></i> تعديل الحالة
											</a>
											<a data-toggle="modal" href="#delete_modal"
												class="btn btn-sm bg-danger-light" v-on:click="selectItem(item.id)">
												<i class="fe fe-trash"></i> حذف
											</a>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>


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
									<textarea v-model="dataStatus.messageReplay" type="text" class="form-control" maxlength="255"></textarea>
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