'use client'

import { useState } from 'react'

const questions = [
  {
    id: 'budget',
    question: '预算多少？',
    options: [
      { value: 'low', label: '200元以内' },
      { value: 'medium', label: '200-500元' },
      { value: 'high', label: '500-1000元' },
      { value: 'premium', label: '1000元以上' },
    ],
  },
  {
    id: 'priority',
    question: '最看重什么？',
    options: [
      { value: 'mouse', label: '鼠标（手感/轻量化）' },
      { value: 'keyboard', label: '键盘（手感/轴体）' },
      { value: 'headset', label: '耳机（听声辨位）' },
      { value: 'mousepad', label: '鼠标垫（顺滑度）' },
    ],
  },
  {
    id: 'handSize',
    question: '手多大？',
    options: [
      { value: 'small', label: '小手（<17cm）' },
      { value: 'medium', label: '中手（17-19cm）' },
      { value: 'large', label: '大手（>19cm）' },
    ],
  },
  {
    id: 'gripStyle',
    question: '鼠标握法？',
    options: [
      { value: 'palm', label: '趴握（整个手贴在鼠标上）' },
      { value: 'claw', label: '抓握（手指夹住鼠标）' },
      { value: 'fingertip', label: '指握（只用指尖）' },
    ],
  },
  {
    id: 'gameMode',
    question: '主要玩什么模式？',
    options: [
      { value: 'competitive', label: '竞技/排位' },
      { value: 'casual', label: '休闲/社区' },
      { value: 'workshop', label: '创意工坊' },
    ],
  },
]

const recommendations = {
  mouse: {
    low: { name: '罗技 G102', price: '约99元', reason: '入门级经典，性价比极高' },
    medium: { name: '雷蛇 蝰蛇V3 极速版', price: '约299元', reason: '轻量化设计，适合中小手型' },
    high: { name: '卓威 EC1', price: '约699元', reason: '专业电竞首选，趴握神器' },
    premium: { name: '罗技 GPW2', price: '约1299元', reason: '旗舰级轻量化，无线零延迟' },
  },
  keyboard: {
    low: { name: '艾代棱 IK5', price: '约149元', reason: '入门机械键盘，RGB灯效' },
    medium: { name: '樱桃 MX3.0S', price: '约399元', reason: '德系轴体，手感稳定' },
    high: { name: '斐尔可 圣手二代', price: '约799元', reason: '静电容轴体，码字神器' },
    premium: { name: '利奥波德 FC750R', price: '约1099元', reason: '顶级静音轴，适合长时间使用' },
  },
  headset: {
    low: { name: '漫步者 G2', price: '约149元', reason: '入门级游戏耳机，听声辨位够用' },
    medium: { name: '赛睿 寒冰5', price: '约399元', reason: '7.1环绕声，定位精准' },
    high: { name: '金士顿 飓风2', price: '约699元', reason: '专业电竞耳机，轻盈舒适' },
    premium: { name: '森海塞尔 GSP600', price: '约1399元', reason: 'Hi-Fi级音质，旗舰体验' },
  },
  mousepad: {
    low: { name: '樱桃 G200', price: '约49元', reason: '入门布垫，顺滑度不错' },
    medium: { name: '虎符 青鸟', price: '约129元', reason: '国产精品，控制力出色' },
    high: { name: '赛睿 QCK', price: '约199元', reason: '经典电竞垫，全球职业选手选用' },
    premium: { name: '卓威 GSR', price: '约399元', reason: '顶级控制垫，精准定位' },
  },
}

const priorityLabels = {
  mouse: '鼠标',
  keyboard: '键盘',
  headset: '耳机',
  mousepad: '鼠标垫',
}

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)

  const handleSelect = (value) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: value }
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
  }

  const getRecommendation = () => {
    const priority = answers.priority || 'mouse'
    const budget = answers.budget || 'medium'
    return recommendations[priority][budget]
  }

  const getSearchUrl = () => {
    const rec = getRecommendation()
    return `https://union.jd.com/search?keyword=${encodeURIComponent(rec.name)}`
  }

  if (showResult) {
    const rec = getRecommendation()
    const priority = answers.priority || 'mouse'

    return (
      <div className="bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          推荐结果
        </h2>

        <div className="bg-gray-700 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
              {priorityLabels[priority]}
            </span>
            <span className="text-lg font-semibold text-green-400">{rec.price}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{rec.name}</h3>
          <p className="text-gray-300">{rec.reason}</p>
        </div>

        <div className="bg-gray-700/50 rounded-xl p-4 mb-6">
          <h4 className="text-sm text-gray-400 mb-2">你的选择</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-300">
              预算：{questions[0].options.find(o => o.value === answers.budget)?.label}
            </div>
            <div className="text-gray-300">
              最看重：{questions[1].options.find(o => o.value === answers.priority)?.label}
            </div>
            <div className="text-gray-300">
              手大小：{questions[2].options.find(o => o.value === answers.handSize)?.label}
            </div>
            <div className="text-gray-300">
              握法：{questions[3].options.find(o => o.value === answers.gripStyle)?.label}
            </div>
            <div className="text-gray-300 col-span-2">
              游戏模式：{questions[4].options.find(o => o.value === answers.gameMode)?.label}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={getSearchUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-center transition-colors"
          >
            在京东查看 {rec.name}
          </a>
          <button
            onClick={handleRestart}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            重新测试
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>问题 {currentStep + 1} / {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
        {currentQuestion.question}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className="bg-gray-700 hover:bg-gray-600 text-white py-4 px-4 rounded-xl text-left transition-colors border-2 border-transparent hover:border-blue-500"
          >
            {option.label}
          </button>
        ))}
      </div>

      {currentStep > 0 && (
        <button
          onClick={handleBack}
          className="mt-6 text-gray-400 hover:text-white transition-colors"
        >
          ← 上一题
        </button>
      )}
    </div>
  )
}
