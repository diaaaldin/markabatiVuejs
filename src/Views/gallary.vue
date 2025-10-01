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
				this.pagination = this.getUserVehiclesData.vehicles.pagination;

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
				this.pagination = this.getUserVehiclesData.vehicles.pagination;
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
			let res = this.getStatesData.find(x => x.id === id);
			if (res) return res.name;
			else return "";
		},
		cityNameFunc(id) {
			let res = this.getCitiesData.find(x => x.id === id);
			if (res) return res.name;
			else return "";
		},

		goToPage(page) {
			if (page < 1 || page > this.pagination.pageCount) return;
			this.dataSearch.page = page;
			this.SearchChangeFunc();
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
								= <button class="btn-contact-x">تواصل معنا</button>
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
					<div class="row">
						<productCard v-for="item in this.getUserVehiclesData.vehicles.data" :product='item'>
						</productCard>

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
									<a href="#" @click.prevent="goToPage(pagination.currentPage - 1)">
										<i class="fa-solid fa-arrow-right"></i>
									</a>
								</li>
								<li v-for="page in pagination.pageCount" :key="page"
									:class="{ active: pagination.currentPage === page }">
									<a href="#" @click.prevent="goToPage(page)">
										{{ page }}
									</a>
								</li>
								<li :class="{ disabled: pagination.currentPage === pagination.pageCount }">
									<a href="#" @click.prevent="goToPage(pagination.currentPage + 1)">
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

</template>
<style scoped></style>