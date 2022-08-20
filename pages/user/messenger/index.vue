<template>
  <v-col md="12" offset-md="1" class="pa-0 mt-0 ml-0">
    <v-sheet elevation="1" rounded outlined>
      <v-row class="pa-0 ma-0">

        <!--    List Tickets     -->
        <v-col
               cols="12"
               sm="12"
               md="12"
               lg="12"
               class="pa-0">

          <!--     Search Chat List     -->
          <v-text-field class="mx-3 mt-3 mb-1"
                        prepend-inner-icon="mdi-magnify"
                        placeholder="Search"
                        hide-details
                        outlined
                        dense>
          </v-text-field>

          <!--    List      -->
          <v-list class="overflow-y-auto px-3"
                  height="76vh"
                  nav>

            <v-list-item-group>

              <!--      Skeleton Loading        -->
              <v-skeleton-loader v-if="loadingChatList"
                                 v-for="i in 10"
                                 :key="i"
                                 type="list-item-avatar-two-line">
              </v-skeleton-loader>

              <v-list-item v-if="!loadingChatList"
                           v-for="(ticket,i) in tickets"
                           :key="i"
                           :to="`/user/messenger/chat/${ticket._id}`"
                           class="transition-swing px-4 py-1 my-0"
                           active-class="blue lighten-5">


                <!--       Avatar         -->
                <v-list-item-action class="mr-3">

                  <ChatAvatar :ticket-type="ticket.type"
                              :ticket-title="ticket.title"
                              :color="ticket.color"
                              :avatar="ticket.avatar"
                              :users-data="[2,3,4].includes(ticket.type) ? getUsersData(ticket.users) : false"/>

                </v-list-item-action>

                <v-list-item-content>

                  <!--         Title         -->
                  <v-list-item-title>
                    <ChatTitle :ticket-title="getTicketTitle(ticket)" :ticket-type="4"/>
                  </v-list-item-title>

                  <!--        last Message          -->
                  <v-list-item-subtitle v-text="ticket.last_message.message" class="mt-1"></v-list-item-subtitle>

                </v-list-item-content>

                <v-list-item-action>

                  <!--        last Message Date         -->
                  <v-list-item-action-text>{{ ticket.updated_at }}</v-list-item-action-text>

                  <!--         has New Message         -->
                  <v-avatar class="green mr-1 white--text"
                            size="25"
                            :class="!ticket.unread_msg ? 'd-none' : ''"
                            left>
                    {{ ticket.unread_msg }}
                  </v-avatar>

                </v-list-item-action>

              </v-list-item>

            </v-list-item-group>

          </v-list>


        </v-col>


      </v-row>
    </v-sheet>
  </v-col>
</template>

<script>
import ChatAvatar from "@/components/messenger/ChatAvatar";
import ChatTitle  from "@/components/messenger/ChatTitle";

export default {
  layout:"user_dashboard",
  name      : "messenger",
  components: {ChatTitle, ChatAvatar},
  auth      : false,
  data() {
    return {
      tickets:'',
      roomId          : '',
      myId            : 'myId',
      loadingChatRoom : false,
      loadingChatList : false,
      propertiesDialog: false,
      selectedRoomId  : '',
      messages        : {
        'ticketId': [
          {
            id        : 'messageId',
            type      : 1,
            sender    : 'userId',
            message   : 'Hello. How you Doing?',
            replyId   : '',
            read      : ['userId'],
            created_at: '',
            updated_at: '',
          },
        ]
      },
      users           : {
        '_Id': {
          firstName: '',
          lastName : '',
          avatar   : '',
          status   : 1,
          ticket   : ''
        }
      }
    };
  },
  mounted() {
    this.getTicketList();
  },
  methods : {
    getTicketList(){
       this.$axios.$post('/api/get_company_msg')
         .then(res=>{
           this.tickets=res;
         }).catch(err=>{
           this.$toast.error(err);
       })
    },

    getTicketTitle(ticket){
      if (this.$auth.user.company._id===ticket.company_receiver_id)
        return (ticket.sender_company && ticket.sender_company.company_name ? ticket.sender_company.company_name : 'No name');
      else
        return (ticket.receiver_company && ticket.receiver_company.company_name ? ticket.receiver_company.company_name : 'No name');
    },

    // generate random Color
    randomColor: () => {
      let colors = [
        'red',
        'green',
        'blue',
        'teal',
        'pink',
        'purple',
        'deep-purple',
        'indigo',
        'light-blue',
        'cyan',
        'light-green',
        'lime',
        'yellow',
        'amber',
        'orange',
        'deep-orange',
        'brown',
        'blue-grey',
        'grey'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    getUsersData(users) {
      // list of request
      let usersNeedStatus = [];
      // list of status
      let usersData       = [];

      users.forEach((userId) => {
        if (userId !== this.myId) {
          if (this.users[userId] != undefined && this.users[userId].status) {
            usersData.push({
              status: this.users[userId].status,
              id    : userId,
              name  : this.users[userId].firstName
            });
          } else {
            usersData.push({
              status: 0,
              id    : userId,
              name  : ''
            });
            usersNeedStatus.push(userId);
          }
        }
      });

      // get users Status need

      // **

      return usersData;
    }
  },
  computed: {
    propertiesDialogTitle: function () {
      if (this.selectedRoomId) {
        switch (this.tickets[this.selectedRoomId].type) {
          case 1:
            return 'System';
          case 2:
            return 'Support';
          case 3:
            return 'User Info';
          case 4:
            return 'Group Info';
          case 5:
            return 'Channel Info';
        }
      } else {
        return '';
      }
    },
  },
  created() {
    // generate color for users have not avatar
    Object.entries(this.tickets).forEach((ticket) => {
      if (!ticket[1].avatar) {
        ticket[1].color = this.randomColor();
      }
    });
  }
}
</script>

<style scoped>

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>
