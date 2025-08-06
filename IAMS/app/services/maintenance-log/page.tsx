"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, ArrowUpDown, ChevronDown, ChevronUp, ClipboardList } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

// 정비 기록 샘플 데이터
const maintenanceLogData = [
  {
    id: 1,
    licensePlate: "K-55-1234",
    entryDate: "2023-05-15",
    mileage: "45,230",
    rounds: "40발",
    details: [
      { part: "포신 브레이크", partCode: "PB-BRK-4578", replaceDate: "2023-05-15" },
      { part: "오일 필터", partCode: "PB-FLT-1234", replaceDate: "2023-05-15" },
    ],
  },
  {
    id: 2,
    licensePlate: "K-9-7890",
    entryDate: "2023-06-22",
    mileage: "78,450",
    rounds: "52발",
    details: [
      { part: "변속기 오일", partCode: "PB-OIL-5678", replaceDate: "2023-06-22" },
      { part: "공기 필터", partCode: "PB-FLT-9012", replaceDate: "2023-06-22" },
      { part: "궤도 장력기", partCode: "PB-TRK-3456", replaceDate: "2023-06-22" },
    ],
  },
  {
    id: 3,
    licensePlate: "K-55-5678",
    entryDate: "2023-07-10",
    mileage: "32,120",
    rounds: "38발",
    details: [
      { part: "점화 플러그", partCode: "PB-PLG-7890", replaceDate: "2023-07-10" },
      { part: "냉각 시스템", partCode: "PB-CLS-1234", replaceDate: "2023-07-10" },
    ],
  },
  {
    id: 4,
    licensePlate: "K-9-9012",
    entryDate: "2023-08-05",
    mileage: "65,780",
    rounds: "55발",
    details: [
      { part: "제동 패드", partCode: "PB-BRK-5678", replaceDate: "2023-08-05" },
      { part: "제동 로터", partCode: "PB-BRK-9012", replaceDate: "2023-08-05" },
      { part: "제동 오일", partCode: "PB-OIL-3456", replaceDate: "2023-08-05" },
    ],
  },
  {
    id: 5,
    licensePlate: "K-55-3456",
    entryDate: "2023-09-18",
    mileage: "12,450",
    rounds: "30발",
    details: [{ part: "엔진 오일", partCode: "PB-OIL-7890", replaceDate: "2023-09-18" }],
  },
  {
    id: 6,
    licensePlate: "K-9-7890",
    entryDate: "2023-10-02",
    mileage: "98,760",
    rounds: "52발",
    details: [
      { part: "타이밍 벨트", partCode: "PB-BLT-1234", replaceDate: "2023-10-02" },
      { part: "수냉 펌프", partCode: "PB-PMP-5678", replaceDate: "2023-10-02" },
      { part: "전체 오일", partCode: "PB-OIL-9012", replaceDate: "2023-10-02" },
    ],
  },
  {
    id: 7,
    licensePlate: "K-55-1234",
    entryDate: "2023-11-15",
    mileage: "54,320",
    rounds: "40발",
    details: [
      { part: "부동액", partCode: "PB-ANF-3456", replaceDate: "2023-11-15" },
      { part: "동계 궤도", partCode: "PB-TRK-7890", replaceDate: "2023-11-15" },
      { part: "배터리", partCode: "PB-BAT-1234", replaceDate: "2023-11-15" },
    ],
  },
  {
    id: 8,
    licensePlate: "K-55-1234",
    entryDate: "2023-12-20",
    mileage: "52,780",
    rounds: "40발",
    details: [
      { part: "엔진 오일", partCode: "PB-OIL-5678", replaceDate: "2023-12-20" },
      { part: "오일 필터", partCode: "PB-FLT-9012", replaceDate: "2023-12-20" },
      { part: "와이퍼 블레이드", partCode: "PB-WPR-3456", replaceDate: "2023-12-20" },
    ],
  },
  {
    id: 9,
    licensePlate: "K-9-5678",
    entryDate: "2024-01-08",
    mileage: "23,450",
    rounds: "52발",
    details: [{ part: "산소 센서", partCode: "PB-SNS-7890", replaceDate: "2024-01-08" }],
  },
  {
    id: 10,
    licensePlate: "K-9-9012",
    entryDate: "2024-02-14",
    mileage: "87,650",
    rounds: "55발",
    details: [
      { part: "전방 스트럿", partCode: "PB-STR-1234", replaceDate: "2024-02-14" },
      { part: "휠 얼라인먼트", partCode: "PB-WHL-5678", replaceDate: "2024-02-14" },
    ],
  },
]

type SortDirection = "asc" | "desc" | null
type SortField = "licensePlate" | "entryDate" | "mileage" | null

export default function MaintenanceLogPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({})

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

  // 정렬 처리
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // 같은 필드면 방향 전환
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc")
      setSortField(sortDirection === "desc" ? null : field)
    } else {
      // 새 필드면 오름차순으로 시작
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // 행 확장 토글
  const toggleRowExpansion = (id: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // 데이터 필터링 및 정렬
  const filteredAndSortedData = maintenanceLogData
    .filter((entry) => {
      if (!searchTerm) return true

      const searchLower = searchTerm.toLowerCase()
      return (
        entry.licensePlate.toLowerCase().includes(searchLower) ||
        entry.entryDate.includes(searchLower) ||
        entry.mileage.toLowerCase().includes(searchLower) ||
        entry.rounds.toLowerCase().includes(searchLower) ||
        entry.details.some(
          (detail) =>
            detail.part.toLowerCase().includes(searchLower) ||
            detail.partCode.toLowerCase().includes(searchLower) ||
            detail.replaceDate.includes(searchLower),
        )
      )
    })
    .sort((a, b) => {
      if (!sortField || !sortDirection) return 0

      let comparison = 0
      if (sortField === "licensePlate") {
        comparison = a.licensePlate.localeCompare(b.licensePlate)
      } else if (sortField === "entryDate") {
        comparison = new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime()
      } else if (sortField === "mileage") {
        const aMileage = Number.parseInt(a.mileage.replace(/,/g, ""))
        const bMileage = Number.parseInt(b.mileage.replace(/,/g, ""))
        comparison = aMileage - bMileage
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

  // 정렬 표시기 렌더링
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />
    if (sortDirection === "asc") return <ChevronUp className="ml-2 h-4 w-4" />
    if (sortDirection === "desc") return <ChevronDown className="ml-2 h-4 w-4" />
    return <ArrowUpDown className="ml-2 h-4 w-4" />
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
            <ClipboardList className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">정비 기록</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            상세한 기록 시스템으로 장비의 전체 정비 이력을 추적하고 관리하세요.
          </p>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">정비 기록</CardTitle>
            <CardDescription className="text-gray-400">장비의 모든 정비 기록을 조회하고 검색하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="정비 기록 검색..."
                  className="pl-8 bg-gray-700 border-gray-600 text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border border-gray-700 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-700">
                  <TableRow className="hover:bg-gray-700/50 border-gray-600">
                    <TableHead className="w-10"></TableHead>
                    <TableHead
                      className="text-gray-300 hover:text-white cursor-pointer"
                      onClick={() => handleSort("licensePlate")}
                    >
                      <div className="flex items-center">
                        장비 번호
                        {renderSortIndicator("licensePlate")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-gray-300 hover:text-white cursor-pointer"
                      onClick={() => handleSort("entryDate")}
                    >
                      <div className="flex items-center">
                        입고 일자
                        {renderSortIndicator("entryDate")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-gray-300 hover:text-white cursor-pointer"
                      onClick={() => handleSort("mileage")}
                    >
                      <div className="flex items-center">
                        주행거리 (km)
                        {renderSortIndicator("mileage")}
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-300">발사탄수</TableHead>
                    <TableHead className="text-gray-300">세부 사항</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedData.length > 0 ? (
                    filteredAndSortedData.map((entry) => (
                      <>
                        <TableRow key={entry.id} className="hover:bg-gray-700/50 border-gray-600">
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-500 hover:text-green-400 hover:bg-gray-700 p-0 h-8 w-8"
                              onClick={() => toggleRowExpansion(entry.id)}
                            >
                              {expandedRows[entry.id] ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell className="font-medium text-white">{entry.licensePlate}</TableCell>
                          <TableCell className="text-gray-300">{entry.entryDate}</TableCell>
                          <TableCell className="text-gray-300">{entry.mileage}</TableCell>
                          <TableCell className="text-gray-300">{entry.rounds}</TableCell>
                          <TableCell className="text-gray-300">{entry.details.length}개 부품 정비</TableCell>
                        </TableRow>
                        {expandedRows[entry.id] && (
                          <TableRow className="bg-gray-700/30 border-gray-600">
                            <TableCell colSpan={6} className="p-0">
                              <Table>
                                <TableHeader className="bg-gray-700/50">
                                  <TableRow className="hover:bg-gray-700/50 border-gray-600">
                                    <TableHead className="text-gray-400 text-xs">부품명</TableHead>
                                    <TableHead className="text-gray-400 text-xs">부품 코드</TableHead>
                                    <TableHead className="text-gray-400 text-xs">교체 일자</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {entry.details.map((detail, idx) => (
                                    <TableRow key={idx} className="hover:bg-gray-700/70 border-gray-600/50">
                                      <TableCell className="text-white text-sm py-2">{detail.part}</TableCell>
                                      <TableCell className="text-gray-300 text-sm py-2">{detail.partCode}</TableCell>
                                      <TableCell className="text-gray-300 text-sm py-2">{detail.replaceDate}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-gray-400">
                        정비 기록을 찾을 수 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-right text-sm text-gray-400">
              {maintenanceLogData.length}개 중 {filteredAndSortedData.length}개 기록 표시
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">정비 팁</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="list-disc list-inside space-y-2">
                <li>5,000-7,500km마다 정기적인 오일 교환으로 엔진 수명 연장</li>
                <li>최적의 연료 효율을 위해 매월 궤도 장력 점검</li>
                <li>15,000-30,000km마다 공기 필터 교체</li>
                <li>안전을 위해 10,000km마다 제동 패드 점검</li>
                <li>제조사 권장 정비 일정 준수</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">새 기록 추가</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">정비 이력을 최신 상태로 유지하기 위해 새로운 정비 기록을 추가하세요.</p>
              <Button
                className="w-full bg-green-700 hover:bg-green-800"
                onClick={() => router.push("/services/scan-registration")}
              >
                정비 기록 추가
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
