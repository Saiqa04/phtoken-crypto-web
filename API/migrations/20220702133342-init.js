'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Coins', {
      CoinID: {       
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Chain: {
          type: Sequelize.STRING,
          allowNull: false
      },
      Symbol: {
          type: Sequelize.STRING,
          allowNull: false
      },
      ContractAddress: {
          type: Sequelize.STRING,
          allowNull: false
      },
      LaunchDate: {
          type: Sequelize.DATEONLY,
          allowNull: false
      },
      IsPresale: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
      },
      IsDoxxed: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
      },
      Description: {
          type: Sequelize.STRING(300),
          allowNull: true
      },
      AuditLink: {
          type: Sequelize.STRING(100),
          allowNull: true
      },
      Website: {
          type: Sequelize.STRING(64),
          allowNull: true
      },
      Telegram: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      Twitter: {
          type: Sequelize.STRING(100),
          allowNull: true
      },
      Discord: {
          type: Sequelize.STRING(100),
          allowNull: true
      },
      LogoLink: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      ContactEmail: {
          type: Sequelize.STRING(64),
          allowNull: true
      },
      Status: {
          type: Sequelize.STRING(64),
          allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('PromotedCoins', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      CoinID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Coins',
            key: 'CoinID'
          }
      },
      StartDate: {
          type: Sequelize.DATEONLY,
          allowNull: false
      },
      EndDate: {
          type: Sequelize.DATEONLY,
          allowNull: false
      },
      ReservationNumber: {
          type: Sequelize.STRING,
          allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    await queryInterface.createTable('Votes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      CoinID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Coins',
            key: "CoinID"
          }
      },
      DateOfVote: {
          type: Sequelize.DATEONLY,
          allowNull: false
      },
      IPAddress: {
          type: Sequelize.STRING,
          allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    await queryInterface.createTable('BannerAds', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      BannerType: {
          //Fixed Banner, Rotating Banner, Popup Banner
          type: Sequelize.STRING,
          allowNull: false
      },
      ImageLocation: {
          type: Sequelize.STRING,
          allowNull: false
      },
      StartDate: {
          type: Sequelize.DATEONLY,
          allowNull: false
      },
      EndDate: {
          type: Sequelize.DATEONLY,
          allowNull: false
      },
      ReservationNumber: {
          type: Sequelize.STRING,
          allowNull: false
      },
      Telegram: {
          type: Sequelize.STRING,
          allowNull: false
      },
      Swap: {
          type: Sequelize.STRING,
          allowNull: false
      },
      Website: {
          type: Sequelize.STRING,
          allowNull: false
      },
      BannerName: {
          type: Sequelize.STRING,
          allowNull: false
      },
      Description: {
          type: Sequelize.STRING,
          allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    await queryInterface.createTable('Chains', {
      ChainID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ChainSymbol: {
          type: Sequelize.STRING,
          allowNull: false
      },
      Name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      Logo: {
          type: Sequelize.STRING,
          allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    await queryInterface.createTable('Reservations', {
      Number: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      AdType: {
          ///Fixed Banner, Rotating Banner, Popup Banner, Promoted Coin
          type: Sequelize.STRING,
          allowNull: false
      },
      StartDate: {
          type: Sequelize.DATEONLY,
          allowNull: false
      },
      EndDate: {
          type: Sequelize.DATEONLY,
          allowNull: false
      },
      Telegram: {
          type: Sequelize.STRING,
          allowNull: false
      },
      AmountToPay: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      Discount: {
          type: Sequelize.DOUBLE,
          allowNull: false
      },
      PaymentStatus: {
          ///Values: ['Paid','Pending']
          type: Sequelize.STRING,
          allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    await queryInterface.createTable('Transactions', {
      Number: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      TxnHash: {
          type: Sequelize.STRING,
          allowNull: false
      },
      Memo: {
          type: Sequelize.STRING,
          allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};