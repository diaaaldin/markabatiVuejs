<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';

import pageNav from '@/components/lightNavbar.vue';
import pageFooter from '@/components/footer.vue';
export default {
    data() {
        return {

		}
    },
    props: {
       
    },
    mounted() {

    },
    components: {
		pageNav,
		pageFooter,

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

     <pageFooter></pageFooter>

</template>
<style scoped>



</style>