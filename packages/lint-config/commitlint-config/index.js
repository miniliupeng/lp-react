/** @type {import("@commitlint/types").UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'], // 继承自 commitlint 的标准配置
  rules: {
    'type-enum': [
      2, // 规则级别：错误
      'always', // 规则应用条件：始终检查
      [
        'feat', // 新功能
        'fix', // 修复
        'docs', // 文档变更
        'style', // 格式、样式（不影响代码运行的变动）
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'perf', // 优化相关
        'test', // 增加测试
        'build', // 影响构建系统或外部依赖关系的更改
        'ci', // 更改持续集成文件和脚本
        'chore', // 对构建过程或辅助工具和库的更改 (不影响源文件、测试用例)
        'revert', // 撤销之前的提交
        'wip', // 开发中
        'types' // 类型相关
      ]
    ]
  }
}
