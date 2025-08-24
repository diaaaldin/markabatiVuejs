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

			orderStatus: OrderStatusEnum,

			testData: []
		}
	},
	mounted() {
		console.log("this.orderStatus : ", this.orderStatus);

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

				this.UpdateStarVehicleOrder(this.data).then(Response => {
					this.$moshaToast(this.$t('general_update_operation_success_message'), {
						hideProgressBar: 'false',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'success',
						timeout: 3000,
					});

					loading.close();
					this.GetData();
					$('#update_modal').modal('hide');
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
		checkUpdateValidation() {
			if (this.data.id == 0) {
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
		deleteFunc() {
			if (this.checkDeleteValidation()) {

				const loading = ElLoading.service({
					lock: true,
					background: 'rgba(0, 0, 0, 0.7)',
					text: "",
				});

				this.DeleteStarVehicleOrder(this.data.id).then(Response => {
					this.$moshaToast(this.$t('general_delete_operation_success_message'), {
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
			if (this.data.id == 0) {
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
				this.data.id = foundItem.id;
				this.data.message = foundItem.message;
				this.data.startDate = foundItem.startDate;
				this.data.endDate = foundItem.endDate;
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
			<div v-if="!getOrdersData.orders.data || getOrdersData.orders.data.length === 0"
				class="alert alert-danger mt-3 d-flex justify-content-center">
				{{ $t('general_empty_table') }}
			</div>

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
							<!-- <th class="text-center">حالة الدفع</th> -->
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
							<!-- <img loading="lazy" v-if="item.isPayed == true" src="/images/icons_true.png" alt="show"> -->
							<!-- غير مدفوع -->
							<!-- <img loading="lazy" v-else src="/images/icons8-false.png" alt="show"> -->
							<!-- </td> -->
							<td><img loading="lazy" v-on:click="OpenFullScreenBillFunc(item.id)" :src="item.billImage"
									class="img-responsive table-img" alt="bill image" height="80">
							</td>
							<td><img loading="lazy" v-on:click="OpenFullScreenFunc(item.id)" :src="item.vehicleImage"
									class="img-responsive table-img" alt="image" height="80"></td>
							<td>
								<span v-if="item.statusId == orderStatus.accepted" class="availabe">{{ item.statusName
									}}</span>
								<span v-else-if="item.statusId == orderStatus.pending" class="warning">{{
									item.statusName }}</span>
								<span v-else class="not-availabe">{{ item.statusName }}</span>
							</td>
							<td>
								<a class="option" data-bs-toggle="modal" data-bs-target="#update_modal"
									v-on:click="selectItem(item.id)">تعديل</a>
								<a class="option del" data-bs-toggle="modal" data-bs-target="#delete_modal"
									v-on:click="selectItem(item.id)">حذف</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- update modal -->
	<div class="modal fade" id="update_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel"> تعديل طلب تمييز المركبة</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="row form-row">
						<div class="col-12 col-sm-12">
							<div class="form-group">
								<label>رسالة</label>
								<textarea v-model="data.message" type="text" class="form-control"
									maxlength="255"></textarea>
							</div>

						</div>
					</div>

					<div class="col-12 mt-3 mb-3">
						<!-- <h5 class="page-title">ملاحظات</h5> -->
						<p class="warning">
							<svg width="22px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 279.682 279.682"
								xml:space="preserve" fill="#000000">
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<g>
										<path style="fill:#e7c409;"
											d="M143.25,55.486c-41.06,0-74.465,33.405-74.465,74.465c0,16.824,5.511,32.711,15.938,45.939 c1.998,2.536,4.15,5.033,6.23,7.448c6.212,7.208,12.078,14.017,14.166,21.675c0.045,0.165,0.438,1.773,0.38,7.247l-0.01,0.791 c-0.063,4.444-0.147,10.528,4.352,15.091c3.081,3.125,7.399,4.645,13.204,4.645h40.272c6.268,0,10.774-1.534,13.776-4.689 c4.061-4.267,3.789-9.779,3.608-13.427c-0.032-0.645-0.066-1.296-0.074-1.944c-0.065-5.48,0.345-7.025,0.362-7.09 c2.121-7.657,8.993-15.732,15.057-22.855c2.023-2.377,3.934-4.622,5.714-6.879c10.431-13.23,15.944-29.12,15.944-45.951 C217.705,88.892,184.305,55.486,143.25,55.486z M189.982,166.614c-1.607,2.036-3.429,4.178-5.358,6.445 c-7.07,8.307-15.084,17.722-18.089,28.572c-0.429,1.546-0.988,4.395-0.905,11.273c0.01,0.835,0.049,1.675,0.091,2.507 c0.032,0.657,0.075,1.523,0.071,2.209c-0.528,0.086-1.325,0.166-2.475,0.166h-40.272c-1.276,0-2.022-0.135-2.405-0.237 c-0.198-0.977-0.17-3.007-0.152-4.287l0.012-0.844c0.072-6.919-0.483-9.789-0.907-11.348c-2.98-10.936-10.575-19.749-17.275-27.524 c-2.066-2.398-4.019-4.664-5.813-6.942c-8.32-10.557-12.718-23.232-12.718-36.654c0-32.789,26.676-59.465,59.465-59.465 c32.783,0,59.455,26.676,59.455,59.465C202.705,143.379,198.306,156.058,189.982,166.614z">
										</path>
										<path style="fill:#e7c409;"
											d="M161.766,239.564h-37.041c-7.995,0-14.5,6.505-14.5,14.5v11.117c0,7.995,6.505,14.5,14.5,14.5 h37.041c7.995,0,14.5-6.505,14.5-14.5v-11.117C176.266,246.069,169.761,239.564,161.766,239.564z M161.266,264.682h-36.041v-10.117 h36.041V264.682z">
										</path>
										<path style="fill:#e7c409;"
											d="M143.245,45.779c4.143,0,7.5-3.357,7.5-7.5V7.5c0-4.143-3.357-7.5-7.5-7.5 c-4.143,0-7.5,3.357-7.5,7.5v30.779C135.745,42.422,139.103,45.779,143.245,45.779z">
										</path>
										<path style="fill:#e7c409;"
											d="M241.917,34.598c-2.858-2.995-7.606-3.106-10.604-0.248l-22.77,21.73 c-2.997,2.859-3.107,7.607-0.248,10.604c1.474,1.544,3.448,2.322,5.427,2.322c1.86,0,3.725-0.688,5.177-2.074l22.77-21.731 C244.666,42.342,244.776,37.594,241.917,34.598z">
										</path>
										<path style="fill:#e7c409;"
											d="M264.273,109.599c-0.004,0-0.008,0-0.012,0l-29.311,0.047c-4.143,0.007-7.495,3.37-7.488,7.512 c0.007,4.139,3.363,7.488,7.5,7.488c0.004,0,0.008,0,0.012,0l29.311-0.047c4.143-0.007,7.495-3.37,7.488-7.512 C271.767,112.948,268.41,109.599,264.273,109.599z">
										</path>
										<path style="fill:#e7c409;"
											d="M74.386,64.684c2.859-2.996,2.749-7.743-0.248-10.604l-22.77-21.73 c-2.994-2.858-7.742-2.749-10.604,0.248c-2.859,2.996-2.749,7.743,0.248,10.604l22.77,21.731c1.452,1.386,3.315,2.074,5.177,2.074 C70.937,67.006,72.912,66.228,74.386,64.684z">
										</path>
										<path style="fill:#e7c409;"
											d="M44.729,109.646l-29.31-0.047c-0.004,0-0.008,0-0.012,0c-4.137,0-7.493,3.351-7.5,7.488 c-0.007,4.142,3.346,7.505,7.488,7.512l29.31,0.047c0.004,0,0.008,0,0.012,0c4.137,0,7.493-3.351,7.5-7.488 C52.225,113.016,48.872,109.652,44.729,109.646z">
										</path>
									</g>
								</g>
							</svg>
							في حال أردت تعديل معلومات أخرى في طلب الإعلان بإمكانك التواصل مع فريق الدعم بالموقع من خلال
							خدمة تواصل معنا .
						</p>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" v-on:click="updateFunc()" class="btn btn-primary">حفظ</button>
				</div>
			</div>
		</div>
	</div>
	<!-- /update modal  -->

	<!-- Delete Modal -->

	<div class="modal fade" id="delete_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">حذف طلب التمييز</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					تنبـيــه سيتم حذف الطلب
				</div>
				<div class="modal-footer">
					<button type="button" v-on:click="deleteFunc()" class="btn btn-primary">حـذف</button>
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