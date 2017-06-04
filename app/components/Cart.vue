//http://012.vuejs.org/api/options.html
<template>
    <div class="cart">
        <h2>Your Cart</h2>
        <p v-show="!products.length"><i>Please add some products to cart.</i></p>
        <ul>
            <li v-for="p in products">
                {{ p.title }} - {{ p.price | currency }} x {{ p.quantity }}
            </li>
        </ul>
        <p>Total: {{ 'ok' }}</p>
        <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
        <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: mapGetters({
            products: 'cartProducts',
            checkoutStatus: 'checkoutStatus'
        }),
        methods: {
            checkout (products) {
                this.$store.dispatch('checkout', products)
            }
        }
    }
</script>

/*

*/