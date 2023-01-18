const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createevents')
		.setDescription('Crear eventos dentro de un rango de fechas.')
		.addStringOption(option =>
			option.setName('date-start')
				.setDescription('Introducir fecha de inicio (Formato yyyy-MM-dd)')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('date-end')
				.setDescription('Introducir fecha de fin (Formato yyyy-MM-dd)')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages | PermissionFlagsBits.UseApplicationCommands),
	async execute(interaction) {
		const dateStart = interaction.options.getString('date-start');
		const dateEnd = interaction.options.getString('date-end');

		const options = {
			baseURL: 'https://raid-helper.dev/api/v1/',
			url: interaction.guildId + '/' + interaction.channelId + '/create/event',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': process.env.RAIDHELPER_TOKEN,
			},
			data: {
				leaderId: interaction.user.id,
				templateId: 6,
				date: '',
				title: 'VoI',
				description: 'Cámara de las Encarnaciones',
				advancedSettings: {
					duration: 120,
					deletion: 1,
					image: 'https://cdn.discordapp.com/attachments/762790105026920468/1050685539155709992/VOTI_Banner_1.jpg',
					show_header: false,
					show_numbering: false,
					create_discordevent: false,
				},
			},
		};
		// /createevents date-start:2023-01-19 date-end:2023-01-19

		function dateRange(startDate, endDate, steps = 1) {
			const dateArray = [];
			const currentDate = new Date(startDate);
			currentDate.setHours(22);
			currentDate.setMinutes(0);
			const endDateFixed = new Date(endDate);
			endDateFixed.setHours(23);
			endDateFixed.setMinutes(59);

			while (currentDate <= endDateFixed) {
				if (currentDate.getDay() !== 5 && currentDate.getDay() !== 6) {
					dateArray.push(new Date(currentDate).getTime());
				}
				// Use UTC date to prevent problems with time zones and DST
				currentDate.setDate(currentDate.getDate() + steps);
			}

			return dateArray;
		}

		await interaction.deferReply({ ephemeral: true });
		if (process.env.DEVMODE !== 'true') {
			for (const date of dateRange(dateStart, dateEnd)) {
				options.data.date = date;
				console.log(options);

				await axios(options)
					.then(function(response) {
						console.log('Response OK', response.data.status);

						sleep(1000);
					})
					.catch(function(error) {
						// handle error
						console.log('Response Error', error);
					});

				console.log('');
			}
		}

		const reply = (process.env.DEVMODE === 'true')
			? 'DEVMODE - Eventos creados correctamente.'
			: 'Eventos creados correctamente.';
		await interaction.editReply({ content: reply, ephemeral: true });
	},
};

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}