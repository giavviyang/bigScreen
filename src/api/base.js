const base = {
    baseUrl: '/api',  //首页
    recordBaseUrl: '/foo',  //年度档案
    recordTotal: '/Statistics/queryArchivesAmount', //档案总数
    borrowTotal: '/Statistics/queryBorrowAmount',  //借阅总数
    yearTotalAmountByND:'/Statistics/totalAmountByND',  //年度统计
    yearTotalAmountByMJ:'/Statistics/totalAmountByMJ',  //密级统计
    latelyBorrowing:'/Statistics/latelyBorrowing',  //最近借阅
    selectArchiveType: '/archiveRetrieval/selectArchiveType?',  //分类检索    ?businessId=44bf0e51-88b3-4398-8fc9-f8a3453a6ad3
    selectArchiveTable:'/archiveRetrieval/selectArchiveTable?',  //档案门类检索   archiveTypeId=02f1cdb8593844819e390b1d028896c5
    selectQueryField:'/archiveRetrieval/selectQueryField?',  //保管类型检索 （字段项仅可查询范围）
    selectTableField:'/archiveRetrieval/selectTableField?',  //保管类型检索
    selectData:'/archiveRetrieval/selectData?',  //分类检索结果，最后显示出的表格内容
    selectTreeData:'/archiveRetrieval/selectTreeData',  //左侧树查询
    selectDatabaseData:'/archiveRetrieval/selectDatabaseData',  //右侧表查询
    dataQuery:'/fullSearch//dataQuery',   //全文查询
    getRefIdData:'/onlinePreview/getRefIdData?',  //pdf查询

}
export default base