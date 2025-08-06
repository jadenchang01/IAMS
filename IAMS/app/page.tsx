"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ScanLine, ClipboardList, LineChart, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// 군 사용자 ID 예시
const militaryUsernames = [
  "포병대대장",
  "정비담당관",
  "포대장",
  "정비병",
  "포반장",
  "군수참모",
  "정비과장",
  "포병장교",
  "정비대장",
  "포병참모",
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  // 슬라이드쇼 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // 로그인 상태 확인
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    // 실제 앱에서는 인증 시스템에서 사용자 이름을 가져옴
    // 데모 목적으로 저장된 사용자 이름 또는 무작위 이름 사용
    if (loggedIn) {
      const storedUsername = localStorage.getItem("username")
      if (storedUsername) {
        // 저장된 사용자 이름이 차량 번호 형식인 경우 무작위 사용자 이름으로 대체
        if (/^[A-Z]{3}-\d{4}$/.test(storedUsername)) {
          const randomUsername = militaryUsernames[Math.floor(Math.random() * militaryUsernames.length)]
          localStorage.setItem("username", randomUsername)
          setUsername(randomUsername)
        } else {
          setUsername(storedUsername)
        }
      } else {
        const randomUsername = militaryUsernames[Math.floor(Math.random() * militaryUsernames.length)]
        localStorage.setItem("username", randomUsername)
        setUsername(randomUsername)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    setIsLoggedIn(false)
    window.location.reload()
  }

  const services = [
    {
      id: "scan-registration",
      title: "장비 스캔 및 등록",
      description: "신속한 장비 스캔 및 등록 서비스.",
      icon: <ScanLine className="w-10 h-10 text-green-600" />,
    },
    {
      id: "maintenance-log",
      title: "정비 기록",
      description: "장비 정비 이력 추적 및 관리.",
      icon: <ClipboardList className="w-10 h-10 text-green-600" />,
    },
    {
      id: "maintenance-forecast",
      title: "정비 소요 예측",
      description: "장비 데이터 기반 향후 정비 소요 예측.",
      icon: <LineChart className="w-10 h-10 text-green-600" />,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <div className="flex items-center gap-2">
            <ScanLine className="w-6 h-6 text-green-600" />
            <span className="text-xl font-bold text-white">군 통합 포병정비 체계</span>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-green-700 hover:bg-green-800 text-white">환영합니다, {username}님</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800 text-white border-gray-700">
                  <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                    <Link href="/profile" className="w-full">
                      프로필
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="bg-green-700 hover:bg-green-800 text-white">로그인</Button>
              </Link>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">메뉴</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-800 text-white border-gray-700">
                <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                  <Link href="/services/scan-registration" className="w-full">
                    장비 스캔 및 등록
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                  <Link href="/services/maintenance-log" className="w-full">
                    정비 기록
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                  <Link href="/services/maintenance-forecast" className="w-full">
                    정비 소요 예측
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* 슬라이드쇼 섹션 */}
      <section className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        {[
          "/placeholder.svg?height=600&width=1200",
          "/placeholder.svg?height=600&width=1200",
          "/placeholder.svg?height=600&width=1200",
        ].map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4">
                {index === 0 ? "전문적인 포병 장비 정비" : index === 1 ? "전문가 정비 서비스" : "디지털 장비 관리 체계"}
              </h2>
            </div>
          </div>
        ))}

        {/* 슬라이드쇼 인디케이터 */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-green-600" : "bg-gray-400"}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </section>

      {/* 서비스 섹션 */}
      <section className="py-16 bg-gray-800 flex-grow">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl font-bold text-white">서비스 안내</h2>
            <p className="max-w-2xl mt-4 text-gray-300">
              포병 장비의 원활한 운용을 위한 종합적인 정비 서비스를 제공합니다.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
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
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-12 text-white bg-gray-950">
        <div className="container px-4 mx-auto md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ScanLine className="w-6 h-6 text-green-600" />
                <span className="text-xl font-bold">군 통합 포병정비 체계</span>
              </div>
              <p className="text-gray-400">모든 포병 장비 정비 요구사항을 위한 신뢰할 수 있는 파트너.</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">서비스</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services/scan-registration" className="text-gray-400 hover:text-white transition-colors">
                    장비 스캔 및 등록
                  </Link>
                </li>
                <li>
                  <Link href="/services/maintenance-log" className="text-gray-400 hover:text-white transition-colors">
                    정비 기록
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/maintenance-forecast"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    정비 소요 예측
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                    모든 서비스
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">연락처</h3>
              <address className="not-italic text-gray-400">
                국군 포병정비단
                <br />
                대한민국 00000
                <br />
                <Link href="tel:+8200000000" className="hover:text-white transition-colors">
                  02-000-0000
                </Link>
                <br />
                <Link href="mailto:info@army.mil.kr" className="hover:text-white transition-colors">
                  info@army.mil.kr
                </Link>
              </address>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-800">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} 대한민국 국군 포병정비단. 모든 권리 보유.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
