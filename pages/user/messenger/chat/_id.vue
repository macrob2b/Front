<template>
  <!--    Chat Room    -->
  <v-col
    cols="12"
    sm="12"
    md="12"
    lg="12"
    class="pa-0">
    <div>
      <v-card
        id="scroll-target"

      >
        <v-card-title>
          {{(other_side_data.company_name && other_side_data.company_name!==null ? other_side_data.company_name : 'No name')}}
        </v-card-title>
        <v-card-text style="max-height: 400px"
                     class="overflow-y-auto overflow-x-hidden">

          <v-row
            v-scroll:#scroll-target="onScroll"
            align="center"
            justify="center"
            ref="scrollWrapper"
          >
          <v-col cols="12">
            <v-timeline dense>
              <v-slide-x-reverse-transition
                group
                hide-on-leave
              >
                <v-timeline-item
                  v-for="(msg, i) in messages"
                  :key="msg._id"
                  :color="msgOwner(msg) ? 'info' : ''"
                  small
                  fill-dot
                >
                  <v-card
                    :color="msgOwner(msg) ? 'info' : ''"
                  >

                    <v-card-text :class="msgOwner(msg) ? 'white--text' : ''">
                      {{ msg.message }}
                    </v-card-text>
                    <v-card-actions :class="msgOwner(msg) ? 'white--text' : ''">
                      {{ msg.created_at }}
                    </v-card-actions>
                  </v-card>
                </v-timeline-item>
              </v-slide-x-reverse-transition>
            </v-timeline>
          </v-col>

          </v-row>
        </v-card-text>
      </v-card>

    </div>


    <div>
      <v-text-field class=" mt-3 mb-1"
                    v-model="message_to_send"
                    placeholder="Type your message and press enter"
                    hide-details
                    :loading="submit_loading"
                    v-on:keydown.enter="submitMessage"
                    outlined
      >
      </v-text-field>
    </div>


  </v-col>

</template>

<script>
export default {
  name: "chat_messages",
  layout: "user_dashboard",
  data() {
    return {
      submit_loading:false,
      offsetTop: 0,
      messages: '',
      other_side_data: '',
      message_to_send: '',
    }
  },
  mounted() {
    this.getMessages();
    // this.$refs.scrollWrapper.scrollTop=600;
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop
    },
    getMessages() {
      this.$axios.$post('/api/get_company_chat_details',
        {chat_id: this.$route.params.id})
        .then(response => {
          this.messages = response.details;
          this.other_side_data = response.other_side_data;
        }).catch(err => {
        this.$toast.error(err);
      })
    },
    msgOwner(msg) {
      console.log(this.$auth.user.company._id+'----'+msg.company_sender_id);

      if (this.$auth.user.company._id == msg.company_sender_id)
        return true;
      else
        return false;
    },
    async submitMessage() {
      if (this.message_to_send.length < 3)
        this.$toast.error("Min length for message is 4");
      else {
        this.submit_loading = true;
        await this.$axios.$post('/api/reply_msg_to_company', {
            company_receiver_id: this.other_side_data._id,
            user_receiver_id: this.other_side_data.user_id,
            message: this.message_to_send,
            chat_id: this.$route.params.id
          }
        ).then(response => {
          if (typeof response === 'object') {
            for (let i in response) {
              let error = response[i][0];
              this.$toast.error(error);
              // break;
            }
          } else {
            this.message = '';
            this.$toast.success('Your message sent successfully')
          }
          this.getMessages();
          this.submit_loading = false;
          this.message_to_send='';
        }).catch(err => {
          this.submit_loading = false;
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
