import sequelize from '@/database/sequelizeClient';

(async () => {
    try {
        await sequelize.initialize();
    } catch (e) {
        console.log(e);
    }
})();
