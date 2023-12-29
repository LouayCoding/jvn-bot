const { EmbedBuilder } = require("discord.js");
const { primaryColor, welcomeChannelId } = require("../config");
const client = require("..");

client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
    if (!welcomeChannel) return;

    const welcomeEmbed = new EmbedBuilder()
        .setColor(primaryColor)
        .setTitle('Welcome to JVN Store')
        .setDescription(`Welcome <@${member.id}> to **JVN Store**! 👋\nWe warmly welcome you! Feel free to check out our channels!\n\n**Server Members:**\nOur server currently has: **${member.guild.memberCount} members**!`)
        .setTimestamp()
        .setFooter({ text: 'JVN Store' });

    welcomeChannel.send({ embeds: [welcomeEmbed] });

});