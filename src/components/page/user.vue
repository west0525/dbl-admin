<template>
    <div class="page-wrap">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-content ">
            <div class="page-column">
                <div class="search-box">
                    <div>
                        <el-input v-model="query.keywords" placeholder="输入关键词搜索" class="handle-input mr10"></el-input>
                        <el-button type="primary" icon="el-icon-search" @click="clickQuery">搜索</el-button>
                    </div>
                    <div>
                        <el-button type="primary" icon="el-icon-plus" @click="newUser">新增用户
                        </el-button>
                        <el-button type="primary" icon="el-icon-download" @click="exportFun">导出
                        </el-button>
                    </div>
                </div>
                <div class="table-box">
                    <el-table :data="tableData.columnData" border height="100%">
                        <el-table-column type="index" width="50" label="序号"> </el-table-column>
                        <el-table-column prop="name" label="姓名" min-width="160" align="left"></el-table-column>
                        <el-table-column prop="sex" label="性别" min-width="160" align="left"></el-table-column>
                        <el-table-column prop="phone" label="手机号" min-width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="deptName" label="所属部门" min-width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="crtDt" label="创建时间" min-width="160" align="center"></el-table-column>
                        <el-table-column label="操作" width="180" align="center" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="text" icon="el-icon-edit" @click="editUser(scope.row)">
                                    编辑</el-button>
                                <el-button type="text" icon="el-icon-delete" @click="deletUser(scope.row)" class="red">
                                    删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div class="pagination">
                    <el-pagination :page-sizes="[5, 10, 15, 30, 50]" :page-size="tableData.pageSize"
                        layout="sizes,total,prev,pager,next" :total="tableData.total"
                        :current-page="tableData.currentPage" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
        <addUser ref="add"></addUser>
    </div>
</template>

<script>
    import addUser from "@/components/common/addUser.vue";
    import {
        userList,
        deleteuser
    } from '../../api/index';
    import {
        http_builder_url
    } from '@/utils/Tools';
    export default {
        name: '',
        data() {
            return {
                query: {
                    keywords: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: {
                    // 表格绑定对象
                    orders: "",
                    columns: "",
                    pageSize: 15,
                    currentPage: 1,
                    total: 0,
                    headerData: [],
                    columnData: []
                },
            };
        },
        components: {
            addUser
        },
        methods: {
            newUser() {
                this.$refs.add.showLayout(null)
            },
            editUser(row) {
                this.$refs.add.showLayout(row)
            },
            exportFun() {
                let params = {
                    orders: this.tableData.orders, // 排序顺序
                    columns: this.tableData.columns, // 排序字段
                    keywords: this.query.keywords
                }
                let newpa = http_builder_url('', params);
                window.location.href = "/exportData" + newpa + "&token=" + this.$store
                    .state
                    .token
                    .token + '&exports='
            },
            clickQuery() {
                // 搜索按钮
                this.tableData.currentPage = 1
                this.tableDataInit()
            },
            deletUser(row) {
                // 单选删除
                let confirmMsg = "确认删除选中用户？删除后将不能恢复！"
                this.$confirm(confirmMsg, {
                        type: "warning",
                        title: "提示"
                    })
                    .then(() => {
                        let params = {
                            ids: row.id
                        }
                        deleteuser(params).then(res => {
                            if (res.data.code == 1000) {
                                this.$messagebox.success('删除成功!')
                                this.clickQuery()
                            }
                        })
                    })
                    .catch(() => {})
            },
            tableDataInit() {
                // 列表数据请求
                let params = {
                    rowSize: this.tableData.pageSize,
                    startRow: this.tableData.currentPage,
                    orders: this.tableData.orders,
                    columns: this.tableData.columns,
                    keywords: this.query.keywords
                }
                this.loading = true
                userList(params)
                    .then(res => {
                        if (res.data.code == 1000) {
                            let data = res.data.data
                            if (Array.isArray(data.data)) {
                                this.tableData.columnData = [...data.data]
                                this.tableData.total = data.total
                            } else {
                                this.tableData.columnData = []
                                this.tableData.total = 0
                            }
                        }
                        this.loading = false
                    })
                    .catch(error => {
                        this.tableData.columnData = []
                        this.loading = false
                    })
            },
            handleCurrentChange(val) {
                // 分页方法 （点击第val页触发）
                this.tableData.currentPage = val
                this.tableDataInit()
            },
            handleSizeChange(val) {
                // 分页方法 （改变每页val条触发）
                this.tableData.pageSize = val
                this.tableDataInit()
            }

        }
    };
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

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>