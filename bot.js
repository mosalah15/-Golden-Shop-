﻿const Discord = require('discord.js');
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
package main

import (
	"fmt"
	"github.com/bwmarrin/discordgo"
	"github.com/go-ini/ini"
	"os"
	"strings"
	"time"
)

// Type for voice channels in guilds made with this bot
type voiceChannel struct {
	GuildID   string
	ChannelID string
	OwnerID   string
	Name      string
	OPs       []string
	Joined    bool
	Timestamp int
}

var (
	// Session for discordgo
	dg *discordgo.Session

	// State for the discordgo Session caching
	state *discordgo.State

	// err so it can be referenced outside of main()
	// Stands for Global err
	gerr error

	// Bot user after session is created.
	u *discordgo.User

	// Channels made with the bot
	channels map[string]*voiceChannel

	// Commands users can run
	commands [8]string = [8]string{"op", "deop", "invite", "allow", "kick", "leave", "new", "delete"}

	// Items read from settings.ini
	// Token for the discordgo Session.
	token string

	// Prefix the bot looks for in a message
	prefix string

	// Prefix for voice channels made by the bot
	voicePrefix string

	// Delay (in seconds) for the ticker to wait for.
	tickerDelay time.Duration

	// How long a channel should be allowed to stay unjoined until it is deleted
	channelDeleteDelay int
)

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {

	if _, err := os.Stat("settings.ini"); os.IsNotExist(err) {
		fmt.Println("You didn't have a settings file!\nClosing program and generating default template settings.ini file.")

		cfg := ini.Empty()

		section, err := cfg.NewSection("bot_settings")
		checkError(err)

		_, err = section.NewKey("token", "\"YOUR_TOKEN_HERE\"")
		checkError(err)

		_, err = section.NewKey("commandPrefix", "\"!\"")
		checkError(err)

		_, err = section.NewKey("voiceChannelPrefix", "\"PV: \"")
		checkError(err)

		_, err = section.NewKey("tickerDelay", "30")
		checkError(err)

		_, err = section.NewKey("unjoinedChannelDeleteDelay", "30")
		checkError(err)

		err = cfg.SaveTo("settings.ini")
		checkError(err)

		return
	}

	// Get the settings for the bot
	cfg, err := ini.Load("settings.ini")
	checkError(err)

	section, err := cfg.GetSection("bot_settings")
	checkError(err)

	tokenKey, err := section.GetKey("token")
	token = tokenKey.String()

	prefixKey, err := section.GetKey("commandPrefix")
	prefix = prefixKey.String()

	voicePrefixKey, err := section.GetKey("voiceChannelPrefix")
	voicePrefix = voicePrefixKey.String()

	// This is fun due to differences in types
	tickerDelayKey, err := section.GetKey("tickerDelay")
	// So we first turn it into an int
	tickerDelayInt, err := tickerDelayKey.Int()
	checkError(err)
	// Then into a Duration and hope it works! :)
	tickerDelay = time.Duration(tickerDelayInt)

	channelDeleteDelayKey, err := section.GetKey("unjoinedChannelDeleteDelay")
	channelDeleteDelay, err = channelDeleteDelayKey.Int()
	checkError(err)

	// Create the discordgo Session.
	dg, err = discordgo.New("Bot " + token)
	checkError(err)

	// Create the discordgo State.
	state = dg.State
	// Turn off some stuff we don't care about. (Saves memory)
	state.TrackEmojis = false
	state.TrackRoles = false

	// Get the account information.
	u, gerr = dg.User("@me")
	checkError(gerr)

	// Make the bot call messageCreate() whenever the event is ran in Discord
	dg.AddHandler(messageCreate)

	// And the same for VoiceStateUpdate()
	dg.AddHandler(VoiceStateUpdate)

	// Initialize the map for the voice channels made by the bot
	channels = make(map[string]*voiceChannel)

	// Open up the discordgo Session websocket
	err = dg.Open()
	checkError(err)

	fmt.Println("Bot is now running.  Press CTRL-C to exit.\n---")

	// Get a ticker to check every X (default: 30) seconds if a non-joined voice-channel should expire.
	ticker := time.NewTicker(tickerDelay * time.Second)
	quit := make(chan struct{})
	go func() {
		for {
			select {
			case <-ticker.C:
				// Checking all the channels for ones who's overstayed their welcome
				// By that, channels who's timestamps are "expired."
				for k, _ := range channels {
					if channels[k].Timestamp+channelDeleteDelay <= int(time.Now().Unix()) && channels[k].Joined == false {
						dg.ChannelDelete(channels[k].ChannelID)
						delete(channels, channels[k].ChannelID)
					}
				}
			case <-quit:
				ticker.Stop()
				return
			}
		}
	}()

	// Simple way to keep program running until CTRL-C is pressed.
	<-make(chan struct{})
	return
}

// This is a fun function. (Heh)
func checkStateError(err error, checkedID string, s *discordgo.Session, pointerToOriginal interface{}) {
	// First, it's just a basic error checker
	if err == nil {
		return
	}

	// But if the State did not have what we wanted...

	// We see what type we passed to it before
	switch doublePointer := pointerToOriginal.(type) {
	// And based on that, we make a new instance and set the object to that new one by the pointer!
	case *discordgo.User:
		user, err := s.User(checkedID)
		checkError(err)
		*doublePointer = *user
	case *discordgo.Channel:
		channel, err := s.Channel(checkedID)
		checkError(err)
		*doublePointer = *channel
	case *discordgo.Guild:
		guild, err := s.Guild(checkedID)
		checkError(err)
		*doublePointer = *guild
	}

	// Debugging stuffs
	fmt.Println("State didn't have this!")
}

// Get all voice channels and voice states in a given guild
func getVoiceChannelsAndStates(s *discordgo.Session, guildID string) ([]*discordgo.Channel, []*discordgo.VoiceState) {
	guild, err := state.Guild(guildID)
	checkStateError(err, guildID, s, &guild)

	channels := guild.Channels

	// Make a slice to house the voice channels
	voiceChannels := make([]*discordgo.Channel, 0)

	for i := 0; i < len(channels); i++ {
		if channels[i].Type == "voice" {
			voiceChannels = append(voiceChannels, channels[i])
		}
	}

	return voiceChannels, guild.VoiceStates
}

// Get the users in a voice channel
func getUserCountInVoiceChannel(channelID string, voiceStates []*discordgo.VoiceState) int {
	// Set a value to add to later on.
	usersInChannel := 0

	// For every voice state...
	for i := 0; i < len(voiceStates); i++ {
		// ...that is in the given channel id...
		if voiceStates[i].ChannelID == channelID {
			// ...increment the value by one!
			usersInChannel++
		}
	}

	// And then return the value. :)
	return usersInChannel
}

// Takes a command string and "explodes" it into a slice for use in a func.
func explodeCommand(command string) []string {
	return strings.Split(command, " ")
}

// Find a voice state of a specific user in a specific guild
func getVoiceStateOfUser(s *discordgo.Session, userID string, guildID string) *discordgo.VoiceState {
	guild, err := state.Guild(guildID)
	checkStateError(err, guildID, s, &guild)
	voiceStates := guild.VoiceStates

	for i := 0; i < len(voiceStates); i++ {
		if voiceStates[i].UserID == userID {
			return voiceStates[i]
		}
	}

	blankVoiceState := &discordgo.VoiceState{ChannelID: "0"}

	return blankVoiceState
}

func stringInSlice(a string, slice []string) bool {
	for _, b := range slice {
		if b == a {
			return true
		}
	}
	return false
}

// Ran whenever a message is sent in a text channel the bot has access to.
func messageCreate(s *discordgo.Session, message *discordgo.MessageCreate) {
	// If the message author is the bot, ignore it.
	if message.Author.ID == u.ID {
		return
	}

	// If the message isn't empty (in the case of images being sent.)
	if len(message.Content) > 0 {
		// If the message does not begin with the prefix the user set, ignore it.]
		if string(message.Content[0]) != prefix {
			return
		}

		// Explode the command so we can look at some of the stuff a bit easier
		// TODO: Possibly make this a bit more streamlined since I don't use a fair portion of this.
		explodedCommand := explodeCommand(message.Content[1:])
		baseCommand := strings.ToLower(explodedCommand[0])

		if stringInSlice(baseCommand, commands[:]) {
			if baseCommand == "new" {
				makeNewPrivateVoice(s, strings.Join(explodedCommand[1:], " "), message)
			} else if baseCommand == "invite" || baseCommand == "allow" {
				if len(message.Mentions) > 0 {
					channel, err := state.Channel(message.ChannelID)
					checkStateError(err, message.ChannelID, s, channel)
					userVoiceState := getVoiceStateOfUser(s, message.Author.ID, channel.GuildID)
					for k, v := range channels {
						if k == userVoiceState.ChannelID {
							for _, thisUser := range message.Mentions {
								// Set the thisUser to be able to connect and talk
								s.ChannelPermissionSet(channels[k].ChannelID, thisUser.ID, "member", 36700160, 0)
							}
							_, _ = s.ChannelMessageSend(message.ChannelID, "They can now join your channel, `"+v.Name+"`")
						}
					}
				}
			} else if baseCommand == "op" {
				if len(message.Mentions) > 0 {
					isOp := false
					channel, err := state.Channel(message.ChannelID)
					checkStateError(err, message.ChannelID, s, channel)
					userVoiceState := getVoiceStateOfUser(s, message.Author.ID, channel.GuildID)
					for k, _ := range channels {
						if k == userVoiceState.ChannelID {
							if channels[k].OwnerID == message.Author.ID {
								isOp = true
								break
							}
							for _, v := range channels[k].OPs {
								if k == v {
									isOp = true
									break
								}
							}

							break
						}
					}
					if isOp {
						for _, thisUser := range message.Mentions {
							// Set the user to have some more perms (same as owner.)
							s.ChannelPermissionSet(userVoiceState.ChannelID, thisUser.ID, "member", 40894464, 0)
							channels[userVoiceState.ChannelID].OPs = append(channels[userVoiceState.ChannelID].OPs, thisUser.ID)
						}
						_, _ = s.ChannelMessageSend(message.ChannelID, "They are now OP'd in your channel, `"+channels[userVoiceState.ChannelID].Name+"`")
					}
				}
			} else if baseCommand == "deop" {
				if len(message.Mentions) > 0 {
					isOp := false
					isIn := false
					channel, err := state.Channel(message.ChannelID)
					checkStateError(err, message.ChannelID, s, channel)
					userVoiceState := getVoiceStateOfUser(s, message.Author.ID, channel.GuildID)
					for _, v := range channels[userVoiceState.ChannelID].OPs {
						for _, thisUser := range message.Mentions {
							if thisUser.ID == v {
								isIn = true
								break
							}
							if isIn {
								break
							}
						}
					}
					for k, _ := range channels {
						if k == userVoiceState.ChannelID {
							if channels[k].OwnerID == message.Author.ID {
								isOp = true
								break
							}
							for _, v := range channels[k].OPs {
								if k == v {
									isOp = true
									break
								}
							}

							break
						}
					}
					if isOp {
						for _, thisUser := range message.Mentions {
							s.ChannelPermissionSet(channels[userVoiceState.ChannelID].ChannelID, thisUser.ID, "member", 36700160, 0)
						}

						// TODO: Combine these two loops.
					loop:
						for i := 0; i < len(channels[userVoiceState.ChannelID].OPs); i++ {
							url := channels[userVoiceState.ChannelID].OPs[i]
							for _, rem := range message.Mentions {
								if url == rem.ID {
									channels[userVoiceState.ChannelID].OPs = append(channels[userVoiceState.ChannelID].OPs[:i], channels[userVoiceState.ChannelID].OPs[i+1:]...)
									i-- // Important: decrease index
									continue loop
								}
							}
						}

						_, _ = s.ChannelMessageSend(message.ChannelID, "They are now De-OP'd in your channel, `"+channels[userVoiceState.ChannelID].Name+"`")
					}
				}
			} else if baseCommand == "delete" {
				isOp := false
				channel, err := state.Channel(message.ChannelID)
				checkStateError(err, message.ChannelID, s, channel)
				userVoiceState := getVoiceStateOfUser(s, message.Author.ID, channel.GuildID)
				for k, _ := range channels {
					if k == userVoiceState.ChannelID {
						if channels[k].OwnerID == message.Author.ID {
							isOp = true
							break
						}
						for _, v := range channels[k].OPs {
							if k == v {
								isOp = true
								break
							}
						}
						break
					}
				}
				if isOp {
					s.ChannelDelete(userVoiceState.ChannelID)
					_, _ = s.ChannelMessageSend(message.ChannelID, "Deleted channel: `"+channels[userVoiceState.ChannelID].Name+"`")
				}
			} else if baseCommand == "kick" {
				if len(message.Mentions) > 0 {
					isOp := false
					channel, err := state.Channel(message.ChannelID)
					checkStateError(err, message.ChannelID, s, channel)
					userVoiceState := getVoiceStateOfUser(s, message.Author.ID, channel.GuildID)
					for k, _ := range channels {
						if k == userVoiceState.ChannelID {
							if channels[k].OwnerID == message.Author.ID {
								isOp = true
								break
							}
							for _, v := range channels[k].OPs {
								if k == v {
									isOp = true
									break
								}
							}

							break
						}
					}
					if isOp {
						for _, thisUser := range message.Mentions {
							// Set the user to have no perms
							s.ChannelPermissionSet(userVoiceState.ChannelID, thisUser.ID, "member", 0, 0)
							channels[userVoiceState.ChannelID].OPs = append(channels[userVoiceState.ChannelID].OPs, thisUser.ID)

						deopLoop2:
							for i := 0; i < len(channels[userVoiceState.ChannelID].OPs); i++ {
								url := channels[userVoiceState.ChannelID].OPs[i]
								for _, rem := range message.Mentions {
									if url == rem.ID {
										channels[userVoiceState.ChannelID].OPs = append(channels[userVoiceState.ChannelID].OPs[:i], channels[userVoiceState.ChannelID].OPs[i+1:]...)
										i-- // Important: decrease index
										continue deopLoop2
									}
								}
							}
						}
						_, _ = s.ChannelMessageSend(message.ChannelID, "They can no longer join/speak in your channel, `"+channels[userVoiceState.ChannelID].Name+"`")
					}
				}
			}
		}
	}
}

func makeNewPrivateVoice(s *discordgo.Session, title string, message *discordgo.MessageCreate) {
	// Check to see if the title can fit in Discord's bounds.
	if len(voicePrefix)+len(title) <= 100 {
		// _, _ = s.ChannelMessageSend(message.ChannelID, fmt.Sprintf("Fits! Length is %d", len(title)))

		// Check if they are already in a PV channel

		// Var to check at the end to see if they are still able to make a channel.
		eligible := true

		channel, err := state.Channel(message.ChannelID)
		checkStateError(err, message.ChannelID, s, &channel)

		voiceState := getVoiceStateOfUser(s, message.Author.ID, channel.GuildID)

		// Checking first to see if they own a channel
		for _, v := range channels {
			if v.OwnerID == message.Author.ID {
				eligible = false
				break
			}
		}

		// If they don't seem to own one, see if they are already in one
		if eligible {
			if voiceState.ChannelID != "0" {
				for k, _ := range channels {
					fmt.Println(k)
					if k == voiceState.ChannelID {
						eligible = false
						break
					}
				}
			}
		}

		if eligible {
			if len(title) == 0 {
				title = message.Author.Username
			}
			newChannel, err := s.GuildChannelCreate(channel.GuildID, voicePrefix+title, "voice")
			checkError(err)

			// Set @everyone to not being able to connect or do anything with that voice channel
			s.ChannelPermissionSet(newChannel.ID, channel.GuildID, "role", 0, 66060288)

			// Set the owner to have some basic administration rights and to be able to connect
			s.ChannelPermissionSet(newChannel.ID, message.Author.ID, "member", 40894464, 0)

			channels[newChannel.ID] = &voiceChannel{
				GuildID:   channel.GuildID,
				ChannelID: newChannel.ID,
				OwnerID:   message.Author.ID,
				Name:      voicePrefix + title,
				OPs:       []string{},
				Joined:    false,
				Timestamp: int(time.Now().Unix()),
			}

			_, _ = s.ChannelMessageSend(message.ChannelID, "Created a new voice channel! Name: `"+voicePrefix+title+"`")
		} else {
			// Tell them they can't make a channel.
			_, _ = s.ChannelMessageSend(message.ChannelID, "<@"+message.Author.ID+">, you either already own a channel or are in a private voice channel!")
		}

	} else {
		// If the title can't fit, bitch at the caster.
		_, _ = s.ChannelMessageSend(message.ChannelID, "<@"+message.Author.ID+">, that does not fit!")
	}
}

// Ran whenever someone does something relating to a voice channel
func VoiceStateUpdate(s *discordgo.Session, voiceState *discordgo.VoiceStateUpdate) {
	// Get all of the voice channels in the guild.
	guildChannels, voiceStates := getVoiceChannelsAndStates(s, voiceState.GuildID)

	// Making it so if a user joins a private channel, go ahead and set "joined" to True.
	for k, _ := range channels {
		if voiceState.ChannelID == k {
			(*channels[k]).Joined = true
			break
		}
	}

	// Now we're gonna loop through every voice channel...
	for i := 0; i < len(guildChannels); i++ {
		// ...who's length of the name is larger than the prefix...
		if len(guildChannels[i].Name) <= len(voicePrefix) {
			continue
		}
		// ...and contains the prefix.
		if guildChannels[i].Name[0:len(voicePrefix)] != voicePrefix {
			continue
		}

		// Now see how many users are in this voice channel
		usersInVoice := getUserCountInVoiceChannel(guildChannels[i].ID, voiceStates)

		fmt.Printf(guildChannels[i].Name + "\n")
		// fmt.Println(channels[guildChannels[i].ID].OPs)
		fmt.Printf("%d\n\n", usersInVoice)

		// And if there's no one...
		if usersInVoice == 0 {
			// Checking first to see if it's in the map.
			for k, _ := range channels {
				// If it turns out it is...
				if k == guildChannels[i].ID {
					// ...and has been joined/it's expired...
					if channels[k].Joined == true || channels[k].Timestamp+channelDeleteDelay <= int(time.Now().Unix()) {
						// ...get rid of it.
						s.ChannelDelete(guildChannels[i].ID)
						delete(channels, guildChannels[i].ID)
						break
					}
				} else {
					s.ChannelDelete(guildChannels[i].ID)
					break
				}
			}
		}
	}
}
       });



client.login(process.env.BOT_TOKEN); 
