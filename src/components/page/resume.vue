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
                        <el-input v-model="query.name" placeholder="输入关键词搜索" class="handle-input mr10"></el-input>
                        <el-button type="primary" icon="el-icon-search" @click="clickQuery">搜索</el-button>
                    </div>
                    <div>
                        <el-button type="primary" icon="el-icon-download" @click="exportFun">导出
                        </el-button>
                    </div>
                </div>
                <div class="table-box">
                    <el-table :data="tableData.columnData" border height="100%">
                        <el-table-column type="index" width="50" label="序号"> </el-table-column>
                        <el-table-column prop="xm" label="姓名" min-width="160" align="left"></el-table-column>
                        <el-table-column prop="qzgw" label="求职岗位" min-width="120" align="center"></el-table-column>
                        <el-table-column prop="xb" label="性别" min-width="160" align="center"></el-table-column>
                        <el-table-column prop="csny" label="出生年月" min-width="160" align="center"></el-table-column>
                        <el-table-column prop="sfzh" label="身份证号" min-width="160" align="center"></el-table-column>
                        <el-table-column prop="xl" label="学历" min-width="120" align="center"></el-table-column>
                        <el-table-column prop="byyx" label="毕业院校" min-width="120" align="left"></el-table-column>
                        <el-table-column prop="sxzy" label="所学专业" min-width="120" align="left"></el-table-column>
                        <el-table-column prop="sfyjbys" label="是否应届毕业生" min-width="180" align="center">
                        </el-table-column>
                        <el-table-column prop="hjxz" label="户籍性质" min-width="100" align="center"></el-table-column>
                        <el-table-column prop="gzjl" label="工作经历" min-width="200" show-overflow-tooltip align="left">
                        </el-table-column>
                        <el-table-column prop="gzjn" label="工作技能" min-width="160" align="left"></el-table-column>
                        <el-table-column prop="lxfs" label="联系方式" min-width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="jzdz" label="居住地址" min-width="160" align="left">
                        </el-table-column>
                        <el-table-column prop="cjss" label="创建时间" min-width="160" align="center"></el-table-column>
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
        resumeList
    } from '../../api/index';
    import {
        http_builder_url
    } from '@/utils/Tools';
    export default {
        name: '',
        data() {
            return {
                query: {
                    nameLike: '',
                },
                tableData: {
                    // 表格绑定对象
                    orders: "",
                    columns: "",
                    pageSize: 15,
                    currentPage: 1,
                    total: 0,
                    headerData: [],
                    columnData: [{}, {}, {}, {}, ]
                },
            };
        },
        methods: {
            exportFun() {
                let params = {
                    orders: this.tableData.orders, // 排序顺序
                    columns: this.tableData.columns, // 排序字段
                    nameLike: this.query.nameLike
                }
                let newpa = http_builder_url('', params);
                window.location.href = "/api/api-work/inspect/sDevice/exportData" + newpa + "&token=" + this.$store
                    .state
                    .token
                    .token + '&exports='
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
                    nameLike: this.query.nameLike
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