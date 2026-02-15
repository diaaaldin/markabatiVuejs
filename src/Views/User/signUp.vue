<script>
import { useHead } from '@vueuse/head';
import { ElLoading } from 'element-plus';
import { RouterView } from 'vue-router';
import { mapState, mapGetters, mapActions } from "vuex";
import axios from "axios";
import { UserTypeEnum } from '@/config/config.js'



export default {
    props: {

    },

    components: {
        RouterView
    },

    data() {
        return {
            data: {
                id: 0,
                name: "",
                email: "",
                mobile: "",
                userType: 0,
                ssn: "",
                licenseNumber: "",
                addressState: 0,
                addressCity: 0,
                addressInfo: "",
                moreInfo: "",
                password: "",
                confirmPassword: ""
            },
            userType: UserTypeEnum,
            emailError: '',
            mobileError: '',

            stateCities: [],

            isPassword1Visible: false,
            isPassword2Visible: false,

            // simple error flags for required fields (for visual indicators)
            errors: {
                name: false,
                email: false,
                mobile: false,
                ssn: false,
                licenseNumber: false,
                addressState: false,
                addressCity: false,
                addressInfo: false,
                password: false,
                confirmPassword: false,
            },
        }
    },
    created() {
        //localStorage.clear();
    },

    mounted() {
        useHead({
            title: 'مركبتي | إنساء حساب',
            meta: [
                {
                    name: 'description',
                    content: 'أنشئ حسابك الآن على موقع مركبتي سواء كمعرض سيارات أو كفرد لعرض سياراتك للبيع أو البحث عن أفضل العروض في فلسطين. سجّل بسهولة وابدأ رحلتك مع أكبر منصة للسيارات في فلسطين.',
                },
                {
                    name: 'keywords',
                    content: 'إنشاء حساب مركبتي, تسجيل حساب معرض سيارات, تسجيل حساب فردي, بيع سيارات فلسطين, شراء سيارات فلسطين, سوق السيارات في فلسطين, تسجيل حساب جديد , مركبتي فلسطين'
                },
                {
                    name: 'robots',
                    content: 'index, follow', // مهم تكون مفهرسة لأنها تجيب مستخدمين جدد
                },
                {
                    charset: 'UTF-8'
                },
                {
                    name: 'language',
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


    },

    computed: {
        ...mapGetters("Code", ["getStatesData", "getCitiesData"]),
    },

    methods: {
        ...mapActions("Users", ["CustomerSignUp", "ComponySignUp"]),

        clearErrors() {
            Object.keys(this.errors).forEach(key => {
                this.errors[key] = false;
            });
        },

        getSignUpNormalfunc() {
            if (this.checkValidationNormal()) {
                const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "Signing you up...",
                });
                this.CustomerSignUp(this.data).then(Response => {
                    this.$moshaToast(this.$t('general_signup_success_message'), {
                        hideProgressBar: 'false',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'success',
                        timeout: 3000,
                    });
                    loading.close();
                    this.$router.push({ name: "profile_profile" });
                }).catch(error => {
                    this.$moshaToast(error.response.data.message || 'Signup failed', {
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

        getSignUpCompanyfunc() {
            if (this.checkValidationCompany()) {
                const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "Signing you up...",
                });
                this.ComponySignUp(this.data).then(Response => {
                    this.$moshaToast(this.$t('general_signup_success_message'), {
                        hideProgressBar: 'false',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'success',
                        timeout: 3000,
                    });
                    loading.close();
                    this.$router.push({ name: "profile_profile" });
                }).catch(error => {
                    this.$moshaToast(error.response.data.message || 'Signup failed', {
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

        checkValidationNormal() {
            this.clearErrors();
            if (this.data.name.trim() == '') {
                this.errors.name = true;
                this.$moshaToast("أدخل الإسم", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.name.focus();
                return false;
            } else if (this.data.email.trim() == '') {
                this.errors.email = true;
                this.$moshaToast("أدخل الإيميل", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.email.focus();
                return false;
            } else if (this.data.mobile.trim() == '') {
                this.errors.mobile = true;
                this.$moshaToast("أدخل رقم الجوال", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.mobile.focus();
                return false;
            } else if (!this.validateMobile(this.data.mobile)) {
                this.errors.mobile = true;
                this.$moshaToast("الرجاء إدخال رقم جوال / واتساب صالح", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.mobile.focus();
                return false;
            }
            else if (this.data.ssn.trim() == '') {
                this.errors.ssn = true;
                this.$moshaToast("أدخل رقم الهوية", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.ssn.focus();
                return false;
            }
            // else if (this.checkSSN(this.data.ssn.trim())) {
            //     this.$moshaToast("أدخل رقم الهوية بشكل صحيح", {
            //         hideProgressBar: 'false',
            //         position: 'top-center',
            //         showIcon: 'true',
            //         swipeClose: 'true',
            //         type: 'warning',
            //         timeout: 3000,
            //     });
            //     this.$refs.ssn.focus();
            //     return false;
            // }
            // else if (this.data.licenseNumber.trim() == '' ) {
            //     this.$moshaToast("أدخل رقم الترخيص", {
            //         hideProgressBar: 'false',
            //         position: 'top-center',
            //         showIcon: 'true',
            //         swipeClose: 'true',
            //         type: 'warning',
            //         timeout: 3000,
            //     });
            //     this.$refs.licenseNumber.focus();
            //     return false;
            // }
            else if (this.data.addressState == 0) {
                this.errors.addressState = true;
                this.$moshaToast("إختر المحافظة", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.addressState.focus();
                return false;
            } else if (this.data.addressCity == 0) {
                this.errors.addressCity = true;
                this.$moshaToast("إختر المدينة", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.addressCity.focus();
                return false;
            } else if (this.data.password.trim() == '') {
                this.errors.password = true;
                this.$moshaToast("أدخل كلمة المرور", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            } else if (this.data.confirmPassword.trim() == '') {
                this.errors.confirmPassword = true;
                this.$moshaToast("أدخل تأكيد كلمة المرور", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.confirmPassword.focus();
                return false;
            } else if (this.data.password != this.data.confirmPassword) {
                this.errors.password = true;
                this.errors.confirmPassword = true;
                this.$moshaToast("تأكيد كلمة المرور لا تتطابق مع كلمة المرور", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                this.$refs.confirmPassword.focus();
                return false;

            } else if (!this.validateEmail(this.data.email)) {
                this.$moshaToast("الرجاء إدخال إيميل صالح", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.email.focus();
                return false;
            }
            return true;
        },

        checkValidationCompany() {
            this.clearErrors();
            if (this.data.name.trim() == '') {
                this.errors.name = true;
                this.$moshaToast("أدخل الإسم", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.name.focus();
                return false;
            } else if (this.data.email.trim() == '') {
                this.errors.email = true;
                this.$moshaToast("أدخل الإيميل", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.email.focus();
                return false;
            } else if (this.data.mobile.trim() == '') {
                this.errors.mobile = true;
                this.$moshaToast("أدخل رقم الجوال", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.mobile.focus();
                return false;
            } else if (!this.validateMobile(this.data.mobile)) {
                this.errors.mobile = true;
                this.$moshaToast("الرجاء إدخال رقم جوال / واتساب صالح", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.mobile.focus();
                return false;
            }
            // else if (this.data.ssn.trim() == '' && this.data.userType == UserTypeEnum.Normal) {
            //     this.$moshaToast("أدخل رقم الهوية", {
            //         hideProgressBar: 'false',
            //         position: 'top-center',
            //         showIcon: 'true',
            //         swipeClose: 'true',
            //         type: 'warning',
            //         timeout: 3000,
            //     });
            //     this.$refs.password.focus();
            //     return false;
            // } 
            else if (this.data.licenseNumber.trim() == '') {
                this.errors.licenseNumber = true;
                this.$moshaToast("أدخل رقم الترخيص", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.licenseNumber.focus();
                return false;
            }
            else if (this.data.addressState == 0) {
                this.errors.addressState = true;
                this.$moshaToast("إختر المحافظة", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.addressState.focus();
                return false;
            } else if (this.data.addressCity == 0) {
                this.errors.addressCity = true;
                this.$moshaToast("إختر المدينة", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.addressCity.focus();
                return false;
            } else if (this.data.password.trim() == '') {
                this.errors.password = true;
                this.$moshaToast("أدخل كلمة المرور", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            } else if (this.data.confirmPassword.trim() == '') {
                this.errors.confirmPassword = true;
                this.$moshaToast("أدخل تأكيد كلمة المرور", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.confirmPassword.focus();
                return false;
            } else if (this.data.password != this.data.confirmPassword) {
                this.errors.password = true;
                this.errors.confirmPassword = true;
                this.$moshaToast("تأكيد كلمة المرور لا تتطابق مع كلمة المرور", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                this.$refs.confirmPassword.focus();
                return false;

            } else if (!this.validateEmail(this.data.email)) {
                this.errors.email = true;
                this.$moshaToast("الرجاء إدخال إيميل صالح", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.email.focus();
                return false;
            }
            return true;
        },

        validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Check if the input is empty
            if (!this.data.email) {
                this.emailError = '';
                return false;
            }
            // Check if the input does not match the email format
            else if (!emailPattern.test(this.data.email)) {
                this.emailError = 'الرجاء إدخال ايميل صالح .';
                return false;
            }
            // Clear the error if the input is valid
            else {
                this.emailError = '';
                return true;
            }
        },

        validateMobile(mobile) {
            const raw = this.data.mobile || '';
            const digits = raw.replace(/\D/g, '');

            if (!raw) {
                this.mobileError = '';
                return false;
            }

            // WhatsApp number must start with 00 or +
            if (!(raw.startsWith('00') || raw.startsWith('+'))) {
                this.mobileError = 'رقم الواتساب يجب أن يبدأ بـ 00 أو +';
                return false;
            }

            // If starts with 00 → total 14 digits (including the 00)
            if (raw.startsWith('00')) {
                if (digits.length !== 14) {
                    this.mobileError = 'إذا بدأ الرقم بـ 00 فيجب أن يتكون من 14 رقماً.';
                    return false;
                }
            }

            // If starts with + → total 13 characters (1 + and 12 digits)
            if (raw.startsWith('+')) {
                if (raw.length !== 13 || digits.length !== 12) {
                    this.mobileError = 'إذا بدأ الرقم بـ + فيجب أن يتكون من 12 رقماً بعد إشارة +.';
                    return false;
                }
            }

            this.mobileError = '';
            return true;
        },

        filterMobileInput(event) {
            let input = event.target.value;

            // Keep only digits, but allow "+" only at the start
            input = input.replace(/(?!^\+)[^\d]/g, '');

            if (input.startsWith('00')) {
                // Exactly 14 digits when starting with 00
                input = input.slice(0, 14);
            } else if (input.startsWith('+')) {
                // Exactly 13 characters when starting with + (1 char + and 12 digits)
                input = input.slice(0, 13);
            } else {
                // For other input, still cap to 14 characters
                input = input.slice(0, 14);
            }

            this.data.mobile = input;

            // run validation similar to validateEmail
            this.validateMobile(this.data.mobile);
        },

        filterSsnInput(event) {
            const input = event.target.value.replace(/\D/g, '').slice(0, 9);
            this.data.ssn = input;
        },

        checkSSN(ssn) {
            if (!/^\d{9}$/.test(ssn)) return false;
            if (parseInt(ssn, 10) === 0) return false;

            let b = 0;
            for (let i = 0; i < ssn.length - 1; i++) {
                let a = parseInt(ssn.charAt(i), 10);

                if (i % 2 === 1) {
                    a *= 2;
                    if (a > 9) {
                        let v = a % 10;
                        let v2 = Math.floor(a / 10);
                        a = v + v2;
                    }
                }
                b += a;
            }

            b = b % 10;
            b = 10 - b;
            if (b === 10) b = 0;

            return b === parseInt(ssn.charAt(ssn.length - 1), 10);
        },

        filterzipCdoeInput(event) {
            const input = event.target.value.replace(/\D/g, '').slice(0, 5);
            this.data.zipCode = input;
        },

        setStatesCities(state) {
            let res = this.getCitiesData.filter(x => x.state === state);
            if (res) {
                this.stateCities = [];
                this.data.addressCity = 0;
                this.stateCities = res;
            } else this.stateCities = [];
        },

        clearData() {
            this.data.name = "";
            this.data.email = "";
            this.data.mobile = "";
            this.data.userType = 0;
            this.data.ssn = "";
            this.data.licenseNumber = "";
            this.data.addressState = 0;
            this.data.addressCity = 0;
            this.data.addressInfo = "";
            this.data.moreInfo = "";
            this.data.password = "";
            this.data.confirmPassword = "";
        },

        normalSelectFunc() {
            this.data.userType = UserTypeEnum.Normal;
        },

        companySelectFunc() {
            this.data.userType = UserTypeEnum.Compony;
        },

        togglePassword1Visibility() {
            this.isPassword1Visible = !this.isPassword1Visible;
        },
        togglePassword2Visibility() {
            this.isPassword2Visible = !this.isPassword2Visible;
        },

    },
}                   
</script>

<template>
    <div class="container me-lg-0 login register">
        <div class="row flex-column-reverse flex-lg-row ">
            <div class="col-12 col-lg-5 mt-5 pe-lg-0">
                <div class="row row-login register col-sm-12">
                    <div class="row justify-content-center ">
                        <div class="col-12 col-lg-8 col-sm-12">
                            <div class="img">
                                <router-link to="/">
                                    <img loading="lazy" src="/img/mini_logo.png" alt="">
                                </router-link>
                            </div>
                            <div class="text-center">
                                <h2 class="title_log">إنشاء حساب</h2>
                                <div>
                                    <p class="gray_text">مرحبا بك في متجر مركبتي</p>
                                </div>
                            </div>
                            <div class="text-center">


                            </div>
                            <!--   wrap tab in mobile (need to edit in responsive) /  appear in right side in tablet //// done -->
                            <div class="d-flex justify-content-around">
                                <ul class="nav nav-tabs login-ul flex-nowrap " id="myTab" role="tablist">
                                    <li class="nav-item create-sec-tab" role="presentation">
                                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab"
                                            data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                            aria-selected="true">
                                            <svg viewBox="0 0 24 24" width="24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                    stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path opacity="0.4"
                                                        d="M12 22.01C17.5228 22.01 22 17.5329 22 12.01C22 6.48716 17.5228 2.01001 12 2.01001C6.47715 2.01001 2 6.48716 2 12.01C2 17.5329 6.47715 22.01 12 22.01Z"
                                                        fill="#26d829"></path>
                                                    <path
                                                        d="M12 6.93994C9.93 6.93994 8.25 8.61994 8.25 10.6899C8.25 12.7199 9.84 14.3699 11.95 14.4299C11.98 14.4299 12.02 14.4299 12.04 14.4299C12.06 14.4299 12.09 14.4299 12.11 14.4299C12.12 14.4299 12.13 14.4299 12.13 14.4299C14.15 14.3599 15.74 12.7199 15.75 10.6899C15.75 8.61994 14.07 6.93994 12 6.93994Z"
                                                        fill="#26d829"></path>
                                                    <path
                                                        d="M18.7807 19.36C17.0007 21 14.6207 22.01 12.0007 22.01C9.3807 22.01 7.0007 21 5.2207 19.36C5.4607 18.45 6.1107 17.62 7.0607 16.98C9.7907 15.16 14.2307 15.16 16.9407 16.98C17.9007 17.62 18.5407 18.45 18.7807 19.36Z"
                                                        fill="#26d829"></path>
                                                </g>
                                            </svg>

                                            <span class="tab-title ms-2"> حساب فرد </span>


                                        </button>
                                    </li>
                                    <li class="nav-item create-sec-tab" role="presentation">
                                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab"
                                            data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                            aria-selected="false">
                                            <svg viewBox="0 0 24 24" width="24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                    stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path opacity="0.4"
                                                        d="M18 3H6C3.79 3 2 4.78 2 6.97V17.03C2 19.22 3.79 21 6 21H18C20.21 21 22 19.22 22 17.03V6.97C22 4.78 20.21 3 18 3Z"
                                                        fill="#26d829"></path>
                                                    <path
                                                        d="M19 8.75H14C13.59 8.75 13.25 8.41 13.25 8C13.25 7.59 13.59 7.25 14 7.25H19C19.41 7.25 19.75 7.59 19.75 8C19.75 8.41 19.41 8.75 19 8.75Z"
                                                        fill="#26d829"></path>
                                                    <path
                                                        d="M19 12.75H15C14.59 12.75 14.25 12.41 14.25 12C14.25 11.59 14.59 11.25 15 11.25H19C19.41 11.25 19.75 11.59 19.75 12C19.75 12.41 19.41 12.75 19 12.75Z"
                                                        fill="#26d829"></path>
                                                    <path
                                                        d="M19 16.75H17C16.59 16.75 16.25 16.41 16.25 16C16.25 15.59 16.59 15.25 17 15.25H19C19.41 15.25 19.75 15.59 19.75 16C19.75 16.41 19.41 16.75 19 16.75Z"
                                                        fill="#26d829"></path>
                                                    <path
                                                        d="M8.49945 11.7899C9.77523 11.7899 10.8095 10.7557 10.8095 9.47992C10.8095 8.20414 9.77523 7.16992 8.49945 7.16992C7.22368 7.16992 6.18945 8.20414 6.18945 9.47992C6.18945 10.7557 7.22368 11.7899 8.49945 11.7899Z"
                                                        fill="#26d829"></path>
                                                    <path
                                                        d="M9.29954 13.1098C8.76954 13.0598 8.21954 13.0598 7.68954 13.1098C6.00954 13.2698 4.65954 14.5998 4.49954 16.2798C4.48954 16.4198 4.52954 16.5598 4.62954 16.6598C4.72954 16.7598 4.85954 16.8298 4.99954 16.8298H11.9995C12.1395 16.8298 12.2795 16.7698 12.3695 16.6698C12.4595 16.5698 12.5095 16.4298 12.4995 16.2898C12.3295 14.5998 10.9895 13.2698 9.29954 13.1098Z"
                                                        fill="#26d829"></path>
                                                </g>
                                            </svg>
                                            <span class="tab-title ms-2"> حساب معرض </span>

                                        </button>
                                    </li>

                                </ul>
                            </div>
                            <div class="tab-content" id="myTabContent">

                                <div class="tab-pane fade show active" id="home" role="tabpanel"
                                    aria-labelledby="home-tab">
                                    <form class="mt-4">
                                        <div class="col-12">

                                            <div class="tab-content" id="myTabContent">
                                                <div class="tab-pane fade show active" id="">
                                                    <form class="mt-4">
                                                        <label class="text">الاسم</label>
                                                        <br>
                                                        <input v-model="data.name" ref="name" name="name" type="text"
                                                            class="form-control my-3 py-3 text-start gray_text gray-inp "
                                                            :class="{ 'is-invalid': errors.name }"
                                                            placeholder="الاسم" required>
                                                        <label class="text">البريد الالكتروني</label>
                                                        <br>
                                                        <input v-model="data.email" ref="email" name="email"
                                                            type="email" @input="validateEmail"
                                                            class="form-control my-3 py-3 text-start gray_text gray-inp "
                                                            :class="{ 'is-invalid': errors.email }"
                                                            placeholder="البريد الالكتروني" required>
                                                        <p v-if="emailError" style="color: red">{{ emailError }}</p>

                                                        <label class="text">رقم الهاتف </label>
                                                        <br>
                                                        <input v-model="data.mobile" name="mobile" id="phone" type="tel"
                                                            ref="mobile"
                                                            class="form-control my-3 py-3 text-start gray_text gray-inp"
                                                            :class="{ 'is-invalid': errors.mobile }"
                                                            placeholder="(+970) 59-512-3123" aria-label=""
                                                            aria-describedby="basic-addon1" @input="filterMobileInput"
                                                            required>

                                                        <label class="text">المحافظة</label>
                                                        <br>
                                                        <select v-model="data.addressState"
                                                            class="form-control my-3 py-3 text-start gray_text gray-inp"
                                                            :class="{ 'is-invalid': errors.addressState }"
                                                            @change="setStatesCities(data.addressState)">

                                                            <option value="0" key="0" selected>{{
                                                                $t('general_select_state') }}</option>
                                                            <option v-for="item in getStatesData"
                                                                :key="parseInt(item.id)" :value="item.id">
                                                                {{ item.name }}
                                                            </option>
                                                        </select>

                                                        <label class="text">المدينة</label>
                                                        <br>
                                                        <select v-model="data.addressCity"
                                                            class="form-control  my-3 py-3 text-start gray_text gray-inp"
                                                            :class="{ 'is-invalid': errors.addressCity }"
                                                            :disabled="!stateCities || stateCities.length === 0">
                                                            <option value="0" key="0" selected>{{
                                                                $t('general_select_city') }}</option>
                                                            <option v-for="item in stateCities" :key="parseInt(item.id)"
                                                                :value="item.id">
                                                                {{ item.name }}
                                                            </option>
                                                        </select>
                                                        <label class="text">معلومات مفصلة عن العنوان</label>
                                                        <br>
                                                        <textarea v-model="data.addressInfo" ref="addressInfo"
                                                            name="addressInfo" type="text"
                                                            class="form-control my-3 py-3 text-start gray_text gray-inp "
                                                            :class="{ 'is-invalid': errors.addressInfo }"
                                                            placeholder="" required></textarea>

                                                        <label class="text">رقم الهوية</label>
                                                        <br>
                                                        <input v-model="data.ssn" ref="ssn" name="ssn" type="text"
                                                            class="form-control my-3 py-3 text-start gray_text gray-inp "
                                                            :class="{ 'is-invalid': errors.ssn }"
                                                            placeholder="00000000" @input="filterSsnInput" required>

                                                        <div class="password-container">
                                                            <label class="text">كلمة المرور</label>
                                                            <br>
                                                            <!-- <input v-model="data.password" ref="password"
                                                                type="password"
                                                                class="form-control my-3 py-3 gray_text gray-inp id_password"
                                                                autocomplete="current-password"
                                                                placeholder="كلمة المرور" required>
                                                            <i class="far fa-eye togglePassword"></i> -->
                                                            <input v-model="data.password"
                                                                :type="isPassword1Visible ? 'text' : 'password'"
                                                                class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp id_password"
                                                                :class="{ 'is-invalid': errors.password }"
                                                                autocomplete="current-password"
                                                                placeholder="كلمة المرور " required>
                                                            <a v-on:click="togglePassword1Visibility">
                                                                <i
                                                                    :class="isPassword1Visible ? 'far fa-eye-slash togglePassword' : 'far fa-eye togglePassword'"></i>
                                                                <!-- <i class="far fa-eye-slash togglePassword"></i> -->
                                                            </a>
                                                        </div>
                                                        <div class="password-container">
                                                            <label class="text">تأكيد كلمة المرور</label>
                                                            <br>
                                                            <!-- <input v-model="data.confirmPassword" ref="confirmPassword"
                                                                type="Password"
                                                                class="form-control my-3 py-3 gray_text gray-inp id_password"
                                                                autocomplete="current-password"
                                                                placeholder="تأكيد كلمة المرور" required>
                                                            <i class="far fa-eye togglePassword"></i> -->

                                                            <input v-model="data.confirmPassword"
                                                                :type="isPassword2Visible ? 'text' : 'password'"
                                                                class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp id_password"
                                                                :class="{ 'is-invalid': errors.confirmPassword }"
                                                                autocomplete="current-password"
                                                                placeholder="تأكيد كلمة المرور " required>
                                                            <a v-on:click="togglePassword2Visibility">
                                                                <i
                                                                    :class="isPassword2Visible ? 'far fa-eye-slash togglePassword' : 'far fa-eye togglePassword'"></i>
                                                                <!-- <i class="far fa-eye-slash togglePassword"></i> -->
                                                            </a>
                                                        </div>

                                                        <button type="button" v-on:click="getSignUpNormalfunc()"
                                                            class=" btn_submit_1 form-control mt-4 mb-3 py-3"
                                                            value="SignUp">انشاء حساب</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <p class="d-flex justify-content-center c_acount mt-3 gray_text have_account"> لدي
                                        حساب
                                        <span class="ps-1">
                                            <!-- <a href="create_account.html" class="text">تسجيل دخول</a> -->
                                            <router-link to="/login" class="text">تسجيل دخول</router-link>
                                        </span>
                                    </p>
                                </div>

                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <form class="mt-4">
                                        <div class="col-12">

                                            <div class="tab-content" id="myTabContent">
                                                <div class="tab-pane fade show active" id="">
                                                    <form class="mt-4">
                                                        <label class="text">الاسم</label>
                                                        <br>
                                                        <input v-model="data.name" ref="name" name="name" type="text"
                                                            class="form-control my-3 py-3 text-start gray_text gray-inp "
                                                            :class="{ 'is-invalid': errors.name }"
                                                            placeholder="الاسم" required>
                                                        <label class="text">البريد الالكتروني</label>
                                                        <br>
                                                        <input v-model="data.email" ref="email" name="email"
                                                            type="email" @input="validateEmail"
                                                            class="form-control my-3 py-3 text-start gray_text gray-inp "
                                                            :class="{ 'is-invalid': errors.email }"
                                                            placeholder="البريد الالكتروني" required>
                                                        <p v-if="emailError" style="color: red">{{ emailError }}</p>


                                                        <label class="text">رقم الهاتف</label>
                                                        <br>
                                                        <input v-model="data.mobile" name="mobile" id="phone" type="tel"
                                                            ref="mobile"
                                                            class="form-control my-3 py-3 text-start gray_text gray-inp"
                                                            :class="{ 'is-invalid': errors.mobile }"
                                                            placeholder="(+970) 59-512-3123" aria-label=""
                                                            aria-describedby="basic-addon1" @input="filterMobileInput"
                                                            required>
                                                        <label class="text">المحافظة</label>
                                                        <br>
                                                        <select v-model="data.addressState" name="addressState"
                                                            class="form-control my-3 py-3 text-start gray_text gray-inp"
                                                            :class="{ 'is-invalid': errors.addressState }"
                                                            @change="setStatesCities(data.addressState)">
                                                            <option value="0" key="0" selected>{{
                                                                $t('general_select_state') }}</option>
                                                            <option v-for="item in getStatesData"
                                                                :key="parseInt(item.id)" :value="item.id">
                                                                {{ item.name }}
                                                            </option>
                                                        </select>

                                                        <label class="text">المدينة</label>
                                                        <br>
                                                        <select v-model="data.addressCity" name="addressCity"
                                                            class="form-control  my-3 py-3 text-start gray_text gray-inp"
                                                            :class="{ 'is-invalid': errors.addressCity }"
                                                            :disabled="!stateCities || stateCities.length === 0">
                                                            <option value="0" key="0" selected>{{
                                                                $t('general_select_city') }}</option>
                                                            <option v-for="item in stateCities" :key="parseInt(item.id)"
                                                                :value="item.id">
                                                                {{ item.name }}
                                                            </option>
                                                        </select>

                                                        <label class="text">معلومات مفصلة عن العنوان</label>
                                                        <br>
                                                        <textarea v-model="data.addressInfo" ref="addressInfo"
                                                            name="addressInfo" type="text"
                                                            class="form-control my-3 py-3 text-start gray_text gray-inp "
                                                            :class="{ 'is-invalid': errors.addressInfo }"
                                                            placeholder="" required></textarea>


                                                        <label class="text">رقم الترخيص</label>
                                                        <br>
                                                        <input v-model="data.licenseNumber" ref="licenseNumber"
                                                            name="licenseNumber" type="text"
                                                            class="form-control my-3 py-3 text-start gray_text gray-inp "
                                                            :class="{ 'is-invalid': errors.licenseNumber }"
                                                            placeholder="00000000" required>

                                                        <div class="password-container">
                                                            <label class="text">كلمة المرور</label>
                                                            <br>

                                                            <input v-model="data.password"
                                                                :type="isPassword1Visible ? 'text' : 'password'"
                                                                class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp id_password"
                                                                :class="{ 'is-invalid': errors.password }"
                                                                autocomplete="current-password"
                                                                placeholder="كلمة المرور " required>
                                                            <a v-on:click="togglePassword1Visibility">
                                                                <i
                                                                    :class="isPassword1Visible ? 'far fa-eye-slash togglePassword' : 'far fa-eye togglePassword'"></i>
                                                                <!-- <i class="far fa-eye-slash togglePassword"></i> -->
                                                            </a>
                                                        </div>
                                                        <div class="password-container">
                                                            <label class="text">تأكيد كلمة المرور</label>
                                                            <br>
                                                            <input v-model="data.confirmPassword"
                                                                :type="isPassword2Visible ? 'text' : 'password'"
                                                                class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp id_password"
                                                                :class="{ 'is-invalid': errors.confirmPassword }"
                                                                autocomplete="current-password"
                                                                placeholder="تأكيد كلمة المرور " required>
                                                            <a v-on:click="togglePassword2Visibility">
                                                                <i
                                                                    :class="isPassword2Visible ? 'far fa-eye-slash togglePassword' : 'far fa-eye togglePassword'"></i>
                                                                <!-- <i class="far fa-eye-slash togglePassword"></i> -->
                                                            </a>
                                                        </div>

                                                        <button type="button" v-on:click="getSignUpCompanyfunc()"
                                                            class=" btn_submit_1 form-control mt-4 mb-3 py-3"
                                                            value="SignUp">انشاء حساب</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <p class="d-flex justify-content-center c_acount mt-3 gray_text have_account"> لدي
                                        حساب
                                        <span class="ps-1">
                                            <!-- <a href="create_account.html" class="text">تسجيل دخول</a> -->
                                            <router-link to="/login" class="text">تسجيل دخول</router-link>
                                        </span>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>



                </div>
            </div>

            <div class="col-12 col-lg-7  pe-lg-0 image">
                <!-- <img loading="lazy" src="assets/img/bg-login.jpg" class="img-fluid" alt=""> -->
            </div>

        </div>
    </div>
</template>

<style scoped>
.have_account a:hover {
    color: #26d829;
}

/* simple red border for invalid fields */
.is-invalid {
    border-color: #dc3545 !important;
}
</style>