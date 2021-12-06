<template>
    <div >
        <v-row>
            <v-col
                cols="3"
            >
                <CarouselHotDeals />
            </v-col>
            <v-col cols="9">
                <ContainerCard>
                    <ProductContainer title="popular products">
                        <ProductSlider :id="2" />
                    </ProductContainer>
                </ContainerCard>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ProductSlider from '../product/ProductSlider.vue'
import CarouselHotDeals from './CarouselHotDeals.vue'
import ContainerCard from './ContainerCard.vue'
import ProductContainer from './ProductContainer.vue'
export default {
    components:{
        CarouselHotDeals,
        ContainerCard,
        ProductContainer,
        ProductSlider
    }
    
}
</script>

<style scoped>
</style>