<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 帖子管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input class="handle-input mr10" placeholder="筛选作者" v-model="selectUser"></el-input>
                <el-input class="handle-input mr10" placeholder="筛选帖子" v-model="selectPost"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="postId" v-if="false"/>
                <el-table-column prop="userId" v-if="false"/>
                <el-table-column label="帖子题目" prop="title">
                </el-table-column>
                <el-table-column label="作者" prop="userName">
                </el-table-column>
                <el-table-column label="内容" prop="content">
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime">
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" type="text">编辑
                        </el-button>
                        <el-button @click="handleDelete(scope.$index, scope.row)" class="red" icon="el-icon-delete"
                                   type="text">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination :current-page="current" :page-size="size" :total="total"
                               @current-change="handleCurrentChange" background
                               layout="prev, pager, next">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form :model="form" label-width="100px" ref="form">
                <el-form-item v-if="false">
                    <el-input v-model="form.blogId"></el-input>
                </el-form-item>
                <el-form-item label="帖子题目">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker type="datetime" value-format="yyyy-MM-dd'T'HH:mm:ss" v-model="form.createTime">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button @click="saveEdit" type="primary">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'postTable',
        data() {
            return {
                categoryData: [],
                tableData: [],
                size: 10,
                current: 0,
                total: 0,
                pages: 0,
                multipleSelection: [],
                selectUser: '',
                selectPost: '',
                editVisible: false,
                delVisible: false,
                form: {
                    postId: '',
                    title: '',
                    userName: '',
                    content: '',
                    createTime: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
            this.getCategory();
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
                        title: this.selectPost,
                    }
                };
                this.axiosProxy.getPostList(queryParams).then(response => {
                    this.tableData = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    console.log(response.data);
                })
            },
            getCategory() {
                this.axiosProxy.getCategoryList().then(response => {
                    this.categoryData = response.data;
                    console.log(response.data);
                })
            },
            search() {
                let queryParams = {
                    current: 1,
                    size: this.size,
                    t: {
                        userName: this.selectUser,
                        title: this.selectPost,
                    }
                };
                this.axiosProxy.getPostList(queryParams).then(response => {
                    this.tableData = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.current = 1;
                })
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
                    id: this.tableData[this.idx].postId
                };
                this.axiosProxy.deletePost(queryParams).then(response => {
                    if (!response.data) {
                        this.$message.success('删除失败');
                    } else {
                        this.tableData.splice(this.idx, 1);
                        this.$message.success('删除成功');
                    }
                    this.delVisible = false;
                });
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    title: item.title,
                    userName: item.userName,
                    postId: item.postId,
                    content: item.content,
                    createTime: item.createTime
                };
                console.log(item);
                console.log(this.form);
                this.editVisible = true;
            },
            saveEdit() {
                this.axiosProxy.updatePost(this.form).then(response => {
                    this.$set(this.tableData, this.idx, this.form);
                    this.editVisible = false;
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                })
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
