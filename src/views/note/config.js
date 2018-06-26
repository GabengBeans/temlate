const config = {}
config.searchNoteInfo={
    // nickname: {
    //     tagName: "昵称",
    //     value: ""
    // },
    auditStatus: {
        tagName: "审核状态",
        value: "-1",
        tag: {
            op1: {
                num: "-1",
                value: "全部"
            },
            op2: {
                num: 0,
                value: "待审核"
            },
            op3: {
                num: 1,
                value: "审核通过"
            },
            op4:{
                num:2,
                value:"审核不通过"
            }
        }
    },
    startTime: {
        tagName: "创建时间",
        date: 1
    },
    endTime: {
        tagName: "截止时间",
        date: 1
    }
}
config.searchCommentsInfo={

}

export default config