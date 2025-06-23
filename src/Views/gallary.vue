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

		}
	},

	mounted() {
		useHead({
			title: 'Gallary | Markabati',
			meta: [
				{
					name: `description`,
					content: 'Markabati is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties.',
				},
			],
		});
	},
	components: {
		pageNav,
		pageFooter,
		productCard

	},

	emits: {

	},

	created() {

	},

	computed: {

	},
	methods: {

	}
};
</script>
<template>
	<pageNav></pageNav>
	<div class="gallary">
		<div class="header-title bg text-center">
			<div class="container text-center">
					<div class="img"><img src="/img/seller/seller.png" class="" alt="..."></div>
					<div class="card-body">
						<div class="d-flex justify-content-center align-items-baseline mb-2">
							<h1 class="card-title justify-content-center">عبد الله المدهون</h1>
						</div>
						<div class="d-flex justify-content-center">
							<div class="d-flex flex-column">
								<div class="d-flex align-items-center mb-2">
									<ul class="addresul">
										<li>قطاع غزة / تل الهوا</li>
										<li>شارع الجلاء - بالقرب من الزهارنة</li>
									</ul>
								</div>
								<div class="card-show">
									<div class="d-flex justify-content-center">
										<ul class="contact text-center">
											<li> للتواصل: 0598266845 </li>
										</ul>
									</div>
									
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
                            <productCard></productCard>
                            <productCard></productCard>
                            <productCard></productCard>
                            <productCard></productCard>
                            <productCard></productCard>
                            <productCard></productCard>
                          
                          
                        </div>
                        <div class="row">
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
                            

                        </div>
                        
                    </div>
		</div>
</div>
	
	</div>



	<pageFooter></pageFooter>

</template>
<style scoped></style>