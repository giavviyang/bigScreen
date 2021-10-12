<template>
  <div class="container">
    <!--    分类检索选择范围-->
    <div class="radio" v-show="selectedRadio">
      <!--      档案类型-->
      <div class="mainRadio">
        <span class="radioTitle  borderNone">档案类型</span>
        <el-radio-group v-model="fileCategoriesRadio"
                        @change="fileCategoriesSelect"
                        v-for="item in fileCategoriesArr"
                        :key="item.type_id">
          <el-radio :label="item.type_id">{{ item.typeOrNick_name }}</el-radio>
        </el-radio-group>
      </div>
      <!--      保管类型-->
      <div class="mainRadio" v-show="storageTypeShow">
        <span class="radioTitle">保管类型</span>
        <el-radio-group v-model="storageTypeRadio"
                        @change="storageTypeSelect"
                        v-for="item in storageTypeArr"
                        :key="item.tableName">
          <el-radio :label="item.tableName">{{ item.typeOrNickName }}</el-radio>
        </el-radio-group>
      </div>
      <div class="mainRadio" v-show="fieldItemShow">
        <span class="radioTitle">字段项</span>
        <el-radio-group v-model="fieldItemRadio"
                        @change="fieldItemSelect"
                        v-for="item in fieldItemArr"
                        :key="item.tableField">
          <el-radio :label="item.tableField">{{ item.fieldName }}</el-radio>
        </el-radio-group>
      </div>
    </div>



    <div class="openBtn" :class="{open:isOpen,close:isClose}" @click="openOrClose" v-show="open" ref="changeBtn">
      收起
    </div>
    <div class="selectedRange" v-show="selectedInfo">
      当前查询范围：
      <span>{{ fileCategoriesText }}</span>--
      <span>{{ storageTypeText }}</span>--
      <span>{{ fieldItemText }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "ClassifiedRange",
  props: {
    fileCategoriesArr: {
      type: Array,
      default: function () {
        return [];
      }
    },
  },
  data() {
    return {
      radio: '',
      selectedRadio: true,  //单选框组是否显示，默认显示
      fileCategoriesRadio: '',  //档案门类单选框，默认值为空，不选中
      storageTypeRadio: '',  //保管类型单选框，默认值为空，不选中
      fieldItemRadio: '',  //字段项单选框，默认值为空，不选中
      storageTypeShow: false,  //保管类型是否显示，默认不显示
      storageTypeArr: [],  //保管类型数组
      fieldItemShow: false,  //字段项是否显示，默认不显示
      fieldItemArr: [],  //字段项数组
      open: false,  //查询范围打开或关闭按钮，默认不显示，状态为关闭
      selectedInfo: false,  //查询范围文字描述，默认不显示
      isOpen:false,  //打开或关闭标签的属性
      isClose:true,
    };
  },
  computed: {
    fileCategoriesText() {
      if (this.fileCategoriesRadio) {
        for (let i = 0; i < this.fileCategoriesArr.length; i++) {
          const item = this.fileCategoriesArr[i];
          if (item.type_id === this.fileCategoriesRadio) {
            return item.typeOrNick_name;
          }
        }
      }
      return "";
    },
    storageTypeText() {
      if (this.storageTypeRadio) {
        for (let i = 0; i < this.storageTypeArr.length; i++) {
          const item = this.storageTypeArr[i];
          if (item.tableName === this.storageTypeRadio) {
            return item.typeOrNickName;
          }
        }
      }
      return "";
    },
    fieldItemText() {
      if (this.fieldItemRadio) {
        for (let i = 0; i < this.fieldItemArr.length; i++) {
          const item = this.fieldItemArr[i];
          if (item.tableField === this.fieldItemRadio) {
            return item.fieldName;
          }
        }
      }
      return "";
    },
  },

  methods: {
    /**
     * 档案类型选择，单击档案类型单选框，出现分类检索下保管类型弹框
     */
    fileCategoriesSelect() {
      this.storageTypeRadio = '';
      this.fieldItemRadio = '';
      this.fieldItemShow = false;
      this.$emit('changeRes', false);
      this.$emit('changeIpt', '');
      this.$api.selectArchiveTable({
        params: {
          archiveTypeId: this.fileCategoriesRadio
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.storageTypeArr = res.data.data;
          this.storageTypeShow = true;
        }
      })
    },
    /**
     * 保管类型选择，单击保管类型单选框，出现保管类型下仅限可展示字段项
     * 通过$emit向父元素传递tableName的值
     * 表的查询字段
     */
    storageTypeSelect() {
      this.$emit('changeRes', false);
      this.$emit('changeIpt', '');
      this.fieldItemRadio = '';
      this.classifiedRes = false;
      this.$api.selectQueryField({
        params: {
          tableName: this.storageTypeRadio
        }
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.fieldItemArr = res.data.data;
          this.fieldItemShow = true;
          this.$emit('changeFieldItemArr', this.fieldItemArr)
        }
      });
      this.$emit('changeTableName', this.storageTypeRadio);
    },
    /**
     * 选中字段项，收起或打开按钮显示
     * 通过$emit向父元素传递 fieldName 的值
     */
    fieldItemSelect() {
      this.input = '';
      this.open = true;
      this.$emit('changeFieldName', this.fieldItemRadio);
      this.$emit('changeRes', false);
      this.$emit('changeIpt', '');
    },
    openOrClose() {
      if (this.$refs.changeBtn.innerText === '展开') {
        this.$refs.changeBtn.innerText = '收起'
        this.selectedInfo = false;
        this.selectedRadio = true;
        this.isClose=true;
        this.isOpen=false

      } else {
        this.$refs.changeBtn.innerText = '展开'
        this.selectedInfo = true;
        this.selectedRadio = false;
        this.isOpen=true;
        this.isClose=false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  //background-color: red;
  width: 75%;
  margin: 0 auto;
  overflow: hidden;
  .radio {
    padding: 0.5rem;
    margin-top: 0.5rem;
    border-radius: 0.5rem;
    background: #fff;
    box-sizing: content-box;
    .mainRadio {
      .radioTitle {
        font-size: 0.6rem !important;
        display: block;
        margin: 0.2rem;
        opacity: 0.7;
        border-top: 1px solid #ccc;
        padding-top: 0.2rem;
      }
      .borderNone {
        border-top: none;
      }
      .el-radio-group {
        display: inline-flex;
        width: 25%;
        height: 0.5rem;
        //justify-content: center;
        align-items: center;
        margin-bottom: 0.3rem;
        padding-left: 3rem;
        box-sizing: border-box;
        .el-radio {
          /deep/ .el-radio__label {
          }
        }
      }
    }
  }
  .openBtn{
    width: 2.5rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
  }
  .open{
    background-color: #409EFF;
    color: #fff;
    float: left;
    margin-top: 0;
  }
  .close{
    background-color: #ECF5FF;
    color: #409EFF ;
    border: 1px solid #409EFF;
    float: right;
  }
  .selectedRange{
    float: left;
    height: 1rem;
    line-height: 1rem;
    margin-left: 1rem;
  }
}

</style>