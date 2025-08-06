"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  LineChart,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function MaintenanceForecastPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [selectedQuarter, setSelectedQuarter] = useState("1분기")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [groupByPart, setGroupByPart] = useState(true)
  const [expandedParts, setExpandedParts] = useState<Record<string, boolean>>({})

  // 페이지 로드 시 인증 확인
  useEffect(() => {
    // 실제 앱에서는 토큰이나 세션을 확인
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    if (!loggedIn) {
      toast({
        title: "인증 필요",
        description: "이 페이지를 보려면 로그인하세요",
      })
      router.push("/login")
    }
  }, [router, toast])

  // 분기별 예측 데이터
  const forecastData = {
    "1분기": {
      predictedIssues: [
        {
          part: "포신 브레이크",
          quantity: 4,
          owner: "제1포병대대",
          description: "포신 브레이크 2개월 내 교체 필요",
        },
        {
          part: "포신 브레이크",
          quantity: 4,
          owner: "제2포병대대",
          description: "포신 브레이크 마모 심각",
        },
        {
          part: "축전지",
          quantity: 1,
          owner: "제1포병대대",
          description: "축전지 성능 저하 징후",
        },
        {
          part: "축전지",
          quantity: 1,
          owner: "제3포병대대",
          description: "축전지 용량 60% 이하",
        },
        {
          part: "현수장치",
          quantity: 1,
          owner: "제1포병대대",
          description: "운용 패턴 기반 현수장치 점검 필요",
        },
      ],
      maintenanceCosts: {
        last6Months: "8,500,000원",
        next6MonthsEstimate: "12,000,000원",
        estimatedTime: "48시간",
        requiredWorkers: 2,
      },
    },
    "2분기": {
      predictedIssues: [
        {
          part: "타이밍 벨트",
          quantity: 1,
          owner: "제2포병대대",
          description: "타이밍 벨트 마모 징후, 교체 권장",
        },
        {
          part: "냉각수 펌프",
          quantity: 1,
          owner: "제2포병대대",
          description: "냉각수 펌프 효율 감소, 교체 필요 가능성",
        },
        {
          part: "냉각수 펌프",
          quantity: 1,
          owner: "제4포병대대",
          description: "냉각수 펌프 초기 누수 징후",
        },
        {
          part: "점화 플러그",
          quantity: 6,
          owner: "제2포병대대",
          description: "점화 플러그 수명 종료 임박",
        },
        {
          part: "점화 플러그",
          quantity: 4,
          owner: "제5포병대대",
          description: "점화 플러그 효율 저하",
        },
        {
          part: "공기 필터",
          quantity: 1,
          owner: "제3포병대대",
          description: "공기 필터 막힘 감지, 교체 필요",
        },
      ],
      maintenanceCosts: {
        last6Months: "12,000,000원",
        next6MonthsEstimate: "25,000,000원",
        estimatedTime: "72시간",
        requiredWorkers: 3,
      },
    },
    "3분기": {
      predictedIssues: [
        {
          part: "변속기 오일",
          quantity: 1,
          owner: "제4포병대대",
          description: "변속기 오일 열화 감지, 교체 권장",
        },
        {
          part: "라디에이터",
          quantity: 1,
          owner: "제4포병대대",
          description: "라디에이터 초기 누수 징후",
        },
        {
          part: "제동 로터",
          quantity: 2,
          owner: "제6포병대대",
          description: "전방 제동 로터 최소 두께 접근",
        },
        {
          part: "제동 로터",
          quantity: 2,
          owner: "제7포병대대",
          description: "제동 로터 불균일 마모 패턴",
        },
      ],
      maintenanceCosts: {
        last6Months: "9,500,000원",
        next6MonthsEstimate: "18,000,000원",
        estimatedTime: "56시간",
        requiredWorkers: 2,
      },
    },
    "4분기": {
      predictedIssues: [
        {
          part: "발전기",
          quantity: 1,
          owner: "제5포병대대",
          description: "발전기 출력 감소, 교체 필요 가능성",
        },
        {
          part: "연료 펌프",
          quantity: 1,
          owner: "제5포병대대",
          description: "연료 펌프 압력 변동 감지",
        },
        {
          part: "연료 펌프",
          quantity: 1,
          owner: "제6포병대대",
          description: "연료 펌프 마모 징후",
        },
        {
          part: "산소 센서",
          quantity: 2,
          owner: "제5포병대대",
          description: "산소 센서 효율 저하",
        },
        {
          part: "휠 베어링",
          quantity: 2,
          owner: "제7포병대대",
          description: "전방 휠 베어링 마모 징후",
        },
        {
          part: "구동 벨트",
          quantity: 1,
          owner: "제7포병대대",
          description: "구동 벨트 수명 종료 임박",
        },
      ],
      maintenanceCosts: {
        last6Months: "11,000,000원",
        next6MonthsEstimate: "22,000,000원",
        estimatedTime: "80시간",
        requiredWorkers: 4,
      },
    },
  }

  const currentQuarterData = forecastData[selectedQuarter]

  // 부품별 이슈 그룹화
  const groupedIssues = currentQuarterData.predictedIssues.reduce(
    (acc, issue) => {
      if (!acc[issue.part]) {
        acc[issue.part] = []
      }
      acc[issue.part].push(issue)
      return acc
    },
    {} as Record<string, typeof currentQuarterData.predictedIssues>,
  )

  // 특정 부품 확장 토글
  const togglePartExpansion = (part: string) => {
    setExpandedParts((prev) => ({
      ...prev,
      [part]: !prev[part],
    }))
  }

  if (!isLoggedIn) {
    return null // useEffect에서 리디렉션
  }

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 bg-gray-900 min-h-screen">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        홈으로 돌아가기
      </Link>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-gray-800 rounded-full mb-4">
            <LineChart className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">정비 소요 예측</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            장비 데이터와 사용 패턴을 기반으로 향후 정비 요구사항을 예측하여 예상치 못한 고장을 방지합니다.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.keys(forecastData).map((quarter) => (
              <Button
                key={quarter}
                variant={selectedQuarter === quarter ? "default" : "outline"}
                className={
                  selectedQuarter === quarter
                    ? "bg-green-700 hover:bg-green-800"
                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                }
                onClick={() => setSelectedQuarter(quarter)}
              >
                {quarter}
              </Button>
            ))}
          </div>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">{selectedQuarter} 정비 소요 예측</CardTitle>
              <CardDescription className="text-gray-400">
                {selectedQuarter}에 대한 예측 정비 시스템에서 식별된 잠재적 문제
              </CardDescription>
            </div>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => setGroupByPart(!groupByPart)}
            >
              {groupByPart ? "모든 이슈 보기" : "부품별 그룹화"}
            </Button>
          </CardHeader>
          <CardContent>
            {groupByPart ? (
              <div className="rounded-md border border-gray-700 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-700">
                    <TableRow className="hover:bg-gray-700/50 border-gray-600">
                      <TableHead className="text-gray-300">부품</TableHead>
                      <TableHead className="text-gray-300">총 수량</TableHead>
                      <TableHead className="text-gray-300">부대</TableHead>
                      <TableHead className="text-gray-300">작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(groupedIssues).map(([part, issues]) => (
                      <>
                        <TableRow key={part} className="hover:bg-gray-700/50 border-gray-600">
                          <TableCell className="font-medium text-white">{part}</TableCell>
                          <TableCell className="text-gray-300">
                            {issues.reduce((sum, issue) => sum + issue.quantity, 0)}개
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {issues.length} {issues.length === 1 ? "부대" : "부대"}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-500 hover:text-green-400 hover:bg-gray-700 p-0 h-8 w-8"
                              onClick={() => togglePartExpansion(part)}
                            >
                              {expandedParts[part] ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                        {expandedParts[part] && (
                          <TableRow className="bg-gray-700/30 border-gray-600">
                            <TableCell colSpan={4} className="p-0">
                              <Table>
                                <TableHeader className="bg-gray-700/50">
                                  <TableRow className="hover:bg-gray-700/50 border-gray-600">
                                    <TableHead className="text-gray-400 text-xs">부대</TableHead>
                                    <TableHead className="text-gray-400 text-xs">수량</TableHead>
                                    <TableHead className="text-gray-400 text-xs">설명</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {issues.map((issue, idx) => (
                                    <TableRow key={idx} className="hover:bg-gray-700/70 border-gray-600/50">
                                      <TableCell className="text-white text-sm py-2">{issue.owner}</TableCell>
                                      <TableCell className="text-gray-300 text-sm py-2">{issue.quantity}개</TableCell>
                                      <TableCell className="text-gray-300 text-sm py-2">{issue.description}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="rounded-md border border-gray-700 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-700">
                    <TableRow className="hover:bg-gray-700/50 border-gray-600">
                      <TableHead className="text-gray-300">부품</TableHead>
                      <TableHead className="text-gray-300">수량</TableHead>
                      <TableHead className="text-gray-300">부대</TableHead>
                      <TableHead className="text-gray-300 w-1/3">설명</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentQuarterData.predictedIssues.map((issue, index) => (
                      <TableRow key={index} className="hover:bg-gray-700/50 border-gray-600">
                        <TableCell className="font-medium text-white">{issue.part}</TableCell>
                        <TableCell className="text-gray-300">{issue.quantity}개</TableCell>
                        <TableCell className="text-gray-300">{issue.owner}</TableCell>
                        <TableCell className="text-gray-300">{issue.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="mt-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                <p className="text-white font-medium">
                  {selectedQuarter} 예측 요약: {Object.keys(groupedIssues).length}개 고유 부품 필요, 총{" "}
                  {currentQuarterData.predictedIssues.length}개 정비 이슈
                </p>
              </div>
              <p className="text-sm text-gray-300 ml-8">
                과거 데이터와 사용 패턴을 기반으로, 이 부품들은 {selectedQuarter} 동안 정비 또는 교체가 필요할 가능성이
                높습니다. 사전 계획을 통해 장비 가동 중단 시간을 줄이고 연쇄적인 고장을 방지할 수 있습니다.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">정비 비용 예측</CardTitle>
              <CardDescription className="text-gray-400">
                장비 상태 및 이력을 기반으로 한 예상 정비 비용
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-400 mb-1">지난 6개월</p>
                  <p className="text-2xl font-bold text-white">{currentQuarterData.maintenanceCosts.last6Months}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-400 mb-1">향후 6개월 (예상)</p>
                  <p className="text-2xl font-bold text-white">
                    {currentQuarterData.maintenanceCosts.next6MonthsEstimate}
                  </p>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-white font-medium">예상 정비 시간</p>
                  </div>
                  <p className="text-white font-bold">{currentQuarterData.maintenanceCosts.estimatedTime}</p>
                </div>
                <p className="text-sm text-gray-300">모든 예측 정비 작업에 필요한 총 인시(人時)</p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-white font-medium">필요 인력</p>
                  </div>
                  <p className="text-white font-bold">{currentQuarterData.maintenanceCosts.requiredWorkers}명 정비병</p>
                </div>
                <p className="text-sm text-gray-300">모든 작업을 효율적으로 완료하기 위한 권장 정비병 수</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">권장 조치</CardTitle>
              <CardDescription className="text-gray-400">정비 예측에 따른 조치 사항</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-gray-700 p-3 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-medium">예방 정비 일정 수립</p>
                    <p className="text-sm text-gray-300">긴급 수리를 방지하기 위해 예측된 이슈에 대한 정비 일정 수립</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-gray-700 p-3 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-medium">부품 사전 주문</p>
                    <p className="text-sm text-gray-300">공급망 지연을 방지하기 위해 수요가 높은 부품 사전 주문</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-gray-700 p-3 rounded-lg">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-medium">예산 계획</p>
                    <p className="text-sm text-gray-300">분기별 정비 예측에 따른 자원 할당</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
