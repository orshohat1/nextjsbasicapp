# Next.js 基础应用

一个带有自动化 GitHub Actions 工作流用于问题管理和部署到 Azure Kubernetes Service (AKS) 的 Next.js 应用程序。

## 项目概览

此仓库包含：
- 使用 TypeScript 和 Tailwind CSS 构建的 Next.js 应用程序
- 自动化 GitHub Actions 工作流用于问题管理
- 用于 Kubernetes 部署的 Helm 图表
- 用于容器化的 Docker 配置

## 快速入门

### 前置条件

- Node.js (推荐使用 v18 或更高版本)
- npm 或 yarn
- Docker (用于容器化)
- kubectl 和 Helm (用于 Kubernetes 部署)

### 安装

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

应用程序将可通过 `http://localhost:3000` 访问。

## GitHub Actions 工作流

### Bug 复现检查

**文件**：`.github/workflows/bug-reproduction-instructions.yml`

自动分析新标记为“bug”的问题，并使用 AI 判断是否包含足够的复现信息。如果信息不完整，工作流会发布一条友好的评论，指导报告者补充信息。

- **触发条件**：当问题被打开时
- **过滤器**：仅针对标记为“bug”的问题运行
- **AI 模型**：mistral-ai/ministral-3b

### 每周问题摘要

**文件**：`.github/workflows/weekly-issue-summary.yml`

创建过去 7 天内新问题的每周摘要。

- **触发条件**：每周一 9:00 UTC（或通过 workflow_dispatch 手动触发）
- **AI 模型**：xai/grok-3-mini
- **输出**：开启一个新问题，其中包含摘要内容

## 部署

### 使用 Helm 的 AKS 部署

项目包含的 Helm 图表存放在 `testapp/` 目录中，用于部署到 Azure Kubernetes Service。

#### 作业及其用途

**`analyze`**：使用 CodeQL 对指定语言进行静态应用程序安全测试。

**`set-version`**：根据提交历史设置应用程序版本。

**`buildImage`**：构建应用程序的 Docker 镜像并推送到 Azure 容器注册表 (ACR)。包括使用 Trivy 进行漏洞扫描。

**`deploy`**：使用 Helm 图表部署应用程序到 AKS 集群，并进行 dry-run 验证。

**`post-deployment`**：对已部署的应用程序执行后部署测试。

**`tag-as-stable`**：将镜像标记为稳定版本存储在 Azure 容器注册表中。

#### 环境变量

- `AZURE_CONTAINER_REGISTRY`: Azure 容器注册表名称
- `RESOURCE_GROUP`: Azure 资源组名称
- `CLUSTER_NAME`: AKS 集群名称

#### 所需密钥

- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`

## 项目结构

```
├── .github/
│   └── workflows/          # GitHub Actions 工作流
├── app/                    # Next.js app 目录
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── sql.ts             # SQL 工具
├── public/                # 静态资源
├── testapp/               # Helm 图表用于部署
│   ├── templates/         # Kubernetes 清单
│   ├── Chart.yaml         # Helm 图表元数据
│   └── values.yaml        # 默认值
├── weekly-issue-summary/  # 问题摘要提示配置
├── Dockerfile             # Docker 构建配置
├── next.config.js         # Next.js 配置
├── tailwind.config.ts     # Tailwind CSS 配置
└── tsconfig.json          # TypeScript 配置
```

## 贡献

报告 Bug 时，请包含：
- 复现问题的步骤
- 预期行为与实际行为的比较
- 环境详细信息（浏览器、操作系统、版本）
- 相关日志或截图

## 许可证

[请在此添加您的许可证信息]

## 联系方式

如有问题或疑问，请在此仓库中发起 issue。
