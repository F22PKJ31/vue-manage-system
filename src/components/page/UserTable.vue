<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input class="handle-input mr10" placeholder="用户名" v-model="selectUser"></el-input>
                <el-button @click="search" icon="search" type="primary">搜索</el-button>
                <el-button @click="handleAdd" icon="handleAdd" type="primary" style="float: right">添加</el-button>
            </div>
            <el-table :data="data" @selection-change="handleSelectionChange" border class="table" ref="multipleTable">
                <el-table-column prop="userId" v-if="false"/>
                <el-table-column label="用户名" prop="userName">
                </el-table-column>
                <el-table-column label="密码" prop="passwd">
                </el-table-column>
                <el-table-column label="性别" prop="sex">
                </el-table-column>
                <el-table-column label="手机号" prop="mobile">
                </el-table-column>
                <el-table-column label="年龄" prop="age">
                </el-table-column>
                <el-table-column label="邮箱" prop="email">
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

        <!-- 添加弹出框 -->
        <el-dialog :visible.sync="addVisible" title="添加" width="30%">
            <el-form :model="form" label-width="100px" ref="form" :rules="rules">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passwd">
                    <el-input v-model="form.passwd"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-input v-model="form.sex"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="form.age" type="number"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" type="email"></el-input>
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

        <!-- 编辑弹出框 -->
        <el-dialog :visible.sync="editVisible" title="编辑" width="30%">
            <el-form :model="form" label-width="100px" ref="form">
                <el-form-item v-if="false">
                    <el-input v-model="form.userId"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.passwd"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.sex"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="form.age" type="number"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" type="email"></el-input>
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
    import ElSelectDropdown from "element-ui/packages/select/src/select-dropdown";

    export default {
        name: 'userTable',
        components: {ElSelectDropdown},
        data() {
            return {
                tableData: [],
                size: 10,
                current: 0,
                total: 0,
                pages: 0,
                selectUser: '',
                editVisible: false,
                delVisible: false,
                addVisible: false,
                rules: {
                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min:2,max:20,message:'长度在2到20个字符之间',trigger:'blur'}
                    ],
                    passwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min:8,max:16,message:'长度在8到16个字符之间',trigger:'blur'}
                    ],
                    mobile: [
                        {required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'}
                    ],
                },
                form: {
                    userId: '',
                    userName: '',
                    passwd: '',
                    sex: '',
                    mobile: '',
                    age: '',
                    email: ''
                },
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
                    }
                };
                this.axiosProxy.getUserList(queryParams).then(response => {
                    this.tableData = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    console.log(response.data);
                })
            },
            search() {
                let queryParams = {
                    current: 1,
                    size: this.size,
                    t: {
                        userName: this.selectUser,
                    }
                };
                this.axiosProxy.getUserList(queryParams).then(response => {
                    this.tableData = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.current = 1;
                    console.log(this.current);
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
                    id: this.tableData[this.idx].userId
                };
                this.axiosProxy.deleteUser(queryParams).then(response => {
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
                    userId: item.userId,
                    userName: item.userName,
                    passwd: item.passwd,
                    sex: item.sex,
                    mobile: item.mobile,
                    age: item.age,
                    email: item.email,
                    createTime: item.createTime
                };
                this.editVisible = true;
            },
            saveEdit() {
                this.axiosProxy.updateUser(this.form).then(response => {
                    this.$set(this.tableData, this.idx, this.form);
                    this.editVisible = false;
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                })
            },

            handleAdd() {
                this.form = {};
                this.addVisible = true;
            },
            saveAdd() {
                this.axiosProxy.addUser(this.form).then(response => {
                    this.addVisible = false;
                    this.getData();
                    this.$message.success(`添加成功`);
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
