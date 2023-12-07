const BloodLettingActivityModel = require("./Model/ActivityModel");

const checkDate = async () => {
  try {
    const currentDate = new Date();

    const updatedStatus = await BloodLettingActivityModel.updateMany(
        {
          $and: [
            { date: { $lt: currentDate } },
            // Add your additional condition(s) here
            { status: 'On-Going' },
          ],
        },
        { $set: { status: 'End' } }
      );
    
    console.log('Cron Job Result:',  updatedStatus);
    // Add your logic to process the results or take actions based on the data
    
  } catch (error) {
    console.error('Cron Job Error:', error);
  }
};

module.exports = checkDate;