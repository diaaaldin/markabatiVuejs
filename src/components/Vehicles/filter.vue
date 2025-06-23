
<script>
//import { mapState, mapGetters, mapActions } from "vuex";

export default {
    data() {
		return {	
            		
		}
	},
	mounted() {
	
    },
    components:{

    }, 

	emits:{
       
    },

	created() {
        // Call the function from the store directly when the component is created
     
    },
	
    computed:{
		//...mapGetters(),
		//...mapGetters(),

    },
    methods:{
		//...mapActions(),

    }
};
</script>

<template>
 
  <!--  start left side list  -->
  <div class="col-12 col-lg-3 h-100 left-side fillter">

<div class="accordion" id="accordionExample">
    <div class="sec">
        <div class="title-fill">
            <img src="/img/icons/fillter.svg">
            <span>الفلترة</span>
        </div>
    </div>
    <div class="accordion-item customize-according">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <div class="title-fill">
                    <img src="/img/icons/car.svg">
                    <span>نوع السيارة</span>
                </div>
            </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body customize-acc-body">
            <form action="">
                    <div class="form-check">
                        <input class="form-check-input" id="flexRadioDefault1" type="radio" name="car" value="مرسيدس بنز">
                        <label class="form-check-label" for="flexRadioDefault1">مرسيدس بنز</label>
                        <span>(345)</span>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="flexRadioDefault2" type="radio" name="car" value="تويوتا كورلا">
                        <label class="form-check-label" for="flexRadioDefault2">تويوتا كورلا</label>
                        <span>(345)</span>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="flexRadioDefault3" type="radio" name="car" value="هونداي النترا">
                        <label class="form-check-label" for="flexRadioDefault3">هونداي النترا</label>
                        <span>(345)</span>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="flexRadioDefault4" type="radio" name="car" value="هونداي أكورد">
                        <label class="form-check-label" for="flexRadioDefault4">هونداي أكورد</label>
                        <span>(345)</span>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="flexRadioDefault5" type="radio" name="car" value="نيسان التيما">
                        <label class="form-check-label" for="flexRadioDefault5">نيسان التيما</label>
                        <span>(345)</span>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="flexRadioDefault6" type="radio" name="car" value="كيا أوبتما">
                        <label class="form-check-label" for="flexRadioDefault6">كيا أوبتما</label>
                        <span>(345)</span>
                    </div>
             </form>
        </div>
</div>

    </div>
    <div class="accordion-item customize-according mt-2">
        <h2 class="accordion-header" id="heading2">
            <button class="accordion-button  btn " type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse2" aria-expanded="true" aria-controls="collapse2">
                <div class="title-fill">
                    <img src="/img/icons/car.svg">
                    <span>موديل السيارة</span>
                </div>
            </button>
        </h2>
        <div id="collapse2" class="accordion-collapse collapse show " aria-labelledby="heading2"
            data-bs-parent="#accordionExample">
            <div class="accordion-body customize-acc-body ">
               <form action="">
                    <div class="form-check">
                        <input class="form-check-input" id="flexRadioDefault1" type="radio" name="car" value="مرسيدس بنز">
                        <label class="form-check-label" for="flexRadioDefault1">مرسيدس بنز</label>
                        <span>(345)</span>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="flexRadioDefault2" type="radio" name="car" value="تويوتا كورلا">
                        <label class="form-check-label" for="flexRadioDefault2">تويوتا كورلا</label>
                        <span>(345)</span>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="flexRadioDefault3" type="radio" name="car" value="هونداي النترا">
                        <label class="form-check-label" for="flexRadioDefault3">هونداي النترا</label>
                        <span>(345)</span>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="flexRadioDefault4" type="radio" name="car" value="هونداي أكورد">
                        <label class="form-check-label" for="flexRadioDefault4">هونداي أكورد</label>
                        <span>(345)</span>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="flexRadioDefault5" type="radio" name="car" value="نيسان التيما">
                        <label class="form-check-label" for="flexRadioDefault5">نيسان التيما</label>
                        <span>(345)</span>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="flexRadioDefault6" type="radio" name="car" value="كيا أوبتما">
                        <label class="form-check-label" for="flexRadioDefault6">كيا أوبتما</label>
                        <span>(345)</span>
                    </div>
             </form>
            </div>
        </div>
    </div>

    <div class="accordion-item customize-according mt-2">
        <h2 class="accordion-header" id="">
            <button class="btn py-3" type="">
                <div class="title-fill">
                    <img src="/img/icons/date.svg">
                    <span>السنة</span>
                </div>
            </button>
        </h2>
        <div id="" class="show">
            <div class="accordion-body customize-acc-body pt-0">
                <div class="row">
                    <div class="col-md-6">
                        <label class="label-form">من</label>
                        <input name="price" id="price" type="text"
                            class="form-control mt-2  text-start gray_text gray-inp"
                            placeholder=" 0 " required="">
                    </div>
                    <div class="col-md-6">
                        <label class="label-form">الى</label>
                        <input name="price" id="price" type="text"
                            class="form-control mt-2  text-start gray_text gray-inp"
                            placeholder=" 0 " required="">
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="accordion-item customize-according mt-2">
        <h2 class="accordion-header" id="">
            <button class="btn py-3" type="">
                <div class="title-fill">
                    <img src="/img/icons/money.svg">
                    <span>السعر</span>
                </div>
            </button>
        </h2>
        <div id="" class="show">
            <div class="accordion-body customize-acc-body pt-0">
                <div class="row">
                    <div class="col-md-6">
                        <label class="label-form">من</label>
                        <input name="price" id="price" type="text"
                            class="form-control mt-2  text-start gray_text gray-inp"
                            placeholder=" 0 " required="">
                    </div>
                    <div class="col-md-6">
                        <label class="label-form">الى</label>
                        <input name="price" id="price" type="text"
                            class="form-control mt-2  text-start gray_text gray-inp"
                            placeholder=" 0 " required="">
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="accordion-item customize-according mt-2">
        <h2 class="accordion-header" id="">
            <button class="btn py-3" type="">
                <div class="title-fill">
                    <img src="/img/icons/speed.svg">
                    <span>عدد الأميال</span>
                </div>
            </button>
        </h2>
        <div id="" class="show">
            <div class="accordion-body customize-acc-body pt-0">
                <div class="row">
                    <div class="col-md-6">
                        <label class="label-form">من</label>
                        <input name="price" id="price" type="text"
                            class="form-control mt-2  text-start gray_text gray-inp"
                            placeholder=" 0 " required="">
                    </div>
                    <div class="col-md-6">
                        <label class="label-form">الى</label>
                        <input name="price" id="price" type="text"
                            class="form-control mt-2  text-start gray_text gray-inp"
                            placeholder=" 0 " required="">
                    </div>
                </div>

            </div>
        </div>
    </div>


    <div class="accordion-item customize-according mt-2">
        <h2 class="accordion-header" id="heading6">
            <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                <div class="title-fill">
                    <img src="/img/icons/color.svg">
                    <span>الألوان</span>
                </div>
            </button>
        </h2>
        <div id="collapse6" class="accordion-collapse collapse " aria-labelledby="heading6"
            data-bs-parent="#accordionExample">
            <div class="accordion-body customize-acc-body pt-0">
                غالباً ما يحتاج العثور على المنتج الذي ترغب في شراءه مجهوداً كبيراً إذا قمت بالتسوق
                من
                المتاجر التقليدية الموجودة بمراكز التسوق، ولكن إذا قررت التسوق أون لاين فإن عملية
                البحث
                والعثور على المنتج ستكون أكثر سهولة من خلال تصفح بعض قنوات التسوق الإلكترونية للحصول
                على
                أفضل منتج.
            </div>
        </div>
    </div>
    <div class="accordion-item customize-according mt-2">
        <h2 class="accordion-header" id="heading7">
            <button class="accordion-button  btn collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                <div class="title-fill">
                    <img src="/img/icons/spas.svg">
                    <span>المواصفات</span>
                </div>
            </button>
        </h2>
        <div id="collapse7" class="accordion-collapse collapse " aria-labelledby="heading7"
            data-bs-parent="#accordionExample">
            <div class="accordion-body customize-acc-body pt-0">
                غالباً ما يحتاج العثور على المنتج الذي ترغب في شراءه مجهوداً كبيراً إذا قمت بالتسوق
                من
                المتاجر التقليدية الموجودة بمراكز التسوق، ولكن إذا قررت التسوق أون لاين فإن عملية
                البحث
                والعثور على المنتج ستكون أكثر سهولة من خلال تصفح بعض قنوات التسوق الإلكترونية للحصول
                على
                أفضل منتج.
            </div>
        </div>
    </div>
</div>



</div>
<!-- end left side list-->

</template>

<style>
/* Optional: Add custom styles for your viewer component */
</style>
