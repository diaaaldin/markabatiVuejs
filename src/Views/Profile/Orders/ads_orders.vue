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

			orderStatus: OrderStatusEnum,

			testData: [],
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
		...mapActions("Orders", ["GetAnnouncementOrder", "GetUserAnnouncementOrders", "CreateAnnouncementOrder", "UpdateAnnouncementOrder", "DeleteAnnouncementOrder"]),

		initFunc() {
			const loading = ElLoading.service({
				lock: true,
				background: 'rgba(0, 0, 0, 0.7)',
				text: "",
			});
			this.GetOrderStatus();
			this.GetAnnouncementTypes();
			this.GetUserAnnouncementOrders(this.dataSearch).then(Response => {
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
			this.GetUserAnnouncementOrders(this.dataSearch).then(Response => {

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
		<div class="ads">
			<div class="add">
				<router-link :to="{ name: 'profile_add_ads' }" class="option">{{
					$t('profile_btn_addAnnouncement') }}
					<svg viewBox="0 0 24 24" width="20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path opacity="0.4"
								d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z"
								fill="#292D32"></path>
							<path
								d="M16 11.25H12.75V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V11.25H8C7.59 11.25 7.25 11.59 7.25 12C7.25 12.41 7.59 12.75 8 12.75H11.25V16C11.25 16.41 11.59 16.75 12 16.75C12.41 16.75 12.75 16.41 12.75 16V12.75H16C16.41 12.75 16.75 12.41 16.75 12C16.75 11.59 16.41 11.25 16 11.25Z"
								fill="#292D32"></path>
						</g>
					</svg>

				</router-link>

			</div>
		</div>
		<div class="container white_card px-4 pt-4 pb-0 mt-3 mt-lg-0 right-side">
			<div class="table-responsive">
				<table class="table text-center">
					<thead>
						<tr>
							<th class="text-center">#</th>
							<th class="text-center">إسم المعلن</th>
							<th class="text-center">نوع الإعلان</th>
							<th class="text-center">الرسالة</th>
							<th class="text-center">رد الرسالة</th>
							<th class="text-center">تاريخ البداية</th>
							<th class="text-center">تاريخ النهاية</th>
							<th class="text-center">السعر الإجمالي</th>
							<!-- <th class="text-center">حالة الدفع</th> -->
							<th class="text-center">الفاتورة</th>
							<th class="text-center">صورة الإعلان</th>
							<th class="text-center">الحالة</th>
							<th class="text-center">خيارات</th>

							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in getOrdersData.orders.data">
							<td class="id">{{ index + 1 }}</td>
							<td>{{ item.userName }}</td>
							<td>{{ item.announcementTypeName }}</td>
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
								<span v-if="item.statusId == orderStatus.accepted" class="availabe">{{ item.statusName
								}}</span>
								<span v-else-if="item.statusId == orderStatus.pending" class="warning">{{
									item.statusName }}</span>
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

.profile .ads {
	margin-bottom: 77px;
}
</style>