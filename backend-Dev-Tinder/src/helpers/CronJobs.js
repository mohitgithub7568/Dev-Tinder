const cron = require('node-cron');
const ConnectionRequestModel = require('../models/connectionRequests');
const { subDays, startOfDay, endOfDay } = require('date-fns');
const sendEmail = require('./sendEmail');
// Cron job to run every day at 8 AM
cron.schedule('0 8 * * *', async () => {
    try {
        const yesterday = subDays(new Date(), 1);

        const yesterDayStart = startOfDay(yesterday);
        const yesterDayEnd = endOfDay(yesterday);

        const pendingRequests = await ConnectionRequestModel.find({
            status: 'interested',
            createdAt: { $gte: yesterDayStart, $lte: yesterDayEnd }
        }).populate('toUserId', 'email firstName');

        const listOfEmails = [
            ...new Map(
                pendingRequests.map((request) => [request.toUserId.email, {
                    email: request.toUserId.email,
                    name: request.toUserId.firstName,
                }])
            ).values(),
        ];

        console.log("List of emails to be sent:", listOfEmails);

        for (const recipient of listOfEmails) {
            const emailResponse = await sendEmail.run(
                recipient.email,
                `Hello ${recipient.name}, you have new connection requests waiting for your review. Please log in to your account to see the details and respond to them.`
            );
            console.log(`Email sent to ${recipient.email}:`, emailResponse);
        }

    }
    catch (err) {
        console.error('Error running cron job:', err);
    }
});

