const baseUrl = "http://168.192.31.184:8080/Petlove/"

const sendCodeUrl = baseUrl + 'userInfo/sendCode';
const sendUserInfoUrl = baseUrl + "userInfo/sendUserInfo";
const getUserInfoUrl = baseUrl + "userInfo/getUserInfo";
const modifyUserInfo = baseUrl + "userInfo/modifyUserInfo";
const checkAccount = baseUrl + "userInfo/checkAccount";
const getPostInfoList = baseUrl + "post/getPostInfoList";


module.exports = {
    sendCodeUrl:        sendCodeUrl,
    sendUserInfoUrl:    sendUserInfoUrl,
    getUserInfoUrl:     getUserInfoUrl,
    modifyUserInfo:     modifyUserInfo,
    checkAccount:       checkAccount,
    getPostInfoList:    getPostInfoList
};