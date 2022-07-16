import { gql} from '@apollo/client';

export const GET_PROMOTED_COINS = gql`
    query GetPromotedCoins{
        PromotedCoins {
            id
            CoinID
            Coins {
                CoinID
                Name
                Chain
                Symbol
                ContractAddress
                LaunchDate
                IsPresale
                IsDoxxed
                Description
                AuditLink
                Website
                Telegram
                Twitter
                Discord
                LogoLink
                VoteToday
                AllTimeVote
                IsUpvoted
            }
        }
    }
`;
export const GET_ALL_ADDRESSES = gql`
    query ContractAddresses($limit: Int!) {
        ContractAddresses(limit: $limit) {
            CoinID
            Name
            ContractAddress
        }
    }
`;
export const GET_COINS = gql`
    query GetCoins($offset: Int!){
        Coins(limit: 20, offset: $offset){
            CoinID
            Name
            Chain
            Symbol
            ContractAddress
            LaunchDate
            IsPresale
            IsDoxxed
            Description
            AuditLink
            Website
            Telegram
            Twitter
            Discord
            LogoLink
            VoteToday
            AllTimeVote
            IsUpvoted
        }
    }
`;
export const GET_TOP_COINS = gql`
    query GetTopCoins($offset: Int!, $query: String!){
        TopCoins(limit: 10, offset: $offset, query: $query){
            CoinID
            Name
            Chain
            Symbol
            ContractAddress
            LaunchDate
            IsPresale
            IsDoxxed
            Description
            AuditLink
            Website
            Telegram
            Twitter
            Discord
            LogoLink
            VoteToday
            AllTimeVote
            IsUpvoted
        }
    }
`;
export const GET_NEW_COINS = gql`
    query GetNewCoins($offset: Int!){
        NewCoins(limit: 20, offset: $offset){
            CoinID
            Name
            Chain
            Symbol
            ContractAddress
            LaunchDate
            IsPresale
            IsDoxxed
            Description
            AuditLink
            Website
            Telegram
            Twitter
            Discord
            LogoLink
            VoteToday
            AllTimeVote
            IsUpvoted
        }
    }
`;
export const GET_DOXXED_COINS = gql`
    query GetDoxxedCoins($offset: Int!){
        Doxxed(limit: 20, offset: $offset){
            CoinID
            Name
            Chain
            Symbol
            ContractAddress
            LaunchDate
            IsPresale
            IsDoxxed
            Description
            AuditLink
            Website
            Telegram
            Twitter
            Discord
            LogoLink
            VoteToday
            AllTimeVote
            IsUpvoted
        }
    }
`;
export const GET_PRESALE_COINS = gql`
    query GetPresaleCoins($offset: Int!){
        Presale(limit: 20, offset: $offset){
            CoinID
            Name
            Chain
            Symbol
            ContractAddress
            LaunchDate
            IsPresale
            IsDoxxed
            Description
            AuditLink
            Website
            Telegram
            Twitter
            Discord
            LogoLink
            VoteToday
            AllTimeVote
            IsUpvoted
        }
    }
`;

export const GET_COIN_DETAILS = gql`
   query GetCoinDetails($symbol: String!) {
        CoinDetails(Symbol: $symbol) {
            CoinID
            Name
            Chain
            Symbol
            ContractAddress
            LaunchDate
            IsPresale
            IsDoxxed
            Description
            AuditLink
            Website
            Telegram
            Twitter
            Discord
            LogoLink
            VoteToday
            AllTimeVote
            Status
            IsUpvoted
            createdAt
            updatedAt
        }
    }
`;
export const GET_COIN_BY_NAME_OR_ADDRESS = gql`
   query GetCoinByNameOrAddress($name: String, $contractAddress: String) {
        CoinByNameOrAddress(Name: $name, ContractAddress: $contractAddress) {
            CoinID
            Name
            Chain
            Symbol
            ContractAddress
            LaunchDate
            IsPresale
            IsDoxxed
            Description
            AuditLink
            Website
            Telegram
            Twitter
            Discord
            LogoLink
            VoteToday
            AllTimeVote
            Status
            IsUpvoted
        }
    }
`;
export const GET_CHAINS = gql`
    query GetChains {
        Chains {
            ChainID
            ChainSymbol
            Name
            Logo
            createdAt
            updatedAt
        }
    }
`;
export const GET_RESERVATION_BY_NUMBER = gql`
    query GetReservationByNumber($number: String!) {
        ReservationByNumber(Number: $number) {
            Number
            AdType
            StartDate
            EndDate
            Telegram
            AmountToPay
            Discount
            PaymentStatus
        }
    }
`;
export const GET_BANNER_ADS = gql`
    query GetBannerAds {
        BannerAds {
            id
            BannerType
            ImageLocation
            StartDate
            EndDate
            ReservationNumber
            Telegram
            Swap
            Website
            BannerName
            Description
        }
    }
`;
export const VOTE_COIN = gql`
   mutation voteCoin($coinId: ID!) {
        voteCoin(CoinID: $coinId)
    }
`;
export const ADD_COIN = gql`
    mutation CreateCoin($name: String!, $symbol: String!, $chain: String!, $contractAddress: String!, $description: String!, $isPresale: Boolean!, $launchDate: Date!, $telegram: String!, $website: String, $twitter: String, $discord: String, $audit: String, $logo: String!, $contactEmail: String!, $status: String!) {
        createCoin(Name: $name, Symbol: $symbol, Chain: $chain, ContractAddress: $contractAddress, Description: $description, IsPresale: $isPresale, LaunchDate: $launchDate, Telegram: $telegram, Website: $website, Twitter: $twitter, Discord: $discord, AuditLink: $audit, LogoLink: $logo, ContactEmail:$contactEmail, Status: $status)
    }
`;
export const ADD_RESERVATION = gql`
    mutation CreateReservation($adType: String, $startDate: Date, $endDate: Date, $telegram: String, $amountToPay: Float, $discount: Float, $paymentStatus: String, $number: String!) {
        createReservation(AdType: $adType, StartDate: $startDate, EndDate: $endDate, Telegram: $telegram, AmountToPay: $amountToPay, Discount: $discount, PaymentStatus: $paymentStatus, Number: $number)
    }
`;