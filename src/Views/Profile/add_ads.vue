<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import cropperMainAnnouncement from '@/components/cropper/announcementMainCropper.vue';
import cropperHorizentalAnnouncement from '@/components/cropper/announcementHorizentalCropper.vue';
import { AnnouncementTypeEnum } from '@/config/config.js'


export default {
	data() {
		return {
			data: {
				Id: 0,
				message: "",
				image: "",
				durationDay: 0,
				announcementType: 0,
				totalPrice: 0,
				payBilImage: "",
				paymentMethod: 0,
			},

			//////////////////////////
			imageCropperSrc: null,
			base64Images: [],
			myFiles: [],

			AnnouncementType: AnnouncementTypeEnum,
			announcementPriceInDay: 0,
			orderDate: "",
			// editor: null,
		}
	},

	mounted() {
	},

	components: {
		cropperMainAnnouncement,
		cropperHorizentalAnnouncement,
	},

	emits: {

	},

	created() {
		// Call the function from the store directly when the component is created
		//this.checkUserAllowFunc();
		this.initFunc();
	},

	computed: {
		...mapGetters("Code", ["getAnnouncementTypesData"]),
		...mapGetters("Orders", ["getOrderDateTime"]),
	},
	methods: {
		...mapActions("Code", ["GetAnnouncementTypes"]),
		...mapActions("Orders", ["CreateAnnouncementOrder", "GetAnnouncementOrderDate"]),

		async initFunc() {
			this.GetAnnouncementTypes();
		},

		checkUserAllowFunc() {
			// if (localStorage.getItem('typeName') != "Store") {
			//     this.$router.push({ name: 'storeLogin' });
			// }
		},

		createFunc() {
			if (this.checkAddValidation()) {
				const loading = ElLoading.service({
					lock: true,
					background: 'rgba(0, 0, 0, 0.7)',
					text: "",
				});

				try {
					// Proceed only if validation passes

					this.CreateAnnouncementOrder(this.data).then((Response) => {
						this.$moshaToast('تم إضافة الإعلان بنجاح', {
							hideProgressBar: 'false',
							showIcon: 'true',
							swipeClose: 'true',
							type: 'success',
							timeout: 3000,
						});
						loading.close();
						this.$router.push({ name: "profile_ads_orders" });
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
		checkAddValidation() {
			if (this.data.announcementType == 0) {
				this.$moshaToast('إختر نوع الإعلان', {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				return false;
			} else if (this.data.image == "") {
				this.$moshaToast('أضف صورة الإعلان', {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				return false;
			} else if (this.data.durationDay == 0) {
				this.$moshaToast('حددالطلب بالأيام', {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				return false;
			} else if (this.data.durationDay > 30) {
				this.$moshaToast('الحد الأقصى للإعلان 30 يوم', {
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

		calculateTotalPrice() {
			let totalPrice = 0;
			if (this.data.announcementType > 0) {
				let foundItem = this.getAnnouncementTypesData.find(element => element.id === this.data.announcementType);
				if (foundItem) {
					totalPrice = foundItem.value * this.data.durationDay;
					this.announcementPriceInDay = foundItem.value;
				}

				return this.formatCurrency(totalPrice);
			}
		},
		////////////////////////////
		////////////////////////////
		////////////////////////////

		checkImageDimensions(image) {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.onload = () => {
					if (img.width > img.height) {
						resolve(false); // Width greater than height, return false
					} else {
						resolve(true); // Valid dimensions, return true
					}
				};
				img.onerror = () => {
					reject(new Error("Failed to load image."));
				};
				img.src = image; // Trigger the image loading
			});
		},

		handleImageUpload(event) {
			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = async (e) => {
					try {
						const isValid = await this.checkImageDimensions(e.target.result);
						if (!isValid) {
							this.$moshaToast('في الإعلان الجانبي يجب أن يكون الطول أكبر من العرض', {
								hideProgressBar: 'false',
								position: 'top-center',
								showIcon: 'true',
								swipeClose: 'true',
								type: 'warning',
								timeout: 3000,
							});
						} else {
							this.data.image = e.target.result;
							this.imageCropperSrc = e.target.result; // Update with the file's data URL
						}
					} catch (err) {
						console.error("Error checking image dimensions:", err);
					}
				};
				reader.onerror = () => {
					console.error("Failed to read the file.");
				};
				reader.readAsDataURL(file);
			}
		},



		toggleCropperModal() {
			if ($('#cropper_modal').is(':visible')) {
				$('#cropper_modal').modal('hide');
			} else {
				$('#cropper_modal').modal('show');
			}
		},

		cropperImageLoud(imageFile) {
			this.imageCropperSrc = URL.createObjectURL(imageFile);
		},

		changeAnnouncementTypeFunc() {
			this.data.image = "";
			this.orderDate = "";
			this.imageCropperSrc = null;
			this.GetAnnouncementOrderDate(this.data.announcementType).then((Response) => {
				console.log("Response : ", Response);
				let stringDate = this.formatDate(Response);
				this.orderDate = stringDate;
			});

		},

		// formatDate(dateString) {
		// 	// Convert the date string to yyyy-MM-dd
		// 	const date = new Date(`${dateString}Z`);
		// 	return date.toISOString().split('T')[0];
		// },

		formatDate(dateString) {
			const date = new Date(dateString);
			if (isNaN(date)) return '';
			return date.getFullYear() + '-' +
				String(date.getMonth() + 1).padStart(2, '0') + '-' +
				String(date.getDate()).padStart(2, '0');
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
	<div class="col-12 col-lg-9 add_vehicle">
		<div class="container white_card px-4 pt-4 pb-0 mt-3 mt-lg-0 right-side">

			<!-- Page Header -->
			<div class="page-header">
				<div class="row">
					<div class="col-sm-12">
						<h3 class="page-title">إضافة اعلان جديد</h3>
					</div>
				</div>
			</div>


			<!-- /Page Header -->
			<div class="row ">
				<div class="row form-row justify-content-center">
					<div class="col-12 col-sm-12">
						<div class="form-group">
							<label>رسالة</label>
							<textarea v-model="data.message" rows="3" id="content" type="text"
								class="form-control"></textarea>

						</div>
					</div>

					<div class="col-12 col-md-12">
						<div class="form-group">
							<label>نوع الإعلان</label>
							<select v-model="data.announcementType" v-on:change="changeAnnouncementTypeFunc()"
								class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp">
								<option value="0" key="0" selected>--إختر نوع الإعلان المرادة --</option>
								<option v-for="item in getAnnouncementTypesData" :key="item.id" :value="item.id">
									{{ item.name }}
								</option>
							</select>
						</div>
					</div>

					<div class="col-12 col-md-12">
						<div class="form-group">
							<label>مدة الطلب بالأيام</label>
							<input v-model="data.durationDay" asp-for="addition" type="number"
								placeholder="عدد أيام الطلب"
								class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp" />

						</div>
					</div>


					<div class="card mt-5" v-if="data.announcementType > 0">
						<div class="card-body">
							<div class="col-12" v-if="data.announcementType === AnnouncementType.vertical">
								<div class="box py-2 px-3 mb-3 rounded-3 cropper">
									<!-- Label for the file input -->
									<label class="w-100 h-100">
										<input type="file" accept="image/*" @change="handleImageUpload" class="d-none"
											ref="fileInput" />
										<div class="icon"></div>
										<h5 class="text-center">أضف صورة الإعلان</h5>
										<img src="/images/plus-icon.svg" alt=""
											class="d-block mx-auto rounded-circle p-2" />
										<p class="mb-0 text-center">صورة الإعلان.</p>
									</label>
								</div>
								<div v-if="imageCropperSrc" class="imageCropper">
									<img :src="imageCropperSrc" alt="imageCropper" />
								</div>
							</div>
							<div class="col-12" v-else>
								<div class="box py-2 px-3 mb-3 rounded-3 cropper" v-on:click="toggleCropperModal()">
									<label class="w-100 h-100">
										<div class="icon"></div>
										<h5 class="text-center">أضف صورة الإعلان</h5>
										<img src="/images/plus-icon.svg" alt=""
											class="d-block mx-auto rounded-circle p-2" />
										<p class="mb-0 text-center">صورة الإعلان.</p>
									</label>
								</div>
								<div v-if="imageCropperSrc" class="imageCropper">
									<img :src="imageCropperSrc" alt="imageCropper">
								</div>
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
							تكلفة الإعلان لليوم ₪0 والتكلفة الإجمالية للإعلان ₪0
						</p>
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
							التاريخ المرجح أن يعرض به الإعلان في حال تمت الموافقة {{ this.orderDate }}
						</p>
					</div>


				</div>
			</div>




			<div class="mb-5">
				<button v-on:click="createFunc()" class="add full">إضافة اعلان جديد</button>
			</div>



		</div>



	</div>



	<div class="modal fade" id="cropper_modal" aria-hidden="true" role="dialog">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">الصورة الرئيسية للمركبة</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div>

						<div v-if="data.announcementType === AnnouncementType.main">
							<cropperMainAnnouncement @b64image="(x) => data.image = x"
								@IsShow="(x) => toggleCropperModal()" @copperImage="(x) => cropperImageLoud(x)">
							</cropperMainAnnouncement>
						</div>
						<div v-else-if="data.announcementType === AnnouncementType.horizontal">
							<cropperHorizentalAnnouncement @b64image="(x) => data.image = x"
								@IsShow="(x) => toggleCropperModal()" @copperImage="(x) => cropperImageLoud(x)">
							</cropperHorizentalAnnouncement>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


</template>
<style scoped>
.imageCropper {
	background-color: #f1f0ef;
	/* White background for the box */
	border: 1px solid #ddd;
	/* Light grey border for subtle separation */
	border-radius: 8px;
	/* Rounded corners for a softer look */
	padding: 10px;
	/* Padding around the image */
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	/* Subtle shadow for depth */
	display: flex;
	/* Flexbox for centering content */
	justify-content: center;
	/* Center horizontally */
	align-items: center;
	/* Center vertically */
	max-width: 100%;
	/* Ensure it does not exceed container width */
	max-height: 400px;
	/* Limit height to maintain aspect ratio */
	overflow: hidden;
	/* Hide overflow for better image handling */
}

/* Style for the image inside the box */
.imageCropper img {
	max-width: 100%;
	/* Responsive width */
	max-height: 100%;
	/* Responsive height */
	border-radius: 4px;
	/* Slightly rounded corners on the image */
}

.filepond--drop-label {
	font-family: cairo !important;
	font-weight: bold !important;
}

.text-right a {
	margin-left: 5px;
}

.modal-body button {
	margin: 5px;
}

.invalid-feedback-custom {
	color: #dc3545;
	display: block;
	margin-top: .25rem;
	font-size: 80%;
}

.add_vehicle .page-header {
	margin-bottom: 20px;
}

.add_vehicle .page-title {
	font-size: 22px;
	font-weight: 400;
	color: #26d829;

}

.title-select {
	color: #26d829;

}

.add_vehicle .add {
	background-color: #ddf9dd;
	padding: 0 8px;
	border-radius: 5px;
	color: var(--main-color);
	margin: 0 5px;
	cursor: pointer;
	transition: var(--main-transition);
	border: none;
	padding: 5px 10px;
}

.add_vehicle .add.full {
	width: 100%;
	margin-bottom: 20px;
	padding: 15px 0;
	font-weight: bold;
}

.add_vehicle .add:hover {
	background-color: var(--main-color);
	color: white;
}

.remove button {
	transition: var(--main-transition);

}

.remove button:hover {
	background-color: #fd756b;
}

.remove button:hover svg g path {
	fill: #fff;
}

.warning {
	padding: 10px 10px;
	border-radius: 10px;
}
</style>