import axios from "axios";
import base from "@/api/base";
// import token from "@/api/token";
// // import qs from 'qs';

const api = {
    /**
     * 档案总数
     */
    getRecordTotal() {
        return axios.get(base.baseUrl + base.recordTotal)
    },
    /**
     * 档案借阅
     */
    getBorrowTotal({params}) {
        return axios.get(base.baseUrl + base.borrowTotal, {params})
    },
    /**
     * 最近借阅
     */
    getLatelyBorrowing(){
        return axios.get(base.baseUrl + base.latelyBorrowing);
    },
    /**
     * 年度统计
     */
    getYearTotalByND({params}){
        return axios.get(base.recordBaseUrl + base.yearTotalAmountByND, {params})
    },
    /**
     * 密集统计
     */
    getYearTotalByMJ(){
        return axios.get(base.recordBaseUrl + base.yearTotalAmountByMJ)
    },
    /**
     * 档案类型检索
     * @param params
     */
    selectArchiveType({params}) {
        return axios.get(base.baseUrl + base.selectArchiveType, {params})

    },
    /**
     * 档案门类检索
     */
    selectArchiveTable({params}) {
        return axios.get(base.baseUrl + base.selectArchiveTable, {params})
    },
    /**
     * 保管类型查询，仅限可展示字段项
     * @param params
     */
    selectQueryField({params}) {
        return axios.get(base.baseUrl + base.selectQueryField, {params});
    },
    /**
     * 保管类型检索
     */
    selectTableField({params}) {
        return axios.get(base.baseUrl + base.selectTableField, {params});
    },
    /**
     * 表单数据查询
     */
    selectData(params) {
        return axios.post(base.baseUrl+ base.selectData, params);
    },
    /**
     * 左侧树查询
     */
    selectTreeData(params) {
        return axios.post(base.baseUrl + base.selectTreeData, params);
    },
    /**
     * 右侧表查询
     */
    selectDatabaseData(params) {
        return axios.post(base.baseUrl + base.selectDatabaseData, params);
    },
    /**
     * 全文查询
     */
    dataQuery(params) {
        return axios.post(base.baseUrl+ base.dataQuery, params);
    },
    /**
     * pdf搜索
     */
    getPdf({params}) {
        return axios.get(base.baseUrl+base.getRefIdData, {params});
    },
}

export default api


