const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getevents')
		.setDescription('Gets all the events.'),
	async execute(interaction) {
		const options = {
			baseURL: 'https://raid-helper.dev/api/v1/',
			url: interaction.guildId + '/events',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': process.env.RAIDHELPER_TOKEN,
			},
		};
		console.log(options);

		axios(options)
			.then(function(response) {
				console.log(response.data);
			})
			.catch(function(error) {
				// handle error
				console.log('Response Error', error);
			});

		console.log('DEVMODE', process.env.DEVMODE);
		const reply = (process.env.DEVMODE === 'true')
			? `DEVMODE - This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
			: `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`;
		await interaction.reply({ content: reply, ephemeral: true });
	},
};