import { ScrollBoard } from '@lp-react/components'
import { Tag, Typography } from 'antd'
const App = () => {
  const data = [
    {
      ip: '132.145.62.241',
      rule_names: {
        发现登录网页暴力猜解行为: 129
      },
      action_count: 129,
      severity: 3,
      first_time: '2024-12-25 16:33:41',
      last_time: '2024-12-25 16:33:43',
      keyword: '发现登录网页暴力猜解行为'
    },
    {
      ip: '111.198.186.110',
      rule_names: {
        发现Web弱口令登录行为: 2
      },
      action_count: 2,
      severity: 3,
      first_time: '2024-12-31 10:22:15',
      last_time: '2024-12-31 10:22:15',
      keyword: '发现Web弱口令登录行为'
    },
    {
      ip: '172.16.0.45',
      rule_names: {
        '发现目录穿越攻击行为(机器学习)': 1
      },
      action_count: 1,
      severity: 3,
      first_time: '2024-12-29 18:55:12',
      last_time: '2024-12-29 18:55:12',
      keyword: '发现目录穿越攻击行为(机器学习)'
    },
    {
      ip: '223.111.164.23',
      rule_names: {
        '发现扫描敏感文件/目录行为': 1
      },
      action_count: 1,
      severity: 1,
      first_time: '2024-12-30 14:32:00',
      last_time: '2024-12-30 14:32:00',
      keyword: '发现扫描敏感文件/目录行为'
    },
    {
      ip: '111.63.173.106',
      rule_names: {
        发现执行dir命令行为: 1
      },
      action_count: 1,
      severity: 4,
      first_time: '2024-12-31 11:53:24',
      last_time: '2024-12-31 11:53:24',
      keyword: '发现执行dir命令行为'
    },
    {
      ip: '111.31.103.183',
      rule_names: {
        '发现敏感信息文件的探测行为(机器学习)': 1
      },
      action_count: 1,
      severity: 1,
      first_time: '2024-12-31 14:29:50',
      last_time: '2024-12-31 14:29:50',
      keyword: '发现敏感信息文件的探测行为(机器学习)'
    }
  ]
  return (
    <div>
      <ScrollBoard
        scrollY={320}
        data={data}
        columns={[
          {
            title: '资产IP',
            className: 'w-130px ellipsis-text',
            dataIndex: 'ip'
          },
          {
            title: '漏洞名称',
            render: ({ rule_names }) => (
              <Typography.Text
                className='!max-w-300px'
                ellipsis={{
                  tooltip: {
                    title: (
                      <div className='whitespace-pre-wrap'>
                        {Object.keys(rule_names)
                          .map(name => `${name} : ${rule_names[name]}`)
                          .join('\n')}
                      </div>
                    )
                  }
                }}
              >
                {Object.keys(rule_names).map(name => (
                  <Tag color='error' key={name} className='inline-flex'>
                    <div className='max-w-200px ellipsis-text'>{name}</div>: {rule_names[name]}
                  </Tag>
                ))}
              </Typography.Text>
            )
          }
        ]}
      />
    </div>
  )
}

export default App
