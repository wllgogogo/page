// 翻译 回执类型
export const transTitle = type => {
    // 询期 PT 询价 MT 询期询价 AT 询问作业时间OT(AB BA)(关务 场所)
    let target = '场所回执(询作业时间)'
    if (type === 'PT') {
        target = '询期回执'
    }
    if (type === 'MT') {
        target = '询价回执'
    }
    if (type === 'AT') {
        target = '询期询价回执'
    }
    if (type === 'C') {
        target = '关务回执(询问作业时间)'
    }
    if (type === 'Y') {
        target = '场所回执(询问作业时间)'
    }
    return target
}
// 翻译 回执类型
export const transServe = (type, serve) => {
    // 询期 PT 询价 MT 询期询价 AT 询问作业时间OT(AB BA)(关务 场所)
    let target = '场所'
    if (serve === 'T') {
        if (type === 'PT') {
            target = '询期'
        }
        if (type === 'MT') {
            target = '询价'
        }
        if (type === 'AT') {
            target = '询期询价'
        }
    }
    if (type === 'OT') {
        if (serve === 'AC') {
            target = '普通关务'
        }
        if (serve === 'BC') {
            target = '综保区关务'
        }
        if (serve === 'AY') {
            target = '普通场所'
        }
        if (serve === 'BY') {
            target = '综保区场所'
        }
    }
    return target
}
