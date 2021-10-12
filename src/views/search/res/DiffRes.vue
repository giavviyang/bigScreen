<template>
  <div class="container">
    <div class="tree">
      <el-tree
          :data="diffTree"
          node-key="id"
          :default-expand-all="true"
          :props="defaultProps"
          @node-click="handleNode">
      </el-tree>
    </div>
    <div class="tablePdf">
      <div class="tablePag" :class="{showPdf:selectPdf}">
        <div class="table">
          <el-table
              :data="diffTable"
              stripe
              border
              highlight-current-row
              class="ClassifiedTable"
              @row-click="clickRow"
              :height="tableMaxHeight">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="序号"
                type="index"
                width="100">
            </el-table-column>
            <el-table-column
                v-for="(item,index) in tableHeader" :key="index"
                :prop="item.tableField"
                :label="item.fieldName"
                show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
              @current-change="currentChange"
              @size-change="sizeChange"
              :current-page="this.pageNum"
              :page-size="this.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="this.total"
              :page-count="this.totalPage">
          </el-pagination>
        </div>
      </div>
      <div class="selectPdf" v-show="selectPdf">
        <div class="select">
          <el-select v-model="pdfRowsVal" placeholder="请选择" @change="changeFile">
            <el-option
                v-for="item in pdfRows"
                :key="item.id"
                :label="item.filename"
                :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="pdf">
          <iframe class="prism-player" ref="pdfIframe" :src="pdfSrc" width="100%" height="100%"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import base from "@/api/base";

export default {
  name: "DiffRes",
  data() {
    return {
      defaultProps: {
        children: 'list',
        label: 'typeOrNickName'
      },
      diffTable: [],  //跨库检索表格数据
      tableHeader: [],  //表头
      tableName: '', //树被点击后的tableName
      archivesTypeId: '',  //树被点击后的archivesTypeId
      pageNum: 1,  //当前页
      pageSize: 20,  //每页条目
      total: 1, //总条数
      totalPage: 1, //总条数
      selectPdf: false,  //下拉框和pdf是否显示，默认不显示
      tableId: '',  //点击表格每一行获取id
      pdfRowsVal: '',  //下拉框选中的值
      pdfRows: [],  //pdf文件列表
      value: '',  //下拉框默认值
      pdfSrc: '',  //pdf文件地址
    };
  },
  props: {
    diffTree: {
      type: Array,
      default: function () {
        return []
      }
    },
    input: {
      type: String,
      default: ''
    },
    treeParentArr: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  computed: {
    tableMaxHeight() {
      return window.innerHeight - 225 + 'px';
    }
  },
  mounted() {
    this.getTableHeader('resources_archives_101');
    this.getTableData(this.treeParentArr[0], this.treeParentArr, 'resources_archives_101', 1, 20, this.input)
  },
  methods: {
    /**
     * 树节点被点击
     */
    handleNode(node) {
      this.tableName = node.tableName;
      this.archivesTypeId = node.archivesTypeId;
      console.log(this.treeParentArr);
      this.getTableHeader(node.tableName);
      this.getTableData(node.archivesTypeId, this.treeParentArr, node.tableName, 1, 20, this.input);
      if (node.list.length) {
        this.getTableHeader(node.list[0].tableName);
        this.getTableData(node.list[0].archivesTypeId, this.treeParentArr, node.list[0].tableName, 1, 20, this.input);
      }
    },
    /**
     * 获取表数据
     */
    getTableData(archivesId, archivesIds, tableName, pageNum, pageSize, searchValue) {
      //表数据
      this.$api.selectDatabaseData({
        archivesId,
        archivesIds,
        tableName,
        pageNum,
        pageSize,
        businessId: '5e9eaf6b-47e1-40d8-9f29-9039f116494e',
        searchValue,
      }).then(res => {
        if (res.data.code === 200) {
          this.diffTable = res.data.rows
          // console.log(res);
          this.pageNum = res.data.pageNum;
          this.pageSize = res.data.pageSize;
          this.total = res.data.total;
          this.totalPage = res.data.totalPage;
        }
      });
    },
    /**
     * 获取表头
     */
    getTableHeader(tableName) {
      this.$api.selectTableField({
        params: {
          tableName,
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.tableHeader = res.data.data;
          // console.log(res)
        }
      });
    },
    /**
     * 改变分页当前页
     * @param val
     */
    currentChange(val) {
      this.pageNum = val;
      this.getTableHeader(this.tableName);
      this.getTableData(this.archivesTypeId, this.treeParentArr, this.tableName, val, this.pageSize, this.input);

    },
    /**
     * 改变分页当前页条目数量
     * @param val
     */
    sizeChange(val) {
      this.pageSize = val
      this.getTableHeader(this.tableName);
      this.getTableData(this.archivesTypeId, this.treeParentArr, this.tableName, this.pageNum, val, this.input);
    },
    /**
     * 单击单元格任意一行
     */
    clickRow(val) {
      this.selectPdf = true;
      this.pdfRowsVal = '';
      // console.log(val.ID);
      this.tableId = val.ID;
      this.$api.getPdf({
        params: {
          ruleId: this.tableId,
          pageNum: 1,
          pageSize: 20
        }
      }).then(res => {
        // console.log(res);
        this.pdfRows = res.data.rows;
        this.selectPdf = true;
        // console.log(this.pdfRows);
        this.pdfRowsVal = this.pdfRows[0].filename;
        // this.changeFile(this.pdfRows[0].id)
      })
    },
    /**
     * 改变下拉框的值，浏览pdf
     */
    changeFile(val) {
      // console.log(val);
      let serverUrl = '/pdfjs/web/viewer.html';
      let pdfUrl = base.searchBaseUrl + "/onlinePreview/getOnlinePreviewFile?fileId=" + val;// 调取接口返回文件流
      this.pdfSrc = serverUrl + "?file=" + encodeURIComponent(pdfUrl);
    }
  },

}
</script>


<style lang="less" scoped>
.container {
  width: 98%;
  height: 16.45rem;
  margin: 0 auto;
  display: flex;

  .tree {
    background-color: #fff;
    width: 5.5rem;
  }

  .tablePdf {
    width: 100%;
    display: flex;
    .tablePag {
      background-color: #fff;
      height: 16.45rem;
      width: 100%;
      .table {
        .ClassifiedTable {
          height: 14.5rem;
          width: 100%;
        }
      }
    }
    .showPdf {
      width:50%;
    }

    .selectPdf {
      width:50%;
      background-color: #fff;

      .prism-player {
        height: 15rem !important;

        .sidebarContainer {
          width: 1rem !important;
          position: relative !important;
        }
      }

      /deep/ .el-select {
        width: 100%;
        top: 0;
        right: 0;
      }
    }
  }
}

</style>