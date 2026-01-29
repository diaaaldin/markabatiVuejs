<script>
import { useHead } from '@vueuse/head'

import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';

import pageFooter from '@/components/footer.vue';
import pageNav from '@/components/lightNavbar.vue';
import productCard from '@/components/Cards/productCard.vue';


export default {

	data() {
		return {

			dataSearch: {
				userId: 0,
				page: 1,
				pageSize: 12
			},

			pagination: {
				currentPage: 1,
				pageCount: 3,
				pageSize: 3,
				rowCount: 9,
			},
			windowWidth: window.innerWidth,
		}
	},

	watch: {
		data: {
			immediate: true,
			handler() {
				if (this.getUserVehiclesData) {
					let stateName = this.stateNameFunc(this.getUserVehiclesData.addressStateId);
					useHead({
						title: `${this.getUserVehiclesData.name} | مركبتي`,
						meta: [
							{
								name: 'description',
								content: `تصفح سيارات ${this.getUserVehiclesData.name} المعروضة للبيع في ${stateName} عبر منصة مركبتي. سيارات جديدة ومستعملة بأسعار منافسة ومواصفات متنوعة.`,
							},
							{
								name: 'keywords',
								content: `${this.getUserVehiclesData.name}, سيارات للبيع في ${stateName}, سيارات مستعملة, سيارات جديدة, معارض سيارات في ${stateName}, بيع سيارات ${stateName}, سيارات ${this.getUserVehiclesData.name} , مركبتي فلسطين`,
							},
							{
								name: 'robots',
								content: 'index, follow',
							},
							{
								name: 'author',
								content: 'مركبتي'
							},
							{
								charset: 'UTF-8'
							},
							{
								name: 'language',
								content: 'ar'
							},
							{
								'http-equiv': 'Content-Language',
								content: 'ar'
							}
						],
						htmlAttrs: {
							lang: 'ar',
							dir: 'rtl'
						},
						link: [
							{
								rel: 'canonical',
								href: window.location.href
							}
						]
					});
				}
			},
			immediate: true, // Run immediately when component mounts
			deep: true // Watch nested properties
		},
	},

	mounted() {
		this.recordVisit();
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	},

	components: {
		pageNav,
		pageFooter,
		productCard
	},

	emits: {

	},

	created() {
		this.initFunc();
	},

	computed: {
		...mapGetters("Code", ["getStatesData", "getCitiesData"]),
		...mapGetters("Vehicles", ["getUserVehiclesData"]),

		vehiclesList() {
			if (!this.getUserVehiclesData || !this.getUserVehiclesData.vehicles || !this.getUserVehiclesData.vehicles.data) {
				return [];
			}
			return this.getUserVehiclesData.vehicles.data;
		},

		hasVehicles() {
			return this.vehiclesList && this.vehiclesList.length > 0;
		},

		userImage() {
			const imageUrl = this.getUserVehiclesData && this.getUserVehiclesData.image
				? this.getUserVehiclesData.image
				: "/img/profile-icon.png";
			return imageUrl;
		},

		startItem() {
			return (this.pagination.currentPage - 1) * this.pagination.pageSize + 1;
		},
		endItem() {
			return Math.min(this.pagination.currentPage * this.pagination.pageSize, this.pagination.rowCount);
		},
		visiblePages() {
			const total = this.pagination.pageCount;
			const current = this.pagination.currentPage;
			const pages = [];
			
			// For mobile: show max 3 pages, for desktop: show max 5 pages
			const maxVisible = this.windowWidth < 768 ? 3 : 5;
			
			if (total <= maxVisible) {
				// Show all pages if total is less than max visible
				for (let i = 1; i <= total; i++) {
					pages.push(i);
				}
			} else {
				// Show pages around current page
				let start = Math.max(1, current - Math.floor(maxVisible / 2));
				let end = Math.min(total, start + maxVisible - 1);
				
				// Adjust start if we're near the end
				if (end - start < maxVisible - 1) {
					start = Math.max(1, end - maxVisible + 1);
				}
				
				for (let i = start; i <= end; i++) {
					pages.push(i);
				}
			}
			
			return pages;
		}
	},

	methods: {
		...mapActions("Code", ["GetStates", "GetCities"]),
		...mapActions("Vehicles", ["GetUserVehicles"]),
		...mapActions("Visit", ["RecordVisit"]),

		initFunc() {
			const loading = ElLoading.service({
				lock: true,
				background: 'rgba(0, 0, 0, 0.7)',
				text: "",
			});
			const path = window.location.pathname;
			const lastSection = path.split('/').pop(); // Get the last section of the URL
			const idMatch = lastSection.match(/^\d+/); // Match numbers at the start of the string
			const id = idMatch ? parseInt(idMatch[0], 10) : null;


			this.dataSearch.userId = id;
			this.GetUserVehicles(this.dataSearch).then(Response => {
				if (this.getUserVehiclesData && this.getUserVehiclesData.vehicles && this.getUserVehiclesData.vehicles.pagination) {
					this.pagination = this.getUserVehiclesData.vehicles.pagination;
				}

				loading.close();
			}).catch(error => {
				this.$moshaToast(error.response.data.message, {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				loading.close();
			});
		},
		SearchChangeFunc() {
			this.GetData();
		},
		GetData() {
			const loading = ElLoading.service({
				lock: true,
				background: 'rgba(0, 0, 0, 0.7)',
				text: "",
			});

			this.GetUserVehicles(this.dataSearch).then(Response => {
				if (this.getUserVehiclesData && this.getUserVehiclesData.vehicles && this.getUserVehiclesData.vehicles.pagination) {
					this.pagination = this.getUserVehiclesData.vehicles.pagination;
				}
				loading.close();
			}).catch(error => {
				this.$moshaToast(error.response.data.message, {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				loading.close();
			});
		},

		stateNameFunc(id) {
			if (!this.getStatesData || !Array.isArray(this.getStatesData)) {
				return "";
			}
			let res = this.getStatesData.find(x => x.id === id);
			if (res) return res.name;
			else return "";
		},
		cityNameFunc(id) {
			if (!this.getCitiesData || !Array.isArray(this.getCitiesData)) {
				return "";
			}
			let res = this.getCitiesData.find(x => x.id === id);
			if (res) return res.name;
			else return "";
		},

		goToPage(page) {
			if (page < 1 || page > this.pagination.pageCount) return;
			this.dataSearch.page = page;
			this.SearchChangeFunc();
		},

		handleResize() {
			this.windowWidth = window.innerWidth;
		},

		async recordVisit() {
			try {
				// Create the visitData object 	
				const visitData = {
					ip: "", // Get the user's IP from the fetched data
					userAgent: navigator.userAgent,
					route: this.$route.path
				};
				// Log the visitData for debugging
				// If needed, send the data to your backend
				this.RecordVisit(visitData).then(Response => {
				}).catch(error => {
					console.log(error.response.data.message);
				});
			} catch (error) {
				// Handle any errors (network issues, API failure, etc.)
				console.error("Error fetching IP:", error);
			}
		},

		ownerImageFunc(imgae) {
			const imageUrl = imgae
				? imgae
				: "/img/seller/seller.png";

			return imageUrl;
		},

		whatsAppLinkFunc() {
			let rawNumber = this.getUserVehiclesData.mobile;

			// Clean and normalize the number
			let cleanNumber = rawNumber
				.replace(/\D/g, '')         // remove all non-digit characters
				.replace(/^00/, '')         // remove leading 00 if exists
				.replace(/^0+/, '')         // remove local leading 0 if needed
				;

			const link = `https://wa.me/${cleanNumber}`;
			console.log('Final WhatsApp link:', link);
			window.open(link, '_blank');
		},
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.handleResize);
	}
};
</script>
<template>
	<pageNav></pageNav>
	<div class="gallary">
		<div class="header-title bg text-center">
			<div class="container text-center">
				<div class="img"><img loading="lazy" :src="userImage" class="" alt="..."></div>
				<div class="card-body">
					<div class="d-flex justify-content-center align-items-baseline mb-2">
						<h1 class="card-title justify-content-center">{{ this.getUserVehiclesData.name }}</h1>
					</div>
					<div class="d-flex justify-content-center">
						<div class="d-flex flex-column">
							<div class="d-flex align-items-center mb-2">
								<ul class="addresul text-center">
									<li>{{ cityNameFunc(this.getUserVehiclesData.addressCityId) }} / {{
										stateNameFunc(this.getUserVehiclesData.addressStateId) }}</li>
									<li>{{ this.getUserVehiclesData.AddressInfo }}</li>
								</ul>
							</div>
							<div class="card-show ">
								<div class="d-flex justify-content-center">
									<ul class="contact text-center">
										<li> للتواصل: {{ this.getUserVehiclesData.mobile }} </li>
									</ul>
								</div>

							</div>
							<div class="d-flex justify-content-center">
								<button class="btn-contact-x" data-bs-toggle="modal" data-bs-target="#contact_with_seller_modal">
									تواصل معنا
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<div class="container white_card mt-2">

					<div class="clearfix"></div>
					<div v-if="!hasVehicles" class="alert alert-danger mt-3 d-flex justify-content-center">
						{{ $t('general_empty_table') }}
					</div>
					<div v-else class="row">
						<productCard v-for="item in vehiclesList" :key="item.id" :product='item'></productCard>
					</div>
					<!-- <div class="row">
						<div class="pag">
							<p class="count">أظهر 1 من 5</p>
							<ul class="pagination">
								<li><a href="#"><i class="fa-solid fa-arrow-right"></i></a></li>
								<li class="active"><a href="#">1</a></li>
								<li><a href="#">2</a></li>
								<li><a href="#">3</a></li>
								<li><a href="#"><i class="fa-solid fa-arrow-left"></i></a></li>
							</ul>
						</div>
					</div> -->
					<div class="row">
						<div class="pag">
							<p class="count">
								أظهر {{ startItem }} إلى {{ endItem }} من {{ pagination.rowCount }}
							</p>
							<ul class="pagination">
								<li :class="{ disabled: pagination.currentPage === 1 }">
									<a href="#" @click.prevent="goToPage(pagination.currentPage - 1)" class="pagination-link">
										<i class="fa-solid fa-arrow-right"></i>
									</a>
								</li>
								<li v-if="visiblePages[0] > 1" class="pagination-ellipsis">
									<span>...</span>
								</li>
								<li v-for="page in visiblePages" :key="page"
									:class="{ active: pagination.currentPage === page }">
									<a href="#" @click.prevent="goToPage(page)" class="pagination-link">
										{{ page }}
									</a>
								</li>
								<li v-if="visiblePages[visiblePages.length - 1] < pagination.pageCount" class="pagination-ellipsis">
									<span>...</span>
								</li>
								<li :class="{ disabled: pagination.currentPage === pagination.pageCount }">
									<a href="#" @click.prevent="goToPage(pagination.currentPage + 1)" class="pagination-link">
										<i class="fa-solid fa-arrow-left"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>

				</div>
			</div>
		</div>

	</div>



	<pageFooter></pageFooter>

	<div class="modal fade" id="contact_with_seller_modal" tabindex="-1" aria-labelledby="exampleModalLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel"> تواصل مع البائع </h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="card seller_card">
						<div class="img">
							<img loading="lazy" :src="userImage" class=""
								alt="...">
						</div>
						<div class="card-body">
							<div class="d-flex justify-content-center align-items-baseline mb-2">
								<h6 class="card-title justify-content-center">{{ getUserVehiclesData.name }} </h6>
							</div>
							<div class="d-flex justify-content-center">
								<div class="d-flex flex-column">
									<div class="d-flex align-items-center mb-2">
										<ul class="addresul text-center">
											<li>{{ cityNameFunc(getUserVehiclesData.addressCityId) }} / {{
												stateNameFunc(getUserVehiclesData.addressStateId) }} </li>
											<li>{{ getUserVehiclesData.AddressInfo }}</li>
										</ul>
									</div>
									<div class="card-show">
										<div class="d-flex justify-content-center">
											<ul class="show-more-details text-center">
												<li><svg width="15" height="15" viewBox="0 0 28 28" fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<path
															d="M14 0.666748C21.3637 0.666748 27.3333 6.63628 27.3333 14.0001C27.3333 21.3638 21.3637 27.3334 14 27.3334C6.6362 27.3334 0.666666 21.3638 0.666666 14.0001C0.666666 6.63628 6.6362 0.666748 14 0.666748ZM18.2929 9.95964L12.3333 15.9191L9.7071 13.293C9.31659 12.9025 8.68341 12.9025 8.29289 13.293C7.90237 13.6835 7.90237 14.3166 8.29289 14.7071L11.6263 18.0405C12.0168 18.431 12.6499 18.431 13.0404 18.0405L19.7071 11.3738C20.0976 10.9833 20.0976 10.3502 19.7071 9.95964C19.3165 9.56912 18.6835 9.56912 18.2929 9.95964Z"
															fill="#24DC26"></path>
													</svg> للتواصل: {{ getUserVehiclesData.mobile }} </li>
											</ul>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button v-on:click="whatsAppLinkFunc()" type="button" class="btn btn-primary">
						راسل البائع
						<svg viewBox="0 0 24 24" width="24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M17.4145 14.3822C17.1173 14.2334 15.6564 13.5147 15.384 13.4153C15.1117 13.3162 14.9136 13.2667 14.7154 13.5641C14.5173 13.8615 13.9478 14.5309 13.7745 14.7293C13.6012 14.9275 13.4278 14.9524 13.1307 14.8036C12.8335 14.6549 11.876 14.3411 10.7411 13.3287C9.85769 12.5407 9.26129 11.5677 9.08799 11.2702C8.91461 10.9727 9.06943 10.8119 9.21822 10.6637C9.35195 10.5306 9.51546 10.3166 9.66399 10.1431C9.81257 9.96961 9.86209 9.84558 9.96114 9.6474C10.0602 9.44899 10.0107 9.27553 9.93634 9.12682C9.86209 8.97808 9.26779 7.51537 9.02016 6.92034C8.77895 6.34096 8.53397 6.41944 8.35157 6.41024C8.17844 6.40165 7.98013 6.39981 7.78207 6.39981C7.58397 6.39981 7.26201 6.47418 6.98958 6.77159C6.71727 7.06908 5.94959 7.78806 5.94959 9.25059C5.94959 10.7133 7.01434 12.1263 7.16296 12.3246C7.31158 12.523 9.25829 15.5244 12.2393 16.8116C12.9482 17.1178 13.5017 17.3006 13.9333 17.4375C14.6451 17.6637 15.2929 17.6318 15.805 17.5552C16.3759 17.47 17.5631 16.8364 17.8107 16.1424C18.0583 15.4481 18.0583 14.8532 17.984 14.7293C17.9097 14.6053 17.7116 14.5309 17.4145 14.3822ZM11.9925 21.7853H11.9886C10.2148 21.7846 8.47517 21.3081 6.9575 20.4075L6.59654 20.1932L2.85541 21.1746L3.85395 17.527L3.61899 17.153C2.62951 15.5792 2.10688 13.7603 2.10765 11.8925C2.10983 6.44257 6.54415 2.0086 11.9965 2.0086C14.6367 2.00954 17.1185 3.03905 18.9849 4.9075C20.8511 6.77582 21.8782 9.25932 21.8772 11.9005C21.875 17.3509 17.4408 21.7853 11.9925 21.7853ZM20.4052 3.48773C18.1599 1.2398 15.1739 0.00128304 11.9925 0C5.43736 0 0.102301 5.33471 0.0996495 11.8918C0.0987941 13.9879 0.646396 16.0337 1.68711 17.8373L0 24L6.30443 22.3462C8.04154 23.2937 9.99728 23.7931 11.9877 23.7937H11.9926C18.547 23.7937 23.8825 18.4585 23.8852 11.9013C23.8864 8.72361 22.6505 5.73566 20.4052 3.48777"
									fill="#000000"></path>
							</g>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>

</template>
<style scoped>
.modal-footer .btn-primary {
	border-radius: 30px;
	padding: 8px 30px;
	margin: 0 auto;
}

.modal-footer .btn-primary svg {
	margin-right: 10px;
}

.modal-footer .btn-primary svg path {
	fill: white;
}

.pag {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 15px;
	padding: 20px 0;
}

.pag .count {
	margin: 0;
	font-size: 14px;
	color: #666;
	text-align: center;
}

.pag .pagination {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 5px;
	list-style: none;
	padding: 0;
	margin: 0;
}

.pag .pagination li {
	min-width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
	border-radius: 8px;
	border: 1px solid #ccced2;
	transition: all 0.4s ease-in-out;
	cursor: pointer;
}

.pag .pagination li.disabled {
	opacity: 0.5;
	cursor: not-allowed;
	pointer-events: none;
}

.pag .pagination li.disabled a {
	pointer-events: none;
}

.pag .pagination li.pagination-ellipsis {
	border: none;
	background: transparent;
	cursor: default;
	min-width: auto;
	padding: 0 5px;
}

.pag .pagination li.pagination-ellipsis span {
	color: #666;
	font-size: 16px;
}

.pag .pagination li a {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #000;
	text-decoration: none;
	padding: 0 8px;
	-webkit-tap-highlight-color: transparent;
}

.pag .pagination li.active {
	background-color: black;
	border-color: black;
}

.pag .pagination li.active a {
	color: white;
}

.pag .pagination li:not(.disabled):not(.pagination-ellipsis):hover {
	background-color: black;
	border-color: black;
}

.pag .pagination li:not(.disabled):not(.pagination-ellipsis):hover a {
	color: white;
}

/* Mobile responsive styles */
@media screen and (max-width: 768px) {
	.pag {
		padding: 15px 0;
	}

	.pag .count {
		font-size: 12px;
		margin-bottom: 10px;
	}

	.pag .pagination {
		gap: 3px;
		width: 100%;
		justify-content: center;
	}

	.pag .pagination li {
		min-width: 36px;
		height: 36px;
		margin: 0;
		font-size: 14px;
	}

	.pag .pagination li a {
		padding: 0 4px;
		font-size: 14px;
	}

	.pag .pagination li.pagination-ellipsis {
		min-width: 20px;
		padding: 0 2px;
	}

	.pag .pagination li.pagination-ellipsis span {
		font-size: 14px;
	}
}

@media screen and (max-width: 480px) {
	.pag .pagination li {
		min-width: 32px;
		height: 32px;
		font-size: 12px;
	}

	.pag .pagination li a {
		font-size: 12px;
		padding: 0 2px;
	}
}
</style>