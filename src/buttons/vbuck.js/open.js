const { ModalBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    id: 'open',
    permissions: [],
    run: async (client, interaction) => {
        await interaction.channel.setParent('1189650782295953528');
        interaction.message.delete();

        const openButton = new ButtonBuilder()
        .setCustomId('close2')
        .setLabel('Close')
        .setStyle(ButtonStyle.Danger)

        const embed = new EmbedBuilder()
        .setColor('#DA373C')
        .setDescription('Please click **Close** button to close the ticket.')


        const buttons = new ActionRowBuilder().addComponents(openButton);
        interaction.channel.send({ embeds: [embed], components: [buttons] });

    },
}
