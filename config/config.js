const baseUrl = "https://www.wangwei2000.cn/";
const chatServer = "wss://www.wangwei2000.cn/chatServer";

const sendCodeUrl = baseUrl + 'userInfo/sendCode';
const sendUserInfoUrl = baseUrl + "userInfo/sendUserInfo";
const getUserInfoUrl = baseUrl + "userInfo/getUserInfo";
const modifyUserInfo = baseUrl + "userInfo/modifyUserInfo";
const checkAccount = baseUrl + "userInfo/checkAccount";
const getFriendList = baseUrl + "chat/getFriendList";
const getToken = baseUrl + "userInfo/getToken";
const searchUser = baseUrl + "chat/searchUser";
const addNewFriend = baseUrl + "chat/addNewFriend";
const friendRequest = baseUrl + "chat/friendRequest";
const handleFriendRequest = baseUrl + "chat/handleFriendRequest";
const checkFriendRequest = baseUrl + "chat/checkFriendRequest";
const getMessageList = baseUrl + "chat/getMessageList";
const uploadPostFile = baseUrl + "upload/uploadPostFile";
const addPost = baseUrl + "post/addPost";
const getPostInfoList = baseUrl + "post/getPostInfoList";
const getPost = baseUrl+"post/getPost";
const getFloorList = baseUrl + "post/getFloorList";
const addFloor = baseUrl + "post/addFloor";
const likePost = baseUrl + "post/likePost";
const cancelLikePost = baseUrl + "post/cancelLikePost";
const addCollected = baseUrl + "post/addCollected";
const cancelCollected = baseUrl + "post/cancelCollected";
const changeAvatar = baseUrl + "upload/changeAvatar";
const getAlbum = baseUrl + "album/getAlbum";
const uploadAlbumPicture = baseUrl + "upload/uploadAlbumPicture";

module.exports = {
    sendCodeUrl: sendCodeUrl,
    sendUserInfoUrl: sendUserInfoUrl,
    getUserInfoUrl: getUserInfoUrl,
    modifyUserInfo: modifyUserInfo,
    checkAccount: checkAccount,
    getPostInfoList: getPostInfoList,
    getFriendList: getFriendList,
    getToken: getToken,
    chatServer: chatServer,
    searchUser: searchUser,
    addNewFriend:addNewFriend,
    friendRequest:friendRequest,
    handleFriendRequest:handleFriendRequest,
    getMessageList:getMessageList,
    uploadPostFile:uploadPostFile,
    checkFriendRequest:checkFriendRequest,
    addPost:addPost,
    getPostInfoList:getPostInfoList,
    getPost:getPost,
    getFloorList:getFloorList,
    addFloor:addFloor,
    likePost:likePost,
    cancelLikePost:cancelLikePost,
    addCollected:addCollected,
    cancelCollected:cancelCollected,
    changeAvatar:changeAvatar,
    getAlbum:getAlbum,
    uploadAlbumPicture:uploadAlbumPicture
};