<template>
  <div>
    <h1>Ticket form: {{ ticket_details ? ticket_details.fullName : '' }}</h1>
    <h4>Tel: {{ ticket_details ? ticket_details.phone : '' }}</h4>
    <h4>Email: {{ ticket_details ? ticket_details.email : '' }}</h4>
    <h4>Website: {{ ticket_details ? ticket_details.website : '' }}</h4>
    <h4>Text: </h4>
    <p>
      {{ ticket_details ? ticket_details.message : '' }}
    </p>

    <v-row v-show="ticket_details && ticket_details.reply_status!=1">
      <v-col cols="12">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="sendReply">
            <v-col cols="12" md="6">
              <validation-provider v-slot="{ errors }" name="reply_subject" rules="required|min:5">
                <v-text-field
                  v-model="reply_subject"
                  :error-messages="errors"
                  label="Subject"/>
              </validation-provider>
            </v-col>
            <v-col cols="12" md="12">
              <validation-provider v-slot="{ errors }" name="reply_text" rules="required|min:10">
                <client-only placeholder="loading...">
                  <ckeditor-nuxt
                    v-model="reply_text"
                    :error-messages="errors"
                    label="Reply"
                    :config="editorConfig"/>
                </client-only>

              </validation-provider>

              <v-btn class="success mt-5"
                     :disabled="invalid"
                     :loading="replyLoading"
                     type="submit"
              >
                Send reply
              </v-btn>
            </v-col>

          </form>
        </validation-observer>
      </v-col>
    </v-row>
    <v-row  v-show="ticket_details && ticket_details.reply_status==1">
      <v-col cols="12" class="mt-1">
        <v-divider class="my-1"/>
      </v-col>
      <v-col class="ml-5" cols="12">
        <h3 class="my-3">Admin Reply: {{ ticket_details ? ticket_details.reply_subject : '' }}</h3>
        <div v-html="ticket_details ? ticket_details.reply_text : ''"/>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import {ValidationProvider, ValidationObserver} from "vee-validate";

export default {
  name: "contact-us-detail",
  layout: "admin",
  data() {
    return {
      ticket_details: null,
      reply_subject: null,
      reply_text: 'Dear ……, \n' +
        '<br><br><br><br>' +
        'Best ,\n' +
        '<br>' +
        '<a href="https://macrob2b.com">MacroB2B</a>',
      replyLoading:false,
      editorConfig: {
        placeholder: 'Describe',
        removePlugins: ['Title','MathType'],
        simpleUpload: {
          uploadUrl: '/',
          headers: {
            'Authorization': 'optional_token'
          }
        }
      }

    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },
  mounted() {
    this.getDetails();
  },
  methods: {
    async getDetails() {
      await this.$axios.$post('/api/contact_us_details',
        {contact_id: this.$route.params.id})
        .then(res => {
          this.ticket_details = res;
        }).catch(err => {
          this.$toast.error("An error occurred");
        })
    },
    async sendReply() {
      this.replyLoading=true;
      this.$axios.$post("/api/reply_contact_us",
        {
          email:this.ticket_details.email,
          contact_id:this.$route.params.id,
          subject: this.reply_subject,
          text: this.reply_text
        }).then(res => {
        if (typeof res === 'object')
          for (let i in res) {
            let error = res[i][0];
            this.$toast.error(error);
            // break;
          }
        else{
          this.$toast.success("Message send successfully");
          this.$router.push({path:"/admin/contact-us"});

        }

      }).catch(err => {
        this.$toast.error("An error occurred");
      }).finally(()=>{
        this.replyLoading=false;
      })
    }
  }
}
</script>

<style scoped>

</style>
