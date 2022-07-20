module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Coins', 'PresaleLink', {
            type: Sequelize.STRING(300),
            allowNull: true
        }),
        await queryInterface.changeColumn('Coins', 'AuditLink', {
            type: Sequelize.STRING(300),
            allowNull: true
        }),
        await queryInterface.changeColumn('Coins', 'LogoLink', {
            type: Sequelize.STRING(300),
            allowNull: false
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Coins', 'PresaleLink', {
            type: Sequelize.INTEGER,
            allowNull: true
        }),
        await queryInterface.changeColumn('Coins', 'AuditLink', {
            type: Sequelize.STRING(100),
            allowNull: true
        }),
        await queryInterface.changeColumn('Coins', 'LogoLink', {
            type: Sequelize.STRING(100),
            allowNull: false
        })
    }
}


