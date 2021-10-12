<template>
  <div class="container">
    <div class="tablePag" :class="{showPdf:selectPdf}">
      <!--   表格   -->
      <div class="table">
        <el-table
            :data="classifiedTable"
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
              v-for="(item,index) in fieldItemArr" :key="index"
              :prop="item.tableField"
              :label="item.fieldName"
              show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
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
</template>

<script>
import pdf from 'vue-pdf';
import base from "@/api/base";

export default {
  name: "ClassifiedRes",
  components: {pdf},
  props: {
    classifiedTable: {
      type: Array,
      default: function () {
        return []
      }
    },
    fieldItemArr: {
      type: Array,
      default: function () {
        return []
      }
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      selectPdf: false,  //下拉框和pdf是否显示，默认不显示
      tableId: '',  //点击表格每一行获取id
      pdfRowsVal: '',  //下拉框选中的值
      pdfRows: [],  //pdf文件列表
      value: '',
      pdfSrc: '',  //pdf文件地址
    }
  },
  computed: {
    tableMaxHeight() {
      return window.innerHeight - 280 + 'px';
    }
  },

  methods: {
    /**
     * 改变分页当前页
     * @param val
     */
    handleCurrentChange(val) {
      this.$emit('currentChange', val);
    },
    /**
     * 改变分页当前页条目数量
     * @param val
     */
    handleSizeChange(val) {
      this.$emit('sizeChange', val);
    },
    /**
     * 单击表格每一行,将每一行的条目下文件传到右侧下拉框
     * @param val
     */
    clickRow(val) {
      this.pdfRowsVal = '';
      console.log(val.ID);
      this.tableId = val.ID;
      this.$api.getPdf({
        params: {
          ruleId: this.tableId,
          pageNum: 1,
          pageSize: 20
        }
      }).then(res => {
        this.selectPdf = true;
        this.pdfRows = res.data.rows;
        // console.log(this.pdfRows);
        this.pdfRowsVal = this.pdfRows[0].filename;
        this.changeFile(this.pdfRows[0].id)
      })
    },
    /**
     * 改变下拉框的值，浏览pdf
     */
    changeFile(val) {
      console.log(val);
      let serverUrl = '/pdfjs/web/viewer.html';
      let pdfUrl = base.baseUrl + "/onlinePreview/getOnlinePreviewFile?fileId=" + val;// 调取接口返回文件流
      this.pdfSrc = serverUrl + "?file=" + encodeURIComponent(pdfUrl);
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 98%;
  height: 100%;
  margin: 0 auto;
  display: flex;

  .tablePag {
    background-color: #fff;
    height: 15rem;
    width: 100%;

    .table {
      .ClassifiedTable {
        height: 14rem;
      }
    }
  }

  .showPdf {
    width: 50%;
  }

  .selectPdf {
    width: 50%;
    background-color: #fff;

    .prism-player {
      height: 13.5rem !important;

      .sidebarContainer {
        width: 1rem !important;
        position: relative !important;
      }
    }

    /deep/ .el-select {
      width: 100%;
      //position: absolute;
      top: 0;
      right: 0;
    }
  }

}

</style>