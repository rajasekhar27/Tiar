import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL;
const accountsClientUrl = process.env.NEXT_PUBLIC_ACCOUNTS_CLIENT;
const bitgoAdminUrl = process.env.NEXT_PUBLIC_BITGO_ADMIN;
const cricDataAdminUrl = process.env.NEXT_PUBLIC_CRICDATA_ADMIN;
const cricDataClientUrl = process.env.NEXT_PUBLIC_CRICDATA_CLIENT;
const cricketFantasyAdminUrl = process.env.NEXT_PUBLIC_CRICKETFANTASY_ADMIN;
const walletAdminUrl = process.env.NEXT_PUBLIC_WALLET_ADMIN;
const hellsBayClientUrl = process.env.NEXT_PUBLIC_HELLSBAY_CLIENT;
const socialMediaClientUrl = process.env.NEXT_PUBLIC_SOCIALMEDIA_CLIENT;
const notificationClientUrl = process.env.NEXT_PUBLIC_NOTIFICATION_CLIENT;
const ticketsClientUrl = process.env.NEXT_PUBLIC_TICKETS_CLIENT;
const chatClientUrl = process.env.NEXT_PUBLIC_CHAT_CLIENT;
const nftClientUrl = process.env.NEXT_PUBLIC_NFT_CLIENT;

const restApi = createApi({
  reducerPath: "restApi",

  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,

    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: [
    "Wallet",
    "Profile",
    "Teams",
    "ContestJoinCheck",
    "Whitelist",
    "Followers",
    "Following",
    "Friends",
    "CricketMatchReminders",
    "CricketSeriesReminders",
    "MobileVerification",
  ],

  endpoints: (builder) => ({
    requestLoginOtp: builder.mutation({
      query: (body) => ({
        url: `${accountsClientUrl}user-phone-check/`,
        method: "POST",
        body,
      }),
    }),

    otpLogin: builder.mutation({
      query: (body) => ({
        url: `${accountsClientUrl}user-otp-login/`,
        method: "POST",
        body,
      }),
    }),

    // ** User register otp request
    requestRegistrationOtp: builder.mutation({
      query: (data) => ({
        url: `${accountsClientUrl}user-enroll-check/`,
        method: "POST",
        body: data.data,
      }),
    }),

    // ** User Registration Otp Verification
    verifyRegistrationOtp: builder.mutation({
      query: (data) => ({
        url: `${accountsClientUrl}user-otp-check/`,
        method: "POST",
        body: data.data,
      }),
    }),

    // ** request for registration
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${accountsClientUrl}user-creation/`,
        method: "POST",
        body: data.data,
      }),
    }),

    // ** request email verification otp
    emailRegistrationOtpRequest: builder.mutation({
      query: (data) => ({
        url: `${accountsClientUrl}user-enroll-check-email/`,
        method: "POST",
        body: data.data,
      }),
    }),

    // ** email verification check
    emailRegistrationOtpVerification: builder.mutation({
      query: (data) => ({
        url: `${accountsClientUrl}user-email-otp-check/`,
        method: "POST",
        body: data.data,
      }),
    }),

    // ** request email verification otp
    emailRegistration: builder.mutation({
      query: (data) => ({
        url: `${accountsClientUrl}user-creation-email/`,
        method: "POST",
        body: data.data,
      }),
    }),

    //** Wallet **//
    // ** Create Wallet
    createWallet: builder.mutation({
      query: (body) => ({
        url: `${bitgoAdminUrl}wallet-creation/`,
        method: "POST",
        body,
      }),

      invalidatesTags: ["Wallet"],
    }),

    // ** Get All Wallets Creation Requests
    getAllWalletCreationRequests: builder.query({
      query: (data) => `${bitgoAdminUrl}wallet-creation/`,

      providesTags: ["Wallet"],
    }),

    // ** Get All Wallets of User
    getAllWalletsOfUser: builder.query({
      query: (data) => `${bitgoAdminUrl}user-wallets/`,
    }),

    // ** Check weather walletID exist
    checkWalletId: builder.query({
      query: (data) => `${bitgoAdminUrl}wallets-details/${data.walletId}/`,
    }),

    // ** get Wallet All Transactions
    getWalletAllTransactions: builder.query({
      query: (data) => `${bitgoAdminUrl}wallet-transactions/${data.walletId}/`,
    }),

    // ** get Deposit Address by WalletID
    getDepositAddressByWalletID: builder.query({
      query: (data) =>
        `${bitgoAdminUrl}wallets-deposit-address/${data.walletId}/`,
    }),

    // ** initiate Transaction
    initiateTransaction: builder.mutation({
      query: (data) => ({
        url: `${bitgoAdminUrl}create-transaction/`,
        method: "POST",
        body: data,
      }),
    }),

    // ** Cricket Fantasy ** //
    // ** get All UpcomingMatches
    getAllUpcomingMatches: builder.query({
      query: (data) =>
        `${cricDataAdminUrl}match-list/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** get contests for a match
    getMatchContestsBySlug: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}contests-match/${data?.slug}/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** get user participated contest for a match
    getUserParticipatedContestsByMatchSlug: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}user-contests-match/${data?.slug}/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** get Match Details
    getMatchDetails: builder.query({
      query: (data) => `${cricketFantasyAdminUrl}match-details/${data.slug}/`,
    }),

    // ** Contest Winnings
    getContestWinning: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}winnings-contests/${data.slug}/`,
    }),

    getAllContestWinnings: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}contest-winnings-all/${data.slug}/?limit=${data.limit}&offset=${data.offset}`,
    }),

    getAllContestNFTs: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}contest-nft-winnings/${data.slug}/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** Contest Leader board
    getContestLeaderboard: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}leaderboard-contests/${data.slug}/`,
    }),

    // ** get Contest Details
    getContestDetails: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}contest-details/${data?.slug}/`,

      providesTags: ["ContestJoinCheck"],
    }),

    // ** get Players of a match
    getPlayersOfMatch: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}match-players/${data.slug}/?search=${data.search}`,
    }),

    // ** Create Team
    createTeam: builder.mutation({
      query: (data) => ({
        url: `${cricketFantasyAdminUrl}user-create-team/${data?.slug}/`,
        method: "POST",
        body: data.data,
      }),

      invalidatesTags: ["Teams"],
    }),

    // ** Get All Teams By Match Slug
    getAllTeamsByMatchSlug: builder.query({
      query: (data) => `${cricketFantasyAdminUrl}match-teams/${data.slug}/`,

      providesTags: ["Teams"],
    }),

    // ** Get All Teams By Contest Slug
    getAllTeamsByContestSlug: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}contest-match-teams/${data.slug}/`,

      providesTags: ["Teams"],
    }),

    // ** Enter Contest
    enterContest: builder.mutation({
      query: (data) => ({
        url: `${cricketFantasyAdminUrl}user-participation-teams/`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Teams", "ContestJoinCheck"],
    }),

    // ** validate address
    validateAddress: builder.query({
      query: (data) =>
        `${walletAdminUrl}wallet-address-verify/${data?.address}/`,
    }),

    createLocalTransaction: builder.mutation({
      query: (data) => ({
        url: `${walletAdminUrl}wallet-transaction/`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Wallet"],
    }),

    createLocalTransactionEmail: builder.mutation({
      query: (data) => ({
        url: `${walletAdminUrl}wallet-transaction-email/`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Wallet"],
    }),

    getUserContests: builder.query({
      query: (data) => `${cricketFantasyAdminUrl}user-participated-contests/`,
    }),

    raiseWithdrawRequest: builder.mutation({
      query: (data) => ({
        url: `${walletAdminUrl}user-withdraw/?coin=${data?.coin}`,
        method: "POST",
        body: data.data,
      }),
    }),

    // ** HellsBay
    getAllFeed: builder.query({
      query: (data) =>
        `${hellsBayClientUrl}feed/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** Events > hellsBay Fight League
    getHFLEvents: builder.query({
      query: (data) =>
        `${hellsBayClientUrl}events/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** User participated contest details
    getUserParticipatedContestDetails: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}participated-contest/${data?.slug}/`,
    }),

    // ** updateTeams
    updateContestTeams: builder.mutation({
      query: (data) => ({
        url: `${cricketFantasyAdminUrl}team-switching/${data?.slug}/`,
        method: "PUT",
        body: data.data,
      }),
    }),

    // ** get User Virtual Wallet Transactions
    getUserVirtualWalletTransactions: builder.query({
      query: (data) =>
        `${walletAdminUrl}virtual-wallet-transactions-all/${data.slug}/?limit=${data.limit}&offset=${data.offset}&main_purpose=${data.mainPurpose}`,
    }),

    // ** get user wallet balance by bitgo_wallet_address
    getUserWalletBalance: builder.query({
      query: (data) =>
        `${walletAdminUrl}user-wallet-balance/${data?.wallet_id}/`,

      providesTags: ["Wallet"],
    }),

    // ** get User Overall Balance
    getUserOverallBalance: builder.query({
      query: (data) => `${walletAdminUrl}user-total-balance/`,

      providesTags: ["Wallet"],
    }),

    // ** get Wallet Details by wallet slug
    getWalletDetailsByWalletSlug: builder.query({
      query: (data) => `${walletAdminUrl}wallet-details/${data?.slug}/`,

      providesTags: ["Wallet"],
    }),

    // ** Home Page Start ** //
    // ** Get Latest Releases
    getLatestReleases: builder.query({
      query: (data) =>
        `${hellsBayClientUrl}latest-releases-all/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** Get Gaming Contests
    getGamingContests: builder.query({
      query: (data) =>
        `${hellsBayClientUrl}gaming-contests-all/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** Get Upcoming Events
    getUpcomingEvents: builder.query({
      query: (data) =>
        `${hellsBayClientUrl}hfl-events-all/?limit=${data.limit}&offset=${data.offset}`,
    }),
    // ** Home Page End ** //

    // ** HellsBay Start ** //
    // ** NewsFeed
    // ** For carousel
    getFeed: builder.query({
      query: (data) =>
        `${hellsBayClientUrl}feeds-all/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** Hfl Updates
    getHflUpdates: builder.query({
      query: (data) =>
        `${hellsBayClientUrl}hfl-updates-all/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** Events
    // ** Hfl Fight Leagues
    getHflFightLeagues: builder.query({
      query: (data) =>
        `${hellsBayClientUrl}fight-league/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** Title Matches
    getTitleMatches: builder.query({
      query: (data) =>
        `${hellsBayClientUrl}matches-all/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** Store
    getAllStoreProducts: builder.query({
      query: (data) =>
        `${hellsBayClientUrl}products-all/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** HellsBay End ** //

    // ** Referal Leaderboard
    getReferralLeaderboard: builder.query({
      query: (data) =>
        `${accountsClientUrl}get-all-referal-codes/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** get current players count for cricket
    getCurrentPlayersCount: builder.query({
      query: (data) => `${cricketFantasyAdminUrl}users-playing-contest/`,
    }),

    // ** update Profile Data
    updateProfileData: builder.mutation({
      query: (data) => ({
        url: `${accountsClientUrl}user-profile-update/${data?.slug}/`,
        method: "PUT",
        body: data.data,
      }),

      invalidatesTags: ["Profile"],
    }),

    // ** update profile picture
    updateProfilePicture: builder.mutation({
      query: (data) => ({
        url: `${accountsClientUrl}user-profile-image-update/${data?.slug}/`,
        method: "PUT",
        body: data.data,
      }),

      invalidatesTags: ["Profile"],
    }),

    // ** get User Profile
    getUserProfileDetails: builder.query({
      query: (data) => `${accountsClientUrl}login-user-details/`,

      providesTags: ["Profile"],
    }),

    // ** request login email otp
    emailLoginOtp: builder.mutation({
      query: (data) => ({
        url: `${accountsClientUrl}user-email-check/`,
        method: "POST",
        body: data,
      }),
    }),

    // ** email login
    emailLogin: builder.mutation({
      query: (data) => ({
        url: `${accountsClientUrl}user-email-otp-login/`,
        method: "POST",
        body: data,
      }),
    }),

    // ** userRecentlyPlayedContests
    userRecentlyPlayedContests: builder.query({
      query: (data) =>
        data?.status
          ? `${cricketFantasyAdminUrl}user-recently-played-contest/?limit=${data?.limit}&offset=${data.offset}&status=${data?.status}`
          : `${cricketFantasyAdminUrl}user-recently-played-contest/?limit=${data?.limit}&offset=${data.offset}`,
    }),

    // ** Opponent Recent Played Matches
    getOpponentRecentPlayedMatches: builder.query({
      query: (data) =>
        data?.status
          ? `${cricketFantasyAdminUrl}user-recently-played-contest/?limit=${data?.limit}&offset=${data.offset}&owner=${data.slug}&status=${data?.status}`
          : `${cricketFantasyAdminUrl}user-recently-played-contest/?limit=${data?.limit}&offset=${data.offset}&owner=${data.slug}`,
    }),

    // ** Get Match Slug with Contest Slug
    getMatchSlugByContestSlug: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}get-match-contest/${data.slug}/`,
    }),

    // ** View Other Players Team Details
    viewOtherTeamDetails: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}user-team-player-points/${data?.slug}/`,
    }),

    // ** Match Score
    getMatchScoreBySlug: builder.query({
      query: (data) => `${cricketFantasyAdminUrl}match-score/${data?.slug}/`,
    }),

    // ** Match Stats
    getMatchStats: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}match-player-points/${data?.slug}/`,
    }),

    // ** user earnings
    getUserEarnedAmount: builder.query({
      query: (data) => `${walletAdminUrl}user-earned-amount/`,
    }),

    // ** get user position in curent match leaderboard
    getUserLeaderboardPosition: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}contest-user-position/${data?.slug}/`,
    }),

    // ** get all boxers
    getAllBoxers: builder.query({
      query: (data) =>
        `${hellsBayClientUrl}boxers-all/?category=${data?.category}&limit=${data?.limit}&offset=${data?.offset}`,
    }),

    // ** get boxer Info
    getBoxerInfo: builder.query({
      query: (data) => `${hellsBayClientUrl}boxer-details/${data?.slug}/`,
    }),

    // ** notifications
    getNotifications: builder.query({
      query: (data) =>
        `notification/api/client/v1/notifications/?limit=${data.limit}&offset=${data.offset}&status=${data?.status}`,
    }),

    // ** get transaction slug for notification
    requestTransactionSlugForNotification: builder.mutation({
      query: (data) => ({
        url: `${walletAdminUrl}transaction-details/${data.slug}/`,
        method: "POST",
        body: data.data,
      }),
    }),

    // ** mark notification as seen
    markNotificationsAsSeen: builder.mutation({
      query: (data) => ({
        url: `notification/api/client/v1/update-seen-notifications/`,
        method: "POST",
        body: data,
      }),
    }),

    // ** check while user joins a contest
    checkJoinContestStatus: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}user-participation-in-contests-check/${data?.slug}/`,

      providesTags: ["ContestJoinCheck"],
    }),

    // ** join directly to a contest
    joinContestDirectly: builder.mutation({
      query: (data) => ({
        url: `${cricketFantasyAdminUrl}user-join-contest-directly/${data?.slug}/`,
        method: "POST",
        body: data.body,
      }),

      invalidatesTags: ["ContestJoinCheck"],
    }),

    // ** join Contest directly after team creation
    joinContestDirectlyAfterTeamCreation: builder.mutation({
      query: (data) => ({
        url: `${cricketFantasyAdminUrl}user-participation-with-players/`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["ContestJoinCheck"],
    }),

    // ** get Team
    getTeam: builder.query({
      query: (data) => `${cricketFantasyAdminUrl}user-team/${data.slug}/`,
    }),

    // ** update Team
    updateTeam: builder.mutation({
      query: (data) => ({
        url: `${cricketFantasyAdminUrl}user-team/${data.slug}/`,
        method: "PUT",
        body: data.data,
      }),

      invalidatesTags: ["Teams"],
    }),

    // ** Player Details
    getPlayerDetails: builder.query({
      query: (data) =>
        `${cricDataClientUrl}player-detail/${data.slug}/?match_slug=${data.matchSlug}`,
    }),

    // ** Player Recently Played Matches List
    getPlayerRecentlyPlayedMatches: builder.query({
      query: (data) =>
        `${cricDataClientUrl}player-played-matches/${data.slug}/?match_slug=${data?.matchSlug}`,
    }),

    // ** get all contests Winners
    getAllContestsWinners: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}winners-match-list/?limit=${data?.limit}&offset=${data?.offset}&series=${data?.series}`,
    }),

    // ** All Series
    getAllSeries: builder.query({
      query: (data) => `${cricDataClientUrl}get-all-series/`,
    }),

    //** get winners of a match
    getWinnersOfMatch: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}winners-match-details/${data.slug}/`,
    }),

    // ** get Mega Contests
    getMegaContests: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}get-all-mega-contests/?limit=${data?.limit}&offset=${data?.offset}`,
    }),

    // ** get Overall App earning leaderboard
    getAppEarningsLeaderboard: builder.query({
      query: (data) => `${walletAdminUrl}user-top-earnings/`,
    }),

    // ** get Wardroids Whitelist Count
    getWardroidsWhitelistCount: builder.query({
      query: (data) => `${hellsBayClientUrl}wardroids-count/`,

      providesTags: ["Whitelist"],
    }),

    // ** get whitelist payment amount
    getWhitelistPayDetails: builder.query({
      query: (data) => `${hellsBayClientUrl}wardroid-Price/?data=WARDROIDS`,
    }),

    // ** request whitelist
    requestWhitelistSpot: builder.mutation({
      query: (data) => ({
        url: `${hellsBayClientUrl}buy-wardroid/`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Whitelist"],
    }),

    //** get profile stats
    getAllProfileStats: builder.query({
      query: () => `${socialMediaClientUrl}user-social-media-count/`,

      providesTags: ["Followers", "Following", "Friends", "Profile"],
    }),

    // ** get all followers
    getAllFollowers: builder.query({
      query: (data) => `${socialMediaClientUrl}followers/`,

      providesTags: ["Followers"],
    }),

    // ** get all followers Count
    getAllFollowersCount: builder.query({
      query: (data) => `${socialMediaClientUrl}followers/`,

      providesTags: ["Followers", "Profile"],
    }),

    // ** get all following
    getAllFollowing: builder.query({
      query: (data) => `${socialMediaClientUrl}following/`,

      providesTags: ["Following"],
    }),

    // ** get all following count
    getAllFollowingCount: builder.query({
      query: (data) => `${socialMediaClientUrl}following/`,

      providesTags: ["Following", "Profile"],
    }),

    // ** get all followers
    getAllFriends: builder.query({
      query: (data) => `${socialMediaClientUrl}friends/`,

      providesTags: ["Friends"],
    }),

    // ** get all followers
    getAllFriendsCount: builder.query({
      query: (data) => `${socialMediaClientUrl}friends/`,

      providesTags: ["Friends", "Profile"],
    }),

    // ** follow Back user
    followBackUser: builder.mutation({
      query: (data) => ({
        url: `${socialMediaClientUrl}follow-back/${data.slug}/`,
        method: "POST",
        body: data.data,
      }),

      invalidatesTags: ["Profile"],
    }),

    // ** UnFollow user
    unFollowUser: builder.mutation({
      query: (data) => ({
        url: `${socialMediaClientUrl}dont-follow/${data.slug}/`,
        method: "POST",
        body: data.data,
      }),

      invalidatesTags: ["Profile"],
    }),

    // ** get mobile verfication Status
    getMobileVerificationStatus: builder.query({
      query: (data) => `${accountsClientUrl}phone-verify-status/`,

      providesTags: ["MobileVerification"],
    }),

    // ** Request mobile verification Otp
    requestMobileVerificationOtp: builder.mutation({
      query: (data) => ({
        url: `${accountsClientUrl}phone-verify/`,
        method: "POST",
        body: data,
      }),
    }),

    // ** Verify User Mobile Number
    verifyMobileNumber: builder.mutation({
      query: (data) => ({
        url: `${accountsClientUrl}phone-verify-otp/`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["MobileVerification"],
    }),

    // ** other user comparison stats
    getOtherUserComparisonStats: builder.query({
      query: (data) => `${socialMediaClientUrl}user-comparision/${data.slug}/`,

      providesTags: ["Profile"],
    }),

    // ** opponent profile details
    getOpponentProfileDetails: builder.query({
      query: (data) => `${accountsClientUrl}user-details/${data.slug}/`,
    }),

    // ** Profile Career Stats
    getCareerStats: builder.query({
      query: (data) => `${accountsClientUrl}career-stats/`,
    }),

    // ** unread notification count
    getUnreadNotificationsCount: builder.query({
      query: (data) => `${notificationClientUrl}user-notification-count/`,
    }),

    // ** get match reminder status
    getMatchReminderStatus: builder.query({
      query: (data) =>
        `${notificationClientUrl}user-match-notification/${data.slug}/`,

      providesTags: ["CricketMatchReminders"],
    }),

    // ** get series reminder status
    getSeriesReminderStatus: builder.query({
      query: (data) =>
        `${notificationClientUrl}user-series-notification/${data.slug}/`,

      providesTags: ["CricketSeriesReminders"],
    }),

    // ** set Cricket match reminder
    setCricketMatchReminder: builder.mutation({
      query: (data) => ({
        url: `${notificationClientUrl}user-match-notification/${data?.slug}/?active=${data?.status}`,
        method: "POST",
      }),

      invalidatesTags: ["CricketMatchReminders"],
    }),

    // ** set Cricket Series reminder
    setCricketSeriesReminder: builder.mutation({
      query: (data) => ({
        url: `${notificationClientUrl}user-series-notification/${data?.slug}/?active=${data?.status}`,
        method: "POST",
      }),

      invalidatesTags: ["CricketSeriesReminders"],
    }),

    // ** send user interaction signal
    sendUserInteractionSignal: builder.mutation({
      query: (data) => ({
        url: `${accountsClientUrl}user-activation/`,
        method: "POST",
        body: data,
      }),
    }),

    // ** getAllTickets
    getAllTickets: builder.query({
      query: (data) =>
        `${ticketsClientUrl}all-tickets/?limit=${data.limit}&offset=${data.offset}&status=${data.status}`,
    }),

    // ** get Ticket Details
    getTicketDetails: builder.query({
      query: (data) => `${ticketsClientUrl}ticket-details/${data.slug}/`,
    }),

    // ** request CustomerCare Chat
    requestCustomerCareChat: builder.mutation({
      query: (data) => ({
        url: `${chatClientUrl}create-group/`,
        method: "POST",
        body: data,
      }),
    }),

    // ** get previous customer care chats
    getPreviousCustomerCareChats: builder.query({
      query: (data) =>
        `${chatClientUrl}send-message/${data.slug}/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** get all groups
    getAllChatGroups: builder.query({
      query: (data) =>
        `${chatClientUrl}get-all-groups/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** get all chat requests
    getAllUnknownChatGroups: builder.query({
      query: (data) =>
        `${chatClientUrl}chat-requests/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** accept chat request
    acceptChatRequest: builder.mutation({
      query: (data) => ({
        url: `${chatClientUrl}accept-request/${data.slug}/`,
        method: "PUT",
        body: data.data,
      }),
    }),

    // ** get chat user details
    getChatUserDetails: builder.query({
      query: (data) => `${chatClientUrl}opponent-chat-status/${data.slug}/`,
    }),

    // ** get Transaction Details
    getTransactionDetails: builder.query({
      query: (data) => `${walletAdminUrl}transaction-details-all/${data.slug}/`,
    }),

    // ** NFTS
    getUserNFTs: builder.query({
      query: (data) =>
        `${nftClientUrl}get-user-nfts/?limit=${data.limit}&offset=${data.offset}`,
    }),

    // ** get NFT MetaData
    getNFTMetadata: builder.query({
      query: (data) => `${nftClientUrl}get-nft-metadata/${data.slug}/`,
    }),

    // ** get NFT Transactions
    getNFTTransactions: builder.query({
      query: (data) => `${nftClientUrl}get-nft-transactions/${data.slug}/`,
    }),

    // ** withdraw nft
    withdrawNFT: builder.mutation({
      query: (data) => ({
        url: `${nftClientUrl}nft-withdraw/${data.slug}/`,
        method: "POST",
        body: data.data,
      }),
    }),

    // ** Nagaraju ** //

    ///** MUBA */
    getPlayerScoreDetail: builder.query({
      query: (data) =>
        `${cricketFantasyAdminUrl}match-single-players-points/${data.slug}/?match_slug=${data.matchSlug}`,
    }),

    getAllUsers: builder.query({
      query: (data) =>
        `${accountsClientUrl}all-users/?search=${data.search}&limit=${data.limit}&offset=${data.offset}`,
    }),
  }),
});

export const {
  useRequestLoginOtpMutation,
  useOtpLoginMutation,
  useCreateWalletMutation,
  useGetAllWalletCreationRequestsQuery,
  useGetAllWalletsOfUserQuery,
  useCheckWalletIdQuery,
  useGetWalletAllTransactionsQuery,
  useGetDepositAddressByWalletIDQuery,
  useInitiateTransactionMutation,
  useGetAllUpcomingMatchesQuery,
  useLazyGetAllUpcomingMatchesQuery,
  useGetMatchContestsBySlugQuery,
  useLazyGetMatchContestsBySlugQuery,
  useGetMatchDetailsQuery,
  useGetContestWinningQuery,
  useGetContestLeaderboardQuery,
  useGetContestDetailsQuery,
  useGetPlayersOfMatchQuery,
  useCreateTeamMutation,
  useGetAllTeamsByContestSlugQuery,
  useGetAllTeamsByMatchSlugQuery,
  useEnterContestMutation,
  useValidateAddressQuery,
  useCreateLocalTransactionMutation,
  useGetUserContestsQuery,
  useRaiseWithdrawRequestMutation,
  useGetAllFeedQuery,
  useGetHFLEventsQuery,
  useVerifyRegistrationOtpMutation,
  useRequestRegistrationOtpMutation,
  useRegisterUserMutation,
  useGetUserParticipatedContestDetailsQuery,
  useUpdateContestTeamsMutation,
  useGetUserVirtualWalletTransactionsQuery,
  useLazyGetUserVirtualWalletTransactionsQuery,
  useGetUserWalletBalanceQuery,
  useGetUserOverallBalanceQuery,
  useGetWalletDetailsByWalletSlugQuery,
  useGetLatestReleasesQuery,
  useGetGamingContestsQuery,
  useGetUpcomingEventsQuery,
  useGetFeedQuery,
  useGetHflUpdatesQuery,
  useGetHflFightLeaguesQuery,
  useGetTitleMatchesQuery,
  useGetAllStoreProductsQuery,
  useLazyGetAllStoreProductsQuery,
  useLazyGetReferralLeaderboardQuery,
  useEmailRegistrationOtpRequestMutation,
  useEmailRegistrationOtpVerificationMutation,
  useEmailRegistrationMutation,
  useGetCurrentPlayersCountQuery,
  useUpdateProfileDataMutation,
  useUpdateProfilePictureMutation,
  useGetUserProfileDetailsQuery,
  useEmailLoginMutation,
  useEmailLoginOtpMutation,
  useCreateLocalTransactionEmailMutation,
  useUserRecentlyPlayedContestsQuery,
  useLazyUserRecentlyPlayedContestsQuery,
  useGetMatchSlugByContestSlugQuery,
  useViewOtherTeamDetailsQuery,
  useGetMatchScoreBySlugQuery,
  useGetMatchStatsQuery,
  useLazyGetUserParticipatedContestsByMatchSlugQuery,
  useGetUserEarnedAmountQuery,
  useGetUserLeaderboardPositionQuery,
  useLazyGetAllBoxersQuery,
  useGetBoxerInfoQuery,
  useGetNotificationsQuery,
  useMarkNotificationsAsSeenMutation,
  useLazyGetNotificationsQuery,
  useCheckJoinContestStatusQuery,
  useJoinContestDirectlyMutation,
  useJoinContestDirectlyAfterTeamCreationMutation,
  useGetTeamQuery,
  useUpdateTeamMutation,
  useGetPlayerDetailsQuery,
  useGetPlayerRecentlyPlayedMatchesQuery,
  useGetAllContestsWinnersQuery,
  useLazyGetAllContestsWinnersQuery,
  useGetAllSeriesQuery,
  useGetWinnersOfMatchQuery,
  useLazyGetWinnersOfMatchQuery,
  useGetMegaContestsQuery,
  useGetAppEarningsLeaderboardQuery,
  useGetWardroidsWhitelistCountQuery,
  useGetWhitelistPayDetailsQuery,
  useRequestWhitelistSpotMutation,
  useGetAllFollowersQuery,
  useGetAllFollowingQuery,
  useGetAllFriendsQuery,
  useLazyGetAllFollowersQuery,
  useLazyGetAllFollowingQuery,
  useLazyGetAllFriendsQuery,
  useFollowBackUserMutation,
  useUnFollowUserMutation,
  useGetMobileVerificationStatusQuery,
  useRequestMobileVerificationOtpMutation,
  useVerifyMobileNumberMutation,
  useGetOtherUserComparisonStatsQuery,
  useGetOpponentRecentPlayedMatchesQuery,
  useLazyGetOpponentRecentPlayedMatchesQuery,
  useGetCareerStatsQuery,
  useGetOpponentProfileDetailsQuery,
  useRequestTransactionSlugForNotificationMutation,
  useGetUnreadNotificationsCountQuery,
  useGetSeriesReminderStatusQuery,
  useGetMatchReminderStatusQuery,
  useSetCricketMatchReminderMutation,
  useSetCricketSeriesReminderMutation,
  useSendUserInteractionSignalMutation,
  useGetAllFollowingCountQuery,
  useGetAllFollowersCountQuery,
  useGetAllFriendsCountQuery,
  useLazyGetAllTicketsQuery,
  useGetTicketDetailsQuery,
  useRequestCustomerCareChatMutation,
  useLazyGetPreviousCustomerCareChatsQuery,
  useLazyGetAllChatGroupsQuery,
  useLazyGetAllUnknownChatGroupsQuery,
  useAcceptChatRequestMutation,
  useGetChatUserDetailsQuery,
  useLazyGetChatUserDetailsQuery,
  useGetTransactionDetailsQuery,
  useGetUserNFTsQuery,
  useLazyGetUserNFTsQuery,
  useGetNFTMetadataQuery,
  useGetNFTTransactionsQuery,
  useLazyGetNFTTransactionsQuery,
  useWithdrawNFTMutation,
  useLazyGetAllContestWinningsQuery,
  useLazyGetAllContestNFTsQuery,
  // ** Nagaraju ** //

  //** MUBA */
  useGetPlayerScoreDetailQuery,
  useGetAllProfileStatsQuery,
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
} = restApi;
export default restApi;
