<template>
    <div class="page-wrap">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 简历列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-content ">
            <div class="page-column">
                <div class="search-box">
                    <div>

                        <el-input v-model="query.keyWords" placeholder="输入姓名、岗位、技能、工作技能查询" class="handle-input mr10">
                        </el-input>
                        <el-button type="primary" icon="el-icon-search" @click="clickQuery">搜索</el-button>
                    </div>
                    <div>
                        <el-button  type="danger" icon="el-icon-delete" @click="mulDeleteFun"
                            :disabled="selection.length == 0">批量删除
                        </el-button>
                        <el-button type="primary" icon="el-icon-download" @click="exportFun"
                            :disabled="!tableData.columnData.length">导出
                        </el-button>
                    </div>
                </div>
                <div class="table-box">
                    <el-table :data="tableData.columnData" border height="100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column type="index" width="50" label="序号"> </el-table-column>
                        <el-table-column prop="job" label="求职岗位" min-width="300" align="center"></el-table-column>
                        <el-table-column prop="name" label="姓名" min-width="160" align="left"></el-table-column>
                        <el-table-column prop="sex" label="性别" min-width="160" align="center"></el-table-column>
                        <el-table-column prop="birth" label="出生年月" min-width="160" align="center"></el-table-column>
                        <el-table-column prop="idNumber" label="身份证号" min-width="160" align="center"></el-table-column>
                        <el-table-column prop="education" label="学历" min-width="120" align="center"></el-table-column>
                        <el-table-column prop="school" label="毕业院校" min-width="120" align="left"></el-table-column>
                        <el-table-column prop="major" label="所学专业" min-width="120" align="left"></el-table-column>
                        <el-table-column prop="isYear" label="是否应届毕业生" min-width="180" align="center">
                        </el-table-column>
                        <el-table-column prop="placeType" label="户籍性质" min-width="100" align="center"></el-table-column>
                        <el-table-column prop="experience" label="工作经历" min-width="200" show-overflow-tooltip
                            align="left">
                        </el-table-column>
                        <el-table-column prop="skill" label="工作技能" min-width="160" align="left"></el-table-column>
                        <el-table-column prop="phone" label="联系方式" min-width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="address" label="居住地址" min-width="160" align="left">
                        </el-table-column>
                        <el-table-column prop="crtDt" label="创建时间" min-width="160" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.crtDt | formatDttm }}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100" align="center" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="text" icon="el-icon-delete" @click="deleteFun(scope.row.id)"
                                    class="red">
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
    </div>
</template>

<script>
    import {
        resumeList,
        deleteresume
    } from '../../api/index';
    import {
        http_builder_url
    } from '@/utils/Tools';
    export default {
        name: '',
        data() {
            return {
                query: {
                    keyWords: '',
                },
                selection: [],
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
        created() {
            this.clickQuery()
        },
        methods: {
            exportFun() {
                let params = {
                    orders: this.tableData.orders, // 排序顺序
                    columns: this.tableData.columns, // 排序字段
                    keyWords: this.query.keyWords
                }
                let newpa = http_builder_url('', params);
                window.location.href = "/api/inspect/resume/exportData" + newpa
            },
            clickQuery() {
                // 搜索按钮
                this.tableData.currentPage = 1
                this.tableDataInit()
            },
            tableDataInit() {
                // 列表数据请求
                let params = {
                    rowSize: this.tableData.pageSize,
                    startRow: this.tableData.currentPage,
                    orders: this.tableData.orders,
                    columns: this.tableData.columns,
                    keyWords: this.query.keyWords
                }
                this.loading = true
                resumeList(params)
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
            handleSelectionChange(selection) { // 表格复选框勾选触发
                this.selection = selection;
            },
            mulDeleteFun() { // 多选删除
                let ids = this.selection.map(item => item.id).join(',');
                this.deleteFun(ids);
            },
            deleteFun(ids) {
                this.$confirm('确认删除选中的简历记录？删除后将不能恢复！', {
                    title: '提示',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        ids,
                    }
                    deleteresume(params).then(res => {
                        if (res.data.code == 1000) {
                            this.$notify({
                                title: '提示',
                                type: 'success',
                                message: '删除成功！'
                            })
                            this.clickQuery();
                        }
                    })
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