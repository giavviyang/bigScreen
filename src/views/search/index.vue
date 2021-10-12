<template>
  <div class="search">
    <!--   头部,返回页  -->
    <div class="header">
      <i class="iconfont icon-fanhui" @click="goBack"></i>
      <i class="iconfont icon-shuaxin" @click="refresh"></i>
    </div>
    <!--    主要内容   -->
    <!--检索部分-->
    <!--    <div class="mainSearch">-->
    <div class="searchRadio">
      <el-radio v-model="radio" label="classified" @change="classifiedSearch">分类检索</el-radio>
      <el-radio v-model="radio" label="diffClass" @change="diffClassifiedSearch">跨库检索</el-radio>
      <el-radio v-model="radio" label="full" @change="fullSearch">全文检索</el-radio>
    </div>
    <!--          分类检索条件下出现的单选框   -->
    <ClassifiedRange v-show="classifiedRadio"
                     :fileCategoriesArr="fileCategoriesArr"
                     :input="input"
                     @changeTableName="changeTableName"
                     @changeFieldName="changeFieldName"
                     @changeFieldItemArr="changeFieldItemArr"
                     @changeRes="changeRes"
                     @changeIpt="changeIpt"/>
    <div class="searchBtn">
      <input class="btn" v-model="input" placeholder="请输入内容" type="text"
             style="width: 10rem;margin-top: 1rem;height: 1rem;">
      <button @click="onSubmit">搜索</button>
      <span style="color: red" ref="warning" v-show="warning">输入值不能为空，请输入内容</span>
    </div>
    <ClassifiedRes v-show="classifiedRes"
                   :classifiedTable="classifiedTable"
                   :fieldItemArr="fieldItemArr"
                   :pageNum="pageNum"
                   :pageSize="pageSize"
                   :total="total"
                   :totalPage="totalPage"
                   @currentChange="currentChange"
                   @sizeChange="sizeChange"/>
    <DiffRes v-show="diffRes"
             :diffTree="diffTree"
             :input="input"
             :treeParentArr="treeParentArr"/>
    <FullRes v-show="fullRes" :fullTable="fullTable" @handleCurrentChange="handleCurrentChange"
             @handleSizeChange="handleSizeChange"/>

  </div>
</template>

<script>
import ClassifiedRes from "@/views/search/res/ClassifiedRes";
import DiffRes from "@/views/search/res/DiffRes";
import FullRes from "@/views/search/res/FullRes";
import ClassifiedRange from "@/views/search/res/ClassifiedRange";

export default {
  name: "search",
  components: {
    ClassifiedRange,
    ClassifiedRes,
    FullRes,
    DiffRes
  },
  data() {
    return {
      input: '',
      radio: '',
      classifiedRadio: false,  //分类检索下档案门类弹出框  默认不显示
      fileCategoriesArr: [],  //档案门类数组，默认为空
      tableName: '',  //表名，子组件保管类型传回,控制表的类型
      fieldName: '',  //文件名，子组件字段项传回，控制表头展示哪些字段
      warning: false,  //输入框为空时的提示，默认不显示
      fieldItemArr: [],  //分类表格数据
      pageNum: 1,
      pageSize: 2,
      total: 0,
      totalPage: 0,
      fullPageNum: 1,
      fullPageSize: 2,
      fullTotal: 0,
      fullTotalPage: 0,
      classifiedTable: [], //分类检索下的表格数据
      diffTree: [],  //分类检索下的树
      treeParentArr: [],  //树的父节点
      classifiedRes: false,   //分类检索下结果  默认不显示
      diffRes: false,  //跨库搜索下结果    默认不显示
      fullRes: false,  //全文搜索下结果   默认不显示
      fullTable: [], //全文搜索表格
    }
  },
  methods: {
    /**
     * 返回首页
     */
    goBack() {
      this.$router.push('/');
    }
    ,
    /**
     * 刷新
     */
    refresh() {

      this.$router.go(0);
    },
    /**
     * 分类检索，单击分类检索，出现分类检索下档案分类弹框
     */
    classifiedSearch() {
      this.classifiedRadio = true;
      this.classifiedRes = false;
      this.diffRes = false;
      this.fullRes = false;
      this.$api.selectArchiveType({
        params: {
          businessId: '5e9eaf6b-47e1-40d8-9f29-9039f116494e'
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.fileCategoriesArr = res.data.data;
        }
      })
      // this. searchRecord();
    },
    /**
     * 档案分类查询，返回档案分类数组
     */
    searchRecord() {
      this.$api.selectArchiveType({
        params: {
          businessId: '5e9eaf6b-47e1-40d8-9f29-9039f116494e'
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.fileCategoriesArr = res.data.data;
        }
      })
    },
    /**
     * 虚拟事件，从子元素保管类型传回，获取子元素 tableName  分类检索
     * @param val
     */
    changeTableName(val) {
      // console.log('tableName------', val);
      this.tableName = val;
    },

    /**
     * 虚拟事件，获取子元素 fieldItemArr，传递给子组件，分类检索结果表格数据
     */
    changeFieldItemArr(val) {
      this.fieldItemArr = val;
    },
    /**
     * 虚拟事件，获取子元素fieldName   分类检索  字段名称
     * @param val
     */
    changeFieldName(val) {
      this.fieldName = val;
    },
    /**
     * 虚拟事件，改变分类检索结果是否隐藏
     */
    changeRes(val) {
      this.classifiedRes = val;
    },
    /**
     * 虚拟事件，改变input的值
     */
    changeIpt(val) {
      this.input = ''
    },
    /**
     * 虚拟事件，获取子元素分页跳转页数，改变当前页
     */
    currentChange(val) {

      this.searchSelectData(this.tableName, val, this.pageSize, this.fieldName, this.input);
    },
    handleCurrentChange(val) {
      this.fullResSearch(this.input, val, this.fullPageSize);
    },
    /**
     * 虚拟事件，获取子元素分页每页条数
     */
    sizeChange(val) {
      this.searchSelectData(this.tableName, this.pageNum, val, this.fieldName, this.input);
    },
    handleSizeChange(val) {
      this.fullResSearch(this.input, this.fullPageNum, val);
    },
    /**
     * 单击跨库检索，获取树的父节点
     */
    diffClassifiedSearch() {
      this.classifiedRes = false;
      this.fullRes = false;
      this.classifiedRadio = false;
      this.input = '';
      this.$api.selectArchiveType({
        params: {
          businessId: '5e9eaf6b-47e1-40d8-9f29-9039f116494e'
        }
      }).then((res) => {
        if (res.data.code === 200) {
          console.log(res);
          let arr = [];
          res.data.data.forEach(ele => {
            arr.push(ele.type_id);
            this.treeParentArr = arr;
          })
        }
      })
    },
    /**
     * 全文搜索
     */
    fullSearch() {
      this.input = '';
      this.classifiedRes = false;
      this.diffRes = false;
    },
    /**
     * 全文搜索
     */
    fullResSearch(searchValue, pageNum, pageSize) {
      this.$api.dataQuery({
        searchValue,
        pageNum,
        pageSize,

      }).then(res => {
        if (res.data.code === 200) {
          console.log(res)
          this.fullTable = res.data.rows;
          this.fullRes = true;
          this.fullPageNum = res.data.pageNum;
          this.fullPageSize = res.data.pageSize;
          this.fullTotal = res.data.total;
          this.fullTotalPage = res.data.totalPage;
        }
      })
    },
    /**
     * 提交
     */
    onSubmit() {
      // console.log(this.input);
      if (!this.input) {
        this.warning = true;
        this.$refs.warning.innerText = '输入值不能为空，请先输入内容'
      } else {
        if (this.radio === 'classified') {
          this.searchTableHeader(this.tableName);
          this.searchSelectData(this.tableName, 1, 20, this.fieldName, this.input);
        } else if (this.radio === 'diffClass') {
          console.log(this.radio);
          this.searchTableHeader(this.tableName);
          this.getTreeData(this.treeParentArr, '', 1, 20, this.input);
          this.diffRes = true;
        } else if (this.radio === 'full') {
          // this.fullSearch();
          this.fullResSearch(this.input, 1, 20);
        } else {
          this.warning = true;
          this.$refs.warning.innerText = '请先勾选检索方式，再进行查询'
        }
      }
    },
    /**
     * 分类检索，查询相应表头
     */
    searchTableHeader(tableName) {
      // this.fieldItemRadio = '';
      this.$api.selectTableField({
        params: {
          tableName
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.fieldItemShow = true;
          this.fieldItemArr = res.data.data;
          console.log(res)
        }
      });
    },
    /**
     * 分类检索，查询表
     * @param tableName  表名
     * @param pageNum 当前页
     * @param pageSize  每页大小
     * @param fieldName
     * @param value  输入值
     */
    searchSelectData(tableName, pageNum, pageSize, fieldName, value) {
      this.$api.selectData({
        tableName,
        pageNum,
        pageSize,
        conditions: [{
          fieldName,
          operation: 6,
          value: [value],
          logic: ""
        }]
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.classifiedTable = res.data.rows;
          this.classifiedRes = true;
          this.pageNum = res.data.pageNum;
          this.pageSize = res.data.pageSize;
          this.total = res.data.total;
          this.totalPage = res.data.totalPage;
        }
      })
    },
    /**
     * 获取树的数据
     * @param archivesIds
     * @param tableName
     * @param pageName
     * @param pageSize
     * @param searchValue
     */
    getTreeData(archivesIds, tableName, pageNum, pageSize, searchValue) {
      this.$api.selectTreeData({
        archivesIds,
        tableName,
        pageNum,
        pageSize,
        searchValue,
      }).then(res => {
        this.diffTree = res.data.data;
      })
    }
  }
}

</script>

<style lang="less" scoped>
.search {
  background-color: #eee;
  width: 100%;
  height: 100%;
  @radioFontSize: 0.5rem;

  .header {
    .iconfont {
      line-height: 1rem;
      margin-left: 0.5rem;
      font-size: 0.5rem;
      opacity: 0.5;
    }

    .icon-fanhui {
      font-size: 0.6rem;
    }

    .icon-shuaxin {
      font-weight: 600;
    }
  }

  .searchRadio {
    display: flex;
    justify-content: center;
    font-size: 4rem;
    margin-bottom: 1rem;

    .el-radio {
      width: 6rem;
      display: flex;
      align-items: center;

      /deep/ .el-radio__label {
        font-size: 1rem;
      }

      /deep/ .el-radio__input {
        /deep/ .el-radio__inner {
          width: @radioFontSize;
          height: @radioFontSize;
        }
      }
    }
  }

  .searchBtn {
    height: 3rem;
    position: relative;

    input {
      position: absolute;
      left: 5%;
      width: 79% !important;
      border-radius: 0.2rem;
      padding-left: 0.5rem;
    }

    input::-webkit-input-placeholder {
      font-size: 0.3rem;
      opacity: 0.7;
    }

    button {
      width: 2rem;
      height: 1rem;
      background-color: #409EFF;
      border-radius: 0.3rem;
      color: #fff;
      font-size: 0.5rem;
      line-height: 1rem;
      text-align: center;
      right: 9%;
      top: 1rem;
      position: absolute;
    }

    span {
      color: red;
      position: absolute;
      left: 6%;
      top: 2.1rem;
      font-size: 0.3rem !important;
    }
  }
}

</style>