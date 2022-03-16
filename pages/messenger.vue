<template>
  <v-col md="10" offset-md="1" class="pa-0 mt-0">
    <v-sheet elevation="1" rounded outlined>
      <v-row class="pa-0 ma-0">

        <!--    List Tickets     -->
        <v-col :class="selectedRoomId ? 'd-none d-md-block' : 'd-block'"
               cols="12"
               sm="12"
               md="4"
               lg="3"
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
                           @click="selectedRoomId = i"
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
                    <ChatTitle :ticket-title="ticket.title" :ticket-type="ticket.type"/>
                  </v-list-item-title>

                  <!--        last Message          -->
                  <v-list-item-subtitle v-text="ticket.lastMessage" class="mt-1"></v-list-item-subtitle>

                </v-list-item-content>

                <v-list-item-action>

                  <!--        last Message Date         -->
                  <v-list-item-action-text>{{ ticket.lastMessageDate }}</v-list-item-action-text>

                  <!--         has New Message         -->
                  <v-avatar class="green mr-1 white--text"
                            size="25"
                            :class="!ticket.newMessageCount ? 'd-none' : ''"
                            left>
                    {{ ticket.newMessageCount }}
                  </v-avatar>

                </v-list-item-action>

              </v-list-item>

            </v-list-item-group>

          </v-list>


        </v-col>

        <!--    Chat Room    -->
        <v-col :class="selectedRoomId ? 'd-block' : 'd-none d-md-block'"
               cols="12"
               sm="12"
               md="8"
               lg="9"
               class="pa-0">

          <!--     Properties Dialog     -->
          <v-dialog v-if="selectedRoomId"
                    v-model="propertiesDialog"
                    class="d-none d-sm-none"
                    transition="slide-x-transition"
                    width="450">
            <v-card height="500px">

              <v-card-title class="pr-3">

                {{ propertiesDialogTitle }}

                <v-spacer></v-spacer>

                <!--        Menu Icon        -->
                <v-btn class="mx-1" large icon>
                  <v-icon size="25">mdi-dots-vertical</v-icon>
                </v-btn>

                <!--        Close Icon        -->
                <v-btn @click="propertiesDialog = false" large icon>
                  <v-icon size="25">mdi-close</v-icon>
                </v-btn>

              </v-card-title>

              <v-card-text class="overflow-y-auto overflow-x-hidden">

                <!--       avatar         -->
                <ChatAvatar :ticket-type="tickets[selectedRoomId].type"
                            :ticket-title="tickets[selectedRoomId].title"
                            :color="tickets[selectedRoomId].color"
                            :avatar="tickets[selectedRoomId].avatar"
                            class-name="d-inline-block"
                            :users-data="[2,3,4].includes(tickets[selectedRoomId].type) ? getUsersData(tickets[selectedRoomId].users) : false"
                            size="100"/>

                <!--        Title        -->
                <ChatTitle :ticket-title="tickets[selectedRoomId].title"
                           :ticket-type="tickets[selectedRoomId].type"
                           class-name="d-inline-block text-h5"/>


              </v-card-text>

            </v-card>
          </v-dialog>

          <!--     Idle Sheet     -->
          <v-sheet v-if="!selectedRoomId"
                   height="100%"
                   class="d-none d-md-flex flex-column"
                   color="grey lighten-5">
            <div class="d-flex justify-center align-content-center flex-grow-1 align-center">
              <v-chip color="grey lighten-3">Select a chat to start messaging</v-chip>
            </div>
          </v-sheet>

          <!--     Chat Room Sheet     -->
          <v-slide-x-transition>
            <v-sheet class="d-flex flex-column"
                     v-if="selectedRoomId"
                     height="100%">

              <!--     Header     -->
              <v-toolbar elevation="0" outlined>

                <!--      Back Button        -->
                <v-btn class="mr-2 ml-n2 d-sm-block d-md-none"
                       @click="selectedRoomId = ''"
                       icon>
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>

                <!--       avatar         -->
                <ChatAvatar :ticket-type="tickets[selectedRoomId].type"
                            :ticket-title="tickets[selectedRoomId].title"
                            :color="tickets[selectedRoomId].color"
                            :avatar="tickets[selectedRoomId].avatar"
                            :users-data="[2,3,4].includes(tickets[selectedRoomId].type) ? getUsersData(tickets[selectedRoomId].users) : false"/>

                <v-toolbar-title @click="propertiesDialog = true"
                                 class="mx-2">
                  <!--      Title      -->
                  <span class="d-block text-subtitle-1 mb-0">
                    <ChatTitle :ticket-title="tickets[selectedRoomId].title"
                               :ticket-type="tickets[selectedRoomId].type"/>
                  </span>

                  <!--        User Status        -->
                  <span class="d-block caption">Typing...</span>

                </v-toolbar-title>

                <v-spacer></v-spacer>

                <!--      Menu Icon      -->
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>

              </v-toolbar>

              <!--      Content      -->
              <v-sheet color="grey lighten-5" class="d-flex flex-column" height="75vh">


                <!--       Messages       -->
                <v-sheet class="overflow-x-hidden overflow-y-auto flex-grow-1" color="transparent" elevation="0">

                  <!--     Loading    -->
                  <v-col cols="12" v-if="loadingChatRoom">
                    <div class="d-flex justify-center align-content-center flex-grow-1 align-center mt-16 pt-16">
                      <v-progress-circular class="d-block align-center" indeterminate></v-progress-circular>
                    </div>
                  </v-col>

                </v-sheet>

                <!--      Footer      -->
                <v-sheet class="pa-4">
                  <v-row class="d-flex pt-1 pb-1 px-1">

                    <!--         Emojy Button         -->
                    <v-btn large icon>
                      <v-icon size="25">mdi-emoticon-outline</v-icon>
                    </v-btn>

                    <!--         Chat Input         -->
                    <v-text-field class="mt-1"
                                  placeholder="Write a message..."
                                  hide-details
                                  flat
                                  solo
                                  dense>

                    </v-text-field>

                    <!--         File         -->
                    <v-btn large icon>
                      <v-icon size="25">mdi-paperclip</v-icon>
                    </v-btn>

                    <!--        Send        -->
                    <v-btn large icon>
                      <v-icon size="25">mdi-send</v-icon>
                    </v-btn>

                  </v-row>
                </v-sheet>

              </v-sheet>


            </v-sheet>
          </v-slide-x-transition>


        </v-col>

      </v-row>
    </v-sheet>
  </v-col>
</template>

<script>
import ChatAvatar from "@/components/messenger/ChatAvatar";
import ChatTitle  from "@/components/messenger/ChatTitle";

export default {
  name      : "messenger",
  components: {ChatTitle, ChatAvatar},
  auth      : false,
  data() {
    return {
      roomId          : '',
      myId            : 'myId',
      loadingChatRoom : false,
      loadingChatList : false,
      propertiesDialog: false,
      selectedRoomId  : '',
      tickets         : {
        1: {
          id             : 'ticketId',
          type           : 1,
          title          : 'MacroB2B',
          lastMessage    : 'this is a last Message of my ticket',
          lastMessageDate: '20:15',
          newMessageCount: 1,
          users          : ['myId']
        },
        2: {
          id             : 'ticketId',
          type           : 2,
          title          : 'Support',
          lastMessage    : 'this is a last Message of my ticket',
          lastMessageDate: '20:15',
          newMessageCount: 0,
          users          : ['_Id', 'myId']
        },
        3: {
          id             : 'ticketId',
          type           : 3,
          title          : 'AliAkbar Naderian',
          lastMessage    : 'this is a last Message of my ticket',
          avatar         : '',
          lastMessageDate: '20:15',
          newMessageCount: 0,
          users          : ['_Id', 'myId'],
          userStatus     : 1
        },
        4: {
          id             : 'ticketId',
          type           : 4,
          title          : 'Sample Group',
          lastMessage    : 'this is a last Message of my ticket',
          avatar         : '',
          lastMessageDate: '20:15',
          newMessageCount: 0,
          users          : ['_Id', 'myId', '_Id2']
        },
        5: {
          id             : 'ticketId',
          type           : 5,
          title          : 'Channel1',
          lastMessage    : 'this is a last Message of my ticket',
          avatar         : '',
          lastMessageDate: '20:15',
          newMessageCount: 0,
          users          : ['_Id', 'myId']
        },
      },
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
  methods : {
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
