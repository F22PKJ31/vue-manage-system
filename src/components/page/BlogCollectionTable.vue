<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 博客收藏管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input class="handle-input mr10" placeholder="筛选收藏人" v-model="selectUser"></el-input>
                <el-input class="handle-input mr10" placeholder="筛选博客" v-model="selectBlog"></el-input>
                <el-button @click="search" icon="search" type="primary">搜索</el-button>
            </div>
            <el-table :data="data" @selection-change="handleSelectionChange" border class="table" ref="multipleTable">
                <el-table-column prop="collectionId" v-if="false"/>
                <el-table-column prop="userId" v-if="false"/>
                <el-table-column prop="blogId" v-if="false"/>
                <el-table-column label="博客题目" prop="blogTitle">
                </el-table-column>
                <el-table-column label="收藏者" prop="userName">
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime">
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleDelete(scope.$index, scope.row)" class="red" icon="el-icon-delete"
                                   type="text">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination :total="total" :page-size="size" @current-change="handleCurrentChange" background
                               layout="prev, pager, next">
                </el-pagination>
            </div>
        </div>
        <!-- 删除提示框 -->
        <el-dialog :visible.sync="delVisible" center title="提示" width="300px">
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span class="dialog-footer" slot="footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button @click="deleteRow" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                tableData: [],
                size: 10,
                current: 0,
                total: 0,
                pages: 0,
                multipleSelection: [],
                selectUser: '',
                selectBlog: '',
                editVisible: false,
                delVisible: false,
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData;
            }
        },
        methods: {

            handleCurrentChange(val) {
                this.current = val;
                this.getData();
            },
            getData() {
                let queryParams = {
                    current: this.current,
                    size: this.size,
                    t: {
                        userName: this.selectUser,
                        blogTitle: this.selectBlog
                    }
                };
                this.axiosProxy.getBlogCollectionList(queryParams).then(response => {
                    this.tableData = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    console.log(response.data);
                })
            },
            search() {
                this.getData();
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 确定删除
            deleteRow() {
                let queryParams = {
                    id: this.tableData[this.idx].collectionId
                };
                this.axiosProxy.deleteCollection(queryParams).then(response => {
                    if (!response.data) {
                        this.$message.success('删除失败');
                    } else {
                        this.tableData.splice(this.idx, 1);
                        this.$message.success('删除成功');
                    }
                    this.delVisible = false;
                });
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }
</style>
