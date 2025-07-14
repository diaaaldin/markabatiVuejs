<script>
import { reactive, provide } from 'vue'
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';


export default {
	data() {
		return {
			data: {
			},
			dataNotification: {
				page: 1,
				pageSize: 1000
			},
		}
	},
	components: {
	},
	computed: {

	},

	mounted() {

	},
	created() {
		// Call the function from the store directly when the component is created
		this.initFunc();
	},

	methods: {
		...mapActions("Visit", ["RecordVisit"]),
		...mapActions("Announcement", ["GetMainAnnouncementActiveOrder", "GetVerticalAnnouncementActiveOrder", "GetHorizontalAnnouncementActiveOrder"]),
		...mapActions("Orders", ["GetStarActiveVehicles"]),
		...mapActions("NotificationsAndMessages", ["GetUserNotifications", "ReadNotReadNotifications"]),
		...mapActions("Code", ["GetStates", "GetCities" , "GetConstants"]),
		...mapActions("Users", ["GetWebSiteComunicationInfo"]),
		...mapActions("Vehicles", ["GetVehiclesFavoriteId"]),

		async initFunc() {
			const loading = ElLoading.service({
				lock: true,
				background: 'rgba(0, 0, 0, 0.7)',
				text: "",
			});
			this.GetStates();
			this.GetCities();
			this.GetConstants();
			
			if (this.isTokenValid()) {
				this.GetVehiclesFavoriteId();
			} 

			try {
				await Promise.all([
					this.recordVisit(),
					this.GetMainAnnouncementActiveOrder(),
					this.GetVerticalAnnouncementActiveOrder(),
					this.GetHorizontalAnnouncementActiveOrder(),
					this.GetStarActiveVehicles(),
					this.GetUserNotifications(this.dataNotification),
					this.GetWebSiteComunicationInfo(),


				]);
			} catch (error) {
				console.error("Error loading data:", error);
			} finally {
				loading.close();
			}
		},

		/////////// for visit ///////////
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

		isTokenValid() {
			const token = localStorage.getItem('token');
			if (!token) return false;
			// Example: check token expiration
			const payload = JSON.parse(atob(token.split('.')[1]));
			const currentTime = Math.floor(Date.now() / 1000);
			return payload.exp > currentTime;
		},
	}
};
</script>

<template>
	<router-view />
</template>

<style scoped></style>
