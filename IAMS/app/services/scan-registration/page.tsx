"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ScanLine, ArrowLeft, Loader2, CheckCircle, RotateCcw, Barcode, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

// 장비 데이터 샘플
const dummyEquipmentData = {
  model: "K-9 자주포",
  year: "2019",
  serialNumber: "K9-BF1FK5GU123456",
  licensePlate: "K-9-1234",
  mileage: "45,230",
  rounds: "40발",
  recordedIssues: [
    { severity: "low", description: "공기 필터 교체 필요" },
    { severity: "medium", description: "포신 브레이크 30% 상태" },
  ],
}

type ScanState = "idle" | "scanning" | "results"

export default function ScanRegistrationPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [scanState, setScanState] = useState<ScanState>("idle")
  const [showDialog, setShowDialog] = useState(false)
  const [carData, setCarData] = useState(dummyEquipmentData)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

  // 스캔 프로세스 시뮬레이션
  const handleScan = () => {
    setScanState("scanning")

    // 스캔 지연 시뮬레이션
    setTimeout(() => {
      setScanState("results")
      setShowDialog(true)
    }, 2000)
  }

  const handleRescan = () => {
    setShowDialog(false)
    setScanState("idle")
    // 실제 앱에서는 여기서 일부 상태를 재설정할 수 있음
    setTimeout(() => {
      handleScan()
    }, 500)
  }

  const handleConfirm = () => {
    setShowDialog(false)
    setScanState("idle")
    toast({
      title: "스캔 확인",
      description: `장비 ${carData.model} (${carData.year})가 성공적으로 등록되었습니다.`,
    })
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

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-gray-800 rounded-full mb-4">
            <ScanLine className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">장비 스캔 및 등록</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            바코드 스캔 시스템으로 장비 정보를 신속하게 검색하여 효율적인 등록 및 정비 추적을 가능하게 합니다.
          </p>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">바코드 스캐너</CardTitle>
            <CardDescription className="text-gray-400">
              장비 바코드를 스캔 영역에 위치시키고 아래 버튼을 눌러 시작하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-full max-w-md aspect-video bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
              {scanState === "scanning" ? (
                <div className="text-center">
                  <Loader2 className="h-16 w-16 text-green-600 animate-spin mx-auto mb-4" />
                  <p className="text-white">바코드 스캔 중...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Barcode className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">바코드 스캔 미리보기</p>
                </div>
              )}
            </div>

            <Button
              size="lg"
              className={`bg-green-700 hover:bg-green-800 text-white w-full max-w-xs ${
                scanState === "scanning" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleScan}
              disabled={scanState === "scanning"}
            >
              {scanState === "scanning" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  스캔 중...
                </>
              ) : (
                <>
                  <ScanLine className="mr-2 h-4 w-4" />
                  바코드 스캔
                </>
              )}
            </Button>
          </CardContent>
          <CardFooter className="text-sm text-gray-400 flex justify-center">
            <Info className="h-4 w-4 mr-2" />
            정확한 스캔을 위해 바코드가 명확하게 보이고 적절하게 위치해 있는지 확인하세요
          </CardFooter>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">작동 방식</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ol className="list-decimal list-inside space-y-2">
                <li>장비 문서에서 바코드 위치 확인</li>
                <li>바코드를 스캔 영역에 위치</li>
                <li>스캔 버튼을 눌러 바코드 캡처</li>
                <li>검색된 장비 정보 검토</li>
                <li>필요한 경우 재스캔하거나 등록 확인</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">장점</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="list-disc list-inside space-y-2">
                <li>바코드에서 즉시 데이터 검색</li>
                <li>수동 데이터 입력 오류 제거</li>
                <li>장비 사양에 빠르게 접근</li>
                <li>등록 시스템과 원활한 통합</li>
                <li>완전한 장비 이력 검색</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 스캔 결과 대화상자 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              바코드 스캔 완료
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              다음 장비 정보가 검색되었습니다. 정보가 정확한지 확인하세요.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="text-gray-400">모델:</div>
              <div className="text-white font-medium">{carData.model}</div>

              <div className="text-gray-400">제조년도:</div>
              <div className="text-white font-medium">{carData.year}</div>

              <div className="text-gray-400">일련번호:</div>
              <div className="text-white font-medium">{carData.serialNumber}</div>

              <div className="text-gray-400">장비번호:</div>
              <div className="text-white font-medium">{carData.licensePlate}</div>

              <div className="text-gray-400">주행거리:</div>
              <div className="text-white font-medium">{carData.mileage}</div>

              <div className="text-gray-400">발사탄수:</div>
              <div className="text-white font-medium">{carData.rounds}</div>
            </div>

            <div className="mt-2">
              <h4 className="text-white font-medium mb-2">기록된 이슈:</h4>
              <div className="bg-gray-700 rounded-md p-3">
                {carData.recordedIssues.map((issue, index) => (
                  <div key={index} className="flex items-center mb-2 last:mb-0">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        issue.severity === "low"
                          ? "bg-yellow-500"
                          : issue.severity === "medium"
                            ? "bg-orange-500"
                            : "bg-red-500"
                      }`}
                    />
                    <span className="text-gray-300">{issue.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={handleRescan}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              재스캔
            </Button>
            <Button className="bg-green-700 hover:bg-green-800" onClick={handleConfirm}>
              <CheckCircle className="mr-2 h-4 w-4" />
              확인 및 등록
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
