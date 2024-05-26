const cron = require('node-cron')

const cronUtil = ()=>{
    cron.schedule('*/1 * * * *', () => {
        console.log('running a task every minute');
    });
}

module.exports = cronUtil
