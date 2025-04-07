<template>
    <div class="container py-5">
        <h1 class="text-center mb-4">門徒的心聲</h1>
        <div class="row">
            <div class="col-12 col-md-6 mb-3" v-for="disciple in disciples" :key="disciple.id">
                <router-link :to="disciple.path" class="btn btn-outline-primary w-100">
                    {{ disciple.name }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { disciples } from '../data/disciples';

export default {
    data() {
        return {
            disciples,
        };
    },
};
</script>