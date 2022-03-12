<template>
  <v-col md="10" offset-md="1" class="pa-0 mt-0">
    <v-sheet elevation="1" rounded outlined>
      <v-row class="pa-0 ma-0">

        <!--    List Tickets     -->
        <v-col v-if="$vuetify.breakpoint.mdAndUp || ($vuetify.breakpoint.smAndDown && !selectedRoomId)"
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

                  <!--        System         -->
                  <v-avatar v-if="ticket.type === 1">
                    <v-img :src="`macrob2b.ico`"></v-img>
                  </v-avatar>

                  <!--        Support         -->
                  <v-avatar v-if="ticket.type === 2"
                            color="primary">
                    <v-icon color="white" large>mdi-face-agent</v-icon>
                  </v-avatar>

                  <!--        Direct         -->
                  <v-badge v-if="ticket.type === 3"
                           :color="userStatusHandler('getColor',ticket.userStatus)"
                           offset-x="10"
                           offset-y="10"
                           bordered
                           bottom
                           dot>
                    <v-avatar :color="!ticket.avatar ? ticket.color : ''">
                      <v-img v-if="ticket.avatar" :src="ticket.avatar"></v-img>
                      <span class="white--text" v-if="!ticket.avatar" v-text="ticket.title.substr(0, 1)"></span>
                    </v-avatar>
                  </v-badge>

                  <!--        Group || Channel        -->
                  <v-avatar v-if="ticket.type === 4 || ticket.type === 5" :color="!ticket.avatar ? ticket.color : ''">
                    <v-img v-if="ticket.avatar" :src="ticket.avatar"></v-img>
                    <span class="white--text" v-if="!ticket.avatar" v-text="ticket.title.substr(0, 1)"></span>
                  </v-avatar>

                </v-list-item-action>

                <v-list-item-content>
                  <!--         Title         -->
                  <v-list-item-title>

                    <!--         Group Icon           -->
                    <v-icon v-if="ticket.type === 4">mdi-account-multiple</v-icon>

                    <!--         Channel Icon           -->
                    <v-icon v-if="ticket.type === 5">mdi-bullhorn</v-icon>

                    {{ ticket.title }}

                    <!--         System Check Icon           -->
                    <v-icon v-if="ticket.type === 1"
                            class="mx-0"
                            color="blue"
                            dense>mdi-check-decagram
                    </v-icon>

                    <!--         Support Check Icon           -->
                    <v-icon v-if="ticket.type === 2"
                            class="mx-0"
                            color="blue"
                            dense>mdi-check-decagram-outline
                    </v-icon>

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
        <v-col v-if="$vuetify.breakpoint.mdAndUp || ($vuetify.breakpoint.smAndDown && selectedRoomId)"
               cols="12"
               sm="12"
               md="8"
               lg="9"
               class="pa-0">

          <!--     Idle Sheet     -->
          <v-sheet v-if="!selectedRoomId"
                   height="100%"
                   class="d-none d-md-flex flex-column"
                   color="grey lighten-5">
            <div class="d-flex justify-center align-content-center flex-grow-1 align-center">
              <v-chip color="grey lighten-3">Select a chat to start messaging</v-chip>
            </div>
          </v-sheet>

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

              <!--        System         -->
              <v-avatar v-if="tickets[selectedRoomId].type === 1">
                <v-img :src="`macrob2b.ico`"></v-img>
              </v-avatar>

              <!--        Support         -->
              <v-avatar v-if="tickets[selectedRoomId].type === 2"
                        color="primary">
                <v-icon color="white" large>mdi-face-agent</v-icon>
              </v-avatar>

              <!--        Direct         -->
              <v-badge v-if="tickets[selectedRoomId].type === 3"
                       :color="userStatusHandler('getColor',tickets[selectedRoomId].userStatus)"
                       offset-x="10"
                       offset-y="10"
                       bordered
                       bottom
                       dot>
                <v-avatar :color="!tickets[selectedRoomId].avatar ? tickets[selectedRoomId].color : ''">
                  <v-img v-if="tickets[selectedRoomId].avatar" :src="tickets[selectedRoomId].avatar"></v-img>
                  <span v-if="!tickets[selectedRoomId].avatar"
                        class="white--text" v-text="tickets[selectedRoomId].title.substr(0, 1)"></span>
                </v-avatar>
              </v-badge>

              <!--        Group || Channel        -->
              <v-avatar v-if="tickets[selectedRoomId].type === 4 || tickets[selectedRoomId].type === 5"
                        :color="!tickets[selectedRoomId].avatar ? tickets[selectedRoomId].color : ''">
                <v-img v-if="tickets[selectedRoomId].avatar" :src="tickets[selectedRoomId].avatar"></v-img>
                <span v-if="!tickets[selectedRoomId].avatar"
                      class="white--text" v-text="tickets[selectedRoomId].title.substr(0, 1)"></span>
              </v-avatar>


              <v-toolbar-title class="mx-2">
                <!--      Title      -->
                <span class="d-block text-subtitle-1 mb-0">
                  <!--         Group Icon           -->
                    <v-icon v-if="tickets[selectedRoomId].type === 4">mdi-account-multiple</v-icon>

                  <!--         Channel Icon           -->
                    <v-icon v-if="tickets[selectedRoomId].type === 5">mdi-bullhorn</v-icon>

                    {{ tickets[selectedRoomId].title }}

                  <!--         System Check Icon           -->
                    <v-icon v-if="tickets[selectedRoomId].type === 1"
                            class="mx-0 mt-n1"
                            color="blue"
                            dense>mdi-check-decagram
                    </v-icon>

                  <!--         Support Check Icon           -->
                    <v-icon v-if="tickets[selectedRoomId].type === 2"
                            class="mx-0 mt-n1"
                            color="blue"
                            dense>mdi-check-decagram-outline
                    </v-icon>
                </span>

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
                <v-row class="d-flex pt-2 pb-1 px-1">

                  <!--         Emojy Button         -->
                  <v-btn class="mr-1" icon>
                    <v-icon size="30">mdi-emoticon-outline</v-icon>
                  </v-btn>

                  <!--         Chat Input         -->
                  <v-text-field class="mr-1"
                                placeholder="Write a message..."
                                hide-details
                                flat
                                solo
                                dense>

                  </v-text-field>

                  <!--         File         -->
                  <v-btn class="mr-3" icon>
                    <v-icon size="30">mdi-paperclip</v-icon>
                  </v-btn>

                  <!--        Send        -->
                  <v-btn icon>
                    <v-icon size="30">mdi-send</v-icon>
                  </v-btn>

                </v-row>
              </v-sheet>

            </v-sheet>


          </v-sheet>
        </v-col>

      </v-row>
    </v-sheet>
  </v-col>
</template>

<script>
export default {
  name: "messenger",
  auth: false,
  data() {
    return {
      page           : '',
      roomId         : '',
      loadingChatRoom: false,
      loadingChatList: false,
      selectedRoomId : '',
      tickets        : {
        1: {
          id             : 'ticketId',
          type           : 1,
          title          : 'MacroB2B',
          lastMessage    : 'this is a last Message of my ticket',
          lastMessageDate: '20:15',
          newMessageCount: 1,
          users          : ['_Id']
        },
        2: {
          id             : 'ticketId',
          type           : 2,
          title          : 'Support',
          lastMessage    : 'this is a last Message of my ticket',
          lastMessageDate: '20:15',
          newMessageCount: 0,
          users          : ['_Id', '_Id']
        },
        3: {
          id             : 'ticketId',
          type           : 3,
          title          : 'AliAkbar Naderian',
          lastMessage    : 'this is a last Message of my ticket',
          avatar         : '',
          lastMessageDate: '20:15',
          newMessageCount: 0,
          users          : ['_Id', '_id'],
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
          users          : ['_Id', '_id']
        },
        5: {
          id             : 'ticketId',
          type           : 5,
          title          : 'Channel1',
          lastMessage    : 'this is a last Message of my ticket',
          avatar         : '',
          lastMessageDate: '20:15',
          newMessageCount: 0,
          users          : ['_Id', '_id']
        },
      },
      messages       : {
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
      }
    };
  },
  methods: {
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
    // handler of user status for (getColor,getText,...)
    userStatusHandler(option, status) {
      switch (option) {
        case 'getColor':
          switch (status) {
            // offline
            case 0:
              return 'grey lighten-1';
              break;
            //  online
            case 1:
              return 'green';
              break;
            //  last seen
            case 2:
              return 'yellow';
              break;
          }
          break;
      }
    }
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
