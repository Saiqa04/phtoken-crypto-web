const db = require('../../models/index');
const { GraphQLScalarType, Kind } = require ('graphql');
const { sequelize } = require('../../models/index');
const { Op, QueryTypes } = require('sequelize')
const moment = require('moment'); 
const { UserInputError } = require('apollo-server-core');

const resolvers = {

    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
          return new Date(value); // value from the client
        },
        parseLiteral(ast) {
          if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
          }
          return null;
        },
    }),
    Query: {
        ContractAddresses: async (root, args, context) => {
            try{
                return await db.Coins.findAll({
                    limit: args.limit,
                    where: {
                        Status: "Approved"
                    }
                })
            }catch(err){
                return err;
            }
        },

        Coins: async (root, args, context) => {
            try{
                return await db.Coins.findAll({
                    offset: args.offset,
                    limit: args.limit,
                    where: {
                        Status: "Approved"
                    }
                })
            }catch(err){
                return err;
            }
        },

        CoinByNameOrAddress: async (root, args, context) => {
            try{
                const result = await db.Coins.findAll({
                    where: {
                        [Op.or]: {
                            Name: {
                                [Op.iLike]: '%'+args.Name+'%'
                            },
                            ContractAddress: {
                                [Op.eq]: args.ContractAddress
                            }
                        },
                        Status: "Approved"
                    }
                })
                
                if(result.length > 0){
                    return result;
                }else {
                    throw new UserInputError("No result found.")
                }
            }catch(err){
                return err;
            }
        },

        CoinDetails: async (root, args, context) => {
            try{
                const result =  await db.Coins.findOne({
                    where: {
                        Symbol: {
                            [Op.eq]: args.Symbol
                        }
                    }
                });
                if(result) {
                    return result
                }else{
                    throw new UserInputError("No result found.");
                }
            }catch(err){
                return err;
            }
        },

        TopCoins: async (root, args, context) => {
            if(args.query === 'VoteToday'){
                return await sequelize.query(`SELECT Coin."CoinID", COUNT(CASE WHEN Vote."DateOfVote" = CURRENT_DATE THEN 0 END) as VoteToday, "Name", 
                "Chain", "Symbol", "ContractAddress",
                "LaunchDate", "IsPresale", "IsDoxxed", "Description", "AuditLink", "Website", "Telegram", "Twitter", "Discord", "LogoLink", "ContactEmail", 
                "Status", Coin."createdAt", Coin."updatedAt" FROM "Coins" as Coin LEFT JOIN "Votes" as Vote ON Coin."CoinID" = Vote."CoinID" WHERE Coin."Status" = 'Approved' GROUP BY Coin."CoinID" 
                ORDER BY VoteToday DESC LIMIT ${args.limit} OFFSET ${args.offset}`, {
                    raw: true,
                    type: QueryTypes.SELECT})
            }else if(args.query === 'AllTimeVote'){
                return await sequelize.query(`SELECT Coin."CoinID", COUNT(Vote."DateOfVote") as AllTimeVote, "Name", 
                "Chain", "Symbol", "ContractAddress", 
                "LaunchDate", "IsPresale", "IsDoxxed", "Description", "AuditLink", "Website", "Telegram", "Twitter", "Discord", "LogoLink", "ContactEmail", 
                "Status", Coin."createdAt", Coin."updatedAt" FROM "Coins" as Coin LEFT JOIN "Votes" as Vote ON Coin."CoinID" = Vote."CoinID" WHERE Coin."Status" = 'Approved' GROUP BY Coin."CoinID" 
                ORDER BY AllTimeVote DESC LIMIT ${args.limit} OFFSET ${args.offset}`, {
                    raw: true,
                    type: QueryTypes.SELECT})
            }else {
                return null;
            }
        },
               
        NewCoins: async (root, args, context) => {
            return await db.Coins.findAll({
                offset: args.offset,
                limit: args.limit,
                where: {
                    Status: "Approved"
                },
                group: "Coins.CoinID",
                order: [
                    ["createdAt", "DESC"]
                ]
            })
        },

        Doxxed: async (root, args, context) => {
            return await db.Coins.findAll({
                offset: args.offset,
                limit: args.limit,
                where: {
                    Status: "Approved",
                    IsDoxxed: {
                        [Op.eq]: true
                    }
                }
            })
        },
        
        Presale: async (root, args, context) => {
            return await db.Coins.findAll({
                offset: args.offset,
                limit: args.limit,
                where: {
                    Status: "Approved",
                    IsPresale: true
                },
                order: [
                    ["LaunchDate","DESC"]
                ]
            })
        },    

        PromotedCoins: async () => {
            try {
                const currDate = moment(new Date()).format("YYYY-MM-DD");
                const promotedCoins =  await db.PromotedCoins.findAll({
                    where: {
                        [Op.and]: {
                            StartDate: {
                                [Op.lte]: currDate
                            },
                            EndDate: {
                                [Op.gte]: currDate
                            }
                        }
                    }
                });
                return promotedCoins;

            }catch(err){
                return err;
            }
        },

        Chains: async() => {
            return await db.Chains.findAll();
        },

        ReservationByNumber: async (root, args, context) => {
            const reservation = await db.Reservations.findByPk(args.Number);
           if(reservation == null){
                throw new UserInputError(`Reservation with ${args.Number} cannot be found.`);
           }else {
                return reservation;
           }
        },

        BannerAds: async() => {
            const currDate = moment(new Date()).format("YYYY-MM-DD");
            return await db.BannerAds.findAll({
                where: {
                    [Op.and]: {
                        StartDate: {
                            [Op.lte]: currDate
                        },
                        EndDate: {
                            [Op.gte]: currDate
                        }
                    }
                }
            })
        },

        ///ADMIN
        GetUpcomingPromotions: async () => {
            try {
                const currDate = moment(new Date()).format("YYYY-MM-DD");
                const upcomingPromotions =  await db.PromotedCoins.findAll({
                    where: {
                       StartDate: {
                           [Op.gt]: currDate
                       }
                    },

                    order: [
                        ["StartDate","ASC"]
                    ]
                });
                return upcomingPromotions;

            }catch(err){
                return err;
            }
        },

        AllCoinCount: async() => {
            const {count, row} = await db.Coins.findAndCountAll({
                where: {
                    Status: {
                        [Op.eq]: "Approved"
                    }
                }
            })
            return count
        },

        ForApprovalCoinCount: async() => {
            const {count, row} = await db.Coins.findAndCountAll({
                where: {
                    Status: {
                        [Op.eq]: "Pending"
                    }
                }
            })
            return count
        },

        DoxxedCoinCount: async () => {
            const {count, row} = await db.Coins.findAndCountAll({
                where: {
                    Status: {
                        [Op.eq]: "Approved"
                    },
                    IsDoxxed: {
                        [Op.eq]: true
                    }
                }
            })
            return count
        },

        PresaleCoinCount: async () => {
            const {count, row} = await db.Coins.findAndCountAll({
                where: {
                    Status: {
                        [Op.eq]: "Approved"
                    },
                    IsPresale: {
                        [Op.eq]: true
                    }
                }
            })
            return count
        },

        PendingReservationCount: async () => {
            const {count, row} = await db.Reservations.findAndCountAll({
                where: {
                    PaymentStatus: {
                        [Op.eq]: "Pending"
                    }
                }
            })

            return count
        },

        Reservations: async (_,{Status}, context) => {
            const results = await db.Reservations.findAll({
                where: {
                    PaymentStatus: {
                        [Op.eq]: Status
                    }
                }
            })

            return results
        },

        ForApprovalCoins: async () =>{
            return await db.Coins.findAll({
                where: {
                    Status: {
                        [Op.eq]: "Pending"
                    }
                }
            })

        },
        
        GetTransactions: async() => {
            return await db.Transactions.findAll({
                limit: 100,
                order: [
                    ["createdAt","DESC"]
                ]
            })
        },

        VoteLog: async () => {
            return await db.Votes.findAll({
                limit: 100,
                order: [
                    ["createdAt","DESC"]
                ]
            })
        }

    },

    Coin: {
        VoteToday: async (parent) => {
            try{
                const {count, rows} = await db.Votes.findAndCountAll({
                    where: {
                        CoinID: {
                            [Op.eq]: parent.CoinID
                        },
                        DateOfVote: {
                            [Op.eq]: moment(new Date()).format("YYYY-MM-DD")
                        }
                    }
                })
                return count;

            }catch(err){
                return err;
            }
        },

        AllTimeVote: async (parent) => {
            try {
                const {count, rows} = await db.Votes.findAndCountAll({
                    where: {
                        CoinID: {
                            [Op.eq]: parent.CoinID
                        }
                    }
                })
                return count;
            } catch (err) {
                return err;
            }
        },

        IsUpvoted: async (parent, {}, context) => {
            try {
                const {count, rows} = await db.Votes.findAndCountAll({
                    where: {
                        DateOfVote: {
                            [Op.eq]: moment(new Date()).format("YYYY-MM-DD")
                        },
                        IPAddress: {
                            [Op.eq]: context.clientIP
                        },
                        CoinID: {
                            [Op.eq]: parent.CoinID
                        }
                    }
                })

              if(count > 0){
                  return true;
              }else {
                  return false;
              }

            }catch(err){
                return err;
            }
        }
    },
    
    PromotedCoin: {
        Coins: async (parent) => {
            try{
                return await db.Coins.findByPk(parent.CoinID)
            }catch(err){
                return err;
            }
        },
    },

    Mutation: {
        voteCoin: async (_, {CoinID}, context) => {
            const {count, rows} = await db.Votes.findAndCountAll({
                where: {
                    DateOfVote: {
                        [Op.eq]: moment(new Date()).format("YYYY-MM-DD")
                    },
                    IPAddress: {
                        [Op.eq]: context.clientIP
                    },
                    CoinID: {
                        [Op.eq]: CoinID
                    }
                }
            })
            
            if(count > 0) {
                throw new UserInputError(`You can vote the same coin once a day.`)
            } else {
                await db.Votes.create({
                    DateOfVote: moment(),
                    IPAddress: context.clientIP,
                    CoinID
                }).catch(() => {
                    throw new UserInputError(`Something went wrong while trying to vote, would you like to try again?`)
                })
            }
        },
        
        createCoin: async(_, {Name, Symbol, Chain,
            ContractAddress,Description,
            IsPresale,LaunchDate,
            Telegram,Website,
            Twitter,Discord,
            AuditLink,LogoLink,ContactEmail,Status}, context) => {


                await db.Coins.create({
                    Name, Symbol, Chain,
                    ContractAddress,Description,
                    IsPresale,LaunchDate,
                    Telegram,Website,
                    Twitter,Discord,
                    AuditLink,LogoLink,ContactEmail, Status
                }).catch(() => {
                    throw new UserInputError(`We seems to have issue adding your coin. Please check your inputs and try again?`)
                })
        },

        createPromotion: async(_, {CoinID, StartDate,EndDate, ReservationNumber, Number, PaymentStatus, TxnHash, Memo}, context) => {
            const t = await sequelize.transaction();
            try {
                await db.PromotedCoins.create({
                    CoinID,StartDate,
                    EndDate,ReservationNumber
                }, {transaction: t});
    
                await db.Transactions.create({
                    Number, TxnHash, Memo
                }, { transaction: t});

                await db.Reservations.findOne({where: {
                    Number: {
                        [Op.eq]: Number
                    },
                }},{transaction: t}).then(function(res){
                    res.PaymentStatus = PaymentStatus;
                    return res.save({transaction: t})
                })

                await t.commit();

            } catch (error) {
                await t.rollback();
                throw new UserInputError(error + " Rolling back changes.")
            }
        },

        createReservation: async(_,{Number,AdType, StartDate, EndDate, Telegram, AmountToPay, Discount, PaymentStatus}) => {
            try {
                await db.Reservations.create({Number,
                    AdType, StartDate, 
                    EndDate, Telegram, AmountToPay,
                    Discount, PaymentStatus
                }).catch(() => {
                    throw new UserInputError(`We're sorry, we coudn't create your reservation, would you like to try again?.`)
                })
            }catch(error){
                throw new error;
            }
        },

        removePromotedCoin: async(_,{id},context) => {
            await db.PromotedCoins.destroy({
                where: {
                    id: {
                        [Op.eq]: id
                    }
                }
            }).catch(() => {
                throw new UserInputError(`Deletion failed, would you like to try again?.`)
            })
        },

        updateReservationStatus: async(_,{Number, PaymentStatus}, context) => {
            const row = await db.Reservations.findByPk(Number)

            if(!row){
                throw new UserInputError("Error while trying to update reservation status.")
            }

            row.PaymentStatus = PaymentStatus;
            await row.save();
        },

        updateCoinInfo: async(_,{CoinID, Name,Symbol,Chain,ContractAddress,Description,IsPresale,IsDoxxed,LaunchDate,Telegram,Website,Twitter,Discord,AuditLink,LogoLink, ContactEmail, Status}, context) => {
                
                const coin = await db.Coins.findOne({
                    where: {
                        CoinID: {
                            [Op.eq]: CoinID
                        }
                    }
                })
                if(!coin){
                    throw new UserInputError("Coin not found.")
                }
                
                coin.Name = Name;
                coin.Symbol = Symbol;
                coin.Chain = Chain;
                coin.ContractAddress = ContractAddress;
                coin.Description = Description;
                coin.IsPresale = IsPresale;
                coin.IsDoxxed = IsDoxxed;
                coin.LaunchDate = LaunchDate;
                coin.Telegram = Telegram;
                coin.Website = Website;
                coin.Twitter = Twitter;
                coin.Discord = Discord;
                coin.AuditLink = AuditLink;
                coin.LogoLink = LogoLink;
                coin.ContactEmail = ContactEmail;
                coin.Status = Status

                await coin.save();

        },

        createBannerAd: async(_,{BannerType, ImageLocation, StartDate, EndDate, ReservationNumber, Telegram, Swap, Website, BannerName, Description, Number, PaymentStatus, TxnHash, Memo}, context) => {
            const t = await sequelize.transaction();
            try {
                await db.BannerAds.create({BannerType,ImageLocation,
                    StartDate,EndDate
                    ,ReservationNumber,Telegram,
                    Swap,Website,BannerName,Description
                },{ transaction: t});
    
                await db.Transactions.create({
                    Number, TxnHash, Memo
                }, { transaction: t})

                const row = await db.Reservations.findByPk(Number)
                row.PaymentStatus = PaymentStatus;


                await t.commit();
                await row.save();

            } catch (error) {
                await t.rollback();
                throw new UserInputError(error + " Rolling back changes.")
            }
        },

        createChain: async (_,{ChainSymbol, Name, Logo}, context) => {
            await db.Chains.create({
                ChainSymbol,
                Name,
                Logo
            }).catch(() => {
                throw new UserInputError(`Unable to create new Chain, would you like to try again?.`)
            })
        }
    },
};

module.exports = resolvers