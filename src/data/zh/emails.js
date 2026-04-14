export default {
  inbox: [
    {
      id: 'email-1',
      from: { name: '孙雪梅', email: 'xuemei.sun@starchentech.com', title: 'CEO' },
      to: { name: '陈明轩', email: 'mingxuan.chen@starchentech.com' },
      subject: '转发：鼎盛集团尽调材料 — 立刻查看',
      date: '2026-04-13 08:42',
      body: `明轩，

放下手里所有事情，看附件。

这份文件是鼎盛集团在上周五谈判时拿出来的。一字不差——就是我们上周四的董事会纪要。我们的格式，我们的抬头，连机密水印都被去掉了。

这就是他们手上的东西。

我需要知道是谁做的。你有到明早九点董事会之前的时间。所有系统权限已授权。不要通知其他任何人。

—— 雪梅

---------- 转发的邮件 ----------
发件人：王铭志 <mingzhi.wang@dingshenggroup.com>
日期：2026年4月10日 周五 下午6:18
主题：回复：收购条款——最终轮

孙总，

我们本周获取了一些额外资料并进行了审阅。基于我们目前对星辰科技知识产权现状及董事会层面定价讨论的了解，我们认为条款需要做出实质性调整。

附件：星辰科技_董事会纪要_Q4审查.pdf

期待进一步沟通。

此致，
王铭志
鼎盛集团 企业发展高级副总裁`,
      attachments: [
        { name: '星辰科技_董事会纪要_Q4审查.pdf', size: '2.4 MB' }
      ],
      isRead: false,
      clueId: 'email-leaked-doc',
      clueType: 'auto',
    },
    {
      id: 'email-2',
      from: { name: 'IT部门', email: 'it-noreply@starchentech.com', title: 'IT支持' },
      to: { name: '陈明轩', email: 'mingxuan.chen@starchentech.com' },
      subject: '【待处理】季度密码轮换提醒',
      date: '2026-04-12 09:15',
      body: `明轩 您好，

这是您的季度密码轮换提醒。系统显示您以下内部系统的密码已超过90天未更新：

  - 文档中心
  - 人事通
  - 打印记录
  - 网安监控
  - 监控门户

请尽快更新您的密码。

提醒：所有内部门户密码均遵循公司标准格式：

    [系统前缀] - [公司英文名] - [年份]

例如，IT门户密码格式为 IT-XingChen-2026。请在所有系统密码中遵循此规范，以确保安全基础设施的一致性。

如果您忘记了系统前缀，请查看各门户登录页面——前缀与页面顶部栏显示的系统缩写一致。

谢谢，
星辰科技 IT支持
工单自动编号：#SYS-PWD-4415`,
      attachments: [],
      isRead: true,
      clueId: null,
      clueType: null,
    },
    {
      id: 'email-3',
      from: { name: '李大卫', email: 'dawei.li@starchentech.com', title: 'CFO' },
      to: { name: '陈明轩', email: 'mingxuan.chen@starchentech.com' },
      cc: [
        { name: '孙雪梅', email: 'xuemei.sun@starchentech.com' },
        { name: '林佳慧', email: 'jiahui.lin@starchentech.com' },
        { name: '张伟杰', email: 'weijie.zhang@starchentech.com' },
      ],
      subject: 'Q4财务模型 — 机密',
      date: '2026-04-08 14:22',
      body: `各位，

附件是更新后的Q4财务模型，已纳入调整后的营收预测和鼎盛集团收购方案。本文件属于机密级别——请勿转发、打印或在本分发范围之外讨论。

与v2版本的主要变化：
- 基于Q3实际数据调整了ARR预测
- 新增鼎盛集团收购在28亿、31亿和35亿估值下的情景分析
- 更新了收购整合后的burn rate假设

请在周四董事会之前完成审阅，如有问题直接联系我。

李大卫
首席财务官
星辰科技

保密声明：本邮件及附件仅供收件人使用。如您非指定收件人，请立即删除。`,
      attachments: [
        { name: '星辰科技_Q4财务模型_v3_机密.xlsx', size: '4.7 MB' }
      ],
      isRead: true,
      clueId: 'email-financial-distribution',
      clueType: 'click',
    },
    {
      id: 'email-4',
      from: { name: '林佳慧', email: 'jiahui.lin@starchentech.com', title: 'CTO' },
      to: { name: '孙雪梅', email: 'xuemei.sun@starchentech.com' },
      cc: [
        { name: '法务团队', email: 'legal@starchentech.com' },
      ],
      subject: '专利组合差距分析 — 仅限内部',
      date: '2026-04-07 11:03',
      body: `雪梅，

跟进上周的讨论。我已完成核心AI/ML专利组合的差距分析。按您的要求仅抄送法务。

主要发现：
- 我们已申请的7项专利中，有3项存在显著的在先技术重叠（见第12-18页）
- 行为分析引擎（我们的核心差异化产品）依赖的2个算法在技术上属于已发表学术成果的衍生
- 我们的"创新"聚类方法已被至少2家竞争对手独立开发
- 申请空白：我们在实时推理管道上没有任何专利覆盖，而这可以说是我们最具防御性的技术

这对鼎盛集团的估值有实质影响。如果对方的技术尽调团队发现这些差距，可能将交易中的IP估值部分降低2-4亿。

我之前已经提过（见Q3董事会备忘录），但想确保在周四之前有正式记录。

林佳慧
首席技术官
星辰科技

同时抄送陈明轩，请注意信息安全——本分析在文档中心应设为限制访问。`,
      attachments: [
        { name: '专利差距分析_2026Q1.pdf', size: '1.8 MB' }
      ],
      isRead: true,
      clueId: 'email-patent-access',
      clueType: 'click',
    },
    {
      id: 'email-5',
      from: { name: '人力资源部', email: 'hr@starchentech.com', title: '人力资源' },
      to: { name: '陈明轩', email: 'mingxuan.chen@starchentech.com' },
      subject: '年度安全审计 — 逾期（第三次提醒）',
      date: '2026-03-02 10:45',
      body: `明轩 您好，

这是我们关于年度安全基础设施审计的第三次提醒，该审计原定于2026年1月15日完成。

当前状态：逾期（已超过截止日期46天）

此前提醒发送记录：
  - 2026年1月20日（第一次提醒）
  - 2026年2月10日（第二次提醒）

根据星辰科技合规政策（第4.2.1节），信息安全总监须在预定日期后30天内完成或委托年度审计。目前已远超该期限。

待您审核的事项：
  ☐ 物理访问控制评估
  ☐ 网络边界漏洞扫描
  ☐ 员工凭证轮换合规检查
  ☐ BYOD政策有效性审查
  ☐ VPN访问日志审计
  ☐ 第三方供应商安全评估

请立即安排本次审计，或提供带有正当理由的正式延期申请。

如在3月15日前未处理，此事将上报CEO办公室。

此致，
星辰科技人力资源部
合规与风险管理`,
      attachments: [],
      isRead: true,
      clueId: null,
      clueType: null,
      mirrorId: 'mirror-audit-overdue',
    },
    {
      id: 'email-6',
      from: { name: '张伟杰', email: 'weijie.zhang@starchentech.com', title: '销售VP' },
      to: { name: '陈明轩', email: 'mingxuan.chen@starchentech.com' },
      subject: '回复：鼎盛定价策略 — 别外传',
      date: '2026-04-09 16:55',
      body: `明轩，

给你说一声，鼎盛谈判的报价方案我整理好了。雪梅让信安这边确认一下分发列表再发出去，你看看附件的保密标记是不是合适？

说句私下的：里面的数字是实打实的。底线28亿，目标31亿，上限35亿。雪梅不想让这些数字到处飘。目前只给了交易团队（雪梅、大卫、佳慧、你、我），就这几个人。

还有——别传到文档中心。雪梅特别说了先只放邮件里，少留痕迹。

伟杰

P.S. 周四董事会完了去喝一杯？这周真的需要缓缓 哈哈`,
      attachments: [
        { name: '鼎盛_定价策略_草案.pptx', size: '3.2 MB' }
      ],
      isRead: true,
      clueId: 'email-pricing-access',
      clueType: 'click',
    },
    {
      id: 'email-7',
      from: { name: '赵敏', email: 'min.zhao@starchentech.com', title: '运营总监' },
      to: { name: '陈明轩', email: 'mingxuan.chen@starchentech.com' },
      subject: '系统权限审查申请',
      date: '2026-03-30 09:18',
      body: `明轩 您好，

我在进行内部运营流程审查，需要临时提升几个系统的权限：

1. 网安监控——需要管理员级别权限，查看过去90天的VPN连接日志和网络访问模式。这是为了评估远程办公基础设施的效率。

2. 门禁记录——需要完整的门禁刷卡记录导出权限（已有读取权限，需要导出权限）。

3. 打印记录——需要管理员视图，审计各部门打印队列使用情况以优化成本。

我已提交了#1和#3的IT工单（工单#4387和#4389）。IT说网安监控的管理员权限需要信安总监签字批准。

能否帮忙审批？如果对审查范围有疑问，随时可以讨论。

谢谢，
赵敏
运营总监
星辰科技`,
      attachments: [],
      isRead: true,
      clueId: 'email-elena-access-request',
      clueType: 'click',
    },
    {
      id: 'email-8',
      from: { name: 'IT部门', email: 'it-noreply@starchentech.com', title: 'IT支持' },
      to: { name: '陈明轩', email: 'mingxuan.chen@starchentech.com' },
      subject: 'VPN例外审批通过 — 个人设备接入',
      date: '2026-03-15 11:30',
      body: `VPN例外申请 — 已批准

申请编号：VPN-EX-2026-0047
提交方：IT安全管理部门
审批人：陈明轩，信息安全总监

例外详情：
  类型：个人设备VPN接入（BYOD）
  范围：12台员工设备加入白名单
  期限：永久（至下次政策审查）
  理由："提升员工效率——远程办公灵活性"

涉及用户：
  - 李大卫（iPad Pro，个人设备）
  - 林佳慧（MacBook Air，个人设备）
  - 张伟杰（iPhone 15，个人设备）
  - 赵敏（ThinkPad X1，个人设备）
  - 金瑞恩（Galaxy S24，个人设备）
  - ...及另外7名员工

注意：本例外绕过了星辰科技安全政策第3.4节规定的标准设备注册和MDM要求。审批人（陈明轩）已承担因非受管设备接入可能产生的任何安全事件的责任。

这是一封自动通知邮件，无需操作。

星辰科技 IT安全部`,
      attachments: [],
      isRead: true,
      clueId: null,
      clueType: null,
      mirrorId: 'mirror-vpn-exception',
    },
  ],
  drafts: [
    {
      id: 'draft-1',
      to: { name: '人力资源部', email: 'hr@starchentech.com' },
      subject: '回复：年度安全审计 — 逾期（第三次提醒）',
      date: '2026-03-02 16:33',
      body: `您好，

感谢提醒。我理解这项审计已经逾期，对此延误我承担全部责任。我将把审计安排在3月17日那周，并亲自督办以下事项：

- 物理访问控制评估
- 网络边界扫描
- 凭证轮换合规检查

关于BYOD政策审查，我认为我们还应该关注`,
      clueId: null,
      mirrorId: 'mirror-audit-overdue',
    },
  ],
  sent: [
    {
      id: 'sent-1',
      from: { name: '陈明轩', email: 'mingxuan.chen@starchentech.com' },
      to: { name: '金瑞恩', email: 'ruien.jin@starchentech.com' },
      subject: '回复：董事会准备 — 打印申请',
      date: '2026-04-08 17:12',
      body: `瑞恩，

已批准。你可以打印6份董事会纪要，并按雪梅的要求将数字备份存至U盘。我已通知IT为你的工作站开启临时USB写入权限。

会后请确保所有纸质版全部清点归还到雪梅办公室。

谢谢，
陈明轩
信息安全总监
星辰科技`,
      attachments: [],
      clueId: null,
    },
    {
      id: 'sent-2',
      from: { name: '陈明轩', email: 'mingxuan.chen@starchentech.com' },
      to: { name: '赵敏', email: 'min.zhao@starchentech.com' },
      subject: '回复：系统权限审查申请',
      date: '2026-03-30 14:45',
      body: `赵敏，

网安监控管理员权限已批准。我已通知IT为你开通账户，权限有效期30天——如需延期请提前告知。

门禁记录导出权限你应该已经有了，再试一下，如果还有问题联系我。

明轩`,
      attachments: [],
      clueId: null,
    },
  ],
}
