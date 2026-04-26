'use client'

import Questionnaire from '@/components/Questionnaire'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
          CS2 外设推荐助手
        </h1>
        <p className="text-gray-400 text-center mb-8">
          回答 5 个问题，AI 帮你找到最合适的外设
        </p>
        <Questionnaire />
      </div>
    </main>
  )
}
