export default {
  title: '星辰科技安全事件报告',
  caseLabel: '案件：机密信息泄露',
  investigatorLabel: '调查人：陈明轩',
  statusLabel: '状态：进行中',
  phases: [
    {
      id: 'phase-1',
      minClues: 0,
      sections: [
        {
          heading: null,
          lines: [
            '星辰科技安全事件报告',
            '案件：机密信息泄露',
            '调查人：陈明轩，信息安全总监',
            '状态：进行中',
            '',
            '[ 各章节已锁定 — 证据不足 ]',
          ],
        },
      ],
    },
    {
      id: 'phase-2',
      minClues: 7,
      sections: [
        {
          heading: '第一节：关注人员名单',
          lines: [
            '基于访问模式和行为指标分析，',
            '以下人员具备动机、手段或机会：',
          ],
          suspects: [
            { name: '李大卫', note: '完整财务访问权限、异常凌晨活动记录、个人财务压力' },
            { name: '林佳慧', note: '核心技术IP访问权限、就灯塔计划提出过正式伦理异议' },
            { name: '张伟杰', note: '掌握交易定价信息、私人联系人就职于鼎盛集团' },
            { name: '赵敏', note: '系统管理员权限、此前在鼎盛集团工作6年' },
            { name: '金瑞恩', note: '实体文档经手人、U盘下载过董事会纪要、薪酬低于市场水平' },
          ],
        },
      ],
    },
    {
      id: 'phase-3',
      minClues: 14,
      sections: [
        {
          heading: '第二节：根因分析',
          lines: [
            '调查揭示了一系列系统性安全失职，',
            '正是这些失职为本次泄露创造了条件：',
          ],
          findings: [
            {
              icon: 'warning',
              text: 'BYOD策略允许未受管理的个人设备通过VPN接入公司网络',
              attribution: '审批人：陈明轩',
            },
            {
              icon: 'warning',
              text: '安全审计逾期14个月。上次审计完成时间：2025年2月。',
              attribution: '责任人：陈明轩',
            },
            {
              icon: 'warning',
              text: '4月9日检测到外部异常访问——未采取任何措施',
              attribution: '分配给：陈明轩。状态：未处理。',
            },
            {
              icon: 'warning',
              text: '12台个人设备获准VPN例外，未经MDM注册',
              attribution: '授权人：陈明轩',
            },
            {
              icon: 'warning',
              text: '安全审计被调查人以Q4优先级为由正式推迟',
              attribution: 'IT工单 #4356 — 提交人：陈明轩',
            },
          ],
        },
      ],
    },
    {
      id: 'phase-4',
      minClues: 22,
      sections: [
        {
          heading: '第三节：调查结论',
          lines: [
            '证据表明泄露同时涉及系统性漏洞和蓄意行为：',
          ],
          blocks: [
            {
              label: '系统性因素',
              text: '多名员工在不当安全实践中无意间暴露了机密信息片段——公共Wi-Fi使用、不设防的对话、与竞争公司人员的私人联系。这些碎片被鼎盛集团拼合为完整的情报图景。根本原因是安全策略与监管不到位导致的系统性安全失败。',
            },
            {
              label: '蓄意行为',
              text: '一名个人通过匿名邮箱将完整的Q4董事会纪要转发给外部方。文档水印分析已锁定来源副本。该转发文档是鼎盛集团手中破坏力最大的单一文件。',
            },
            {
              label: '复杂因素',
              text: '蓄意泄露的动机似乎与灯塔计划有关——一个面向政府机构出售的大规模人群行为监控平台。董事会投票决定继续该项目，并拒绝了独立伦理审查。泄露者是在目睹这一决定后采取了行动。',
            },
            {
              label: '镜像',
              text: '导致更广泛情报泄露的系统性失职直接追溯到调查人本人的决策：BYOD例外审批、多次推迟安全审计、对异常访问告警置之不理。问题不仅是谁泄露了文件——而是谁创造了让泄露成为可能的条件。',
            },
          ],
        },
      ],
    },
    {
      id: 'phase-5',
      minClues: 30,
      sections: [
        {
          heading: '第四节：处置建议',
          lines: [
            '调查已完成。所有证据已审阅。',
            '请选择你的建议：',
          ],
          choices: [
            {
              id: 'ending-a',
              label: 'A',
              title: '全面披露',
              description: '报告所有调查结果，包括系统性失职、你本人的疏忽、泄露者身份及灯塔计划的伦理问题。建议启动独立伦理审查。',
            },
            {
              id: 'ending-b',
              label: 'B',
              title: '系统归因',
              description: '将泄露归因于系统性安全漏洞。不追究个人责任。不披露灯塔计划。建议升级安全基础设施。',
            },
            {
              id: 'ending-c',
              label: 'C',
              title: '保护吹哨人',
              description: '建议对灯塔计划展开调查。保护泄露源头。向董事会及外部监管机构披露监控合同。',
            },
            {
              id: 'ending-d',
              label: 'D',
              title: '全貌',
              description: '如果你找齐了一切，也许还有一个答案。仅在发现全部36条线索后可选。',
              requiresAllClues: true,
            },
          ],
        },
      ],
    },
  ],
}
