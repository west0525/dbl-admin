<template>
    <div class="page-wrap">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 商务合作
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-content ">
            <div class="page-column">
                <div class="search-box">
                    <div>
                        <el-input v-model="query.keyWords" clearable placeholder="输入公司名称，经办人姓名，工作地址查询"
                            class="handle-input mr10"></el-input>
                        <el-button type="primary" icon="el-icon-search" @click="clickQuery">搜索</el-button>
                    </div>
                    <div>
                        <el-button type="primary" icon="el-icon-download" @click="exportFun" :disabled="!tableData.columnData.length">导出
                        </el-button>
                    </div>
                </div>
                <div class="table-box">
                    <el-table :data="tableData.columnData" border height="100%">
                        <el-table-column type="index" width="50" label="序号"> </el-table-column>
                        <el-table-column prop="compName" label="公司名称" min-width="160" align="left"></el-table-column>
                        <el-table-column prop="compDescr" label="公司简介" min-width="160" align="left"></el-table-column>
                        <el-table-column prop="workName" label="经办人姓名" min-width="100" align="center"></el-table-column>
                        <el-table-column prop="workPhone" label="经办人联系方式" min-width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="job" label="招聘岗位" min-width="120" align="center"></el-table-column>
                        <el-table-column prop="workDuty" label="岗位职责" min-width="160" align="left"></el-table-column>
                        <el-table-column prop="workRequest" label="任职要求" min-width="160" align="left"></el-table-column>
                        <el-table-column prop="salary" label="薪资福利" min-width="120" align="center"></el-table-column>
                        <el-table-column prop="contactPhone" label="联系方式" min-width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="workAddress" label="工作地址" min-width="160" align="left"></el-table-column>
                        <el-table-column prop="crtDt" label="创建时间" min-width="160" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.crtDt | formatDttm }}
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
        bussinessList
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
                window.location.href = "/api/inspect/business/exportData" + newpa
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
                bussinessList(params)
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