<script>
import { reactive, provide } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { ElLoading } from 'element-plus';
import ServiceWindow from './Views/ServiceWindow.vue';
import { ParentEnum } from '@/config/config.js'


export default {
	data() {
		return {
			data: {},
			dataNotification: {
				page: 1,
				pageSize: 1000,
			},
		};
	},

	components: {
		ServiceWindow,
	},

	computed: {
		...mapGetters('Interfaces', ['getInterfaceItemsData']),
		...mapGetters('Code', ['getCodesData']),

		// Determine if the public site should be available or show maintenance page
		// Uses Codes (parent = SiteStatus) and looks for name = 'site_available'
		isSiteAvailable() {
			const codes = Array.isArray(this.getCodesData) ? this.getCodesData : [];

			// Find the site status code by name
			const foundItem = codes.find((el) => el.name === 'site_available');

			// If not configured, default to available
			if (!foundItem) {
				return true;
			}

			// value: 0 => false (site OFF), 1 => true (site ON)
			return Number(foundItem.value) === 1;
		},
	},

	mounted() {
		this.initFunc();
	},

	methods: {
		...mapActions('Visit', ['RecordVisit']),
		...mapActions('Announcement', [
			'GetMainAnnouncementActiveOrder',
			'GetVerticalAnnouncementActiveOrder',
			'GetHorizontalAnnouncementActiveOrder',
		]),
		...mapActions('Orders', ['GetStarActiveVehicles']),
		...mapActions('NotificationsAndMessages', [
			'GetUserNotifications',
			'ReadNotReadNotifications',
		]),
		...mapActions('Code', ['GetStates', 'GetCities', 'GetConstants', 'GetCodesByParent']),
		...mapActions('Users', ['GetWebSiteComunicationInfo']),
		...mapActions('Vehicles', ['GetVehiclesFavoriteId']),
		...mapActions('Interfaces', ['GetInterfacesItems']),

		async initFunc() {
			const loading = ElLoading.service({
				lock: true,
				background: 'rgba(0, 0, 0, 0.7)',
				text: '',
			});

			this.recordVisit();
			await this.GetCodesByParent({ parent1: ParentEnum.SiteStatus });
			this.GetStates();
			this.GetCities();
			this.GetConstants();
			
			// Load interface items so availability flag can be read
			this.GetInterfacesItems();

			if (this.isTokenValid()) {
				this.GetVehiclesFavoriteId();
				this.GetUserNotifications(this.dataNotification);
			}

			try {
				await Promise.all([
					this.GetMainAnnouncementActiveOrder(),
					this.GetVerticalAnnouncementActiveOrder(),
					this.GetHorizontalAnnouncementActiveOrder(),
					this.GetStarActiveVehicles(),
					this.GetWebSiteComunicationInfo(),
				]);
			} catch (error) {
				console.error('Error loading data:', error);
			} finally {
				loading.close();
			}
		},

		/////////// for visit ///////////
		async recordVisit() {
			try {
				const visitData = {
					ip: '',
					userAgent: navigator.userAgent,
					route: this.$route.path,
				};

				this.RecordVisit(visitData)
					.then(() => {})
					.catch((error) => {
						console.log(error.response.data.message);
					});
			} catch (error) {
				console.error('Error fetching IP:', error);
			}
		},

		isTokenValid() {
			const token = localStorage.getItem('token');

			if (!token || typeof token !== 'string' || !token.includes('.')) {
				console.warn('Token is missing or invalid structure');
				return false;
			}

			try {
				const parts = token.split('.');
				if (parts.length !== 3) {
					console.warn('Token does not have 3 parts');
					return false;
				}

				const base64Payload = parts[1]
					.replace(/-/g, '+') // base64url to base64
					.replace(/_/g, '/');

				const decodedPayload = JSON.parse(atob(base64Payload));
				const currentTime = Math.floor(Date.now() / 1000);

				return decodedPayload.exp > currentTime;
			} catch (error) {
				console.error('Token decoding failed:', error);
				return false;
			}
		},
	},
};
</script>

<template>
	<!-- When site availability is false, show only maintenance window -->
	<ServiceWindow v-if="!isSiteAvailable" />
	<router-view v-else />
</template>

<style scoped></style>
