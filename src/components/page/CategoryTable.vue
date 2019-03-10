<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 分类管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input class="handle-input mr10" placeholder="筛选分类名" v-model="selectCategory"></el-input>
                <el-button @click="search" icon="search" type="primary">搜索</el-button>
                <el-button @click="handleAdd()" icon="handleAdd" type="primary" style="float: right">添加</el-button>
            </div>
            <el-table :data="data" @selection-change="handleSelectionChange" border class="table" ref="multipleTable">
                <el-table-column prop="categoryId" v-if="false"/>
                <el-table-column label="分类" prop="categoryName">
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
                <el-pagination :total="total" :page-size="size" @current-change="handleCurrentChange" background
                               layout="prev, pager, next">
                </el-pagination>
            </div>
        </div>
        <el-dialog :visible.sync="addVisible" title="添加" width="30%">
            <el-form :model="form" label-width="100px" ref="form">
                <el-form-item label="分类">
                    <el-input v-model="form.categoryName"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker type="datetime" value-format="yyyy-MM-dd'T'HH:mm:ss" v-model="form.createTime">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button @click="saveAdd" type="primary">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog :visible.sync="editVisible" title="编辑" width="30%">
            <el-form :model="form" label-width="100px" ref="form">
                <el-form-item v-if="false">
                    <el-input v-model="form.categoryId"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-input v-model="form.categoryName"></el-input>
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
                selectCategory: '',
                editVisible: false,
                delVisible: false,
                addVisible:false,
                idx: -1,
                form: {
                    categoryId: '',
                    categoryName: '',
                    createTime: ''
                }
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
                        categoryName: this.selectCategory,
                    }
                };
                this.axiosProxy.getCategoryListByPage(queryParams).then(response => {
                    this.tableData = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    console.log(response.data);
                })
            },
            search() {
                this.getData();
            },
            saveAdd(){
                this.axiosProxy.addCategory(this.form).then(response => {
                    this.addVisible = false;
                    this.$message.success(`添加成功`);
                    this.getData();
                })
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
                this.axiosProxy.deleteCategory(queryParams).then(response => {
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
                    categoryId: item.categoryId,
                    categoryName: item.categoryName,
                    createTime: item.createTime
                };
                this.editVisible = true;
            },
            handleAdd(){
                this.form = {};
                this.addVisible = true;
            },
            saveEdit() {
                this.axiosProxy.updateCategory(this.form).then(response => {
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
