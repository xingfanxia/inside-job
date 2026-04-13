export default [
  {
    id: 'ticket-4401',
    number: '#4401',
    type: '服务请求',
    priority: '中',
    requester: '金瑞恩',
    requesterTitle: 'CEO行政助理',
    subject: 'U盘写入权限申请 — 董事会材料准备',
    status: '已解决',
    assignedTo: '刘昊天',
    createdDate: '2026-04-08 09:22',
    resolvedDate: '2026-04-08 10:45',
    description: `申请临时开通我工位电脑（WS-1204）的U盘写入权限。

CEO要求我为周四的董事会准备纸质材料，需要：
1. 打印6份Q4董事会纪要
2. 按CEO的常规要求将电子备份存入U盘

这是标准的董事会准备流程——和Q2、Q3的操作一致。

请仅开通今明两天的U盘写入权限。`,
    resolution: `已为WS-1204开通U盘写入权限，按标准董事会准备流程执行。

已核实：申请人确认此操作为CEO指示（孙雪梅邮件已存档）。
信息安全审批：已获得陈明轩签字（邮件审批 2026-04-08 17:12）。

权限窗口：4月8日-10日，4月11日00:00自动收回。
已记入设备访问登记表。`,
    clueId: null,
    mirrorId: null,
  },
  {
    id: 'ticket-4387',
    number: '#4387',
    type: '权限申请',
    priority: '中',
    requester: '赵敏',
    requesterTitle: '运营总监',
    subject: '网安监控管理员权限 — 内部流程评审',
    status: '已解决',
    assignedTo: '刘昊天',
    createdDate: '2026-03-28 14:05',
    resolvedDate: '2026-03-30 15:30',
    description: `我正在进行一项内部运营流程评审，需要网安监控系统的管理员权限。

具体需要查看：
- VPN连接日志（近90天）
- 各部门网络访问模式
- 远程办公基础设施使用率指标

这是为了评估我们远程办公策略的效率。我会为孙总生成一份优化建议报告。

我目前的权限是只读。需要管理员权限才能导出数据和查看完整历史记录。

备注：我已直接邮件联系陈明轩申请信息安全审批（见单独的邮件沟通记录）。`,
    resolution: `已为 min.zhao@xingchen.tech 开通网安监控管理员权限。

信息安全审批：已获得陈明轩确认（邮件 2026-03-30 14:45）。
权限级别：管理员（读取 + 导出）
有效期：30天（2026-04-29到期）
已按标准流程发放默认凭据。

已提醒申请人：访问敏感日志数据前请阅读网安监控使用规范。`,
    clueId: 'it-elena-netwatch-request',
    mirrorId: null,
  },
  {
    id: 'ticket-4392',
    number: '#4392',
    type: '事件',
    priority: '低',
    requester: '李大卫',
    requesterTitle: 'CFO',
    subject: 'VPN密码重置 — 账号被锁',
    status: '已解决',
    assignedTo: '刘昊天',
    createdDate: '2026-04-02 06:18',
    resolvedDate: '2026-04-02 08:30',
    description: `今早VPN被锁了，密码输错太多次。

需要尽快重置——今天远程办公，必须连上财务系统。

谢谢。`,
    resolution: `已重置 dw.li@xingchen.tech 的VPN凭据。
新的临时密码已发送至注册手机。

提醒用户：系统日志显示近期有3次VPN连接来自公共/未识别网络（咖啡店Wi-Fi、酒店大堂）。根据星辰科技安全策略（第3.2条），建议避免从公共网络访问机密系统。请使用手机热点或在可信网络环境下操作。

如需经常在公共场所办公，请联系信息安全部门申请专用移动热点设备。

本条为建议性提醒——暂不需要采取额外措施。`,
    clueId: 'it-david-vpn-warning',
    mirrorId: null,
  },
  {
    id: 'ticket-4356',
    number: '#4356',
    type: '变更请求',
    priority: '低',
    requester: '陈明轩',
    requesterTitle: '信息安全总监',
    subject: '安全审计延期 — 推迟至一月执行',
    status: '已解决',
    assignedTo: '蒋晓兰',
    createdDate: '2025-12-18 16:40',
    resolvedDate: '2025-12-19 09:15',
    description: `申请正式推迟原定于2026年1月15日的年度安全基础设施审计。

原因：Q4优先级事项需要我团队的全部精力到年底。鼎盛集团尽调准备占用了大部分带宽。

拟定新日期：2026年1月27日当周。

我会另行向人力资源部提交正式的推迟理由说明。`,
    resolution: `已按信息安全负责人权限记录延期申请。

审计时间调整：1月15日 → 1月27日
人力资源部已知会。日历已更新。

备注：这是本审计周期的第三次延期。
此前推迟记录：
  - 原定：2025年9月 → 2025年11月
  - 第二次：2025年11月 → 2026年1月15日
  - 本次：2026年1月15日 → 2026年1月27日

根据合规策略（第4.2.1条），如审计在最新计划日期后30天内仍未完成，将自动升级至CEO办公室。

合规团队已注意到此模式。`,
    clueId: null,
    mirrorId: 'mirror-audit-postponement',
  },
  {
    id: 'ticket-4410',
    number: '#4410',
    type: '安全告警',
    priority: '高',
    requester: '系统（自动）',
    requesterTitle: '星辰科技安全监控',
    subject: '异常：外部IP访问文档中心 — 凭据异常模式',
    status: '待处理',
    assignedTo: '陈明轩',
    createdDate: '2026-04-09 14:45',
    resolvedDate: null,
    description: `自动安全告警

外部IP地址（203.45.67.89）访问了文档中心系统并获取了以下文档：

  文档：专利组合差距分析
  访问时间：2026-04-09 14:22
  访问方式：带有效会话令牌的直接URL
  IP地理定位：咨询公司，上海市浦东新区陆家嘴金融中心
  关联实体：华铭咨询（已知鼎盛集团供应商）

访问模式分析：
- 仅访问单一文档（定向访问，非探索性浏览）
- 使用了有效的会话令牌——疑似凭据被盗或共享
- 无暴力破解指标
- 会话令牌追溯至一台BYOD豁免设备

建议处置：
1. 立即撤销被泄露的会话令牌
2. 审计所有BYOD豁免设备的凭据
3. 联系会话令牌关联的员工
4. 如确认凭据被盗，升级至事件响应流程

本告警需要指定的信息安全负责人进行人工处置。

当前状态：待处理 — 未采取任何措施。
分配给：陈明轩，信息安全总监
最后更新：2026-04-09 14:45（自动生成）`,
    resolution: null,
    clueId: null,
    mirrorId: 'mirror-anomaly-unresolved',
  },
  {
    id: 'ticket-4389',
    number: '#4389',
    type: '服务请求',
    priority: '低',
    requester: '赵敏',
    requesterTitle: '运营总监',
    subject: '打印记录管理员视图 — 部门用量审计',
    status: '已解决',
    assignedTo: '刘昊天',
    createdDate: '2026-03-28 14:30',
    resolvedDate: '2026-03-29 11:00',
    description: `同时需要打印记录系统的管理员权限，用于同一项内部运营评审（详见工单 #4387）。

需要审计过去6个月各部门的打印队列使用情况，包括：
- 各部门打印量
- 彩色与黑白打印比例
- 成本分摊准确性

这是一份成本优化报告。当前只读权限无法导出历史数据。`,
    resolution: `已为 min.zhao@xingchen.tech 开通打印记录管理员权限。

权限级别：管理员（读取 + 导出 + 历史数据）
有效期：30天（2026-04-28到期）
打印记录为标准运营工具，无需信息安全审批。

已按标准流程发放默认凭据。`,
    clueId: null,
    mirrorId: null,
  },
]
