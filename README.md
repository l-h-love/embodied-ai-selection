# 具身智能竞赛团队选拔 · 任务与作品集

> 面向「慧心极目」实验室具身智能竞赛团队选拔（面试时间：2026-10-01 14:00，腾讯会议）。
> 本仓库记录我从零完成选拔 4 项任务的**完整过程**：命令、报错、截图、实验数据与复盘。

## 一、任务进度

| # | 任务 | 状态 | 证据 | 完成日期 |
|---|---|---|---|---|
| 1 | Ubuntu 22.04.5 双系统安装（真机，非虚拟机） | 🟡 部分准备：已有 WSL2 Ubuntu 24.04，真机双系统未开始 | `wsl -l -v`、WSL 环境记录；目标证据见 `ubuntu/` | |
| 2 | SolidWorks 2025 安装 + 草图/特征建模 | 🔴 未开始 | `solidworks/` | |
| 3 | GitHub 使用（建仓 / 提交 / clone / fork） | 🔴 未开始 | 本仓库提交历史、`docs/` | |
| 4 | 进阶：Ubuntu 上 YOLO 塑料瓶数据集训练 | 🔴 未开始 | `yolo/` | |

## 二、目录结构

```
.
├── README.md                       本文件：任务进度与导航
├── 慧心极目_具身智能竞赛团队选拔说明.md   官方选拔说明（原文）
├── docs/
│   ├── 00_学习路线总览.md          ← 8 天学习路线（含操作要点与风险预案）
│   ├── 01_学习记录.md              ← 每日学习留痕（过程 / 报错 / 截图）
│   ├── 02_工作汇报_OKR.md          ← 每日与每周 OKR 汇报（结果 / 数据）
│   └── 03_简历与面试准备.md        ← 简历骨架、自我介绍、面试问答
├── ubuntu/       Ubuntu 安装与 Linux 学习记录
├── solidworks/   SolidWorks 建模记录（截图 / 工程图）
├── yolo/         塑料瓶数据集与 YOLO 训练记录
└── assets/       所有截图与演示素材（命名：YYYYMMDD-主题-序号.png）
```

## 三、环境

- 开发机：Windows 11 + NVIDIA GeForce RTX 5060 Laptop GPU（8GB）
- 已有 Linux 环境：WSL2 Ubuntu 24.04.3 LTS（已安装 Python 3.12、Git 2.43、Docker 29.1.3；可先用它做命令与仓库练习）
- 目标环境：Ubuntu 22.04.5 LTS 真机双系统（WSL 不能替代任务 1）
- 主要工具：Python / PyTorch(cu128) / Ultralytics / Git / Docker / SOLIDWORKS

## 四、复现方式

> WSL2 可用于先整理仓库、练习 Linux 命令和做小规模验证；但选拔任务 1 明确要求真机双系统，WSL 不能替代。任务 4 最终优先在真机 Ubuntu 22.04.5 + RTX 5060 上运行，并如实记录实际运行环境。
> 环境搭好后按以下顺序执行（Ubuntu 侧）：

```bash
git clone https://github.com/l-h-love/embodied-ai-selection.git
cd embodied-ai-selection
# 1) 训练
yolo detect train model=yolo11n.pt data=yolo/plastic.yaml epochs=100 imgsz=640 batch=16 device=0
# 2) 验证
yolo detect val model=runs/detect/train/weights/best.pt data=yolo/plastic.yaml
# 3) 导出
yolo export model=runs/detect/train/weights/best.pt format=onnx opset=12
```

## 五、过程记录索引

- 每日学习记录：`docs/01_学习记录.md`
- 每周 OKR 汇报：`docs/02_工作汇报_OKR.md`
- Ubuntu 安装踩坑：`ubuntu/`（每日追加）
- YOLO 实验记录：`yolo/训练记录.md`
