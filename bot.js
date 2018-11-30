const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "."


client.on('ready', function() {
    console.log(`i am ready ${client.user.username}`);
});











const developers = ["517719569666932737","",""]
const adminprefix = ".";
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!developers.includes(message.author.id)) return;
      
  if (message.content.startsWith(adminprefix + 'ply')) {
    client.user.setGame(argresult);
      message.channel.send(`**Now Playig   ${argresult}**`)
  } else 
     if (message.content === (adminprefix + "leaveserver")) {
    message.guild.leave();        
  } else  
  if (message.content.startsWith(adminprefix + 'wat')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`**Now Watching   ${argresult}**`)
  } else 
  if (message.content.startsWith(adminprefix + 'lis')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`**Now Listening   ${argresult}**`)
  } else 
  if (message.content.startsWith(adminprefix + 'stream')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.send(`**Now Streaming   ${argresult}**`)
  }
  if (message.content.startsWith(adminprefix + 'setname')) {
  client.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
} else
if (message.content.startsWith(adminprefix + 'setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});

client.on('message', message => {
   if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'bc')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send(':no_entry: | You dont have **ADMINISTRATOR** Permission!' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let BcList = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setAuthor(`محتوى الرساله ${args}`)
.setDescription(`برودكاست بـ امبد 📝\nبرودكاست بدون امبد✏ \nلديك دقيقه للأختيار قبل الغاء البرودكاست`)
if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(BcList).then(msg => {
msg.react('📝')
.then(() => msg.react('✏'))
.then(() =>msg.react('📝'))
 
let EmbedBcFilter = (reaction, user) => reaction.emoji.name === '📝' && user.id === message.author.id;
let NormalBcFilter = (reaction, user) => reaction.emoji.name === '✏' && user.id === message.author.id;
 
let EmbedBc = msg.createReactionCollector(EmbedBcFilter, { time: 60000 });
let NormalBc = msg.createReactionCollector(NormalBcFilter, { time: 60000 });
 
EmbedBc.on("collect", r => {
message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
var bc = new
Discord.RichEmbed()
.setColor('RANDOM')
  .setTitle('`-Broadcast-`')
.setAuthor(`Server : ${message.guild.name}`)
.setFooter(`Sender : ${message.author.username}`)
.setDescription(`Message : ${args}`)
.setThumbnail(message.author.avatarURL)
m.send({ embed: bc })
msg.delete();
})
})
NormalBc.on("collect", r => {
  message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
m.send(args);
msg.delete();
})
})
})
}
});

client.on('message', message => {
 var prefix = "-"
 
if (message.content.toLowerCase().startsWith(prefix + `new`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "invite managers")) return message.channel.send(`\`invite managers\` **لا توجد رتبة بأسم**`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`**لديك تذكرة مفتوحة بالفعل**`);
    message.guild.createChannel(`ticket`, "text").then(c => {
        let role = message.guild.roles.find("name", "Support Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: تم انشاء التذكرة`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`${message.author.username} **مرحبا بك**`, `
يرجى محاولة شرح سبب فتح هذه التذكرة بأكبر قدر ممكن من التفاصيل. سيكون فريق الدعم ** ** هنا قريباً لمساعدتك`)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `close`)) {
    if (!message.channel.name.startsWith(`ticket`)) return message.channel.send(`لا يمكنك استخدام أمر الإغلاق خارج قناة التذاكر`);
 
    message.channel.send(`**confirm** : هل انت متأكد من اغلاق التذكرة ؟ اذا انت متأكد فلديك دقيقة لتكتب`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('انتهي وقت اغلاق التذكرة').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}
 
});

const invites = {};

const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const stewart = member.guild.channels.find("name", "welcome");
     stewart.send(`<@${member.user.id}> invited By  <@${inviter.id}>:tada:`);
   //  stewart.send(`<@${member.user.id}> joined using invite code ${invite.code} from <@${inviter.id}>. Invite was used ${invite.uses} times since its creation.`);
  }); 
});

client.on("ready", () => {
  function lol() {
    client.guilds.get('517740329219391498').roles.find("name", "Owner").setColor("RANDOM");
  };
  setInterval(lol, 60000);
});

client.on ("guildMemberAdd", member => {
  
   var role = member.guild.roles.find ("name", "Owner");
   member.addRole (role);
  
})

client.on ("guildMemberRemove", member => {
   
});

client.on('message', message => {
    if (message.content.includes('discord.gg')){
                        if(!message.channel.guild) return message.reply ('')
                    if (!message.member.hasPermissions(['MANAGE_MESSAGES'])){
       message.channel.send('ban <@' + message.author.id + '>')
       message.delete() 
       }
    }
          if (message.content.startsWith("ban ")) {
             if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply();
             var member= message.mentions.members.first();
             member.ban().then((member) => {
                 message.channel.sendMessage("", {embed: {
                 author: {
                 },
                 title: 'بسبب النشر ' + member.displayName + ' تم حظر',
                 color: 490101,
                 }
               });
           }
         ) 
       }
   });



// Discordgo - Discord bindings for Go
// Available at https://github.com/bwmarrin/discordgo

// Copyright 2015-2016 Bruce Marriner <bruce@sqls.net>.  All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// This file contains code related to Discord voice suppport

package discordgo

import (
	"encoding/binary"
	"encoding/json"
	"fmt"
	"net"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"golang.org/x/crypto/nacl/secretbox"
)

// ------------------------------------------------------------------------------------------------
// Code related to both VoiceConnection Websocket and UDP connections.
// ------------------------------------------------------------------------------------------------

// A VoiceConnection struct holds all the data and functions related to a Discord Voice Connection.
type VoiceConnection struct {
	sync.RWMutex

	Debug        bool // If true, print extra logging -- DEPRECATED
	LogLevel     int
	Ready        bool // If true, voice is ready to send/receive audio
	UserID       string
	GuildID      string
	ChannelID    string
	deaf         bool
	mute         bool
	speaking     bool
	reconnecting bool // If true, voice connection is trying to reconnect

	OpusSend chan []byte  // Chan for sending opus audio
	OpusRecv chan *Packet // Chan for receiving opus audio

	wsConn  *websocket.Conn
	wsMutex sync.Mutex
	udpConn *net.UDPConn
	session *Session

	sessionID string
	token     string
	endpoint  string

	// Used to send a close signal to goroutines
	close chan struct{}

	// Used to allow blocking until connected
	connected chan bool

	// Used to pass the sessionid from onVoiceStateUpdate
	// sessionRecv chan string UNUSED ATM

	op4 voiceOP4
	op2 voiceOP2

	voiceSpeakingUpdateHandlers []VoiceSpeakingUpdateHandler
}

// VoiceSpeakingUpdateHandler type provides a function definition for the
// VoiceSpeakingUpdate event
type VoiceSpeakingUpdateHandler func(vc *VoiceConnection, vs *VoiceSpeakingUpdate)

// Speaking sends a speaking notification to Discord over the voice websocket.
// This must be sent as true prior to sending audio and should be set to false
// once finished sending audio.
//  b  : Send true if speaking, false if not.
func (v *VoiceConnection) Speaking(b bool) (err error) {

	v.log(LogDebug, "called (%t)", b)

	type voiceSpeakingData struct {
		Speaking bool `json:"speaking"`
		Delay    int  `json:"delay"`
	}

	type voiceSpeakingOp struct {
		Op   int               `json:"op"` // Always 5
		Data voiceSpeakingData `json:"d"`
	}

	if v.wsConn == nil {
		return fmt.Errorf("no VoiceConnection websocket")
	}

	data := voiceSpeakingOp{5, voiceSpeakingData{b, 0}}
	v.wsMutex.Lock()
	err = v.wsConn.WriteJSON(data)
	v.wsMutex.Unlock()

	v.Lock()
	defer v.Unlock()
	if err != nil {
		v.speaking = false
		v.log(LogError, "Speaking() write json error, %s", err)
		return
	}

	v.speaking = b

	return
}

// ChangeChannel sends Discord a request to change channels within a Guild
// !!! NOTE !!! This function may be removed in favour of just using ChannelVoiceJoin
func (v *VoiceConnection) ChangeChannel(channelID string, mute, deaf bool) (err error) {

	v.log(LogInformational, "called")

	data := voiceChannelJoinOp{4, voiceChannelJoinData{&v.GuildID, &channelID, mute, deaf}}
	v.wsMutex.Lock()
	err = v.session.wsConn.WriteJSON(data)
	v.wsMutex.Unlock()
	if err != nil {
		return
	}
	v.ChannelID = channelID
	v.deaf = deaf
	v.mute = mute
	v.speaking = false

	return
}

// Disconnect disconnects from this voice channel and closes the websocket
// and udp connections to Discord.
func (v *VoiceConnection) Disconnect() (err error) {

	// Send a OP4 with a nil channel to disconnect
	if v.sessionID != "" {
		data := voiceChannelJoinOp{4, voiceChannelJoinData{&v.GuildID, nil, true, true}}
		v.session.wsMutex.Lock()
		err = v.session.wsConn.WriteJSON(data)
		v.session.wsMutex.Unlock()
		v.sessionID = ""
	}

	// Close websocket and udp connections
	v.Close()

	v.log(LogInformational, "Deleting VoiceConnection %s", v.GuildID)

	v.session.Lock()
	delete(v.session.VoiceConnections, v.GuildID)
	v.session.Unlock()

	return
}

// Close closes the voice ws and udp connections
func (v *VoiceConnection) Close() {

	v.log(LogInformational, "called")

	v.Lock()
	defer v.Unlock()

	v.Ready = false
	v.speaking = false

	if v.close != nil {
		v.log(LogInformational, "closing v.close")
		close(v.close)
		v.close = nil
	}

	if v.udpConn != nil {
		v.log(LogInformational, "closing udp")
		err := v.udpConn.Close()
		if err != nil {
			v.log(LogError, "error closing udp connection, %s", err)
		}
		v.udpConn = nil
	}

	if v.wsConn != nil {
		v.log(LogInformational, "sending close frame")

		// To cleanly close a connection, a client should send a close
		// frame and wait for the server to close the connection.
		v.wsMutex.Lock()
		err := v.wsConn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, ""))
		v.wsMutex.Unlock()
		if err != nil {
			v.log(LogError, "error closing websocket, %s", err)
		}

		// TODO: Wait for Discord to actually close the connection.
		time.Sleep(1 * time.Second)

		v.log(LogInformational, "closing websocket")
		err = v.wsConn.Close()
		if err != nil {
			v.log(LogError, "error closing websocket, %s", err)
		}

		v.wsConn = nil
	}
}

// AddHandler adds a Handler for VoiceSpeakingUpdate events.
func (v *VoiceConnection) AddHandler(h VoiceSpeakingUpdateHandler) {
	v.Lock()
	defer v.Unlock()

	v.voiceSpeakingUpdateHandlers = append(v.voiceSpeakingUpdateHandlers, h)
}

// VoiceSpeakingUpdate is a struct for a VoiceSpeakingUpdate event.
type VoiceSpeakingUpdate struct {
	UserID   string `json:"user_id"`
	SSRC     int    `json:"ssrc"`
	Speaking bool   `json:"speaking"`
}

// ------------------------------------------------------------------------------------------------
// Unexported Internal Functions Below.
// ------------------------------------------------------------------------------------------------

// A voiceOP4 stores the data for the voice operation 4 websocket event
// which provides us with the NaCl SecretBox encryption key
type voiceOP4 struct {
	SecretKey [32]byte `json:"secret_key"`
	Mode      string   `json:"mode"`
}

// A voiceOP2 stores the data for the voice operation 2 websocket event
// which is sort of like the voice READY packet
type voiceOP2 struct {
	SSRC              uint32        `json:"ssrc"`
	Port              int           `json:"port"`
	Modes             []string      `json:"modes"`
	HeartbeatInterval time.Duration `json:"heartbeat_interval"`
}

// WaitUntilConnected waits for the Voice Connection to
// become ready, if it does not become ready it returns an err
func (v *VoiceConnection) waitUntilConnected() error {

	v.log(LogInformational, "called")

	i := 0
	for {
		v.RLock()
		ready := v.Ready
		v.RUnlock()
		if ready {
			return nil
		}

		if i > 10 {
			return fmt.Errorf("timeout waiting for voice")
		}

		time.Sleep(1 * time.Second)
		i++
	}
}

// Open opens a voice connection.  This should be called
// after VoiceChannelJoin is used and the data VOICE websocket events
// are captured.
func (v *VoiceConnection) open() (err error) {

	v.log(LogInformational, "called")

	v.Lock()
	defer v.Unlock()

	// Don't open a websocket if one is already open
	if v.wsConn != nil {
		v.log(LogWarning, "refusing to overwrite non-nil websocket")
		return
	}

	// TODO temp? loop to wait for the SessionID
	i := 0
	for {
		if v.sessionID != "" {
			break
		}
		if i > 20 { // only loop for up to 1 second total
			return fmt.Errorf("did not receive voice Session ID in time")
		}
		time.Sleep(50 * time.Millisecond)
		i++
	}

	// Connect to VoiceConnection Websocket
	vg := "wss://" + strings.TrimSuffix(v.endpoint, ":80")
	v.log(LogInformational, "connecting to voice endpoint %s", vg)
	v.wsConn, _, err = websocket.DefaultDialer.Dial(vg, nil)
	if err != nil {
		v.log(LogWarning, "error connecting to voice endpoint %s, %s", vg, err)
		v.log(LogDebug, "voice struct: %#v\n", v)
		return
	}

	type voiceHandshakeData struct {
		ServerID  string `json:"server_id"`
		UserID    string `json:"user_id"`
		SessionID string `json:"session_id"`
		Token     string `json:"token"`
	}
	type voiceHandshakeOp struct {
		Op   int                `json:"op"` // Always 0
		Data voiceHandshakeData `json:"d"`
	}
	data := voiceHandshakeOp{0, voiceHandshakeData{v.GuildID, v.UserID, v.sessionID, v.token}}

	err = v.wsConn.WriteJSON(data)
	if err != nil {
		v.log(LogWarning, "error sending init packet, %s", err)
		return
	}

	v.close = make(chan struct{})
	go v.wsListen(v.wsConn, v.close)

	// add loop/check for Ready bool here?
	// then return false if not ready?
	// but then wsListen will also err.

	return
}

// wsListen listens on the voice websocket for messages and passes them
// to the voice event handler.  This is automatically called by the Open func
func (v *VoiceConnection) wsListen(wsConn *websocket.Conn, close <-chan struct{}) {

	v.log(LogInformational, "called")

	for {
		_, message, err := v.wsConn.ReadMessage()
		if err != nil {
			// Detect if we have been closed manually. If a Close() has already
			// happened, the websocket we are listening on will be different to the
			// current session.
			v.RLock()
			sameConnection := v.wsConn == wsConn
			v.RUnlock()
			if sameConnection {

				v.log(LogError, "voice endpoint %s websocket closed unexpectantly, %s", v.endpoint, err)

				// Start reconnect goroutine then exit.
				go v.reconnect()
			}
			return
		}

		// Pass received message to voice event handler
		select {
		case <-close:
			return
		default:
			go v.onEvent(message)
		}
	}
}

// wsEvent handles any voice websocket events. This is only called by the
// wsListen() function.
func (v *VoiceConnection) onEvent(message []byte) {

	v.log(LogDebug, "received: %s", string(message))

	var e Event
	if err := json.Unmarshal(message, &e); err != nil {
		v.log(LogError, "unmarshall error, %s", err)
		return
	}

	switch e.Operation {

	case 2: // READY

		if err := json.Unmarshal(e.RawData, &v.op2); err != nil {
			v.log(LogError, "OP2 unmarshall error, %s, %s", err, string(e.RawData))
			return
		}

		// Start the voice websocket heartbeat to keep the connection alive
		go v.wsHeartbeat(v.wsConn, v.close, v.op2.HeartbeatInterval)
		// TODO monitor a chan/bool to verify this was successful

		// Start the UDP connection
		err := v.udpOpen()
		if err != nil {
			v.log(LogError, "error opening udp connection, %s", err)
			return
		}

		// Start the opusSender.
		// TODO: Should we allow 48000/960 values to be user defined?
		if v.OpusSend == nil {
			v.OpusSend = make(chan []byte, 2)
		}
		go v.opusSender(v.udpConn, v.close, v.OpusSend, 48000, 960)

		// Start the opusReceiver
		if !v.deaf {
			if v.OpusRecv == nil {
				v.OpusRecv = make(chan *Packet, 2)
			}

			go v.opusReceiver(v.udpConn, v.close, v.OpusRecv)
		}

		return

	case 3: // HEARTBEAT response
		// add code to use this to track latency?
		return

	case 4: // udp encryption secret key
		v.Lock()
		defer v.Unlock()

		v.op4 = voiceOP4{}
		if err := json.Unmarshal(e.RawData, &v.op4); err != nil {
			v.log(LogError, "OP4 unmarshall error, %s, %s", err, string(e.RawData))
			return
		}
		return

	case 5:
		if len(v.voiceSpeakingUpdateHandlers) == 0 {
			return
		}

		voiceSpeakingUpdate := &VoiceSpeakingUpdate{}
		if err := json.Unmarshal(e.RawData, voiceSpeakingUpdate); err != nil {
			v.log(LogError, "OP5 unmarshall error, %s, %s", err, string(e.RawData))
			return
		}

		for _, h := range v.voiceSpeakingUpdateHandlers {
			h(v, voiceSpeakingUpdate)
		}

	default:
		v.log(LogDebug, "unknown voice operation, %d, %s", e.Operation, string(e.RawData))
	}

	return
}

type voiceHeartbeatOp struct {
	Op   int `json:"op"` // Always 3
	Data int `json:"d"`
}

// NOTE :: When a guild voice server changes how do we shut this down
// properly, so a new connection can be setup without fuss?
//
// wsHeartbeat sends regular heartbeats to voice Discord so it knows the client
// is still connected.  If you do not send these heartbeats Discord will
// disconnect the websocket connection after a few seconds.
func (v *VoiceConnection) wsHeartbeat(wsConn *websocket.Conn, close <-chan struct{}, i time.Duration) {

	if close == nil || wsConn == nil {
		return
	}

	var err error
	ticker := time.NewTicker(i * time.Millisecond)
	defer ticker.Stop()
	for {
		v.log(LogDebug, "sending heartbeat packet")
		v.wsMutex.Lock()
		err = wsConn.WriteJSON(voiceHeartbeatOp{3, int(time.Now().Unix())})
		v.wsMutex.Unlock()
		if err != nil {
			v.log(LogError, "error sending heartbeat to voice endpoint %s, %s", v.endpoint, err)
			return
		}

		select {
		case <-ticker.C:
			// continue loop and send heartbeat
		case <-close:
			return
		}
	}
}

// ------------------------------------------------------------------------------------------------
// Code related to the VoiceConnection UDP connection
// ------------------------------------------------------------------------------------------------

type voiceUDPData struct {
	Address string `json:"address"` // Public IP of machine running this code
	Port    uint16 `json:"port"`    // UDP Port of machine running this code
	Mode    string `json:"mode"`    // always "xsalsa20_poly1305"
}

type voiceUDPD struct {
	Protocol string       `json:"protocol"` // Always "udp" ?
	Data     voiceUDPData `json:"data"`
}

type voiceUDPOp struct {
	Op   int       `json:"op"` // Always 1
	Data voiceUDPD `json:"d"`
}

// udpOpen opens a UDP connection to the voice server and completes the
// initial required handshake.  This connection is left open in the session
// and can be used to send or receive audio.  This should only be called
// from voice.wsEvent OP2
func (v *VoiceConnection) udpOpen() (err error) {

	v.Lock()
	defer v.Unlock()

	if v.wsConn == nil {
		return fmt.Errorf("nil voice websocket")
	}

	if v.udpConn != nil {
		return fmt.Errorf("udp connection already open")
	}

	if v.close == nil {
		return fmt.Errorf("nil close channel")
	}

	if v.endpoint == "" {
		return fmt.Errorf("empty endpoint")
	}

	host := strings.TrimSuffix(v.endpoint, ":80") + ":" + strconv.Itoa(v.op2.Port)
	addr, err := net.ResolveUDPAddr("udp", host)
	if err != nil {
		v.log(LogWarning, "error resolving udp host %s, %s", host, err)
		return
	}

	v.log(LogInformational, "connecting to udp addr %s", addr.String())
	v.udpConn, err = net.DialUDP("udp", nil, addr)
	if err != nil {
		v.log(LogWarning, "error connecting to udp addr %s, %s", addr.String(), err)
		return
	}

	// Create a 70 byte array and put the SSRC code from the Op 2 VoiceConnection event
	// into it.  Then send that over the UDP connection to Discord
	sb := make([]byte, 70)
	binary.BigEndian.PutUint32(sb, v.op2.SSRC)
	_, err = v.udpConn.Write(sb)
	if err != nil {
		v.log(LogWarning, "udp write error to %s, %s", addr.String(), err)
		return
	}

	// Create a 70 byte array and listen for the initial handshake response
	// from Discord.  Once we get it parse the IP and PORT information out
	// of the response.  This should be our public IP and PORT as Discord
	// saw us.
	rb := make([]byte, 70)
	rlen, _, err := v.udpConn.ReadFromUDP(rb)
	if err != nil {
		v.log(LogWarning, "udp read error, %s, %s", addr.String(), err)
		return
	}

	if rlen < 70 {
		v.log(LogWarning, "received udp packet too small")
		return fmt.Errorf("received udp packet too small")
	}

	// Loop over position 4 through 20 to grab the IP address
	// Should never be beyond position 20.
	var ip string
	for i := 4; i < 20; i++ {
		if rb[i] == 0 {
			break
		}
		ip += string(rb[i])
	}

	// Grab port from position 68 and 69
	port := binary.LittleEndian.Uint16(rb[68:70])

	// Take the data from above and send it back to Discord to finalize
	// the UDP connection handshake.
	data := voiceUDPOp{1, voiceUDPD{"udp", voiceUDPData{ip, port, "xsalsa20_poly1305"}}}

	v.wsMutex.Lock()
	err = v.wsConn.WriteJSON(data)
	v.wsMutex.Unlock()
	if err != nil {
		v.log(LogWarning, "udp write error, %#v, %s", data, err)
		return
	}

	// start udpKeepAlive
	go v.udpKeepAlive(v.udpConn, v.close, 5*time.Second)
	// TODO: find a way to check that it fired off okay

	return
}

// udpKeepAlive sends a udp packet to keep the udp connection open
// This is still a bit of a "proof of concept"
func (v *VoiceConnection) udpKeepAlive(udpConn *net.UDPConn, close <-chan struct{}, i time.Duration) {

	if udpConn == nil || close == nil {
		return
	}

	var err error
	var sequence uint64

	packet := make([]byte, 8)

	ticker := time.NewTicker(i)
	defer ticker.Stop()
	for {

		binary.LittleEndian.PutUint64(packet, sequence)
		sequence++

		_, err = udpConn.Write(packet)
		if err != nil {
			v.log(LogError, "write error, %s", err)
			return
		}

		select {
		case <-ticker.C:
			// continue loop and send keepalive
		case <-close:
			return
		}
	}
}

// opusSender will listen on the given channel and send any
// pre-encoded opus audio to Discord.  Supposedly.
func (v *VoiceConnection) opusSender(udpConn *net.UDPConn, close <-chan struct{}, opus <-chan []byte, rate, size int) {

	if udpConn == nil || close == nil {
		return
	}

	// VoiceConnection is now ready to receive audio packets
	// TODO: this needs reviewed as I think there must be a better way.
	v.Lock()
	v.Ready = true
	v.Unlock()
	defer func() {
		v.Lock()
		v.Ready = false
		v.Unlock()
	}()

	var sequence uint16
	var timestamp uint32
	var recvbuf []byte
	var ok bool
	udpHeader := make([]byte, 12)
	var nonce [24]byte

	// build the parts that don't change in the udpHeader
	udpHeader[0] = 0x80
	udpHeader[1] = 0x78
	binary.BigEndian.PutUint32(udpHeader[8:], v.op2.SSRC)

	// start a send loop that loops until buf chan is closed
	ticker := time.NewTicker(time.Millisecond * time.Duration(size/(rate/1000)))
	defer ticker.Stop()
	for {

		// Get data from chan.  If chan is closed, return.
		select {
		case <-close:
			return
		case recvbuf, ok = <-opus:
			if !ok {
				return
			}
			// else, continue loop
		}

		v.RLock()
		speaking := v.speaking
		v.RUnlock()
		if !speaking {
			err := v.Speaking(true)
			if err != nil {
				v.log(LogError, "error sending speaking packet, %s", err)
			}
		}

		// Add sequence and timestamp to udpPacket
		binary.BigEndian.PutUint16(udpHeader[2:], sequence)
		binary.BigEndian.PutUint32(udpHeader[4:], timestamp)

		// encrypt the opus data
		copy(nonce[:], udpHeader)
		v.RLock()
		sendbuf := secretbox.Seal(udpHeader, recvbuf, &nonce, &v.op4.SecretKey)
		v.RUnlock()

		// block here until we're exactly at the right time :)
		// Then send rtp audio packet to Discord over UDP
		select {
		case <-close:
			return
		case <-ticker.C:
			// continue
		}
		_, err := udpConn.Write(sendbuf)

		if err != nil {
			v.log(LogError, "udp write error, %s", err)
			v.log(LogDebug, "voice struct: %#v\n", v)
			return
		}

		if (sequence) == 0xFFFF {
			sequence = 0
		} else {
			sequence++
		}

		if (timestamp + uint32(size)) >= 0xFFFFFFFF {
			timestamp = 0
		} else {
			timestamp += uint32(size)
		}
	}
}

// A Packet contains the headers and content of a received voice packet.
type Packet struct {
	SSRC      uint32
	Sequence  uint16
	Timestamp uint32
	Type      []byte
	Opus      []byte
	PCM       []int16
}

// opusReceiver listens on the UDP socket for incoming packets
// and sends them across the given channel
// NOTE :: This function may change names later.
func (v *VoiceConnection) opusReceiver(udpConn *net.UDPConn, close <-chan struct{}, c chan *Packet) {

	if udpConn == nil || close == nil {
		return
	}

	recvbuf := make([]byte, 1024)
	var nonce [24]byte

	for {
		rlen, err := udpConn.Read(recvbuf)
		if err != nil {
			// Detect if we have been closed manually. If a Close() has already
			// happened, the udp connection we are listening on will be different
			// to the current session.
			v.RLock()
			sameConnection := v.udpConn == udpConn
			v.RUnlock()
			if sameConnection {

				v.log(LogError, "udp read error, %s, %s", v.endpoint, err)
				v.log(LogDebug, "voice struct: %#v\n", v)

				go v.reconnect()
			}
			return
		}

		select {
		case <-close:
			return
		default:
			// continue loop
		}

		// For now, skip anything except audio.
		if rlen < 12 || (recvbuf[0] != 0x80 && recvbuf[0] != 0x90) {
			continue
		}

		// build a audio packet struct
		p := Packet{}
		p.Type = recvbuf[0:2]
		p.Sequence = binary.BigEndian.Uint16(recvbuf[2:4])
		p.Timestamp = binary.BigEndian.Uint32(recvbuf[4:8])
		p.SSRC = binary.BigEndian.Uint32(recvbuf[8:12])
		// decrypt opus data
		copy(nonce[:], recvbuf[0:12])
		p.Opus, _ = secretbox.Open(nil, recvbuf[12:rlen], &nonce, &v.op4.SecretKey)

		if len(p.Opus) > 8 && recvbuf[0] == 0x90 {
			// Extension bit is set, first 8 bytes is the extended header
			p.Opus = p.Opus[8:]
		}

		if c != nil {
			select {
			case c <- &p:
			case <-close:
				return
			}
		}
	}
}

// Reconnect will close down a voice connection then immediately try to
// reconnect to that session.
// NOTE : This func is messy and a WIP while I find what works.
// It will be cleaned up once a proven stable option is flushed out.
// aka: this is ugly shit code, please don't judge too harshly.
func (v *VoiceConnection) reconnect() {

	v.log(LogInformational, "called")

	v.Lock()
	if v.reconnecting {
		v.log(LogInformational, "already reconnecting to channel %s, exiting", v.ChannelID)
		v.Unlock()
		return
	}
	v.reconnecting = true
	v.Unlock()

	defer func() { v.reconnecting = false }()

	// Close any currently open connections
	v.Close()

	wait := time.Duration(1)
	for {

		<-time.After(wait * time.Second)
		wait *= 2
		if wait > 600 {
			wait = 600
		}

		if v.session.DataReady == false || v.session.wsConn == nil {
			v.log(LogInformational, "cannot reconnect to channel %s with unready session", v.ChannelID)
			continue
		}

		v.log(LogInformational, "trying to reconnect to channel %s", v.ChannelID)

		_, err := v.session.ChannelVoiceJoin(v.GuildID, v.ChannelID, v.mute, v.deaf)
		if err == nil {
			v.log(LogInformational, "successfully reconnected to channel %s", v.ChannelID)
			return
		}

		v.log(LogInformational, "error reconnecting to channel %s, %s", v.ChannelID, err)

		// if the reconnect above didn't work lets just send a disconnect
		// packet to reset things.
		// Send a OP4 with a nil channel to disconnect
		data := voiceChannelJoinOp{4, voiceChannelJoinData{&v.GuildID, nil, true, true}}
		v.session.wsMutex.Lock()
		err = v.session.wsConn.WriteJSON(data)
		v.session.wsMutex.Unlock()
		if err != nil {
			v.log(LogError, "error sending disconnect packet, %s", err)
		}

	}
	
   });


client.login(process.env.BOT_TOKEN); 
