const { ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'unlock',
    description: "Ontgrendel een specifiek kanaal.",
    options: [
        {
            name: 'kanaal',
            description: 'Het kanaal dat ontgrendeld moet worden.',
            type: ApplicationCommandOptionType.Channel,
            required: false,
        },
    ],
    run: async (client, interaction) => {
        let targetChannel = interaction.options.getChannel('kanaal');

        // Als er geen kanaal is opgegeven, ontgrendel dan het huidige kanaal
        if (!targetChannel) {
            targetChannel = interaction.channel;
        }

        try {
            await targetChannel.permissionOverwrites.delete(interaction.guild.id);

            const embed = new EmbedBuilder()
                .setDescription(`Het kanaal ${targetChannel} is ontgrendeld.`)
                .setColor('#5865F2');

            await interaction.reply({
                embeds: [embed],
            });

        } catch (error) {
            console.error(error);
            interaction.reply({ content: "Er is een fout opgetreden bij het ontgrendelen van het kanaal.", ephemeral: true }); 
        }
    }
};
