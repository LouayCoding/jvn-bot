const { ModalBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    id: 'close2',
    permissions: [],
    run: async (client, interaction) => {
        await interaction.channel.setParent('1190072158509088859');
        interaction.message.delete();
        const openButton = new ButtonBuilder()
        .setCustomId('open')
        .setLabel('Reopen')
        .setStyle(ButtonStyle.Success)

        const embed = new EmbedBuilder()
        .setColor('#248046')
        .setDescription('Please click the **Reopen** button to reopen the ticket.')


        const buttons = new ActionRowBuilder().addComponents(openButton);
        interaction.channel.send({ embeds: [embed], components: [buttons] });

    },
}
