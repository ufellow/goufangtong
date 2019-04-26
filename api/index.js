const baseUrl = 'https://www.hqwangluo.com';
let api = {
   getUserInfo: baseUrl + '/index/wx/getuserinfoexe',
   getHouseInfo: baseUrl + '/index/house/gethouseinfo',
   getHouseDetailApi: baseUrl + '/index/house/details?hid=1',
   getConditionHouse: baseUrl + '/index/search/search_address',
   searchByStatus: baseUrl + '/index/search/search',
   getHistorySearch: baseUrl + '/index/search/getsearch_history',
   clearHistorySearch: baseUrl + '/index/search/clean_search_history',
   isCompleteApi: baseUrl + '/index/member/is_complete',
   completeUserinfo: baseUrl + '/index/member/complete',
   getUserInfocompleted: baseUrl + '/index/member/getuser',
   getHistoryYao: baseUrl + '/index/house/gethistory'
}
module.exports = api;