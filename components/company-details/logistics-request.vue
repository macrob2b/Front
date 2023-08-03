<template>
    <div class="buying-lead-info-body">
        <validation-observer ref="observer" v-slot="{ invalid }">
            <v-form @submit.prevent="submitRequest">
                <v-row class="mt-3">
                    <v-col cols="12" md="4">
                        <validation-provider name="cate" v-slot="{ errors }" rules="required">
                            <v-autocomplete v-model="requestForm.type" :items="typeItems" :error-messages="errors"
                                item-text="title" item-value="value" label="Type" outlined></v-autocomplete>
                        </validation-provider>
                    </v-col>

                    <v-col cols="12" md="4">
                        <validation-provider rules="required|min:4" name="departure" v-slot="{ errors }">
                            <v-text-field v-model="requestForm.departure" outlined :error-messages="errors"
                                label="Departure" />
                        </validation-provider>
                    </v-col>

                    <v-col cols="12" md="4">
                        <validation-provider rules="required|min:4" name="destination" v-slot="{ errors }">
                            <v-text-field v-model="requestForm.destination" outlined :error-messages="errors"
                                label="Destination" />
                        </validation-provider>
                    </v-col>

                    <v-col cols="12" md="4">
                        <validation-provider rules="required|email" name="eamil" v-slot="{ errors }">
                            <v-text-field v-model="requestForm.email"
                             outlined :error-messages="errors" label="Email" />
                        </validation-provider>
                    </v-col>

                    <v-col cols="12" md="4">
                        <validation-provider rules="required|min:10" name="email" v-slot="{ errors }">
                            <v-text-field v-model="requestForm.phone"
                             outlined :error-messages="errors" label="Phone" />
                        </validation-provider>
                    </v-col>



                    <v-col cols="12" md="12">
                        <v-date-picker ref="picker" 
                         v-model="requestForm.shipment_date"
                            full-width></v-date-picker>
                    </v-col>


                    <v-col cols="12" class="text-center">
                        <v-btn class="primary" x-large :disabled="invalid" :loading="formLoader" type="submit">
                            Send request
                        </v-btn>

                    </v-col>
                </v-row>

            </v-form>
        </validation-observer>
    </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
    name: "logistics-request",
    props: ['companyInfo'],
    data: () => ({

        typeItems: [
            {
                value: 'AIR FREIGHT',
                title: 'AIR FREIGHT'
            },
            {
                value: 'OCEAN FREIGHT',
                title: 'OCEAN FREIGHT'
            },
            {
                value: 'ROAD TRANSPORT',
                title: 'ROAD TRANSPORT'
            },
            {
                value: 'RAIL TRANSPORT',
                title: 'RAIL TRANSPORT'
            },
            {
                value: 'Chartering service',
                title: 'Chartering service'
            },
            {
                value: 'Intermodal service',
                title: 'Intermodal service'
            },

        ],

        requestForm: {
            shipment_date:null
        },
        formLoader: false


    }),
    mounted() {
        this.requestForm.receiver_company_id=this.companyInfo._id;
        this.requestForm.receiver_company_name=this.companyInfo.company_name;
        this.requestForm.receiver_user_id=this.companyInfo.user_id;



        let shipment_date = new Date();
        shipment_date.setDate(shipment_date.getDate() + 1);
        this.requestForm.shipment_date = shipment_date.toISOString().substr(0, 10);
    },
    watch: {},
    methods: {
        allowedDate(val) {
            let date = new Date();
            date.setDate(date.getDate() + 1);
            return val >= date.toISOString().substr(0, 10);
        },
        
        submitRequest() {
            this.formLoader = true;
            this.$axios.$post('/api/logistics-request'
                , this.requestForm
            )
                .then(res => {
                    if (typeof res === 'object') {
                        for (let i in res) {
                            let error = res[i][0];
                            this.$toast.error(error);
                            // break;
                        }
                    } else {
                        this.$toast.success("Request sent successfully");
                        
                    }

                }).catch(err => {
                    this.$toast.error(err);
                }).finally(()=>{
                    this.formLoader = false;
                });

        },


    },
    components: {
        ValidationProvider,
        ValidationObserver,
    }

}
</script>