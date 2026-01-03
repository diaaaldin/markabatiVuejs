<script>
import { useHead } from '@vueuse/head';
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    name: 'ServiceWindow',


    mounted() {
        // Basic SEO for maintenance mode
        useHead({
            title: 'مركبتي | غير متوفر حاليا',
            meta: [
                {
                    name: 'description',
                    content:
                        'موقع مركبتي قيد الصيانة حالياً لتحسين الخدمات وتجربة المستخدم. نعمل على العودة في أقرب وقت ممكن.',
                },
                {
                    name: 'robots',
                    content: 'noindex, nofollow',
                },
            ],
            htmlAttrs: {
                lang: 'ar',
                dir: 'rtl',
            },
        });
    },
     computed: {
        ...mapGetters("Interfaces", ["getInterfaceItemsData"]),

    },
    methods: {

        getTitleByCode(code) {
            // Find the object with the matching code
            const foundItem = this.getInterfaceItemsData.find(item => item.code === code);

            if (foundItem) {
                return foundItem.title;  // Set the title if found

            } else {
                return "Title not found";  // If no match is found
            }
        },
    }
};
</script>

<template>
    <div class="service-window">


        <main class="service-window__main">
            <div class="service-window__card">
                <div class="service-window__icon">
                    <i class="fa-solid fa-screwdriver-wrench"></i>
                </div>
                <div class="">
                    <p class="item_about_us mt-5" v-html="getTitleByCode('service_message')"></p>
                </div>

                <!-- <h1 class="service-window__title">
                    الموقع قيد الصيانة المؤقتة
                </h1>

                <p class="service-window__subtitle">
                    نعمل حالياً على تحديث وتحسين منصّة
                    <span class="service-window__brand">مركبتي</span>
                    لضمان تجربة أفضل لكم.
                </p>

                <p class="service-window__message">
                    يرجى المحاولة مرة أخرى لاحقاً. شكراً لصبركم وتفهمكم.
                </p>

                <div class="service-window__status">
                    <span class="dot"></span>
                    <span class="text">حالة النظام: صيانة مجدولة</span>
                </div>

                <div class="service-window__hint">
                    تم تفعيل وضع الصيانة من لوحة التحكم. سيتم إخفاء هذه الصفحة
                    تلقائياً عند إنهاء الصيانة.
                </div> -->
            </div>
        </main>
    </div>
</template>

<style scoped>
.service-window {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f5f6fa;
}

.service-window__main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 16px;
}

.service-window__card {
    max-width: 640px;
    width: 100%;
    background: #ffffff;
    border-radius: 18px;
    padding: 32px 24px;
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08);
    text-align: center;
    border: 1px solid #e4e6eb;
}

.service-window__icon {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    margin: 0 auto 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(44, 121, 205, 0.08);
    color: var(--main-color, #000);
    font-size: 30px;
}

.service-window__title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #000;
}

.service-window__subtitle {
    font-size: 15px;
    color: #555;
    margin-bottom: 8px;
    line-height: 1.7;
}

.service-window__brand {
    color: var(--main-color, #2c79cd);
    font-weight: 700;
}

.service-window__message {
    font-size: 14px;
    color: #777;
    margin-bottom: 20px;
    line-height: 1.7;
}

.service-window__status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 999px;
    background: #fff8e1;
    border: 1px solid #ffe082;
    margin-bottom: 14px;
}

.service-window__status .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ffb300;
}

.service-window__status .text {
    font-size: 13px;
    color: #8a6d1e;
}

.service-window__hint {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
}

@media screen and (max-width: 768px) {
    .service-window__card {
        padding: 24px 18px;
        border-radius: 14px;
    }

    .service-window__title {
        font-size: 20px;
    }

    .service-window__subtitle,
    .service-window__message {
        font-size: 13px;
    }
}
</style>
