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
		...mapGetters("Payment", ["getPaymentMovementsData"]),
	},
	methods: {
		...mapActions("Code", ["GetOrderStatus", "GetAnnouncementTypes"]),
		...mapActions("Payment", ["GetUserPaymentMovements"]),

		initFunc() {
			const loading = ElLoading.service({
				lock: true,
				background: 'rgba(0, 0, 0, 0.7)',
				text: "",
			});
			this.GetOrderStatus();
			this.GetUserPaymentMovements().then(Response => {
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
			this.GetUserPaymentMovements().then(Response => {

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
			const foundItem = this.getPaymentMovementsData.find(element => element.id === id);
			if (foundItem && foundItem.payingBilImage != "") {
				if (!Array.isArray(this.selectedOrder.payingBilImage)) {
					this.selectedOrder.image = []; // Initialize as an empty array if not already
				}
				this.selectedOrder.image.push(foundItem.payingBilImage);
				this.toggler = !this.toggler;
			}

		},

		formatDateTime(dateString) {
			const date = new Date(dateString);
			if (isNaN(date)) return '';

			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');

			let hours = date.getHours();
			const minutes = String(date.getMinutes()).padStart(2, '0');

			const ampm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours : 12; // Convert 0 to 12
			const formattedHours = String(hours).padStart(2, '0');

			return `${year}-${month}-${day} ${formattedHours}:${minutes} ${ampm}`;
		},

		formatCurrency(value, currency) {
			let currencyCode = "";

			switch (currency) {
				case CurrenceEnum.USD:
					currencyCode = "USD";
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
				minimumFractionDigits: 0, // No decimals
				maximumFractionDigits: 0  // No decimals
			}).format(value);
		},
	}
};
</script>
<template>

	<div class="col-12 col-lg-9 payment">
		<div class="container white_card px-4 pt-4 pb-0 mt-3 mt-lg-0 right-side">
			<div v-if="!getPaymentMovementsData || getPaymentMovementsData.length === 0"
				class="alert alert-danger mt-3 d-flex justify-content-center">
				{{ $t('general_empty_table') }}
			</div>
			<div v-else class="table-responsive">
				<table class="table text-center">
					<thead>
						<tr>
							<th class="text-center">#</th>
							<th class="text-center">المبلغ</th>
							<!-- <th class="text-center">نوع العملية</th> -->
							<th class="text-center">الاسم</th>
							<th class="text-center">البريد الالكتروني</th>
							<th class="text-center"> طريقة الدفع</th>
							<th class="text-center">الفاتورة</th>
							<th class="text-center">تاريخ العملية</th>
							<th class="text-center"> وصف العملية </th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in getPaymentMovementsData">
							<td class="id">{{ index + 1 }}</td>
							<td> 
								<!-- {{ formatCurrency(item.amount, item.currency) }}  -->
								{{ item.amount }} 

							</td>
							<!-- <td>طلب تمييز</td> -->
							<td>{{ item.paidname }}</td>
							<td>{{ item.paidEmail }}</td>
							<td> {{ item.paymentMethod }} </td>

							<td><img loading="lazy" v-on:click="OpenFullScreenBillFunc(item.id)" :src="item.payingBilImage"
									class="img-responsive table-img" alt="image" height="80"></td>

							<td> {{ formatDateTime(item.createdAt) }} </td>
							<td> {{ item.description }} </td>
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