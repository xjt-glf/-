<!-- <template>
	<div>
		<myComponents></myComponents>
		<Sidebar/>
	</div>
  
</template>

 
<script>
import myComponents from '../../components/myComponents.vue'
import Sidebar from '../../components/Sidebar.vue'
export default {
     components:{myComponents,Sidebar}
}
</script>
 
<style>
 
</style> -->

<template>
    <div class="about">
        <Header></Header>
        <Sidebar/>
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <v-tags></v-tags>
            
        </div>
    </div>
</template>
<script>
import Header from '../../components/Header.vue'
import Sidebar from '../../components/Sidebar.vue'
export default {
   components:{Header,Sidebar},
   
    setup() {
        const store = useStore();
        const tagsList = computed(() =>
            store.state.tagsList.map((item) => item.name)
        );
        const collapse = computed(() => store.state.collapse);
        return {
            tagsList,
            collapse,
        };
    },
};
</script>
