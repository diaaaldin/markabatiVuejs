<script>
import { useHead } from '@vueuse/head'
import { ElLoading } from 'element-plus';
import { RouterView } from 'vue-router';
import { mapState, mapGetters, mapActions } from "vuex";


export default {
	props: {

	},
	mounted() {
		useHead({
			title: 'مركبتي | تسجيل الدخول',
			meta: [
				{
					name: 'description',
					content: 'سجل دخولك إلى مركبتي للوصول إلى أفضل عروض السيارات الجديدة والمستعملة في فلسطين. بيع أو شراء مركبتك مباشرة دون وساطة وبأفضل الأسعار.',
				},
				{
					name: 'keywords',
					content: 'تسجيل دخول مركبتي, بيع سيارات فلسطين, شراء سيارات فلسطين, سوق السيارات مباشر, دخول حساب مركبتي, سيارات مستعملة فلسطين , مركبتي فلسطين'
				},
				// Open Graph
				{ property: 'og:title', content: 'تسجيل الدخول | مركبتي - بيع وشراء السيارات مباشرة' },
				{ property: 'og:description', content: 'انضم إلى مركبتي لتجربة بيع وشراء سيارات مباشرة وسريعة.' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: window.location.href },
				// الأساسيات
				{ charset: 'UTF-8' },
				{ name: 'language', content: 'ar' },
				{ name: 'robots', content: 'index, follow' } // أو noindex إذا كانت الصفحة حساسة
			],
			htmlAttrs: {
				lang: 'ar',
				dir: 'rtl'
			},
			link: [
				{ rel: 'canonical', href: window.location.href }
			]
		});
	},
	components: {
		RouterView
	},

	data() {
		return {
			userSlug: localStorage.getItem("slug"),

			user: {
				email: "",
				password: "",
			},

			newPasswordData: {
				userId: 0,
				email: "",
				Mobile: "",
				sendWay: 0,
				oldPassword: "",
				newPassword: ""
			},

			isPasswordVisible: false,
		}
	},

	created() {
		localStorage.clear();
	},

	computed: {

	},

	methods: {
		...mapActions("Users", ["UserLogin", "GetNewPassword"]),

		getLoginfunc() {
			if (this.checkValidation()) {
				const loading = ElLoading.service({
					lock: true,
					background: 'rgba(0, 0, 0, 0.7)',
					text: "",
				});
				this.UserLogin(this.user).then(Response => {
					this.$moshaToast('Login Success', {
						hideProgressBar: 'false',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'success',
						timeout: 3000,
					});
					loading.close();
					this.$router.push({ name: "profile_profile" });
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
			}
		},

		checkValidation() {
			if (this.user.email.trim() == '') {
				this.$moshaToast("enter email", {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				this.$refs.email.focus();
				return;
			}
			if (this.user.password.trim() == '') {
				this.$moshaToast("enter password", {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				this.$refs.password.focus();
				return;
			}
			return true;
		},

		clearNewPasswordFunc() {
			this.newPasswordData.userId = 0;
			this.newPasswordData.email = "";
			this.newPasswordData.Mobile = "";
			this.newPasswordData.sendWay = 0;
			this.newPasswordData.oldPassword = "";
			this.newPasswordData.newPassword = "";
		},

		getNewPasswordFunc() {
			if (this.checkNewPasswordValidation()) {
				const loading = ElLoading.service({
					lock: true,
					background: 'rgba(0, 0, 0, 0.7)',
					text: "",
				});
				this.GetNewPassword(this.newPasswordData).then(Response => {
					this.$moshaToast('We send new password to your email', {
						hideProgressBar: 'false',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'success',
						timeout: 3000,
					});
					$('#forgot_password').modal('hide');
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
			}
		},

		checkNewPasswordValidation() {
			if (this.newPasswordData.email.trim() == '') {
				this.$moshaToast("enter email", {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				this.$refs.email.focus();
				return;
			}
			return true;
		},

		togglePasswordVisibility() {
			this.isPasswordVisible = !this.isPasswordVisible;
		},
	},
}
</script>

<template>
	<div class="container me-lg-0 login">
		<div class="row flex-column-reverse flex-lg-row ">
			<div class="col-12 col-lg-5 mt-5">
				<div class="row row-login">
					<div class="col-12 col-lg-8">
						<div class="img">
							<router-link to="/">
								<img loading="lazy" src="/img/mini_logo.png" alt="">
							</router-link>
						</div>
						<div class="text-center">
							<h2 class="title_log">تسجيل الدخول</h2>
							<div>
								<p class="gray_text">مرحبا بك في متجر مركبتي</p>
							</div>
						</div>
						<!--   wrap tab in mobile (need to edit in responsive) /  appear in right side in tablet //// done -->

						<div class="tab-content" id="myTabContent">
							<div class="tab-pane fade show active" id="user" role="tabpanel" aria-labelledby="home-tab">
								<form class="mt-4">
									<label class="text">البريد الالكتروني</label>
									<br>
									<input @keypress.enter="getLoginfunc()" name="email" type="email" dir="ltr"
										v-model="user.email"
										class="form-control my-3 py-3 text-start gray_text gray-inp "
										placeholder="البريد الالكتروني" required>

									<div class="password-container">
										<label class="text">كلمة المرور</label>
										<br />
										<input @keypress.enter="getLoginfunc"
											:type="isPasswordVisible ? 'text' : 'password'" v-model="user.password"
											class="form-control my-3 py-3 gray_text gray-inp"
											autocomplete="current-password" placeholder="كلمة المرور" required />
										<span @click="togglePasswordVisibility" style="cursor: pointer;">
											<i :class="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
										</span>
									</div>


									<div class="d-flex justify-content-end">
										<a v-on:click="clearNewPasswordFunc()" data-bs-toggle="modal"
											data-bs-target="#forgot_password" class="text text-login forgot-password">هل
											نسيت كلمة المرور؟</a>
									</div>

									<button type="button" v-on:click="getLoginfunc()"
										class="btn_submit_1 form-control mt-3 py-3" value="Login">
										تسجيل الدخول
									</button>
								</form>

								<router-link to="/signUp" class="text text-login">إنشاء حساب</router-link>

							</div>

						</div>
					</div>
				</div>
			</div>


			<div class="col-12 col-lg-7  pe-lg-0 image">
				<!-- <img loading="lazy" src="/img/slider/bgcar.jpg" alt=""> -->
			</div>

		</div>
	</div>

	<div class="modal fade" id="forgot_password" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">هل نسيت كلمة المرور ؟ </h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="" method="">
						<label class=" label-form"> أدخل بريدك الالكتروني </label>
						<div class="input-group mb-3">
							<input type="email" class="form-control" placeholder="Example@email.com" aria-label="Email"
								aria-describedby="basic-addon1" v-model="newPasswordData.email">
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">الغاء</button>
					<button type="button" class="btn btn-primary" v-on:click="getNewPasswordFunc()">
						أرسل كلمة المرور الجديدة </button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>