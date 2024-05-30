const cron = require('node-cron')

const cronUtil = ()=>{
    cron.schedule('*/9 * * * *', () => {
        console.log('everything is looking good');
    });
}

module.exports = cronUtil
