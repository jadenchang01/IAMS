"use client"
import Link from "next/link"
import { ScanLine, ClipboardList, LineChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  const services = [
    {
      id: "scan-registration",
      title: "장비 스캔 및 등록",
      description: "신속한 장비 스캔 및 등록 서비스.",
      details:
        "스캔 서비스는 장비 시스템의 종합적인 진단을 제공하고, 효율적인 등록 처리를 통해 신속하게 운용할 수 있도록 합니다.",
      price: "기본 서비스",
      icon: <ScanLine className="w-10 h-10 text-green-600" />,
    },
    {
      id: "maintenance-log",
      title: "정비 기록",
      description: "장비 정비 이력 추적 및 관리.",
      details:
        "정비 기록 시스템은 모든 정비 기록을 추적하고, 예정된 정비 요구사항 및 재판매 가치를 위한 상세 이력을 제공합니다.",
      price: "기본 서비스",
      icon: <ClipboardList className="w-10 h-10 text-green-600" />,
    },
    {
      id: "maintenance-forecast",
      title: "정비 소요 예측",
      description: "장비 데이터 기반 향후 정비 소요 예측.",
      details:
        "고급 분석 시스템은 사용 패턴을 기반으로 장비의 정비 필요 시기를 예측하여 예상치 못한 고장을 방지하고 사전에 계획할 수 있도록 도와줍니다.",
      price: "기본 서비스",
      icon: <LineChart className="w-10 h-10 text-green-600" />,
    },
  ]

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 bg-gray-900 text-white">
      <div className="flex flex-col items-center mb-12 text-center">
        <h1 className="text-3xl font-bold">서비스 안내</h1>
        <p className="max-w-2xl mt-4 text-gray-300">
          장비의 원활하고 안전한 운용을 위한 종합적인 정비 서비스를 제공합니다.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {services.map((service) => (
          <Link
            href={`/services/${service.id}`}
            key={service.id}
            className="block transition-transform hover:scale-105"
          >
            <Card className="h-full bg-gray-700 border-gray-600 hover:shadow-lg hover:shadow-green-900/20 cursor-pointer">
              <CardHeader>
                <div className="p-2 w-16 h-16 flex items-center justify-center rounded-full bg-gray-600 mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-white">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{service.description}</p>
                <p className="mt-4 font-bold text-white">{service.price}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="p-8 mt-12 bg-gray-800 rounded-lg">
        <div className="flex flex-col items-center text-center md:flex-row md:text-left md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">맞춤형 서비스가 필요하신가요?</h2>
            <p className="mt-2 text-gray-300">특정 장비 요구사항에 대해 문의하세요.</p>
          </div>
          <Link href="/contact" className="mt-4 md:mt-0">
            <Button className="bg-green-700 hover:bg-green-800 text-white">문의하기</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
