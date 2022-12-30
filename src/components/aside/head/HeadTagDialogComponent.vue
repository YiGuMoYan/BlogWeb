<template>
  <el-dialog
    title="选择tag"
    :visible.sync="tagDialog"
    width="50%">
    <div>
      <el-checkbox-group v-model="tags" size="small">
        <el-checkbox class="tag" v-for="tag in tagList" :key="tag" :label="tag" border></el-checkbox>
      </el-checkbox-group>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button class="selectAll" @click="selectAllClick">全 选</el-button>
    <el-button class="cancel" @click="tagDialog = false">取 消</el-button>
    <el-button class="confirm" type="primary" @click="confirmClick">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import eventMessage from '@/EventMessage'

export default {
  name: 'HeadTagDialogComponent',
  props: {
    tagList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  created () {
    eventMessage.$on('changeTagDialog', (val) => {
      this.tagDialog = val
    })
  },
  data () {
    return {
      tagDialog: false,
      tags: []
    }
  },
  methods: {
    confirmClick () {
      this.tagDialog = false
      eventMessage.$emit('changeTags', this.tags)
    },
    selectAllClick () {
      this.tags = this.tagList
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog {
  background-color: #2C3441 !important;

  .el-dialog__title, .el-checkbox__label {
    color: aliceblue;
  }

  .selectAll, .cancel {
    background: #102030;
    color: aliceblue;
  }

  .confirm {
    background-color: #16559A !important;
    color: aliceblue;
    border-color: #DCDFE6;
  }
}

.tag {
  width: 100px;
  margin-top: 20px;
}

@media screen and (max-width: 1000px) {
  .tag {
    margin-right: 0;
    margin-left: 0;
  }
}

</style>
